"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Copy, Check, Share2, Star } from "lucide-react";
import type { SolvedWord } from "@/lib/unscramble";
import type { LanguageDef } from "@/lib/languages";
import { GlassCard } from "./glass-card";
import { Button } from "@/components/ui/button";
import type { Translation } from "@/components/i18n/translations";
import { logPrivateEvent } from "@/lib/private-tracker";
import { useWordVault } from "@/hooks/use-word-vault";

interface WordListProps {
  words: SolvedWord[];
  lang: LanguageDef;
  t: Translation;
  emptyMessage?: string;
  pageSize?: number;
  maxVisible?: number;
  showPageSizeToggle?: boolean;
}

function fontSizeForLen(len: number): string {
  // Fixed 16px for all word lengths — consistent, readable, fits container.
  void len;
  return "!text-[16px]";
}

/** Flat list of solved words as Scrabble tiles in a 4-col grid.
 *  Paginates at 50 words per page with prev/next. */
export function WordList({
  words: initialWords,
  lang,
  t,
  emptyMessage,
  pageSize: initialPageSize = 50,
  maxVisible,
  showPageSizeToggle = false,
}: WordListProps & { showPageSizeToggle?: boolean }) {
  void lang;
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  // Sync internal pagination whenever the parent passes a new pageSize
  // (e.g. when the loaded word count changes). Wrapped in Promise.resolve
  // so the state update happens in a microtask — avoiding sync re-renders
  // during the parent's render phase.
  useEffect(() => {
    Promise.resolve().then(() => {
      setPageSize(initialPageSize);
      setPage(0);
    });
  }, [initialPageSize]);
  const [copied, setCopied] = useState(false);
  const [copiedCell, setCopiedCell] = useState<string | null>(null);
  const { favorites, toggleFavorite } = useWordVault();

  const words = maxVisible ? initialWords.slice(0, maxVisible) : initialWords;

  if (words.length === 0) {
    return (
      <GlassCard className="p-8 text-center text-muted-foreground text-sm">
        {emptyMessage ?? t.common.noResults}
      </GlassCard>
    );
  }

  const totalPages = Math.max(1, Math.ceil(words.length / pageSize));
  const safePage = Math.min(page, totalPages - 1);
  const start = safePage * pageSize;
  const shown = words.slice(start, start + pageSize);

  const copyAll = () => {
    const text = words.map((w) => w.word.toUpperCase()).join("\n");
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      logPrivateEvent(`bulk_list_length_${words.length}`, "word-list-bulk", lang?.code || "en", "copy");
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  const handleCellClick = (wordText: string) => {
    const uppercaseWord = wordText.toUpperCase();
    navigator.clipboard?.writeText(uppercaseWord).then(() => {
      setCopiedCell(wordText);
      logPrivateEvent(wordText.toLowerCase(), "word-list-item", lang?.code || "en", "copy");
      setTimeout(() => setCopiedCell(null), 1500);
    }).catch(() => {});
  };

  const shareAll = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "https://wordizy.com";
    const text = `${words.length} words from wordIzy:\n${words.map((w) => w.word.toUpperCase()).join(", ")}\n\nTry it: ${url}`;
    if (navigator.share) {
      try { await navigator.share({ title: "wordIzy results", text, url }); } catch { /* cancelled */ }
    } else {
      navigator.clipboard?.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <GlassCard className="p-4 sm:p-5 result-card">
      <span className="sr-only" aria-live="polite" role="status">{copiedCell ? `Copied ${copiedCell.toUpperCase()}` : ""}</span>
      <div className="flex items-center justify-center gap-3 mb-3 text-center flex-wrap">
        <span className="text-xs text-muted-foreground">{words.length} {t.common.wordsCount}</span>
        {totalPages > 1 && <span className="text-xs text-muted-foreground tabular-nums">{safePage + 1} / {totalPages}</span>}
        {showPageSizeToggle && words.length > 50 && (
          <div className="flex items-center gap-1 text-[11px]">
            <span className="text-muted-foreground">Per page:</span>
            {[50, 100, 200, 500].filter((n) => n <= words.length).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => { setPageSize(n); setPage(0); }}
                className={`px-1.5 py-0.5 rounded text-[10px] tabular-nums transition-colors cursor-pointer ${
                  pageSize === n ? "bg-brand text-background font-semibold" : "glass-soft text-muted-foreground hover:text-brand"
                }`}
                aria-pressed={pageSize === n}
              >
                {n}
              </button>
            ))}
            {words.length > 500 && (
              <button
                type="button"
                onClick={() => { setPageSize(words.length); setPage(0); }}
                className={`px-1.5 py-0.5 rounded text-[10px] transition-colors cursor-pointer ${
                  pageSize === words.length ? "bg-brand text-background font-semibold" : "glass-soft text-muted-foreground hover:text-brand"
                }`}
                aria-pressed={pageSize === words.length}
              >
                All ({words.length.toLocaleString()})
              </button>
            )}
          </div>
        )}
        <div className="ml-auto flex items-center gap-1.5">
          <button onClick={shareAll} className="text-muted-foreground hover:text-brand transition-colors cursor-pointer" title="Share" aria-label="Share results">
            <Share2 className="h-3.5 w-3.5" />
          </button>
          <button onClick={copyAll} className="text-muted-foreground hover:text-brand transition-colors cursor-pointer" title={t.common.copy} aria-label={t.common.copy}>
            {copied ? <Check className="h-3.5 w-3.5 text-brand" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 justify-items-stretch text-center">
        {shown.map((w) => {
          const cleanWord = w.word.toUpperCase();
          const isFav = favorites?.includes(cleanWord) ?? false;
          return (
            <div
              key={w.word}
              className="word-cell flex flex-col items-center justify-center gap-0.5 rounded-md px-2 py-1.5 hover:bg-brand/10 hover:border-brand/30 transition-colors min-w-0 w-full group"
              title={`Click to copy: ${w.word.toUpperCase()} · ${w.score} ${t.common.points}`}
            >
              <button
                type="button"
                onClick={() => handleCellClick(w.word)}
                className="flex w-full min-w-0 cursor-pointer justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 rounded"
                aria-label={`Copy ${w.word}`}
              >
                <span className={`word-item uppercase tracking-wide text-center w-full overflow-hidden text-ellipsis whitespace-nowrap group-hover:text-brand transition-colors ${fontSizeForLen(w.word.length)}`}>
                  {w.word}
                </span>
              </button>
              <div className="flex items-center justify-center gap-1.5 leading-none">
                <span className="text-[10px] font-bold text-brand tabular-nums shrink-0">
                  {copiedCell === w.word ? <Check className="h-3 w-3 text-green-500 animate-scale" /> : w.score}
                </span>
                {toggleFavorite && (
                  <button
                    type="button"
                    onClick={() => toggleFavorite(cleanWord)}
                    aria-label={isFav ? `Remove ${cleanWord} from vault` : `Save ${cleanWord} to vault`}
                    aria-pressed={isFav}
                    title={isFav ? "Saved" : "Save to vault"}
                    className={`shrink-0 p-0 rounded transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${
                      isFav
                        ? "text-amber-500"
                        : "text-muted-foreground/60 group-hover:text-muted-foreground/60 hover:text-amber-500"
                    }`}
                  >
                    <Star className={`h-3 w-3 ${isFav ? "fill-amber-500" : ""}`} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2 pt-3 border-t border-white/5">
          <Button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={safePage === 0} variant="ghost" size="sm" className="gap-1 glass-soft rounded-md h-8 px-3" aria-label="Previous page">
            <ChevronLeft className="h-3.5 w-3.5" />{t.common.showLess}
          </Button>
          <span className="text-xs text-muted-foreground tabular-nums min-w-[3rem] text-center">{safePage + 1} / {totalPages}</span>
          <Button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={safePage >= totalPages - 1} variant="ghost" size="sm" className="gap-1 glass-soft rounded-md h-8 px-3" aria-label="Next page">
            {t.common.showMore}<ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </GlassCard>
  );
}
