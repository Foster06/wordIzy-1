"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { LengthGroup } from "@/lib/unscramble";
import type { LanguageDef } from "@/lib/languages";
import type { Translation } from "@/components/i18n/translations";
import { GlassCard } from "./glass-card";
import { Button } from "@/components/ui/button";

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
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(group.words.length / PAGE_SIZE));
  const start = page * PAGE_SIZE;
  const visible = group.words.slice(start, start + PAGE_SIZE);

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
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 justify-items-center text-center">
        {visible.map((w) => (
          <div
            key={w.word}
            className="word-cell flex items-center justify-center gap-1.5 rounded-md px-2 py-1 bg-white/[0.06] border border-white/[0.06] hover:bg-brand/10 hover:border-brand/30 transition-colors min-w-0 w-full"
            title={`${w.word.toUpperCase()} · ${w.score} ${t.common.points}`}
          >
            <span className="word-item truncate uppercase tracking-wide !text-[15px] min-w-0">{w.word}</span>
            <span className="text-[10px] font-bold text-brand tabular-nums shrink-0">{w.score}</span>
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
