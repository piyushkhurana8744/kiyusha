import connectDB from "@/lib/db";
import Order from "@/models/Order";
import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: Request) {
  try {
    await connectDB();
    const { items, totalAmount, shippingAddress, user } = await request.json();

    // 1. Create Razorpay Order
    const options = {
      amount: Math.round(totalAmount * 100), // amount in the smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_${uuidv4().substring(0, 8)}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    if (!razorpayOrder) {
      return NextResponse.json({ error: "Failed to create Razorpay order" }, { status: 500 });
    }

    // 2. Save Pending Order in MongoDB
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newOrder = await Order.create({
      orderNumber,
      user: user || null,
      items,
      totalAmount,
      shippingAddress,
      status: "pending",
      paymentInfo: {
        razorpay_order_id: razorpayOrder.id,
      },
    });

    return NextResponse.json({
      success: true,
      order: newOrder,
      razorpayOrder,
    });
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
