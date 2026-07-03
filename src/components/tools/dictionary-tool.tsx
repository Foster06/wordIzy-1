"use client";

import { useState } from "react";
import { Loader2, BookOpen, Check, X, Sparkles, Repeat2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/site/glass-card";
import { AdSlot } from "@/components/site/ad-slot";
import { Tile } from "@/components/site/tile";
import { ActionButtons } from "@/components/site/action-buttons";
import { TipsSection } from "@/components/site/tips-section";
import { PageHeader } from "@/components/site/page-header";
import { useApi } from "@/components/site/use-api";
import { useLanguage } from "@/components/i18n/language-provider";
import { LANGUAGES, type LanguageCode } from "@/lib/languages";

interface CheckResult {
  word: string; exists: boolean; score: number; length: number;
  tiles: { letter: string; value: number }[];
}
interface DefResult {
  definition: string; partOfSpeech?: string; phonetic?: string; source: string;
}
interface SynResult {
  synonyms: string[]; source: string;
}

export function DictionaryTool() {
  const { t, lang } = useLanguage();
  const { get } = useApi();
  const def = LANGUAGES[lang as LanguageCode];

  const [word, setWord] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [definition, setDefinition] = useState<DefResult | null>(null);
  const [defLoading, setDefLoading] = useState(false);
  const [synonyms, setSynonyms] = useState<SynResult | null>(null);
  const [synLoading, setSynLoading] = useState(false);

  const check = async () => {
    if (!word.trim()) return;
    setLoading(true);
    setDefinition(null);
    setSynonyms(null);
    try {
      const r = await get<CheckResult>("/api/check", { word });
      setResult(r);
      // auto-fetch definition + synonyms for valid words
      if (r.exists) {
        fetchDef(r.word);
        fetchSyn(r.word);
      }
    } catch {
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchDef = async (w: string) => {
    setDefLoading(true);
    try {
      const r = await get<DefResult>("/api/define", { word: w });
      setDefinition(r);
    } catch {
      setDefinition(null);
    } finally {
      setDefLoading(false);
    }
  };

  const fetchSyn = async (w: string) => {
    setSynLoading(true);
    try {
      const r = await get<SynResult>("/api/synonyms", { word: w });
      setSynonyms(r);
    } catch {
      setSynonyms(null);
    } finally {
      setSynLoading(false);
    }
  };

  return (
    <>
      <PageHeader badge={t.nav.dictionary} title={t.dictionary.title} subtitle={t.dictionary.subtitle} icon={<BookOpen className="h-6 w-6" />} />
      <div className="mt-6 space-y-6">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <GlassCard strong className="p-5 sm:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-brand mb-4">{t.dictionary.title}</h2>
            <div className="space-y-1.5">
              <Label htmlFor="dword" className="text-xs text-muted-foreground">{t.common.example}</Label>
              <Input id="dword" value={word} onChange={(e) => setWord(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") check(); }} placeholder="scrabble" maxLength={20} className="h-12 text-lg uppercase glass-soft border-white/10 search-amber tracking-widest" autoComplete="off" spellCheck={false} />
            </div>
            <div className="mt-4">
              <ActionButtons
                actionLabel={t.dictionary.btn}
                actionIcon={BookOpen}
                onAction={check}
                onClear={() => { setWord(""); setResult(null); setDefinition(null); setSynonyms(null); }}
                loading={loading}
                disabled={!word.trim()}
                t={t}
              />
            </div>
          </GlassCard>

          <GlassCard className="p-5 sm:p-6 h-fit">
            <h3 className="text-sm font-semibold mb-3">{t.common.tileValues}</h3>
            <p className="text-sm text-muted-foreground">{def.flag} {def.nativeName}</p>
            <p className="mt-2 text-xs text-muted-foreground/70">
              Filtered by official Scrabble dictionary (NWL2020/CSW21, ODS9, FISE-2, Zingarelli, Scrabble-Wörterbuch, OpenTaal, Léxico pt-BR).
            </p>
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
                <div className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ${result.exists ? "bg-gradient-to-r from-brand to-brand-soft border border-brand/40 text-background" : "bg-red-500/15 border border-red-500/40 text-red-300"}`}>
                  {result.exists ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  {result.exists ? t.dictionary.exists : t.dictionary.notExists}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <Stat label={t.dictionary.score} value={result.score} />
                <Stat label={t.common.length} value={result.length} />
                <Stat label={t.common.points} value={`${result.score}`} />
              </div>
            </GlassCard>

            {result.exists && (
              <div className="grid gap-4 lg:grid-cols-2">
                {/* Definition */}
                <GlassCard className="p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-brand flex items-center gap-2">
                      <Sparkles className="h-4 w-4" /> {t.dictionary.definition}
                    </h3>
                    {definition?.source && (
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{definition.source}</span>
                    )}
                  </div>
                  {defLoading ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> {t.common.loading}
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      {(definition?.phonetic || definition?.partOfSpeech) && (
                        <p className="text-xs text-brand/80 font-mono">
                          {definition.phonetic && <span>{definition.phonetic} </span>}
                          {definition.partOfSpeech && <span className="italic">{definition.partOfSpeech}</span>}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground leading-relaxed min-h-[2.5rem]">
                        {definition?.definition || "—"}
                      </p>
                    </div>
                  )}
                </GlassCard>

                {/* Synonyms */}
                <GlassCard className="p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-brand flex items-center gap-2">
                      <Repeat2 className="h-4 w-4" /> Synonyms
                    </h3>
                    {synonyms?.source && (
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{synonyms.source}</span>
                    )}
                  </div>
                  {synLoading ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> {t.common.loading}
                    </div>
                  ) : synonyms && synonyms.synonyms.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto nice-scroll">
                      {synonyms.synonyms.map((s) => (
                        <button
                          key={s}
                          onClick={() => { setWord(s); }}
                          className="word-chip !py-1 !px-2.5 text-xs hover:scale-105"
                          title={`${s} — click to check`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground min-h-[2.5rem]">—</p>
                  )}
                </GlassCard>
              </div>
            )}
          </section>
        )}

        <TipsSection title={t.faq.title} items={t.faq.dictionary} />
        <AdSlot format="horizontal" />
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg glass-soft px-2 py-1.5 word-cell">
      <div className="text-base font-bold text-brand tabular-nums">{value}</div>
      <div className="text-[9px] text-muted-foreground uppercase tracking-wider mt-0.5">{label}</div>
    </div>
  );
}
