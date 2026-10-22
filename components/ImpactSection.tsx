"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, BookOpen, Utensils, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function ImpactSection() {
  const [orderAmount, setOrderAmount] = useState(1200);

  const donationAmount = Math.round(orderAmount * 0.05);

  const getImpactDescription = (amount: number) => {
    if (amount >= 250) {
      return "Provides a complete school kit (bag, notebooks, stationery) + 5 warm meals for a child";
    } else if (amount >= 150) {
      return "Provides 4 nutritious warm meals + notebooks & pencils set for needy children";
    } else if (amount >= 80) {
      return "Provides 2 nutritious meals & learning supplies for an underprivileged child";
    } else {
      return "Provides a healthy snack kit & writing notebook for a child in need";
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-warmWhite via-ivory to-white py-24 border-y border-softGold/20">
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-softGold/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-softGold/10 blur-3xl" />

      <div className="container-lux relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-softGold/30 bg-softGold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-deepCharcoal">
            <Heart size={14} className="fill-softGold text-softGold animate-pulse" />
            <span>Kiyusha Care • 5% Social Pledge</span>
          </div>

          <h2 className="mt-6 font-heading text-3xl sm:text-4xl lg:text-5xl leading-tight text-deepCharcoal">
            Every Purchase Brings a <span className="italic text-softGold">Smile</span> to a Child in Need
          </h2>

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-deepCharcoal/75">
            Jab aap Kiyusha se koi bhi piece khareedte hain, aap sirf apni style nahi sawarte — balki 
            kisi zarooratmand bache ki zindagi me roshni bhi laate hain. <strong>Hum har purchase ka 5% hissa bacho ki education, khana aur zaroori madad me lagate hain.</strong>
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Pillar 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative rounded-2xl border border-black/5 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-softGold/40"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-softGold/15 text-softGold transition-transform duration-300 group-hover:scale-110">
              <Utensils size={26} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-softGold">Pillar 01</span>
            <h3 className="mt-2 font-heading text-xl text-deepCharcoal">Nutritious Meals & Care</h3>
            <p className="mt-3 text-sm leading-relaxed text-deepCharcoal/70">
              Underprivileged bacho aur zarooratmand parivaaron tak poshtik bhojan, milk, and seasonal essentials (jaise winter clothes) pahunchana.
            </p>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative rounded-2xl border border-black/5 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-softGold/40"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-softGold/15 text-softGold transition-transform duration-300 group-hover:scale-110">
              <BookOpen size={26} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-softGold">Pillar 02</span>
            <h3 className="mt-2 font-heading text-xl text-deepCharcoal">Child Education & Kits</h3>
            <p className="mt-3 text-sm leading-relaxed text-deepCharcoal/70">
              School stationery, copies, bags, aur basic education fees sponsor karna taaki financial dikkat kisi bache ki padhai ke beech na aaye.
            </p>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative rounded-2xl border border-black/5 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-softGold/40"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-softGold/15 text-softGold transition-transform duration-300 group-hover:scale-110">
              <ShieldCheck size={26} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-softGold">Pillar 03</span>
            <h3 className="mt-2 font-heading text-xl text-deepCharcoal">Complete Transparent Proof</h3>
            <p className="mt-3 text-sm leading-relaxed text-deepCharcoal/70">
              100% Sacchayi aur transparency. Har distribution drive ke real photos, videos aur report hum har buyer ke sath WhatsApp & Email par personally share karte hain.
            </p>
          </motion.div>
        </div>

        {/* Live Interactive Impact Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 overflow-hidden rounded-3xl border border-softGold/30 bg-white p-8 shadow-xl lg:p-12"
        >
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-softGold font-bold">
                <Sparkles size={14} />
                Live Impact Estimator
              </div>
              <h3 className="mt-3 font-heading text-2xl sm:text-3xl text-deepCharcoal">
                See How Your Order Transforms A Life
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-deepCharcoal/70">
                You never pay a single rupee extra. This 5% comes completely from Kiyusha's earnings as our moral responsibility.
              </p>

              {/* Slider / Preset Selector */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-deepCharcoal/60">
                  <span>Sample Order Value</span>
                  <span className="text-base text-deepCharcoal font-heading">₹{orderAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="100"
                  value={orderAmount}
                  onChange={(e) => setOrderAmount(Number(e.target.value))}
                  className="w-full accent-softGold h-2 bg-ivory rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-deepCharcoal/40">
                  <span>₹500</span>
                  <span>₹2,500</span>
                  <span>₹5,000</span>
                </div>
              </div>
            </div>

            {/* Calculated Impact Card */}
            <div className="rounded-2xl border border-softGold/20 bg-ivory/70 p-6 sm:p-8 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 border-b border-black/5 pb-6">
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-deepCharcoal/50 font-bold">5% Donated By Us</p>
                  <p className="mt-1 font-heading text-3xl sm:text-4xl text-softGold font-bold">₹{donationAmount}</p>
                </div>
                <div className="rounded-full bg-softGold/15 px-3.5 py-1 text-xs font-medium text-deepCharcoal">
                  Zero Cost to You
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 text-softGold flex-shrink-0" />
                  <p className="text-sm font-medium text-deepCharcoal">
                    {getImpactDescription(donationAmount)}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 text-softGold flex-shrink-0" />
                  <p className="text-xs text-deepCharcoal/70">
                    Real photos & proof sent directly to your registered WhatsApp & Email.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/impact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-deepCharcoal px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-warmWhite hover:bg-black transition-all"
                >
                  Read Our Full Promise
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/collections"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-deepCharcoal/20 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-deepCharcoal hover:border-softGold hover:text-softGold transition-all"
                >
                  Shop With Purpose
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
