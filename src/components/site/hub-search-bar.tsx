"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { GlassCard } from "@/components/site/glass-card";

interface HubSearchBarProps {
  /** "starts" | "ends" | "length" — determines where to navigate. */
  mode: "starts" | "ends" | "length";
  /** "scrabble" | "wordle" — which dictionary to browse. */
  dict?: "scrabble" | "wordle";
  /** Placeholder text. */
  placeholder?: string;
}

/**
 * Search bar on hub pages. For starts/ends mode, typing a single letter a-z
 * navigates to the dedicated page. For length mode, typing a number 2-15.
 */
export function HubSearchBar({ mode, dict = "scrabble", placeholder }: HubSearchBarProps) {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = (form.elements.namedItem("q") as HTMLInputElement)?.value?.trim().toLowerCase() ?? "";
    if (!raw) return;

    if (mode === "length") {
      const n = parseInt(raw, 10);
      if (!Number.isNaN(n) && n >= 2 && n <= 15) {
        router.push(`/unscramble-${n}-letter-words`);
        form.reset();
      }
    } else {
      const letter = raw[0];
      if (/^[a-z]$/.test(letter)) {
        let prefix: string;
        if (dict === "wordle") {
          prefix = mode === "starts" ? "/wordle-words-starts-with-" : "/wordle-words-ends-with-";
        } else {
          prefix = mode === "starts" ? "/words-starts-with-" : "/words-ends-with-";
        }
        router.push(`${prefix}${letter}`);
        form.reset();
      }
    }
  };

  const defaultPlaceholder =
    mode === "length"
      ? "Type a number 2-15 to browse by length…"
      : dict === "wordle"
        ? mode === "starts"
          ? "Type a letter A-Z to browse Wordle words starting with it…"
          : "Type a letter A-Z to browse Wordle words ending with it…"
        : mode === "starts"
          ? "Type a letter A-Z to browse words starting with it…"
          : "Type a letter A-Z to browse words ending with it…";

  return (
    <GlassCard soft className="p-3 sm:p-4 max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="flex items-center gap-2 relative z-10">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" aria-hidden />
          <input
            name="q"
            type="text"
            inputMode={mode === "length" ? "numeric" : "text"}
            autoComplete="off"
            spellCheck={false}
            maxLength={mode === "length" ? 2 : 1}
            placeholder={placeholder ?? defaultPlaceholder}
            className="w-full h-11 pl-9 pr-3 rounded-md glass-soft border border-white/10 bg-transparent text-sm uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal focus-visible:border-brand focus:outline-none"
            aria-label={placeholder ?? defaultPlaceholder}
          />
        </div>
        <button
          type="submit"
          className="h-11 px-4 rounded-md bg-brand text-background font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer shrink-0"
        >
          Browse
        </button>
      </form>
    </GlassCard>
  );
}
