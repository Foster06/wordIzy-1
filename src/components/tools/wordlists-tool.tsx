"use client";

import { useState } from "react";
import { List } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassCard } from "@/components/site/glass-card";
import { AdSlot } from "@/components/site/ad-slot";
import { PageHeader } from "@/components/site/page-header";
import { WordBucket, ALPHABET, LENGTHS } from "@/components/site/word-bucket";
import { useLanguage } from "@/components/i18n/language-provider";
import type { LanguageCode } from "@/lib/languages";
import { LANGUAGES } from "@/lib/languages";
import { cn } from "@/lib/utils";
import { TipsSection } from "@/components/site/tips-section";

export function WordlistsTool() {
  const { t, lang } = useLanguage();
  const def = LANGUAGES[lang as LanguageCode];
  const [mode, setMode] = useState<"all" | "starts" | "ends">("all");
  const [length, setLength] = useState(3);
  const [letter, setLetter] = useState("A");

  return (
    <>
      <PageHeader badge={t.nav.wordlists} title={t.wordlists.title} subtitle={t.wordlists.subtitle} icon={<List className="h-6 w-6" />} />
      <div className="mt-6 space-y-6">
        <GlassCard strong className="p-5">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
              <TabsList className="glass-soft">
                <TabsTrigger value="all">{t.wordlists.allWords}</TabsTrigger>
                <TabsTrigger value="starts">{t.wordlists.startsBy}</TabsTrigger>
                <TabsTrigger value="ends">{t.wordlists.endsBy}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Length + letter selectors */}
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-2">{t.wordlists.selectLength}</p>
              <div className="flex flex-wrap gap-2">
                {LENGTHS.map((l) => (
                  <button key={l} onClick={() => setLength(l)} className={cn("h-9 w-9 rounded-md text-sm font-semibold transition-colors", length === l ? "bg-brand text-background" : "glass-soft text-foreground/80 hover:text-brand")}>{l}</button>
                ))}
              </div>
            </div>
            {mode !== "all" && (
              <div>
                <p className="text-xs text-muted-foreground mb-2">{t.wordlists.letter}</p>
                <div className="flex flex-wrap gap-1.5">
                  {ALPHABET.map((l) => (
                    <button key={l} onClick={() => setLetter(l)} className={cn("h-8 w-8 rounded-md text-xs font-bold transition-colors", letter === l ? "bg-brand text-background" : "glass-soft text-foreground/80 hover:text-brand")}>{l}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </GlassCard>

        <AdSlot format="horizontal" />

        {/* Results */}
        <Tabs value={mode}>
          {/* ALL words: 26 ending-letter containers for the chosen length */}
          <TabsContent value="all" className="mt-0 space-y-4">
            <p className="text-sm text-muted-foreground">
              {length}-{t.common.length} {t.wordlists.allWords} — grouped by ending letter, A–Z
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {ALPHABET.map((l) => (
                <WordBucket key={l} lang={lang as LanguageCode} mode="ends" length={length} letter={l} title={`…${l}`} />
              ))}
            </div>
          </TabsContent>

          {/* STARTS BY: each length 2-7 for the chosen letter, 5-col grid */}
          <TabsContent value="starts" className="mt-0 space-y-4">
            <p className="text-sm text-muted-foreground">
              {t.wordlists.startsBy} “{letter}” — {LENGTHS[0]}–{LENGTHS[LENGTHS.length - 1]} {t.common.length}
            </p>
            <div className="grid gap-4 lg:grid-cols-2">
              {LENGTHS.map((l) => (
                <WordBucket key={l} lang={lang as LanguageCode} mode="starts" length={l} letter={letter} title={`${letter}… · ${l} ${t.common.length}`} />
              ))}
            </div>
          </TabsContent>

          {/* ENDS BY: each length 2-7 for the chosen letter, 5-col grid */}
          <TabsContent value="ends" className="mt-0 space-y-4">
            <p className="text-sm text-muted-foreground">
              {t.wordlists.endsBy} “{letter}” — {LENGTHS[0]}–{LENGTHS[LENGTHS.length - 1]} {t.common.length}
            </p>
            <div className="grid gap-4 lg:grid-cols-2">
              {LENGTHS.map((l) => (
                <WordBucket key={l} lang={lang as LanguageCode} mode="ends" length={l} letter={letter} title={`…${letter} · ${l} ${t.common.length}`} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <TipsSection title={t.common.tipsTitle} items={[
          { q: t.home.q4, a: t.home.a4 },
          { q: t.home.q3, a: t.home.a3 },
        ]} />
        <AdSlot format="horizontal" />
        <p className="text-center text-xs text-muted-foreground">
          {def.flag} {def.nativeName} — official Scrabble dictionary filter applied
        </p>
      </div>
    </>
  );
}
