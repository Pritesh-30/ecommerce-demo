import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductGrid } from "@/components/product-grid";
import {
  categories,
  getCategory,
  getProductsByCategory,
} from "@/lib/products";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category" };
  return {
    title: category.name,
    description: category.tagline,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = getProductsByCategory(slug);

  return (
    <div className="container-page pt-10">
      <header className="border-b border-pine/10 pb-8">
        <nav className="mb-4 text-sm text-stone">
          <Link href="/" className="hover:text-clay">
            Home
          </Link>
          <span className="px-2">/</span>
          <span className="text-pine">{category.name}</span>
        </nav>
        <p className="eyebrow">Collection</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-pine-deep sm:text-5xl">
          {category.name}
        </h1>
        <p className="mt-3 max-w-xl text-stone">{category.tagline}</p>
      </header>

      <div className="py-12">
        <ProductGrid products={items} priorityCount={3} />
      </div>
    </div>
  );
}
