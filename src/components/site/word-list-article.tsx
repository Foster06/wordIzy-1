"use client";

// src/components/site/word-list-article.tsx
//
// Educational SEO article rendered beneath every programmatic word-list page
// (/words-starts-with-q, /words-ends-with-a, /wordle-words-starts-with-q,
// /unscramble-5-letter-words, legacy /unscramble/<slug>). Google's AdSense
// quality-content criterion rewards pages with 300-400 words of original,
// expert text over "thin tool" pages — this component composes exactly that:
//
//   1. a per-language, per-letter unique article title + strategy prose
//      (WORD_LIST_ARTICLES data — genuinely contextual, not translations)
//   2. LIVE tile economics interpolated from LANGUAGES[lang].letterValues
//      (the letter's real score, real tile count, real double/triple yields)
//   3. REAL top-scoring words with live scores from the dictionary
//      (SSR-seeded for English, client-refetched per language change)
//   4. a Wordle overlay paragraph on dict === "wordle" pages
//
// The article is rendered client-side so it reacts to language switching,
// but the SSR seed (English words + totals) is embedded in the initial HTML
// so crawlers see the full article on first paint.

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/i18n/language-provider";
import { LANGUAGES, type LanguageCode } from "@/lib/languages";
import { WORD_LIST_ARTICLES } from "@/lib/word-list-articles";
import type { WordListConfig } from "@/lib/word-list-urls";

export interface TopWord {
  word: string;
  score: number;
}

interface WordListArticleProps {
  /** Parsed slug config (type + value + dict). */
  config: WordListConfig;
  /** The canonical slug (used to refetch top words when language changes). */
  slug: string;
  /** SSR-seeded top words (English, computed server-side by page.tsx). */
  initialTopWords: TopWord[];
  /** Total word count for the page (from initialData.total). */
  total: number;
}

/** Interpolate placeholders in a template string. */
function fill(tpl: string, vars: Record<string, string>): string {
  return tpl.replace(/\{(\w+)\}/g, (m, key) =>
    key in vars ? vars[key] : m,
  );
}

export function WordListArticle({
  config,
  slug,
  initialTopWords,
  total,
}: WordListArticleProps) {
  const { lang } = useLanguage();
  const [topWords, setTopWords] = useState<TopWord[]>(initialTopWords);

  // Refetch the top-scoring words when the site language changes so the
  // examples come from THAT language's dictionary (mirrors the word-list
  // fetch pattern in ProgrammaticSEOView).
  useEffect(() => {
    if (lang === "en") return; // SSR seed is already English
    let cancelled = false;
    fetch(`/api/word-list?slug=${encodeURIComponent(slug)}&lang=${lang}&sort=score&limit=10`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data?.words?.length) return;
        setTopWords(data.words as TopWord[]);
      })
      .catch(() => {
        /* keep the SSR seed */
      });
    return () => {
      cancelled = true;
    };
  }, [lang, slug]);

  // ── Resolve the per-language content (fall back to EN when missing) ──────
  const langKey = (["en", "fr", "es", "de", "it", "pt", "nl", "ja", "zh"].includes(lang)
    ? lang
    : "en") as LanguageCode;
  const content = WORD_LIST_ARTICLES[langKey] ?? WORD_LIST_ARTICLES.en;
  if (!content) return null;

  // ── Length pages get their own article shape ─────────────────────────────
  const isLengthPage = config.type === "length";
  const n = String(config.value);
  const laneNote =
    Number(n) <= 3
      ? "slip into lanes that longer words cannot reach"
      : "thread between blocked zones on the board";

  // ── Letter pages: per-letter unique prose ────────────────────────────────
  const letterKey = String(config.value).toLowerCase();
  const letterProse = content.letters[letterKey];
  if (!isLengthPage && !letterProse) return null;

  // ── Live tile economics from the language's real tile values ──────────────
  const tileScore = LANGUAGES[langKey].letterValues[letterKey.toUpperCase()] ?? 1;
  const tileCount = LANGUAGES[langKey].tileCounts[letterKey.toUpperCase()] ?? 1;
  const tileVars: Record<string, string> = {
    letter: letterKey,
    Letter: letterKey.toUpperCase(),
    score: String(tileScore),
    count: String(tileCount),
    double: String(tileScore * 2),
    triple: String(tileScore * 3),
    // {s} / {plural}: pluralize the SCORE noun ("10 points", "1 point")
    s: tileScore > 1 ? "s" : "",
    plural: tileScore > 1 ? "s" : "",
    // {tileWord} / {motTuile} / {palabraFicha} / {steinWort}: "tile"/"tiles" per count
    tileWord: tileCount > 1 ? "tiles" : "tile",
    motTuile: tileCount > 1 ? "tuiles" : "tuile",
    palabraFicha: tileCount > 1 ? "fichas" : "ficha",
    steinWort: tileCount > 1 ? "Steine" : "Stein",
  };

  // ── Title ────────────────────────────────────────────────────────────────
  const angle = isLengthPage ? "" : letterProse!.title;
  const title = isLengthPage
    ? `${n}-Letter Words That Win Games`
    : fill(content.titleTemplate, { angle });

  // ── Assemble the paragraphs ─────────────────────────────────────────────
  const lead = isLengthPage
    ? fill(content.lengthsLead, { n, total: String(total), laneNote })
    : fill(config.type === "ends" ? content.endsLead : content.startsLead, {
        letter: letterKey,
        total: String(total),
      });

  const body = isLengthPage
    ? content.lengths[n] ?? ""
    : config.type === "ends"
      ? letterProse!.ends
      : letterProse!.starts;

  const tilePara = isLengthPage ? "" : fill(content.tileTemplate, tileVars);

  const topHeading = fill(content.topWordsHeading, {
    Letter: letterKey.toUpperCase(),
  });

  const closing = fill(content.closing, { letter: letterKey });

  return (
    <section
      className="mt-10 max-w-2xl mx-auto space-y-4 text-sm text-muted-foreground leading-relaxed"
      aria-label="Strategy guide"
    >
      <h2 className="text-lg font-bold text-foreground">{title}</h2>

      <p>{lead}</p>
      {body && <p>{body}</p>}
      {isLengthPage && (
        <p>
          The bingo bonus is the biggest single swing in Scrabble: playing all seven
          tiles in one turn earns +50 points on top of the word score, and {n}-letter
          words are the exact length that unlocks it. The live list above shows every
          valid {n}-letter word with its actual point value — filter by score to find
          the plays that turn a modest rack into a game-winning bingo, and study the
          top scorers because they appear in real games far more often than the
          dictionary's exotic deep-cuts.
        </p>
      )}
      {tilePara && <p>{tilePara}</p>}

      {topWords.length > 0 && (
        <>
          <h3 className="text-base font-semibold text-foreground pt-2">{topHeading}</h3>
          <p>{fill(content.topWordsLead, { letter: letterKey })}</p>
          <ul className="flex flex-wrap gap-2 list-none pl-0">
            {topWords.map((w) => (
              <li
                key={w.word}
                className="word-chip !py-1 !px-2.5 text-xs"
                title={`${w.word} — ${w.score} points`}
              >
                <span className="font-semibold text-foreground">{w.word}</span>
                <span className="text-brand font-bold tabular-nums ml-1">{w.score}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      <p className="pt-1">{closing}</p>

      {/* Wordle overlay — only on /wordle-words-* pages */}
      {config.dict === "wordle" && (
        <p className="text-xs bg-brand/5 border border-brand/15 rounded-lg p-3">
          {fill(content.wordleNote, { letter: letterKey })}
        </p>
      )}
    </section>
  );
}
