import type {
  CollectionCard,
  FeaturedLook,
  NavCategory,
  Product,
  SocialPost,
  Testimonial
} from "@/types";

export const navCategories: NavCategory[] = [
  {
    title: "Necklaces",
    href: "/collections/necklaces",
    links: [
      { label: "Layered Chains", href: "/collections/necklaces/layered" },
      { label: "Pendants", href: "/collections/necklaces/pendants" },
      { label: "Everyday Sets", href: "/collections/necklaces/sets" }
    ]
  },
  {
    title: "Earrings",
    href: "/collections/earrings",
    links: [
      { label: "Huggies", href: "/collections/earrings/huggies" },
      { label: "Studs", href: "/collections/earrings/studs" },
      { label: "Drop Earrings", href: "/collections/earrings/drop" }
    ]
  },
  {
    title: "Bracelets",
    href: "/collections/bracelets",
    links: [
      { label: "Charm Bracelets", href: "/collections/bracelets/charm" },
      { label: "Tennis Bracelets", href: "/collections/bracelets/tennis" },
      { label: "Cuffs", href: "/collections/bracelets/cuffs" }
    ]
  },
  {
    title: "Rings",
    href: "/collections/rings",
    links: [
      { label: "Stacking Rings", href: "/collections/rings/stacking" },
      { label: "Signet Rings", href: "/collections/rings/signet" },
      { label: "Statement Rings", href: "/collections/rings/statement" }
    ]
  }
];

export const collections: CollectionCard[] = [
  {
    title: "Necklaces",
    tagline: "Sculpted layers for day-to-evening polish",
    image:
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=80",
    href: "/collections/necklaces"
  },
  {
    title: "Bracelets",
    tagline: "Fine lines, modern cuffs, and charm edits",
    image:
      "https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=1200&q=80",
    href: "/collections/bracelets"
  },
  {
    title: "Earrings",
    tagline: "Refined silhouettes with subtle sparkle",
    image:
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=1200&q=80",
    href: "/collections/earrings"
  },
  {
    title: "Rings",
    tagline: "Everyday stacks with elevated finish",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
    href: "/collections/rings"
  },
  {
    title: "Anklets",
    tagline: "Soft movement in warm gold tones",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=80",
    href: "/collections/anklets"
  },
  {
    title: "Gift Sets",
    tagline: "Curated demi-fine boxes for milestones",
    image:
      "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=1200&q=80",
    href: "/collections/gift-sets"
  }
];

export const featuredLook: FeaturedLook = {
  title: "The Signature Evening Stack",
  subtitle: "Featured Product Edit",
  description:
    "Designed for elevated everyday wear, this edit layers hand-finished textures and subtle sparkle to frame the neckline and wrist with effortless luxury.",
  image:
    "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1600&q=80",
  highlights: ["18k vermeil over sterling silver", "Hypoallergenic and nickel-safe", "Tarnish-resistant everyday finish"],
  ctaHref: "/shop-the-look/signature-evening-stack"
};

export const signaturePicks: Product[] = [
  {
    id: "p1",
    name: "Athena Pearl Huggies",
    category: "Earrings",
    price: "INR 3,499",
    oldPrice: "INR 4,299",
    image:
      "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&w=900&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1631983850127-77cb6d6f87f4?auto=format&fit=crop&w=900&q=80",
    href: "/products/athena-pearl-huggies",
    badge: "New"
  },
  {
    id: "p2",
    name: "Siena Chain Bracelet",
    category: "Bracelets",
    price: "INR 2,899",
    oldPrice: "INR 3,499",
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1616427594687-5f3d0ecf6e04?auto=format&fit=crop&w=900&q=80",
    href: "/products/siena-chain-bracelet",
    badge: "Bestseller"
  },
  {
    id: "p3",
    name: "Luna Signet Ring",
    category: "Rings",
    price: "INR 2,699",
    image:
      "https://images.unsplash.com/photo-1612177343582-665b80f1f59f?auto=format&fit=crop&w=900&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=900&q=80",
    href: "/products/luna-signet-ring"
  },
  {
    id: "p4",
    name: "Auric Layered Necklace",
    category: "Necklaces",
    price: "INR 3,999",
    oldPrice: "INR 4,899",
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=80",
    href: "/products/auric-layered-necklace"
  },
  {
    id: "p5",
    name: "Mira Crystal Studs",
    category: "Earrings",
    price: "INR 2,199",
    image:
      "https://images.unsplash.com/photo-1633810548074-8f5f2ff89e0d?auto=format&fit=crop&w=900&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1617038220369-77f4bd5d8758?auto=format&fit=crop&w=900&q=80",
    href: "/products/mira-crystal-studs"
  },
  {
    id: "p6",
    name: "Noor Charm Anklet",
    category: "Anklets",
    price: "INR 2,499",
    image:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=900&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&w=900&q=80",
    href: "/products/noor-charm-anklet"
  },
  {
    id: "p7",
    name: "Eden Tennis Bracelet",
    category: "Bracelets",
    price: "INR 4,299",
    image:
      "https://images.unsplash.com/photo-1573408300915-8ce5bb3ca040?auto=format&fit=crop&w=900&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=900&q=80",
    href: "/products/eden-tennis-bracelet"
  },
  {
    id: "p8",
    name: "Celeste Drop Necklace",
    category: "Necklaces",
    price: "INR 3,599",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=80",
    href: "/products/celeste-drop-necklace"
  }
];

export const newArrivals: Product[] = [
  {
    id: "p1",
    name: "Athena Pearl Huggies",
    category: "Earrings",
    price: "INR 3,499",
    oldPrice: "INR 4,299",
    image:
      "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&w=900&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1631983850127-77cb6d6f87f4?auto=format&fit=crop&w=900&q=80",
    href: "/products/athena-pearl-huggies",
    badge: "New"
  },
  {
    id: "n1",
    name: "Ethereal Gold Choker",
    category: "Necklaces",
    price: "INR 5,999",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=80",
    href: "/products/ethereal-gold-choker",
    badge: "New"
  },
  {
    id: "n2",
    name: "Seraphina Diamond Studs",
    category: "Earrings",
    price: "INR 4,499",
    oldPrice: "INR 5,499",
    image: "https://images.unsplash.com/photo-1633810548074-8f5f2ff89e0d?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1617038220369-77f4bd5d8758?auto=format&fit=crop&w=900&q=80",
    href: "/products/seraphina-diamond-studs",
    badge: "New"
  },
  {
    id: "n3",
    name: "Opulence Cuff Bracelet",
    category: "Bracelets",
    price: "INR 3,899",
    image: "https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1616427594687-5f3d0ecf6e04?auto=format&fit=crop&w=900&q=80",
    href: "/products/opulence-cuff-bracelet",
    badge: "New"
  },
  {
    id: "n4",
    name: "Astra Galaxy Ring",
    category: "Rings",
    price: "INR 3,199",
    image: "https://images.unsplash.com/photo-1612177343582-665b80f1f59f?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=900&q=80",
    href: "/products/astra-galaxy-ring",
    badge: "New"
  },
  {
    id: "n5",
    name: "Lumina Pearl Necklace",
    category: "Necklaces",
    price: "INR 4,799",
    image: "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1631983850127-77cb6d6f87f4?auto=format&fit=crop&w=900&q=80",
    href: "/products/lumina-pearl-necklace",
    badge: "New"
  }
];

export const earringProducts: Product[] = [
  {
    id: "p1",
    name: "Athena Pearl Huggies",
    category: "Earrings",
    price: "INR 3,499",
    oldPrice: "INR 4,299",
    image: "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1631983850127-77cb6d6f87f4?auto=format&fit=crop&w=900&q=80",
    href: "/products/athena-pearl-huggies",
    badge: "New"
  },
  {
    id: "p5",
    name: "Mira Crystal Studs",
    category: "Earrings",
    price: "INR 2,199",
    image: "https://images.unsplash.com/photo-1633810548074-8f5f2ff89e0d?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1617038220369-77f4bd5d8758?auto=format&fit=crop&w=900&q=80",
    href: "/products/mira-crystal-studs"
  },
  {
    id: "n2",
    name: "Seraphina Diamond Studs",
    category: "Earrings",
    price: "INR 4,499",
    oldPrice: "INR 5,499",
    image: "https://images.unsplash.com/photo-1633810548074-8f5f2ff89e0d?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1617038220369-77f4bd5d8758?auto=format&fit=crop&w=900&q=80",
    href: "/products/seraphina-diamond-studs",
    badge: "New"
  },
  {
    id: "e1",
    name: "Selene Drop Earrings",
    category: "Earrings",
    price: "INR 3,299",
    image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1617038220369-77f4bd5d8758?auto=format&fit=crop&w=900&q=80",
    href: "/products/selene-drop-earrings"
  },
  {
    id: "e2",
    name: "Iris Gold Hoops",
    category: "Earrings",
    price: "INR 2,799",
    image: "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1631983850127-77cb6d6f87f4?auto=format&fit=crop&w=900&q=80",
    href: "/products/iris-gold-hoops"
  },
  {
    id: "e3",
    name: "Lyra Star Studs",
    category: "Earrings",
    price: "INR 1,999",
    image: "https://images.unsplash.com/photo-1633810548074-8f5f2ff89e0d?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1617038220369-77f4bd5d8758?auto=format&fit=crop&w=900&q=80",
    href: "/products/lyra-star-studs"
  }
];

export const testimonials: Testimonial[] = [
  {
    name: "Aarushi Mehra",
    location: "Mumbai",
    quote:
      "The finish feels genuinely premium. I wear my Kiyusha stack every day and it still looks newly polished.",
    rating: 5
  },
  {
    name: "Kritika S.",
    location: "Bengaluru",
    quote:
      "Exactly the minimal yet luxurious look I wanted. Packaging, quality, and fit were all impeccable.",
    rating: 5
  },
  {
    name: "Ira Kapoor",
    location: "New Delhi",
    quote:
      "The pieces layer beautifully and do not irritate my skin. Kiyusha feels like quiet luxury done right.",
    rating: 5
  }
];

export const socialPosts: SocialPost[] = [
  {
    id: "s1",
    image:
      "https://images.unsplash.com/photo-1598560917802-205df55f51cb?auto=format&fit=crop&w=900&q=80",
    handle: "@kiyusha.jewels",
    caption: "Morning layers in soft gold."
  },
  {
    id: "s2",
    image:
      "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?auto=format&fit=crop&w=900&q=80",
    handle: "@kiyusha.jewels",
    caption: "Stacking rings for city evenings."
  },
  {
    id: "s3",
    image:
      "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=900&q=80",
    handle: "@kiyusha.jewels",
    caption: "Gift-ready demi-fine edits."
  },
  {
    id: "s4",
    image:
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=80",
    handle: "@kiyusha.jewels",
    caption: "Refined drops, made for every day."
  },
  {
    id: "s5",
    image:
      "https://images.unsplash.com/photo-1625591340248-6d28958c6f7d?auto=format&fit=crop&w=900&q=80",
    handle: "@kiyusha.jewels",
    caption: "Muted tones, luminous details."
  }
];
