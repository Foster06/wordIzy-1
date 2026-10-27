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

  // Modern image formats for next/image optimization. remotePatterns is
  // intentionally permissive so any future remote <Image> usage doesn't need
  // a redeploy to add a new hostname.
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Allow https remote images of any hostname (CSP img-src still gates
      // the actual fetch at the browser level).
      { protocol: "https", hostname: "**" },
    ],
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
          // COOP — isolates the browsing context group to prevent cross-origin
          // window references (spectre-class attacks). Lighthouse requires this.
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          // COEP — required for SharedArrayBuffer; also blocks cross-origin
          // resources without CORP headers (mitigates speculative execution leaks).
          { key: "Cross-Origin-Embedder-Policy", value: "credentialless" },
          // CORP — explicitly opts this document out of being embedded cross-origin.
          { key: "Cross-Origin-Resource-Policy", value: "same-site" },
          // X-DNS-Prefetch-Control — disable aggressive prefetching for privacy.
          { key: "X-DNS-Prefetch-Control", value: "off" },
          // CSP with a nonce-based approach for stricter XSS protection.
          // Note: 'unsafe-inline' is kept for script-src because Next.js uses
          // inline scripts for hydration/manifests. Trusted Types policy is
          // added via 'require-trusted-types-for' so any DOM sink usage must
          // go through a policy, preventing DOM-based XSS.
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // AdSense needs multiple domains: the main script, the funding
              // choices messages domain, doubleclick for ad frames, AND
              // tpc.googlesyndication.com (image / video ad creatives).
              // analytics.ahrefs.com — Ahrefs Web Analytics: the loader script
              // AND its beacon endpoints (/api/event, /api/error) are all on
              // this single origin.
              // 'unsafe-eval' is DEV-ONLY: next dev serves modules through
              // eval-based source maps (devtool: 'eval-source-map'). Production
              // bundles contain no eval, so it is never added there.
              `script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://va.vercel-scripts.com https://fundingchoicesmessages.google.com https://analytics.ahrefs.com${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
              // style-src — 'unsafe-inline' is required by Next.js (inline
              // hydration styles) + Tailwind. We self-host all fonts via
              // next/font/google so no googleapis.com allowlist is needed.
              "style-src 'self' 'unsafe-inline'",
              // font-src — next/font/google self-hosts WOFF2 in /_next/static.
              // 'data:' covers inline SVG fonts / fallbacks.
              "font-src 'self' data:",
              "img-src 'self' data: https:",
              // Ahrefs Web Analytics sends events via sendBeacon/XMLHttpRequest
              // POST to https://analytics.ahrefs.com/api/event (+ /api/error).
              "connect-src 'self' https://pagead2.googlesyndication.com https://fundingchoicesmessages.google.com https://analytics.ahrefs.com",
              // frame-src — AdSense serves creatives from doubleclick AND
              // tpc.googlesyndication.com (image/video ad iframes). Without
              // tpc here, real ad impressions trigger CSP frame-src violations.
              "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
              // Trusted Types — allow the 'default' policy (created in layout.tsx),
              // the 'goog#html' policy that AdSense creates internally, AND
              // 'nextjs#bundler' which Next.js's webpack runtime REQUIRES for
              // client chunk loading (output.trustedTypes = 'nextjs#bundler' is
              // set for all client builds). Without it, policy creation throws
              // and client-side hydration completely breaks.
              "trusted-types default goog#html nextjs#bundler",
              "require-trusted-types-for 'script'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
