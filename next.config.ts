import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Reduces memory usage significantly by building self-contained server
  output: "standalone",

  // Hard cap Webpack build concurrency to save CPU
  experimental: {
    workerThreads: false,
    cpus: 1,
  },

  // Disable Sharp native image optimization (massive memory sink)
  images: {
    unoptimized: true,
  },

  poweredByHeader: false,
  compress: true,

  // Strict React mode
  reactStrictMode: true,

  // Externalize heavy packages from server bundle
  serverExternalPackages: ["@prisma/client", "bcryptjs", "nodemailer"],
};

export default nextConfig;
