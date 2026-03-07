import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { signaturePicks, newArrivals, earringProducts } from "@/data/home";

// Prevent Next.js from calling this route during build
export const dynamic = "force-dynamic";

// Changed to POST to prevent accidental triggers (browser visits, build pre-rendering)
export async function POST(request: Request) {
  // Safety: only allow seeding in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Seeding is disabled in production" },
      { status: 403 }
    );
  }

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

// GET now just returns info, does NOT delete anything
export async function GET() {
  return NextResponse.json({
    message: "Seed endpoint is available. Use POST method to seed data (development only).",
  });
}
