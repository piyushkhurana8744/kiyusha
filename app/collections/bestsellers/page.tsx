"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BestsellersPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const filtered = data.filter(p => p.badge === "Bestseller" || p.isBestseller);
          setProducts(filtered);
        }
      })
      .catch((err) => console.error("Failed to fetch products:", err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className="overflow-x-hidden bg-ivory text-deepCharcoal">
      <Navbar />

      <header className="relative bg-warmWhite py-24 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-softGold/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-softGold/20 rounded-full blur-[100px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container-lux relative z-10"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-softGold font-medium mb-4">
            Most Loved
          </p>
          <h1 className="font-heading text-5xl md:text-6xl text-deepCharcoal mb-6">
            Bestsellers
          </h1>
          <p className="max-w-xl mx-auto text-deepCharcoal/60 text-lg leading-relaxed font-light">
            The pieces you can&apos;t get enough of. Our community&apos;s most-coveted edits, from signature huggies to timeless layered chains.
          </p>
        </motion.div>
      </header>

      <section className="py-20 min-h-[50vh]">
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
            <div className="text-center py-24 bg-white/50 subtle-border">
              <p className="text-sm text-black/40 uppercase tracking-widest italic">
                Our bestsellers are being refreshed.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
