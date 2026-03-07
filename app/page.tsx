"use client";

import CollectionGrid from "@/components/CollectionGrid";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Testimonials from "@/components/Testimonials";
import Image from "next/image";
import Link from "next/link";
import { collections, signaturePicks as staticPicks, testimonials } from "@/data/home";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

type OwnerInfo = {
  name: string;
  title: string;
  photo: string;
  story: string;
  email: string;
  instagram: string;
  phone: string;
};

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [newArrivals, setNewArrivals] = useState<any[]>(staticPicks.slice(0, 4));
  const [ownerInfo, setOwnerInfo] = useState<OwnerInfo | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const featured = data.filter(p => p.isFeatured);
          const arrivals = data.filter(p => p.isNewArrival);
          
          setFeaturedProducts(featured.length > 0 ? featured : data.slice(0, 4));
          setNewArrivals(arrivals.length > 0 ? arrivals : data.slice(4, 8));
        }
      })

    // Fetch owner info for the story section
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data?.ownerInfo?.name) {
          setOwnerInfo(data.ownerInfo);
        }
      })
      .catch(() => {});

    console.log("Kiyusha Frontend: Vercel deployment diagnostic active");
  }, []);

  return (
    <main className="overflow-x-hidden bg-ivory text-deepCharcoal">
      <Navbar />
      <Hero />

      {/* New Arrivals Section */}
      <section className="py-24" aria-labelledby="new-arrivals">
        <div className="container-lux">
          <div className="mb-14 text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-softGold">Just Landed</p>
            <h2 id="new-arrivals" className="mt-4 font-heading text-4xl text-deepCharcoal md:text-5xl">
              New Arrivals
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {newArrivals.map((product) => (
              <ProductCard key={product.id || product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warmWhite py-20">
        <CollectionGrid collections={collections} />
      </section>



      <section className="pt-32 pb-24" aria-labelledby="signature-picks">
        <div className="container-lux">
          <div className="mb-14 text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-softGold">Curated Collections</p>
            <h2 id="signature-picks" className="mt-4 font-heading text-4xl text-deepCharcoal md:text-5xl">
              Editor Curated Essentials
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id || product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warmWhite py-24">
        <Testimonials items={testimonials} />
      </section>

      {/* Owner Story Section */}
      <section className="bg-warmWhite py-24" aria-labelledby="our-story">
        <div className="container-lux grid items-center gap-14 lg:grid-cols-2">
          {/* Owner Photo */}
          <div className="relative h-[520px] overflow-hidden rounded-2xl shadow-lg">
            {ownerInfo?.photo ? (
              <Image
                src={ownerInfo.photo}
                alt={ownerInfo.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full bg-ivory flex items-center justify-center">
                <p className="text-deepCharcoal/20 text-sm uppercase tracking-widest">Photo</p>
              </div>
            )}
          </div>

          {/* Story Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.25em] text-softGold">Our Story</p>
              <h2 id="our-story" className="font-heading text-4xl leading-tight text-deepCharcoal md:text-5xl">
                {ownerInfo ? `Meet ${ownerInfo.name.split(" ")[0]}` : "The Heart Behind Kiyusha"}
              </h2>
              {ownerInfo?.title && (
                <p className="text-sm uppercase tracking-widest text-softGold font-medium">
                  {ownerInfo.title}
                </p>
              )}
            </div>

            <div className="space-y-4">
              {ownerInfo ? (
                ownerInfo.story.split("\n").filter(Boolean).slice(0, 3).map((paragraph, idx) => (
                  <p key={idx} className="text-sm leading-relaxed text-deepCharcoal/80 md:text-base">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-sm leading-relaxed text-deepCharcoal/80 md:text-base">
                  Kiyusha was born from a deep love for jewellery that tells a story — pieces that
                  are timeless, personal, and crafted with intention. Every collection is a reflection
                  of that vision.
                </p>
              )}
            </div>

            <Link
              href="/about"
              className="gold-solid-button inline-flex items-center gap-2"
            >
              Read Our Full Story
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
