import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { checkRateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "dummy-google-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy-google-client-secret",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        turnstileToken: { label: "Turnstile Token", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 1. Retrieve request headers for client IP extraction
        const reqHeaders = headers();
        const ip = reqHeaders.get("x-forwarded-for") || "127.0.0.1";

        // 2. IP Rate Limiting Check (max 5 login hits per minute per IP)
        const rateLimit = await checkRateLimit(ip, "login", 5, 60 * 1000);
        if (!rateLimit.success) {
          throw new Error("RATE_LIMIT_EXCEEDED");
        }

        // 3. Cloudflare Turnstile token validation
        const turnstileToken = credentials.turnstileToken?.toString() || "";
        const isBotChallengePassed = await verifyTurnstileToken(turnstileToken, ip);
        if (!isBotChallengePassed) {
          throw new Error("TURNSTILE_FAILED");
        }

        await connectDB();
        
        const emailStr = credentials.email.toString().toLowerCase().trim();
        const user = await User.findOne({ email: emailStr });
        
        if (!user) {
          // User enumeration protection: return generic credentials error
          return null; 
        }

        // 4. Check account lockout status
        if (user.lockUntil && user.lockUntil > new Date()) {
          const timeLeft = Math.ceil((user.lockUntil.getTime() - Date.now()) / 60000);
          throw new Error(`ACCOUNT_LOCKED:${timeLeft}`);
        }

        // 5. Check verification
        if (!user.isVerified) {
          throw new Error("EMAIL_UNVERIFIED");
        }

        // 6. Verify password exists
        if (!user.password) {
          throw new Error("LOGIN_WITH_OAUTH");
        }

        const isMatch = await bcrypt.compare(credentials.password.toString(), user.password);
        
        if (!isMatch) {
          // Increment attempts
          user.loginAttempts = (user.loginAttempts || 0) + 1;
          if (user.loginAttempts >= 5) {
            user.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 mins lock
          }
          await user.save();
          return null;
        }

        // Login success: reset attempts
        if (user.loginAttempts > 0 || user.lockUntil) {
          user.loginAttempts = 0;
          user.lockUntil = null;
          await user.save();
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "customer"
        };
      }
    })
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "customer";
      }

      // Sync Google OAuth sign ins
      if (account && account.provider === "google" && user) {
        await connectDB();
        const emailStr = user.email?.toLowerCase().trim();
        let dbUser = await User.findOne({ email: emailStr });
        
        if (!dbUser) {
          dbUser = await User.create({
            name: user.name,
            email: emailStr,
            isVerified: true,
            role: "customer",
            loginAttempts: 0
          });
        }
        token.id = dbUser._id.toString();
        token.role = dbUser.role || "customer";
      }
      
      return token;
    }
  }
});
