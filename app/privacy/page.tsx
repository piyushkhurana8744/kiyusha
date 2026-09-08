import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { ShieldCheck, Lock, Eye, FileText, Bell, Mail, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Kiyusha",
  description:
    "Learn how Kiyusha collects, uses, and safeguards your personal information when you visit or make a purchase from our store.",
  alternates: {
    canonical: "/privacy"
  }
};

export default function PrivacyPolicyPage() {
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
            Legal & Transparency
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-warmWhite tracking-tight">
            Privacy Policy
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
                Welcome to <strong>Kiyusha</strong> (“we,” “our,” or “us”). We value your trust and are committed to protecting your personal information and privacy rights.
              </p>
              <p>
                This Privacy Policy outlines how your personal data is collected, used, shared, and protected when you visit, interact with, or make a purchase through our website at{" "}
                <Link href="https://kiyusha.com" className="text-softGold hover:underline font-medium">
                  kiyusha.com
                </Link>{" "}
                (the “Site”).
              </p>
            </div>

            {/* Quick Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-ivory border border-black/5 flex flex-col items-start gap-2">
                <ShieldCheck className="text-softGold" size={24} />
                <h3 className="font-semibold text-deepCharcoal text-sm">Data Protection</h3>
                <p className="text-xs text-deepCharcoal/70">We never sell, rent, or trade your personal data to third parties.</p>
              </div>
              <div className="p-4 rounded-xl bg-ivory border border-black/5 flex flex-col items-start gap-2">
                <Lock className="text-softGold" size={24} />
                <h3 className="font-semibold text-deepCharcoal text-sm">Secure Payments</h3>
                <p className="text-xs text-deepCharcoal/70">Processed via PCI-DSS compliant, RBI-authorized payment gateways.</p>
              </div>
              <div className="p-4 rounded-xl bg-ivory border border-black/5 flex flex-col items-start gap-2">
                <Eye className="text-softGold" size={24} />
                <h3 className="font-semibold text-deepCharcoal text-sm">Your Control</h3>
                <p className="text-xs text-deepCharcoal/70">Access, update, or request deletion of your information anytime.</p>
              </div>
            </div>

            <hr className="border-black/10" />

            {/* Section 1 */}
            <div className="space-y-3">
              <h2 className="font-heading text-2xl text-deepCharcoal flex items-center gap-2">
                <span className="text-softGold text-lg font-mono">01.</span> Information We Collect
              </h2>
              <p>
                When you visit or make a purchase on Kiyusha, we collect information necessary to fulfill your orders and improve your shopping experience:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong className="text-deepCharcoal">Personal Identification Details:</strong> Full name, email address, phone/WhatsApp number, delivery address, and billing address.
                </li>
                <li>
                  <strong className="text-deepCharcoal">Order & Transaction Details:</strong> Products purchased, order value, payment status, transaction reference IDs, and customer notes.
                </li>
                <li>
                  <strong className="text-deepCharcoal">Account Credentials:</strong> If you register an account, we securely store your encrypted login credentials and order history.
                </li>
                <li>
                  <strong className="text-deepCharcoal">Device & Usage Information:</strong> IP address, browser type, device information, operating system, time zone, and interaction logs collected via standard cookies.
                </li>
                <li>
                  <strong className="text-deepCharcoal">Customer Support Records:</strong> Inquiries, feedback, and communications sent to us via WhatsApp, email, or contact forms.
                </li>
              </ul>
              <div className="p-4 rounded-lg bg-softGold/10 border border-softGold/20 text-xs sm:text-sm text-deepCharcoal/90 mt-2">
                <strong>Note on Payment Data:</strong> We do <em>not</em> store your credit card, debit card numbers, CVV, or UPI PINs on our servers. All payments are encrypted and processed securely by authorized payment partners (such as Razorpay).
              </div>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h2 className="font-heading text-2xl text-deepCharcoal flex items-center gap-2">
                <span className="text-softGold text-lg font-mono">02.</span> How We Use Your Information
              </h2>
              <p>We use the collected information for the following legitimate purposes:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>To process, fulfill, pack, and dispatch your jewellery and handmade orders.</li>
                <li>To send order confirmations, delivery tracking updates, and invoices via Email or SMS/WhatsApp.</li>
                <li>To respond to your inquiries, customer support requests, and product customization queries.</li>
                <li>To maintain and safeguard your customer account and wishlist.</li>
                <li>To detect, investigate, and prevent fraudulent transactions or security violations.</li>
                <li>To analyze website performance and improve our catalogue, stall showcases, and user interface.</li>
                <li>To send promotional updates or special festive offers (only if you opted in, and you can unsubscribe at any time).</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h2 className="font-heading text-2xl text-deepCharcoal flex items-center gap-2">
                <span className="text-softGold text-lg font-mono">03.</span> Sharing of Information
              </h2>
              <p>
                We respect your personal privacy. We do not sell or rent your personal information to third parties. We share your information solely with trusted service providers who help us operate our business:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong className="text-deepCharcoal">Courier & Logistics Partners:</strong> To safely deliver parcels to your doorstep (e.g., Delhivery, Blue Dart, Shiprocket, or India Post).
                </li>
                <li>
                  <strong className="text-deepCharcoal">Payment Gateways:</strong> To authorize and process payments safely (e.g., Razorpay).
                </li>
                <li>
                  <strong className="text-deepCharcoal">Analytics & Infrastructure:</strong> Hosting providers (Vercel), database infrastructure (MongoDB Atlas), and analytics services (Google Analytics) to ensure store uptime and performance.
                </li>
                <li>
                  <strong className="text-deepCharcoal">Legal Obligations:</strong> If required by law, court order, or governmental authorities to comply with applicable regulations.
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h2 className="font-heading text-2xl text-deepCharcoal flex items-center gap-2">
                <span className="text-softGold text-lg font-mono">04.</span> Cookies & Tracking Technologies
              </h2>
              <p>
                We use essential cookies to maintain your active shopping cart, remember your login session, and improve site navigation. We also utilize anonymized analytics cookies to understand how visitors interact with our store pages.
              </p>
              <p>
                You can configure your browser to reject cookies or notify you when cookies are sent; however, certain site features (such as retaining items in your shopping bag) may not function properly without cookies.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-3">
              <h2 className="font-heading text-2xl text-deepCharcoal flex items-center gap-2">
                <span className="text-softGold text-lg font-mono">05.</span> Data Security & Retention
              </h2>
              <p>
                We implement industry-standard administrative and technical security measures (including SSL/TLS encryption across all site pages) to protect your personal information against unauthorized access, alteration, or disclosure.
              </p>
              <p>
                We retain your order records for as long as necessary to provide services, resolve disputes, and fulfill statutory tax and legal obligations under Indian law.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-3">
              <h2 className="font-heading text-2xl text-deepCharcoal flex items-center gap-2">
                <span className="text-softGold text-lg font-mono">06.</span> Your Rights
              </h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Access and review the personal information we hold about you.</li>
                <li>Request correction of any outdated or inaccurate details.</li>
                <li>Request deletion of your account and personal details (subject to active order fulfillment and legal retention rules).</li>
                <li>Opt out of marketing communications at any point by clicking “Unsubscribe” or contacting us.</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div className="space-y-3">
              <h2 className="font-heading text-2xl text-deepCharcoal flex items-center gap-2">
                <span className="text-softGold text-lg font-mono">07.</span> Changes to This Policy
              </h2>
              <p>
                We may periodically update this Privacy Policy to reflect changes in our practices, operational needs, or legal requirements. Any modifications will be posted directly on this page with an updated &ldquo;Last Updated&rdquo; date.
              </p>
            </div>

            {/* Contact / Grievance */}
            <div className="pt-6 border-t border-black/10">
              <h2 className="font-heading text-2xl text-deepCharcoal mb-3">Contact Us / Grievance Officer</h2>
              <p className="mb-4">
                If you have questions, feedback, or requests regarding this Privacy Policy or your personal information, please reach out to us:
              </p>
              <div className="bg-ivory p-6 rounded-xl border border-black/5 space-y-2 text-sm">
                <p><strong className="text-deepCharcoal">Brand:</strong> Kiyusha</p>
                <p><strong className="text-deepCharcoal">Email:</strong> <a href="mailto:support@kiyusha.com" className="text-softGold hover:underline font-medium">support@kiyusha.com</a> / <a href="mailto:hello@kiyusha.com" className="text-softGold hover:underline font-medium">hello@kiyusha.com</a></p>
                <p><strong className="text-deepCharcoal">Website:</strong> <a href="https://kiyusha.com" className="text-softGold hover:underline font-medium">https://kiyusha.com</a></p>
                <p><strong className="text-deepCharcoal">Country of Operation:</strong> India</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
