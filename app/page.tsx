import Link from "next/link";
import { Hero } from "@/components/hero";
import { CategoryStrip } from "@/components/category-strip";
import { ProductGrid } from "@/components/product-grid";
import { products } from "@/lib/products";
import { ArrowIcon } from "@/components/icons";

export default function HomePage() {
  const featured = products.slice(0, 6);

  return (
    <>
      <Hero />

      <CategoryStrip />

      {/* Featured products */}
      <section className="container-page mt-24">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow">Just landed</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-pine-deep sm:text-4xl">
              Featured this week
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden items-center gap-1.5 text-sm font-semibold text-pine transition-colors hover:text-clay sm:inline-flex"
          >
            View all
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10">
          <ProductGrid products={featured} priorityCount={3} />
        </div>
      </section>

      {/* Editorial promise */}
      <section className="container-page mt-24">
        <div className="grid gap-6 rounded-2xl bg-pine-soft p-8 text-paper sm:p-14 lg:grid-cols-3">
          {[
            {
              title: "Made to last",
              body: "Natural materials and repair-friendly construction, so things stay out of landfill.",
            },
            {
              title: "Fairly made",
              body: "Produced in small runs by workshops we know by name and visit often.",
            },
            {
              title: "Carbon-neutral",
              body: "Every order ships plastic-free and fully offset, at no extra cost to you.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="font-display text-xl font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/75">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
