import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice, categoryTint } from "@/lib/utils";
import { ProductImage } from "./product-image";
import { HeartIcon } from "./icons";

const badgeStyles: Record<NonNullable<Product["badge"]>, string> = {
  New: "bg-pine text-paper",
  Bestseller: "bg-clay text-paper",
  Limited: "bg-pine-deep text-paper",
};

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand">
        <ProductImage
          src={product.image}
          alt={product.name}
          tint={categoryTint(product.category)}
          priority={priority}
        />

        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
              badgeStyles[product.badge]
            }`}
          >
            {product.badge}
          </span>
        )}

        <span
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-paper/85 text-pine
                     opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          aria-hidden
        >
          <HeartIcon className="h-4 w-4" />
        </span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg leading-tight text-pine-deep">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-stone">{product.summary}</p>
        </div>
        <span className="shrink-0 font-display text-lg text-pine-deep">
          {formatPrice(product.price)}
        </span>
      </div>
    </Link>
  );
}
