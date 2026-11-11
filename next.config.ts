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

  // Legacy programmatic word-list URLs → canonical 301 redirects.
  // GSC data (Oct–Nov 2026) showed the legacy variants still indexed and
  // ranking separately from the canonical /words-*-with-* URLs (e.g.
  // /words-starts-by-n alone got 112 impressions at position ~71), splitting
  // ranking signals across near-duplicate pages. Canonical tags alone did not
  // consolidate them, so hard redirects now fold every legacy pattern into
  // its canonical URL.
  // NOTE the custom param regexes: :letter([a-z]) and :n(\d{1,2}) — without
  // them "/:n-letter-words" would also match the canonical
  // "/unscramble-5-letter-words" (n = "unscramble-5") and redirect it into a
  // 404 loop. The regex keeps every pattern strictly scoped.
  async redirects() {
    return [
      // Top-level legacy slug variants
      { source: "/words-starts-by-:letter([a-z])", destination: "/words-starts-with-:letter", permanent: true },
      { source: "/words-ends-by-:letter([a-z])", destination: "/words-ends-with-:letter", permanent: true },
      { source: "/words-starting-with-:letter([a-z])", destination: "/words-starts-with-:letter", permanent: true },
      { source: "/words-ending-with-:letter([a-z])", destination: "/words-ends-with-:letter", permanent: true },
      { source: "/:n(\\d{1,2})-letter-words", destination: "/unscramble-:n-letter-words", permanent: true },
      // Legacy two-segment /unscramble/<slug> paths
      { source: "/unscramble/words-starts-by-:letter([a-z])", destination: "/words-starts-with-:letter", permanent: true },
      { source: "/unscramble/words-starting-with-:letter([a-z])", destination: "/words-starts-with-:letter", permanent: true },
      { source: "/unscramble/words-starts-with-:letter([a-z])", destination: "/words-starts-with-:letter", permanent: true },
      { source: "/unscramble/words-ends-by-:letter([a-z])", destination: "/words-ends-with-:letter", permanent: true },
      { source: "/unscramble/words-ending-with-:letter([a-z])", destination: "/words-ends-with-:letter", permanent: true },
      { source: "/unscramble/words-ends-with-:letter([a-z])", destination: "/words-ends-with-:letter", permanent: true },
      { source: "/unscramble/wordle-words-starts-with-:letter([a-z])", destination: "/wordle-words-starts-with-:letter", permanent: true },
      { source: "/unscramble/wordle-words-ends-with-:letter([a-z])", destination: "/wordle-words-ends-with-:letter", permanent: true },
      { source: "/unscramble/unscramble-:n(\\d{1,2})-letter-words", destination: "/unscramble-:n-letter-words", permanent: true },
      { source: "/unscramble/:n(\\d{1,2})-letter-words", destination: "/unscramble-:n-letter-words", permanent: true },
      // Misc aliases: bare /unscramble rendered the homepage with NO canonical
      // (duplicate-content), and /game rendered the homepage while carrying
      // the blitz VideoGame JSON-LD. Point both at their real targets.
      { source: "/unscramble", destination: "/", permanent: true },
      { source: "/game", destination: "/blitz", permanent: true },
    ];
  },

  // Security + cache headers applied to every route.
  async headers() {
    // HTML cache policy — shared by the word-list and scrabble-words routes
    // below. NEVER add stale-while-revalidate to HTML: every deployment
    // renames the content-hashed /_next/static chunks, so any cache allowed
    // to serve stale HTML after a deploy hands out pages whose <script src>
    // chunks 404 (the 2026-11-11 site audit flagged 1,682 pages as "broken
    // JavaScript" for exactly this reason). A short s-maxage keeps most page
    // views as CDN edge hits while capping the cross-deployment staleness
    // window at 10 minutes; browsers see no max-age and revalidate HTML on
    // every visit.
    const cacheHeaders = [
      {
        key: "Cache-Control",
        value: "public, s-maxage=600",
      },
    ];
    return [
      // Programmatic word-list pages: HTML is deterministic per (slug, lang).
      // Edge-cached for 10 minutes (see the cacheHeaders note above for why
      // there is no stale-while-revalidate on HTML).
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
        // Per-word Scrabble validity pages (/scrabble-words/[word]). The valid
        // ones are prerendered (static HTML), the long tail is ISR'd daily.
        // Edge-cached for 10 minutes (see the cacheHeaders note above).
        source: "/scrabble-words/:word",
        headers: cacheHeaders,
      },
      {
        source: "/scrabble-words",
        headers: cacheHeaders,
      },
      {
        // Localized scrabble-words editions (/{lang}/scrabble-words[/word] —
        // de/fr/es/it/nl/pt). Same HTML cache policy as the English section.
        // The :lang token matches any first segment, which is harmless: only
        // the six dictionary languages have those routes.
        source: "/:lang/scrabble-words/:word",
        headers: cacheHeaders,
      },
      {
        source: "/:lang/scrabble-words",
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
              `script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://va.vercel-scripts.com https://fundingchoicesmessages.google.com https://analytics.ahrefs.com https://cloud.umami.is${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
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
              // cloud.umami.is — Umami Cloud Analytics: the script.js loader
              // AND its beacon endpoints (/api/send + /api/event) are all on
              // this single origin. Privacy-friendly (no cookies, no PII).
              // www.google-analytics.com — Google Analytics 4 (gtag.js) sends
              // pageview + event beacons to /g/collect on this domain.
              "connect-src 'self' https://pagead2.googlesyndication.com https://fundingchoicesmessages.google.com https://analytics.ahrefs.com https://cloud.umami.is https://www.google-analytics.com",
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
