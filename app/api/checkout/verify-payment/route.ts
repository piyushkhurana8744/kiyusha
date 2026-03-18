import connectDB from "@/lib/db";
import Order from "@/models/Order";
import crypto from "crypto";
import { NextResponse } from "next/server";

// Helper to get Shiprocket Token
async function getShiprocketToken() {
  const response = await fetch("https://apiv2.shiprocket.in/v1/external/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD,
    }),
  });
  const data = await response.json();
  return data.token;
}

// Helper to create Shiprocket Order
async function createShiprocketOrder(token: string, order: any) {
  const shiprocketOrderData = {
    order_id: order.orderNumber,
    order_date: new Date().toISOString().split("T")[0],
    pickup_location: "Primary", // This should match your Shiprocket pickup location name
    billing_customer_name: order.shippingAddress.name,
    billing_last_name: "",
    billing_address: order.shippingAddress.address,
    billing_city: order.shippingAddress.city,
    billing_pincode: order.shippingAddress.pincode,
    billing_state: order.shippingAddress.state,
    billing_country: order.shippingAddress.country,
    billing_email: order.shippingAddress.email,
    billing_phone: order.shippingAddress.phone,
    shipping_is_billing: true,
    order_items: order.items.map((item: any) => ({
      name: item.name,
      sku: item.product.toString(),
      units: item.quantity,
      selling_price: item.price,
    })),
    payment_method: "Prepaid",
    sub_total: order.totalAmount,
    length: 10, // Default dimensions, should ideally be dynamic
    width: 10,
    height: 10,
    weight: 0.5,
  };

  const response = await fetch("https://apiv2.shiprocket.in/v1/external/orders/create/adhoc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(shiprocketOrderData),
  });
  return await response.json();
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    // 1. Verify Payment Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    const isVerified = expectedSignature === razorpay_signature;

    if (!isVerified) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // 2. Update Order Status in MongoDB
    const order = await Order.findOneAndUpdate(
      { "paymentInfo.razorpay_order_id": razorpay_order_id },
      {
        $set: {
          status: "paid",
          "paymentInfo.razorpay_payment_id": razorpay_payment_id,
          "paymentInfo.razorpay_signature": razorpay_signature,
          "paymentInfo.paidAt": new Date(),
        },
      },
      { new: true }
    );

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // 3. Trigger Shiprocket Integration
    try {
      const token = await getShiprocketToken();
      if (token) {
        const shiprocketResponse = await createShiprocketOrder(token, order);
        if (shiprocketResponse.order_id) {
          await Order.findByIdAndUpdate(order._id, {
            $set: {
              "shippingInfo.shiprocket_order_id": shiprocketResponse.order_id,
              "shippingInfo.shiprocket_shipment_id": shiprocketResponse.shipment_id,
              "shippingInfo.status": "processing",
            },
          });
        }
      }
    } catch (shipError) {
      console.error("Shiprocket error:", shipError);
      // Don't fail the verification if shipping automation fails, but log it
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified and order processed",
      orderId: order._id,
    });
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
