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

    // Helper to generate slug inside mapping
    const generateSlug = (name: string) => {
      return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    };

    // Helper to parse price string to number
    const parsePrice = (priceStr?: string, fallback = 0) => {
      if (!priceStr) return fallback;
      const num = Number(priceStr.replace(/[^0-9.]/g, ""));
      return isNaN(num) ? fallback : num;
    };

    const seededProducts = await Product.insertMany(
      uniqueProducts.map((p) => {
        const slug = generateSlug(p.name);
        const sellingPrice = parsePrice(p.price, 999);
        const mrp = parsePrice(p.oldPrice, sellingPrice);

        return {
          name: p.name,
          slug,
          category: p.category,
          price: p.price,
          oldPrice: p.oldPrice,
          sellingPrice,
          mrp,
          image: p.image,
          hoverImage: p.hoverImage,
          href: `/products/${slug}`,
          badge: p.badge,
          isNewArrival: p.badge === "New",
          seoDescription: `Buy the beautiful ${p.name} anti-tarnish jewelry at Kiyusha. Handpicked demi-fine luxury jewelry loved by our local community.`,
          specifications: {
            baseMetal: "PVD Gold-Plated Steel (Anti-Tarnish)",
            plating: "18k Gold Plated",
            weight: "Lightweight (approx. 3-5g)",
            dimensions: "Adjustable / Standard Size",
          },
          reviews: [
            {
              reviewerName: "Sneha R.",
              rating: 5,
              comment: `Absolutely love this ${p.name}! The gold finish hasn't faded at all even after months of daily wear.`,
              date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
            },
            {
              reviewerName: "Aditi K.",
              rating: 5,
              comment: "Excellent craftsmanship, very lightweight and perfect for styling everyday outfits.",
              date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
            }
          ]
        };
      })
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
