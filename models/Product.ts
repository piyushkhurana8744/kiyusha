import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    mrp: { type: Number },
    sellingPrice: { type: Number, required: true },
    price: { type: String },
    oldPrice: { type: String },
    image: { type: String, required: true },
    hoverImage: { type: String }, // Not strictly required
    href: { type: String, required: true },
    badge: { type: String },
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    showDiscountPopup: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;