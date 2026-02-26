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
import Navbar from "@/components/Navbar";
import { useProduct, Product } from "@/hooks/useProducts";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const { data: product, isLoading, error } = useProduct(id);
  const { addItem } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "details" | "shipping">("description");

  const images = product ? [product.image, product.hoverImage].filter(Boolean) : [];

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

  if (isLoading) {
    return (
      <main className="bg-ivory min-h-screen">
        <Navbar />
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
        <Navbar />
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
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="container-lux py-6">
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
      <section className="pb-20">
        <div className="container-lux">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-[3/4] bg-warmWhite rounded-2xl overflow-hidden"
                >
                  <Image
                    src={images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  
                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                  
                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute left-4 top-4 bg-softGold px-4 py-1.5 text-xs uppercase tracking-[0.16em] text-deepCharcoal font-medium">
                      {product.badge}
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>
              
              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex gap-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative w-20 h-24 rounded-lg overflow-hidden transition-all ${
                        selectedImage === idx ? "ring-2 ring-softGold ring-offset-2" : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt={`${product.name} view ${idx + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
              
              {/* Share & Wishlist */}
              <div className="flex gap-4 pt-4">
                <button className="flex items-center gap-2 text-sm text-deepCharcoal/60 hover:text-softGold transition-colors">
                  <Heart size={18} />
                  <span>Add to Wishlist</span>
                </button>
                <button className="flex items-center gap-2 text-sm text-deepCharcoal/60 hover:text-softGold transition-colors">
                  <Share2 size={18} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-8 lg:self-start space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-softGold font-medium mb-2">
                  {product.category}
                </p>
                <h1 className="font-heading text-4xl lg:text-5xl text-deepCharcoal mb-4">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-medium text-deepCharcoal">{product.price}</span>
                  {product.oldPrice && (
                    <span className="text-lg text-deepCharcoal/40 line-through">{product.oldPrice}</span>
                  )}
                </div>
              </div>

              {/* Color/Size Selection Placeholder */}
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-y border-black/5">
                  <span className="text-sm text-deepCharcoal/60">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 flex items-center justify-center border border-black/10 rounded-lg hover:border-softGold transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 flex items-center justify-center border border-black/10 rounded-lg hover:border-softGold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className={`w-full py-4 rounded-xl font-medium tracking-widest uppercase text-sm transition-all flex items-center justify-center gap-2 ${
                    addedToCart
                      ? "bg-green-600 text-white"
                      : "bg-deepCharcoal text-warmWhite hover:bg-black shadow-xl shadow-black/10"
                  }`}
                >
                  {isAdding ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : addedToCart ? (
                    <>
                      <Check size={20} />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} className="text-softGold" />
                      Add to Cart
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-deepCharcoal/50">
                  Free shipping on orders above ₹2,000
                </p>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 py-6 border-y border-black/5">
                <div className="text-center space-y-2">
                  <Truck size={24} className="mx-auto text-softGold" />
                  <p className="text-[10px] uppercase tracking-wider text-deepCharcoal/60">Free Shipping</p>
                </div>
                <div className="text-center space-y-2">
                  <Shield size={24} className="mx-auto text-softGold" />
                  <p className="text-[10px] uppercase tracking-wider text-deepCharcoal/60">Secure Payment</p>
                </div>
                <div className="text-center space-y-2">
                  <RotateCcw size={24} className="mx-auto text-softGold" />
                  <p className="text-[10px] uppercase tracking-wider text-deepCharcoal/60">Easy Returns</p>
                </div>
              </div>

              {/* Product Details Tabs */}
              <div className="space-y-6">
                <div className="flex gap-6 border-b border-black/10">
                  {(["description", "details", "shipping"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 text-xs uppercase tracking-widest transition-colors relative ${
                        activeTab === tab ? "text-deepCharcoal font-medium" : "text-deepCharcoal/40 hover:text-deepCharcoal/60"
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-softGold"
                        />
                      )}
                    </button>
                  ))}
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm text-deepCharcoal/70 leading-relaxed"
                  >
                    {activeTab === "description" && (
                      <p>
                        Elevate your everyday with this stunning piece from Kiyusha. 
                        Crafted with attention to detail and designed for the modern woman 
                        who appreciates timeless elegance. Perfect for both special occasions 
                        and daily wear, this piece seamlessly blends traditional craftsmanship 
                        with contemporary design.
                      </p>
                    )}
                    {activeTab === "details" && (
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-deepCharcoal/60">Category</span>
                          <span>{product.category}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-deepCharcoal/60">Material</span>
                          <span>18K Gold Plated</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-deepCharcoal/60">Stone</span>
                          <span>AAA Grade Cubic Zirconia</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-deepCharcoal/60">Weight</span>
                          <span>Lightweight</span>
                        </li>
                      </ul>
                    )}
                    {activeTab === "shipping" && (
                      <div className="space-y-4">
                        <p>
                          <strong>Free Shipping</strong> on orders above ₹2,000. 
                          Standard delivery takes 5-7 business days.
                        </p>
                        <p>
                          <strong>Easy Returns</strong> - Not satisfied? Return within 
                          7 days for a full refund or exchange.
                        </p>
                        <p>
                          <strong>Care Instructions</strong> - Store in a dry place. 
                          Clean with a soft cloth. Avoid direct contact with perfumes.
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
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
