"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { navCategories } from "@/data/home";
import { useSession, signOut } from "@/lib/auth-client";
import { User as UserIcon, LogOut } from "lucide-react";

const primaryLinks = [
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Fine Gold", href: "/collections/fine-gold" },
  { label: "Collections", href: "/collections" },
  { label: "Bestsellers", href: "/collections/bestsellers" },
  { label: "Gifting", href: "/collections/gifting" }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { data: session, isPending } = useSession();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    // Toggles glassmorphism state once the header leaves the top edge.
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="relative overflow-hidden bg-black">
        <div className="announcement-shimmer absolute inset-0" aria-hidden />
        <p className="relative px-6 py-2 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-softGold">
          Complimentary Shipping Pan India | Easy 15 Day Returns
        </p>
      </div>

      <div
        className={`transition-all duration-500 ${
          isScrolled
            ? "border-b border-black/10 bg-warmWhite/75 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl"
            : "bg-warmWhite/95"
        }`}
      >
        <div className="container-lux flex h-20 items-center justify-between">
          <Link
            href="/"
            className="font-heading text-3xl uppercase tracking-[0.22em] text-deepCharcoal"
            aria-label="Kiyusha Home"
          >
            Kiyusha
          </Link>

          <div
            className="relative hidden lg:block"
            onMouseEnter={() => setIsMegaOpen(true)}
            onMouseLeave={() => setIsMegaOpen(false)}
          >
            <nav aria-label="Primary">
              <ul className="flex items-center gap-8">
                {primaryLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group relative py-1 text-sm tracking-[0.08em] text-deepCharcoal/90"
                    >
                      {link.label}
                      <span className="absolute left-0 top-full h-px w-full origin-left scale-x-0 bg-softGold transition-transform duration-300 group-hover:scale-x-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <AnimatePresence>
              {isMegaOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute left-1/2 top-full mt-6 w-[780px] -translate-x-1/2 subtle-border bg-warmWhite p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
                >
                  <div className="grid grid-cols-4 gap-6">
                    {navCategories.map((category) => (
                      <div key={category.title} className="space-y-3">
                        <Link
                          href={category.href}
                          className="font-heading text-lg text-deepCharcoal transition hover:text-softGold"
                        >
                          {category.title}
                        </Link>
                        <ul className="space-y-2">
                          {category.links.map((sub) => (
                            <li key={sub.label}>
                              <Link
                                href={sub.href}
                                className="text-sm text-deepCharcoal/70 transition hover:text-deepCharcoal"
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-full p-2 text-deepCharcoal transition hover:bg-black/5"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <button
              type="button"
              className="rounded-full p-2 text-deepCharcoal transition hover:bg-black/5"
              aria-label="Wishlist"
            >
              <Heart size={18} />
            </button>
            <button
              type="button"
              className="rounded-full p-2 text-deepCharcoal transition hover:bg-black/5 relative"
              aria-label="Cart"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-softGold text-[10px] flex items-center justify-center rounded-full text-deepCharcoal font-medium">
                  {totalItems}
                </span>
              )}
            </button>

            <div className="relative">
              {session ? (
                <>
                  <button
                    type="button"
                    className="rounded-full p-2 text-deepCharcoal transition hover:bg-black/5"
                    aria-label="User Account"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <UserIcon size={18} />
                  </button>
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-warmWhite subtle-border shadow-lg p-2 z-[60]"
                      >
                        <div className="px-4 py-3 border-b border-black/5 mb-2">
                          <p className="text-xs font-semibold truncate">{session.user.name}</p>
                          <p className="text-[10px] text-black/40 truncate">{session.user.email}</p>
                        </div>
                        <Link
                          href="/account"
                          className="flex items-center px-4 py-2 text-xs text-deepCharcoal hover:bg-black/5 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          My Account
                        </Link>
                        <button
                          onClick={() => {
                            signOut();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={14} className="mr-2" />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href="/login"
                  className="rounded-full p-2 text-deepCharcoal transition hover:bg-black/5 flex items-center justify-center"
                  aria-label="Login"
                >
                  <UserIcon size={18} />
                </Link>
              )}
            </div>

            <button
              type="button"
              className="ml-1 rounded-full p-2 text-deepCharcoal transition hover:bg-black/5 lg:hidden"
              onClick={() => setIsMobileOpen((prev) => !prev)}
              aria-label="Toggle Menu"
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-black/10 bg-warmWhite lg:hidden"
            >
              <div className="container-lux space-y-5 py-6">
                {primaryLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block text-sm uppercase tracking-[0.12em] text-deepCharcoal/90"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/collections/signature"
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.12em] text-softGold"
                >
                  <Sparkles size={16} />
                  Signature Edits
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
