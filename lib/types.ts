export type Category = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
};

export type Product = {
  slug: string;
  name: string;
  price: number;
  category: string;
  image: string;
  summary: string;
  description: string;
  colors: { name: string; hex: string }[];
  badge?: "New" | "Bestseller" | "Limited";
};
