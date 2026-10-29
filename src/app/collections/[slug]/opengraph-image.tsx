import { collections, getCollection, productsIn } from "@/content/collections";
import { shop } from "@/content/site";
import { shareImage, shareImageSize } from "@/lib/shareImage";

export const size = shareImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const collection = getCollection(params.slug);
  return [{ id: "share", size, contentType, alt: collection ? `${collection.title} collection by ${shop.artist}` : shop.name }];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const collection = getCollection((await params).slug);
  if (!collection) return shareImage({ image: "/images/site/hero-gallery-wall.jpg", eyebrow: "Ottawa artist", title: shop.artist });
  const count = productsIn(collection.slug).length;
  return shareImage({
    image: collection.image,
    eyebrow: `Collection · ${count} ${count === 1 ? "piece" : "pieces"}`,
    title: collection.title,
    subtitle: collection.blurb,
  });
}
