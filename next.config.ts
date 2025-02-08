import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  distDir: '.next',
  trailingSlash: true,
};

export default nextConfig;
