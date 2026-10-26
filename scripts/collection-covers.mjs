// Builds the "Shop by collection" cover images from the product photos.
// Run with: node scripts/collection-covers.mjs
// Each cover: a blurred backdrop in the collection's colours, the lead piece in the
// middle, and two more pieces tilted on either side. Swap the photos below to change a cover.

import sharp from "sharp";

const covers = {
  "folk-florals": ["folk-rooster/main", "folk-flowers/main", "midnight-blue-blossom/main"],
  "nature-and-sky": ["northern-lights-reflection/main", "twilight-tree/main", "cherry-blossom-serenity/main"],
  "little-gifts": ["together-panda-postcard/together", "peaceful-waterfall-magnet/main", "christmas-gnome-postcard/love-letter"],
};

// Where the artwork sits in each photo: centre x, centre y (0–1), and how much of the
// photo's width to keep. Lets the cover zoom in on the painting instead of the room around it.
const focus = {
  "folk-rooster/main": [0.51, 0.42, 0.72],
  "folk-flowers/main": [0.52, 0.41, 0.72],
  "midnight-blue-blossom/main": [0.52, 0.4, 0.72],
  "northern-lights-reflection/main": [0.52, 0.41, 0.75],
  "twilight-tree/main": [0.52, 0.41, 0.75],
  "cherry-blossom-serenity/main": [0.52, 0.41, 0.75],
  "together-panda-postcard/together": [0.48, 0.5, 0.92],
  "peaceful-waterfall-magnet/main": [0.58, 0.47, 0.7],
  "christmas-gnome-postcard/love-letter": [0.48, 0.52, 0.88],
};

/** The photo cropped (3:4) around its artwork. */
async function cropped(name) {
  const img = sharp(src(name));
  const { width: iw, height: ih } = await img.metadata();
  const [fx, fy, fw] = focus[name] ?? [0.5, 0.5, 1];
  const w = Math.min(iw, Math.round(iw * fw));
  const h = Math.min(ih, Math.round((w * 4) / 3));
  const clamp = (v, max) => Math.max(0, Math.min(max, Math.round(v)));
  return img.extract({ left: clamp(iw * fx - w / 2, iw - w), top: clamp(ih * fy - h / 2, ih - h), width: w, height: h }).toBuffer();
}

const W = 1200;
const H = 1600;
const BORDER = 18; // cream border around each photo, like a print
const CREAM = { r: 250, g: 246, b: 238, alpha: 1 };
const src = (name) => `public/images/products/${name}.jpg`;

/** A photo with a cream border, a soft drop shadow, and an optional tilt. */
async function print(name, width, angle) {
  const height = Math.round((width * 4) / 3);
  const photo = await sharp(await cropped(name)).resize(width, height, { fit: "cover" }).toBuffer();
  const framed = await sharp(photo)
    .extend({ top: BORDER, bottom: BORDER, left: BORDER, right: BORDER, background: CREAM })
    .png()
    .toBuffer();

  const fw = width + BORDER * 2;
  const fh = height + BORDER * 2;
  const pad = 70;
  const shadow = await sharp({
    create: { width: fw + pad * 2, height: fh + pad * 2, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      {
        input: await sharp({ create: { width: fw, height: fh, channels: 4, background: { r: 20, g: 14, b: 8, alpha: 0.45 } } })
          .png()
          .toBuffer(),
        left: pad + 10,
        top: pad + 24,
      },
    ])
    .png()
    .toBuffer();

  const withShadow = await sharp(await sharp(shadow).blur(26).png().toBuffer())
    .composite([{ input: framed, left: pad, top: pad }])
    .png()
    .toBuffer();

  const out = await sharp(withShadow)
    .rotate(angle, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const { width: ow, height: oh } = await sharp(out).metadata();
  return { input: out, w: ow, h: oh };
}

for (const [slug, [lead, left, right]] of Object.entries(covers)) {
  const backdrop = await sharp(src(lead))
    .resize(W, H, { fit: "cover" })
    .blur(60)
    .modulate({ brightness: 0.8, saturation: 1.15 })
    .toBuffer();

  const l = await print(left, 380, -9);
  const r = await print(right, 380, 8);
  const m = await print(lead, 560, 0);

  // Side pieces sit a little lower than the lead; the bottom stays calm for the card's text.
  const place = (p, cx, cy) => ({ input: p.input, left: Math.round(cx - p.w / 2), top: Math.round(cy - p.h / 2) });

  await sharp(backdrop)
    .composite([place(l, 275, 820), place(r, W - 275, 840), place(m, W / 2, 700)])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(`public/images/collections/${slug}.jpg`);

  console.log(`public/images/collections/${slug}.jpg`);
}
