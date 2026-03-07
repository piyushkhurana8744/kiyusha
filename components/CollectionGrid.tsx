"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CollectionCard } from "@/types";

type CollectionGridProps = {
  collections: CollectionCard[];
};

export default function CollectionGrid({ collections }: CollectionGridProps) {
  return (
    <section aria-labelledby="curated-collections">
      <div className="container-lux">
        <div className="mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-softGold">Signature Picks</p>
          <h2 id="curated-collections" className="mt-4 font-heading text-4xl text-deepCharcoal md:text-5xl">
            Kiyusha's signature
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {collections.map((collection, index) => (
            <motion.article
              key={collection.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group relative h-[420px] overflow-hidden"
            >
              <Image
                src={collection.image}
                alt={`${collection.title} collection`}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute inset-0 border border-transparent transition duration-500 group-hover:border-softGold" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-heading text-3xl text-warmWhite">{collection.title}</h3>
                <p className="mt-2 text-sm text-warmWhite/90">{collection.tagline}</p>
                <Link
                  href={collection.href}
                  className="mt-5 inline-flex text-xs uppercase tracking-[0.2em] text-softGold transition group-hover:text-warmWhite"
                >
                  Explore Collection
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
