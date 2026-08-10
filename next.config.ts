import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,

  // TypeScript errors now block builds — keep them clean.
  typescript: {
    ignoreBuildErrors: false,
  },

  experimental: {
    // Tree-shake large icon/UI libraries to cut client bundle.
    optimizePackageImports: ["lucide-react", "date-fns"],
  },

  // Modern image formats for next/image optimization.
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Strip console.* in production builds (keep console.error for debugging).
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },

  // Security + cache headers applied to every route.
  async headers() {
    const cacheHeaders = [
      {
        key: "Cache-Control",
        value: "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    ];
    return [
      // Programmatic word-list pages: HTML is deterministic per (slug, lang).
      // Cache at the CDN for 1 hour, allow serving stale for up to 24h while
      // revalidating. Repeat visits become instant (no server round-trip).
      {
        source: "/words-starts-with-:letter",
        headers: cacheHeaders,
      },
      {
        source: "/words-ends-with-:letter",
        headers: cacheHeaders,
      },
      {
        source: "/wordle-words-starts-with-:letter",
        headers: cacheHeaders,
      },
      {
        source: "/wordle-words-ends-with-:letter",
        headers: cacheHeaders,
      },
      {
        source: "/unscramble-:n-letter-words",
        headers: cacheHeaders,
      },
      {
        source: "/unscramble/:slug",
        headers: cacheHeaders,
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // CSP allows AdSense, Google Fonts, Vercel Analytics, and same-origin.
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: https:",
              "connect-src 'self' https://pagead2.googlesyndication.com",
              "frame-src https://googleads.g.doubleclick.net",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
