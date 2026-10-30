import type { Metadata } from "next";
import { Fraunces, Hedvig_Letters_Sans } from "next/font/google";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { CartProvider } from "@/features/cart/CartProvider";
import { MotionPrefs } from "@/components/motion/MotionPrefs";
import { JsonLd } from "@/components/seo/JsonLd";
import { shop } from "@/content/site";
import { siteDescription, siteJsonLd, siteUrl } from "@/lib/seo";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const hedvig = Hedvig_Letters_Sans({
  variable: "--font-hedvig",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Ottawa Artist ${shop.artist} | Handmade Art & Gifts`,
    // Pages set a short title, e.g. "Products", and this adds the shop name.
    template: `%s | ${shop.name}`,
  },
  description: siteDescription,
  applicationName: shop.name,
  authors: [{ name: shop.artist, url: siteUrl }],
  creator: shop.artist,
  publisher: shop.name,
  category: "Art",
  keywords: [
    "Ottawa artist",
    "Ottawa art",
    "original art Ottawa",
    "hand-painted art",
    "folk art",
    "resin art",
    "affordable original art Canada",
    "hand-painted postcards",
    "hand-painted fridge magnets",
    "art gifts Ottawa",
    "handmade gifts Ottawa",
    "handmade Christmas gifts Ottawa",
    "local artist Ottawa",
    "gifts made in Ottawa",
    "handmade gifts Canada",
    shop.artist,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: shop.name,
    locale: "en_CA",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, address: false, email: false },
  // Paste the codes from Google Search Console and Bing Webmaster Tools here once the domain is verified.
  // verification: { google: "...", other: { "msvalidate.01": "..." } },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-CA" className={`${fraunces.variable} ${hedvig.variable} antialiased`}>
      <body>
        <JsonLd data={siteJsonLd()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-cream"
        >
          Skip to content
        </a>
        <MotionPrefs>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </MotionPrefs>
      </body>
    </html>
  );
}
