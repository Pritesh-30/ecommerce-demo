import type { Product } from "@/lib/types";
import { ProductCard } from "./product-card";

export function ProductGrid({
  products,
  priorityCount = 0,
}: {
  products: Product[];
  priorityCount?: number;
}) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, i) => (
        <ProductCard
          key={product.slug}
          product={product}
          priority={i < priorityCount}
        />
      ))}
    </div>
  );
}
