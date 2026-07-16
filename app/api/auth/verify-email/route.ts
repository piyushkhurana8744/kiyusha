import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import VerificationToken from "@/models/VerificationToken";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendWelcomeEmail } from "@/lib/mail";

export async function GET(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
  
  // Rate limiting (max 10 email verification clicks per minute per IP)
  const rateLimit = await checkRateLimit(ip, "verify-email", 10, 60 * 1000);
  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many verification attempts. Please slow down." },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login?error=InvalidToken", request.url));
  }

  try {
    await connectDB();

    // 1. Find the token
    const tokenDoc = await VerificationToken.findOne({ token });
    if (!tokenDoc) {
      return NextResponse.redirect(new URL("/login?error=ExpiredOrInvalidToken", request.url));
    }

    // 2. Check token expiration
    if (tokenDoc.expires < new Date()) {
      await VerificationToken.deleteOne({ _id: tokenDoc._id });
      return NextResponse.redirect(new URL("/login?error=ExpiredToken", request.url));
    }

    // 3. Find and verify user
    const user = await User.findOne({ email: tokenDoc.email });
    if (!user) {
      await VerificationToken.deleteOne({ _id: tokenDoc._id });
      return NextResponse.redirect(new URL("/login?error=UserNotFound", request.url));
    }

    user.isVerified = true;
    await user.save();

    // 4. Clean up token
    await VerificationToken.deleteOne({ _id: tokenDoc._id });

    // 5. Send welcome email
    await sendWelcomeEmail(user.email, user.name);

    // 6. Redirect to sign-in page with verified flag
    return NextResponse.redirect(new URL("/login?verified=true", request.url));
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.redirect(new URL("/login?error=UnexpectedServerError", request.url));
  }
}
