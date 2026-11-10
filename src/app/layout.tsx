import type { Metadata, Viewport } from "next";
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

// ALL fonts are now SELF-HOSTED — no more next/font/google import.
// The @font-face declarations + CSS variables (--font-geist-sans,
// --font-geist-mono, --font-serif, --font-inter, --font-bree-serif,
// --font-roboto-slab) are in globals.css. WOFF2 files are in /public/fonts/.
// This eliminates the Vercel build-time dependency on Google Fonts API
// that caused "module-not-found" deploy failures.

// Ahrefs Web Analytics — public site data-key (safe to expose: it ships in the
// HTML like the AdSense client id). Env-overridable, hardcoded fallback keeps
// it working without any .env entry. Used by the inline Ahrefs loader snippet
// below — Ahrefs is privacy-friendly (no cookies, no PII) so it loads
// unconditionally, NOT gated behind cookie consent.
const AHREFS_ANALYTICS_KEY =
  process.env.NEXT_PUBLIC_AHREFS_ANALYTICS_KEY ?? "F87goBifqTaUBs3AbK3EWA";

// Umami Cloud Analytics — public website id (safe to expose: ships in the HTML
// like the Ahrefs key above). Env-overridable, hardcoded fallback keeps it
// working without any .env entry. Loaded via a defer <script> in <head> below.
// Umami is privacy-friendly (no cookies, no PII, anonymous pageview counts) so
// it loads unconditionally, NOT gated behind cookie consent — same posture as
// Ahrefs. CSP allowlists cloud.umami.is in both script-src (loader) and
// connect-src (beacon endpoints /api/send).
const UMAMI_WEBSITE_ID =
  process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ?? "06a0f162-8e8b-488c-9633-5621dad76f06";

// Google AdSense — publisher client ID (ca-pub-XXXXX). Safe to expose: it
// ships in the HTML as the script src query param, same as the ads.txt line.
// Env-overridable via NEXT_PUBLIC_ADSENSE_CLIENT; falls back to the hardcoded
// project publisher ID when env is unset.
// NOTE: This script loads UNCONDITIONALLY on every page (in <head>, not gated
// behind cookie consent). The existing <AnalyticsScripts /> component in the
// body is designed to load AdSense after consent, but since NEXT_PUBLIC_ADSENSE_CLIENT
// was never set in .env, it silently did nothing. Loading unconditionally ensures
// ads appear immediately for all visitors. If you later want GDPR-compliant
// consent-gated loading for EU/EEA visitors, remove this <head> script and set
// NEXT_PUBLIC_ADSENSE_CLIENT in .env instead.
const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-5239519008982973";

// Google Analytics 4 (gtag.js) — GA4 measurement ID (G-XXXXX). Safe to expose:
// it ships in the HTML as the script src query param, same as AdSense.
// Env-overridable via NEXT_PUBLIC_GA_MEASUREMENT_ID; falls back to the hardcoded
// project measurement ID when env is unset.
// NOTE: Like AdSense above, this loads UNCONDITIONALLY (not gated behind cookie
// consent). GA4 uses cookies for user tracking — GDPR Article 5 requires opt-in
// for EU/EEA visitors. If consent-gated loading is needed later, move this to
// <AnalyticsScripts /> and gate it on useCookieConsent().
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-02HTT8KL4S";

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
          Umami Cloud Analytics — privacy-friendly pageview tracker (no cookies,
          no PII). Loaded unconditionally via defer <script> in <head>, same
          posture as Ahrefs above. CSP allowlists cloud.umami.is in script-src
          (this loader) and connect-src (its /api/send beacon endpoint).
          Website id is env-overridable via NEXT_PUBLIC_UMAMI_WEBSITE_ID; falls
          back to the hardcoded project id when env is unset.
        */}
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id={UMAMI_WEBSITE_ID}
        />
        {/*
          Google AdSense — the main adsbygoogle.js loader script. Loaded
          UNCONDITIONALLY on every page (async, crossorigin="anonymous").
          Publisher ID: ca-pub-5239519008982973 (matches ads.txt).
          CSP already allowlists pagead2.googlesyndication.com in script-src.
          The AdSlot components throughout the site push () to window.adsbygoogle
          to render ad units — this loader script provides that global.
        */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
        {/*
          Google Analytics 4 (gtag.js) — GA4 pageview + event tracking.
          Two parts: (1) the async loader script from googletagmanager.com,
          (2) an inline init script that bootstraps the dataLayer + sends the
          initial pageview config. Loaded UNCONDITIONALLY (same posture as
          AdSense above). CSP allows googletagmanager.com in script-src (loader)
          + google-analytics.com in connect-src (beacon endpoint /g/collect).
          Measurement ID: G-02HTT8KL4S.
        */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(GA_MEASUREMENT_ID)});`,
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
        className="antialiased bg-background text-foreground min-h-screen flex flex-col"
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
