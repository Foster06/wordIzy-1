import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ReturnButton } from "@/components/site/back-button";
import { ShareButtons } from "@/components/site/share-buttons";
import {
  getScrabbleWordData,
  getAllValidScrabbleWords,
  type ScrabbleWordData,
} from "@/lib/scrabble-word-data";

interface PageProps {
  params: Promise<{ word: string }>;
}

const SITE_ORIGIN = "https://wordizy.com";

/** Length of a string AFTER HTML attribute escaping, matching what Next.js
 *  renders in `<meta content="…">`. Escapable characters expand:
 *  & → &amp; (5), < → &lt; (4), > → &gt; (4), " → &quot; (6),
 *  ' → &#x27; (6). Used to keep the meta description within Bing's
 *  25-160 char limit as it appears in the final HTML. */
function escapedLength(s: string): number {
  let n = 0;
  for (const ch of s) {
    if (ch === '"') n += 6; // &quot;
    else if (ch === "'") n += 6; // &#x27;
    else if (ch === "&") n += 5; // &amp;
    else if (ch === "<" || ch === ">") n += 4; // &lt; / &gt;
    else n += 1;
  }
  return n;
}

// ── Other-language helpers ─────────────────────────────────────────────
// Each word page reports validity across 8 dictionaries (2 English + 6
// other languages), so a visitor checking a word from their own language
// learns it is playable there even when it is not valid English Scrabble.

function joinList(parts: string[]): string {
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0];
  return `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
}

/** "French (ODS9) and Dutch (OpenTaal)" — full list with dictionary names. */
function otherLangsFull(data: ScrabbleWordData): string {
  return joinList(data.validInOtherLanguages.map((r) => `${r.languageName} (${r.dictName})`));
}

/** "French and Dutch" — language names only. */
function otherLangNames(data: ScrabbleWordData): string {
  return joinList(data.validInOtherLanguages.map((r) => r.languageName));
}

/** "French, Dutch and 2 more" — compact list for the meta description. */
function otherLangsShort(data: ScrabbleWordData): string {
  const names = data.validInOtherLanguages.map((r) => r.languageName);
  if (names.length <= 2) return joinList(names);
  return `${names[0]}, ${names[1]} and ${names.length - 2} more`;
}

// On-demand rendering for non-prerendered words (non-words like "zave", and
// 4+ letter words not in the static params set). Cached for 24h via ISR.
// The catch-all [[...tool]] route keeps dynamicParams=false for soft-404 safety;
// THIS route intentionally allows dynamic params because every /scrabble-words/*
// URL produces useful content (valid → "yes" page, invalid → "no" page).
export const dynamicParams = true;
export const revalidate = 86400; // seconds = 24h

// Prerender all valid 2-3 letter Scrabble words (~1,500 pages). These cover the
// highest-intent "is X a scrabble word" queries (short words people are unsure
// about: ez, izy, qi, za, etc.). Longer words and non-words are SSR'd on demand.
export async function generateStaticParams() {
  const words = getAllValidScrabbleWords(2, 3);
  return words.map((word) => ({ word }));
}

/** Generate per-word metadata tuned for the "is X a scrabble word" SERP. */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { word: rawWord } = await params;
  const word = rawWord.toLowerCase();
  if (!/^[a-z]{2,15}$/.test(word)) return {};

  const data = getScrabbleWordData(word);
  const display = data.display;
  const otherCount = data.validInOtherLanguages.length;
  const title = data.valid
    ? `Is ${display} a Valid Scrabble Word? Yes — ${data.points} Points`
    : otherCount > 0
      ? `Is ${display} a Valid Scrabble Word? Not in English`
      : `Is ${display} a Valid Scrabble Word? No — Not in NWL or CSW`;

  // Meta description MUST be 25-160 chars (Bing URL Inspection rule).
  // Target 150 to leave a safety buffer: Next.js HTML-escapes the content
  // attribute (& → &amp;, < → &lt;, ' → &#x27;, …), which EXPANDS the
  // rendered length beyond the raw string length. The budget below is
  // computed on the ESCAPED length so the rendered attribute never
  // exceeds the target.
  const MAX_DESC = 150;
  let description: string;
  if (data.valid) {
    const dicts = `${data.inNWL ? "NWL2023" : ""}${data.inNWL && data.inCSW ? " & " : ""}${data.inCSW ? "CSW21" : ""}`;
    const fixed = `${display} is a valid Scrabble word worth ${data.points} points. Valid in ${dicts}.`;
    let desc = fixed;
    if (data.definition) {
      const budget = MAX_DESC - escapedLength(fixed) - " Definition: ".length;
      if (budget >= 20) {
        let defPart = data.definition.slice(0, budget);
        while (escapedLength(`${fixed} Definition: ${defPart}`) > MAX_DESC && defPart.length > 20) {
          defPart = defPart.slice(0, -1);
        }
        desc = `${fixed} Definition: ${defPart}`;
      }
    }
    description = desc;
  } else if (otherCount > 0) {
    description = `${display} is not a valid English Scrabble word, but it is valid in ${otherLangsShort(data)}. See why, plus similar valid English words.`;
  } else {
    description = `${display} is not a valid Scrabble word in NWL2023 or CSW21. See why, and find similar valid words to play.`;
  }

  const canonical = `${SITE_ORIGIN}/scrabble-words/${word}`;

  // FAQPage JSON-LD — embedded as <meta> via `other` field, rendered as a script
  // tag in the page body. Three Q&As that match common SERP feature triggers.
  const faqJsonLd = buildFaqJsonLd(data);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "wordIzy",
      type: "article",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
    other: faqJsonLd ? { "ld:faq": JSON.stringify(faqJsonLd) } : undefined,
  };
}

/** Build a 3-question FAQPage JSON-LD schema for the word.
 *  Unlocks expandable Q&A rich snippets in Google/Bing SERPs. */
function buildFaqJsonLd(data: ScrabbleWordData) {
  const display = data.display;
  const faqItems: { q: string; a: string }[] = [];

  if (data.valid) {
    faqItems.push({
      q: `Is ${display} a valid Scrabble word?`,
      a: `Yes, ${display} is a valid Scrabble word${data.inNWL ? " in the NWL2023 (Tournament Word List, the North American official dictionary)" : ""}${data.inNWL && data.inCSW ? " and" : data.inCSW ? " in the" : ""}${data.inCSW ? " the CSW21 (Collins Scrabble Words, the international dictionary)" : ""}. It is worth ${data.points} Scrabble points.`,
    });
    if (data.definition) {
      faqItems.push({
        q: `What does ${display} mean in Scrabble?`,
        a: `${display} is ${expandPOS(data.partOfSpeech)} as: ${data.definition}.`,
      });
    }
    faqItems.push({
      q: `How many points is ${display} worth in Scrabble?`,
      a: `${display} is worth ${data.points} points in Scrabble, calculated as the sum of each letter's tile value: ${data.letterBreakdown
        .map((l) => `${l.letter}=${l.value}${l.count > 1 ? ` (×${l.count})` : ""}`)
        .join(", ")}.`,
    });
  } else {
    faqItems.push({
      q: `Is ${display} a valid Scrabble word?`,
      a: `No, ${display} is not a valid Scrabble word in either the NWL2023 (Tournament Word List) or CSW21 (Collins Scrabble Words) dictionary. It cannot be played in an official English-language Scrabble game${data.validInOtherLanguages.length > 0 ? ` — but it is a valid word in ${otherLangsFull(data)}` : ""}.`,
    });
    faqItems.push({
      q: `Why is ${display} not a valid Scrabble word?`,
      a: `${display} does not appear in the official English Scrabble dictionaries (NWL2023 for North America, CSW21 for international play). English-language Scrabble only accepts words that are listed in these dictionaries. Common reasons a word is excluded: it's a proper noun (capitalized), an abbreviation, a prefix/suffix, or simply not recognized as a standard English word.`,
    });
    faqItems.push({
      q: `Where can I check if a word is valid in Scrabble?`,
      a: `You can use the wordIzy Scrabble Word Checker at wordizy.com/scrabble to look up any word. This page also shows the word's point value, definition, and letter breakdown if it is valid.`,
    });
  }

  // Cross-language FAQ — added whenever the word is valid in at least one
  // other language's dictionary (works for valid and invalid English words).
  if (data.validInOtherLanguages.length > 0) {
    faqItems.push({
      q: `Is ${display} a valid word in other languages?`,
      a: data.valid
        ? `Yes — besides English, ${display} is also a valid word in ${otherLangsFull(data)}.`
        : `Yes. ${display} is a valid word in ${otherLangsFull(data)}. It is not valid in English-language Scrabble (NWL2023 or CSW21), but it can be played in Scrabble games that use those languages' dictionaries.`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** Expand a part-of-speech code (n, v, adj, adv, interj) into a readable phrase. */
function expandPOS(pos: string | null): string {
  if (!pos) return "defined";
  const map: Record<string, string> = {
    n: "a noun",
    v: "a verb",
    adj: "an adjective",
    adv: "an adverb",
    interj: "an interjection",
    article: "an article",
    prep: "a preposition",
    pron: "a pronoun",
    conj: "a conjunction",
  };
  return map[pos] || "defined";
}

export default async function ScrabbleWordPage({ params }: PageProps) {
  const { word: rawWord } = await params;
  const word = rawWord.toLowerCase();

  // Guard: reject anything that isn't 2-15 lowercase letters. This prevents
  // junk URLs from generating pages (e.g. /scrabble-words/foo-bar-baz).
  if (!/^[a-z]{2,15}$/.test(word)) {
    notFound();
  }

  const data = getScrabbleWordData(word);
  const faqJsonLd = buildFaqJsonLd(data);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
        <ReturnButton href="/scrabble-words" label="All Scrabble Words" />

        <article className="mt-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-tight text-gradient-brand">
            Is {data.display} a Valid Scrabble Word?
          </h1>
          <p className="text-muted-foreground text-xs mb-8">
            Scrabble validity check · NWL2023 + CSW21 · French, Spanish, Italian, Dutch, German &amp; Portuguese dictionaries
          </p>

          {/* ── The answer block — the first thing searchers want ── */}
          <div
            className={`rounded-xl p-6 mb-8 border ${
              data.valid
                ? "bg-brand/10 border-brand/30"
                : "bg-red-500/5 border-red-500/20"
            }`}
          >
            <p className="text-lg font-semibold text-foreground mb-2">
              {data.valid ? (
                <>Yes — {data.display} is a valid Scrabble word worth {data.points} points.</>
              ) : data.validInOtherLanguages.length > 0 ? (
                <>No — {data.display} is not a valid English Scrabble word.</>
              ) : (
                <>No — {data.display} is not a valid Scrabble word.</>
              )}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {data.valid ? (
                <>
                  {data.display} appears in{" "}
                  {data.inNWL && <span className="text-foreground/90">NWL2023 (Tournament Word List)</span>}
                  {data.inNWL && data.inCSW && " and "}
                  {data.inCSW && <span className="text-foreground/90">CSW21 (Collins Scrabble Words)</span>}
                  {"."}
                  {data.inNWL && !data.inCSW && " It is valid in North American Scrabble but not in international (Collins) play."}
                  {!data.inNWL && data.inCSW && " It is valid in international (Collins) Scrabble but not in North American play."}
                </>
              ) : data.validInOtherLanguages.length > 0 ? (
                <>
                  {data.display} does not appear in the English Scrabble
                  dictionaries — NWL2023 (North American) or CSW21
                  (international English). However, it{" "}
                  <span className="text-foreground/90">
                    is a valid word in {otherLangsFull(data)}
                  </span>{" "}
                  — playable in Scrabble games that use those languages&apos;
                  dictionaries.
                </>
              ) : (
                <>
                  {data.display} does not appear in either the NWL2023 (North American
                  Scrabble dictionary) or the CSW21 (international Collins Scrabble
                  dictionary). It cannot be played in an official Scrabble game or
                  in Words With Friends (which uses a similar but not identical word
                  list).
                </>
              )}
            </p>
          </div>

          {/* ── Valid word details: definition, points, letter breakdown ── */}
          {data.valid && (
            <>
              {data.definition && (
                <section className="mb-8">
                  <h2 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                    {data.display} — Definition
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    {data.definition}
                  </p>
                  {data.partOfSpeech && (
                    <p className="text-xs text-muted-foreground">
                      Part of speech: {expandPOS(data.partOfSpeech)}
                      {data.inflections && ` · Inflections: ${data.inflections}`}
                    </p>
                  )}
                </section>
              )}

              <section className="mb-8">
                <h2 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                  {data.display} — Scrabble Points &amp; Letter Breakdown
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {data.display} is worth <span className="text-foreground font-semibold">{data.points} points</span> in Scrabble,
                  calculated as the sum of each letter&apos;s tile value:
                </p>
                <div className="overflow-x-auto rounded-lg border border-white/10">
                  <table className="w-full text-sm">
                    <thead className="bg-brand/10">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold text-foreground border-b border-white/10">Letter</th>
                        <th className="px-3 py-2 text-left font-semibold text-foreground border-b border-white/10">Count</th>
                        <th className="px-3 py-2 text-left font-semibold text-foreground border-b border-white/10">Points each</th>
                        <th className="px-3 py-2 text-left font-semibold text-foreground border-b border-white/10">Subtotal</th>
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
                        <td className="px-3 py-2 text-foreground font-semibold" colSpan={3}>Total</td>
                        <td className="px-3 py-2 text-brand font-semibold">{data.points}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {/* ── Invalid word: helpful suggestions ── */}
          {!data.valid && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                Why {data.display} Isn&apos;t Valid
                {data.validInOtherLanguages.length > 0 ? " in English" : ""}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Scrabble dictionaries are language-specific — each language
                plays with its own official word list. {data.display} does not
                appear in the English dictionaries: NWL2023 for North American
                play and CSW21 for international play
                {data.validInOtherLanguages.length > 0
                  ? `, but it is a valid word in ${otherLangNames(data)}`
                  : ""}
                . Common reasons a word is excluded from the English
                dictionaries:
              </p>
              <ul className="list-disc pl-6 my-3 space-y-1.5 text-sm text-muted-foreground leading-relaxed">
                <li>It&apos;s a proper noun (capitalized name, place, or brand).</li>
                <li>It&apos;s an abbreviation or acronym (e.g. NASA, FBI).</li>
                <li>It&apos;s a prefix or suffix used standalone (e.g. &ldquo;anti&rdquo;, &ldquo;ing&rdquo;).</li>
                <li>It&apos;s a hyphenated form or requires punctuation.</li>
                <li>It&apos;s simply not recognized as a standard English word.</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                If you were trying to play a word that sounds like {data.display}, try
                the wordIzy <Link href="/scrabble" className="text-brand underline underline-offset-2">Scrabble Word Checker</Link> to look up valid alternatives, or
                browse valid words starting with{" "}
                <Link href={`/words-starts-with-${word[0]}`} className="text-brand underline underline-offset-2">
                  the letter {word[0].toUpperCase()}
                </Link>{" "}
                and{" "}
                <Link href={`/unscramble-${data.length}-letter-words`} className="text-brand underline underline-offset-2">
                  {data.length}-letter words
                </Link>.
              </p>
            </section>
          )}

          {/* ── Cross-dictionary validity — all 8 dictionaries ── */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-3 tracking-tight">
              {data.display} in Every Dictionary &amp; Language
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Scrabble dictionaries are language-specific — a word can be
              unplayable in English but perfectly legal in another
              language&apos;s game. Here is how {data.display} fares across all
              eight:
            </p>
            <div className="overflow-x-auto rounded-lg border border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-brand/10">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-foreground border-b border-white/10">Dictionary</th>
                    <th className="px-3 py-2 text-left font-semibold text-foreground border-b border-white/10">Language / region</th>
                    <th className="px-3 py-2 text-left font-semibold text-foreground border-b border-white/10">{data.display} valid?</th>
                  </tr>
                </thead>
                <tbody>
                  <DictRow dict="NWL2023" region="English — North America" valid={data.inNWL} />
                  <DictRow dict="CSW21" region="English — international" valid={data.inCSW} />
                  {data.otherLanguages.map((r) => (
                    <DictRow
                      key={r.lang}
                      dict={`${r.dictName}${r.official ? "" : " *"}`}
                      region={r.languageName}
                      valid={r.valid}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
              * German and Portuguese have no freely-licensed official Scrabble
              dictionary — wordIzy uses its own filtered word lists (the same
              lists that power the German and Portuguese games on this site).
              Matching follows the site-wide convention of stripping accents
              (é → e), so ELEVE matches ÉLÈVE in the French ODS9.
            </p>
          </section>

          {/* ── FAQ section (visible — mirrors the JSON-LD) ── */}
          <section className="mt-10 pt-6 border-t border-white/10">
            <h2 className="text-xl font-bold text-foreground mb-4 tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {data.valid ? (
                <>
                  <FaqItem q={`Is ${data.display} a valid Scrabble word?`}>
                    Yes, {data.display} is a valid Scrabble word
                    {data.inNWL ? " in the NWL2023 (Tournament Word List, the North American official dictionary)" : ""}
                    {data.inNWL && data.inCSW ? " and" : data.inCSW ? " in the" : ""}
                    {data.inCSW ? " the CSW21 (Collins Scrabble Words, the international dictionary)" : ""}.
                    It is worth {data.points} Scrabble points.
                  </FaqItem>
                  {data.definition && (
                    <FaqItem q={`What does ${data.display} mean in Scrabble?`}>
                      {data.display} is {expandPOS(data.partOfSpeech)} as: {data.definition}.
                    </FaqItem>
                  )}
                  <FaqItem q={`How many points is ${data.display} worth in Scrabble?`}>
                    {data.display} is worth {data.points} points in Scrabble, calculated as the sum of each
                    letter&apos;s tile value:{" "}
                    {data.letterBreakdown
                      .map((l) => `${l.letter}=${l.value}${l.count > 1 ? ` (×${l.count})` : ""}`)
                      .join(", ")}.
                  </FaqItem>
                </>
              ) : (
                <>
                  <FaqItem q={`Is ${data.display} a valid Scrabble word?`}>
                    No, {data.display} is not a valid Scrabble word in either the NWL2023 (Tournament
                    Word List) or CSW21 (Collins Scrabble Words) dictionary. It cannot be played in
                    an official English-language Scrabble game
                    {data.validInOtherLanguages.length > 0
                      ? ` — but it is a valid word in ${otherLangsFull(data)}`
                      : ""}
                    .
                  </FaqItem>
                  <FaqItem q={`Why is ${data.display} not a valid Scrabble word?`}>
                    {data.display} does not appear in the official English Scrabble dictionaries (NWL2023 for
                    North America, CSW21 for international play). English-language Scrabble only accepts words
                    that are listed in these dictionaries. Common reasons a word is excluded: it&apos;s a
                    proper noun (capitalized), an abbreviation, a prefix/suffix, or simply not
                    recognized as a standard English word.
                  </FaqItem>
                  <FaqItem q="Where can I check if a word is valid in Scrabble?">
                    You can use the wordIzy Scrabble Word Checker at{" "}
                    <Link href="/scrabble" className="text-brand underline underline-offset-2">wordizy.com/scrabble</Link>{" "}
                    to look up any word. This page also shows the word&apos;s point value, definition,
                    and letter breakdown if it is valid.
                  </FaqItem>
                </>
              )}
              {data.validInOtherLanguages.length > 0 && (
                <FaqItem q={`Is ${data.display} a valid word in other languages?`}>
                  {data.valid
                    ? `Yes — besides English, ${data.display} is also a valid word in ${otherLangsFull(data)}.`
                    : `Yes. ${data.display} is a valid word in ${otherLangsFull(data)}. It is not valid in English-language Scrabble (NWL2023 or CSW21), but it can be played in Scrabble games that use those languages' dictionaries.`}
                </FaqItem>
              )}
            </div>
          </section>

          {/* FAQPage JSON-LD schema */}
          {faqJsonLd && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
          )}

          {/* BreadcrumbList JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "wordIzy", item: SITE_ORIGIN },
                  { "@type": "ListItem", position: 2, name: "Scrabble Words", item: `${SITE_ORIGIN}/scrabble-words` },
                  { "@type": "ListItem", position: 3, name: `Is ${data.display} a Scrabble Word?`, item: `${SITE_ORIGIN}/scrabble-words/${word}` },
                ],
              }),
            }}
          />

          <ShareButtons
            url={`${SITE_ORIGIN}/scrabble-words/${word}`}
            title={`Is ${data.display} a Valid Scrabble Word?`}
          />

          {/* Internal links */}
          <div className="mt-10 pt-6 border-t border-white/10">
            <h3 className="text-sm font-semibold text-foreground mb-3">Related Tools</h3>
            <div className="flex flex-wrap gap-2">
              <Link href="/scrabble" className="px-3 py-1.5 rounded-md glass-soft text-xs text-foreground/80 hover:text-brand transition-colors">
                Scrabble Word Checker
              </Link>
              <Link href={`/words-starts-with-${word[0]}`} className="px-3 py-1.5 rounded-md glass-soft text-xs text-foreground/80 hover:text-brand transition-colors">
                Words Starting With {word[0].toUpperCase()}
              </Link>
              <Link href={`/unscramble-${data.length}-letter-words`} className="px-3 py-1.5 rounded-md glass-soft text-xs text-foreground/80 hover:text-brand transition-colors">
                {data.length}-Letter Words
              </Link>
              <Link href="/wordlists" className="px-3 py-1.5 rounded-md glass-soft text-xs text-foreground/80 hover:text-brand transition-colors">
                All Word Lists
              </Link>
              <Link href="/dictionary" className="px-3 py-1.5 rounded-md glass-soft text-xs text-foreground/80 hover:text-brand transition-colors">
                Dictionary
              </Link>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}

/** Render a single FAQ item as an H3 + paragraph. */
function FaqItem({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <h3 className="text-sm font-semibold text-foreground">{q}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}

/** One row of the cross-dictionary validity table. */
function DictRow({ dict, region, valid }: { dict: string; region: string; valid: boolean }) {
  return (
    <tr className="border-b border-white/5 last:border-b-0">
      <td className="px-3 py-2 text-foreground font-semibold">{dict}</td>
      <td className="px-3 py-2 text-muted-foreground">{region}</td>
      <td className={`px-3 py-2 font-semibold ${valid ? "text-brand" : "text-muted-foreground/60"}`}>
        {valid ? "Yes" : "No"}
      </td>
    </tr>
  );
}
