// src/app/api/unscramble/route.ts
// Word unscrambler. For JA/ZH, uses the pre-built JSON dictionaries with
// anagram (sorted-key) and length indexes. For all other languages, falls
// back to the original `unscramble()` engine over the in-memory Scrabble
// word lists.

import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";
import type { LanguageCode } from "@/lib/languages";
import { unscramble } from "@/lib/unscramble";
import { solverLimiter, getClientIp } from "@/lib/rate-limit";
import {
  romajiToKana,
  sortedKanaKey,
  cleanPinyin,
  sortedPinyinKey,
  canForm,
} from "@/lib/utils/language-processors";
import type {
  JapaneseDictionaryEntry,
  ChineseDictionaryEntry,
  WordGameEntry,
  UnscrambleResponse,
} from "@/lib/types/dictionary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // rate-limited per IP

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
};

// ───────────────────────────────────────────────────────────────────────
// In-memory indexes for the JA/ZH JSON dictionaries. Built once and cached
// on the global object so HMR / multiple requests don't re-parse the files.
// ───────────────────────────────────────────────────────────────────────
interface JaIndex {
  entries: JapaneseDictionaryEntry[];
  bySorted: Map<string, JapaneseDictionaryEntry[]>;
  byLength: Map<number, JapaneseDictionaryEntry[]>;
}
interface ZhIndex {
  entries: ChineseDictionaryEntry[];
  bySorted: Map<string, ChineseDictionaryEntry[]>;
  byLength: Map<number, ChineseDictionaryEntry[]>;
}

const g = globalThis as unknown as {
  __jaIndex?: JaIndex;
  __zhIndex?: ZhIndex;
};

function loadJaIndex(): JaIndex {
  if (g.__jaIndex) return g.__jaIndex;
  const filepath = path.join(process.cwd(), "data", "japanese-dictionary.json");
  let entries: JapaneseDictionaryEntry[] = [];
  if (fs.existsSync(filepath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(filepath, "utf8"));
      if (Array.isArray(parsed)) entries = parsed as JapaneseDictionaryEntry[];
    } catch {
      entries = [];
    }
  }
  const bySorted = new Map<string, JapaneseDictionaryEntry[]>();
  const byLength = new Map<number, JapaneseDictionaryEntry[]>();
  for (const e of entries) {
    const s = bySorted.get(e.sortedKana);
    if (s) s.push(e);
    else bySorted.set(e.sortedKana, [e]);
    const l = byLength.get(e.length);
    if (l) l.push(e);
    else byLength.set(e.length, [e]);
  }
  g.__jaIndex = { entries, bySorted, byLength };
  return g.__jaIndex;
}

function loadZhIndex(): ZhIndex {
  if (g.__zhIndex) return g.__zhIndex;
  const filepath = path.join(process.cwd(), "data", "chinese-dictionary.json");
  let entries: ChineseDictionaryEntry[] = [];
  if (fs.existsSync(filepath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(filepath, "utf8"));
      if (Array.isArray(parsed)) entries = parsed as ChineseDictionaryEntry[];
    } catch {
      entries = [];
    }
  }
  const bySorted = new Map<string, ChineseDictionaryEntry[]>();
  const byLength = new Map<number, ChineseDictionaryEntry[]>();
  for (const e of entries) {
    const s = bySorted.get(e.sortedPinyin);
    if (s) s.push(e);
    else bySorted.set(e.sortedPinyin, [e]);
    const l = byLength.get(e.charLength);
    if (l) l.push(e);
    else byLength.set(e.charLength, [e]);
  }
  g.__zhIndex = { entries, bySorted, byLength };
  return g.__zhIndex;
}

// ───────────────────────────────────────────────────────────────────────
// Solvers
// ───────────────────────────────────────────────────────────────────────
function solveJa(
  letters: string,
  mode: "exact" | "subword",
  lengthFilter?: number
): JapaneseDictionaryEntry[] {
  const idx = loadJaIndex();
  const kana = romajiToKana(letters);
  if (!kana) return [];

  if (mode === "exact") {
    // O(1) sorted-key lookup; all anagrams share the same sorted kana.
    const key = sortedKanaKey(kana);
    const hits = idx.bySorted.get(key) ?? [];
    return lengthFilter ? hits.filter((e) => e.length === lengthFilter) : hits;
  }

  // subword: every kana of the entry must be present in the input pool.
  const pool = kana;
  const poolLen = [...pool].length;
  const out: JapaneseDictionaryEntry[] = [];
  for (const [L, bucket] of idx.byLength) {
    if (L < 2 || L > poolLen) continue;
    if (lengthFilter && L !== lengthFilter) continue;
    for (const e of bucket) {
      if (canForm(e.kana, pool)) out.push(e);
    }
  }
  // Longest first, then alphabetical by kana.
  out.sort((a, b) => b.length - a.length || a.kana.localeCompare(b.kana));
  return out;
}

function solveZh(
  letters: string,
  mode: "exact" | "subword",
  lengthFilter?: number
): ChineseDictionaryEntry[] {
  const idx = loadZhIndex();
  const clean = cleanPinyin(letters);
  if (!clean) return [];

  if (mode === "exact") {
    const key = sortedPinyinKey(clean);
    const hits = idx.bySorted.get(key) ?? [];
    return lengthFilter ? hits.filter((e) => e.charLength === lengthFilter) : hits;
  }

  const pool = clean;
  const poolLen = pool.length;
  const out: ChineseDictionaryEntry[] = [];
  for (const [L, bucket] of idx.byLength) {
    if (L < 2 || L > poolLen) continue;
    if (lengthFilter && L !== lengthFilter) continue;
    for (const e of bucket) {
      if (canForm(e.pinyinClean, pool)) out.push(e);
    }
  }
  out.sort(
    (a, b) => b.charLength - a.charLength || a.pinyinClean.localeCompare(b.pinyinClean)
  );
  return out;
}

// ───────────────────────────────────────────────────────────────────────
// Route handler
// ───────────────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  if (solverLimiter.hit(getClientIp(req))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const lang = (req.nextUrl.searchParams.get("lang") || "en") as LanguageCode;
  const letters = (req.nextUrl.searchParams.get("letters") || "")
    .toLowerCase()
    .slice(0, 30);

  // ── JA/ZH: use the new anagram-key engine ────────────────────────────
  if (lang === "ja" || lang === "zh") {
    const mode: "exact" | "subword" =
      req.nextUrl.searchParams.get("mode") === "subword" ? "subword" : "exact";
    const lengthParam = req.nextUrl.searchParams.get("length");
    const lengthFilter =
      lengthParam && /^\d+$/.test(lengthParam) ? Number(lengthParam) : undefined;

    const t0 = performance.now();
    const hits =
      lang === "ja"
        ? solveJa(letters, mode, lengthFilter)
        : solveZh(letters, mode, lengthFilter);
    const ms = Math.round(performance.now() - t0);

    const body: UnscrambleResponse = {
      lang,
      mode,
      input: letters,
      count: hits.length,
      results: hits as WordGameEntry[],
      ms,
    };
    return NextResponse.json(body, { headers: CACHE_HEADERS });
  }

  // ── Other languages: existing engine (Scrabble word lists) ───────────
  const startsWith = req.nextUrl.searchParams.get("startsWith") || undefined;
  const endsWith = req.nextUrl.searchParams.get("endsWith") || undefined;
  const mustInclude = req.nextUrl.searchParams.get("mustInclude") || undefined;
  const minLength = Number(req.nextUrl.searchParams.get("minLength")) || undefined;
  const maxLength = Number(req.nextUrl.searchParams.get("maxLength")) || undefined;

  if (!letters) {
    return NextResponse.json({ groups: [], total: 0 }, { headers: CACHE_HEADERS });
  }

  const result = unscramble(letters, lang, {
    startsWith,
    endsWith,
    mustInclude,
    minLength,
    maxLength,
  });
  return NextResponse.json(result, { headers: CACHE_HEADERS });
}
