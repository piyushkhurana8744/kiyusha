export type NavCategory = {
  title: string;
  href: string;
  links: Array<{ label: string; href: string }>;
};

export type CollectionCard = {
  title: string;
  tagline: string;
  image: string;
  href: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  oldPrice?: string;
  image: string;
  hoverImage: string;
  href: string;
  badge?: string;
};

export type FeaturedLook = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  highlights: string[];
  ctaHref: string;
};

export type Testimonial = {
  name: string;
  location: string;
  quote: string;
  rating: number;
};

export type SocialPost = {
  id: string;
  image: string;
  handle: string;
  caption: string;
};
