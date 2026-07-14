"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Copy, Check, Share2 } from "lucide-react";
import type { SolvedWord } from "@/lib/unscramble";
import type { LanguageDef } from "@/lib/languages";
import { GlassCard } from "./glass-card";
import { Button } from "@/components/ui/button";
import type { Translation } from "@/components/i18n/translations";
import { logPrivateEvent } from "@/lib/private-tracker"; // 🎯 IMPORTED: Your private data dispatcher utility

interface WordListProps {
  words: SolvedWord[];
  lang: LanguageDef;
  t: Translation;
  emptyMessage?: string;
  pageSize?: number;
  maxVisible?: number;
}

/** Flat list of solved words as text (Bree Serif) in a 4-col grid.
 *  Paginates at 50 words per page with prev/next. */
export function WordList({ 
  words: initialWords, 
  lang, 
  t, 
  emptyMessage, 
  pageSize = 50,
  maxVisible
}: WordListProps) {
  void lang;
  const [page, setPage] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copiedCell, setCopiedCell] = useState<string | null>(null);

  const words = maxVisible ? initialWords.slice(0, maxVisible) : initialWords;

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

  // 🎯 GLOBAL LIST COPY TRIGGER: Tracks macro list data extraction
  const copyAll = () => {
    const text = words.map((w) => w.word.toUpperCase()).join("\n");
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      
      // Log the macro snapshot under custom query keyword contexts
      logPrivateEvent(`bulk_list_length_${words.length}`, "word-list-bulk", lang?.code || "en", "copy");
      
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // 🎯 SINGLE WORD CELL TRIGGER: Copies individual word on cell click and logs interaction parameters
  const handleCellClick = (wordText: string) => {
    const uppercaseWord = wordText.toUpperCase();
    navigator.clipboard?.writeText(uppercaseWord).then(() => {
      setCopiedCell(wordText);
      
      // Quietly write an analytics event directly to your own secure database
      logPrivateEvent(wordText.toLowerCase(), "word-list-item", lang?.code || "en", "copy");
      
      setTimeout(() => setCopiedCell(null), 1500);
    });
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
      <div className="flex items-center justify-center gap-3 mb-3 text-center">
        <span className="text-xs text-muted-foreground">{words.length} {t.common.wordsCount}</span>
        {totalPages > 1 && <span className="text-xs text-muted-foreground tabular-nums">{page + 1} / {totalPages}</span>}
        <div className="ml-auto flex items-center gap-1.5">
          <button onClick={shareAll} className="text-muted-foreground hover:text-brand transition-colors" title="Share" aria-label="Share results">
            <Share2 className="h-3.5 w-3.5" />
          </button>
          <button onClick={copyAll} className="text-muted-foreground hover:text-brand transition-colors" title={t.common.copy} aria-label={t.common.copy}>
            {copied ? <Check className="h-3.5 w-3.5 text-brand" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 justify-items-center text-center">
        {shown.map((w) => (
          <button
            key={w.word}
            onClick={() => handleCellClick(w.word)}
            className="word-cell flex items-center justify-center gap-1.5 rounded-md px-2 py-1 bg-white/[0.06] border border-white/[0.06] hover:bg-brand/10 hover:border-brand/30 transition-colors min-w-0 w-full cursor-pointer group"
            title={`Click to copy: ${w.word.toUpperCase()} · ${w.score} ${t.common.points}`}
          >
            <span className="word-item truncate uppercase tracking-wide !text-[15px] min-w-0 group-hover:text-brand transition-colors">
              {w.word}
            </span>
            <span className="text-[10px] font-bold text-brand tabular-nums shrink-0">
              {copiedCell === w.word ? <Check className="h-3 w-3 text-green-500 animate-scale" /> : w.score}
            </span>
          </button>
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
