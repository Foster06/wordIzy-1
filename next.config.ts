import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  
  // Forces the compiler to ignore type errors in external/example folders
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  async rewrites() {
    return [
      {
        source: "/ads.txt",
        destination: "/ads.txt",
      },
    ];
  },
};

export default nextConfig;