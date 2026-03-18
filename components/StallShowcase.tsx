"use client";

import { motion } from "framer-motion";
import { MessageCircle, MapPin, Camera } from "lucide-react";

export default function StallShowcase() {
  return (
    <section className="bg-ivory py-24 overflow-hidden" aria-labelledby="stall-showcase">
      <div className="container-lux">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          {/* Stall Proof Section */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-softGold/10 px-3 py-1 text-softGold">
              <MapPin size={14} />
              <span className="text-[10px] uppercase tracking-widest font-bold">Seen at Local Stalls</span>
            </div>
            <h2 id="stall-showcase" className="font-heading text-4xl leading-tight text-deepCharcoal md:text-5xl">
              From our stall <br /> to your <span className="text-softGold italic">Home.</span>
            </h2>
            <p className="text-deepCharcoal/70 text-lg leading-relaxed">
              We love meeting our customers in person! You might have seen us at weekend markets or local stalls. 
              We're now bringing that same personal touch and handpicked selection to our online store.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="aspect-square bg-warmWhite rounded-lg flex items-center justify-center border border-black/5 overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&w=600&q=80" 
                  alt="Stall setup" 
                  className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/20 flex items-end p-4">
                  <p className="text-white text-[10px] font-bold uppercase tracking-widest">Market Day Recap</p>
                </div>
              </div>
              <div className="aspect-square bg-warmWhite rounded-lg flex items-center justify-center border border-black/5 overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80" 
                  alt="Packing orders" 
                  className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/20 flex items-end p-4">
                  <p className="text-white text-[10px] font-bold uppercase tracking-widest">Behind the Scenes</p>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Proof Section */}
          <div className="relative bg-white p-8 md:p-12 shadow-2xl rounded-3xl border border-black/5">
            <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 bg-green-500 text-white p-4 rounded-2xl shadow-lg rotate-12 flex items-center gap-2">
              <MessageCircle size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">WhatsApp Live!</span>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-softGold/20 flex items-center justify-center text-softGold flex-shrink-0">
                  <Camera size={20} />
                </div>
                <div className="bg-ivory p-4 rounded-2xl rounded-tl-none space-y-2 max-w-[80%]">
                  <p className="text-xs text-deepCharcoal/60 font-bold uppercase tracking-widest">Customer Selfie</p>
                  <p className="text-sm text-deepCharcoal italic leading-relaxed">
                    "Just received my crochet bag! It's even prettier in person. Thank you for the quick delivery!"
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start justify-end">
                <div className="bg-softGold p-4 rounded-2xl rounded-tr-none space-y-2 max-w-[80%] text-white">
                  <p className="text-xs text-white/60 font-bold uppercase tracking-widest text-right">Our Reply</p>
                  <p className="text-sm leading-relaxed text-right">
                    "So glad you liked it! It was hand-made with love. Tag us when you carry it! ❤️"
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-softGold flex items-center justify-center text-white flex-shrink-0">
                  <span className="text-xs font-bold">K</span>
                </div>
              </div>

              <div className="pt-8 text-center">
                <p className="text-[10px] text-deepCharcoal/40 uppercase tracking-[0.2em] mb-4">Join our happy WhatsApp community</p>
                <a 
                  href="https://wa.me/918744045668" 	
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-105"
                >
                  Message for Real Photos
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
