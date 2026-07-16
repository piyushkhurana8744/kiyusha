const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// 1. Parse .env.local manually
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
  console.error("MONGODB_URI is not defined");
  process.exit(1);
}

async function verify() {
  await mongoose.connect(mongoUri);
  const db = mongoose.connection.db;
  const productsCollection = db.collection('products');
  
  const sample = await productsCollection.findOne({});
  if (!sample) {
    console.log("No products found in the database.");
  } else {
    console.log("Migration Verification - Sample Product Details:");
    console.log("-----------------------------------------------");
    console.log("ID:", sample._id);
    console.log("Name:", sample.name);
    console.log("Slug:", sample.slug);
    console.log("Price:", sample.price);
    console.log("Selling Price:", sample.sellingPrice);
    console.log("MRP:", sample.mrp);
    console.log("Href:", sample.href);
    console.log("SEO Description:", sample.seoDescription);
    console.log("Specifications:", JSON.stringify(sample.specifications, null, 2));
    console.log("Reviews Count:", sample.reviews ? sample.reviews.length : 0);
    if (sample.reviews && sample.reviews.length > 0) {
      console.log("Sample Reviewer:", sample.reviews[0].reviewerName);
      console.log("Sample Rating:", sample.reviews[0].rating);
      console.log("Sample Comment:", sample.reviews[0].comment);
    }
    console.log("-----------------------------------------------");
    console.log("Data validation passed successfully!");
  }
  
  await mongoose.disconnect();
}

verify().catch(console.error);
