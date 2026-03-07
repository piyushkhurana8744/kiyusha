"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Truck, 
  Shield, 
  RotateCcw,
  Sparkles,
  Loader2
} from "lucide-react";
import Footer from "@/components/Footer";
import { useProduct, Product } from "@/hooks/useProducts";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const { data: product, isLoading, error } = useProduct(id);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "details" | "shipping">("description");

  const images = product ? [product.image, product.hoverImage, ...(product.gallery || [])].filter(Boolean) : [];

  const handleAddToCart = async () => {
    if (!product) return;
    
    setIsAdding(true);
    // Simulate brief delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addItem({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    
    setIsAdding(false);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleShare = async () => {
    if (!product) return;
    
    const shareData = {
      title: product.name,
      text: `Check out this beautiful ${product.name} at Kiyusha!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  if (isLoading) {
    return (
      <main className="bg-ivory min-h-screen">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="animate-spin text-softGold" size={40} />
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="bg-ivory min-h-screen">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="text-deepCharcoal/60">Product not found</p>
          <Link href="/collections/new-arrivals" className="text-softGold hover:underline">
            Browse new arrivals
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-ivory min-h-screen">
      
      {/* Breadcrumb */}
      <div className="container-lux py-4">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-deepCharcoal/50">
          <Link href="/" className="hover:text-softGold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/collections/new-arrivals" className="hover:text-softGold transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/collections/${product.category.toLowerCase()}`} className="hover:text-softGold transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-deepCharcoal">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="pb-12 pt-2">
        <div className="container-lux">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-16 items-start">
            {/* Image Gallery */}
            <div className="space-y-4 lg:sticky lg:top-24">
              <div className="relative aspect-square max-h-[65vh] bg-warmWhite rounded-2xl overflow-hidden shadow-sm group mx-auto w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={images[selectedImage]}
                      alt={`${product.name} view ${selectedImage + 1}`}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev - 1 + images.length) % images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full text-deepCharcoal shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev + 1) % images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full text-deepCharcoal shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Badge on main image */}
                {product.badge && (
                  <span className="absolute left-4 top-4 bg-softGold px-4 py-1.5 text-xs uppercase tracking-[0.16em] text-deepCharcoal font-medium">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide justify-center">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative w-16 aspect-square rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                        selectedImage === idx ? "border-softGold shadow-lg scale-105" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} thumb ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
              
              {/* Share & Wishlist */}
              <div className="flex justify-center gap-8 pt-2">
                <button 
                  onClick={() => product && toggleWishlist(product)}
                  className={`flex items-center gap-2 text-[10px] uppercase tracking-widest transition-colors font-bold ${
                    isInWishlist(product._id) ? "text-softGold" : "text-deepCharcoal/40 hover:text-softGold"
                  }`}
                >
                  <Heart size={16} fill={isInWishlist(product._id) ? "currentColor" : "none"} />
                  <span>{isInWishlist(product._id) ? "Wishlisted" : "Wishlist"}</span>
                </button>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-deepCharcoal/40 hover:text-softGold transition-colors font-bold"
                >
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6 lg:max-h-[85vh] lg:overflow-y-auto pr-2 scrollbar-hide">
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.3em] text-softGold font-bold">
                  {product.category}
                </p>
                <h1 className="font-heading text-3xl lg:text-4xl text-deepCharcoal tracking-tight">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-2xl font-bold text-deepCharcoal">{product.price}</span>
                  {product.oldPrice && (
                    <span className="text-lg text-deepCharcoal/30 line-through decoration-softGold/30">{product.oldPrice}</span>
                  )}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="bg-white/50 p-6 rounded-2xl border border-black/[0.03] space-y-6 shadow-sm shadow-black/[0.02]">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-deepCharcoal/40">Quantity</span>
                  <div className="flex items-center gap-4 bg-warmWhite/50 p-1 rounded-xl border border-black/[0.05]">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-sm font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className={`group w-full py-4 rounded-xl font-bold tracking-[0.2em] uppercase text-xs transition-all flex items-center justify-center gap-3 ${
                      addedToCart
                        ? "bg-green-600 text-white"
                        : "bg-deepCharcoal text-warmWhite hover:bg-black shadow-xl shadow-black/10"
                    }`}
                  >
                    {isAdding ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : addedToCart ? (
                      <>
                        <Check size={18} />
                        Piece Secured
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} className="text-softGold group-hover:rotate-12 transition-transform" />
                        Add to Selection
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex justify-between items-center py-4 border-y border-black/[0.05]">
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <Truck size={20} className="text-softGold" />
                  <p className="text-[8px] uppercase tracking-widest font-bold text-deepCharcoal/40">Pan India Delivery</p>
                </div>
                <div className="w-[1px] h-8 bg-black/[0.05]" />
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <Shield size={20} className="text-softGold" />
                  <p className="text-[8px] uppercase tracking-widest font-bold text-deepCharcoal/40">Safe Payments</p>
                </div>
                <div className="w-[1px] h-8 bg-black/[0.05]" />
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <RotateCcw size={20} className="text-softGold" />
                  <p className="text-[8px] uppercase tracking-widest font-bold text-deepCharcoal/40">15-day exchange</p>
                </div>
              </div>

              {/* Product Details Tabs */}
              <div className="pt-2">
                <div className="flex gap-8 border-b border-black/[0.05]">
                  {(["description", "details", "shipping"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 text-[10px] uppercase tracking-[0.2em] transition-all relative ${
                        activeTab === tab ? "text-deepCharcoal font-bold" : "text-deepCharcoal/30 hover:text-softGold"
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-softGold"
                        />
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="pt-6 min-h-[140px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs text-deepCharcoal/60 leading-relaxed font-medium"
                    >
                      {activeTab === "description" && (
                        <p className="max-w-md">
                          Discover the essence of modern luxury with this {product.name}. 
                          Meticulously designed for the discerning individual, this piece 
                          features a harmonious blend of refined aesthetics and superior 
                          craftsmanship.
                        </p>
                      )}
                      {activeTab === "details" && (
                        <div className="grid grid-cols-2 gap-y-3 max-w-sm">
                          <span className="text-deepCharcoal/40 uppercase tracking-widest text-[9px] font-bold">Category</span>
                          <span className="text-deepCharcoal font-bold tracking-tight">{product.category}</span>
                          <span className="text-deepCharcoal/40 uppercase tracking-widest text-[9px] font-bold">Base Material</span>
                          <span className="text-deepCharcoal font-bold tracking-tight">PVD Gold-Plated Steel</span>
                          <span className="text-deepCharcoal/40 uppercase tracking-widest text-[9px] font-bold">Weight</span>
                          <span className="text-deepCharcoal font-bold tracking-tight">Ultra Lightweight</span>
                        </div>
                      )}
                      {activeTab === "shipping" && (
                        <div className="space-y-4 max-w-sm">
                          <div className="flex gap-3">
                            <Truck size={14} className="text-softGold shrink-0" />
                            <p>Free express delivery across India. Ships within 24-48 hours.</p>
                          </div>
                          <div className="flex gap-3">
                            <RotateCcw size={14} className="text-softGold shrink-0" />
                            <p>Complimentary 15-day return window for exchange or credit.</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="py-20 bg-warmWhite">
        <div className="container-lux">
          <h2 className="font-heading text-3xl text-deepCharcoal mb-8">You May Also Like</h2>
          <Link 
            href="/collections/new-arrivals" 
            className="inline-block text-sm text-softGold hover:underline uppercase tracking-widest"
          >
            View All Collection →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
