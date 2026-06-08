import type { Metadata } from "next";
import Link from "next/link";
import { CartIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-sand text-pine">
        <CartIcon className="h-7 w-7" />
      </span>
      <h1 className="mt-6 font-display text-3xl font-semibold text-pine-deep">
        Your cart is empty
      </h1>
      <p className="mt-3 max-w-sm text-stone">
        Checkout is on the roadmap. For now, browse the catalog and save what
        catches your eye.
      </p>
      <Link href="/products" className="btn-primary mt-8">
        Browse the catalog
      </Link>
    </div>
  );
}
