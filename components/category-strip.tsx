import Link from "next/link";
import { categories } from "@/lib/products";
import { categoryTint } from "@/lib/utils";
import { ProductImage } from "./product-image";

export function CategoryStrip() {
  return (
    <section className="container-page mt-20">
      <div className="flex items-end justify-between">
        <div>
          <p className="eyebrow">Browse by</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-pine-deep sm:text-4xl">
            Four small collections
          </h2>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-sand"
          >
            <ProductImage
              src={c.image}
              alt={c.name}
              tint={categoryTint(c.slug)}
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pine-deep/75 via-pine-deep/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-paper">
              <h3 className="font-display text-xl font-semibold">{c.name}</h3>
              <p className="mt-0.5 text-sm text-paper/80">{c.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
