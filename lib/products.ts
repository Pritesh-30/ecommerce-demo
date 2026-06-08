import type { Category, Product } from "./types";

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1000&q=80`;

export const categories: Category[] = [
  {
    slug: "apparel",
    name: "Apparel",
    tagline: "Everyday essentials, considered cuts.",
    image: img("1489987707025-afc232f7ea0f"),
  },
  {
    slug: "footwear",
    name: "Footwear",
    tagline: "Built to walk further.",
    image: img("1542291026-7eec264c27ff"),
  },
  {
    slug: "accessories",
    name: "Accessories",
    tagline: "The finishing details.",
    image: img("1523275335684-37898b6baf30"),
  },
  {
    slug: "living",
    name: "Living",
    tagline: "Objects for a calmer home.",
    image: img("1505740420928-5e560c06d30e"),
  },
];

export const products: Product[] = [
  {
    slug: "harbor-organic-tee",
    name: "Harbor Organic Tee",
    price: 38,
    category: "apparel",
    image: img("1521572163474-6864f9cf17ab"),
    summary: "Heavyweight organic cotton in a relaxed, lived-in fit.",
    description:
      "Cut from 100% GOTS-certified organic cotton, the Harbor Tee is garment-dyed for a soft, broken-in feel from the very first wear. A slightly dropped shoulder and mid-weight body make it the quiet anchor of any rotation.",
    colors: [
      { name: "Bone", hex: "#E7DEC9" },
      { name: "Pine", hex: "#1B3A2B" },
      { name: "Clay", hex: "#C2622E" },
    ],
    badge: "Bestseller",
  },
  {
    slug: "field-merino-sweater",
    name: "Field Merino Sweater",
    price: 124,
    category: "apparel",
    image: img("1576566588028-4147f3842f27"),
    summary: "Fine-gauge merino knit that breathes in every season.",
    description:
      "Spun from extra-fine 19.5 micron merino wool, this sweater regulates temperature naturally while staying featherlight. Fully fashioned seams keep the silhouette clean from collar to cuff.",
    colors: [
      { name: "Oat", hex: "#D8CDB4" },
      { name: "Moss", hex: "#2C5340" },
    ],
    badge: "New",
  },
  {
    slug: "drifter-linen-shirt",
    name: "Drifter Linen Shirt",
    price: 88,
    category: "apparel",
    image: img("1602810318383-e386cc2a3ccf"),
    summary: "Breathable European linen for warm-weather ease.",
    description:
      "Woven from washed Belgian linen, the Drifter softens with every wash and keeps you cool when the temperature climbs. Corozo buttons and a relaxed camp collar finish the look.",
    colors: [
      { name: "Sand", hex: "#E7DEC9" },
      { name: "Sky", hex: "#9BB7C4" },
    ],
  },
  {
    slug: "trailline-low-sneaker",
    name: "Trailline Low Sneaker",
    price: 145,
    category: "footwear",
    image: img("1600185365926-3a2ce3cdb9eb"),
    summary: "A minimalist low-top on a cushioned natural-rubber sole.",
    description:
      "Full-grain leather uppers sit atop a responsive cork-and-rubber midsole, so the Trailline feels as good on day one as it looks on day one hundred. Resole-friendly construction keeps them out of landfill.",
    colors: [
      { name: "Chalk", hex: "#F1ECE0" },
      { name: "Pine", hex: "#1B3A2B" },
    ],
    badge: "Bestseller",
  },
  {
    slug: "ember-runner",
    name: "Ember Runner",
    price: 132,
    category: "footwear",
    image: img("1542291026-7eec264c27ff"),
    summary: "A lightweight everyday runner with real character.",
    description:
      "Engineered knit uppers wrap the foot like a sock while a sculpted EVA midsole returns energy with every stride. The Ember is equally at home on a morning loop or an afternoon errand.",
    colors: [
      { name: "Flame", hex: "#C2622E" },
      { name: "Slate", hex: "#3A3F44" },
    ],
  },
  {
    slug: "warden-leather-boot",
    name: "Warden Leather Boot",
    price: 228,
    category: "footwear",
    image: img("1520639888713-7851133b1ed0"),
    summary: "Goodyear-welted boots made to be handed down.",
    description:
      "Built on a Goodyear welt with vegetable-tanned leather, the Warden is the kind of boot that earns its patina. Fully resoleable and lined with breathable leather for all-day comfort.",
    colors: [
      { name: "Chestnut", hex: "#7A4A2B" },
      { name: "Black", hex: "#1C1C1C" },
    ],
    badge: "Limited",
  },
  {
    slug: "meridian-sunglasses",
    name: "Meridian Sunglasses",
    price: 96,
    category: "accessories",
    image: img("1572635196237-14b3f281503f"),
    summary: "Hand-polished acetate with polarized lenses.",
    description:
      "Cut from Italian bio-acetate and finished by hand, the Meridian frames pair a timeless silhouette with polarized, UV400 lenses. A keyhole bridge keeps them sitting comfortably all day.",
    colors: [
      { name: "Tortoise", hex: "#6B4A2B" },
      { name: "Onyx", hex: "#1C1C1C" },
    ],
  },
  {
    slug: "atlas-field-watch",
    name: "Atlas Field Watch",
    price: 189,
    category: "accessories",
    image: img("1523275335684-37898b6baf30"),
    summary: "A clean automatic with a sapphire crystal.",
    description:
      "Powered by a self-winding automatic movement and protected by a scratch-resistant sapphire crystal, the Atlas reads clearly at a glance. The quick-release strap swaps in seconds.",
    colors: [
      { name: "Forest", hex: "#1B3A2B" },
      { name: "Cream", hex: "#E7DEC9" },
    ],
    badge: "New",
  },
  {
    slug: "voyage-roll-top-pack",
    name: "Voyage Roll-Top Pack",
    price: 158,
    category: "accessories",
    image: img("1553062407-98eeb64c6a62"),
    summary: "A weatherproof roll-top for the daily commute.",
    description:
      "Made from recycled ripstop with a waxed-canvas base, the Voyage shrugs off rain while a padded sleeve guards your laptop. The roll-top closure flexes from light day to overnight.",
    colors: [
      { name: "Olive", hex: "#3F4A33" },
      { name: "Stone", hex: "#8C857A" },
    ],
  },
  {
    slug: "lowtone-headphones",
    name: "Lowtone Headphones",
    price: 174,
    category: "living",
    image: img("1505740420928-5e560c06d30e"),
    summary: "Warm, balanced sound with 40-hour battery life.",
    description:
      "Tuned for a natural, fatigue-free signature, the Lowtone pairs memory-foam earcups with adaptive noise cancellation. A single charge carries you through the week.",
    colors: [
      { name: "Charcoal", hex: "#2B2B2B" },
      { name: "Sand", hex: "#D8CDB4" },
    ],
    badge: "Bestseller",
  },
  {
    slug: "grove-ceramic-mug",
    name: "Grove Ceramic Mug",
    price: 28,
    category: "living",
    image: img("1514228742587-6b1558fcca3d"),
    summary: "Hand-thrown stoneware with a reactive glaze.",
    description:
      "Each Grove mug is wheel-thrown and finished with a reactive glaze, so no two are exactly alike. The generous 12oz body keeps coffee warmer for longer.",
    colors: [
      { name: "Sage", hex: "#7E8B6B" },
      { name: "Clay", hex: "#C2622E" },
    ],
  },
  {
    slug: "willow-potted-fern",
    name: "Willow Potted Fern",
    price: 46,
    category: "living",
    image: img("1485955900006-10f4d324d411"),
    summary: "A low-maintenance fern in a matte stoneware pot.",
    description:
      "Delivered in a hand-glazed stoneware pot, the Willow fern thrives in indirect light and asks for little. A quiet way to bring a room to life.",
    colors: [
      { name: "Ivory", hex: "#EFE9DB" },
      { name: "Moss", hex: "#2C5340" },
    ],
    badge: "New",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit);
}
