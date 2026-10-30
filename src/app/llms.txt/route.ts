// /llms.txt: a plain-text summary of the shop for AI assistants and AI search (ChatGPT,
// Claude, Perplexity, Gemini…), following the llmstxt.org format. It's built from the same
// content files as the site, so it stays up to date on its own.

import { collections } from "@/content/collections";
import { faqs } from "@/content/faqs";
import { posts } from "@/content/journal";
import { products, type Product } from "@/content/products";
import { lettermail, onlinePayments, shippingOptions, shop } from "@/content/site";
import { withSales } from "@/features/cart/sales";
import { cad } from "@/lib/format";
import { absoluteUrl, siteDescription } from "@/lib/seo";

export async function GET() {
  const all = await withSales(products);

  const productLine = (p: Product) => {
    const size = p.details?.find((d) => d.label === "Size")?.value;
    const status = p.sold ? "sold" : "available";
    const facts = [p.medium, size, `${cad.format(p.price)} CAD`, p.original ? "one of a kind" : undefined, status];
    return `- [${p.title}](${absoluteUrl(`/products/${p.slug}`)}): ${facts.filter(Boolean).join(", ")}`;
  };

  const delivery = shippingOptions.map((o) => `- ${o.label}: ${o.price === 0 ? "free" : `${cad.format(o.price)} CAD`}`);
  const lettermailPrices = lettermail.tiers.map((t) => cad.format(t.price)).join("–");

  const text = `# ${shop.name}

> ${siteDescription}

${shop.artist} is an artist in Ottawa, Ontario, Canada, who paints small original works: traditional folk art florals and roosters on a black ground, and night skies, sunsets, northern lights and landscapes. The framed pieces are hand-painted in acrylic, sealed in glossy epoxy resin and set in natural wood frames, ready to hang. There are also hand-painted oil fridge magnets and watercolour postcards, which make affordable gifts. The shop is online only (no storefront), prices are in Canadian dollars, and every order is packed by hand.

- Website: ${absoluteUrl("/")}
- Location: Ottawa, Ontario, Canada (pickup in Blackburn Hamlet)
- Email: ${shop.email}
- Instagram: ${shop.instagram}
- Commissions: yes, by email
- Payment: ${onlinePayments.paused ? "online card payment is paused for now; pay in person or by Interac e-Transfer (email to arrange)" : "card online at checkout, or in person"}

## Collections

${collections.map((c) => `- [${c.title}](${absoluteUrl(`/collections/${c.slug}`)}): ${c.blurb}`).join("\n")}

## Artwork

${collections
  .map((c) => `### ${c.title}\n\n${all.filter((p) => p.collection === c.slug).map(productLine).join("\n")}`)
  .join("\n\n")}

## Delivery and returns

${delivery.join("\n")}
- Lettermail envelope for postcards and magnets only: ${lettermailPrices} CAD
- Delivery takes 1–7 days. Any piece can be returned within 14 days; the buyer pays return shipping. Commissions are final sale.

## FAQ

${faqs.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}

## Blog

${posts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.description}`).join("\n")}

## Pages

- [All products](${absoluteUrl("/products")}): every piece in the shop
- [Handmade gifts from Ottawa](${absoluteUrl("/gifts")}): gift ideas by price and occasion, from $2 postcards to framed originals
- [Terms of sale](${absoluteUrl("/terms")}): payment, shipping, returns, commissions and copyright
- [Privacy policy](${absoluteUrl("/privacy")})
`;

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
