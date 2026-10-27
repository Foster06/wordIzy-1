import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Lora, Inter, Bree_Serif, Roboto_Slab } from "next/font/google";
import "./globals.css";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/components/i18n/language-provider";
import { ThemeProvider } from "@/components/site/theme-provider";
import { CookieConsent } from "@/components/site/cookie-consent";
import { WebVitals } from "@/components/site/web-vitals";
import { DictionaryWarmer } from "@/components/site/dictionary-warmer";
import { AnalyticsScripts } from "@/components/site/analytics-scripts";
import { Analytics } from "@vercel/analytics/next";
import { WordVaultProvider } from "@/hooks/use-word-vault";

// Font configuration — next/font/google self-hosts and auto-adds font-display: swap.
// preload is DISABLED for all fonts. Preloading fonts makes them render-blocking
// on the critical path — on slow 4G, 3 preloaded fonts added ~940ms to LCP.
// With display: "swap", text renders immediately using fallback fonts (system-ui),
// then swaps to the web font when it arrives. This cuts the critical path
// from ~940ms (fonts) down to ~261ms (HTML only).
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  fallback: ["system-ui", "Segoe UI", "Roboto", "sans-serif"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "Menlo", "Consolas", "monospace"],
});
const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  preload: false,
  fallback: ["Georgia", "Times New Roman", "serif"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
  fallback: ["system-ui", "Segoe UI", "Roboto", "sans-serif"],
});
const breeSerif = Bree_Serif({
  variable: "--font-bree-serif",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
  fallback: ["Georgia", "serif"],
});
const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  preload: false,
  fallback: ["Roboto", "Georgia", "serif"],
});

// Ahrefs Web Analytics — public site data-key (safe to expose: it ships in the
// HTML like the AdSense client id). Env-overridable, hardcoded fallback keeps
// it working without any .env entry. Used by the inline Ahrefs loader snippet
// below — Ahrefs is privacy-friendly (no cookies, no PII) so it loads
// unconditionally, NOT gated behind cookie consent.
const AHREFS_ANALYTICS_KEY =
  process.env.NEXT_PUBLIC_AHREFS_ANALYTICS_KEY ?? "F87goBifqTaUBs3AbK3EWA";

// AdSense is gated behind cookie consent (uses cookies for ad personalization —
// GDPR/ePrivacy require opt-in). The actual AdSense <script> tag is rendered
// by <AnalyticsScripts /> (a client component) which reads consent state from
// localStorage via `useCookieConsent()` and only mounts the script after the
// user clicks "Accept" in <CookieConsent />. Strictly-necessary scripts
// (trusted-types policy, JSON-LD, Ahrefs, Next.js hydration chunks) remain
// inline in <head> below.
const SITE_URL = "https://wordizy.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "wordIzy",
  url: SITE_URL,
  description:
    "Free word unscrambler, anagram solver, Wordle & Quordle solver with multi-language official Scrabble dictionaries. No sign-up.",
  applicationCategory: "Game",
  applicationSubCategory: "Word Game Helper",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  brand: { "@type": "Brand", name: "wordIzy" },
  featureList: [
    "Word Unscrambler",
    "Anagram Solver",
    "Wordle Solver",
    "Quordle Solver",
    "Scrabble Duplicate Solver",
    "Wordfeud Helper",
    "Random Word Generator",
    "Anagram Blitz Game — 60-Second Word Unscramble Challenge",
    "Multi-language Word Lists",
  ],
  inLanguage: "en", // SSR is English-only; client-side language toggle does not change URL.
  publisher: { "@type": "Organization", name: "wordIzy" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://wordizy.com/?letters={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "wordIzy — Word Unscrambler, Anagram & Wordle Solver",
    template: "%s | wordIzy",
  },
  description:
    "wordIzy is a free word unscrambler, anagram solver, Wordle solver, Scrabble word finder, and word game helper. Unscramble letters, find words for Words with Friends, solve jumble puzzles, browse word lists by length and letter. 9 languages, no sign up.",
  keywords: [
    "word unscrambler",
    "anagram solver",
    "wordle solver",
    "scrabble word finder",
    "words with friends cheat",
    "jumble solver",
    "word finder",
    "letter unscrambler",
    "word cheat",
    "anagram finder",
    "quordle solver",
    "wordfeud helper",
    "word scramble solver",
    "random word generator",
    "word lists",
    "scrabble dictionary",
    "word game helper",
    "unscramble letters into words",
    "word unscrambler free",
    "wordIzy",
  ],
  authors: [{ name: "wordIzy" }],
  manifest: "/manifest.json",
  icons: {
    icon: [
      // WebP icons — 95% smaller than PNG, served to modern browsers
      { url: "/favicon-32.webp", type: "image/webp", sizes: "32x32" },
      { url: "/favicon-16.webp", type: "image/webp", sizes: "16x16" },
      // PNG fallback for older browsers
      { url: "/logo.png", type: "image/png", sizes: "1254x1254" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/apple-touch-icon.webp",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "wordIzy — Word Unscrambler & Solver",
    description:
      "Free word unscrambler, anagram solver, Wordle & Quordle solver with multi-language dictionaries. No sign up.",
    siteName: "wordIzy",
    type: "website",
    url: SITE_URL,
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "wordIzy — Word Unscrambler & Anagram Solver",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "wordIzy — Word Unscrambler & Solver",
    description:
      "Free word unscrambler, anagram solver, Wordle & Quordle solver with multi-language dictionaries. No sign up.",
    images: ["/og-image.png"],
  },
};

// Next.js 16 requires themeColor / colorScheme in a separate viewport export.
export const viewport: Viewport = {
  themeColor: "#f5a623",
  colorScheme: "dark light",
};

// ──────────────────────────────────────────────────────────────
// SERVER-SIDE DICTIONARY PRE-WARM
// Kick off async dictionary load at module-eval time (server boot).
// This shaves ~1s off the first word-related request (unscramble,
// game, word-list) by ensuring the dictionary is already loaded.
// Works in BOTH dev and production — previously dev mode was excluded,
// causing every first request in dev to pay the ~1s load cost.
// Fire-and-forget — does NOT block rendering or other imports.
// ──────────────────────────────────────────────────────────────
if (typeof window === "undefined") {
  void import("@/lib/dictionary").then(({ getDict }) => {
    try {
      getDict("en");
    } catch {
      /* ignore — per-request path will retry */
    }
  }).catch(() => {
    /* ignore — module load failure is non-fatal */
  });
}

// Prefetch hints removed — on mobile/slow connections, prefetching 4 pages
// competes with the main page load for bandwidth, causing LCP to spike.
// The pages are already statically generated and load in <5ms when clicked.

// Trusted Types policy — must run BEFORE any other script. Creates a permissive
// default policy so that third-party libraries (AdSense, Next.js hydration)
// that use DOM sinks (innerHTML, etc.) still work. The CSP enforces
// `require-trusted-types-for 'script'` so without this policy, those libs
// would throw. The policy simply passes strings through unchanged.
const trustedTypesPolicy = (
  <script
    dangerouslySetInnerHTML={{
      __html: `
        try {
          if (window.trustedTypes && !window.trustedTypes._policyCreated) {
            window.trustedTypes.createPolicy('default', {
              createHTML: function(s) { return s; },
              createScript: function(s) { return s; },
              createScriptURL: function(s) { return s; }
            });
            window.trustedTypes._policyCreated = true;
          }
        } catch(e) { /* policy already exists */ }
      `,
    }}
  />
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {trustedTypesPolicy}
        {/* prefetch/preconnect hints intentionally removed for mobile perf */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/*
          Ahrefs Web Analytics loader snippet — runs immediately on every page
          load (not gated behind cookie consent because Ahrefs is privacy-first:
          no cookies, no PII, just pageview counts). Uses the dynamic-create
          pattern recommended by Ahrefs so the loader script is appended to
          <head> and runs async. CSP allowlists analytics.ahrefs.com in both
          script-src (loader) and connect-src (beacon endpoints /api/event
          + /api/error). Trusted-types default policy allows the
          document.createElement('script') sink. Key is env-overridable via
          NEXT_PUBLIC_AHREFS_ANALYTICS_KEY; falls back to the hardcoded project
          key when env is unset.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `var ahrefs_analytics_script = document.createElement('script');
ahrefs_analytics_script.async = true;
ahrefs_analytics_script.src = 'https://analytics.ahrefs.com/analytics.js';
ahrefs_analytics_script.setAttribute('data-key', ${JSON.stringify(AHREFS_ANALYTICS_KEY)});
document.getElementsByTagName('head')[0].appendChild(ahrefs_analytics_script);`,
          }}
        />
        {/*
          AdSense + other consent-gated trackers (e.g. Google Ads pixels) are
          mounted by <AnalyticsScripts /> in the body, gated on cookie consent.
          They are intentionally NOT inlined here so a brand-new visitor has
          zero third-party trackers in their first paint (GDPR "prior consent").
          See src/components/site/analytics-scripts.tsx + use-cookie-consent.ts.
        */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} ${inter.variable} ${breeSerif.variable} ${robotoSlab.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
          <LanguageProvider>
            {/* 🎯 WRAPPED: Activated global data state provider cleanly at the layout root */}
            <WordVaultProvider>
              {children}
              {/* Cookie consent banner — Accept/Decline writes to localStorage,
                  which <AnalyticsScripts /> reads via useCookieConsent() to
                  gate AdSense + Ahrefs scripts. Mounted once at the root so it
                  appears on every route. */}
              <CookieConsent />
              {/* Analytics scripts — gated on consent. Renders the AdSense +
                  Ahrefs <script async src=...> tags via React once
                  useCookieConsent() returns "accepted". */}
              <AnalyticsScripts />
              <WebVitals />
              <DictionaryWarmer />
            </WordVaultProvider>
          </LanguageProvider>
        </ThemeProvider>
        <SonnerToaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  );
}
