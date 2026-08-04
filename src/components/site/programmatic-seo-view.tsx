"use client";

import { useEffect, useMemo, useState } from "react";
import { notFound } from "next/navigation";
import { Search, X } from "lucide-react";
import { WordList } from "@/components/site/word-list";
import { ReturnButton } from "@/components/site/back-button";
import { useLanguage } from "@/components/i18n/language-provider";
import {
  parseWordListSlug,
  buildWordListTitle,
  buildWordListSiblingLinks,
  buildCanonicalWordListUrl,
  WORD_LIST_LENGTHS,
} from "@/lib/word-list-urls";
import { LANGUAGES, type LanguageCode } from "@/lib/languages";
import type { Translation } from "@/components/i18n/translations";
import { cn } from "@/lib/utils";

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
  const [error, setError] = useState<string | null>(null);
  const [activeLength, setActiveLength] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function loadWords() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/word-list?slug=${encodeURIComponent(slug)}&lang=${encodeURIComponent(lang as string)}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        if (data && Array.isArray(data.words)) {
          setDbWords(data.words);
          setTotal(data.total ?? data.words.length);
        } else {
          setDbWords([]);
          setTotal(0);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load words:", err);
          setError("Failed to load words. Please refresh.");
          setDbWords([]);
          setTotal(0);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadWords();
    return () => { cancelled = true; };
  }, [slug, lang]);

  // Length counts for the filter buttons (only show on starts/ends pages)
  const lengthCounts = useMemo<Record<number, number>>(() => {
    const counts: Record<number, number> = {};
    if (!config || config.type === "length") return counts;
    for (const w of dbWords) {
      const len = w.word.length;
      if (len >= 2 && len <= 15) counts[len] = (counts[len] ?? 0) + 1;
    }
    return counts;
  }, [dbWords, config]);

  // Filtered words: apply length filter + search query
  const displayedWords = useMemo(() => {
    let list = dbWords;
    if (config && config.type !== "length" && activeLength !== "all") {
      list = list.filter((w) => w.word.length === activeLength);
    }
    const q = searchQuery.trim().toLowerCase();
    if (q) list = list.filter((w) => w.word.toLowerCase().includes(q));
    return list;
  }, [dbWords, activeLength, searchQuery, config]);

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

  if (error) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <ReturnButton href={siblings.indexHref} label={`Back to ${siblings.familyLabel}`} />
        <div className="text-center text-sm py-12 text-rose-300">{error}</div>
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

      {/* Search bar — filter words by substring */}
      <div className="sticky top-16 z-20 -mx-2 px-2 py-2 bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-2 rounded-md glass-soft border border-white/10 px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden />
          <input
            type="search"
            inputMode="search"
            autoComplete="off"
            spellCheck={false}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter words…"
            className="flex-1 h-8 bg-transparent text-sm outline-none uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal"
            aria-label="Filter words"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="p-1 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground cursor-pointer"
              aria-label="Clear filter"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Length filter buttons (only on starts/ends pages, not length pages) */}
      {config!.type !== "length" && (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveLength("all")}
            className={cn(
              "h-10 px-3 rounded-md flex items-center justify-center text-sm font-semibold transition-colors cursor-pointer",
              activeLength === "all" ? "bg-brand text-background" : "glass-soft text-foreground/80 hover:text-brand"
            )}
          >
            All
          </button>
          {WORD_LIST_LENGTHS.map((n) => {
            const count = lengthCounts[n] ?? 0;
            const disabled = count === 0;
            return (
              <button
                key={n}
                type="button"
                tabIndex={disabled ? -1 : 0}
                disabled={disabled}
                onClick={() => !disabled && setActiveLength(n)}
                className={cn(
                  "h-10 w-12 rounded-md flex flex-col items-center justify-center gap-0.5 transition-colors",
                  disabled && "opacity-30 cursor-not-allowed",
                  activeLength === n
                    ? "bg-brand text-background"
                    : disabled
                      ? "glass-soft text-muted-foreground"
                      : "glass-soft text-foreground/80 hover:text-brand cursor-pointer"
                )}
              >
                <span className="num-button !text-[13px]">{n}</span>
                <span className="text-[9px] font-bold tabular-nums opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Word list with page-size toggle */}
      <WordList
        words={displayedWords as any}
        lang={def as any}
        t={t as Translation}
        emptyMessage={searchQuery || activeLength !== "all" ? "No words match your filter." : "No words found."}
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
          Use the length filter and search box to narrow results. Click any word to copy it.
        </p>
        <p className="mt-2">
          Canonical URL: <code className="text-brand">wordizy.com{canonical}</code>
        </p>
      </section>
    </div>
  );
}
