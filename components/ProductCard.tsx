"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Loader2 } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import type { Product } from "@/hooks/useProducts";

type ProductCardProps = {
  product: Product & { _id?: string };
};

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickAdding, setIsQuickAdding] = useState(false);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Use _id if available, otherwise fallback to href
  const productLink = product._id ? `/products/${product._id}` : product.href;

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsQuickAdding(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    addItem({
      _id: product._id || product.name,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    
    setIsQuickAdding(false);
  };

  return (
    <article
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <Link href={productLink} className="relative block overflow-hidden bg-warmWhite">
        <div className="relative aspect-square">
          {/* Hover image swap gives an editorial "try-on" feel in-grid. */}
          <Image
            src={isHovered ? product.hoverImage : product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          />
        </div>

        {product.badge ? (
          <span className="absolute left-3 top-3 bg-warmWhite px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-deepCharcoal/80">
            {product.badge}
          </span>
        ) : null}

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product as any);
          }}
          className={`absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-warmWhite/95 transition ${
            isInWishlist(product._id || "") ? "text-softGold" : "text-deepCharcoal hover:text-softGold"
          }`}
          aria-label={`Add ${product.name} to wishlist`}
        >
          <Heart size={16} fill={isInWishlist(product._id || "") ? "currentColor" : "none"} />
        </button>

        <button
          type="button"
          onClick={handleQuickAdd}
          disabled={isQuickAdding}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-3 bg-warmWhite px-5 py-2 text-[11px] uppercase tracking-[0.16em] text-deepCharcoal opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 disabled:opacity-50 flex items-center gap-1"
          aria-label={`Quick add ${product.name}`}
        >
          {isQuickAdding ? (
            <>
              <Loader2 size={12} className="animate-spin" />
              Adding...
            </>
          ) : (
            "Quick Add"
          )}
        </button>
      </Link>

      <div className="space-y-1.5 px-1 pb-2 pt-5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-softGold/80 font-medium">
          {product.category}
        </p>
        <div className="min-h-[3rem] flex flex-col justify-start">
          <h3 className="line-clamp-2 text-base font-normal text-deepCharcoal group-hover:text-softGold transition-colors duration-300 leading-snug">
            {product.name}
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2 pt-1 transition-transform duration-300 group-hover:translate-x-0.5">
          <span className="text-base font-semibold text-deepCharcoal">
            {product.price}
          </span>
          {product.mrp && product.sellingPrice && product.mrp > product.sellingPrice ? (
            <>
              <span className="text-xs text-deepCharcoal/40 line-through decoration-deepCharcoal/30">
                INR {product.mrp.toLocaleString()}
              </span>
              <span className="text-[10px] font-bold tracking-wider text-softGold bg-softGold/5 px-2 py-0.5 rounded-full border border-softGold/10">
                {Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100)}% OFF
              </span>
            </>
          ) : product.oldPrice ? (
            <span className="text-xs text-deepCharcoal/40 line-through decoration-deepCharcoal/30">
              {product.oldPrice}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
