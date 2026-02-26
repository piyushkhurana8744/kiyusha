"use client";

import CollectionGrid from "@/components/CollectionGrid";
import FeaturedSection from "@/components/FeaturedSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import InstagramGallery from "@/components/InstagramGallery";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Testimonials from "@/components/Testimonials";
import { collections, featuredLook, signaturePicks as staticPicks, socialPosts, testimonials } from "@/data/home";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>(staticPicks);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Filter for products that should be on home (e.g. isFeatured or just the first few)
          const featured = data.filter(p => p.isFeatured);
          setProducts(featured.length > 0 ? featured : data.slice(0, 8));
        }
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);
  return (
    <main className="overflow-x-hidden bg-ivory text-deepCharcoal">
      <Navbar />
      <Hero />

      <section className="py-24">
        <CollectionGrid collections={collections} />
      </section>

      <section className="bg-warmWhite py-24">
        <FeaturedSection featured={featuredLook} />
      </section>

      <section className="py-24" aria-labelledby="signature-picks">
        <div className="container-lux">
          <div className="mb-14 text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-softGold">Signature Picks</p>
            <h2 id="signature-picks" className="mt-4 font-heading text-4xl text-deepCharcoal md:text-5xl">
              Editor Curated Essentials
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id || product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warmWhite py-24">
        <Testimonials items={testimonials} />
      </section>

      <section className="py-24">
        <InstagramGallery posts={socialPosts} />
      </section>

      <Footer />
    </main>
  );
}
