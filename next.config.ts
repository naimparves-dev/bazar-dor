import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // সোশ্যাল লগইন ইমেজ ডোমেইনগুলো এখানে যুক্ত করতে হবে
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ichef.bbci.co.uk",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;

