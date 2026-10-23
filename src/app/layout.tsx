import type { Metadata } from "next";
import { Fraunces, Hedvig_Letters_Sans } from "next/font/google";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { CartProvider } from "@/features/cart/CartProvider";
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
  title: "Yana Krukovets Gallery | Original Art by an Ottawa Artist",
  description:
    "Shop original paintings and signed prints by Ottawa artist Yana Krukovets. Online only, delivered across Canada.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-CA" className={`${fraunces.variable} ${hedvig.variable} antialiased`}>
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
