"use client";

import Image from "next/image";
import { useState, type MouseEvent } from "react";

/** How far the photo zooms in when you hover (mouse) or tap (touch). */
const ZOOM = 2.2;

/** Large photo with thumbnails. Hover with a mouse, or tap, to zoom into the brushwork. */
export function ProductGallery({ photos, title }: { photos: string[]; title: string }) {
  const [shown, setShown] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  const aim = (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const select = (i: number) => {
    setShown(i);
    setZoomed(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        aria-label={zoomed ? "Zoom out" : "Zoom in"}
        className={`relative block aspect-[4/5] w-full overflow-hidden bg-sand/60 ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
        onClick={(e) => {
          aim(e);
          setZoomed((z) => !z);
        }}
        onPointerMove={(e) => zoomed && aim(e)}
        onPointerEnter={(e) => e.pointerType === "mouse" && (aim(e), setZoomed(true))}
        onPointerLeave={(e) => e.pointerType === "mouse" && setZoomed(false)}
      >
        {photos.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === 0 ? title : `${title}, close-up`}
            fill
            priority={i === 0}
            sizes="(min-width: 768px) 416px, 320px"
            style={{ transformOrigin: origin, transform: zoomed && i === shown ? `scale(${ZOOM})` : undefined }}
            className={`object-cover transition-[opacity,transform] duration-500 ease-out ${
              i === shown ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-cream/85 px-3 py-1 text-[10px] uppercase tracking-[0.2em] [@media(hover:hover)]:hidden">
          {zoomed ? "Tap to zoom out" : "Tap to zoom"}
        </span>
      </button>

      {photos.length > 1 && (
        <div className="flex gap-3">
          {photos.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => select(i)}
              aria-label={`Show photo ${i + 1} of ${photos.length}`}
              aria-pressed={i === shown}
              className={`relative aspect-square w-16 overflow-hidden bg-sand/60 transition-opacity md:w-20 ${
                i === shown ? "ring-1 ring-ink ring-offset-2 ring-offset-cream" : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
