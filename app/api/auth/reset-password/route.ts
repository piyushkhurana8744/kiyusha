import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import ResetToken from "@/models/ResetToken";
import { resetPasswordSchema } from "@/lib/zod-schemas";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendPasswordChangedEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";

  // Rate Limiting (max 5 reset attempts per minute per IP)
  const rateLimit = await checkRateLimit(ip, "reset-password", 5, 60 * 1000);
  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many password resets. Please wait before trying again." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { token, password, confirmPassword } = body;

    if (!token) {
      return NextResponse.json({ error: "Reset token is required." }, { status: 400 });
    }

    // 1. Zod input checks
    const validation = resetPasswordSchema.safeParse({ password, confirmPassword });
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    await connectDB();

    // 2. Locate Reset Token
    const resetDoc = await ResetToken.findOne({ token });
    if (!resetDoc) {
      return NextResponse.json(
        { error: "Invalid or expired password reset link." },
        { status: 400 }
      );
    }

    // 3. Check expiration
    if (resetDoc.expires < new Date()) {
      await ResetToken.deleteOne({ _id: resetDoc._id });
      return NextResponse.json(
        { error: "This reset link has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // 4. Locate and update user
    const user = await User.findOne({ email: resetDoc.email });
    if (!user) {
      await ResetToken.deleteOne({ _id: resetDoc._id });
      return NextResponse.json({ error: "Associated user not found." }, { status: 400 });
    }

    // Hash and store the password
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    
    // Unlock account and reset attempts on successful reset
    user.loginAttempts = 0;
    user.lockUntil = null;
    await user.save();

    // 5. Clean up token
    await ResetToken.deleteOne({ _id: resetDoc._id });

    // 6. Send password changed alert
    await sendPasswordChangedEmail(user.email);

    return NextResponse.json({
      success: true,
      message: "Password successfully updated. You may now log in with your new password."
    });
  } catch (error) {
    console.error("Reset password endpoint error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during password reset." },
      { status: 500 }
    );
  }
}
