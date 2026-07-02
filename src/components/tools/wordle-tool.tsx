"use client";

import { useState } from "react";
import { Loader2, Grid3x3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/site/glass-card";
import { AdSlot } from "@/components/site/ad-slot";
import { WordList } from "@/components/site/word-list";
import { ActionButtons } from "@/components/site/action-buttons";
import { TipsSection } from "@/components/site/tips-section";
import { PageHeader } from "@/components/site/page-header";
import { useApi } from "@/components/site/use-api";
import { useLanguage } from "@/components/i18n/language-provider";
import { LANGUAGES, type LanguageCode } from "@/lib/languages";
import type { SolvedWord } from "@/lib/unscramble";

const LENGTHS = [4, 5, 6, 7, 8];

export function WordleTool() {
  const { t, lang } = useLanguage();
  const { get } = useApi();
  const def = LANGUAGES[lang as LanguageCode];

  const [length, setLength] = useState(5);
  const [pattern, setPattern] = useState("");
  const [valid, setValid] = useState("");
  const [excluded, setExcluded] = useState("");
  const [words, setWords] = useState<SolvedWord[] | null>(null);
  const [loading, setLoading] = useState(false);

  const solve = async () => {
    setLoading(true);
    try {
      const r = await get<{ words: SolvedWord[] }>("/api/wordle", { length, pattern, valid, excluded });
      setWords(r.words ?? []);
    } catch {
      setWords([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader badge={t.nav.wordle} title={t.wordle.title} subtitle={t.wordle.subtitle} icon={<Grid3x3 className="h-6 w-6" />} />
      <div className="mt-6 space-y-6">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <GlassCard strong className="p-5 sm:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-brand mb-4">{t.wordle.title}</h2>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">{t.wordle.length}</Label>
                <div className="flex gap-2">
                  {LENGTHS.map((l) => (
                    <button
                      key={l}
                      onClick={() => setLength(l)}
                      className={`h-9 w-9 rounded-md text-sm font-semibold transition-colors ${length === l ? "bg-brand text-background" : "glass-soft text-foreground/80 hover:text-brand"}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pattern" className="text-xs text-muted-foreground">{t.wordle.placed}</Label>
                <Input id="pattern" value={pattern} onChange={(e) => setPattern(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") solve(); }} placeholder={".".repeat(length)} maxLength={length} className="h-11 text-lg font-mono uppercase tracking-[0.3em] glass-soft border-white/10" autoComplete="off" />
                <p className="text-[11px] text-muted-foreground">{t.wordle.hint}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="valid" className="text-xs text-muted-foreground">{t.wordle.valid}</Label>
                  <Input id="valid" value={valid} onChange={(e) => setValid(e.target.value)} placeholder="rst" maxLength={15} className="h-10 uppercase glass-soft border-white/10 tracking-widest" autoComplete="off" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="excluded" className="text-xs text-muted-foreground">{t.wordle.excluded}</Label>
                  <Input id="excluded" value={excluded} onChange={(e) => setExcluded(e.target.value)} placeholder="bxf" maxLength={20} className="h-10 uppercase glass-soft border-white/10 tracking-widest" autoComplete="off" />
                </div>
              </div>

              <ActionButtons
                actionLabel={t.wordle.btn}
                actionIcon={Grid3x3}
                onAction={solve}
                onClear={() => { setPattern(""); setValid(""); setExcluded(""); setWords(null); }}
                loading={loading}
                t={t}
                fullWidth
              />
            </div>
          </GlassCard>

          <GlassCard className="p-5 sm:p-6 h-fit">
            <h3 className="text-sm font-semibold mb-3">{t.wordle.hint}</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded bg-brand/80 text-background font-bold text-xs">A</span>
                <span>{t.wordle.placed}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded bg-brand/25 border border-brand/50 font-bold text-xs">R</span>
                <span>{t.wordle.valid}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded bg-white/5 border border-white/10 font-bold text-xs line-through">X</span>
                <span>{t.wordle.excluded}</span>
              </div>
            </div>
          </GlassCard>
        </div>

        <AdSlot format="horizontal" />

        <section>
          <h2 className="text-lg font-semibold mb-4">{t.common.results}</h2>
          {loading ? (
            <GlassCard className="p-10 flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-brand" /></GlassCard>
          ) : words ? (
            <WordList words={words} lang={def} t={t} />
          ) : (
            <GlassCard className="p-8 text-center text-muted-foreground text-sm">{t.wordle.hint}</GlassCard>
          )}
        </section>

        <TipsSection title={t.common.tipsTitle} items={[
          { q: t.home.q1, a: t.home.a1 },
          { q: t.home.q3, a: t.home.a3 },
        ]} />
        <AdSlot format="horizontal" />
      </div>
    </>
  );
}
