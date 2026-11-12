"use client";

import { useState } from "react";
import { Loader2, Dices } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { GlassCard } from "@/components/site/glass-card";
import { Button } from "@/components/ui/button";
import { AdSlot } from "@/components/site/ad-slot";
import { WordGroups } from "@/components/site/word-groups";
import { ActionButtons } from "@/components/site/action-buttons";
import { TipsSection } from "@/components/site/tips-section";
import { PageHeader } from "@/components/site/page-header";
import { useApi } from "@/components/site/use-api";
import { useLanguage } from "@/components/i18n/language-provider";
import { LANGUAGES, type LanguageCode } from "@/lib/languages";
import type { LengthGroup, SolvedWord } from "@/lib/unscramble";

function groupByLength(words: SolvedWord[]): LengthGroup[] {
  const map = new Map<number, SolvedWord[]>();
  for (const w of words) {
    const b = map.get(w.length);
    if (b) b.push(w);
    else map.set(w.length, [w]);
  }
  return Array.from(map.entries()).sort((a, b) => b[0] - a[0]).map(([length, ws]) => ({ length, words: ws }));
}

export function RandomTool() {
  const { t, lang } = useLanguage();
  const { get } = useApi();
  const def = LANGUAGES[lang as LanguageCode];

  const [length, setLength] = useState<string>("any");
  const [startsWith, setStartsWith] = useState("");
  const [endsWith, setEndsWith] = useState("");
  const [contains, setContains] = useState("");
  const [count, setCount] = useState("12");
  const [groups, setGroups] = useState<LengthGroup[] | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const generate = async (override?: { length?: string; count?: string }) => {
    const len = override?.length ?? length;
    const cnt = override?.count ?? count;
    setLoading(true);
    try {
      const r = await get<{ words: SolvedWord[] }>("/api/random", {
        length: len === "any" ? undefined : len,
        startsWith, endsWith, contains, count: cnt,
      });
      setGroups(groupByLength(r.words ?? []));
      setTotal((r.words ?? []).length);
    } catch {
      setGroups([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  // Quick game-mode presets (Pictionary / 5-letter Wordle / hard Hangman):
  // set the filters and immediately generate, so players get words in one tap.
  const applyPreset = (len: string, cnt: string) => {
    setLength(len);
    setStartsWith("");
    setEndsWith("");
    setContains("");
    setCount(cnt);
    generate({ length: len, count: cnt });
  };

  return (
    <>
      <PageHeader badge={t.nav.random} title={t.random.title} subtitle={t.random.subtitle} icon={<Dices className="h-6 w-6" />} />
      <div className="mt-6 space-y-6">
        <GlassCard strong className="p-5 sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-brand mb-4">{t.nav.random}</h2>
          {t.random.presets && (
            <div className="flex flex-wrap gap-2 mb-4">
              <Button onClick={() => applyPreset("any", "5")} variant="outline" size="sm" className="rounded-full glass-soft border-brand/30 hover:border-brand/60 hover:text-brand">{t.random.presets.pictionary}</Button>
              <Button onClick={() => applyPreset("5", "5")} variant="outline" size="sm" className="rounded-full glass-soft border-brand/30 hover:border-brand/60 hover:text-brand">{t.random.presets.wordle}</Button>
              <Button onClick={() => applyPreset("10", "5")} variant="outline" size="sm" className="rounded-full glass-soft border-brand/30 hover:border-brand/60 hover:text-brand">{t.random.presets.hangman}</Button>
            </div>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">{t.random.length}</Label>
              <Select value={length} onValueChange={setLength}>
                <SelectTrigger className="glass-soft border-white/10 search-amber"><SelectValue /></SelectTrigger>
                <SelectContent className="glass-strong border-white/10">
                  <SelectItem value="any">{t.random.any}</SelectItem>
                  {Array.from({ length: 11 }, (_, i) => i + 2).map((l) => (
                    <SelectItem key={l} value={String(l)}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">{t.common.startsWith}</Label>
              <Input value={startsWith} onChange={(e) => setStartsWith(e.target.value)} placeholder="ab" maxLength={5} className="h-9 uppercase glass-soft border-white/10 search-amber" autoComplete="off" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">{t.common.endsWith}</Label>
              <Input value={endsWith} onChange={(e) => setEndsWith(e.target.value)} placeholder="ed" maxLength={5} className="h-9 uppercase glass-soft border-white/10 search-amber" autoComplete="off" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">{t.common.mustInclude}</Label>
              <Input value={contains} onChange={(e) => setContains(e.target.value)} placeholder="cat" maxLength={6} className="h-9 uppercase glass-soft border-white/10 search-amber" autoComplete="off" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">{t.random.count}</Label>
              <Input type="number" min={1} max={200} value={count} onChange={(e) => setCount(e.target.value)} className="h-9 glass-soft border-white/10 search-amber" />
            </div>
          </div>
          <div className="mt-5">
            <ActionButtons
              actionLabel={t.random.btn}
              actionIcon={Dices}
              onAction={generate}
              onClear={() => { setLength("any"); setStartsWith(""); setEndsWith(""); setContains(""); setCount("12"); setGroups(null); }}
              loading={loading}
              t={t}
            />
          </div>
        </GlassCard>

        <AdSlot format="horizontal" />

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{t.common.results}</h2>
            {groups && <span className="text-sm text-muted-foreground">{total} {t.common.wordsFound}</span>}
          </div>
          {loading ? (
            <GlassCard className="p-10 flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-brand" /></GlassCard>
          ) : groups ? (
            <WordGroups groups={groups} t={t} lang={def} />
          ) : (
            <GlassCard className="p-8 text-center text-muted-foreground text-sm">{t.random.hint ?? t.random.subtitle}</GlassCard>
          )}
        </section>

        {t.random.useCases && (
          <GlassCard className="p-5 sm:p-6 result-card">
            <h2 className="text-xl font-bold mb-3 text-foreground font-roboto-slab">{t.random.useCases.title}</h2>
            <ul className="space-y-3">
              {t.random.useCases.items.map((item, i) => {
                const ci = item.indexOf(": ");
                return (
                  <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-brand mt-0.5 shrink-0">•</span>
                    <span>
                      {ci === -1 ? (
                        item
                      ) : (
                        <>
                          <span className="font-semibold text-foreground">{item.slice(0, ci + 1)}</span>{" "}
                          {item.slice(ci + 2)}
                        </>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </GlassCard>
        )}
        <TipsSection title={t.faq.title} items={t.faq.random} />
        <TipsSection title="Save Vault — How to use it" items={t.faq.vault} />
        <AdSlot format="horizontal" />
      </div>
    </>
  );
}
