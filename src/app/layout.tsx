import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Lora, Inter, Bree_Serif, Roboto_Slab } from "next/font/google";
import "./globals.css";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/components/i18n/language-provider";
import { ThemeProvider } from "@/components/site/theme-provider";
import { CookieConsent } from "@/components/site/cookie-consent";
import { WebVitals } from "@/components/site/web-vitals";
import { DictionaryWarmer } from "@/components/site/dictionary-warmer";
import { Analytics } from "@vercel/analytics/next";
import { WordVaultProvider } from "@/hooks/use-word-vault";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const lora = Lora({ variable: "--font-serif", subsets: ["latin"], weight: ["600", "700"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const breeSerif = Bree_Serif({ variable: "--font-bree-serif", subsets: ["latin"], weight: ["400"] });
const robotoSlab = Roboto_Slab({ variable: "--font-roboto-slab", subsets: ["latin"], weight: ["600", "700", "800"] });

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const showAdsense =
  typeof adsenseClient === "string" &&
  adsenseClient.length > 0 &&
  !adsenseClient.includes("XXXXXXXX");

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
      { url: "/logo.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/logo.png",
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
// This shaves ~900ms off the first word-list request by ensuring the
// dictionary is already loaded by the time the first /words-starts-with-*
// request arrives. Fire-and-forget — does NOT block rendering or other
// imports. The Promise resolves in the background; if it fails, the
// per-request path will retry synchronously.
// ──────────────────────────────────────────────────────────────
if (typeof window === "undefined" && process.env.NODE_ENV === "production") {
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

// Preconnect hints for third-party origins — saves DNS + TLS round-trips
// when AdSense / Google Fonts / Vercel Analytics load.
const preconnectTags = (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link rel="preconnect" href="https://va.vercel-scripts.com" />
    <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
  </>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {preconnectTags}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {showAdsense && adsenseClient && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} ${inter.variable} ${breeSerif.variable} ${robotoSlab.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
          <LanguageProvider>
            {/* 🎯 WRAPPED: Activated global data state provider cleanly at the layout root */}
            <WordVaultProvider>
              {children}
              <CookieConsent />
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
