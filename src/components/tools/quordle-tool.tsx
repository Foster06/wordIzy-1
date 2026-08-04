"use client";

import { useState, useRef, useEffect } from "react";
import { Loader2, LayoutGrid, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/site/glass-card";
import { AdSlot } from "@/components/site/ad-slot";
import { WordList } from "@/components/site/word-list";
import { TipsSection } from "@/components/site/tips-section";
import { PageHeader } from "@/components/site/page-header";
import { ActionButtons } from "@/components/site/action-buttons";
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

  // Scroll-aware buttons: show top buttons when scrolled up, bottom buttons when scrolled down.
  const topButtonsRef = useRef<HTMLDivElement>(null);
  const [showBottomButtons, setShowBottomButtons] = useState(false);

  useEffect(() => {
    const check = () => {
      const el = topButtonsRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // If the top buttons are scrolled out of view (above viewport), show bottom buttons.
      setShowBottomButtons(rect.bottom < 80);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

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

  const clear = () => {
    setBoards([
      { id: 1, length: 5, pattern: "", validLetters: "", excludedLetters: "" },
      { id: 2, length: 5, pattern: "", validLetters: "", excludedLetters: "" },
    ]);
    setResults(null);
  };

  return (
    <>
      <PageHeader badge={t.nav.quordle} title={t.quordle.title} subtitle={t.quordle.subtitle} icon={<LayoutGrid className="h-6 w-6" />} />
      <div className="mt-6 space-y-6">
        <GlassCard strong className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-brand">{t.quordle.title}</h2>
            <Button onClick={addBoard} disabled={boards.length >= 4} variant="ghost" size="sm" className="gap-1.5 glass-soft rounded-lg">
              <Plus className="h-4 w-4" /> {t.quordle.addBoard}
            </Button>
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
                    <Input value={b.pattern} onChange={(e) => updateBoard(b.id, { pattern: e.target.value })} placeholder={".".repeat(b.length)} maxLength={b.length} className="h-10 font-mono uppercase tracking-[0.25em] glass-soft border-white/10 search-amber" autoComplete="off" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">{t.wordle.valid}</Label>
                      <Input value={b.validLetters} onChange={(e) => updateBoard(b.id, { validLetters: e.target.value })} placeholder="rs" maxLength={15} className="h-9 uppercase glass-soft border-white/10 search-amber tracking-widest" autoComplete="off" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">{t.wordle.excluded}</Label>
                      <Input value={b.excludedLetters} onChange={(e) => updateBoard(b.id, { excludedLetters: e.target.value })} placeholder="bx" maxLength={20} className="h-9 uppercase glass-soft border-white/10 search-amber tracking-widest" autoComplete="off" />
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* TOP buttons — visible when scrolled up (hidden when scrolled down) */}
          <div
            ref={topButtonsRef}
            style={{ display: showBottomButtons ? "none" : undefined }}
          >
            <div className="mt-5">
              <ActionButtons
                actionLabel={t.common.solve}
                actionIcon={LayoutGrid}
                onAction={solve}
                onClear={clear}
                loading={loading}
                t={t}
                fullWidth
              />
            </div>
          </div>
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

        {/* BOTTOM buttons — visible when scrolled down (after boards/results), hidden when scrolled up */}
        {showBottomButtons && (
          <GlassCard strong className="p-4 sticky bottom-4 z-40 glow-accent">
            <ActionButtons
              actionLabel={t.common.solve}
              actionIcon={LayoutGrid}
              onAction={solve}
              onClear={clear}
              loading={loading}
              t={t}
              fullWidth
            />
          </GlassCard>
        )}

        <TipsSection title={t.faq.title} items={t.faq.quordle} />
        <TipsSection title="Save Vault — How to use it" items={t.faq.vault} />
        <AdSlot format="horizontal" />
      </div>
    </>
  );
}
