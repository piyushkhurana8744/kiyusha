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
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.2em] text-softGold/80 font-medium">
            {product.category}
          </p>
          {product.oldPrice && (
            <span className="bg-softGold/10 text-softGold text-[9px] font-bold px-1.5 py-0.5 rounded">
              {(() => {
                const current = Number(product.price.replace(/[^0-9.]/g, "")) || product.sellingPrice;
                const old = Number(product.oldPrice.replace(/[^0-9.]/g, "")) || product.mrp || 0;
                if (old > current) {
                  const percent = Math.round(((old - current) / old) * 100);
                  return `${percent}% OFF`;
                }
                return null;
              })()}
            </span>
          )}
        </div>
        <div className="min-h-[3rem] flex flex-col justify-start">
          <h3 className="line-clamp-2 text-base font-normal text-deepCharcoal group-hover:text-softGold transition-colors duration-300 leading-snug">
            {product.name}
          </h3>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-0.5">
            <span className="text-base font-semibold text-deepCharcoal">
              ₹{product.price.replace(/[^0-9.]/g, "") || product.sellingPrice}
            </span>
            {product.mrp && product.mrp > (Number(product.price.replace(/[^0-9.]/g, "")) || product.sellingPrice) ? (
              <span className="text-xs text-deepCharcoal/40 line-through decoration-deepCharcoal/20">
                ₹{product.mrp.toLocaleString()}
              </span>
            ) : product.oldPrice ? (
              <span className="text-xs text-deepCharcoal/40 line-through decoration-deepCharcoal/20">
                ₹{product.oldPrice.replace(/[^0-9.]/g, "")}
              </span>
            ) : null}
          </div>
          
          <Link 
            href={`https://wa.me/918744045668?text=Hi, I want to order ${product.name}`}
            target="_blank"
            className="flex items-center justify-center p-1.5 rounded-full bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-colors duration-300"
            title="Order on WhatsApp"
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </Link>

          <div className="w-full mt-2 bg-ivory/30 rounded-full h-1 overflow-hidden relative">
             <div className="absolute top-0 left-0 h-full bg-softGold/20 w-[85%]" />
             <p className="text-[9px] font-bold text-softGold flex items-center gap-1 mt-2.5">
               <span className="h-1 w-1 rounded-full bg-softGold animate-ping" />
               Only 2-3 pieces left — In high demand
             </p>
          </div>
        </div>
      </div>
    </article>
  );
}
