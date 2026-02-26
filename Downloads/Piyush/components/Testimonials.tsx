"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Testimonial } from "@/types";

type TestimonialsProps = {
  items: Testimonial[];
};

export default function Testimonials({ items }: TestimonialsProps) {
  return (
    <section aria-labelledby="testimonials">
      <div className="container-lux">
        <div className="mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-softGold">Client Voices</p>
          <h2 id="testimonials" className="mt-4 font-heading text-4xl text-deepCharcoal md:text-5xl">
            Loved Across India
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="subtle-border bg-ivory p-8"
            >
              <div className="mb-5 flex items-center gap-1 text-softGold">
                {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                  <Star key={starIndex} size={16} fill="currentColor" />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed text-deepCharcoal/80">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-6">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-deepCharcoal">{testimonial.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-deepCharcoal/55">{testimonial.location}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
