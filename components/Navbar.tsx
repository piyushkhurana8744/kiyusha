"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X, User as UserIcon, LogOut, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { navCategories } from "@/data/home";
import { useSession, signOut } from "@/lib/auth-client";
import { usePathname } from "next/navigation";

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
  const { data: session } = useSession();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();

  // Certain pages should always have a solid/white background for visibility
  const isLightPage = pathname !== "/" && !pathname.includes("/signature");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on path change
  useEffect(() => {
    setIsMobileOpen(false);
    setIsMegaOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  const textColorClass = isScrolled || isLightPage ? "text-deepCharcoal" : "text-warmWhite";
  const bgColorClass = isScrolled || isLightPage 
    ? "bg-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] backdrop-blur-xl border-b border-black/5" 
    : "bg-transparent";

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className={`transition-all duration-500 ease-in-out ${bgColorClass}`}>
        <div className="container-lux flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`font-heading text-3xl uppercase tracking-[0.22em] transition-colors duration-500 ${textColorClass}`}
            aria-label="Kiyusha Home"
          >
            Kiyusha
          </Link>

          {/* Desktop Navigation */}
          <div
            className="hidden lg:block h-full flex items-center"
            onMouseEnter={() => setIsMegaOpen(true)}
            onMouseLeave={() => setIsMegaOpen(false)}
          >
            <nav aria-label="Primary" className="h-full flex items-center">
              <ul className="flex items-center gap-10 h-full">
                {primaryLinks.map((link) => (
                  <li key={link.label} className="h-full flex items-center">
                    <Link
                      href={link.href}
                      className={`group relative py-2 text-[13px] font-medium uppercase tracking-[0.12em] transition-colors duration-500 ${textColorClass}`}
                    >
                      <span className="flex items-center gap-1">
                        {link.label}
                        {link.label === "Collections" && <ChevronDown size={12} className={`transition-transform duration-300 ${isMegaOpen ? 'rotate-180' : ''}`} />}
                      </span>
                      <span className="absolute left-0 bottom-0 h-0.5 w-full origin-left scale-x-0 bg-softGold transition-transform duration-300 group-hover:scale-x-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
              {isMegaOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="fixed left-0 right-0 top-20 bg-white/95 backdrop-blur-2xl border-b border-black/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] z-40"
                >
                  <div className="container-lux py-12">
                    <div className="grid grid-cols-5 gap-10">
                      {navCategories.map((category) => (
                        <div key={category.title} className="space-y-5">
                          <Link
                            href={category.href}
                            className="block font-heading text-xl text-deepCharcoal transition hover:text-softGold border-b border-black/5 pb-2"
                          >
                            {category.title}
                          </Link>
                          <ul className="space-y-3">
                            {category.links.map((sub) => (
                              <li key={sub.label}>
                                <Link
                                  href={sub.href}
                                  className="text-[13px] text-deepCharcoal/60 transition-colors hover:text-softGold flex items-center gap-2 group"
                                >
                                  <span className="h-px w-0 bg-softGold transition-all duration-300 group-hover:w-3" />
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      
                      {/* Featured Section in Mega Menu */}
                      <div className="col-span-1 border-l border-black/5 pl-10">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-softGold font-bold mb-4">Trending Edits</p>
                        <ul className="space-y-4">
                          <li>
                            <Link href="/collections/signature" className="group block">
                              <p className="text-sm font-heading text-deepCharcoal group-hover:text-softGold transition-colors">Signature Edits</p>
                              <p className="text-[11px] text-deepCharcoal/40">The heart of Kiyusha</p>
                            </Link>
                          </li>
                          <li>
                            <Link href="/collections/fine-gold" className="group block">
                              <p className="text-sm font-heading text-deepCharcoal group-hover:text-softGold transition-colors">Fine Gold</p>
                              <p className="text-[11px] text-deepCharcoal/40">Timeless 18k essentials</p>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User & Cart Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Cart Icon */}
            <button
              type="button"
              className={`rounded-full p-2.5 relative transition-all duration-300 ${
                isScrolled || isLightPage ? "text-deepCharcoal hover:bg-black/5" : "text-warmWhite hover:bg-white/10"
              }`}
              aria-label="Cart"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4.5 h-4.5 bg-softGold text-[9px] flex items-center justify-center rounded-full text-white font-bold shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Auth/User Icon */}
            <div className="relative">
              {session ? (
                <>
                  <button
                    type="button"
                    className={`rounded-full p-2.5 transition-all duration-300 ${
                      isScrolled || isLightPage ? "text-deepCharcoal hover:bg-black/5" : "text-warmWhite hover:bg-white/10"
                    }`}
                    aria-label="User Account"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <UserIcon size={20} strokeWidth={1.5} />
                  </button>
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-xl border border-black/5 shadow-2xl p-2 z-[60] rounded-lg"
                      >
                        <div className="px-4 py-3 border-b border-black/5 mb-2">
                          <p className="text-xs font-bold text-deepCharcoal truncate">{session.user.name}</p>
                          <p className="text-[10px] text-deepCharcoal/50 truncate uppercase tracking-tighter">{session.user.email}</p>
                        </div>
                        <Link
                          href="/account"
                          className="flex items-center px-4 py-2.5 text-xs text-deepCharcoal hover:bg-black/5 rounded-md transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          My Account
                        </Link>
                        <button
                          onClick={() => {
                            signOut();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center px-4 py-2.5 text-xs text-red-500 hover:bg-red-50 rounded-md transition-colors mt-1"
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
                  className={`rounded-full p-2.5 flex items-center justify-center transition-all duration-300 ${
                    isScrolled || isLightPage ? "text-deepCharcoal hover:bg-black/5" : "text-warmWhite hover:bg-white/10"
                  }`}
                  aria-label="Login"
                >
                  <UserIcon size={20} strokeWidth={1.5} />
                </Link>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              className={`rounded-full p-2.5 transition-all duration-300 lg:hidden ${
                isScrolled || isLightPage ? "text-deepCharcoal hover:bg-black/5" : "text-warmWhite hover:bg-white/10"
              }`}
              onClick={() => setIsMobileOpen((prev) => !prev)}
              aria-label="Toggle Menu"
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu content */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-black/5 bg-white lg:hidden overflow-hidden"
            >
              <nav className="container-lux flex flex-col gap-1 py-8">
                {primaryLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="py-3 text-[13px] font-medium uppercase tracking-[0.14em] text-deepCharcoal/80 hover:text-softGold transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="h-px w-full bg-black/5 my-4" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-softGold font-bold mb-4">Our Edits</p>
                <div className="grid grid-cols-2 gap-4">
                  {navCategories.slice(0, 4).map(cat => (
                    <Link key={cat.title} href={cat.href} className="text-[12px] text-deepCharcoal/60 capitalize">
                      {cat.title}
                    </Link>
                  ))}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
