"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const announcements = [
  "⚡ FREE GIFT ON ALL PREPAID ORDERS",
  "✨ ETHICALLY SOURCED • LOCALLY LOVED • TIMELESS DESIGNS",
  "🚚 FREE SHIPPING ON ORDERS ABOVE ₹999",
  "💎 JOIN 100+ LOCAL FAMILIES WHO SHOP REGULARLY"
];

export default function AnnouncementBanner() {
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-softGold overflow-hidden shadow-sm h-12 flex items-center justify-center relative z-50">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentAnnouncement}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-[9px] font-bold uppercase tracking-[0.35em] text-white text-center w-full"
        >
          {announcements[currentAnnouncement]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
