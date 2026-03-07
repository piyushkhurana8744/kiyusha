"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Instagram, Phone, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

type OwnerInfo = {
  name: string;
  title: string;
  photo: string;
  story: string;
  email: string;
  instagram: string;
  phone: string;
};

export default function AboutPage() {
  const [owner, setOwner] = useState<OwnerInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data?.ownerInfo?.name) {
          setOwner(data.ownerInfo);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="overflow-x-hidden bg-ivory text-deepCharcoal">

      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[320px] flex items-center justify-center bg-deepCharcoal overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-deepCharcoal/90" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-center z-10"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-softGold mb-4">
            Our Story
          </p>
          <h1 className="font-heading text-5xl md:text-6xl text-warmWhite">
            About Kiyusha
          </h1>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="container-lux">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-2 border-softGold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : owner ? (
            <div className="grid gap-16 lg:grid-cols-2 items-start">
              {/* Photo */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="relative"
              >
                {owner.photo ? (
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={owner.photo}
                      alt={owner.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-warmWhite flex items-center justify-center shadow-inner">
                    <p className="text-deepCharcoal/20 text-sm uppercase tracking-widest">
                      No Photo Yet
                    </p>
                  </div>
                )}
                {/* Name card overlay */}
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-lg border border-black/5 max-w-[280px]">
                  <p className="font-heading text-2xl text-deepCharcoal">
                    {owner.name}
                  </p>
                  {owner.title && (
                    <p className="text-sm text-softGold mt-1 uppercase tracking-widest font-medium">
                      {owner.title}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Story + Contact */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="space-y-10"
              >
                <div className="space-y-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-softGold">
                    The Story Behind the Brand
                  </p>
                  <div className="prose prose-lg max-w-none">
                    {owner.story.split("\n").map((paragraph, idx) => (
                      <p
                        key={idx}
                        className="text-deepCharcoal/80 leading-relaxed text-base md:text-lg"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                {(owner.email || owner.instagram || owner.phone) && (
                  <div className="space-y-4 pt-8 border-t border-black/5">
                    <p className="text-xs uppercase tracking-[0.25em] text-deepCharcoal/40 font-bold">
                      Get in Touch
                    </p>
                    <div className="space-y-3">
                      {owner.email && (
                        <a
                          href={`mailto:${owner.email}`}
                          className="flex items-center gap-3 text-sm text-deepCharcoal/70 hover:text-deepCharcoal transition-colors group"
                        >
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-softGold/10 text-softGold group-hover:bg-softGold/20 transition-colors">
                            <Mail size={16} />
                          </span>
                          {owner.email}
                        </a>
                      )}
                      {owner.instagram && (
                        <a
                          href={`https://instagram.com/${owner.instagram.replace("@", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-sm text-deepCharcoal/70 hover:text-deepCharcoal transition-colors group"
                        >
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-softGold/10 text-softGold group-hover:bg-softGold/20 transition-colors">
                            <Instagram size={16} />
                          </span>
                          {owner.instagram}
                        </a>
                      )}
                      {owner.phone && (
                        <a
                          href={`tel:${owner.phone}`}
                          className="flex items-center gap-3 text-sm text-deepCharcoal/70 hover:text-deepCharcoal transition-colors group"
                        >
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-softGold/10 text-softGold group-hover:bg-softGold/20 transition-colors">
                            <Phone size={16} />
                          </span>
                          {owner.phone}
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <Link
                  href="/collections"
                  className="gold-solid-button inline-flex items-center gap-2"
                >
                  Explore Collections
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          ) : (
            /* Fallback when no owner info is set */
            <div className="text-center py-20 space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-softGold/10 flex items-center justify-center">
                <Mail size={32} className="text-softGold" />
              </div>
              <div className="space-y-3">
                <h2 className="font-heading text-3xl text-deepCharcoal">
                  Our Story is Coming Soon
                </h2>
                <p className="text-deepCharcoal/60 max-w-md mx-auto">
                  We&apos;re crafting something special. Check back soon to learn
                  more about the heart and soul behind Kiyusha.
                </p>
              </div>
              <Link
                href="/"
                className="gold-solid-button inline-flex items-center gap-2"
              >
                Back to Home
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
