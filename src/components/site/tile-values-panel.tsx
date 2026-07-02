"use client";

import { LANGUAGES, tilesByValue, type LanguageCode } from "@/lib/languages";
import { Tile } from "./tile";
import { GlassCard } from "./glass-card";
import { useLanguage } from "@/components/i18n/language-provider";

/** Right-column panel showing Scrabble tile values grouped by point count. */
export function TileValuesPanel({ lang }: { lang: LanguageCode }) {
  const { t } = useLanguage();
  const def = LANGUAGES[lang];
  const groups = tilesByValue(lang);

  return (
    <GlassCard className="p-5 sm:p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold">{t.common.tileValues}</h2>
        <span className="text-xs text-muted-foreground">{def.flag} {def.nativeName}</span>
      </div>

      <div className="space-y-3">
        {groups.map((g) => (
          <div key={g.value} className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand/15 border border-brand/30 text-xs font-bold text-brand">
              {g.value}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {g.tiles.map((tile) => (
                <Tile key={tile.letter} letter={tile.letter} value={g.value} size="xs" />
              ))}
            </div>
          </div>
        ))}
        <div className="flex items-center gap-3 pt-2 border-t border-white/10">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/5 border border-white/10 text-xs font-bold text-muted-foreground">
            0
          </span>
          <div className="flex items-center gap-2">
            <Tile letter="?" value={0} size="xs" blank />
            <span className="text-xs text-muted-foreground">
              {def.blanks} {t.common.blanks}
            </span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
