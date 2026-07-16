import { auth } from "@/lib/auth-next";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

export const POST = auth(async function POST(req) {
  // 1. Session verification
  if (!req.auth || !req.auth.user || !req.auth.user.email) {
    return NextResponse.json(
      { error: "You must be logged in to sync your shopping cart." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const guestItems = body.items;

    if (!Array.isArray(guestItems)) {
      return NextResponse.json({ error: "Invalid cart items format." }, { status: 400 });
    }

    await connectDB();
    const email = req.auth.user.email.toLowerCase().trim();

    // 2. Fetch authenticated user profile
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User profile not found." }, { status: 404 });
    }

    const memberCart = user.cart || [];

    // 3. Merge guest cart items into member cart items
    const mergedCart = [...memberCart];

    for (const guestItem of guestItems) {
      if (!guestItem._id || !guestItem.name || !guestItem.price || !guestItem.image || !guestItem.category) {
        continue; // Skip malformed cart items
      }

      const existingIndex = mergedCart.findIndex((item) => item._id === guestItem._id);
      
      if (existingIndex > -1) {
        // Accumulate quantities for matching items
        mergedCart[existingIndex].quantity = 
          (mergedCart[existingIndex].quantity || 1) + (Number(guestItem.quantity) || 1);
      } else {
        // Add new guest items to the member cart
        mergedCart.push({
          _id: guestItem._id,
          name: guestItem.name,
          price: guestItem.price,
          image: guestItem.image,
          quantity: Number(guestItem.quantity) || 1,
          category: guestItem.category
        });
      }
    }

    // 4. Save merged cart back to Mongoose
    user.cart = mergedCart;
    await user.save();

    return NextResponse.json({
      success: true,
      items: user.cart
    });
  } catch (error) {
    console.error("Cart merge API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred merging cart data." },
      { status: 500 }
    );
  }
});
