import { auth } from "@/lib/auth-next";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { changePasswordSchema } from "@/lib/zod-schemas";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendPasswordChangedEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";

export const POST = auth(async function POST(req) {
  // 1. Session verification
  if (!req.auth || !req.auth.user || !req.auth.user.email) {
    return NextResponse.json({ error: "You must be logged in to change your password." }, { status: 401 });
  }

  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
  
  // Rate limiting (max 5 password change requests per minute per IP)
  const rateLimit = await checkRateLimit(ip, "change-password", 5, 60 * 1000);
  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute before trying again." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();

    // 2. Input validation using Zod
    const validation = changePasswordSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { currentPassword, newPassword } = validation.data;
    const email = req.auth.user.email.toLowerCase().trim();

    await connectDB();

    // 3. Find and verify user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User profile not found." }, { status: 404 });
    }

    if (!user.password) {
      return NextResponse.json({ error: "OAuth accounts cannot change passwords directly." }, { status: 400 });
    }

    // Compare current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Incorrect current password." }, { status: 400 });
    }

    // 4. Update password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedNewPassword;
    await user.save();

    // 5. Send password changed alert
    await sendPasswordChangedEmail(user.email);

    return NextResponse.json({
      success: true,
      message: "Password changed successfully."
    });
  } catch (error) {
    console.error("Change password route error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
});
