"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, List } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassCard } from "@/components/site/glass-card";
import { AdSlot } from "@/components/site/ad-slot";
import { DictionarySelect } from "@/components/site/dictionary-select";
import { PageHeader } from "@/components/site/page-header";
import { useLanguage } from "@/components/i18n/language-provider";
import type { LanguageCode } from "@/lib/languages";
import { LANGUAGES } from "@/lib/languages";
import { cn } from "@/lib/utils";
import { TipsSection } from "@/components/site/tips-section";

interface WordItem { word: string; score: number; length: number; }

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const LENGTHS = [2, 3, 4, 5, 6, 7];
const PAGE = 120;

/** A single browsable bucket of words (fetches + paginates from /api/wordlists). */
function WordBucket({
  lang, mode, length, letter, title,
}: {
  lang: LanguageCode; mode: "all" | "starts" | "ends"; length: number; letter: string; title: string;
}) {
  const { t } = useLanguage();
  const [words, setWords] = useState<WordItem[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPage = useCallback(async (off: number, append: boolean) => {
    setLoading(true);
    try {
      const url = new URL("/api/wordlists", window.location.origin);
      url.searchParams.set("lang", lang);
      url.searchParams.set("mode", mode);
      url.searchParams.set("length", String(length));
      url.searchParams.set("letter", letter);
      url.searchParams.set("offset", String(off));
      url.searchParams.set("limit", String(PAGE));
      const res = await fetch(url);
      const json = (await res.json()) as { words: WordItem[]; total: number };
      setWords((prev) => (append ? [...prev, ...json.words] : json.words));
      setTotal(json.total);
      setOffset(off + json.words.length);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, [lang, mode, length, letter]);

  useEffect(() => {
    fetchPage(0, false);
  }, [fetchPage]);

  const hasMore = words.length < total;

  return (
    <GlassCard className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-brand">{title}</h3>
        <span className="text-xs text-muted-foreground">{total} {t.common.wordsCount}</span>
      </div>
      {words.length === 0 && !loading ? (
        <p className="text-xs text-muted-foreground py-4 text-center">{t.common.none}</p>
      ) : (
        <div className="max-h-72 overflow-y-auto nice-scroll pr-1">
          <div className="flex flex-wrap gap-1.5">
            {words.map((w) => (
              <span key={w.word} className="word-chip !py-1 !px-2 text-xs" title={`${w.score} ${t.common.points}`}>
                {w.word}<span className="pts">{w.score}</span>
              </span>
            ))}
          </div>
        </div>
      )}
      {hasMore && (
        <button
          onClick={() => fetchPage(offset, true)}
          disabled={loading}
          className="mt-3 text-xs font-medium text-brand hover:text-brand-soft transition-colors flex items-center gap-1.5"
        >
          {loading && <Loader2 className="h-3 w-3 animate-spin" />}
          {t.common.showMore} ({total - words.length})
        </button>
      )}
    </GlassCard>
  );
}

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
            <DictionarySelect className="w-[180px] h-9" />
          </div>

          {/* Length + letter selectors */}
          <div className="space-y-3">
            {mode === "all" ? (
              <div>
                <p className="text-xs text-muted-foreground mb-2">{t.wordlists.selectLength}</p>
                <div className="flex flex-wrap gap-2">
                  {LENGTHS.map((l) => (
                    <button key={l} onClick={() => setLength(l)} className={cn("h-9 w-9 rounded-md text-sm font-semibold transition-colors", length === l ? "bg-brand text-background" : "glass-soft text-foreground/80 hover:text-brand")}>{l}</button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">{t.wordlists.letter}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {ALPHABET.map((l) => (
                      <button key={l} onClick={() => setLetter(l)} className={cn("h-8 w-8 rounded-md text-xs font-bold transition-colors", letter === l ? "bg-brand text-background" : "glass-soft text-foreground/80 hover:text-brand")}>{l}</button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </GlassCard>

        <AdSlot format="horizontal" />

        {/* Results */}
        <Tabs value={mode}>
          <TabsContent value="all" className="mt-0 space-y-4">
            <p className="text-sm text-muted-foreground">
              {length}-{t.common.length} {t.wordlists.allWords} — A–Z
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {ALPHABET.map((l) => (
                <WordBucket key={l} lang={lang as LanguageCode} mode="ends" length={length} letter={l} title={`${t.wordlists.endsBy.replace("A–Z", "")} ${l}`} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="starts" className="mt-0 space-y-4">
            <p className="text-sm text-muted-foreground">
              {t.wordlists.startsBy} “{letter}” — 2–7 {t.common.length}
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {LENGTHS.map((l) => (
                <WordBucket key={l} lang={lang as LanguageCode} mode="starts" length={l} letter={letter} title={`${l}-${t.common.length} • ${letter}`} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ends" className="mt-0 space-y-4">
            <p className="text-sm text-muted-foreground">
              {t.wordlists.endsBy} “{letter}” — 2–7 {t.common.length}
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {LENGTHS.map((l) => (
                <WordBucket key={l} lang={lang as LanguageCode} mode="ends" length={l} letter={letter} title={`${l}-${t.common.length} • …${letter}`} />
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
          {def.flag} {def.nativeName} — {def.curated ? "curated" : "comprehensive"} dictionary
        </p>
      </div>
    </>
  );
}
