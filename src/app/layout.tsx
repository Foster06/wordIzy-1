import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora, Inter, Bree_Serif, Roboto_Slab } from "next/font/google";
import "./globals.css";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/components/i18n/language-provider";
import { ThemeProvider } from "@/components/site/theme-provider";
import { CookieConsent } from "@/components/site/cookie-consent";
import { WebVitals } from "@/components/site/web-vitals";
import { DictionaryWarmer } from "@/components/site/dictionary-warmer";
import { Analytics } from "@vercel/analytics/next";
//import { GoogleAnalytics } from "@/components/site/google-analytics"; // 🎯 IMPORTED: Dynamic analytics tracking wrapper

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
  inLanguage: ["en", "fr", "es", "it", "pt", "de", "nl", "ja", "zh"],
  publisher: { "@type": "Organization", name: "wordIzy" },
  
  // 🎯 FIXED: Dynamic endpoint format tracking parameter restored for Google Sitelinks structures
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://wordizy.com{search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "wordIzy — Word Unscrambler, Anagram & Wordle Solver",
  description:
    "wordIzy is a free word unscrambler and solver. Unscramble letters, solve anagrams, Wordle, Quordle, Scrabble, Wordfeud and browse multi-language word lists. No sign up.",
  keywords: [
    "word unscrambler",
    "anagram solver",
    "wordle solver",
    "quordle solver",
    "scrabble helper",
    "wordfeud helper",
    "word lists",
    "wordIzy",
  ],
  authors: [{ name: "wordIzy" }],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/logo.svg",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "wordIzy — Word Unscrambler & Solver",
    description:
      "Free word unscrambler, anagram solver, Wordle & Quordle solver with multi-language dictionaries. No sign up.",
    siteName: "wordIzy",
    type: "website",
    url: SITE_URL,
    images: [
      {
        url: "/og-image.svg",
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
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Force favicon refresh — cache-busting query param */}
        <link rel="icon" type="image/svg+xml" href="/logo.svg?v=2" />
        <link rel="apple-touch-icon" href="/logo.svg?v=2" />
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
            {/* 🎯 PLACED: Embedded cleanly at the root level of providers layout layer streams */}
            
            {children}
            <CookieConsent />
            <WebVitals />
            <DictionaryWarmer />
          </LanguageProvider>
        </ThemeProvider>
        <SonnerToaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  );
}
