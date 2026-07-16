import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import VerificationToken from "@/models/VerificationToken";
import { signupSchema } from "@/lib/zod-schemas";
import { checkRateLimit } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { sendVerificationEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";

  // 1. Rate Limiting Check (max 3 signup attempts per minute per IP)
  const rateLimit = await checkRateLimit(ip, "signup", 3, 60 * 1000);
  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many registration attempts. Please try again in a minute." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    // 2. Validate input schema using Zod
    const validation = signupSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, phone, password, turnstileToken } = validation.data;

    // 3. Verify Cloudflare Turnstile token
    const isBotChallengePassed = await verifyTurnstileToken(turnstileToken, ip);
    if (!isBotChallengePassed) {
      return NextResponse.json(
        { error: "Bot verification challenge failed. Please reload and try again." },
        { status: 400 }
      );
    }

    await connectDB();
    const emailStr = email.toLowerCase().trim();

    // 4. Query existing user
    const existingUser = await User.findOne({ email: emailStr });

    if (existingUser) {
      // User enumeration prevention: do NOT tell the client that the email is already registered.
      // If the email is already registered, send them a security email or another verification link
      if (!existingUser.isVerified) {
        // Generate new verification token
        const token = crypto.randomBytes(32).toString("hex");
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        await VerificationToken.findOneAndDelete({ email: emailStr });
        await VerificationToken.create({ email: emailStr, token, expires });
        await sendVerificationEmail(emailStr, token);
      }
      
      return NextResponse.json({
        success: true,
        message: "Registration successful. Please check your inbox to verify your email."
      });
    }

    // 5. Create new unverified user
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      name,
      email: emailStr,
      password: hashedPassword,
      phone,
      isVerified: false,
      loginAttempts: 0
    });

    // 6. Generate Verification Token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await VerificationToken.create({ email: emailStr, token, expires });

    // 7. Send Verification Email
    await sendVerificationEmail(emailStr, token);

    return NextResponse.json({
      success: true,
      message: "Registration successful. Please check your inbox to verify your email."
    });
  } catch (error: any) {
    console.error("Signup endpoint error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during registration." },
      { status: 500 }
    );
  }
}
