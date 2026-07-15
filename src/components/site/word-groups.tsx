"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Copy, Check, Share2 } from "lucide-react";
import type { LengthGroup } from "@/lib/unscramble";
import type { LanguageDef } from "@/lib/languages";
import type { Translation } from "@/components/i18n/translations";
import { GlassCard } from "./glass-card";
import { Button } from "@/components/ui/button";
// 🎯 IMPORT THE LOCAL STORAGE HOOK LAYER
import { useWordVault } from "@/hooks/use-word-vault";

const PAGE_SIZE = 50;

interface WordGroupsProps {
  groups: LengthGroup[];
  t: Translation;
  lang: LanguageDef;
  emptyMessage?: string;
}

/** Renders solved words grouped by length as text (Bree Serif) in a 4-col grid.
 *  Paginates at 50 words per page with prev/next. */
export function WordGroups({ groups, t, lang, emptyMessage }: WordGroupsProps) {
  void lang;
  if (groups.length === 0) {
    return (
      <GlassCard className="p-8 text-center">
        <p className="text-muted-foreground">{emptyMessage ?? t.common.noResults}</p>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-5">
      {groups.map((g) => (
        <LengthGroupCard key={g.length} group={g} t={t} />
      ))}
    </div>
  );
}

function LengthGroupCard({ group, t }: { group: LengthGroup; t: Translation }) {
  // 🎯 CONNECT THE FAVORITES ENGINE LOOPS
  const { favorites, toggleFavorite } = useWordVault();
  
  const [page, setPage] = useState(0);
  const [copied, setCopied] = useState(false);
  const totalPages = Math.max(1, Math.ceil(group.words.length / PAGE_SIZE));
  const start = page * PAGE_SIZE;
  const visible = group.words.slice(start, start + PAGE_SIZE);

  const copyAll = () => {
    const text = group.words.map((w) => `${w.word.toUpperCase()} (${w.score})`).join("\n");
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareAll = async () => {
    const words = group.words.map((w) => w.word.toUpperCase()).join(", ");
    const url = typeof window !== "undefined" ? window.location.href : "https://wordizy.com";
    const text = `${group.words.length} ${group.length}-letter words from wordIzy:\n${words}\n\nTry it: ${url}`;
    if (navigator.share) {
      try { await navigator.share({ title: "wordIzy results", text, url }); } catch { /* user cancelled */ }
    } else {
      navigator.clipboard?.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <GlassCard className="p-4 sm:p-5 result-card">
      <div className="flex items-center justify-center gap-3 mb-3 text-center">
        <h3 className="flex items-baseline gap-2 text-sm font-semibold uppercase tracking-wider text-brand">
          <span className="text-lg font-bold">{group.length}</span>
          <span className="text-muted-foreground">-{t.common.length}</span>
        </h3>
        <span className="text-xs text-muted-foreground">
          {group.words.length} {t.common.wordsCount}
          {totalPages > 1 && <span className="ml-2 tabular-nums">{page + 1}/{totalPages}</span>}
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <button onClick={shareAll} className="text-muted-foreground hover:text-brand transition-colors cursor-pointer" title="Share" aria-label="Share results">
            <Share2 className="h-3.5 w-3.5" />
          </button>
          <button onClick={copyAll} className="text-muted-foreground hover:text-brand transition-colors cursor-pointer" title={t.common.copy} aria-label={t.common.copy}>
            {copied ? <Check className="h-3.5 w-3.5 text-brand" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
      
      {/* Dynamic layout grids housing text columns */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 justify-items-center text-center">
        {visible.map((w) => {
          // Normalize formatting to track bookmark statuses matching casing structures
          const cleanWord = w.word.toUpperCase();
          const isFavorited = favorites.includes(cleanWord);

          return (
            <div
              key={w.word}
              className="word-cell flex items-center justify-between gap-1.5 rounded-md px-3 py-1 bg-white/[0.06] border border-white/[0.06] hover:bg-brand/10 hover:border-brand/30 transition-colors group/item min-w-0 w-full"
              title={`${cleanWord} · {w.score} {t.common.points}`}
            >
              <div className="flex items-center gap-2 min-w-0">
                {/* 🎯 STAR FAVORITE TOGGLE TRIGGER BUTTON */}
                <button
                  type="button"
                  onClick={() => toggleFavorite(cleanWord)}
                  aria-label={`Bookmark ${cleanWord}`}
                  className={`text-sm shrink-0 select-none transition-transform active:scale-75 focus:outline-none cursor-pointer ${
                    isFavorited 
                      ? "text-amber-500 scale-105" 
                      : "text-muted-foreground/20 group-hover/item:text-muted-foreground/50 hover:text-amber-500/80"
                  }`}
                >
                  {isFavorited ? "★" : "☆"}
                </button>

                <span className="word-item truncate uppercase tracking-wide !text-[15px] min-w-0 text-left">
                  {w.word}
                </span>
              </div>
              
              <span className="text-[10px] font-bold text-brand tabular-nums shrink-0 pl-1">
                {w.score}
              </span>
            </div>
          );
        })}
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
