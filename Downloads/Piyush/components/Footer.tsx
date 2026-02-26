import Link from "next/link";

const shopLinks = [
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Bestsellers", href: "/collections/bestsellers" },
  { label: "Gift Cards", href: "/gift-cards" },
  { label: "Shop the Look", href: "/shop-the-look" }
];

const serviceLinks = [
  { label: "Shipping & Delivery", href: "/shipping" },
  { label: "Returns", href: "/returns" },
  { label: "Jewellery Care", href: "/care" },
  { label: "Track Order", href: "/track-order" }
];

const aboutLinks = [
  { label: "Our Story", href: "/about" },
  { label: "Craftsmanship", href: "/craftsmanship" },
  { label: "Press", href: "/press" },
  { label: "Contact", href: "/contact" }
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-deepCharcoal text-warmWhite">
      <div className="container-lux py-20">
        <div className="grid gap-14 border-b border-white/15 pb-14 lg:grid-cols-[1.2fr,1fr,1fr,1fr]">
          <div className="max-w-md space-y-5">
            <p className="font-heading text-3xl uppercase tracking-[0.18em]">Kiyusha</p>
            <p className="text-sm leading-relaxed text-white/80">
              Premium Indian demi-fine jewellery crafted for women who prefer understated luxury in every detail.
            </p>
            <form className="flex flex-col gap-3 sm:flex-row" aria-label="Newsletter signup">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Your email address"
                className="h-11 w-full border border-white/25 bg-transparent px-4 text-sm text-white placeholder:text-white/55 focus:border-softGold focus:outline-none"
              />
              <button type="submit" className="gold-solid-button whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>

          <nav aria-label="Shop">
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-softGold">Shop</p>
            <ul className="space-y-3 text-sm text-white/80">
              {shopLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-softGold">Services</p>
            <ul className="space-y-3 text-sm text-white/80">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="About">
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-softGold">About</p>
            <ul className="space-y-3 text-sm text-white/80">
              {aboutLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 pt-8 text-xs uppercase tracking-[0.16em] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 Kiyusha. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition hover:text-softGold">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-softGold">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
