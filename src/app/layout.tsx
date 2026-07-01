import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/components/i18n/language-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "WordIzy — Word Unscrambler, Anagram & Wordle Solver",
  description:
    "WordIzy is a free word unscrambler and solver. Unscramble letters, solve anagrams, Wordle, Quordle, Scrabble, Wordfeud and browse multi-language word lists. No sign up.",
  keywords: [
    "word unscrambler",
    "anagram solver",
    "wordle solver",
    "quordle solver",
    "scrabble helper",
    "wordfeud helper",
    "word lists",
    "WordIzy",
  ],
  authors: [{ name: "WordIzy" }],
  icons: { icon: "/logo.svg" },
  openGraph: {
    title: "WordIzy — Word Unscrambler & Solver",
    description:
      "Free word unscrambler, anagram solver, Wordle & Quordle solver with multi-language dictionaries. No sign up.",
    siteName: "WordIzy",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <LanguageProvider>{children}</LanguageProvider>
        <SonnerToaster position="top-center" richColors />
      </body>
    </html>
  );
}
