import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // STANDALONE OUTPUT: Creates a minimal self-contained build
  output: "standalone",

  // Disable source maps in production
  productionBrowserSourceMaps: false,

  // Limit build workers to 1
  experimental: {
    workerThreads: false,
    cpus: 1,
  },

  // Disable image optimization (sharp is memory-heavy)
  images: {
    unoptimized: true,
  },

  // Compress output
  compress: true,

  // Disable X-Powered-By header
  poweredByHeader: false,

  // Strict React mode
  reactStrictMode: true,

  // Externalize heavy packages from server bundle
  serverExternalPackages: ["@prisma/client", "bcryptjs", "nodemailer"],

  // ─── AGGRESSIVE CACHING HEADERS ───
  headers: async () => [
    {
      // Cache all static assets for 1 year
      source: "/:path*.(js|css|png|jpg|jpeg|webp|svg|ico|woff|woff2)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
    {
      // Cache Next.js static chunks for 1 year
      source: "/_next/static/:path*",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
    {
      // Cache public pages for 1 hour at CDN, serve stale for 24 hours
      source: "/:path*",
      headers: [
        { key: "Cache-Control", value: "public, s-maxage=3600, stale-while-revalidate=86400" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    },
  ],
};

export default nextConfig;
