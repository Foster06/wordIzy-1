// src/app/i18n/[lang]/layout.tsx
// Root layout for the LOCALIZED route group: /de, /fr/wordle, /nl/wordfeud, …
// (the public URLs; middleware rewrites them to /i18n/{lang}/… which is what
// actually hits this route tree).
//
// This is the second of TWO root layouts in the app (the other is
// src/app/(main)/layout.tsx for English-canonical routes). Splitting the root
// layout by locale is the Next.js-recommended way to get a per-language
// <html lang="…"> attribute on the document root WITHOUT opting any page into
// dynamic rendering: `params.lang` is known at build time (the page's
// generateStaticParams enumerates every lang×tool combination), so every
// localized page stays statically prerendered with the correct <html lang>.
//
// All shared <html>/<head>/<body> markup (analytics, JSON-LD, providers,
// preconnects) lives in <SiteHtml />; this layout only contributes the lang.

import "../../globals.css";
import type { Metadata, Viewport } from "next";
import SiteHtml from "@/components/site/site-html";

const SITE_URL = "https://wordizy.com";

// Structural metadata only — metadataBase (so relative OG image URLs resolve),
// icons, manifest, robots, and the shared title template. Per-page title,
// description, hreflang alternates and openGraph.locale (incl. the correct
// OG_LOCALES[lang] value) are all set by the page's generateMetadata in
// [[...tool]]/page.tsx and scrabble-words/page.tsx, which override these
// defaults. Defining them here too would just duplicate/mask the page values.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "wordIzy — Word Unscrambler & Solver",
    template: "%s | wordIzy",
  },
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
};

export const viewport: Viewport = {
  themeColor: "#f5a623",
  colorScheme: "dark light",
};

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function I18nLayout({ children, params }: LayoutProps) {
  const { lang } = await params;
  return <SiteHtml lang={lang}>{children}</SiteHtml>;
}
