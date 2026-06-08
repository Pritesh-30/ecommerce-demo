import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-7xl font-semibold text-clay">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-pine-deep">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-3 max-w-sm text-stone">
        The link may be broken, or the piece may have sold out and moved on.
      </p>
      <Link href="/products" className="btn-primary mt-8">
        Back to the catalog
      </Link>
    </div>
  );
}
