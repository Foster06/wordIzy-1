// src/components/site/site-html.tsx
// Shared root-layout shell rendered by BOTH root layouts:
//   - src/app/(main)/layout.tsx        → <SiteHtml lang="en">
//   - src/app/i18n/[lang]/layout.tsx   → <SiteHtml lang={params.lang}>
//
// Centralizing the <html>/<head>/<body> markup here keeps the analytics
// loaders, JSON-LD, providers and font preconnects in ONE place. The only
// per-locale value that changes is the <html lang="…"> attribute (and the
// WebApplication JSON-LD inLanguage field) — every other head/body element
// is identical regardless of language, which is exactly what we want: the
// page-level generateMetadata (title/description/hreflang/OG locale) is what
// differentiates locales; the document shell is shared.
//
// This is a Server Component (no "use client") so the <html lang> attribute
// is present in the initial SSR HTML that search engines crawl.

import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/components/i18n/language-provider";
import { ThemeProvider } from "@/components/site/theme-provider";
import { CookieConsent } from "@/components/site/cookie-consent";
import { WebVitals } from "@/components/site/web-vitals";
import { DictionaryWarmer } from "@/components/site/dictionary-warmer";
import { AnalyticsScripts } from "@/components/site/analytics-scripts";
import { Analytics } from "@vercel/analytics/next";
import { WordVaultProvider } from "@/hooks/use-word-vault";

// Ahrefs Web Analytics — public site data-key (safe to expose: it ships in the
// HTML like the AdSense client id). Env-overridable, hardcoded fallback keeps
// it working without any .env entry.
const AHREFS_ANALYTICS_KEY =
  process.env.NEXT_PUBLIC_AHREFS_ANALYTICS_KEY ?? "F87goBifqTaUBs3AbK3EWA";

// Umami Cloud Analytics — public website id (safe to expose, same rationale).
const UMAMI_WEBSITE_ID =
  process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ?? "06a0f162-8e8b-488c-9633-5621dad76f06";

// Google AdSense — publisher client ID. Safe to expose (ships in HTML).
const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-5239519008982973";

// Google Analytics 4 measurement ID. Safe to expose (ships in HTML).
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-02HTT8KL4S";

const SITE_URL = "https://wordizy.com";

// ──────────────────────────────────────────────────────────────
// SERVER-SIDE DICTIONARY PRE-WARM
// Kick off async dictionary load at module-eval time (server boot).
// Fire-and-forget — does NOT block rendering or other imports.
// Lives in this shared module so it runs exactly once regardless of which
// root layout mounts first.
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

// Trusted Types policy — must run BEFORE any other script. Creates a permissive
// default policy so third-party libraries (AdSense, Next.js hydration) that use
// DOM sinks (innerHTML, etc.) still work under require-trusted-types-for 'script'.
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

interface SiteHtmlProps {
  lang: string;
  children: React.ReactNode;
}

/**
 * Render the full <html> document shell for the site. Called by both root
 * layouts (English canonical + localized). `lang` drives <html lang="…"> and
 * the WebApplication JSON-LD inLanguage field; everything else is identical.
 */
export default function SiteHtml({ lang, children }: SiteHtmlProps) {
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
    inLanguage: lang,
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

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {trustedTypesPolicy}
        {/*
          Preconnect hints for the four third-party origins the page fetches
          from during initial load. Capped at 4 per Lighthouse guidance.
          (Font <link rel="preload"> was removed — React 19 resource hoisting
          duplicated it and broke hydration site-wide; see Task 47 notes.)
        */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://analytics.ahrefs.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cloud.umami.is" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/*
          Ahrefs Web Analytics loader — privacy-first (no cookies, no PII),
          loaded unconditionally. CSP allowlists analytics.ahrefs.com.
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
          Umami Cloud Analytics — privacy-friendly pageview tracker. Loaded
          unconditionally via defer <script>. CSP allowlists cloud.umami.is.
        */}
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id={UMAMI_WEBSITE_ID}
        />
        {/*
          Google AdSense loader — loaded UNCONDITIONALLY (async). Publisher ID
          matches ads.txt. CSP allowlists pagead2.googlesyndication.com.
        */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
        {/*
          Google Analytics 4 (gtag.js) — loader + inline init. Loaded
          UNCONDITIONALLY. CSP allows googletagmanager.com + google-analytics.com.
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
      </head>
      <body
        className="antialiased bg-background text-foreground min-h-screen flex flex-col"
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
          <LanguageProvider>
            <WordVaultProvider>
              {children}
              <CookieConsent />
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
