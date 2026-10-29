// The 1200×630 picture shown when a link is shared on Facebook, X, iMessage, WhatsApp, etc.
// The artwork photo sits on the left, uncropped, with the name and details on the right.
// Used by the opengraph-image files in app/. Built once at build time.

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteUrl } from "@/lib/seo";

export const shareImageSize = { width: 1200, height: 630 };

const colors = { cream: "#fdf9f3", ink: "#181a2c", bronze: "#8a6236", muted: "#64667b", sand: "#efe6d8" };

/** Reads a photo from /public as a data URL the image renderer can draw. Safe at module scope. */
export async function readPhoto(src: string) {
  const data = await readFile(join(process.cwd(), "public", src), "base64");
  return `data:image/jpeg;base64,${data}`;
}

/** The same, cached, for images built per product or collection. */
async function photo(src: string) {
  "use cache";
  return readPhoto(src);
}

export async function shareImage({
  image,
  eyebrow,
  title,
  subtitle,
  price,
}: {
  /** Path under /public, e.g. "/images/products/folk-rooster/main.jpg", or a data URL from `readPhoto`. */
  image: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  price?: string;
}) {
  const src = image.startsWith("data:") ? image : await photo(image);
  const domain = new URL(siteUrl).host;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: colors.cream, color: colors.ink }}>
        <div style={{ display: "flex", width: 500, height: "100%", background: colors.sand }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered to a PNG, not a web page */}
          <img src={src} alt="" width={500} height={630} style={{ objectFit: "cover", width: 500, height: 630 }} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "64px 64px 56px",
          }}
        >
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 5, textTransform: "uppercase", color: colors.bronze }}>
            {eyebrow}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: title.length > 22 ? 60 : 72, lineHeight: 1.05, letterSpacing: -1.5 }}>
              {title}
            </div>
            {subtitle && (
              <div style={{ display: "flex", marginTop: 24, fontSize: 28, lineHeight: 1.35, color: colors.muted }}>
                {subtitle}
              </div>
            )}
            {price && <div style={{ display: "flex", marginTop: 28, fontSize: 44 }}>{price}</div>}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: `2px solid ${colors.ink}22`,
              paddingTop: 24,
              fontSize: 24,
              color: colors.muted,
            }}
          >
            <span>Yana Krukovets · Ottawa artist</span>
            <span style={{ color: colors.ink }}>{domain}</span>
          </div>
        </div>
      </div>
    ),
    shareImageSize,
  );
}
