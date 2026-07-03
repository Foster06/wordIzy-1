"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SolvedWord } from "@/lib/unscramble";
import type { LanguageDef } from "@/lib/languages";
import { GlassCard } from "./glass-card";
import { Button } from "@/components/ui/button";
import type { Translation } from "@/components/i18n/translations";

interface WordListProps {
  words: SolvedWord[];
  lang: LanguageDef;
  t: Translation;
  emptyMessage?: string;
  pageSize?: number;
}

/** Flat list of solved words as text (Bree Serif) in a 4-col grid.
 *  Paginates at 50 words per page with prev/next. */
export function WordList({ words, lang, t, emptyMessage, pageSize = 50 }: WordListProps) {
  void lang;
  const [page, setPage] = useState(0);

  if (words.length === 0) {
    return (
      <GlassCard className="p-8 text-center text-muted-foreground text-sm">
        {emptyMessage ?? t.common.noResults}
      </GlassCard>
    );
  }

  const totalPages = Math.max(1, Math.ceil(words.length / pageSize));
  const start = page * pageSize;
  const shown = words.slice(start, start + pageSize);

  return (
    <GlassCard className="p-4 sm:p-5 result-card">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted-foreground">{words.length} {t.common.wordsCount}</span>
        {totalPages > 1 && <span className="text-xs text-muted-foreground tabular-nums">{page + 1} / {totalPages}</span>}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5">
        {shown.map((w) => (
          <div key={w.word} className="word-cell flex items-center gap-1.5 rounded-md px-2 py-1 bg-white/[0.06] border border-white/[0.06] hover:bg-brand/10 hover:border-brand/30 transition-colors min-w-0" title={`${w.word.toUpperCase()} · ${w.score} ${t.common.points}`}>
            <span className="word-item truncate uppercase tracking-wide !text-[15px] min-w-0">{w.word}</span>
            <span className="text-[10px] font-bold text-brand tabular-nums shrink-0 ml-auto">{w.score}</span>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2 pt-3 border-t border-white/5">
          <Button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} variant="ghost" size="sm" className="gap-1 glass-soft rounded-md h-8 px-3">
            <ChevronLeft className="h-3.5 w-3.5" />{t.common.showLess}
          </Button>
          <span className="text-xs text-muted-foreground tabular-nums min-w-[3rem] text-center">{page + 1} / {totalPages}</span>
          <Button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} variant="ghost" size="sm" className="gap-1 glass-soft rounded-md h-8 px-3">
            {t.common.showMore}<ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </GlassCard>
  );
}
