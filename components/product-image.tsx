"use client";

import Image from "next/image";
import { useState } from "react";

type ProductImageProps = {
  src: string;
  alt: string;
  tint: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Renders a remote product image with a tasteful gradient fallback.
 * If the external image fails to load, the component degrades to a
 * branded placeholder so the catalog never shows a broken image.
 */
export function ProductImage({
  src,
  alt,
  tint,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="flex h-full w-full items-center justify-center"
        style={{
          background: `linear-gradient(140deg, ${tint} 0%, ${tint}cc 100%)`,
        }}
      >
        <span className="px-6 text-center font-display text-lg font-medium text-paper/90">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
    />
  );
}
