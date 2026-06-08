import Link from "next/link";
import { ProductImage } from "./product-image";
import { ArrowIcon } from "./icons";

export function Hero() {
  return (
    <section className="container-page pt-8 sm:pt-12">
      <div className="grid items-stretch gap-6 lg:grid-cols-[1.05fr_1fr]">
        {/* Copy */}
        <div className="flex flex-col justify-center rounded-2xl bg-paper p-8 sm:p-12 lg:p-14">
          <p className="eyebrow animate-fade-up">Autumn / Winter Edit</p>
          <h1 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-[1.05] text-pine-deep animate-fade-up sm:text-5xl lg:text-6xl">
            Considered goods for a slower kind of living.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-stone animate-fade-up">
            A small, honest catalog of apparel, footwear and objects — chosen to
            last, not to be replaced.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up">
            <Link href="/products" className="btn-primary">
              Shop the catalog
              <ArrowIcon className="h-4 w-4" />
            </Link>
            <Link href="/category/apparel" className="btn-outline">
              New in apparel
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative min-h-[320px] overflow-hidden rounded-2xl bg-sand lg:min-h-[460px]">
          <ProductImage
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"
            alt="Verde & Co. seasonal edit"
            tint="#1B3A2B"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="pointer-events-none absolute bottom-5 left-5 rounded-full bg-canvas/90 px-4 py-2 text-xs font-semibold text-pine-deep">
            Free carbon-neutral shipping over $120
          </div>
        </div>
      </div>
    </section>
  );
}
