"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function SubCategoryPage() {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const subName = typeof subcategory === 'string' 
    ? subcategory.charAt(0).toUpperCase() + subcategory.slice(1).replace(/-/g, ' ')
    : '';

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Simple filtering for demonstration - in production this would be handled by API query
          const filtered = data.filter(p => 
            p.category?.toLowerCase() === category?.toString().toLowerCase() ||
            p.name?.toLowerCase().includes(subName.toLowerCase().split(' ')[0])
          );
          setProducts(filtered);
        }
      })
      .catch((err) => console.error("Failed to fetch products:", err))
      .finally(() => setIsLoading(false));
  }, [category, subName]);

  return (
    <main className="overflow-x-hidden bg-ivory text-deepCharcoal">
      <Navbar />

      <header className="relative bg-warmWhite py-16 text-center overflow-hidden border-b border-black/5">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container-lux relative z-10"
        >
          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-softGold font-medium mb-3">
            <span>Collections</span>
            <span className="text-black/20">/</span>
            <span className="capitalize">{category}</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl text-deepCharcoal mb-2">
            {subName}
          </h1>
        </motion.div>
      </header>

      <section className="py-20 min-h-[50vh]">
        <div className="container-lux">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-softGold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : products.length > 0 ? (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08 }
                }
              }}
              className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {products.slice(0, 4).map((product) => (
                <motion.div
                  key={product.id || product._id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-24">
              <p className="text-sm text-black/40 uppercase tracking-widest italic">
                Coming Socially Soon.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
