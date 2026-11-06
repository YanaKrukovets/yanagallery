"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "motion/react";
import { useState } from "react";
import { altOf, photosOf, sizeOf, type Design, type Product } from "@/content/products";
import { shop } from "@/content/site";
import { useAddToBag } from "@/features/cart/useAddToBag";
import { cad } from "@/lib/format";
import { EASE } from "@/lib/motion";
import { PhotoDots } from "./PhotoDots";

export function ProductCard({
  product,
  design,
  index = 0,
  headingLevel: Heading = "h3",
}: {
  product: Product;
  /** Show this one design of the product: its photo, its name, and "Add to bag" adds it directly. */
  design?: Design;
  index?: number;
  headingLevel?: "h2" | "h3";
}) {
  const { onAdd, label, disabled } = useAddToBag(product, design?.id);
  const photos = design ? [design.image, ...(design.gallery ?? product.gallery ?? [])] : photosOf(product);
  const [shown, setShown] = useState(0);
  const href = design ? `/products/${product.slug}?design=${design.id}` : `/products/${product.slug}`;
  const name = design ? `${product.title}, ${design.name} design` : product.title;
  const badge = product.sold ? "Sold" : product.badge;
  const meta = [sizeOf(product), product.original && "One of a kind"].filter(Boolean).join(" · ");

  return (
    <m.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: (index % 4) * 0.1, ease: EASE }}
      className="group"
    >
      {/* Product photos already show the framed piece on a wall, so no extra frame here */}
      <div
        className="relative overflow-hidden bg-sand/60"
        // With a mouse, hovering shows the close-up; leaving goes back to the main photo.
        onPointerEnter={(e) => e.pointerType === "mouse" && photos.length > 1 && setShown(1)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setShown(0)}
      >
        <Link href={href} className="relative block aspect-[3/4]" tabIndex={-1} aria-hidden>
          {photos.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={altOf(product, src, i === 0 ? `${name} by ${shop.artist}` : `${name}, photo ${i + 1}`)}
              fill
              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
              className={`object-cover transition-[opacity,transform] duration-[1.2s] ease-out group-hover:scale-105 ${
                i === shown ? "opacity-100" : "opacity-0"
              } ${product.sold ? "grayscale-[40%]" : ""}`}
            />
          ))}
        </Link>
        {badge && (
          <span className="pointer-events-none absolute left-2.5 top-2.5 rounded-full bg-cream px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em]">
            {badge}
          </span>
        )}
        <PhotoDots count={photos.length} shown={shown} onSelect={setShown} className="absolute right-2.5 top-2.5" />
        <button
          onClick={onAdd}
          disabled={disabled}
          aria-label={`${label}: ${name}`}
          className="absolute inset-x-3 bottom-3 translate-y-3 rounded-full bg-ink py-2 text-[10px] uppercase tracking-[0.18em] text-cream opacity-0 transition-all duration-500 hover:bg-bronze focus:translate-y-0 focus:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 disabled:bg-ink/70 sm:inset-x-4 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100"
        >
          {label}
        </button>
      </div>

      <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div>
          <Heading className="font-serif text-base leading-tight sm:text-lg">
            <Link href={href} className="hover:text-bronze">
              {design?.name ?? product.title}
            </Link>
          </Heading>
          {design && <p className="mt-1 text-sm text-ink-soft">{product.title}</p>}
          <p className="mt-1 text-xs text-muted">{product.medium}</p>
          {meta && <p className="mt-0.5 text-xs text-muted">{meta}</p>}
        </div>
        <p className={`whitespace-nowrap font-serif text-base ${product.sold ? "text-muted line-through" : ""}`}>
          {cad.format(product.price)}
        </p>
      </div>
    </m.article>
  );
}
