"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, RefreshCw, Leaf, Droplets, Sparkles } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Premium Anti-Tarnish",
    desc: "Long-lasting shine that survives your daily routine."
  },
  {
    icon: ShieldCheck,
    title: "Hypoallergenic",
    desc: "Safe for sensitive skin, zero rashes guaranteed."
  },
  {
    icon: Truck,
    title: "Express Shipping",
    desc: "Pan-India delivery within 3-5 business days."
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    desc: "Hassle-free 7-day return policy."
  },
  {
    icon: Leaf,
    title: "Sustainable Packaging",
    desc: "Eco-friendly, luxury gift-ready boxes."
  },
  {
    icon: Droplets,
    title: "Water Resistant",
    desc: "Built to withstand your daily routine."
  }
];

export default function Features() {
  return (
    <section 
      style={{ backgroundColor: '#FFFFFF' }} 
      className="py-24"
    >
      <div className="container-lux">
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-softGold">What we offer</p>
          <h2 
            style={{ color: '#1E1E1E' }} 
            className="mt-4 font-heading text-4xl md:text-5xl"
          >
            A few things we care about.
          </h2>
        </div>
        
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group flex flex-col items-center text-center px-6">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-ivory text-softGold">
              <Sparkles size={28} />
            </div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-deepCharcoal">Anti-Tarnish Jewellery</h3>
            <p className="text-sm leading-relaxed text-deepCharcoal/60">Selected pieces that stay golden and don't turn black quickly.</p>
          </div>
          <div className="group flex flex-col items-center text-center px-6">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-ivory text-softGold">
              <Leaf size={28} />
            </div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-deepCharcoal">Handmade Crochet</h3>
            <p className="text-sm leading-relaxed text-deepCharcoal/60">Unique bags and accessories made by hand with lots of patience.</p>
          </div>
          <div className="group flex flex-col items-center text-center px-6">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-ivory text-softGold">
              <Droplets size={28} />
            </div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-deepCharcoal">Daily Cosmetics</h3>
            <p className="text-sm leading-relaxed text-deepCharcoal/60">Everyday essentials that we personally use and trust.</p>
          </div>
          <div className="group flex flex-col items-center text-center px-6">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-ivory text-softGold">
              <Truck size={28} />
            </div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-deepCharcoal">Honest Shipping</h3>
            <p className="text-sm leading-relaxed text-deepCharcoal/60">We ship across India and try to get it to you as fast as we can.</p>
          </div>
          <div className="group flex flex-col items-center text-center px-6">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-ivory text-softGold">
              <ShieldCheck size={28} />
            </div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-deepCharcoal">Personal Touch</h3>
            <p className="text-sm leading-relaxed text-deepCharcoal/60">We’re just a message away if you need any help with your order.</p>
          </div>
          <div className="group flex flex-col items-center text-center px-6">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-ivory text-softGold">
              <RefreshCw size={28} />
            </div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-deepCharcoal">Simple Returns</h3>
            <p className="text-sm leading-relaxed text-deepCharcoal/60">If it’s not right, we’ll make it right. No complicated processes.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
