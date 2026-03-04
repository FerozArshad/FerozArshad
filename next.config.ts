import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable image optimization (use external CDN or unoptimized for speed)
  images: {
    unoptimized: true,
  },

  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,

  // Externalize heavy packages from server bundle to prevent cold start bloat
  serverExternalPackages: ["@prisma/client", "bcryptjs", "nodemailer"],
};

export default nextConfig;
