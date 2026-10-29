import { images, shop } from "@/content/site";
import { readPhoto, shareImage, shareImageSize } from "@/lib/shareImage";

// The default share picture, used by the home page and any page without its own.
export const alt = `Hand-painted art by Ottawa artist ${shop.artist}`;
export const size = shareImageSize;
export const contentType = "image/png";

// Read once at startup so the image can be built at build time.
const hero = await readPhoto(images.hero);

export default function Image() {
  return shareImage({
    image: hero,
    eyebrow: "Ottawa artist",
    title: shop.artist,
    subtitle: "Original hand-painted art: folk florals, night skies, postcards and magnets. Shipped across Canada.",
  });
}
