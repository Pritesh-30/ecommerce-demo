import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  products,
  getProduct,
  getRelatedProducts,
  getCategory,
} from "@/lib/products";
import { formatPrice, categoryTint } from "@/lib/utils";
import { ProductImage } from "@/components/product-image";
import { ProductGrid } from "@/components/product-grid";
import { CartIcon, HeartIcon } from "@/components/icons";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.summary,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product);

  return (
    <div className="container-page pt-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-stone">
        <Link href="/" className="hover:text-clay">
          Home
        </Link>
        <span className="px-2">/</span>
        {category && (
          <>
            <Link
              href={`/category/${category.slug}`}
              className="hover:text-clay"
            >
              {category.name}
            </Link>
            <span className="px-2">/</span>
          </>
        )}
        <span className="text-pine">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand">
          <ProductImage
            src={product.image}
            alt={product.name}
            tint={categoryTint(product.category)}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Details */}
        <div className="lg:py-6">
          {product.badge && (
            <span className="eyebrow">{product.badge}</span>
          )}
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight text-pine-deep sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 font-display text-2xl text-pine-deep">
            {formatPrice(product.price)}
          </p>

          <p className="mt-6 max-w-md leading-relaxed text-stone">
            {product.description}
          </p>

          {/* Colours */}
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone">
              Colour
            </p>
            <div className="mt-3 flex gap-3">
              {product.colors.map((c, i) => (
                <span
                  key={c.name}
                  title={c.name}
                  className={`h-9 w-9 rounded-full border-2 ${
                    i === 0 ? "border-pine" : "border-transparent"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Actions (reserved for future) */}
          <div className="mt-10 flex gap-3">
            <button type="button" className="btn-primary flex-1 sm:flex-none sm:px-10">
              <CartIcon className="h-5 w-5" />
              Add to cart
            </button>
            <button
              type="button"
              aria-label="Save"
              className="btn-outline aspect-square px-0 sm:w-14"
            >
              <HeartIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-8 space-y-2 border-t border-pine/10 pt-6 text-sm text-stone">
            <p>· Free carbon-neutral shipping over $120</p>
            <p>· 30-day returns, no questions asked</p>
            <p>· Repairs covered for the life of the product</p>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-2xl font-semibold text-pine-deep sm:text-3xl">
            You may also like
          </h2>
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </div>
  );
}
