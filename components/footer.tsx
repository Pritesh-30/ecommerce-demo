import Link from "next/link";
import { categories } from "@/lib/products";

const social = ["Instagram", "Pinterest", "Journal", "Contact"];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-pine/10 bg-pine text-paper">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <span className="font-display text-2xl font-semibold">
            Verde<span className="text-clay">.</span>
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/70">
            Considered goods for modern living — made to last, made to be used.
            A small, honest catalog.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/50">
            Shop
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/category/${c.slug}`}
                  className="text-paper/80 transition-colors hover:text-clay"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/50">
            Studio
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {social.map((s) => (
              <li key={s}>
                <span className="cursor-default text-paper/80 transition-colors hover:text-clay">
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/50">
            The slow letter
          </h4>
          <p className="mt-4 text-sm text-paper/70">
            Occasional notes on new arrivals and the makers behind them.
          </p>
          <form className="mt-4 flex overflow-hidden rounded-full border border-paper/20">
            <input
              type="email"
              placeholder="you@email.com"
              className="w-full bg-transparent px-4 py-2.5 text-sm text-paper placeholder:text-paper/40 focus:outline-none"
              aria-label="Email address"
            />
            <button
              type="button"
              className="bg-clay px-5 text-sm font-semibold text-paper transition-colors hover:bg-clay-soft"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-paper/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Verde &amp; Co. All rights reserved.</p>
          <p>Built with Next.js + Bun · Containerized with Docker</p>
        </div>
      </div>
    </footer>
  );
}
