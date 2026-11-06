// Builds the cover for the "online Christmas market is open" blog post from the product photos.
// Run with: node scripts/blog-cover-market.mjs
// Makes the 1200 × 900 post picture and the 1200 × 630 share crop: a blurred warm backdrop with
// the three new cards laid out like prints on a market table.

import sharp from "sharp";

const src = (name) => `public/images/products/${name}.jpg`;

// [photo, centre x, centre y (0–1), share of the photo's width to keep]
const left = ["joyful-christmas-tree-card/main", 0.495, 0.5, 0.8];
const lead = ["pink-christmas-ornament-card/script-joy", 0.51, 0.5, 0.78];
const right = ["gingerbread-man-christmas-card/red-scarf", 0.49, 0.53, 0.76];

const BORDER = 14;
const CREAM = { r: 250, g: 246, b: 238, alpha: 1 };

/** The photo cropped (3:4) around the card. */
async function cropped([name, fx, fy, fw]) {
  const img = sharp(src(name));
  const { width: iw, height: ih } = await img.metadata();
  const w = Math.min(iw, Math.round(iw * fw));
  const h = Math.min(ih, Math.round((w * 4) / 3));
  const clamp = (v, max) => Math.max(0, Math.min(max, Math.round(v)));
  return img
    .extract({ left: clamp(iw * fx - w / 2, iw - w), top: clamp(ih * fy - h / 2, ih - h), width: w, height: h })
    .toBuffer();
}

/** A photo with a cream border, a soft drop shadow and a tilt. */
async function print(photo, width, angle) {
  const height = Math.round((width * 4) / 3);
  const framed = await sharp(await sharp(await cropped(photo)).resize(width, height).toBuffer())
    .extend({ top: BORDER, bottom: BORDER, left: BORDER, right: BORDER, background: CREAM })
    .png()
    .toBuffer();
  const fw = width + BORDER * 2;
  const fh = height + BORDER * 2;
  const pad = 60;
  const shadowBox = await sharp({ create: { width: fw, height: fh, channels: 4, background: { r: 20, g: 14, b: 8, alpha: 0.5 } } })
    .png()
    .toBuffer();
  const shadow = await sharp({
    create: { width: fw + pad * 2, height: fh + pad * 2, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: shadowBox, left: pad + 8, top: pad + 20 }])
    .png()
    .toBuffer();
  const out = await sharp(await sharp(await sharp(shadow).blur(22).png().toBuffer())
    .composite([{ input: framed, left: pad, top: pad }])
    .png()
    .toBuffer())
    .rotate(angle, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const { width: w, height: h } = await sharp(out).metadata();
  return { input: out, w, h };
}

async function cover(W, H, sideWidth, leadWidth, file) {
  const backdrop = await sharp(src(lead[0]))
    .resize(W, H, { fit: "cover" })
    .blur(50)
    .modulate({ brightness: 0.75, saturation: 1.1 })
    .toBuffer();
  const l = await print(left, sideWidth, -8);
  const r = await print(right, sideWidth, 7);
  const m = await print(lead, leadWidth, 0);
  const place = (p, cx, cy) => ({ input: p.input, left: Math.round(cx - p.w / 2), top: Math.round(cy - p.h / 2) });
  await sharp(backdrop)
    .composite([place(l, W * 0.24, H * 0.53), place(r, W * 0.76, H * 0.53), place(m, W / 2, H * 0.5)])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(file);
  console.log(file);
}

await cover(1200, 900, 300, 380, "public/images/blog/online-christmas-market-open.jpg");
await cover(1200, 630, 230, 290, "public/images/blog/online-christmas-market-open-share.jpg");
