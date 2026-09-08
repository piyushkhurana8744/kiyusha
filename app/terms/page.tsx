import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Scale, PackageCheck, RefreshCw, AlertCircle, Sparkles, HelpCircle, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions | Kiyusha",
  description:
    "Review the terms and conditions governing the purchase of demi-fine jewellery, handmade crochet, and accessories from Kiyusha.",
  alternates: {
    canonical: "/terms"
  }
};

export default function TermsAndConditionsPage() {
  const lastUpdated = "September 8, 2026";

  return (
    <main className="min-h-screen bg-ivory text-deepCharcoal">
      {/* Header Banner */}
      <section className="relative bg-deepCharcoal text-warmWhite py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-deepCharcoal/90" />
        <div className="container-lux relative z-10 max-w-4xl text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-softGold hover:underline mb-6"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <p className="text-xs uppercase tracking-[0.3em] text-softGold mb-3">
            Legal & Customer Agreement
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-warmWhite tracking-tight">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-sm sm:text-base text-white/70">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16">
        <div className="container-lux max-w-4xl">
          <div className="bg-white rounded-2xl p-6 sm:p-10 lg:p-12 shadow-sm border border-black/5 space-y-10 text-base leading-relaxed text-deepCharcoal/80">

            {/* Intro */}
            <div className="space-y-4">
              <p className="text-lg text-deepCharcoal font-medium">
                Welcome to <strong>Kiyusha</strong>. These Terms & Conditions (&ldquo;Terms&rdquo;) govern your access to and use of{" "}
                <Link href="https://kiyusha.com" className="text-softGold hover:underline font-medium">
                  kiyusha.com
                </Link>{" "}
                (the &ldquo;Site&rdquo;) and the purchase of any products from our store.
              </p>
              <p>
                By visiting our site, creating an account, or placing an order, you agree to be bound by these Terms, along with our{" "}
                <Link href="/privacy" className="text-softGold hover:underline font-medium">
                  Privacy Policy
                </Link>
                . Please read them carefully.
              </p>
            </div>

            {/* Quick Feature Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-ivory border border-black/5 flex flex-col items-start gap-2">
                <Sparkles className="text-softGold" size={24} />
                <h3 className="font-semibold text-deepCharcoal text-sm">Authentic Demi-Fine</h3>
                <p className="text-xs text-deepCharcoal/70">Anti-tarnish, hypoallergenic stainless steel & brass pieces.</p>
              </div>
              <div className="p-4 rounded-xl bg-ivory border border-black/5 flex flex-col items-start gap-2">
                <PackageCheck className="text-softGold" size={24} />
                <h3 className="font-semibold text-deepCharcoal text-sm">Pan-India Delivery</h3>
                <p className="text-xs text-deepCharcoal/70">Carefully packaged and dispatched within 24-48 business hours.</p>
              </div>
              <div className="p-4 rounded-xl bg-ivory border border-black/5 flex flex-col items-start gap-2">
                <RefreshCw className="text-softGold" size={24} />
                <h3 className="font-semibold text-deepCharcoal text-sm">Customer Support</h3>
                <p className="text-xs text-deepCharcoal/70">Responsive assistance via WhatsApp and Email for order inquiries.</p>
              </div>
            </div>

            <hr className="border-black/10" />

            {/* Section 1 */}
            <div className="space-y-3">
              <h2 className="font-heading text-2xl text-deepCharcoal flex items-center gap-2">
                <span className="text-softGold text-lg font-mono">01.</span> Account & Eligibility
              </h2>
              <p>
                By using this site, you represent that you are at least 18 years of age or accessing the site under the supervision of a parent or legal guardian.
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>You are responsible for maintaining the confidentiality of your account credentials and password.</li>
                <li>You agree to provide true, accurate, and current information when creating an account or placing an order.</li>
                <li>Kiyusha reserves the right to refuse service or terminate accounts at our discretion if fraud or misuse is suspected.</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h2 className="font-heading text-2xl text-deepCharcoal flex items-center gap-2">
                <span className="text-softGold text-lg font-mono">02.</span> Products, Handmade Crafts & Care
              </h2>
              <p>
                Kiyusha offers curated demi-fine jewellery, handmade crochet accessories, and beauty collections.
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong className="text-deepCharcoal">Handmade Variations:</strong> Handcrafted crochet items and natural gemstones may exhibit slight variations in texture, color, and finish. These are hallmarks of artisanal craftsmanship rather than defects.
                </li>
                <li>
                  <strong className="text-deepCharcoal">Jewellery Care:</strong> While our demi-fine items are anti-tarnish and water-resistant, we recommend avoiding direct contact with harsh chemicals, perfumes, and bleach to preserve their shine and longevity.
                </li>
                <li>
                  <strong className="text-deepCharcoal">Color Accuracy:</strong> We make every effort to display product colors accurately; however, slight variations may occur depending on screen displays.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h2 className="font-heading text-2xl text-deepCharcoal flex items-center gap-2">
                <span className="text-softGold text-lg font-mono">03.</span> Pricing & Payments
              </h2>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>All prices listed on the site are in Indian Rupees (INR ₹) and include applicable taxes unless explicitly stated otherwise.</li>
                <li>We reserve the right to adjust prices and discontinue products without prior notice.</li>
                <li>
                  Payments can be made via Razorpay (UPI, Credit/Debit Cards, Net Banking, Wallets) or verified offline payment channels (such as UPI QR with mandatory payment screenshot verification).
                </li>
                <li>Orders will be confirmed and processed only upon successful payment verification.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h2 className="font-heading text-2xl text-deepCharcoal flex items-center gap-2">
                <span className="text-softGold text-lg font-mono">04.</span> Shipping & Delivery Policy
              </h2>
              <p>
                We deliver across India through reliable logistics partners.
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong className="text-deepCharcoal">Dispatch Time:</strong> Ready-to-ship orders are typically dispatched within 1 to 2 business days. Custom handmade pieces may take 3 to 5 business days.
                </li>
                <li>
                  <strong className="text-deepCharcoal">Delivery Timelines:</strong> Estimated delivery is 3 to 7 business days depending on your pin code and location.
                </li>
                <li>
                  <strong className="text-deepCharcoal">Tracking:</strong> Once dispatched, tracking details and updates will be communicated to your registered email and phone number.
                </li>
                <li>
                  <strong className="text-deepCharcoal">Address Accuracy:</strong> Please ensure that your shipping address and contact number are accurate. We are not liable for non-delivery caused by incorrect addresses.
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="space-y-3">
              <h2 className="font-heading text-2xl text-deepCharcoal flex items-center gap-2">
                <span className="text-softGold text-lg font-mono">05.</span> Cancellation, Returns & Refund Policy
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-deepCharcoal">Order Cancellation:</h3>
                  <p className="text-sm">
                    You can request order cancellation within 2 hours of placing the order or before dispatch by contacting support. Once an order is handed to the courier, it cannot be cancelled.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-deepCharcoal">Returns & Damaged Shipments:</h3>
                  <p className="text-sm">
                    Every piece is inspected prior to dispatch. If you receive an item that is damaged in transit or incorrect:
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 pl-2 mt-1">
                    <li>Notify us within <strong>48 hours</strong> of delivery at <a href="mailto:support@kiyusha.com" className="text-softGold hover:underline">support@kiyusha.com</a> or on WhatsApp.</li>
                    <li>Provide your Order ID along with clear unboxing photos or an unboxing video showing the damaged package and product.</li>
                    <li>Upon verification, we will issue a free replacement or store credit/refund.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-deepCharcoal">Non-Returnable Items:</h3>
                  <p className="text-sm">
                    Due to hygiene and safety standards, pierced jewellery (earrings) and customized bespoke items are strictly non-returnable unless received defective.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-deepCharcoal">Refund Processing:</h3>
                  <p className="text-sm">
                    Approved refunds will be initiated to your original payment method within 5 to 7 business days.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div className="space-y-3">
              <h2 className="font-heading text-2xl text-deepCharcoal flex items-center gap-2">
                <span className="text-softGold text-lg font-mono">06.</span> Intellectual Property
              </h2>
              <p>
                All content published on this website, including but not limited to brand names, logos, jewellery and craft photographs, product copy, graphics, and software code, is the property of Kiyusha and is protected by intellectual property and copyright laws. No material may be copied, reproduced, or republished without written consent.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-3">
              <h2 className="font-heading text-2xl text-deepCharcoal flex items-center gap-2">
                <span className="text-softGold text-lg font-mono">07.</span> Limitation of Liability & Disclaimers
              </h2>
              <p>
                Kiyusha shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our products or services. In all circumstances, our maximum aggregate liability shall not exceed the amount paid by you for the specific product in dispute.
              </p>
            </div>

            {/* Section 8 */}
            <div className="space-y-3">
              <h2 className="font-heading text-2xl text-deepCharcoal flex items-center gap-2">
                <span className="text-softGold text-lg font-mono">08.</span> Governing Law & Jurisdiction
              </h2>
              <p>
                These Terms and any transactions conducted on this website are governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the competent courts in India.
              </p>
            </div>

            {/* Contact / Inquiries */}
            <div className="pt-6 border-t border-black/10">
              <h2 className="font-heading text-2xl text-deepCharcoal mb-3">Questions & Contact</h2>
              <p className="mb-4">
                For questions regarding these Terms & Conditions or assistance with your order, please contact our support team:
              </p>
              <div className="bg-ivory p-6 rounded-xl border border-black/5 space-y-2 text-sm">
                <p><strong className="text-deepCharcoal">Brand:</strong> Kiyusha</p>
                <p><strong className="text-deepCharcoal">Customer Support:</strong> <a href="mailto:support@kiyusha.com" className="text-softGold hover:underline font-medium">support@kiyusha.com</a></p>
                <p><strong className="text-deepCharcoal">Website:</strong> <a href="https://kiyusha.com" className="text-softGold hover:underline font-medium">https://kiyusha.com</a></p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
