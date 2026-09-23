"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useLanguage } from "@/components/i18n/language-provider";
import {
  ALPHABET_LOWER,
  WORD_LIST_LENGTHS,
  buildCanonicalWordListUrl,
  type WordListType,
} from "@/lib/word-list-urls";
import { GlassCard } from "@/components/site/glass-card";

function navigateTo(router: ReturnType<typeof useRouter>, slug: string) {
  router.push(`/unscramble/${slug}`);
}

function HubSearchBar({ type }: { type: WordListType }) {
  const { t } = useLanguage();
  const router = useRouter();
  const [q, setQ] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const letter = q.trim().toLowerCase().slice(0, 1);
    if (!letter || !/^[a-z]$/.test(letter)) return;
    navigateTo(router, buildCanonicalWordListUrl({ type, value: letter }));
    setQ("");
  };

  return (
    <form onSubmit={submit} className="relative w-full max-w-xs">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        maxLength={2}
        aria-label="Letter filter"
        placeholder="A"
        className="h-10 w-full rounded-md border border-white/10 bg-background/60 pl-9 pr-9 text-sm uppercase tracking-wider font-mono outline-none focus-visible:ring-2 focus-visible:ring-brand placeholder:text-muted-foreground/50 placeholder:normal-case placeholder:font-sans"
      />
      {q && (
        <button
          type="button"
          onClick={() => setQ("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-muted-foreground hover:text-foreground"
          aria-label="Clear"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </form>
  );
}

function WordsStartingByMatrix() {
  const { t } = useLanguage();
  const router = useRouter();
  const title = "Words Starting With";
  const desc = "Browse every Scrabble word that begins with a letter.";
  return (
    <GlassCard className="p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h3 className="section-label !text-[14px] text-brand">{title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{desc}</p>
        </div>
        <HubSearchBar type="starts" />
      </div>
      <div className="flex flex-wrap gap-2">
        {ALPHABET_LOWER.map((l) => (
          <button
            key={l}
            onClick={() => navigateTo(router, buildCanonicalWordListUrl({ type: "starts", value: l }))}
            className="h-10 w-10 rounded-md flex items-center justify-center glass-soft text-foreground/80 hover:text-brand hover:border-brand/30 transition-colors uppercase font-bree text-lg"
          >
            {l}
          </button>
        ))}
      </div>
    </GlassCard>
  );
}

function WordsEndingByMatrix() {
  const { t } = useLanguage();
  const router = useRouter();
  const title = "Words Ending With";
  const desc = "Browse every Scrabble word that ends with a letter.";
  return (
    <GlassCard className="p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h3 className="section-label !text-[14px] text-brand">{title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{desc}</p>
        </div>
        <HubSearchBar type="ends" />
      </div>
      <div className="flex flex-wrap gap-2">
        {ALPHABET_LOWER.map((l) => (
          <button
            key={l}
            onClick={() => navigateTo(router, buildCanonicalWordListUrl({ type: "ends", value: l }))}
            className="h-10 w-10 rounded-md flex items-center justify-center glass-soft text-foreground/80 hover:text-brand hover:border-brand/30 transition-colors uppercase font-bree text-lg"
          >
            {l}
          </button>
        ))}
      </div>
    </GlassCard>
  );
}

export function UnscrambleByLengthMatrix() {
  const { t } = useLanguage();
  const router = useRouter();
  const title = "Unscramble by Length";
  const desc = "Browse words by length, 2 to 15 letters.";
  return (
    <GlassCard className="p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h3 className="section-label !text-[14px] text-brand">{title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{desc}</p>
        </div>
        <HubSearchBar type="length" />
      </div>
      <div className="flex flex-wrap gap-2">
        {WORD_LIST_LENGTHS.map((n) => (
          <button
            key={n}
            onClick={() => navigateTo(router, buildCanonicalWordListUrl({ type: "length", value: n }))}
            className="h-10 min-w-10 px-3 rounded-md flex items-center justify-center glass-soft text-foreground/80 hover:text-brand hover:border-brand/30 transition-colors font-bree text-sm tabular-nums"
          >
            {n}
          </button>
        ))}
      </div>
    </GlassCard>
  );
}

export function InternalLinkingMatrix() {
  return (
    <div className="space-y-4">
      <WordsStartingByMatrix />
      <WordsEndingByMatrix />
      <UnscrambleByLengthMatrix />
    </div>
  );
}
