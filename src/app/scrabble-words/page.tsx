import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ReturnButton } from "@/components/site/back-button";
import {
  getSampleValidWords,
  getScrabbleWordData,
} from "@/lib/scrabble-word-data";

export const metadata: Metadata = {
  title: "Scrabble Words — Is It Valid? Check Any Word (NWL2023 + CSW21)",
  description:
    "Check whether any word is valid in Scrabble. Browse valid Scrabble words by length (2-8 letters) with points and definitions. Covers NWL2023 (Tournament Word List) and CSW21 (Collins Scrabble Words).",
  alternates: { canonical: "https://wordizy.com/scrabble-words" },
  openGraph: {
    title: "Scrabble Words — Is It Valid? Check Any Word (NWL2023 + CSW21)",
    description:
      "Check whether any word is valid in Scrabble. Browse valid Scrabble words by length with points and definitions.",
    url: "https://wordizy.com/scrabble-words",
    siteName: "wordIzy",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Scrabble Words — wordIzy" }],
  },
};

const LENGTHS = [2, 3, 4, 5, 6, 7, 8];
const SAMPLE_PER_LENGTH = 24;

export default async function ScrabbleWordsIndexPage() {
  // Build a sample of valid words per length, with their points.
  const samplesByLength = LENGTHS.map((len) => {
    const words = getSampleValidWords(len, SAMPLE_PER_LENGTH);
    return {
      len,
      words: words.map((w) => {
        const data = getScrabbleWordData(w);
        return { word: w, display: data.display, points: data.points };
      }),
    };
  });

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-8 sm:py-12">
        <ReturnButton href="/" label="Back to Home" />

        <article className="mt-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight text-gradient-brand">
            Is It a Valid Scrabble Word?
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            Every word in the official Scrabble dictionaries (NWL2023 for North
            America, CSW21 for international play) has a dedicated page showing
            whether it&apos;s valid, its Scrabble point value, its definition, and a
            per-letter points breakdown. Browse by word length below, or search
            for a specific word in the URL bar — for example,{" "}
            <Link href="/scrabble-words/qi" className="text-brand underline underline-offset-2">
              /scrabble-words/qi
            </Link>{" "}
            or{" "}
            <Link href="/scrabble-words/zave" className="text-brand underline underline-offset-2">
              /scrabble-words/zave
            </Link>{" "}
            (which is not valid — see why).
          </p>

          {/* Length sections */}
          <div className="space-y-10">
            {samplesByLength.map(({ len, words }) => (
              <section key={len}>
                <h2 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                  {len}-Letter Scrabble Words
                </h2>
                <p className="text-xs text-muted-foreground mb-4">
                  A sample of valid {len}-letter Scrabble words. Click any word
                  for its points, definition, and full validity details.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {words.map(({ word, display, points }) => (
                    <Link
                      key={word}
                      href={`/scrabble-words/${word}`}
                      className="px-3 py-2 rounded-md glass-soft text-xs text-foreground/90 hover:text-brand hover:border-brand/30 border border-white/10 transition-colors flex items-center justify-between"
                    >
                      <span className="font-mono font-semibold">{display}</span>
                      <span className="text-muted-foreground">{points}pts</span>
                    </Link>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  <Link
                    href={`/unscramble-${len}-letter-words`}
                    className="text-brand underline underline-offset-2"
                  >
                    Browse all {len}-letter Scrabble words →
                  </Link>
                </p>
              </section>
            ))}
          </div>

          {/* What counts as valid */}
          <section className="mt-12 pt-6 border-t border-white/10">
            <h2 className="text-xl font-bold text-foreground mb-3 tracking-tight">
              What Counts as a Valid Scrabble Word?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Scrabble accepts words that appear in at least one of two official
              dictionaries:
            </p>
            <ul className="list-disc pl-6 my-3 space-y-1.5 text-sm text-muted-foreground leading-relaxed">
              <li>
                <strong className="text-foreground">NWL2023</strong> (NASPA Word
                List, formerly TWL) — the official dictionary for North American
                Scrabble tournament play. About 196,000 words.
              </li>
              <li>
                <strong className="text-foreground">CSW21</strong> (Collins
                Scrabble Words, 2021 edition) — the official dictionary for
                international Scrabble play (everywhere except North America).
                About 279,000 words; includes British and international English
                not in the NWL.
              </li>
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed mt-4">
              Words excluded from both dictionaries include proper nouns (names,
              places, brands), abbreviations, prefixes and suffixes used alone,
              hyphenated forms, and words requiring capitalization or
              punctuation. If a word is valid in one dictionary but not the
              other, the per-word page notes which dictionary accepts it.
            </p>
          </section>

          {/* Related tools */}
          <div className="mt-10 pt-6 border-t border-white/10">
            <h3 className="text-sm font-semibold text-foreground mb-3">Related Tools</h3>
            <div className="flex flex-wrap gap-2">
              <Link href="/scrabble" className="px-3 py-1.5 rounded-md glass-soft text-xs text-foreground/80 hover:text-brand transition-colors">
                Scrabble Word Checker
              </Link>
              <Link href="/wordlists" className="px-3 py-1.5 rounded-md glass-soft text-xs text-foreground/80 hover:text-brand transition-colors">
                All Word Lists
              </Link>
              <Link href="/dictionary" className="px-3 py-1.5 rounded-md glass-soft text-xs text-foreground/80 hover:text-brand transition-colors">
                Dictionary
              </Link>
              <Link href="/wordle" className="px-3 py-1.5 rounded-md glass-soft text-xs text-foreground/80 hover:text-brand transition-colors">
                Wordle Solver
              </Link>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
