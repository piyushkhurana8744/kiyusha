"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartSidebar() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, isCartOpen, setIsCartOpen, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-50"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/5">
              <div className="flex items-center gap-3">
                <ShoppingBag size={24} className="text-softGold" />
                <h2 className="font-heading text-xl text-deepCharcoal">Your Bag</h2>
                <span className="bg-softGold/20 text-softGold text-xs px-2 py-0.5 rounded-full">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <ShoppingBag size={48} className="text-deepCharcoal/20" />
                  <p className="text-deepCharcoal/60">Your bag is empty</p>
                  <Link
                    href="/collections/new-arrivals"
                    onClick={() => setIsCartOpen(false)}
                    className="text-softGold hover:underline text-sm uppercase tracking-widest"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item._id} className="flex gap-4">
                      <div className="relative w-24 h-32 bg-ivory rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-medium text-deepCharcoal text-sm line-clamp-2">{item.name}</h3>
                          <p className="text-xs text-deepCharcoal/50 uppercase tracking-wider mt-1">{item.category}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center border border-black/10 rounded hover:border-softGold transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-sm w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center border border-black/10 rounded hover:border-softGold transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="font-medium text-deepCharcoal text-sm">
                            {formatPrice(parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item._id)}
                          className="text-xs text-deepCharcoal/40 hover:text-red-500 transition-colors self-start"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-black/5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-deepCharcoal/60">Subtotal</span>
                  <span className="text-xl font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <p className="text-xs text-deepCharcoal/50">Shipping and taxes calculated at checkout</p>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-deepCharcoal text-warmWhite py-4 rounded-xl font-medium tracking-widest uppercase text-sm hover:bg-black transition-all flex items-center justify-center gap-2"
                >
                  Checkout
                  <ArrowRight size={18} />
                </Link>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center text-sm text-deepCharcoal/60 hover:text-softGold transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
