import type { Metadata } from "next";
import { ProductGrid } from "@/components/product-grid";
import { products, categories } from "@/lib/products";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Catalog",
  description: "Every piece in the Verde & Co. catalog.",
};

export default function ProductsPage() {
  return (
    <div className="container-page pt-10">
      <header className="border-b border-pine/10 pb-8">
        <p className="eyebrow">The catalog</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-pine-deep sm:text-5xl">
          Everything, in one place
        </h1>
        <p className="mt-3 max-w-xl text-stone">
          {products.length} considered pieces across apparel, footwear,
          accessories and home.
        </p>

        {/* Category filters */}
        <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto">
          <span className="whitespace-nowrap rounded-full bg-pine px-4 py-2 text-sm font-medium text-paper">
            All
          </span>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="whitespace-nowrap rounded-full border border-pine/15 px-4 py-2 text-sm font-medium text-pine transition-colors hover:border-pine"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </header>

      <div className="py-12">
        <ProductGrid products={products} priorityCount={3} />
      </div>
    </div>
  );
}
