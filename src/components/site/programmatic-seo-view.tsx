"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { WordList } from "@/components/site/word-list";
import { ReturnButton } from "@/components/site/back-button";
import { useLanguage } from "@/components/i18n/language-provider";
import { getProgrammaticWordList } from "@/app/actions/dictionary-seo";
import {
  parseWordListSlug,
  buildWordListTitle,
  buildWordListSiblingLinks,
  buildCanonicalWordListUrl,
} from "@/lib/word-list-urls";
import { LANGUAGES, type LanguageCode } from "@/lib/languages";
import type { Translation } from "@/components/i18n/translations";

interface ProgrammaticSEOViewProps {
  slug: string;
}

export function ProgrammaticSEOView({ slug }: ProgrammaticSEOViewProps) {
  const config = parseWordListSlug(slug);
  if (!config) notFound();

  const { t, lang } = useLanguage();
  const def = LANGUAGES[lang as LanguageCode];
  const [dbWords, setDbWords] = useState<{ word: string; score: number }[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function loadWords() {
      setLoading(true);
      const res = await getProgrammaticWordList(config!.type, String(config!.value), lang as LanguageCode);
      if (cancelled) return;
      if (res && res.words) {
        setDbWords(res.words);
        setTotal(res.total);
      } else {
        setDbWords([]);
        setTotal(0);
      }
      setLoading(false);
    }
    loadWords();
    return () => { cancelled = true; };
  }, [slug, lang, config?.type, config?.value]);

  const titleText = buildWordListTitle(config!);
  const siblings = buildWordListSiblingLinks(config!);
  const canonical = buildCanonicalWordListUrl(config!);

  let descriptionText = "";
  if (config!.type === "length") {
    descriptionText = `Browse all ${config!.value}-letter words for Scrabble, Wordle, and anagram puzzles. Filtered by official Scrabble dictionaries, sorted by score.`;
  } else if (config!.type === "starts") {
    descriptionText = `Explore verified Scrabble words that start with the letter "${String(config!.value).toUpperCase()}". Filter by length and score.`;
  } else {
    descriptionText = `Discover verified Scrabble words that end with the letter "${String(config!.value).toUpperCase()}". Filter by length and find hooks.`;
  }

  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <ReturnButton href={siblings.indexHref} label={`Back to ${siblings.familyLabel}`} />
        <div className="text-center text-sm py-12 text-muted-foreground animate-pulse">Loading verified word lists…</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <ReturnButton href={siblings.indexHref} label={`Back to ${siblings.familyLabel}`} />

      <header className="border-b border-white/5 pb-4 space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand">{titleText}</h1>
        <p className="text-sm text-muted-foreground">
          {total.toLocaleString()} words
          {def ? ` · ${def.flag} ${def.nativeName}` : ""}
        </p>
        <p className="text-sm text-muted-foreground">{descriptionText}</p>
      </header>

      <WordList
        words={dbWords as any}
        lang={def as any}
        t={t as Translation}
        emptyMessage="No words found."
        showPageSizeToggle
      />

      {/* Prev / next navigation */}
      <nav className="flex items-center justify-between gap-3 pt-4 border-t border-white/5" aria-label="Pagination">
        {siblings.prev ? (
          <a href={siblings.prev.href} className="inline-flex items-center gap-2 px-3 py-2 rounded-md glass-soft text-sm hover:text-brand transition-colors">
            ← <span>{siblings.prev.label}</span>
          </a>
        ) : (
          <span />
        )}
        <a href={siblings.indexHref} className="text-xs text-muted-foreground hover:text-brand transition-colors">
          {siblings.familyLabel}
        </a>
        {siblings.next ? (
          <a href={siblings.next.href} className="inline-flex items-center gap-2 px-3 py-2 rounded-md glass-soft text-sm hover:text-brand transition-colors">
            <span>{siblings.next.label}</span> →
          </a>
        ) : (
          <span />
        )}
      </nav>

      {/* Return button at bottom */}
      <div className="flex justify-center pt-2">
        <ReturnButton variant="button" href={siblings.indexHref} label={`Back to ${siblings.familyLabel}`} />
      </div>

      <section className="text-xs text-muted-foreground leading-relaxed pt-4">
        <h2 className="text-sm font-semibold text-foreground mb-2">About this word list</h2>
        <p>
          Browse verified, dictionary-checked words for Scrabble, Wordle, and anagram puzzles.
          Use the page-size toggle to show more words per page. Click any word to copy it to your clipboard.
        </p>
        <p className="mt-2">
          Canonical URL: <code className="text-brand">wordizy.com{canonical}</code>
        </p>
      </section>
    </div>
  );
}
