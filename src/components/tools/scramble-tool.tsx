"use client";

import { useState } from "react";
import { Loader2, RotateCw, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LetterInput } from "@/components/site/letter-input";
import { TileValuesPanel } from "@/components/site/tile-values-panel";
import { ActionButtons } from "@/components/site/action-buttons";
import { WordGroups } from "@/components/site/word-groups";
import { GlassCard } from "@/components/site/glass-card";
import { AdSlot } from "@/components/site/ad-slot";
import { TileRack } from "@/components/site/tile";
import { TipsSection } from "@/components/site/tips-section";
import { useApi } from "@/components/site/use-api";
import { useLanguage } from "@/components/i18n/language-provider";
import { LANGUAGES, type LanguageCode } from "@/lib/languages";
import { PageHeader } from "@/components/site/page-header";
import type { SolveResult } from "@/lib/unscramble";


export function ScrambleTool() {
  const { t, lang } = useLanguage();
  const { get } = useApi();
  const def = LANGUAGES[lang as LanguageCode];

  const [scrambled, setScrambled] = useState("");
  const [result, setResult] = useState<SolveResult | null>(null);
  const [loading, setLoading] = useState(false);

  // scramble-a-word helper
  const [word, setWord] = useState("");
  const [variants, setVariants] = useState<string[]>([]);
  const [scramLoading, setScramLoading] = useState(false);

  const descramble = async () => {
    if (!scrambled.trim()) return;
    setLoading(true);
    try {
      const r = await get<SolveResult>("/api/unscramble", { letters: scrambled });
      setResult(r);
    } catch {
      setResult({ groups: [], total: 0 });
    } finally {
      setLoading(false);
    }
  };

  const scramble = async () => {
    if (!word.trim()) return;
    setScramLoading(true);
    try {
      const r = await get<{ variants: string[] }>("/api/scramble", { word, variants: 6 });
      setVariants(r.variants ?? []);
    } catch {
      setVariants([]);
    } finally {
      setScramLoading(false);
    }
  };

  return (
    <>
      <PageHeader badge={t.nav.scramble} title={t.scramble.title} subtitle={t.scramble.subtitle} icon={<RotateCw className="h-6 w-6" />} />
      <div className="mt-6 space-y-6">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <GlassCard strong className="p-5 sm:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-brand mb-4">{t.scramble.inputLabel}</h2>
            <LetterInput value={scrambled} onChange={setScrambled} onKeyDown={(e) => { if (e.key === "Enter") descramble(); }} placeholder={t.scramble.inputLabel} />
            <p className="mt-3 text-xs text-muted-foreground">{t.scramble.hint}</p>
            <div className="mt-5">
              <ActionButtons
                actionLabel={t.scramble.btn}
                actionIcon={RotateCw}
                onAction={descramble}
                onClear={() => { setScrambled(""); setResult(null); }}
                loading={loading}
                disabled={!scrambled.trim()}
                t={t}
              />
            </div>
          </GlassCard>
          <TileValuesPanel lang={lang as LanguageCode} />
        </div>

        {/* Scramble-a-word helper */}
        <GlassCard className="p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-brand mb-3 flex items-center gap-2">
            <Shuffle className="h-4 w-4" /> Scramble a word
          </h3>
          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[200px] space-y-1.5">
              <Label htmlFor="word" className="text-xs text-muted-foreground">Word</Label>
              <Input id="word" value={word} onChange={(e) => setWord(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") scramble(); }} placeholder="scrabble" maxLength={15} className="h-10 uppercase glass-soft border-white/10" autoComplete="off" />
            </div>
            <Button onClick={scramble} disabled={scramLoading || !word.trim()} className="gap-2 bg-gradient-to-r from-brand to-brand-soft text-background font-semibold rounded-lg">
              {scramLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shuffle className="h-4 w-4" />}
              {t.common.generate}
            </Button>
          </div>
          {variants.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {variants.map((v, i) => (
                <TileRack key={i} letters={v} values={def.letterValues} size="sm" className="!p-2" />
              ))}
            </div>
          )}
        </GlassCard>

        <AdSlot format="horizontal" />

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{t.scramble.solutionLabel}</h2>
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

        <TipsSection title={t.faq.title} items={t.faq.scramble} />
        <AdSlot format="horizontal" />
      </div>
    </>
  );
}
