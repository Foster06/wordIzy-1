"use client";

import type { SolvedWord } from "@/lib/unscramble";
import type { LanguageDef } from "@/lib/languages";
import { TileRack } from "./tile";
import { GlassCard } from "./glass-card";
import type { Translation } from "@/components/i18n/translations";

interface WordListProps {
  words: SolvedWord[];
  lang: LanguageDef;
  t: Translation;
  emptyMessage?: string;
  /** max items before scrolling */
  maxVisible?: number;
}

/** Flat list of solved words shown as small tile racks, with scroll. */
export function WordList({ words, lang, t, emptyMessage, maxVisible = 200 }: WordListProps) {
  if (words.length === 0) {
    return (
      <GlassCard className="p-8 text-center text-muted-foreground text-sm">
        {emptyMessage ?? t.common.noResults}
      </GlassCard>
    );
  }
  const shown = words.slice(0, maxVisible);
  return (
    <GlassCard className="p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted-foreground">{words.length} {t.common.wordsCount}</span>
        {words.length > maxVisible && <span className="text-xs text-muted-foreground">({t.common.showMore} {maxVisible})</span>}
      </div>
      <div className="max-h-[28rem] overflow-y-auto nice-scroll pr-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {shown.map((w) => (
            <div key={w.word} className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 hover:bg-white/[0.03] transition-colors">
              <TileRack letters={w.word} values={lang.letterValues} size="xs" className="flex-1 !p-1 !gap-1 bg-transparent border-0" />
              <span className="shrink-0 text-xs font-bold tabular-nums text-brand min-w-[2rem] text-right">{w.score}</span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
