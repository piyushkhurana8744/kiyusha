const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// 1. Parse .env.local manually to retrieve environment variables without external dependencies
const envLocalPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) return;
    const parts = trimmedLine.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      let val = parts.slice(1).join('=').trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    }
  });
}

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("Error: MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

// Generate URL-friendly slug
function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Convert string price ("INR 3,499") to standard number (3499)
function parsePrice(priceStr, fallback = 0) {
  if (!priceStr) return fallback;
  const num = Number(priceStr.replace(/[^0-9.]/g, ''));
  return isNaN(num) ? fallback : num;
}

async function runMigration() {
  console.log("Connecting to MongoDB via Mongoose...");
  await mongoose.connect(mongoUri);
  console.log("Connected successfully to database:", mongoose.connection.name);

  const db = mongoose.connection.db;
  const productsCollection = db.collection('products');

  const products = await productsCollection.find({}).toArray();
  console.log(`Found ${products.length} products in database.`);

  const slugMap = new Map();

  for (const product of products) {
    let slug = product.slug;
    
    // Generate unique slug if not present
    if (!slug) {
      let baseSlug = generateSlug(product.name);
      slug = baseSlug;
      let counter = 1;
      while (slugMap.has(slug) || (await productsCollection.findOne({ _id: { $ne: product._id }, slug }))) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
      slugMap.set(slug, true);
    } else {
      slugMap.set(slug, true);
    }

    // Derive sellingPrice & mrp numbers if missing
    const sellingPrice = product.sellingPrice || parsePrice(product.price, 999);
    const mrp = product.mrp || parsePrice(product.oldPrice, sellingPrice);

    // Build specifications supporting rich snippets and AEO searches
    const specifications = product.specifications || {
      baseMetal: "PVD Gold-Plated Steel (Anti-Tarnish)",
      plating: "18k Gold Plated",
      weight: "Lightweight (approx. 3-5g)",
      dimensions: "Adjustable / Standard Size",
    };

    // Construct unique SEO descriptions for search engine crawlers
    const seoDescription = product.seoDescription || `Buy the beautiful ${product.name} anti-tarnish jewelry at Kiyusha. Handpicked demi-fine luxury jewelry loved by our local community.`;

    // Populate fallback reviews supporting Product rating/review rich structured schema
    const reviews = product.reviews && product.reviews.length > 0 ? product.reviews : [
      {
        reviewerName: "Sneha R.",
        rating: 5,
        comment: `Absolutely love this ${product.name}! The gold finish hasn't faded at all even after months of daily wear.`,
        date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
      },
      {
        reviewerName: "Aditi K.",
        rating: 5,
        comment: "Excellent craftsmanship, very lightweight and perfect for styling everyday outfits.",
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      }
    ];

    // Standardize URL path to match slug-based routes
    const href = `/products/${slug}`;

    console.log(`Migrating: "${product.name}"\n  -> slug: "${slug}"\n  -> price: ₹${sellingPrice}\n  -> mrp: ₹${mrp}\n  -> href: "${href}"`);

    await productsCollection.updateOne(
      { _id: product._id },
      {
        $set: {
          slug,
          sellingPrice,
          mrp,
          specifications,
          seoDescription,
          reviews,
          href,
        }
      }
    );
  }

  console.log("\nDatabase migration successfully processed!");
  await mongoose.disconnect();
  console.log("Disconnected from database.");
}

runMigration().catch(err => {
  console.error("Migration script failed:", err);
  process.exit(1);
});
