"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const values = [
  {
    title: "Anti-Tarnish Finish",
    description: "Designed to stay golden through sweat, water, and daily wear."
  },
  {
    title: "Hypoallergenic",
    description: "Nickel-free and lead-free. Safe for even the most sensitive skin."
  },
  {
    title: "Ethically Crafted",
    description: "Handcrafted by local Indian artisans with a focus on quality."
  }
];

export default function ValueProp() {
  return (
    <section className="bg-ivory py-24">
      <div className="container-lux">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-softGold">Our Heart</p>
            <h2 className="mt-6 font-heading text-4xl leading-tight text-deepCharcoal md:text-5xl">
              We started from <br /> local stalls with a <span className="text-softGold italic">Big Dream.</span>
            </h2>
            <p className="mt-8 text-deepCharcoal/70 leading-relaxed md:text-lg">
              Kiyusha isn't just a store; it's a journey that began at weekend markets and small local stalls. 
              We saw how much people loved unique, affordable pieces, and we decided to bring that same personal touch and handpicked quality to everyone across India.
            </p>
            
            <ul className="mt-10 space-y-6">
              <li className="flex gap-4">
                <div className="flex-shrink-0 mt-1 h-5 w-5 rounded-full bg-softGold/10 flex items-center justify-center text-softGold">
                  <Check size={14} />
                </div>
                <div>
                  <h3 className="font-semibold text-deepCharcoal uppercase tracking-widest text-xs">Affordable & Real</h3>
                  <p className="mt-1 text-sm text-deepCharcoal/60">We keep prices low because we believe looking good shouldn't be expensive.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 mt-1 h-5 w-5 rounded-full bg-softGold/10 flex items-center justify-center text-softGold">
                  <Check size={14} />
                </div>
                <div>
                  <h3 className="font-semibold text-deepCharcoal uppercase tracking-widest text-xs">Handmade with Heart</h3>
                  <p className="mt-1 text-sm text-deepCharcoal/60">Our crochet items are made slowly and carefully by hand.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
            <img 
              src="https://res.cloudinary.com/dnfz4jwam/image/upload/v1773820312/Jewelry_showcase_with_warm_smiles_n8toym.png" 
              alt="Jewelry showcase with warm smiles" 
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-8 left-8 right-8 bg-white/90 p-6 backdrop-blur-md">
              <p className="text-xs uppercase tracking-widest font-bold text-softGold">Product Focus</p>
              <p className="mt-2 text-sm text-deepCharcoal font-heading italic">"From our stall to your style."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
