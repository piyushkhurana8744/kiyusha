"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import type { SocialPost } from "@/types";

type InstagramGalleryProps = {
  posts: SocialPost[];
};

export default function InstagramGallery({ posts }: InstagramGalleryProps) {
  return (
    <section aria-labelledby="social-gallery">
      <div className="container-lux">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-softGold">Social Gallery</p>
            <h2 id="social-gallery" className="mt-4 font-heading text-4xl text-deepCharcoal md:text-5xl">
              Styled by You
            </h2>
          </div>
          <Link
            href="https://instagram.com"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-deepCharcoal/75 transition hover:text-softGold"
          >
            <Instagram size={14} />
            Follow @kiyusha.jewels
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        >
          {posts.map((post) => (
            <article key={post.id} className="group relative h-[380px] w-[280px] shrink-0 snap-start overflow-hidden">
              <Image
                src={post.image}
                alt={post.caption}
                fill
                className="object-cover"
                sizes="280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-70 transition group-hover:opacity-90" />
              <div className="absolute inset-0 bg-softGold/15 opacity-0 transition duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-warmWhite">
                <p className="text-xs uppercase tracking-[0.16em]">{post.handle}</p>
                <p className="mt-2 text-sm">{post.caption}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
