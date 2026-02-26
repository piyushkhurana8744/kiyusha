import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { signaturePicks, newArrivals, earringProducts } from "@/data/home";

export async function GET() {
  try {
    await connectDB();
    
    // Clear existing products to avoid duplicates during seeding
    await Product.deleteMany({});

    const allProducts = [...signaturePicks, ...newArrivals, ...earringProducts];
    
    // Deduplicate by ID
    const uniqueProducts = Array.from(new Map(allProducts.map(p => [p.id, p])).values());

    const seededProducts = await Product.insertMany(
      uniqueProducts.map((p) => ({
        name: p.name,
        category: p.category,
        price: p.price,
        oldPrice: p.oldPrice,
        image: p.image,
        hoverImage: p.hoverImage,
        href: p.href,
        badge: p.badge,
        isNewArrival: p.badge === "New",
      }))
    );

    return NextResponse.json({
      message: "Seeding successful",
      count: seededProducts.length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
