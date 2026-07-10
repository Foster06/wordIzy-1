import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Keeps your fast Bun runner fully optimized
  
  // Forces Vercel to route /ads.txt requests instantly to the public crawler file
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
