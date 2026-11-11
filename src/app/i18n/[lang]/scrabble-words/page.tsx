import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ReturnButton } from "@/components/site/back-button";
import { LanguageScope } from "@/components/i18n/language-provider";
import { translations } from "@/components/i18n/translations";
import type { LanguageCode } from "@/lib/languages";
import { buildDictAlternates, OG_LOCALES, type I18nLang } from "@/lib/i18n-seo";
import {
  DICT_LANGS,
  getSampleLangWords,
  getLocalizedScrabbleWordData,
  type ScrabbleDictLang,
} from "@/lib/scrabble-word-data";
import { SCRABBLE_WORDS_COPY, fill } from "@/lib/scrabble-words-i18n";

// ─────────────────────────────────────────────────────────────────────────────
// Localized Scrabble-words index pages: /fr/scrabble-words, /de/scrabble-words, …
//
// PUBLIC URLs are /{lang}/scrabble-words; src/middleware.ts rewrites them here
// to /i18n/{lang}/scrabble-words. Prerendered for the 6 dictionary languages
// (ja/zh have no Scrabble dictionary and are 308'd to the English canonical by
// the middleware — they never reach this route). Shows THAT language's valid
// words (from its own dictionary) with that language's official tile values.
// ─────────────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ lang: string }>;
}

const SITE_ORIGIN = "https://wordizy.com";
const LENGTHS = [2, 3, 4, 5, 6, 7, 8];
const SAMPLE_PER_LENGTH = 24;

// Every dictionary language is enumerated; unknown ones 404 (middleware never
// routes them here — defense in depth).
export const dynamicParams = false;

export function generateStaticParams() {
  return DICT_LANGS.map((lang) => ({ lang }));
}

function isDictLang(lang: string): lang is ScrabbleDictLang {
  return (DICT_LANGS as readonly string[]).includes(lang);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: rawLang } = await params;
  if (!isDictLang(rawLang)) return { robots: { index: false, follow: false } };
  const lang = rawLang;
  const copy = SCRABBLE_WORDS_COPY[lang];
  const canonical = `/${lang}/scrabble-words`;

  return {
    title: copy.indexTitle, // root layout template appends " | wordIzy"
    description: copy.indexDesc,
    alternates: { canonical, languages: buildDictAlternates("/scrabble-words") },
    openGraph: {
      title: copy.indexTitle,
      description: copy.indexDesc,
      url: `${SITE_ORIGIN}${canonical}`,
      siteName: "wordIzy",
      type: "website",
      locale: OG_LOCALES[lang as I18nLang],
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: copy.indexTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.indexTitle,
      description: copy.indexDesc,
      images: ["/og-image.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocalizedScrabbleWordsIndexPage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  if (!isDictLang(rawLang)) notFound();
  const lang = rawLang;
  const copy = SCRABBLE_WORDS_COPY[lang];
  const t = translations[lang];

  // Samples of the language's OWN valid words per length, with points in the
  // language's official tile values.
  const samplesByLength = LENGTHS.map((len) => {
    const words = getSampleLangWords(lang, len, SAMPLE_PER_LENGTH);
    return {
      len,
      words: words.map((w) => ({
        word: w,
        display: w.toUpperCase(),
        points: getLocalizedScrabbleWordData(lang, w).points,
      })),
    };
  }).filter((section) => section.words.length > 0);

  return (
    <LanguageScope initial={lang as LanguageCode}>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-8 sm:py-12">
          <ReturnButton href={`/${lang}`} label={copy.backHome} />

          <article className="mt-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight text-gradient-brand">
              {copy.indexH1}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              {copy.indexIntro}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              {copy.indexDictNote}
            </p>

            {/* Length sections — words from THIS language's dictionary */}
            <div className="space-y-10">
              {samplesByLength.map(({ len, words }) => (
                <section key={len}>
                  <h2 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                    {fill(copy.lengthTitle, { n: len })}
                  </h2>
                  <p className="text-xs text-muted-foreground mb-4">
                    {fill(copy.sampleNote, { n: len })}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {words.map(({ word, display, points }) => (
                      <Link
                        key={word}
                        href={`/${lang}/scrabble-words/${word}`}
                        className="px-3 py-2 rounded-md glass-soft text-xs text-foreground/90 hover:text-brand hover:border-brand/30 border border-white/10 transition-colors flex items-center justify-between"
                      >
                        <span className="font-mono font-semibold">{display}</span>
                        <span className="text-muted-foreground">{points}pts</span>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* What counts as valid — THIS language's dictionary */}
            <section className="mt-12 pt-6 border-t border-white/10">
              <h2 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                {copy.whatCountsH2}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {copy.whatCountsBody}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                {copy.indexDictNote}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-3">
                {copy.accentsNote}
              </p>
            </section>

            {/* Language switcher — sibling localized editions */}
            <section className="mt-8 pt-6 border-t border-white/10">
              <h3 className="text-sm font-semibold text-foreground mb-3">{copy.alsoInLabel}</h3>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/scrabble-words"
                  className="px-3 py-1.5 rounded-md glass-soft text-xs text-foreground/80 hover:text-brand transition-colors"
                >
                  {copy.langNames.en} (NWL + CSW)
                </Link>
                {DICT_LANGS.filter((l) => l !== lang).map((l) => (
                  <Link
                    key={l}
                    href={`/${l}/scrabble-words`}
                    className="px-3 py-1.5 rounded-md glass-soft text-xs text-foreground/80 hover:text-brand transition-colors"
                  >
                    {copy.langNames[l]}
                  </Link>
                ))}
              </div>
            </section>

            {/* Related tools — localized variants */}
            <div className="mt-10 pt-6 border-t border-white/10">
              <h3 className="text-sm font-semibold text-foreground mb-3">{copy.relatedTools}</h3>
              <div className="flex flex-wrap gap-2">
                <Link href={`/${lang}/scrabble`} className="px-3 py-1.5 rounded-md glass-soft text-xs text-foreground/80 hover:text-brand transition-colors">
                  {t.nav.scrabble}
                </Link>
                <Link href={`/${lang}/wordlists`} className="px-3 py-1.5 rounded-md glass-soft text-xs text-foreground/80 hover:text-brand transition-colors">
                  {t.nav.wordlists}
                </Link>
                <Link href={`/${lang}/dictionary`} className="px-3 py-1.5 rounded-md glass-soft text-xs text-foreground/80 hover:text-brand transition-colors">
                  {t.nav.dictionary}
                </Link>
                <Link href={`/${lang}/wordle`} className="px-3 py-1.5 rounded-md glass-soft text-xs text-foreground/80 hover:text-brand transition-colors">
                  {t.nav.wordle}
                </Link>
              </div>
            </div>
          </article>
        </main>
        <SiteFooter />
      </div>
    </LanguageScope>
  );
}
