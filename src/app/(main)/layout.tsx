// src/app/(main)/layout.tsx
// Root layout for the English-canonical route group: /, /wordle,
// /scrabble-words, /guides/…, and the [[...tool]] catch-all. Route groups
// ((main)) don't affect the URL, so these still serve from their public
// English paths.
//
// This is one of TWO root layouts in the app (the other is
// src/app/i18n/[lang]/layout.tsx for localized routes). Having two root layouts
// lets each render its own <html lang="…"> — the English group is always
// lang="en", the i18n group is lang={params.lang} — without forcing any page
// into dynamic rendering (every page stays statically prerendered).
//
// The actual <html>/<head>/<body> markup lives in the shared <SiteHtml />
// component so the analytics loaders, JSON-LD, providers and preconnects are
// defined in exactly one place.

import "../globals.css";
import type { Metadata, Viewport } from "next";
import SiteHtml from "@/components/site/site-html";

const SITE_URL = "https://wordizy.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "wordIzy — Word Unscrambler, Anagram & Wordle Solver",
    template: "%s | wordIzy",
  },
  // Bing requires 25-160 chars — keep ≤150 for safety. This default is the
  // sitewide fallback (404 pages and any route without its own description).
  description:
    "wordIzy — free word unscrambler, anagram solver, Wordle and Scrabble word finder with 9-language dictionaries. Instant results, no sign-up.",
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
      { url: "/favicon-32.webp", type: "image/webp", sizes: "32x32" },
      { url: "/favicon-16.webp", type: "image/webp", sizes: "16x16" },
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

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteHtml lang="en">{children}</SiteHtml>;
}
