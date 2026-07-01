"use client";

import { useState } from "react";
import { Loader2, LayoutGrid, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/site/glass-card";
import { AdSlot } from "@/components/site/ad-slot";
import { WordList } from "@/components/site/word-list";
import { DictionarySelect } from "@/components/site/dictionary-select";
import { TipsSection } from "@/components/site/tips-section";
import { PageHeader } from "@/components/site/page-header";
import { useApi } from "@/components/site/use-api";
import { useLanguage } from "@/components/i18n/language-provider";
import { LANGUAGES, type LanguageCode } from "@/lib/languages";
import type { SolvedWord, WordleConstraint } from "@/lib/unscramble";

interface Board extends WordleConstraint {
  id: number;
}

let boardId = 3;

export function QuordleTool() {
  const { t, lang } = useLanguage();
  const { post } = useApi();
  const def = LANGUAGES[lang as LanguageCode];

  const [boards, setBoards] = useState<Board[]>([
    { id: 1, length: 5, pattern: "", validLetters: "", excludedLetters: "" },
    { id: 2, length: 5, pattern: "", validLetters: "", excludedLetters: "" },
  ]);
  const [results, setResults] = useState<SolvedWord[][] | null>(null);
  const [loading, setLoading] = useState(false);

  const updateBoard = (id: number, patch: Partial<Board>) => {
    setBoards((bs) => bs.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  };
  const addBoard = () => {
    if (boards.length >= 4) return;
    setBoards((bs) => [...bs, { id: boardId++, length: 5, pattern: "", validLetters: "", excludedLetters: "" }]);
  };
  const removeBoard = (id: number) => setBoards((bs) => bs.filter((b) => b.id !== id));

  const solve = async () => {
    setLoading(true);
    try {
      const payload = {
        lang,
        boards: boards.map(({ length, pattern, validLetters, excludedLetters }) => ({ length, pattern, validLetters, excludedLetters })),
      };
      const r = await post<{ results: { words: SolvedWord[] }[] }>("/api/quordle", payload);
      setResults(r.results.map((x) => x.words ?? []));
    } catch {
      setResults(boards.map(() => []));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader badge={t.nav.quordle} title={t.quordle.title} subtitle={t.quordle.subtitle} icon={<LayoutGrid className="h-6 w-6" />} />
      <div className="mt-6 space-y-6">
        <GlassCard strong className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-brand">{t.quordle.title}</h2>
            <div className="flex items-center gap-3">
              <DictionarySelect className="w-[160px] h-9" />
              <Button onClick={addBoard} disabled={boards.length >= 4} variant="ghost" size="sm" className="gap-1.5 glass-soft rounded-lg">
                <Plus className="h-4 w-4" /> {t.quordle.addBoard}
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {boards.map((b, idx) => (
              <GlassCard key={b.id} soft className="p-4 relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand">{t.quordle.board} {idx + 1}</span>
                  {boards.length > 1 && (
                    <button onClick={() => removeBoard(b.id)} className="text-muted-foreground hover:text-destructive transition-colors" aria-label="remove">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">{t.wordle.placed}</Label>
                    <Input value={b.pattern} onChange={(e) => updateBoard(b.id, { pattern: e.target.value })} placeholder={".".repeat(b.length)} maxLength={b.length} className="h-10 font-mono uppercase tracking-[0.25em] glass-soft border-white/10" autoComplete="off" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">{t.wordle.valid}</Label>
                      <Input value={b.validLetters} onChange={(e) => updateBoard(b.id, { validLetters: e.target.value })} placeholder="rs" maxLength={15} className="h-9 uppercase glass-soft border-white/10 tracking-widest" autoComplete="off" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">{t.wordle.excluded}</Label>
                      <Input value={b.excludedLetters} onChange={(e) => updateBoard(b.id, { excludedLetters: e.target.value })} placeholder="bx" maxLength={20} className="h-9 uppercase glass-soft border-white/10 tracking-widest" autoComplete="off" />
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          <Button onClick={solve} disabled={loading} className="mt-5 w-full gap-2 bg-gradient-to-r from-brand to-brand-soft text-background font-semibold hover:opacity-90 rounded-lg">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LayoutGrid className="h-4 w-4" />}
            {t.common.solve}
          </Button>
        </GlassCard>

        <AdSlot format="horizontal" />

        {results && (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">{t.common.results}</h2>
            {results.map((words, idx) => (
              <div key={idx}>
                <h3 className="text-sm font-semibold text-brand mb-2">{t.quordle.board} {idx + 1} <span className="text-muted-foreground font-normal">— {words.length} {t.common.wordsCount}</span></h3>
                <WordList words={words} lang={def} t={t} maxVisible={120} />
              </div>
            ))}
          </section>
        )}

        <TipsSection title={t.common.tipsTitle} items={[
          { q: t.home.q3, a: t.home.a3 },
          { q: t.home.q2, a: t.home.a2 },
        ]} />
        <AdSlot format="horizontal" />
      </div>
    </>
  );
}
