import type { NextConfig } from "next";

const nextConfig: NextConfig = {

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
};

export default nextConfig;
