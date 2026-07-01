"use client";

import { useState } from "react";
import type { LengthGroup } from "@/lib/unscramble";
import type { LanguageDef } from "@/lib/languages";
import type { Translation } from "@/components/i18n/translations";
import { TileRack } from "./tile";
import { GlassCard } from "./glass-card";
import { cn } from "@/lib/utils";

const INITIAL_PER_GROUP = 24;

interface WordGroupsProps {
  groups: LengthGroup[];
  t: Translation;
  lang: LanguageDef;
  emptyMessage?: string;
}

/** Renders solved words grouped by length, each word shown as a Scrabble tile rack. */
export function WordGroups({ groups, t, lang, emptyMessage }: WordGroupsProps) {
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
        <LengthGroupCard key={g.length} group={g} t={t} lang={lang} />
      ))}
    </div>
  );
}

function LengthGroupCard({ group, t, lang }: { group: LengthGroup; t: Translation; lang: LanguageDef }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? group.words : group.words.slice(0, INITIAL_PER_GROUP);
  const hasMore = group.words.length > INITIAL_PER_GROUP;

  return (
    <GlassCard className="p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="flex items-baseline gap-2 text-sm font-semibold uppercase tracking-wider text-brand">
          <span className="text-lg font-bold">{group.length}</span>
          <span className="text-muted-foreground">-{t.common.length}</span>
        </h3>
        <span className="text-xs text-muted-foreground">
          {group.words.length} {t.common.wordsCount}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {visible.map((w) => (
          <WordRow key={w.word} word={w.word} score={w.score} lang={lang} />
        ))}
      </div>
      {hasMore && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 text-xs font-medium text-brand hover:text-brand-soft transition-colors"
        >
          {expanded
            ? `${t.common.showLess} ▲`
            : `${t.common.showMore} (${group.words.length - INITIAL_PER_GROUP} ${t.common.wordsCount}) ▼`}
        </button>
      )}
    </GlassCard>
  );
}

function WordRow({ word, score, lang }: { word: string; score: number; lang: LanguageDef }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 hover:bg-white/[0.03] transition-colors">
      <TileRack letters={word} values={lang.letterValues} size="xs" className="flex-1 !p-1 !gap-1 bg-transparent border-0" />
      <span className={cn("shrink-0 text-xs font-bold tabular-nums text-brand min-w-[2rem] text-right")}>
        {score}
        <span className="text-[9px] text-muted-foreground ml-0.5">{""}</span>
      </span>
    </div>
  );
}
