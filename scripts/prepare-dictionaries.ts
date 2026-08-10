// scripts/prepare-dictionaries.ts
// One-shot dictionary builder for the JA/ZH word-game architecture.
//
// Pipeline:
//   1. Try to fetch JMdict (JSON mirror) from GitHub. On failure, fall back
//      to the curated list at data/wordgames/ja_romaji.txt (one romaji word
//      per line). If that file is also missing, bootstrap it from the
//      JA_ROMAJI array embedded in src/lib/dictionary.ts.
//   2. Try to fetch CC-CEDICT (text mirror) from GitHub. On failure, fall
//      back to data/wordgames/zh_pinyin.txt, bootstrapping from ZH_PINYIN.
//   3. Compute anagram keys (sortedKana / sortedPinyin) and length metadata
//      for every entry.
//   4. Write JSON to data/japanese-dictionary.json and
//      data/chinese-dictionary.json.
//
// Run with: `bun run scripts/prepare-dictionaries.ts`

import * as fs from "fs";
import * as path from "path";
import {
  romajiToKana,
  katakanaToHiragana,
  sortedKanaKey,
  cleanPinyin,
  sortedPinyinKey,
} from "../src/lib/utils/language-processors";
import type {
  JapaneseDictionaryEntry,
  ChineseDictionaryEntry,
} from "../src/lib/types/dictionary";

const ROOT = process.cwd();
const WG_DIR = path.join(ROOT, "data", "wordgames");
const OUT_DIR = path.join(ROOT, "data");

// ───────────────────────────────────────────────────────────────────────
// loadWordGamesFile — read a curated word list from data/wordgames/.
// One word per line; lines starting with '#' are comments. Empty lines
// are skipped.
// ───────────────────────────────────────────────────────────────────────
function loadWordGamesFile(filename: string): string[] {
  const filepath = path.join(WG_DIR, filename);
  if (!fs.existsSync(filepath)) return [];
  const content = fs.readFileSync(filepath, "utf8");
  const out: string[] = [];
  for (const raw of content.split("\n")) {
    const trimmed = raw.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    out.push(trimmed);
  }
  return out;
}

// ───────────────────────────────────────────────────────────────────────
// bootstrapCuratedFiles — if the curated fallback files do not yet exist,
// seed them from the JA_ROMAJI / ZH_PINYIN arrays embedded in
// src/lib/dictionary.ts (parsed as plain text so we don't need to import
// the module's other dependencies).
// ───────────────────────────────────────────────────────────────────────
function bootstrapCuratedFiles(): void {
  fs.mkdirSync(WG_DIR, { recursive: true });

  const jaPath = path.join(WG_DIR, "ja_romaji.txt");
  const zhPath = path.join(WG_DIR, "zh_pinyin.txt");
  if (fs.existsSync(jaPath) && fs.existsSync(zhPath)) return;

  const dictSrcPath = path.join(ROOT, "src", "lib", "dictionary.ts");
  if (!fs.existsSync(dictSrcPath)) {
    console.warn("src/lib/dictionary.ts not found; cannot bootstrap curated files.");
    return;
  }
  const src = fs.readFileSync(dictSrcPath, "utf8");

  function extractArray(name: string): string[] {
    const re = new RegExp(`const ${name} = \\[([\\s\\S]*?)\\];`);
    const m = src.match(re);
    if (!m) return [];
    return m[1]
      .split(",")
      .map((s) => s.trim().replace(/^["'`]|["'`]$/g, ""))
      .filter(Boolean);
  }

  if (!fs.existsSync(jaPath)) {
    const ja = extractArray("JA_ROMAJI");
    if (ja.length) {
      fs.writeFileSync(jaPath, ja.join("\n") + "\n");
      console.log(`Bootstrapped ${ja.length} JA romaji words → ${path.relative(ROOT, jaPath)}`);
    }
  }
  if (!fs.existsSync(zhPath)) {
    const zh = extractArray("ZH_PINYIN");
    if (zh.length) {
      fs.writeFileSync(zhPath, zh.join("\n") + "\n");
      console.log(`Bootstrapped ${zh.length} ZH pinyin words → ${path.relative(ROOT, zhPath)}`);
    }
  }
}

// ───────────────────────────────────────────────────────────────────────
// Remote fetch helpers (with timeout). Return null on any failure so the
// caller can transparently fall back to the curated list.
// ───────────────────────────────────────────────────────────────────────
async function tryFetchJson(url: string, timeoutMs = 8000): Promise<unknown | null> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeoutMs);
    const res = await fetch(url, { signal: ctrl.signal });
    clearTimeout(t);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function tryFetchText(url: string, timeoutMs = 8000): Promise<string | null> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeoutMs);
    const res = await fetch(url, { signal: ctrl.signal });
    clearTimeout(t);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

// ───────────────────────────────────────────────────────────────────────
// JMdict (Japanese) — try several community JSON mirrors.
// ───────────────────────────────────────────────────────────────────────
interface RawJaEntry {
  kanji?: string;
  kana?: string;
  romaji?: string;
  meaning?: string;
  sense?: Array<{ gloss?: string[] } | string>;
}

async function fetchJmdict(): Promise<RawJaEntry[] | null> {
  const urls = [
    "https://raw.githubusercontent.com/davidluzgouveia/japanese-words/master/japanese_words.json",
    "https://raw.githubusercontent.com/scriptin/jmdict-simplified/master/examples/jmdict-eng-3.6.1.json",
  ];
  for (const url of urls) {
    const data = await tryFetchJson(url);
    if (!data) continue;

    // Format A: { words: [{ kanji, kana, romaji, meaning }] }
    const a = data as { words?: RawJaEntry[] };
    if (Array.isArray(a.words) && a.words.length) return a.words;

    // Format B (jmdict-simplified): { words: [{ kanji: [{text}], kana: [{text}], sense: [{gloss:[{text}]}] }] }
    const b = data as {
      words?: Array<{
        kanji?: Array<{ text: string }>;
        kana?: Array<{ text: string }>;
        sense?: Array<{ gloss?: Array<{ text: string }> }>;
      }>;
    };
    if (Array.isArray(b.words) && b.words.length) {
      return b.words.map((w) => {
        const kanji = w.kanji?.[0]?.text ?? "";
        const kana = w.kana?.[0]?.text ?? "";
        const meaning = (w.sense?.[0]?.gloss ?? [])
          .map((g) => g?.text ?? "")
          .filter(Boolean)
          .join("; ");
        return { kanji, kana, meaning };
      });
    }
  }
  return null;
}

// ───────────────────────────────────────────────────────────────────────
// CC-CEDICT (Chinese) — try several plain-text mirrors.
// CEDICT line format: "Traditional Simplified [pin1 yin1] /def1/def2/..."
// ───────────────────────────────────────────────────────────────────────
interface RawZhEntry {
  simplified?: string;
  traditional?: string;
  pinyin?: string;
  definition?: string;
}

async function fetchCedict(): Promise<RawZhEntry[] | null> {
  const urls = [
    "https://raw.githubusercontent.com/lexica/lexica/master/lexica/data/cedict/cedict.txt",
    "https://raw.githubusercontent.com/rubber-duck-software/common-chinese-words/main/cedict.txt",
  ];
  for (const url of urls) {
    const text = await tryFetchText(url);
    if (!text) continue;
    const out: RawZhEntry[] = [];
    for (const line of text.split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const m = t.match(/^(\S+)\s+(\S+)\s+\[([^\]]+)\]\s*\/(.*)$/);
      if (!m) continue;
      const traditional = m[1]!;
      const simplified = m[2]!;
      const pinyin = m[3]!;
      const definition = m[4]!.split("/").filter(Boolean).join("; ");
      out.push({ traditional, simplified, pinyin, definition });
    }
    if (out.length) return out;
  }
  return null;
}

// ───────────────────────────────────────────────────────────────────────
// Builders: turn a raw source (remote or curated) into the final entry
// shape with all anagram/length metadata precomputed.
// ───────────────────────────────────────────────────────────────────────
function buildJaFromRomajiList(words: string[]): JapaneseDictionaryEntry[] {
  const seen = new Set<string>();
  const out: JapaneseDictionaryEntry[] = [];
  for (const romaji of words) {
    const kana = romajiToKana(romaji);
    if (!kana) continue;
    if (seen.has(kana)) continue;
    seen.add(kana);
    const chars = [...kana];
    out.push({
      kanji: "",
      kana,
      sortedKana: sortedKanaKey(kana),
      definition: "",
      length: chars.length,
      firstKana: chars[0] ?? "",
      lastKana: chars[chars.length - 1] ?? "",
    });
  }
  return out;
}

function buildJaFromRemote(raw: RawJaEntry[]): JapaneseDictionaryEntry[] {
  const seen = new Set<string>();
  const out: JapaneseDictionaryEntry[] = [];
  for (const r of raw) {
    const kana = r.kana ? katakanaToHiragana(r.kana) : r.romaji ? romajiToKana(r.romaji) : "";
    if (!kana) continue;
    if (seen.has(kana)) continue;
    seen.add(kana);
    let definition = "";
    if (Array.isArray(r.sense)) {
      definition = r.sense
        .map((s) => (typeof s === "string" ? s : (s?.gloss ?? []).join(", ")))
        .filter(Boolean)
        .join("; ");
    } else if (typeof r.meaning === "string") {
      definition = r.meaning;
    }
    const chars = [...kana];
    out.push({
      kanji: r.kanji ?? "",
      kana,
      sortedKana: sortedKanaKey(kana),
      definition,
      length: chars.length,
      firstKana: chars[0] ?? "",
      lastKana: chars[chars.length - 1] ?? "",
    });
  }
  return out;
}

function buildZhFromPinyinList(words: string[]): ChineseDictionaryEntry[] {
  const seen = new Set<string>();
  const out: ChineseDictionaryEntry[] = [];
  for (const pinyin of words) {
    const clean = cleanPinyin(pinyin);
    if (!clean || clean.length < 2) continue;
    if (seen.has(clean)) continue;
    seen.add(clean);
    out.push({
      simplified: "",
      traditional: "",
      pinyin: pinyin.trim().toLowerCase(),
      pinyinClean: clean,
      sortedPinyin: sortedPinyinKey(clean),
      definition: "",
      charLength: clean.length,
      firstPinyinChar: clean[0] ?? "",
      lastPinyinChar: clean[clean.length - 1] ?? "",
    });
  }
  return out;
}

function buildZhFromRemote(raw: RawZhEntry[]): ChineseDictionaryEntry[] {
  const seen = new Set<string>();
  const out: ChineseDictionaryEntry[] = [];
  for (const r of raw) {
    const clean = cleanPinyin(r.pinyin ?? "");
    if (!clean || clean.length < 2) continue;
    if (seen.has(clean)) continue;
    seen.add(clean);
    out.push({
      simplified: r.simplified ?? "",
      traditional: r.traditional ?? "",
      pinyin: (r.pinyin ?? "").trim().toLowerCase(),
      pinyinClean: clean,
      sortedPinyin: sortedPinyinKey(clean),
      definition: r.definition ?? "",
      charLength: clean.length,
      firstPinyinChar: clean[0] ?? "",
      lastPinyinChar: clean[clean.length - 1] ?? "",
    });
  }
  return out;
}

// ───────────────────────────────────────────────────────────────────────
// Main
// ───────────────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  bootstrapCuratedFiles();

  // ----- Japanese -----
  console.log("\n[ja] Fetching JMdict…");
  const jaRemote = await fetchJmdict();
  let jaEntries: JapaneseDictionaryEntry[];
  if (jaRemote && jaRemote.length) {
    console.log(`[ja] Remote: ${jaRemote.length} raw entries.`);
    jaEntries = buildJaFromRemote(jaRemote);
  } else {
    console.log("[ja] Remote unavailable; using curated ja_romaji.txt");
    jaEntries = buildJaFromRomajiList(loadWordGamesFile("ja_romaji.txt"));
  }
  fs.writeFileSync(
    path.join(OUT_DIR, "japanese-dictionary.json"),
    JSON.stringify(jaEntries)
  );
  console.log(`[ja] Wrote ${jaEntries.length} entries → data/japanese-dictionary.json`);

  // ----- Chinese -----
  console.log("\n[zh] Fetching CC-CEDICT…");
  const zhRemote = await fetchCedict();
  let zhEntries: ChineseDictionaryEntry[];
  if (zhRemote && zhRemote.length) {
    console.log(`[zh] Remote: ${zhRemote.length} raw entries.`);
    zhEntries = buildZhFromRemote(zhRemote);
  } else {
    console.log("[zh] Remote unavailable; using curated zh_pinyin.txt");
    zhEntries = buildZhFromPinyinList(loadWordGamesFile("zh_pinyin.txt"));
  }
  fs.writeFileSync(
    path.join(OUT_DIR, "chinese-dictionary.json"),
    JSON.stringify(zhEntries)
  );
  console.log(`[zh] Wrote ${zhEntries.length} entries → data/chinese-dictionary.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
