"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const giftCategories = [
  {
    title: "Gifts for Her",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
    href: "/collections/earrings"
  },
  {
    title: "Under INR 3000",
    image: "https://images.unsplash.com/photo-1612177343582-665b80f1f59f?auto=format&fit=crop&w=800&q=80",
    href: "/collections/rings"
  },
  {
    title: "Luxury Sets",
    image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=800&q=80",
    href: "/collections/gift-sets"
  }
];

export default function GiftingPage() {
  return (
    <main className="overflow-x-hidden bg-ivory text-deepCharcoal">
      <Navbar />

      <header className="relative bg-[#f9f7f4] py-32 text-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container-lux relative z-10"
        >
          <p className="text-xs uppercase tracking-[0.5em] text-softGold font-medium mb-6">
            The Art of Giving
          </p>
          <h1 className="font-heading text-5xl md:text-6xl text-deepCharcoal mb-8">
            Gifting Edit
          </h1>
          <p className="max-w-2xl mx-auto text-deepCharcoal/70 text-lg leading-relaxed font-light">
            Make every moment memorable with Kiyusha. Curated sets and timeless pieces presented in our signature luxury packaging.
          </p>
        </motion.div>
      </header>

      <section className="py-24">
        <div className="container-lux">
          <div className="grid gap-10 md:grid-cols-3">
            {giftCategories.map((cat, idx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group text-center"
              >
                <Link href={cat.href} className="block mb-6 relative aspect-[4/5] overflow-hidden subtle-border">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                <h3 className="font-heading text-xl mb-2">{cat.title}</h3>
                <Link href={cat.href} className="text-[10px] uppercase tracking-widest text-softGold font-bold hover:text-deepCharcoal transition-colors">
                  Shop Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-deepCharcoal text-warmWhite">
        <div className="container-lux text-center">
            <h2 className="font-heading text-3xl md:text-4xl mb-6">Signature Gift Packaging</h2>
            <p className="max-w-xl mx-auto text-warmWhite/60 mb-12 font-light">
                Every order arrives in our compostable signature boxes, complete with a travel pouch and a personalized note.
            </p>
            <div className="inline-block border border-softGold/30 p-1">
                <div className="border border-softGold/30 px-10 py-4 text-xs uppercase tracking-[0.3em] font-medium text-softGold">
                    Kiyusha Luxe Wrapped
                </div>
            </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
