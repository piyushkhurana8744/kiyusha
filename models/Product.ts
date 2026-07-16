import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true },
    description: { type: String },
    seoDescription: { type: String },
    mrp: { type: Number },
    sellingPrice: { type: Number, required: true },
    price: { type: String },
    oldPrice: { type: String },
    image: { type: String, required: true },
    hoverImage: { type: String },
    gallery: [{ type: String }],
    href: { type: String, required: true },
    badge: { type: String },
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    showDiscountPopup: { type: Boolean, default: false },
    specifications: {
      baseMetal: { type: String, default: "PVD Gold-Plated Steel" },
      plating: { type: String, default: "18k Gold Plated" },
      weight: { type: String, default: "Lightweight" },
      dimensions: { type: String, default: "Standard Size" },
    },
    reviews: [
      {
        reviewerName: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String },
        date: { type: Date, default: Date.now },
      }
    ],
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;