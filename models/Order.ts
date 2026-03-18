import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: false }, // Optional for guest checkout
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String },
      },
    ],
    totalAmount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: {
      type: String,
      enum: ["pending", "paid", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    
    // Shipping Details
    shippingAddress: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, default: "India" },
    },

    // Payment Info (Razorpay)
    paymentInfo: {
      razorpay_order_id: { type: String },
      razorpay_payment_id: { type: String },
      razorpay_signature: { type: String },
      paidAt: { type: Date },
    },

    // Shipping Info (Shiprocket)
    shippingInfo: {
      shiprocket_order_id: { type: String },
      shiprocket_shipment_id: { type: String },
      awb_code: { type: String },
      courier_name: { type: String },
      status: { type: String },
      tracking_url: { type: String },
    },
  },
  { timestamps: true }
);

const Order = models.Order || model("Order", OrderSchema);

export default Order;
