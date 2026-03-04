import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // STANDALONE OUTPUT: Creates a minimal self-contained build
  // Copies only the necessary files, reducing disk & memory footprint dramatically
  output: "standalone",

  // Disable source maps in production to save memory
  productionBrowserSourceMaps: false,

  // Limit static generation concurrency to prevent process explosion
  experimental: {
    workerThreads: false,
    cpus: 1,
  },

  // Disable image optimization (uses sharp which is memory-heavy)
  // Serve images directly, they're already optimized
  images: {
    unoptimized: true,
  },

  // Compress output
  compress: true,

  // Disable X-Powered-By header
  poweredByHeader: false,

  // Strict React mode for better performance
  reactStrictMode: true,

  // Minimize server-side bundle
  serverExternalPackages: ["@prisma/client", "bcryptjs", "nodemailer"],
};

export default nextConfig;
