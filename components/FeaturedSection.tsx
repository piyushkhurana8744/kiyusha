"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { FeaturedLook } from "@/types";

type FeaturedSectionProps = {
  featured: FeaturedLook;
};

export default function FeaturedSection({ featured }: FeaturedSectionProps) {
  return (
    <section aria-labelledby="featured-look">
      <div className="container-lux grid items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.55 }}
          className="relative h-[520px] overflow-hidden"
        >
          <Image
            src={featured.image}
            alt={featured.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.25em] text-softGold">{featured.subtitle}</p>
            <h2 id="featured-look" className="font-heading text-4xl leading-tight text-deepCharcoal md:text-5xl">
              {featured.title}
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-deepCharcoal/80 md:text-base">{featured.description}</p>
          </div>

          <ul className="space-y-3">
            {featured.highlights.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-deepCharcoal/80">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-softGold/15 text-softGold">
                  <Check size={14} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <Link href={featured.ctaHref} className="gold-solid-button">
            Shop the Look
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
