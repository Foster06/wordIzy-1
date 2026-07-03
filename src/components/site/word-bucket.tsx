"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, ChevronLeft, ChevronRight, ArrowDownAZ } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/site/glass-card";
import { useLanguage } from "@/components/i18n/language-provider";
import type { LanguageCode } from "@/lib/languages";

interface WordItem { word: string; score: number; length: number; }

const PAGE_SIZE = 50;

/** A single browsable word bucket with 5-col grid + pagination (>200 words). */
export function WordBucket({
  lang, mode, length, letter, title,
}: {
  lang: LanguageCode; mode: "all" | "starts" | "ends"; length: number; letter: string; title: string;
}) {
  const { t } = useLanguage();
  const [allWords, setAllWords] = useState<WordItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const url = new URL("/api/wordlists", window.location.origin);
      url.searchParams.set("lang", lang);
      url.searchParams.set("mode", mode);
      url.searchParams.set("length", String(length));
      url.searchParams.set("letter", letter);
      url.searchParams.set("offset", "0");
      url.searchParams.set("limit", "500");
      const res = await fetch(url);
      const json = (await res.json()) as { words: WordItem[]; total: number };
      setAllWords(json.words);
      setTotal(json.total);
      setPage(0);
    } catch {
      setAllWords([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [lang, mode, length, letter]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = page * PAGE_SIZE;
  const pageWords = allWords.slice(start, start + PAGE_SIZE);
  const hasMore = total > 500 && allWords.length < total;

  return (
    <GlassCard className="p-4 result-card">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-brand flex items-center gap-1.5">
          <ArrowDownAZ className="h-3.5 w-3.5" />
          {title}
        </h3>
        <span className="text-xs text-muted-foreground">{total} {t.common.wordsCount}</span>
      </div>
      <div className="mb-3 text-[10px] uppercase tracking-wider text-muted-foreground/70 flex items-center gap-1">
        <span>{t.common.length} {length}</span>
        <span className="text-brand/60">·</span>
        <span>Sorted A → Z</span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="h-4 w-4 animate-spin text-brand" />
        </div>
      ) : pageWords.length === 0 ? (
        <p className="text-xs text-muted-foreground py-4 text-center">{t.common.none}</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5">
            {pageWords.map((w) => (
              <div
                key={w.word}
                className="flex items-center justify-between gap-1 rounded-md px-2 py-1 bg-white/[0.03] hover:bg-brand/10 transition-colors text-sm"
                title={`${w.score} ${t.common.points}`}
              >
                <span className="truncate font-medium">{w.word}</span>
                <span className="text-[10px] font-bold text-brand tabular-nums shrink-0">{w.score}</span>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-3 flex items-center justify-center gap-2 pt-3 border-t border-white/5">
              <Button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                variant="ghost"
                size="sm"
                className="gap-1 glass-soft rounded-md h-8 px-3"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                {t.common.showLess}
              </Button>
              <span className="text-xs text-muted-foreground tabular-nums">
                {page + 1} / {totalPages}
              </span>
              <Button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                variant="ghost"
                size="sm"
                className="gap-1 glass-soft rounded-md h-8 px-3"
              >
                {t.common.showMore}
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
          {hasMore && (
            <p className="mt-2 text-center text-[10px] text-muted-foreground/60">
              Showing first {allWords.length} of {total} words
            </p>
          )}
        </>
      )}
    </GlassCard>
  );
}

export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
export const LENGTHS = [2, 3, 4, 5, 6, 7];
