import Link from "next/link";
import { categories } from "@/lib/products";
import { SearchIcon, UserIcon, CartIcon } from "./icons";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-pine/10 bg-canvas/85 backdrop-blur">
      <div className="container-page flex h-16 items-center gap-4 sm:h-20">
        {/* Wordmark */}
        <Link href="/" className="shrink-0">
          <span className="font-display text-xl font-semibold tracking-tight text-pine-deep sm:text-2xl">
            Verde
            <span className="text-clay">.</span>
          </span>
        </Link>

        {/* Primary navigation */}
        <nav className="ml-2 hidden items-center gap-7 md:flex">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="text-sm font-medium text-pine/80 transition-colors hover:text-clay"
            >
              {c.name}
            </Link>
          ))}
          <Link
            href="/products"
            className="text-sm font-medium text-pine/80 transition-colors hover:text-clay"
          >
            All
          </Link>
        </nav>

        {/* Search (visual) */}
        <div className="ml-auto hidden items-center lg:flex">
          <label className="flex items-center gap-2 rounded-full border border-pine/15 bg-paper px-4 py-2 text-stone focus-within:border-pine/40">
            <SearchIcon className="h-4 w-4" />
            <input
              type="text"
              placeholder="Search the shop…"
              className="w-44 bg-transparent text-sm text-pine-deep placeholder:text-stone focus:outline-none"
              aria-label="Search products"
            />
          </label>
        </div>

        {/* Account + Cart (reserved for future) */}
        <div className="ml-auto flex items-center gap-1 lg:ml-4">
          <Link
            href="/account"
            aria-label="Account"
            className="grid h-10 w-10 place-items-center rounded-full text-pine transition-colors hover:bg-pine hover:text-paper"
          >
            <UserIcon className="h-5 w-5" />
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative grid h-10 w-10 place-items-center rounded-full text-pine transition-colors hover:bg-pine hover:text-paper"
          >
            <CartIcon className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-clay text-[10px] font-bold text-paper">
              0
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile category row */}
      <nav className="no-scrollbar flex items-center gap-6 overflow-x-auto border-t border-pine/10 px-5 py-2.5 md:hidden">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className="whitespace-nowrap text-sm font-medium text-pine/80"
          >
            {c.name}
          </Link>
        ))}
        <Link
          href="/products"
          className="whitespace-nowrap text-sm font-medium text-pine/80"
        >
          All
        </Link>
      </nav>
    </header>
  );
}
