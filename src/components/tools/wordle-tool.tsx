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
          <GlassCard id="wordle-solver-card" strong className="p-5 sm:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-brand mb-4">{t.wordle.title}</h2>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">{t.wordle.length}</Label>
                <div role="radiogroup" aria-label={t.wordle.length} className="flex gap-2">
                  {LENGTHS.map((l) => (
                    <button
                      key={l}
                      role="radio"
                      aria-checked={length === l}
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
                <Input id="pattern" value={pattern} onChange={(e) => setPattern(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") solve(); }} placeholder={".".repeat(length)} maxLength={length} className="h-11 text-lg font-mono uppercase tracking-[0.3em] glass-soft border-white/10 search-amber" autoComplete="off" />
                <p className="text-[11px] text-muted-foreground">{t.wordle.hint}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="valid" className="text-xs text-muted-foreground">{t.wordle.valid}</Label>
                  <Input id="valid" value={valid} onChange={(e) => setValid(e.target.value)} placeholder="rst" maxLength={15} className="h-10 uppercase glass-soft border-white/10 search-amber tracking-widest" autoComplete="off" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="excluded" className="text-xs text-muted-foreground">{t.wordle.excluded}</Label>
                  <Input id="excluded" value={excluded} onChange={(e) => setExcluded(e.target.value)} placeholder="bxf" maxLength={20} className="h-10 uppercase glass-soft border-white/10 search-amber tracking-widest" autoComplete="off" />
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

        <TipsSection title={t.faq.title} items={t.faq.wordle} />
        <TipsSection title="Save Vault — How to use it" items={t.faq.vault} />
        <AdSlot format="horizontal" />

        {/* Length-targeted SEO sections — captures "5/6/7/8 letter wordle solver"
            long-tail queries (43 combined named impressions at positions 7.8-25
            per Nov 2026 GSC data). Each section explains how the solver handles
            that specific word length, with a one-click button that sets the
            length filter above. Anchor IDs enable deep-linking from SERPs. */}
        <section aria-labelledby="length-guides-heading" className="space-y-8">
          <h2 id="length-guides-heading" className="text-xl font-bold text-foreground tracking-tight">
            Wordle Solver by Word Length
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The Wordle Solver above supports 4, 5, 6, 7, and 8-letter puzzles.
            Choose the section that matches your game — each explains how to
            use the solver for that specific word length and lets you jump
            straight into solving with the right length filter pre-set.
          </p>

          {([
            { len: 5, anchor: "5-letter-wordle-solver", title: "5-Letter Wordle Solver" },
            { len: 6, anchor: "6-letter-wordle-solver", title: "6-Letter Wordle Solver" },
            { len: 7, anchor: "7-letter-wordle-solver", title: "7-Letter Wordle Solver" },
            { len: 8, anchor: "8-letter-wordle-solver", title: "8-Letter Wordle Solver" },
          ] as const).map(({ len: l, anchor, title }) => (
            <div key={l} id={anchor} className="scroll-mt-24">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-foreground tracking-tight">{title}</h3>
                <button
                  type="button"
                  onClick={() => {
                    setLength(l);
                    setWords(null);
                    // Smooth-scroll up to the solver card so the user can start entering clues.
                    const card = document.getElementById("wordle-solver-card");
                    if (card) card.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="px-3 py-1.5 rounded-md glass-soft text-xs text-foreground/90 hover:text-brand hover:border-brand/30 border border-white/10 transition-colors"
                >
                  Solve a {l}-letter puzzle →
                </button>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {l === 5 && "The classic daily Wordle is a 5-letter puzzle, and this solver is tuned for it by default. The Wordle answer list contains 2,309 curated common words, and the solver draws from the full set of 18,824 accepted 5-letter guesses. Enter your green letters with dots for unknown slots (e.g. A..LE), add any yellow letters in the Valid field, list your gray letters under Excluded, and the solver returns every 5-letter word that still fits — usually narrowing from thousands of candidates to a handful in a single query."}
                {l === 6 && "6-letter Wordle variants like Wordle Unlimited and Hello Wordl offer longer puzzles that reward vowel coverage on the first guess. The solver searches 35,106 valid 6-letter Wordle guesses. Set the length toggle to 6, then enter your clue pattern — six dots for an empty pattern, or letters in known positions (e.g. S.A.E. for a word matching S_A_E_). The longer the word, the more valuable positional information becomes, so green letters narrow the pool faster here than in 5-letter puzzles."}
                {l === 7 && "7-letter Wordles appear in Hello Wordl, Wavelength and other variants — the puzzle is harder because the answer pool grows to 50,393 valid 7-letter words. The solver handles this directly: select 7 in the length toggle, type your seven-slot pattern, and filter. Because 7-letter words contain more vowels on average (typically 3-4), we recommend an opener like ADIEU or AUDIO to test vowels early, then use the solver once you have two or three confirmed letters."}
                {l === 8 && "8-letter Wordles are the longest the solver supports and appear in Hello Wordl's hard mode and custom Wordle generators. The 8-letter pool is smaller than 7-letter (because valid 8-letter Wordle guesses are rarer), which actually makes the solver more powerful — a single green letter can eliminate tens of thousands of candidates. Select 8 in the length toggle, enter your eight-slot pattern, and the solver returns every 8-letter word matching your constraints."}
              </p>
            </div>
          ))}
        </section>

        <AdSlot format="horizontal" />
      </div>
    </>
  );
}
