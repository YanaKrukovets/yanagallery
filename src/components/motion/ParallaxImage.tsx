"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  /** Max distance (px) the image drifts in each direction. Keep under 80 (the overscan). */
  strength?: number;
  preload?: boolean;
};

/** Image that drifts slower than the page as you scroll, inside a clipped frame. */
export function ParallaxImage({ src, alt, className, sizes = "100vw", strength = 60, preload = false }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div style={{ y }} className="absolute inset-[-80px]">
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className="object-cover" />
      </motion.div>
    </div>
  );
}
