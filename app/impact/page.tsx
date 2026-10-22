"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Heart, 
  BookOpen, 
  Utensils, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Send, 
  FileText, 
  Users, 
  HelpCircle,
  MessageCircle
} from "lucide-react";
import Footer from "@/components/Footer";

export default function ImpactPage() {
  const [orderAmount, setOrderAmount] = useState(1500);

  const donationAmount = Math.round(orderAmount * 0.05);

  const getImpactStory = (amount: number) => {
    if (amount >= 250) {
      return {
        badge: "Full Educational Kit + Meals",
        title: "1 Child's Entire School Starter Pack",
        description: "Covers a sturdy school bag, 6 notebooks, stationery box, geometry kit, plus 5 wholesome hot meals."
      };
    } else if (amount >= 150) {
      return {
        badge: "Nutritional Care + Books",
        title: "Weekly Meals & Study Kit",
        description: "Supplies 4 wholesome warm meals, 3 notebooks, and essential writing supplies for a child in need."
      };
    } else if (amount >= 80) {
      return {
        badge: "Essential Support",
        title: "2 Warm Meals & Study Material",
        description: "Provides 2 complete nutritious meals and basic notebooks for an underprivileged student."
      };
    } else {
      return {
        badge: "Direct Snack & Stationery",
        title: "Healthy Snack & Writing Pad",
        description: "Provides a fresh fruit & snack kit along with a notebook to bring a joyful smile to a little one."
      };
    }
  };

  const impactData = getImpactStory(donationAmount);

  const steps = [
    {
      num: "01",
      icon: Sparkles,
      title: "You Shop Your Favorites",
      desc: "Whenever you purchase jewellery, crochet, or gifts on Kiyusha, your order automatically qualifies for our 5% care pledge."
    },
    {
      num: "02",
      icon: Heart,
      title: "5% Dedicated From Our Revenue",
      desc: "Exactly 5% of your product value is transferred to our Child Welfare & Support Fund. You never pay any extra rupee; this is our contribution from our profits."
    },
    {
      num: "03",
      icon: Utensils,
      title: "Direct Ground Distribution",
      desc: "We organize monthly community drives to supply nutritious meals, school books, stationery, and winter clothes directly to needy children and families."
    },
    {
      num: "04",
      icon: FileText,
      title: "100% Proof Shared With You",
      desc: "Complete transparency! After every distribution drive, we send real photos, videos, and an impact summary directly to you on WhatsApp & Email."
    }
  ];

  const faqs = [
    {
      q: "Kya mujhe koi extra charge ya donation fee deni hogi?",
      a: "Bilkul nahi! Aapko sirf apne product ki actual price deni hoti hai. Ye 5% amount Kiyusha apni khud ki sales aur profits me se alag nikal kar zarooratmand bacho ki madad me lagata hai."
    },
    {
      q: "Mujhe proof kaise milega ki mera contribution sahi jagah gaya?",
      a: "Hum har drive ke genuine photos, videos aur distribution updates aapke order ke registered WhatsApp number aur Email par share karte hain. Aap khud dekh sakte hain ki aapke purchase se kis bache ke chehre par muskaan aayi."
    },
    {
      q: "5% donation ka use kis cheez ke liye hota hai?",
      a: "Mainly teen cheezon ke liye: (1) Underprivileged bacho ki school stationery, books aur education fees, (2) Poshtik bhojan aur ration kits, aur (3) Zaroorat ke waqt seasonal kapde (jaise winters me sweaters/blankets)."
    },
    {
      q: "Kya main koi particular bacha ya local NGO suggest kar sakta hoon?",
      a: "Haan, bilkul! Agar aapke aas-paas koi aise bache ya parivaar hain jinhe sacche dil se madad ki zaroorat hai, aap hume directly WhatsApp par contact karke suggest kar sakte hain. Hum verify karke unhe prioritize karenge."
    }
  ];

  return (
    <main className="min-h-screen bg-warmWhite text-deepCharcoal pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-white to-warmWhite border-b border-black/5">
        <div className="container-lux text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-softGold/30 bg-softGold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-deepCharcoal">
              <Heart size={14} className="fill-softGold text-softGold" />
              <span>Kiyusha Care • 5% Social Mission</span>
            </div>

            <h1 className="mt-6 font-heading text-4xl sm:text-5xl lg:text-6xl text-deepCharcoal leading-tight">
              Wear Beauty. <span className="italic text-softGold">Share Hope.</span>
            </h1>

            <p className="mt-6 text-base sm:text-xl leading-relaxed text-deepCharcoal/75 max-w-2xl mx-auto">
              5% of every purchase goes directly towards helping underprivileged children and needy families — with <strong>100% transparent proof and real updates</strong> shared with you.
            </p>
          </motion.div>

          {/* Quick Metrics */}
          <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <p className="font-heading text-3xl sm:text-4xl text-softGold font-bold">5%</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-deepCharcoal/60">From Every Order</p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <p className="font-heading text-3xl sm:text-4xl text-softGold font-bold">₹0</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-deepCharcoal/60">Extra Cost to Buyer</p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <p className="font-heading text-3xl sm:text-4xl text-softGold font-bold">100%</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-deepCharcoal/60">Verified Proof</p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <p className="font-heading text-3xl sm:text-4xl text-softGold font-bold">Direct</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-deepCharcoal/60">WhatsApp / Email Updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Story & Why We Do This */}
      <section className="py-20 bg-ivory">
        <div className="container-lux">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-softGold font-bold">Why We Started This</p>
              <h2 className="mt-4 font-heading text-3xl sm:text-4xl text-deepCharcoal leading-tight">
                Business Is Meaningless Without <span className="italic text-softGold">Compassion.</span>
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-deepCharcoal/80">
                <p>
                  Kiyusha shuru hua tha local stalls se, logon se mil kar, unke chehre ki muskaan dekh kar. Jab humne ye brand banaya, toh humara ek hi sankalp tha — <strong>hum sirf samaan bechne nahi aaye hain, balki kisi ki zindagi me sach me badlaav laana chahte hain.</strong>
                </p>
                <p>
                  Kitne hi bache aise hain jinhe ek waqt ka poshtik khana ya school ki copy-kitab bhi naseeb nahi hoti. Isiliye humne tay kiya ki <strong>har customer ke purchase amount ka 5% hissa hum seedha in bacho aur needy families ki help me lagayenge.</strong>
                </p>
                <p className="font-medium text-deepCharcoal">
                  Sabse zaroori baat: Hum aapse donation nahi maang rahe. Ye paisa hum apne profits me se dede hain, aur har drive ka complete proof photos aur videos ke sath aap tak share karte hain.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-softGold/30 bg-white p-8 sm:p-10 shadow-xl space-y-6">
              <h3 className="font-heading text-2xl text-deepCharcoal flex items-center gap-3">
                <ShieldCheck className="text-softGold" size={28} />
                Our 3 Transparency Pledges
              </h3>

              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-softGold/20 text-softGold font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-deepCharcoal">No Middlemen Loss</h4>
                    <p className="mt-1 text-xs text-deepCharcoal/70">
                      We buy essential food, clothes, and school bags directly from wholesalers and distribute them directly by hand.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-softGold/20 text-softGold font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-deepCharcoal">Direct WhatsApp & Email Updates</h4>
                    <p className="mt-1 text-xs text-deepCharcoal/70">
                      When a drive is conducted, photos, receipts, and beneficiary smiles are shared straight to your phone.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-softGold/20 text-softGold font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-deepCharcoal">Community Open Audits</h4>
                    <p className="mt-1 text-xs text-deepCharcoal/70">
                      Any customer can message us anytime to ask for details, verify contributions, or join our local distribution drives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step by Step Flow */}
      <section className="py-24 bg-white">
        <div className="container-lux">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-softGold font-bold">Step-by-Step Transparency</p>
            <h2 className="mt-4 font-heading text-3xl sm:text-4xl text-deepCharcoal">
              How The Process Works
            </h2>
            <p className="mt-4 text-sm text-deepCharcoal/70">
              Clear, simple, and 100% accountable from the moment you place your order.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.num}
                  className="relative rounded-2xl border border-black/5 bg-warmWhite p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="font-heading text-4xl font-bold text-softGold/40">{step.num}</span>
                  <div className="my-4 flex h-12 w-12 items-center justify-center rounded-xl bg-softGold/15 text-softGold">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-heading text-lg text-deepCharcoal font-semibold">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-deepCharcoal/70">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Calculator */}
      <section className="py-20 bg-gradient-to-b from-ivory to-warmWhite">
        <div className="container-lux max-w-4xl">
          <div className="overflow-hidden rounded-3xl border border-softGold/30 bg-white p-8 sm:p-12 shadow-xl">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-[0.25em] text-softGold font-bold">Interactive Tool</span>
              <h2 className="mt-2 font-heading text-3xl text-deepCharcoal">Calculate Your Order's Impact</h2>
              <p className="mt-2 text-xs sm:text-sm text-deepCharcoal/60">
                Move the slider to see how much is donated from your purchase and what it accomplishes.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center text-sm font-bold text-deepCharcoal">
                <span>Select Order Total</span>
                <span className="font-heading text-2xl text-softGold">₹{orderAmount.toLocaleString()}</span>
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

              <div className="flex justify-between text-xs text-deepCharcoal/40">
                <span>₹500</span>
                <span>₹2,500</span>
                <span>₹5,000</span>
              </div>
            </div>

            {/* Impact display */}
            <div className="mt-10 rounded-2xl border border-softGold/20 bg-ivory/60 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-black/5 pb-4">
                <div>
                  <span className="inline-block rounded-full bg-softGold/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-deepCharcoal mb-2">
                    {impactData.badge}
                  </span>
                  <h4 className="font-heading text-xl text-deepCharcoal font-semibold">{impactData.title}</h4>
                </div>
                <div className="text-right sm:text-right">
                  <p className="text-[10px] uppercase tracking-widest text-deepCharcoal/50 font-bold">5% Donated by Kiyusha</p>
                  <p className="font-heading text-3xl text-softGold font-bold">₹{donationAmount}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-deepCharcoal/75">
                {impactData.description}
              </p>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 rounded-xl bg-deepCharcoal px-8 py-4 text-xs font-bold uppercase tracking-widest text-warmWhite hover:bg-black transition-all shadow-lg shadow-black/10"
              >
                Start Shopping With A Purpose
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container-lux max-w-3xl">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-softGold font-bold">Questions & Clarity</p>
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl text-deepCharcoal">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-black/5 bg-warmWhite p-6">
                <h3 className="font-heading text-lg font-semibold text-deepCharcoal flex items-start gap-3">
                  <HelpCircle size={20} className="text-softGold flex-shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-deepCharcoal/75 pl-8">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          {/* Suggest a cause card */}
          <div className="mt-14 rounded-2xl border border-softGold/30 bg-softGold/10 p-8 text-center space-y-4">
            <h3 className="font-heading text-2xl text-deepCharcoal">Know a Child or Family in Need?</h3>
            <p className="text-sm text-deepCharcoal/70 max-w-lg mx-auto">
              Agar aap kisi aise bache ya family ko jante hain jinki padhai ya ration me madad ki zaroorat hai, hume zaroor batayein.
            </p>
            <a
              href="https://wa.me/918744045668?text=Hi%20Kiyusha,%20I%20want%20to%20suggest%20a%20cause/child%20for%20the%205%25%20initiative"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-green-700 transition-colors"
            >
              <MessageCircle size={16} />
              Suggest on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
