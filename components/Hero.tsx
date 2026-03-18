"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Slight independent motion keeps the hero cinematic without aggressive movement.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section ref={sectionRef} className="relative h-[88vh] min-h-[620px] w-full overflow-hidden" aria-label="Hero">
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=2200&q=80"
          alt="Model wearing Kiyusha jewellery"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/10" />
      </motion.div>

      <motion.div
        style={{ y: contentY }}
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container-lux relative flex h-full items-center pt-14"
      >
        <div className="max-w-2xl space-y-8">
          <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-softGold animate-pulse" />
            <p className="text-[10px] uppercase tracking-[0.2em] text-white font-medium">✨ New Collection: Only 5-10 pieces per design</p>
          </div>
          <h1 className="font-heading text-3xl leading-tight text-white sm:text-4xl md:text-6xl">
            From our stall <br className="hidden sm:block" /> to your style.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-white/90 md:text-lg">
            We started with a small stall in local markets. Today, we bring our handpicked collection of jewellery, handmade crochet, and beauty finds directly to your doorstep.
            <span className="block mt-4 font-bold text-softGold italic">Limited stock available for each design.</span>
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/collections/new-arrivals"
              className="inline-flex items-center gap-2 bg-softGold px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg transition-all duration-300 hover:bg-white hover:text-deepCharcoal"
            >
              Shop the Collection
            </Link>
            <Link
              href="https://wa.me/918744045668"
              target="_blank"
              className="inline-flex items-center gap-2 border border-white/40 bg-white/10 backdrop-blur-sm px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-deepCharcoal"
            >
              Order on WhatsApp
            </Link>
          </div>
          <p className="text-[10px] text-white/50 uppercase tracking-widest">
            Join 100+ local families who shop with us regularly.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
