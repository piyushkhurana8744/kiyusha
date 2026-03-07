import connectDB from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";
import { NextResponse } from "next/server";

// Prevent Next.js from pre-rendering this route during build
export const dynamic = "force-dynamic";

/**
 * GET /api/settings
 * Returns the singleton site-settings document.
 * If none exists yet it returns sensible defaults from the schema.
 */
export async function GET() {
  try {
    await connectDB();
    let settings = await SiteSettings.findOne({ key: "main" });

    if (!settings) {
      // Return schema defaults without persisting
      settings = new SiteSettings();
    }

    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * PUT /api/settings
 * Upserts the singleton site-settings document.
 */
export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const settings = await SiteSettings.findOneAndUpdate(
      { key: "main" },
      { $set: body },
      { upsert: true, new: true, runValidators: true }
    );

    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
