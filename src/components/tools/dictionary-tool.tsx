"use client";

import { useState } from "react";
import { Loader2, BookOpen, Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/site/glass-card";
import { AdSlot } from "@/components/site/ad-slot";
import { Tile } from "@/components/site/tile";
import { DictionarySelect } from "@/components/site/dictionary-select";
import { TipsSection } from "@/components/site/tips-section";
import { PageHeader } from "@/components/site/page-header";
import { useApi } from "@/components/site/use-api";
import { useLanguage } from "@/components/i18n/language-provider";
import { LANGUAGES, type LanguageCode } from "@/lib/languages";

interface CheckResult {
  word: string; exists: boolean; score: number; length: number;
  tiles: { letter: string; value: number }[];
}

export function DictionaryTool() {
  const { t, lang } = useLanguage();
  const { get } = useApi();
  const def = LANGUAGES[lang as LanguageCode];

  const [word, setWord] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [definition, setDefinition] = useState<string | null>(null);
  const [defLoading, setDefLoading] = useState(false);

  const check = async () => {
    if (!word.trim()) return;
    setLoading(true);
    setDefinition(null);
    try {
      const r = await get<CheckResult>("/api/check", { word });
      setResult(r);
    } catch {
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const define = async () => {
    if (!result?.exists) return;
    setDefLoading(true);
    try {
      const r = await get<{ definition: string }>("/api/define", { word: result.word });
      setDefinition(r.definition || "—");
    } catch {
      setDefinition("—");
    } finally {
      setDefLoading(false);
    }
  };

  return (
    <>
      <PageHeader badge={t.nav.dictionary} title={t.dictionary.title} subtitle={t.dictionary.subtitle} icon={<BookOpen className="h-6 w-6" />} />
      <div className="mt-6 space-y-6">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <GlassCard strong className="p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-brand">{t.dictionary.title}</h2>
              <DictionarySelect className="w-[180px] h-9" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dword" className="text-xs text-muted-foreground">{t.common.example}</Label>
              <Input id="dword" value={word} onChange={(e) => setWord(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") check(); }} placeholder="scrabble" maxLength={20} className="h-11 text-lg uppercase glass-soft border-white/10 tracking-widest" autoComplete="off" spellCheck={false} />
            </div>
            <Button onClick={check} disabled={loading || !word.trim()} className="mt-4 gap-2 bg-gradient-to-r from-brand to-brand-soft text-background font-semibold hover:opacity-90 rounded-lg px-6">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <BookOpen className="h-4 w-4" />}
              {t.dictionary.btn}
            </Button>
          </GlassCard>

          <GlassCard className="p-5 sm:p-6 h-fit">
            <h3 className="text-sm font-semibold mb-3">{t.common.tileValues}</h3>
            <p className="text-sm text-muted-foreground">{def.flag} {def.nativeName}</p>
          </GlassCard>
        </div>

        <AdSlot format="horizontal" />

        {result && (
          <section className="space-y-4">
            <GlassCard className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex flex-wrap gap-1">
                    {result.tiles.map((tile, i) => (
                      <Tile key={i} letter={tile.letter} value={tile.value} size="md" />
                    ))}
                  </div>
                </div>
                <div className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ${result.exists ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-300" : "bg-red-500/15 border border-red-500/40 text-red-300"}`}>
                  {result.exists ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  {result.exists ? t.dictionary.exists : t.dictionary.notExists}
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                <Stat label={t.dictionary.score} value={result.score} />
                <Stat label={t.common.length} value={result.length} />
                <Stat label={t.common.points} value={`${result.score}`} />
              </div>
            </GlassCard>

            {result.exists && (
              <GlassCard className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-brand">{t.dictionary.definition}</h3>
                  <Button onClick={define} disabled={defLoading} variant="ghost" size="sm" className="gap-1.5 glass-soft rounded-lg">
                    {defLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
                    {t.dictionary.definition}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed min-h-[2.5rem]">
                  {definition === null ? "—" : definition}
                </p>
              </GlassCard>
            )}
          </section>
        )}

        <TipsSection title={t.common.tipsTitle} items={[
          { q: t.home.q1, a: t.home.a1 },
          { q: t.home.q3, a: t.home.a3 },
        ]} />
        <AdSlot format="horizontal" />
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl glass-soft p-3">
      <div className="text-2xl font-bold text-brand tabular-nums">{value}</div>
      <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5">{label}</div>
    </div>
  );
}
