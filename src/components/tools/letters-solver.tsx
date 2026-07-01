"use client";

import { useState, type ReactNode } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LetterInput } from "@/components/site/letter-input";
import { TileValuesPanel } from "@/components/site/tile-values-panel";
import { DictionarySelect } from "@/components/site/dictionary-select";
import { WordGroups } from "@/components/site/word-groups";
import { GlassCard } from "@/components/site/glass-card";
import { AdSlot } from "@/components/site/ad-slot";
import { useApi } from "@/components/site/use-api";
import { useLanguage } from "@/components/i18n/language-provider";
import { LANGUAGES, type LanguageCode } from "@/lib/languages";
import type { SolveResult } from "@/lib/unscramble";
import { TipsSection } from "@/components/site/tips-section";

interface Props {
  endpoint: string; // "/api/anagram" | "/api/unscramble"
  buttonLabel: string;
  hint: string;
  tipsTitle: string;
  tips: { q: string; a: string }[];
  extraControls?: ReactNode;
}

export function LettersSolver({ endpoint, buttonLabel, hint, tipsTitle, tips, extraControls }: Props) {
  const { t, lang } = useLanguage();
  const { get } = useApi();
  const def = LANGUAGES[lang as LanguageCode];

  const [letters, setLetters] = useState("");
  const [result, setResult] = useState<SolveResult | null>(null);
  const [loading, setLoading] = useState(false);

  const solve = async () => {
    if (!letters.trim()) return;
    setLoading(true);
    try {
      const r = await get<SolveResult>(endpoint, { letters });
      setResult(r);
    } catch {
      setResult({ groups: [], total: 0 });
    } finally {
      setLoading(false);
    }
  };

  const clear = () => { setLetters(""); setResult(null); };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <GlassCard strong className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-brand">{t.common.yourLetters}</h2>
            <DictionarySelect className="w-[180px] h-9" />
          </div>
          <LetterInput value={letters} onChange={setLetters} onKeyDown={(e) => { if (e.key === "Enter") solve(); }} />
          <p className="mt-3 text-xs text-muted-foreground">{hint}</p>
          {extraControls}
          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              onClick={solve}
              disabled={loading || !letters.trim()}
              className="gap-2 bg-gradient-to-r from-brand to-brand-soft text-background font-semibold hover:opacity-90 rounded-lg px-6"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {buttonLabel}
            </Button>
            <Button onClick={clear} variant="ghost" className="gap-2 rounded-lg glass-soft hover:bg-white/10">
              <Trash2 className="h-4 w-4" />
              {t.common.clear}
            </Button>
          </div>
        </GlassCard>
        <TileValuesPanel lang={lang as LanguageCode} />
      </div>

      <AdSlot format="horizontal" />

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{t.common.results}</h2>
          {result && <span className="text-sm text-muted-foreground">{result.total} {t.common.wordsFound}</span>}
        </div>
        {loading ? (
          <GlassCard className="p-10 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-brand" />
          </GlassCard>
        ) : result ? (
          <WordGroups groups={result.groups} t={t} lang={def} />
        ) : (
          <GlassCard className="p-8 text-center text-muted-foreground text-sm">{t.common.noResults}</GlassCard>
        )}
      </section>

      <TipsSection title={tipsTitle} items={tips} />
      <AdSlot format="horizontal" />
    </div>
  );
}
