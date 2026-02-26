import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: String, required: true },
    oldPrice: { type: String },
    image: { type: String, required: true },
    hoverImage: { type: String, required: true },
    href: { type: String, required: true },
    badge: { type: String },
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
