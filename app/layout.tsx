import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import TanStackQueryProvider from "@/components/TanStackQueryProvider";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import CartSidebar from "@/components/CartSidebar";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kiyusha.com"),
  title: {
    default: "Kiyusha | Everyday Demi-Fine Luxury Jewellery",
    template: "%s | Kiyusha"
  },
  description:
    "Kiyusha crafts premium Indian demi-fine jewellery designed for everyday luxury, modern femininity, and timeless polish.",
  keywords: [
    "demi-fine jewellery",
    "Indian jewellery brand",
    "everyday luxury",
    "gold plated jewellery",
    "Kiyusha"
  ],
  openGraph: {
    title: "Kiyusha | Everyday Demi-Fine Luxury Jewellery",
    description:
      "Discover minimal, feminine demi-fine jewellery with elevated styling and premium craftsmanship.",
    url: "https://kiyusha.com",
    siteName: "Kiyusha",
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiyusha | Everyday Demi-Fine Luxury Jewellery",
    description:
      "Premium Indian demi-fine jewellery with a modern luxury aesthetic."
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <TanStackQueryProvider>
          <CartProvider>
            <WishlistProvider>
              <Navbar />
              <CartSidebar />
              {children}
            </WishlistProvider>
          </CartProvider>
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
