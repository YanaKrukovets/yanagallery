"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { photosOf, type Product } from "@/content/products";
import { AddToBagButton } from "./AddToBagButton";
import { ProductGallery } from "./ProductGallery";

/**
 * The top of a product page: photos on the left, details and "Add to bag" on the right.
 * Products with several designs also get a design picker, and the photos follow the choice.
 */
export function ProductBuy({
  product,
  alt,
  intro,
  afterButton,
  children,
}: {
  product: Product;
  alt: string;
  /** Shown above the design picker: title, price… */
  intro: ReactNode;
  /** Shown right under the button. */
  afterButton?: ReactNode;
  /** Shown below everything: description, details… */
  children?: ReactNode;
}) {
  const designs = product.designs;
  const [designId, setDesignId] = useState(designs?.[0]?.id);
  const design = designs?.find((d) => d.id === designId);
  const photos = design ? [design.image, ...(product.gallery ?? [])] : photosOf(product);

  return (
    <div className="mt-8 flex flex-col gap-10 md:flex-row md:items-start md:gap-14">
      <div className="mx-auto w-full max-w-[min(20rem,50vh)] md:mx-0 md:w-[min(26rem,60vh)] md:max-w-none md:shrink-0">
        {/* Keyed by design so a new choice starts on its front photo. */}
        <ProductGallery key={design?.id} photos={photos} title={design ? `${alt}, ${design.name} design` : alt} />
      </div>

      <div className="md:max-w-xl md:flex-1 md:pt-4">
        {intro}

        {designs && design && (
          <fieldset className="mt-8">
            <legend className="text-xs uppercase tracking-[0.2em] text-muted">
              Design: <span className="text-ink">{design.name}</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {designs.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDesignId(d.id)}
                  aria-label={d.name}
                  aria-pressed={d.id === design.id}
                  title={d.name}
                  className={`relative aspect-[3/4] w-16 overflow-hidden bg-sand/60 transition-opacity md:w-[4.5rem] ${
                    d.id === design.id
                      ? "ring-1 ring-ink ring-offset-2 ring-offset-cream"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={d.image} alt="" fill sizes="72px" className="object-cover" />
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <div className="mt-8">
          <AddToBagButton product={product} design={design?.id} />
          {afterButton}
        </div>

        {children}
      </div>
    </div>
  );
}
