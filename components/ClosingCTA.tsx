"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ClosingCTA() {
  return (
    <section 
      style={{ backgroundColor: '#F8F5F0' }} 
      className="py-24 relative overflow-hidden border-t border-black/5"
    >
      <div className="container-lux relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-softGold font-bold">Thank you for visiting</p>
          <h2 
            style={{ color: '#1E1E1E' }} 
            className="font-heading text-4xl leading-tight md:text-6xl"
          >
            See anything you like?
          </h2>
          <p 
            style={{ color: 'rgba(30, 30, 30, 0.7)' }} 
            className="text-lg"
          >
            We’re constantly adding new handpicked items. You can also message us on WhatsApp if you want to see more real photos or have any questions.
          </p>
          
          <div className="pt-6">
            <Link
              href="/collections/new-arrivals"
              className="inline-flex items-center gap-2 bg-softGold px-10 py-5 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-xl transition-all duration-300 hover:bg-black hover:text-white active:scale-95"
            >
              See what’s new
            </Link>
            <p 
              style={{ color: 'rgba(30, 30, 30, 0.4)' }} 
              className="mt-6 text-[10px] uppercase tracking-[0.2em]"
            >
              Handpicked with care, delivered with love.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
