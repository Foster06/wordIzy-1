"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { notFound } from "next/navigation";
import { Search, X, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { WordList } from "@/components/site/word-list";
import { ReturnButton } from "@/components/site/back-button";
import { GlassCard } from "@/components/site/glass-card";
import { Button } from "@/components/ui/button";
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

interface ApiWord { word: string; score: number; }
interface ApiResponse {
  title: string;
  words: ApiWord[];
  total: number;
  offset: number;
  limit: number;
  lengthCounts: Record<number, number>;
}

const PAGE_SIZE = 50;

export function ProgrammaticSEOView({ slug }: ProgrammaticSEOViewProps) {
  const config = parseWordListSlug(slug);
  if (!config) notFound();

  const { t, lang } = useLanguage();
  const def = LANGUAGES[lang as LanguageCode];
  const [words, setWords] = useState<ApiWord[]>([]);
  const [total, setTotal] = useState(0);
  const [lengthCounts, setLengthCounts] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);  // only for the INITIAL load (full-page spinner)
  const [loadingMore, setLoadingMore] = useState(false);
  const [filtering, setFiltering] = useState(false);  // for search/length filter changes (no full-page spinner)
  const [error, setError] = useState<string | null>(null);
  const [activeLength, setActiveLength] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isFirstLoad = useRef(true);

  // Debounce the search query so we don't fetch on every keystroke.
  // This preserves input focus — previously every keystroke triggered a
  // fetch + re-render which stole focus from the input.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

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

  // Fetch words from the API with server-side pagination + filtering.
  const fetchWords = useCallback(async (reset: boolean) => {
    if (reset) {
      // Only show the full-page spinner on the very first load.
      // On search/length filter changes, use `filtering` instead so the
      // search input stays mounted and focused.
      if (isFirstLoad.current) {
        setLoading(true);
        isFirstLoad.current = false;
      } else {
        setFiltering(true);
      }
      setOffset(0);
    } else {
      setLoadingMore(true);
    }
    setError(null);

    try {
      const params = new URLSearchParams({
        slug,
        lang: String(lang),
        limit: String(PAGE_SIZE),
        offset: reset ? "0" : String(offset),
      });
      if (activeLength !== "all") params.set("length", String(activeLength));
      if (debouncedSearch.trim()) params.set("q", debouncedSearch.trim());

      const res = await fetch(`/api/word-list?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: ApiResponse = await res.json();

      if (reset) {
        setWords(data.words);
      } else {
        setWords((prev) => [...prev, ...data.words]);
      }
      setTotal(data.total);
      setLengthCounts(data.lengthCounts ?? {});
    } catch (err) {
      console.error("Failed to load words:", err);
      setError(t.wordListPage.error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setFiltering(false);
    }
  }, [slug, lang, activeLength, debouncedSearch, offset]);

  // Initial load + reload when filters change.
  // IMPORTANT: we depend on debouncedSearch (not searchQuery) so the fetch
  // only fires after the user stops typing for 300ms. This preserves input focus.
  useEffect(() => {
    fetchWords(true);
  }, [slug, lang, activeLength, debouncedSearch, fetchWords]);

  const canLoadMore = words.length < total;

  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <ReturnButton href={siblings.indexHref} label={`Back to ${siblings.familyLabel}`} />
        <div role="status" aria-live="polite" className="text-center text-sm py-12 text-muted-foreground animate-pulse flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          {t.wordListPage.loading}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <ReturnButton href={siblings.indexHref} label={`Back to ${siblings.familyLabel}`} />
        <div role="alert" aria-live="assertive" className="text-center text-sm py-12 text-rose-300">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <ReturnButton href={siblings.indexHref} label={`Back to ${siblings.familyLabel}`} />

      <header className="border-b border-white/5 pb-4 space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand">{titleText}</h1>
        <p className="text-sm text-muted-foreground">
          {total.toLocaleString()} {t.wordListPage.wordsCount}
          {def ? ` · ${def.flag} ${def.nativeName}` : ""}
        </p>
        <p className="text-sm text-muted-foreground">{descriptionText}</p>
      </header>

      {/* Search bar — server-side filter */}
      <div className="sticky top-16 z-20 -mx-2 px-2 py-2 bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-2 rounded-md glass-soft border border-white/10 px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden />
          <input
            ref={searchInputRef}
            key="word-filter-input"
            type="search"
            inputMode="search"
            autoComplete="off"
            spellCheck={false}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.wordListPage.filterPlaceholder}
            className="flex-1 h-8 bg-transparent text-sm outline-none uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal"
            aria-label={t.wordListPage.filterLabel}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="p-1 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground cursor-pointer"
              aria-label={t.wordListPage.clearFilter}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Length filter buttons (only on starts/ends pages) */}
      {config!.type !== "length" && (
        <div className="flex flex-wrap gap-2" role="group" aria-label={t.wordListPage.filterByLength}>
          <button
            type="button"
            onClick={() => setActiveLength("all")}
            aria-pressed={activeLength === "all"}
            className={cn(
              "h-10 px-3 rounded-md flex items-center justify-center text-sm font-semibold transition-colors cursor-pointer",
              activeLength === "all" ? "bg-brand text-background" : "glass-soft text-foreground/80 hover:text-brand"
            )}
          >
            {t.wordListPage.allLengths}
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
                aria-pressed={activeLength === n}
                aria-disabled={disabled}
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

      {/* Word list (only the currently-fetched page) */}
      <WordList
        words={words as any}
        lang={def as any}
        t={t as Translation}
        emptyMessage={searchQuery || activeLength !== "all" ? t.wordListPage.noMatch : t.wordListPage.noWords}
      />

      {/* Load more button — fetches the next page from the server */}
      {canLoadMore && (
        <div className="flex justify-center">
          <Button
            onClick={() => fetchWords(false)}
            disabled={loadingMore}
            variant="ghost"
            className="gap-2 glass-soft rounded-md h-10 px-6"
          >
            {loadingMore ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t.common.loading}
              </>
            ) : (
              <>
                {t.wordListPage.loadMore} ({(total - words.length).toLocaleString()} {t.wordListPage.remaining})
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}

      {/* Prev / next sibling navigation */}
      <nav className="flex items-center justify-between gap-3 pt-4 border-t border-white/5" aria-label="Pagination">
        {siblings.prev ? (
          <a href={siblings.prev.href} className="inline-flex items-center gap-2 px-3 py-2 rounded-md glass-soft text-sm hover:text-brand transition-colors">
            <ChevronLeft className="h-4 w-4" />
            <span>{siblings.prev.label}</span>
          </a>
        ) : (
          <span />
        )}
        <a href={siblings.indexHref} className="text-xs text-muted-foreground hover:text-brand transition-colors">
          {siblings.familyLabel}
        </a>
        {siblings.next ? (
          <a href={siblings.next.href} className="inline-flex items-center gap-2 px-3 py-2 rounded-md glass-soft text-sm hover:text-brand transition-colors">
            <span>{siblings.next.label}</span>
            <ChevronRight className="h-4 w-4" />
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
        <h2 className="text-sm font-semibold text-foreground mb-2">{t.wordListPage.aboutTitle}</h2>
        <p>
          {t.wordListPage.aboutBody}
        </p>
        <p className="mt-2">
          {t.wordListPage.canonicalUrl} <code className="text-brand">wordizy.com{canonical}</code>
        </p>
      </section>
    </div>
  );
}
