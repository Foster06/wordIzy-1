"use client";

import { useState } from "react";
import { Loader2, Trophy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LetterInput } from "@/components/site/letter-input";
import { TileValuesPanel } from "@/components/site/tile-values-panel";
import { ActionButtons } from "@/components/site/action-buttons";
import { PageHeader } from "@/components/site/page-header";
import { WordGroups } from "@/components/site/word-groups";
import { GlassCard } from "@/components/site/glass-card";
import { AdSlot } from "@/components/site/ad-slot";
import { Tile } from "@/components/site/tile";
import { TipsSection } from "@/components/site/tips-section";
import { useApi } from "@/components/site/use-api";
import { useLanguage } from "@/components/i18n/language-provider";
import { LANGUAGES, type LanguageCode } from "@/lib/languages";
import type { SolveResult } from "@/lib/unscramble";
import { FAQ_TITLE, scrabbleFaq } from "@/components/site/faq-content";

export function ScrabbleTool() {
  const { t, lang } = useLanguage();
  const { get } = useApi();
  const def = LANGUAGES[lang as LanguageCode];

  const [rack, setRack] = useState("");
  const [board, setBoard] = useState("");
  const [result, setResult] = useState<SolveResult | null>(null);
  const [loading, setLoading] = useState(false);

  const pool = (rack + board).toLowerCase();

  const solve = async () => {
    if (!pool.trim()) return;
    setLoading(true);
    try {
      const r = await get<SolveResult>("/api/unscramble", { letters: pool });
      setResult(r);
    } catch {
      setResult({ groups: [], total: 0 });
    } finally {
      setLoading(false);
    }
  };

  const clear = () => { setRack(""); setBoard(""); setResult(null); };
  const top = result ? result.groups.flatMap((g) => g.words).slice(0, 10) : [];

  return (
    <>
      <PageHeader
        badge={t.nav.scrabble}
        title={t.scrabble.title}
        subtitle={t.scrabble.subtitle}
        icon={<Trophy className="h-6 w-6" />}
      />
      <div className="mt-6 space-y-6">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <GlassCard strong className="p-5 sm:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-brand mb-4">{t.scrabble.rack}</h2>
            <LetterInput value={rack} onChange={setRack} onKeyDown={(e) => { if (e.key === "Enter") solve(); }} placeholder={t.scrabble.rack} />
            <div className="mt-4 space-y-1.5">
              <Label htmlFor="board" className="text-xs text-muted-foreground">{t.scrabble.board}</Label>
              <Input
                id="board"
                value={board}
                onChange={(e) => setBoard(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") solve(); }}
                placeholder={t.scrabble.board}
                maxLength={20}
                className="h-10 uppercase glass-soft border-white/10 tracking-widest"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{t.scrabble.hint}</p>
            <div className="mt-5">
              <ActionButtons
                actionLabel={t.scrabble.btn}
                actionIcon={Trophy}
                onAction={solve}
                onClear={clear}
                loading={loading}
                disabled={!pool.trim()}
                t={t}
              />
            </div>
          </GlassCard>
          <TileValuesPanel lang={lang as LanguageCode} />
        </div>

        <AdSlot format="horizontal" />

        {result && top.length > 0 && (
          <GlassCard className="p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand mb-3">Top plays</h3>
            <div className="flex flex-wrap gap-2">
              {top.map((w) => (
                <span key={w.word} className="word-chip">
                  {w.word.split("").map((ch, i) => (
                    <Tile key={i} letter={ch} value={def.letterValues[ch.toUpperCase()] ?? 0} size="xs" />
                  ))}
                  <span className="pts">{w.score}</span>
                </span>
              ))}
            </div>
          </GlassCard>
        )}

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{t.common.results}</h2>
            {result && <span className="text-sm text-muted-foreground">{result.total} {t.common.wordsFound}</span>}
          </div>
          {loading ? (
            <GlassCard className="p-10 flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-brand" /></GlassCard>
          ) : result ? (
            <WordGroups groups={result.groups} t={t} lang={def} />
          ) : (
            <GlassCard className="p-8 text-center text-muted-foreground text-sm">{t.common.noResults}</GlassCard>
          )}
        </section>

        <TipsSection title={FAQ_TITLE} items={scrabbleFaq} />
        <AdSlot format="horizontal" />
      </div>
    </>
  );
}
