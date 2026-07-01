"use client";

import { useState } from "react";
import { Shuffle, SlidersHorizontal, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { LetterInput } from "@/components/site/letter-input";
import { TileValuesPanel } from "@/components/site/tile-values-panel";
import { DictionarySelect } from "@/components/site/dictionary-select";
import { WordGroups } from "@/components/site/word-groups";
import { GlassCard } from "@/components/site/glass-card";
import { AdSlot } from "@/components/site/ad-slot";
import { HomeFaq } from "@/components/site/tips-section";
import { useApi } from "@/components/site/use-api";
import { useLanguage } from "@/components/i18n/language-provider";
import { LANGUAGES, type LanguageCode } from "@/lib/languages";
import type { SolveResult } from "@/lib/unscramble";

const EXAMPLES = ["SRAABLC", "QUERLY", "TNIARG", "ZLAEMO", "RDOEWL", "HEOLLO"];

export function UnscramblerTool() {
  const { t, lang } = useLanguage();
  const { get } = useApi();
  const def = LANGUAGES[lang as LanguageCode];

  const [letters, setLetters] = useState("");
  const [startsWith, setStartsWith] = useState("");
  const [endsWith, setEndsWith] = useState("");
  const [mustInclude, setMustInclude] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [result, setResult] = useState<SolveResult | null>(null);
  const [loading, setLoading] = useState(false);

  const solve = async () => {
    if (!letters.trim()) return;
    setLoading(true);
    try {
      const r = await get<SolveResult>("/api/unscramble", {
        letters,
        startsWith, endsWith, mustInclude,
      });
      setResult(r);
    } catch {
      setResult({ groups: [], total: 0 });
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setLetters(""); setStartsWith(""); setEndsWith(""); setMustInclude("");
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Input panel */}
        <GlassCard strong className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-brand">{t.common.yourLetters}</h2>
            <DictionarySelect className="w-[180px] h-9" />
          </div>

          <LetterInput
            value={letters}
            onChange={setLetters}
            onKeyDown={(e) => { if (e.key === "Enter") solve(); }}
          />

          <div className="mt-4">
            <p className="text-xs text-muted-foreground mb-2">{t.common.tryExamples}</p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  onClick={() => { setLetters(ex); }}
                  className="rounded-md px-2.5 py-1 text-xs font-mono uppercase tracking-wider glass-soft hover:border-brand/40 hover:text-brand transition-colors"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced filters */}
          <Collapsible open={showFilters} onOpenChange={setShowFilters} className="mt-5">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 text-foreground/80 hover:text-brand px-2">
                <SlidersHorizontal className="h-4 w-4" />
                {t.common.advancedFilters}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <div className="grid sm:grid-cols-3 gap-3 rounded-xl glass-soft p-4">
                <div className="space-y-1.5">
                  <Label htmlFor="sw" className="text-xs text-muted-foreground">{t.common.startsWith}</Label>
                  <Input id="sw" value={startsWith} onChange={(e) => setStartsWith(e.target.value)} className="h-9 glass-soft border-white/10 uppercase" placeholder="ab" maxLength={6} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ew" className="text-xs text-muted-foreground">{t.common.endsWith}</Label>
                  <Input id="ew" value={endsWith} onChange={(e) => setEndsWith(e.target.value)} className="h-9 glass-soft border-white/10 uppercase" placeholder="ed" maxLength={6} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="mi" className="text-xs text-muted-foreground">{t.common.mustInclude}</Label>
                  <Input id="mi" value={mustInclude} onChange={(e) => setMustInclude(e.target.value)} className="h-9 glass-soft border-white/10 uppercase" placeholder="cat" maxLength={8} />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              onClick={solve}
              disabled={loading || !letters.trim()}
              className="gap-2 bg-gradient-to-r from-brand to-brand-soft text-background font-semibold hover:opacity-90 rounded-lg px-6"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shuffle className="h-4 w-4" />}
              {t.common.unscramble}
            </Button>
            <Button onClick={clear} variant="ghost" className="gap-2 rounded-lg glass-soft hover:bg-white/10">
              <Trash2 className="h-4 w-4" />
              {t.common.clear}
            </Button>
          </div>
        </GlassCard>

        {/* Tile values */}
        <TileValuesPanel lang={lang as LanguageCode} />
      </div>

      <AdSlot format="horizontal" />

      {/* Results */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{t.common.results}</h2>
          {result && (
            <span className="text-sm text-muted-foreground">
              {result.total} {t.common.wordsFound}
            </span>
          )}
        </div>
        {loading ? (
          <GlassCard className="p-10 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-brand" />
          </GlassCard>
        ) : result ? (
          <WordGroups groups={result.groups} t={t} lang={def} />
        ) : (
          <GlassCard className="p-8 text-center text-muted-foreground text-sm">
            {t.home.subtitle}
          </GlassCard>
        )}
      </section>

      <HomeFaq t={t} />

      <AdSlot format="horizontal" />
    </div>
  );
}
