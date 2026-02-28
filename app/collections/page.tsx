"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { collections } from "@/data/home";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function CollectionsPage() {
  return (
    <main className="overflow-x-hidden bg-ivory text-deepCharcoal">
      <Navbar />

      <header className="relative bg-warmWhite py-24 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-[800px] h-[400px] bg-softGold rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container-lux relative z-10"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-softGold font-medium mb-4">
            The Edit
          </p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-deepCharcoal mb-6">
            All Collections
          </h1>
          <p className="max-w-2xl mx-auto text-deepCharcoal/70 text-lg leading-relaxed font-light">
            Explore our curated edits of demi-fine jewellery, from architectural earrings to layered chains, each piece sculpted for modern luxury.
          </p>
        </motion.div>
      </header>

      <section className="py-24">
        <div className="container-lux">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative h-[500px] overflow-hidden bg-warmWhite subtle-border"
              >
                <Link href={collection.href} className="block h-full w-full">
                  <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deepCharcoal/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
                  </div>
                  
                  <div className="absolute inset-x-0 bottom-0 p-8 text-warmWhite">
                    <h3 className="font-heading text-2xl mb-2">{collection.title}</h3>
                    <p className="text-sm font-light text-warmWhite/80 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      {collection.tagline}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-widest font-medium">
                      <span className="h-px w-8 bg-softGold" />
                      Shop Collection
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
