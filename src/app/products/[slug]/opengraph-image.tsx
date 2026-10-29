import { getProduct, products } from "@/content/products";
import { shop } from "@/content/site";
import { cad } from "@/lib/format";
import { shareImage, shareImageSize } from "@/lib/shareImage";

export const size = shareImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  return [{ id: "share", size, contentType, alt: product ? `${product.title} by ${shop.artist}` : shop.name }];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  if (!product) return shareImage({ image: "/images/site/hero-gallery-wall.jpg", eyebrow: "Ottawa artist", title: shop.artist });
  return shareImage({
    image: product.image,
    eyebrow: product.original ? "Original · one of a kind" : "Hand-painted",
    title: product.title,
    subtitle: product.medium,
    price: `${cad.format(product.price)} CAD`,
  });
}
