import cloudinary from "@/lib/cloudinary";
import { readdir } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

export async function GET() {
  try {
    let media: any[] = [];

    // 1. Get local files
    try {
      const uploadsDir = join(process.cwd(), "public", "uploads");
      const files = await readdir(uploadsDir);
      media = files
        .filter(file => !file.startsWith("."))
        .map(file => ({
          _id: file,
          name: file,
          url: `/uploads/${file}`,
          type: "local"
        }));
    } catch (e) {
      // Local dir might not exist, ignore
    }

    // 2. Get Cloudinary files
    try {
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'kiyusha/',
        max_results: 100
      });
      
      const cloudMedia = result.resources.map((resource: any) => ({
        _id: resource.public_id,
        name: resource.public_id,
        url: resource.secure_url,
        type: "cloudinary",
        publicId: resource.public_id,
        format: resource.format,
        width: resource.width,
        height: resource.height,
        createdAt: resource.created_at
      }));

      media = [...media, ...cloudMedia];
    } catch (e) {
      console.error("Cloudinary fetch error:", e);
    }

    return NextResponse.json(media);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Convert buffer to base64
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64, {
      folder: "kiyusha",
      resource_type: "image"
    });

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
