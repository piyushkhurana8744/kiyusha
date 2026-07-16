import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import ResetToken from "@/models/ResetToken";
import { forgotPasswordSchema } from "@/lib/zod-schemas";
import { checkRateLimit } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { sendPasswordResetEmail } from "@/lib/mail";
import crypto from "crypto";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";

  // Rate Limiting (max 3 password reset requests per minute per IP)
  const rateLimit = await checkRateLimit(ip, "forgot-password", 3, 60 * 1000);
  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute before requesting another reset link." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    // 1. Zod parsing
    const validation = forgotPasswordSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, turnstileToken } = validation.data;

    // 2. Turnstile verification
    const isBotChallengePassed = await verifyTurnstileToken(turnstileToken, ip);
    if (!isBotChallengePassed) {
      return NextResponse.json(
        { error: "Bot verification challenge failed. Please try again." },
        { status: 400 }
      );
    }

    await connectDB();
    const emailStr = email.toLowerCase().trim();

    // 3. Query user
    const user = await User.findOne({ email: emailStr });

    // User enumeration protection: return success message regardless of user existence
    const genericResponse = {
      success: true,
      message: "If an account matches that email address, we have sent a password reset link."
    };

    if (!user) {
      return NextResponse.json(genericResponse);
    }

    // 4. Generate Reset Token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiration

    // Clean up any existing tokens
    await ResetToken.findOneAndDelete({ email: emailStr });
    
    // Create new reset token
    await ResetToken.create({ email: emailStr, token, expires });

    // 5. Send Reset Email
    await sendPasswordResetEmail(emailStr, token);

    return NextResponse.json(genericResponse);
  } catch (error) {
    console.error("Forgot password API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
