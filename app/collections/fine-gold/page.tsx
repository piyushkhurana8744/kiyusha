"use client";

import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FineGoldPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const filtered = data.filter(p => 
            p.category?.toLowerCase().includes("gold") || 
            p.description?.toLowerCase().includes("18k") ||
            p.name?.toLowerCase().includes("gold")
          );
          setProducts(filtered);
        }
      })
      .catch((err) => console.error("Failed to fetch products:", err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className="overflow-x-hidden bg-ivory text-deepCharcoal">

      <header className="relative bg-[#1a1a1a] py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a]" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="container-lux relative z-10"
        >
          <p className="text-[10px] uppercase tracking-[0.6em] text-softGold font-semibold mb-6">
            Investment Grade
          </p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-warmWhite mb-8">
            Fine Gold
          </h1>
          <p className="max-w-2xl mx-auto text-warmWhite/70 text-lg leading-relaxed font-light">
            Timeless 18k and 14k gold essentials. Crafted for longevity, designed for every day. Discover the glow of pure craftsmanship.
          </p>
        </motion.div>
      </header>

      <section className="py-24 bg-warmWhite">
        <div className="container-lux">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-softGold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : products.length > 0 ? (
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id || product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-sm text-black/40 uppercase tracking-widest">
                Our fine gold collection is being curated.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
