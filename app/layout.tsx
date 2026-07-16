import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import TanStackQueryProvider from "@/components/TanStackQueryProvider";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import CartSidebar from "@/components/CartSidebar";
import Navbar from "@/components/Navbar";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

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
    "From our local stall to your style. Handpicked jewellery, handmade crochet, and beauty finds loved by our local community.",
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
      "Handpicked jewellery, handmade crochet, and beauty finds directly from our stall to your style.",
    url: "https://kiyusha.com",
    siteName: "Kiyusha",
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiyusha | Everyday Demi-Fine Luxury Jewellery",
    description:
      "Handpicked jewellery and handmade crochet with a personal touch."
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <SessionProvider>
          <TanStackQueryProvider>
            <CartProvider>
              <WishlistProvider>
                <AnnouncementBanner />
                <Navbar />
                <CartSidebar />
                {children}
                <WhatsAppButton />
              </WishlistProvider>
            </CartProvider>
          </TanStackQueryProvider>
        </SessionProvider>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3TM1P5FL06"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3TM1P5FL06');
          `}
        </Script>
      </body>
    </html>
  );
}
