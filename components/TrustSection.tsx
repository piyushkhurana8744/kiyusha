"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Handpicked Designs", value: "Curated" },
  { label: "Quality Checked", value: "100%" },
  { label: "Secure Payments", value: "Safe" },
  { label: "Loved Locally", value: "Stall Favs" },
];

export default function TrustSection() {
  return (
    <section 
      style={{ backgroundColor: '#FFFFFF' }} 
      className="py-16 border-y border-ivory"
    >
      <div className="container-lux text-center mb-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-softGold font-bold mb-4">From our family to yours</p>
        <h2 className="font-heading text-3xl text-deepCharcoal md:text-4xl">Human Touch, Always.</h2>
        <p className="mt-4 text-sm text-deepCharcoal/60 max-w-xl mx-auto italic">"We believe jewellery shouldn't just look good; it should feel like a part of your story."</p>
      </div>
      
      <div className="container-lux mb-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl font-heading text-softGold md:text-4xl">{stat.value}</p>
              <p 
                style={{ color: 'rgba(30, 30, 30, 0.6)' }} 
                className="mt-2 text-[10px] uppercase tracking-[0.2em]"
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
