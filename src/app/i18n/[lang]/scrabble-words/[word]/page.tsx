import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ReturnButton } from "@/components/site/back-button";
import { ShareButtons } from "@/components/site/share-buttons";
import { LanguageScope } from "@/components/i18n/language-provider";
import { translations } from "@/components/i18n/translations";
import type { LanguageCode } from "@/lib/languages";
import { buildDictAlternates, OG_LOCALES, type I18nLang } from "@/lib/i18n-seo";
import {
  DICT_LANGS,
  getDictInfo,
  getLangPrerenderWords,
  getLocalizedScrabbleWordData,
  type LocalizedScrabbleWordData,
  type ScrabbleDictLang,
} from "@/lib/scrabble-word-data";
import { SCRABBLE_WORDS_COPY, fill } from "@/lib/scrabble-words-i18n";

// ─────────────────────────────────────────────────────────────────────────────
// Localized word pages: /fr/scrabble-words/[word], /de/scrabble-words/[word], …
//
// The PRIMARY check is the page language's own dictionary (ODS9, FISE,
// Zingarelli, OpenTaal, or the wordIzy German/Portuguese lists) with points in
// that language's official tile values; English (NWL2023/CSW21) and the five
// other languages follow in a cross-dictionary table. Prerenders each
// language's 2-letter words; everything else renders on demand via ISR
// (dynamicParams = true — every [a-z]{2,15} slug yields a useful page, valid
// or not, exactly like the English section).
// ─────────────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ lang: string; word: string }>;
}

const SITE_ORIGIN = "https://wordizy.com";

/** Length of a string AFTER HTML attribute escaping, matching what Next.js
 *  renders in `<meta content="…">` (see the English [word] page). Used to
 *  keep the meta description within Bing's 25-160 char limit. */
function escapedLength(s: string): number {
  let n = 0;
  for (const ch of s) {
    if (ch === '"') n += 6;
    else if (ch === "'") n += 6;
    else if (ch === "&") n += 5;
    else if (ch === "<" || ch === ">") n += 4;
    else n += 1;
  }
  return n;
}

/** Word-boundary clamp: keep the meta description ≤ budget after escaping. */
function clampDesc(desc: string, budget: number): string {
  if (escapedLength(desc) <= budget) return desc;
  let out = desc.slice(0, Math.max(40, budget - 1));
  const lastSpace = out.lastIndexOf(" ");
  if (lastSpace > 40) out = out.slice(0, lastSpace);
  return `${out.trimEnd()}…`;
}

export const dynamicParams = true;
export const revalidate = 86400; // 24h — matches the English section

export async function generateStaticParams() {
  const params: { lang: string; word: string }[] = [];
  for (const lang of DICT_LANGS) {
    for (const word of getLangPrerenderWords(lang)) {
      params.push({ lang, word });
    }
  }
  return params;
}

function isDictLang(lang: string): lang is ScrabbleDictLang {
  return (DICT_LANGS as readonly string[]).includes(lang);
}

/** "Anglais (NWL2023 + CSW21), Espagnol (FISE)" — comma-joined (grammar-safe
 *  in all six languages). Language names are lowercased in prose except in
 *  German, where language names are nouns and stay capitalized. */
function buildValidList(data: LocalizedScrabbleWordData, lang: ScrabbleDictLang): string {
  const copy = SCRABBLE_WORDS_COPY[lang];
  const lc = (name: string) => (lang === "de" ? name : name.toLowerCase());
  const parts: string[] = [];
  if (data.inNWL || data.inCSW) {
    parts.push(`${lc(copy.langNames.en)} (NWL2023${data.inCSW ? " + CSW21" : ""})`);
  }
  for (const r of data.validInOtherLanguages) {
    parts.push(`${lc(copy.langNames[r.lang])} (${r.official ? r.dictName : copy.wordListName})`);
  }
  return parts.join(", ");
}

/** "A=1, E=1, L=1 (×2)" — per-letter breakdown string for FAQ answers. */
function breakdownString(data: LocalizedScrabbleWordData): string {
  return data.letterBreakdown
    .map((l) => `${l.letter}=${l.value}${l.count > 1 ? ` (×${l.count})` : ""}`)
    .join(", ");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: rawLang, word: rawWord } = await params;
  if (!isDictLang(rawLang)) return { robots: { index: false, follow: false } };
  const word = rawWord.toLowerCase();
  if (!/^[a-z]{2,15}$/.test(word)) return {};

  const lang = rawLang;
  const copy = SCRABBLE_WORDS_COPY[lang];
  const data = getLocalizedScrabbleWordData(lang, word);
  const display = data.display;

  const title = data.valid
    ? fill(copy.titleValid, { word: display, points: data.points })
    : data.validAnywhereElse
      ? fill(copy.titleOther, { word: display })
      : fill(copy.titleInvalid, { word: display });

  const description = clampDesc(
    data.valid
      ? fill(copy.descValid, { word: display, points: data.points })
      : data.validAnywhereElse
        ? fill(copy.descOther, { word: display })
        : fill(copy.descInvalid, { word: display }),
    155
  );

  const canonical = `/${lang}/scrabble-words/${word}`;

  return {
    title, // root layout template appends " | wordIzy"
    description,
    alternates: { canonical, languages: buildDictAlternates(`/scrabble-words/${word}`) },
    openGraph: {
      title,
      description,
      url: `${SITE_ORIGIN}${canonical}`,
      siteName: "wordIzy",
      type: "article",
      locale: OG_LOCALES[lang as I18nLang],
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocalizedScrabbleWordPage({ params }: PageProps) {
  const { lang: rawLang, word: rawWord } = await params;
  if (!isDictLang(rawLang)) notFound();
  const word = rawWord.toLowerCase();

  // Same URL-space guard as the English section: 2-15 lowercase letters only.
  if (!/^[a-z]{2,15}$/.test(word)) {
    notFound();
  }

  const lang = rawLang;
  const copy = SCRABBLE_WORDS_COPY[lang];
  const t = translations[lang];
  const data = getLocalizedScrabbleWordData(lang, word);
  const selfDict = getDictInfo(lang);
  const validList = buildValidList(data, lang);
  const breakdown = breakdownString(data);

  // Visible FAQ items (mirror the JSON-LD below).
  const faqItems: { q: string; a: string }[] = [];
  if (data.valid) {
    faqItems.push({
      q: fill(copy.faqValidQ1, { word: data.display }),
      a: fill(copy.faqValidA1, { word: data.display, points: data.points }),
    });
    faqItems.push({
      q: fill(copy.faqValidQ2, { word: data.display }),
      a: fill(copy.faqValidA2, { word: data.display, points: data.points, breakdown }),
    });
  } else {
    faqItems.push({
      q: fill(copy.faqInvalidQ1, { word: data.display }),
      a: fill(copy.faqInvalidA1, { word: data.display }),
    });
    faqItems.push({
      q: fill(copy.faqInvalidQ2, { word: data.display }),
      a: fill(copy.faqInvalidA2, { word: data.display }),
    });
  }
  if (!data.valid && validList) {
    faqItems.push({
      q: fill(copy.faqOtherQ, { word: data.display }),
      a: fill(copy.faqOtherA, { word: data.display, list: validList }),
    });
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "wordIzy", item: SITE_ORIGIN },
      {
        "@type": "ListItem",
        position: 2,
        name: t.nav.scrabblewords,
        item: `${SITE_ORIGIN}/${lang}/scrabble-words`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: fill(copy.breadcrumbWord, { word: data.display }),
        item: `${SITE_ORIGIN}/${lang}/scrabble-words/${word}`,
      },
    ],
  };

  // Cross-dictionary table rows: own dictionary first, then English, then the
  // other five dictionary languages.
  const selfRow = {
    dict: selfDict.official ? selfDict.dictName : copy.wordListName,
    region: copy.langNames[lang],
    valid: data.valid,
  };

  return (
    <LanguageScope initial={lang as LanguageCode}>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
          <ReturnButton href={`/${lang}/scrabble-words`} label={copy.allWords} />

          <article className="mt-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-tight text-gradient-brand">
              {fill(copy.h1, { word: data.display })}
            </h1>
            <p className="text-muted-foreground text-xs mb-8">{copy.subline}</p>

            {/* ── The answer block ── */}
            <div
              className={`rounded-xl p-6 mb-8 border ${
                data.valid
                  ? "bg-brand/10 border-brand/30"
                  : "bg-red-500/5 border-red-500/20"
              }`}
            >
              <p className="text-lg font-semibold text-foreground mb-2">
                {data.valid
                  ? fill(copy.answerValid, { word: data.display, points: data.points })
                  : data.validAnywhereElse
                    ? fill(copy.answerOther, { word: data.display })
                    : fill(copy.answerInvalid, { word: data.display })}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {data.valid
                  ? fill(copy.answerValidSub, { word: data.display, points: data.points })
                  : data.validAnywhereElse
                    ? fill(copy.answerOtherSub, { word: data.display, list: validList })
                    : fill(copy.answerInvalidSub, { word: data.display })}
              </p>
            </div>

            {/* ── Points table (valid words, THIS language's tile values) ── */}
            {data.valid && (
              <section className="mb-8">
                <h2 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                  {fill(copy.pointsH2, { word: data.display, points: data.points })}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {fill(copy.pointsIntro, { word: data.display, points: data.points })}
                </p>
                <div className="overflow-x-auto rounded-lg border border-white/10">
                  <table className="w-full text-sm">
                    <thead className="bg-brand/10">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold text-foreground border-b border-white/10">{copy.colLetter}</th>
                        <th className="px-3 py-2 text-left font-semibold text-foreground border-b border-white/10">{copy.colCount}</th>
                        <th className="px-3 py-2 text-left font-semibold text-foreground border-b border-white/10">{copy.colEach}</th>
                        <th className="px-3 py-2 text-left font-semibold text-foreground border-b border-white/10">{copy.colSubtotal}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.letterBreakdown.map((l, idx) => (
                        <tr key={l.letter} className={idx % 2 === 0 ? "bg-white/[0.02]" : ""}>
                          <td className="px-3 py-2 text-foreground font-mono font-semibold">{l.letter}</td>
                          <td className="px-3 py-2 text-muted-foreground">{l.count}</td>
                          <td className="px-3 py-2 text-muted-foreground">{l.value}</td>
                          <td className="px-3 py-2 text-muted-foreground">{l.value * l.count}</td>
                        </tr>
                      ))}
                      <tr className="border-t border-white/10">
                        <td className="px-3 py-2 text-foreground font-semibold" colSpan={3}>{copy.colTotal}</td>
                        <td className="px-3 py-2 text-brand font-semibold">{data.points}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* ── Cross-dictionary validity — all 8 dictionaries ── */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                {fill(copy.crossH2, { word: data.display })}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {fill(copy.crossIntro, { word: data.display })}
              </p>
              <div className="overflow-x-auto rounded-lg border border-white/10">
                <table className="w-full text-sm">
                  <thead className="bg-brand/10">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold text-foreground border-b border-white/10">{copy.colDict}</th>
                      <th className="px-3 py-2 text-left font-semibold text-foreground border-b border-white/10">{copy.colRegion}</th>
                      <th className="px-3 py-2 text-left font-semibold text-foreground border-b border-white/10">
                        {fill(copy.colValid, { word: data.display })}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <DictRow dict={selfRow.dict} region={selfRow.region} valid={selfRow.valid} yes={copy.colYes} no={copy.colNo} />
                    <DictRow dict="NWL2023" region={copy.nwlRegion} valid={data.inNWL} yes={copy.colYes} no={copy.colNo} />
                    <DictRow dict="CSW21" region={copy.cswRegion} valid={data.inCSW} yes={copy.colYes} no={copy.colNo} />
                    {data.otherLanguages.map((r) => (
                      <DictRow
                        key={r.lang}
                        dict={`${r.official ? r.dictName : `${copy.wordListName} *`}`}
                        region={copy.langNames[r.lang]}
                        valid={r.valid}
                        yes={copy.colYes}
                        no={copy.colNo}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                {copy.wordListFootnote}
              </p>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                {copy.accentsFootnote}
              </p>
            </section>

            {/* ── FAQ section (visible — mirrors the JSON-LD) ── */}
            <section className="mt-10 pt-6 border-t border-white/10">
              <h2 className="text-xl font-bold text-foreground mb-4 tracking-tight">
                {copy.faqTitle}
              </h2>
              <div className="space-y-4">
                {faqItems.map((item) => (
                  <div key={item.q} className="space-y-1.5">
                    <h3 className="text-sm font-semibold text-foreground">{item.q}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQPage JSON-LD schema */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            {/* BreadcrumbList JSON-LD */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            <ShareButtons
              url={`${SITE_ORIGIN}/${lang}/scrabble-words/${word}`}
              title={fill(copy.shareTitle, { word: data.display })}
            />

            {/* Check this word in the other language editions */}
            <section className="mt-10 pt-6 border-t border-white/10">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                {fill(copy.checkIn, { word: data.display })}
              </h3>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/scrabble-words/${word}`}
                  className="px-3 py-1.5 rounded-md glass-soft text-xs text-foreground/80 hover:text-brand transition-colors"
                >
                  {copy.langNames.en} (NWL + CSW)
                </Link>
                {DICT_LANGS.filter((l) => l !== lang).map((l) => (
                  <Link
                    key={l}
                    href={`/${l}/scrabble-words/${word}`}
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

/** One row of the cross-dictionary validity table. */
function DictRow({
  dict, region, valid, yes, no,
}: {
  dict: string;
  region: string;
  valid: boolean;
  yes: string;
  no: string;
}) {
  return (
    <tr className="border-b border-white/5 last:border-b-0">
      <td className="px-3 py-2 text-foreground font-semibold">{dict}</td>
      <td className="px-3 py-2 text-muted-foreground">{region}</td>
      <td className={`px-3 py-2 font-semibold ${valid ? "text-brand" : "text-muted-foreground/60"}`}>
        {valid ? yes : no}
      </td>
    </tr>
  );
}
