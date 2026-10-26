import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      // There's no collections index page; send visitors to the "Shop by collection" section.
      // Temporary (307) so browsers don't cache it, in case a real /collections page is added later.
      { source: "/collections", destination: "/#collections", permanent: false },
    ];
  },
  images: {
    // Placeholder photography from Unsplash. Swap for /public images once you have real artwork shots.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/**" }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
