"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categoryName = typeof category === 'string' 
    ? category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')
    : '';

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Normalizing category comparison
          const filtered = data.filter(p => 
            p.category?.toLowerCase() === category?.toString().toLowerCase() ||
            p.category?.toLowerCase() === categoryName.toLowerCase()
          );
          setProducts(filtered);
        }
      })
      .catch((err) => console.error("Failed to fetch products:", err))
      .finally(() => setIsLoading(false));
  }, [category, categoryName]);

  return (
    <main className="overflow-x-hidden bg-ivory text-deepCharcoal">
      <Navbar />

      <header className="relative bg-warmWhite py-20 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-softGold rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container-lux relative z-10"
        >
          <p className="text-[10px] uppercase tracking-[0.5em] text-softGold font-medium mb-3">
            Collection
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-deepCharcoal mb-4 capitalize">
            {categoryName}
          </h1>
          <p className="max-w-xl mx-auto text-deepCharcoal/60 text-base leading-relaxed font-light">
            Refined pieces sculpted for the modern silhouette. Discover our curated selection of {categoryName.toLowerCase()}.
          </p>
        </motion.div>
      </header>

      <section className="py-20 min-h-[50vh]">
        <div className="container-lux">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <p className="text-xs font-medium text-deepCharcoal/40 uppercase tracking-widest">
              {products.length} {products.length === 1 ? 'Style' : 'Styles'} Available
            </p>
            <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] border-b border-black/5 pb-2">
              <button className="hover:text-softGold transition-colors">Refine</button>
              <button className="hover:text-softGold transition-colors">Sort By</button>
            </div>
          </div>

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
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {products.map((product) => (
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
            <div className="text-center py-24 bg-warmWhite/30 subtle-border">
              <p className="text-sm text-black/40 uppercase tracking-widest italic">
                Our curated {categoryName.toLowerCase()} collection is arriving soon.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
