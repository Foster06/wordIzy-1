"use client";

import { useState, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { LetterInput } from "@/components/site/letter-input";
import { ActionButtons } from "@/components/site/action-buttons";
import { WordGroups } from "@/components/site/word-groups";
import { GlassCard } from "@/components/site/glass-card";
import { AdSlot } from "@/components/site/ad-slot";
import { useApi } from "@/components/site/use-api";
import { useLanguage } from "@/components/i18n/language-provider";
import { LANGUAGES, type LanguageCode } from "@/lib/languages";
import type { SolveResult } from "@/lib/unscramble";
import { TipsSection } from "@/components/site/tips-section";

interface Props {
  endpoint: string;
  buttonLabel: string;
  hint: string;
  tipsTitle: string;
  tips: { q: string; a: string }[];
  extraControls?: ReactNode;
  /** Optional tips card content to show instead of TileValuesPanel */
  tipsCard?: { title: string; items: string[] };
}

export function LettersSolver({ endpoint, buttonLabel, hint, tipsTitle, tips, extraControls, tipsCard }: Props) {
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
          <h2 className="text-sm font-semibold uppercase tracking-wider text-brand mb-4">{t.common.yourLetters}</h2>
          <LetterInput value={letters} onChange={setLetters} onKeyDown={(e) => { if (e.key === "Enter") solve(); }} />
          <p className="mt-3 text-xs text-muted-foreground">{hint}</p>
          {extraControls}
          <div className="mt-5">
            <ActionButtons
              actionLabel={buttonLabel}
              onAction={solve}
              onClear={clear}
              loading={loading}
              disabled={!letters.trim()}
              t={t}
              fullWidth
            />
          </div>
        </GlassCard>
        {tipsCard && (
          <GlassCard className="p-5 sm:p-6 h-fit">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand mb-3">{tipsCard.title}</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {tipsCard.items.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-brand shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        )}
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
