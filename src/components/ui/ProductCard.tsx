"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { photosOf, sizeOf, type Product } from "@/content/products";
import { shop } from "@/content/site";
import { useAddToBag } from "@/features/cart/useAddToBag";
import { cad } from "@/lib/format";
import { EASE } from "@/lib/motion";
import { PhotoDots } from "./PhotoDots";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { onAdd, label, disabled } = useAddToBag(product);
  const photos = photosOf(product);
  const [shown, setShown] = useState(0);
  const href = `/products/${product.slug}`;
  const badge = product.sold ? "Sold" : product.badge;
  const meta = [sizeOf(product), product.original && "One of a kind"].filter(Boolean).join(" · ");

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.12, ease: EASE }}
      className="group"
    >
      {/* Product photos already show the framed piece on a wall, so no extra frame here */}
      <div
        className="relative overflow-hidden bg-sand/60"
        // With a mouse, hovering shows the close-up; leaving goes back to the main photo.
        onPointerEnter={(e) => e.pointerType === "mouse" && photos.length > 1 && setShown(1)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setShown(0)}
      >
        <Link href={href} className="relative block aspect-[3/4]" aria-label={product.title}>
          {photos.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={i === 0 ? `${product.title} by ${shop.artist}` : `${product.title}, close-up`}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              className={`object-cover transition-[opacity,transform] duration-[1.2s] ease-out group-hover:scale-105 ${
                i === shown ? "opacity-100" : "opacity-0"
              } ${product.sold ? "grayscale-[40%]" : ""}`}
            />
          ))}
        </Link>
        {badge && (
          <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-cream px-3 py-1 text-[10px] uppercase tracking-[0.2em]">
            {badge}
          </span>
        )}
        <PhotoDots count={photos.length} shown={shown} onSelect={setShown} className="absolute right-4 top-4" />
        <button
          onClick={onAdd}
          disabled={disabled}
          className="absolute inset-x-6 bottom-4 translate-y-3 rounded-full bg-ink py-3 text-xs uppercase tracking-[0.2em] text-cream opacity-0 transition-all duration-500 hover:bg-bronze focus:translate-y-0 focus:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 disabled:bg-ink/60 sm:inset-x-8 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100"
        >
          {label}
        </button>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl leading-tight">
            <Link href={href} className="hover:text-bronze">
              {product.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-muted">{product.medium}</p>
          {meta && <p className="mt-0.5 text-sm text-muted">{meta}</p>}
        </div>
        <p className={`whitespace-nowrap font-serif text-lg ${product.sold ? "text-muted line-through" : ""}`}>
          {cad.format(product.price)}
        </p>
      </div>
    </motion.article>
  );
}
