"use client";


import { useEffect, useState, useCallback, useRef } from "react";
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
  ALPHABET_LOWER,
  ALPHABET_UPPER,
} from "@/lib/word-list-urls";
import { LANGUAGES, type LanguageCode } from "@/lib/languages";
import type { Translation } from "@/components/i18n/translations";
import { cn } from "@/lib/utils";
import type { InitialWordListPage } from "@/lib/word-list-data";

interface ProgrammaticSEOViewProps {
  slug: string;
  // Server-fetched initial page (50 words, alpha sort). When provided, the
  // view renders immediately WITHOUT a loading spinner — the words are already
  // in the SSR'd HTML. The client only fetches for "Load more" / filter changes.
  initialData?: InitialWordListPage | null;
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

export function ProgrammaticSEOView({ slug, initialData }: ProgrammaticSEOViewProps) {
  const config = parseWordListSlug(slug);

  if (!config) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <ReturnButton href="/" label="Back to Home" />
        <div className="text-center text-sm py-12 text-muted-foreground">Word list not found.</div>
      </div>
    );
  }

  const { t, lang } = useLanguage();
  const def = LANGUAGES[lang as LanguageCode];
  // SSR seed: if the server pre-rendered the first 50 words, use them as the
  // initial state. This eliminates the loading spinner on first paint.
  const hasInitialData = !!initialData && initialData.words.length > 0;
  const [words, setWords] = useState<ApiWord[]>(hasInitialData ? initialData!.words : []);
  const [total, setTotal] = useState<number>(hasInitialData ? initialData!.total : 0);
  const [lengthCounts, setLengthCounts] = useState<Record<number, number>>(
    hasInitialData ? initialData!.lengthCounts : {},
  );
  // Only show the spinner if the server did NOT provide initial data.
  const [loading, setLoading] = useState(!hasInitialData);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeLength, setActiveLength] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [sortMode, setSortMode] = useState<"alpha" | "score">("alpha");
  const [jumpLetter, setJumpLetter] = useState<string | "all">("all");
  const searchInputRef = useRef<HTMLInputElement>(null);
  // Initialize wordsRef with SSR data so "Load more" starts at offset 50
  // (not 0) when the server already pre-rendered the first page.
  const wordsRef = useRef<ApiWord[]>(hasInitialData ? initialData!.words : []);

  // Debounce the search query so we don't fetch on every keystroke.
  // This preserves input focus — previously every keystroke triggered a
  // fetch + re-render which stole focus from the input.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const titleText = buildWordListTitle(config);
  const siblings = buildWordListSiblingLinks(config);
  const canonical = buildCanonicalWordListUrl(config);

  let descriptionText = "";
  if (config.type === "length") {
    descriptionText = `Browse all ${config.value}-letter words for Scrabble, Wordle, and anagram puzzles. Filtered by official Scrabble dictionaries, sorted by score.`;
  } else if (config.type === "starts") {
    descriptionText = `Explore verified Scrabble words that start with the letter "${String(config.value).toUpperCase()}". Filter by length and score.`;
  } else {
    descriptionText = `Discover verified Scrabble words that end with the letter "${String(config.value).toUpperCase()}". Filter by length and find hooks.`;
  }

  const fetchWords = useCallback(async (reset: boolean) => {
    if (reset) {
      setLoading(true);
      setOffset(0);
    } else {
      setLoadingMore(true);
    }
    setError(null);

    try {
      // Use the ref length so we always know the true current offset,
      // even when "Load more" is clicked before the next render flushes.
      // Previously this read the `offset` state, which was still 0 on the
      // first load-more click — causing the same first page to be re-fetched.
      const currentOffset = reset ? 0 : wordsRef.current.length;
      const params = new URLSearchParams({
        slug,
        lang: String(lang),
        limit: String(PAGE_SIZE),
        offset: String(currentOffset),
      });
      params.set("sort", sortMode);
      if (config.type === "length" && jumpLetter !== "all") params.set("startsWith", jumpLetter);
      if (activeLength !== "all") params.set("length", String(activeLength));
      if (debouncedSearch.trim()) params.set("q", debouncedSearch.trim());

      const res = await fetch(`/api/word-list?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: ApiResponse = await res.json();

      if (reset) {
        setWords(data.words);
        wordsRef.current = data.words;
      } else {
        const combined = [...wordsRef.current, ...data.words];
        setWords(combined);
        wordsRef.current = combined;
        setOffset(combined.length);
      }
      setTotal(data.total);
      setLengthCounts(data.lengthCounts ?? {});
    } catch (err) {
      console.error("Failed to load words:", err);
      setError(t.wordListPage.error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [slug, lang, activeLength, debouncedSearch, sortMode, jumpLetter, t]);

  // Initial load + reload when filters change.
  // On the very first mount, if SSR provided initialData AND the user's
  // selected language matches the SSR data's language (English), we skip the
  // fetch — the words are already in state. If the user has a different
  // language selected (read from localStorage after hydration), we refetch.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // SSR data is always English. Skip the refetch only if the user is on English.
      if (hasInitialData && lang === "en") return;
    }
    fetchWords(true);
  }, [slug, lang, activeLength, debouncedSearch, sortMode, jumpLetter]);

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
      {config.type !== "length" && (
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

      {/* Sort toggle: A→Z / Score */}
      <div className="flex items-center gap-2" role="group" aria-label="Sort">
        <button
          type="button"
          onClick={() => setSortMode("alpha")}
          aria-pressed={sortMode === "alpha"}
          className={cn(
            "h-8 px-3 rounded-md text-xs font-semibold transition-colors cursor-pointer",
            sortMode === "alpha" ? "bg-brand text-background" : "glass-soft text-foreground/80 hover:text-brand"
          )}
        >
          A→Z
        </button>
        <button
          type="button"
          onClick={() => setSortMode("score")}
          aria-pressed={sortMode === "score"}
          className={cn(
            "h-8 px-3 rounded-md text-xs font-semibold transition-colors cursor-pointer",
            sortMode === "score" ? "bg-brand text-background" : "glass-soft text-foreground/80 hover:text-brand"
          )}
        >
          Score
        </button>
      </div>

      {/* Alphabet jump bar (only on length pages) */}
      {config.type === "length" && (
        <div className="flex flex-wrap gap-1" role="group" aria-label="Filter by starting letter">
          <button
            type="button"
            onClick={() => setJumpLetter("all")}
            aria-pressed={jumpLetter === "all"}
            className={cn(
              "h-8 px-2 rounded-md text-xs font-semibold transition-colors cursor-pointer",
              jumpLetter === "all" ? "bg-brand text-background" : "glass-soft text-foreground/80 hover:text-brand"
            )}
          >
            All
          </button>
          {ALPHABET_LOWER.map((letter, i) => (
            <button
              key={letter}
              type="button"
              onClick={() => setJumpLetter(letter)}
              aria-pressed={jumpLetter === letter}
              className={cn(
                "h-8 w-7 rounded-md text-xs font-semibold transition-colors cursor-pointer uppercase",
                jumpLetter === letter ? "bg-brand text-background" : "glass-soft text-foreground/80 hover:text-brand"
              )}
            >
              {ALPHABET_UPPER[i]}
            </button>
          ))}
        </div>
      )}

      {/* Word list (only the currently-fetched page) */}
      <WordList
        words={words as any}
        lang={def as any}
        t={t as Translation}
        pageSize={words.length}
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
