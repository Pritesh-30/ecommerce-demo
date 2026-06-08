import type { Metadata } from "next";
import Link from "next/link";
import { UserIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Account",
};

export default function AccountPage() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-sand text-pine">
        <UserIcon className="h-7 w-7" />
      </span>
      <h1 className="mt-6 font-display text-3xl font-semibold text-pine-deep">
        Accounts coming soon
      </h1>
      <p className="mt-3 max-w-sm text-stone">
        Sign-in, orders and saved items will live here in a future release.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to home
      </Link>
    </div>
  );
}
