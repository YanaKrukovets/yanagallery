import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Puts the small Tailwind stylesheet straight into the HTML so it does not block the first paint.
    inlineCss: true,
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
