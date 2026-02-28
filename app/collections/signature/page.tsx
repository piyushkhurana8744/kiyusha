"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SignaturePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Signature pieces are typically specifically flagged
          const filtered = data.filter(p => p.isSignature || p.badge === "Signature");
          // Fallback if no signature pieces exist yet
          setProducts(filtered.length > 0 ? filtered : data.slice(0, 6));
        }
      })
      .catch((err) => console.error("Failed to fetch products:", err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className="overflow-x-hidden bg-ivory text-deepCharcoal">
      <Navbar />

      <header className="relative bg-[#0f0f0f] py-40 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="container-lux relative z-10"
        >
          <p className="text-[10px] uppercase tracking-[0.8em] text-softGold font-bold mb-8">
            The Masterpiece Collection
          </p>
          <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-warmWhite mb-10 tracking-tighter">
            Signature Edits
          </h1>
          <div className="w-24 h-px bg-softGold mx-auto mb-10" />
          <p className="max-w-xl mx-auto text-warmWhite/50 text-base leading-relaxed font-light italic">
            &ldquo;Sculptural forms, hand-finished textures, and the quiet confidence of modern luxury.&rdquo;
          </p>
        </motion.div>
      </header>

      <section className="py-24 bg-warmWhite">
        <div className="container-lux">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-softGold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id || product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
