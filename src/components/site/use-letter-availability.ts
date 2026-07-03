"use client";

import { useState, useEffect } from "react";
import { ALPHABET, LENGTHS } from "@/components/site/word-bucket";
import type { LanguageCode } from "@/lib/languages";

/** Fetches word counts per letter for a given mode/length.
 *  When no specific length is given, fetches each length sequentially and combines.
 *  Returns { available: Set<string>, counts: Record<string, number> }. */
export function useLetterAvailability(lang: LanguageCode, mode: "starts" | "ends", length?: number) {
  const [available, setAvailable] = useState<Set<string>>(new Set(ALPHABET));
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;

    const lengthsToFetch = length ? [length] : LENGTHS;
    const combinedCounts: Record<string, number> = {};
    for (const l of ALPHABET) combinedCounts[l] = 0;

    async function fetchAll() {
      for (const l of lengthsToFetch) {
        if (cancelled) return;
        try {
          const url = new URL("/api/letter-counts", window.location.origin);
          url.searchParams.set("lang", lang);
          url.searchParams.set("mode", mode);
          url.searchParams.set("length", String(l));
          const res = await fetch(url.toString());
          const data = (await res.json()) as { counts: Record<string, number> };
          for (const letter of ALPHABET) {
            combinedCounts[letter] += data.counts[letter] ?? 0;
          }
        } catch {
          // On error for this length, skip
        }
      }
      if (cancelled) return;
      const set = new Set<string>();
      for (const letter of ALPHABET) {
        if (combinedCounts[letter] > 0) set.add(letter);
      }
      setAvailable(set);
      setCounts(combinedCounts);
    }

    fetchAll();

    return () => { cancelled = true; };
  }, [lang, mode, length]);

  return { available, counts };
}
