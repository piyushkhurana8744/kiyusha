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
          alt="Model wearing Kiyusha demi-fine jewellery"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/25 to-black/10" />
      </motion.div>

      <motion.div
        style={{ y: contentY }}
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container-lux relative flex h-full items-center"
      >
        <div className="max-w-2xl space-y-8">
          <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-softGold animate-pulse" />
            <p className="text-[10px] uppercase tracking-[0.2em] text-white">Small Batch • Handpicked • Handmade</p>
          </div>
          <h1 className="font-heading text-4xl leading-tight text-white md:text-6xl">
            Simple things, <br className="hidden md:block" /> made with love.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-white/90 md:text-lg">
            We started with a small stall and a passion for pretty things. From anti-tarnish jewellery to handmade crochet, everything we sell is handpicked to make your day a bit brighter.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/collections/new-arrivals"
              className="inline-flex items-center gap-2 bg-softGold px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg transition-all duration-300 hover:bg-deepCharcoal"
            >
              Explore Collection
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-white/40 bg-transparent px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-deepCharcoal"
            >
              Our Story
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
