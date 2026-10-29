"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { photosOf, type Product } from "@/content/products";
import { onlinePayments, shop } from "@/content/site";
import { mailtoHref } from "@/lib/format";
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
          {onlinePayments.paused && (
            <p className="mt-4 rounded-2xl border border-bronze/40 bg-sand/40 px-4 py-3 text-sm text-ink">
              {onlinePayments.notice}{" "}
              <a
                href={mailtoHref(shop.email, {
                  subject: `I'd like to pick up ${product.title}`,
                  body: `Hi Yana,\n\nI'd like to buy "${design ? `${product.title} (${design.name})` : product.title}" and pick it up. When would be a good time to meet? I'll pay in person.\n\nThanks,\n`,
                })}
                className="break-words underline decoration-gold underline-offset-4 hover:text-bronze"
              >
                Email {shop.email}
              </a>
            </p>
          )}
          {afterButton}
        </div>

        {children}
      </div>
    </div>
  );
}
