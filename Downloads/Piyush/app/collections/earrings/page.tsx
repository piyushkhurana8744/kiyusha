"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { earringProducts as staticEarrings } from "@/data/home";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function EarringsPage() {
  const [products, setProducts] = useState<any[]>(staticEarrings);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const filtered = data.filter(p => p.category === "Earrings");
          if (filtered.length > 0) setProducts(filtered);
        }
      })
      .catch((err) => console.error("Failed to fetch earrings:", err));
  }, []);
  return (
    <main className="overflow-x-hidden bg-ivory text-deepCharcoal">
      <Navbar />

      <header className="relative bg-warmWhite py-24 text-center overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-softGold rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container-lux relative z-10"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-softGold font-medium mb-4">
            Category
          </p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-deepCharcoal mb-6">
            Earrings
          </h1>
          <p className="max-w-2xl mx-auto text-deepCharcoal/70 text-lg leading-relaxed font-light">
            From subtle studs to architectural drops, explore our curated selection of earrings designed to frame the face with light and modern luxury.
          </p>
        </motion.div>
      </header>

      <section className="py-20 min-h-[60vh]">
        <div className="container-lux">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <p className="text-sm font-medium text-deepCharcoal/50 uppercase tracking-widest">
                {products.length} Selected Styles
              </p>
            </div>
            <div className="flex gap-8 text-xs uppercase tracking-widest border-b border-black/10 pb-2">
              <button className="hover:text-softGold transition-colors">Sort By</button>
              <button className="hover:text-softGold transition-colors">Filter</button>
            </div>
          </div>

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {products.map((product) => (
              <motion.div
                key={product.id || product._id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
