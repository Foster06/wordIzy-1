import { NextResponse } from "next/server";
import { getDict } from "@/lib/dictionary";
import type { LanguageCode } from "@/lib/languages";

function getDailySeedIndex(arrayLength: number): number {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const hash = (seed * 16807) % 2147483647;
  return Math.abs(hash) % arrayLength;
}

function scrambleString(str: string): string {
  const arr = str.toUpperCase().split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const result = arr.join("");
  return result === str.toUpperCase() ? scrambleString(str) : result;
}

// ───────────────────────────────────────────────────────────────────────
// LANGUAGE-SPECIFIC HINT GENERATION
// Each language has its own suffix patterns, grammatical terminology,
// and hint phrasing. Hints are generated in the user's selected language.
// ───────────────────────────────────────────────────────────────────────

interface HintPattern {
  /** Suffix or prefix to match (lowercase) */
  match: string;
  /** Type: "suffix" or "prefix" */
  type: "suffix" | "prefix";
  /** Minimum word length for this pattern to apply */
  minLen: number;
  /** Hint template — uses {len}, {first}, {last} placeholders */
  hint: string;
}

interface LangHints {
  /** Suffix/prefix patterns in priority order */
  patterns: HintPattern[];
  /** Generic fallback hint — used when no pattern matches */
  generic: string;
}

const HINT_TEMPLATES: Record<LanguageCode, LangHints> = {
  // ── ENGLISH ──────────────────────────────────────────────────────────
  en: {
    patterns: [
      { match: "ing", type: "suffix", minLen: 5, hint: "A {len}-letter present participle (verb ending in -ing), starting with \"{first}\"" },
      { match: "ed", type: "suffix", minLen: 5, hint: "A {len}-letter past-tense verb (ends in -ed), starting with \"{first}\"" },
      { match: "ly", type: "suffix", minLen: 5, hint: "A {len}-letter adverb (ends in -ly), starting with \"{first}\"" },
      { match: "tion", type: "suffix", minLen: 6, hint: "A {len}-letter noun of action (ends in -tion), starting with \"{first}\"" },
      { match: "ness", type: "suffix", minLen: 7, hint: "A {len}-letter abstract noun (ends in -ness), starting with \"{first}\"" },
      { match: "ment", type: "suffix", minLen: 7, hint: "A {len}-letter noun (ends in -ment), starting with \"{first}\"" },
      { match: "able", type: "suffix", minLen: 7, hint: "A {len}-letter adjective (ends in -able), starting with \"{first}\"" },
      { match: "ous", type: "suffix", minLen: 6, hint: "A {len}-letter adjective (ends in -ous), starting with \"{first}\"" },
      { match: "est", type: "suffix", minLen: 6, hint: "A {len}-letter superlative (ends in -est), starting with \"{first}\"" },
      { match: "er", type: "suffix", minLen: 5, hint: "A {len}-letter comparative or agent noun (ends in -er), starting with \"{first}\"" },
      { match: "s", type: "suffix", minLen: 5, hint: "A {len}-letter plural noun (ends in -s), starting with \"{first}\"" },
      { match: "un", type: "prefix", minLen: 6, hint: "A {len}-letter word with the negative prefix \"un-\", ending in \"{last}\"" },
      { match: "re", type: "prefix", minLen: 6, hint: "A {len}-letter word with the prefix \"re-\" (again/back), ending in \"{last}\"" },
    ],
    generic: "A {len}-letter English word starting with \"{first}\" and ending with \"{last}\"",
  },

  // ── FRENCH ───────────────────────────────────────────────────────────
  fr: {
    patterns: [
      { match: "tion", type: "suffix", minLen: 6, hint: "Un mot de {len} lettres, nom d'action (terminaison -tion), commençant par \"{first}\"" },
      { match: "ment", type: "suffix", minLen: 7, hint: "Un mot de {len} lettres, adverbe (terminaison -ment), commençant par \"{first}\"" },
      { match: "able", type: "suffix", minLen: 7, hint: "Un mot de {len} lettres, adjectif (terminaison -able), commençant par \"{first}\"" },
      { match: "eux", type: "suffix", minLen: 6, hint: "Un mot de {len} lettres, adjectif (terminaison -eux), commençant par \"{first}\"" },
      { match: "ent", type: "suffix", minLen: 6, hint: "Un mot de {len} lettres, verbe au présent (terminaison -ent), commençant par \"{first}\"" },
      { match: "ant", type: "suffix", minLen: 6, hint: "Un mot de {len} lettres, participe présent (terminaison -ant), commençant par \"{first}\"" },
      { match: "ais", type: "suffix", minLen: 6, hint: "Un mot de {len} lettres, verbe à l'imparfait (terminaison -ais), commençant par \"{first}\"" },
      { match: "er", type: "suffix", minLen: 5, hint: "Un mot de {len} lettres, verbe à l'infinitif (terminaison -er), commençant par \"{first}\"" },
      { match: "ée", type: "suffix", minLen: 5, hint: "Un mot de {len} lettres, nom féminin (terminaison -ée), commençant par \"{first}\"" },
      { match: "é", type: "suffix", minLen: 5, hint: "Un mot de {len} lettres, participe passé (terminaison -é), commençant par \"{first}\"" },
      { match: "s", type: "suffix", minLen: 5, hint: "Un mot de {len} lettres, pluriel (terminaison -s), commençant par \"{first}\"" },
      { match: "re", type: "prefix", minLen: 6, hint: "Un mot de {len} lettres avec le préfixe « re- » (répétition), se terminant par \"{last}\"" },
    ],
    generic: "Un mot français de {len} lettres commençant par \"{first}\" et se terminant par \"{last}\"",
  },

  // ── SPANISH ──────────────────────────────────────────────────────────
  es: {
    patterns: [
      { match: "ción", type: "suffix", minLen: 6, hint: "Una palabra de {len} letras, sustantivo de acción (terminación -ción), empieza por \"{first}\"" },
      { match: "mente", type: "suffix", minLen: 7, hint: "Una palabra de {len} letras, adverbio (terminación -mente), empieza por \"{first}\"" },
      { match: "able", type: "suffix", minLen: 7, hint: "Una palabra de {len} letras, adjetivo (terminación -able), empieza por \"{first}\"" },
      { match: "oso", type: "suffix", minLen: 6, hint: "Una palabra de {len} letras, adjetivo (terminación -oso), empieza por \"{first}\"" },
      { match: "ado", type: "suffix", minLen: 6, hint: "Una palabra de {len} letras, participio pasado (terminación -ado), empieza por \"{first}\"" },
      { match: "ida", type: "suffix", minLen: 6, hint: "Una palabra de {len} letras, participio pasado (terminación -ida), empieza por \"{first}\"" },
      { match: "ante", type: "suffix", minLen: 6, hint: "Una palabra de {len} letras, participio presente (terminación -ante), empieza por \"{first}\"" },
      { match: "ar", type: "suffix", minLen: 5, hint: "Una palabra de {len} letras, verbo en infinitivo (terminación -ar), empieza por \"{first}\"" },
      { match: "er", type: "suffix", minLen: 5, hint: "Una palabra de {len} letras, verbo en infinitivo (terminación -er), empieza por \"{first}\"" },
      { match: "ir", type: "suffix", minLen: 5, hint: "Una palabra de {len} letras, verbo en infinitivo (terminación -ir), empieza por \"{first}\"" },
      { match: "s", type: "suffix", minLen: 5, hint: "Una palabra de {len} letras, plural (terminación -s), empieza por \"{first}\"" },
      { match: "re", type: "prefix", minLen: 6, hint: "Una palabra de {len} letras con el prefijo «re-» (repetición), termina en \"{last}\"" },
    ],
    generic: "Una palabra española de {len} letras que empieza por \"{first}\" y termina por \"{last}\"",
  },

  // ── GERMAN ───────────────────────────────────────────────────────────
  de: {
    patterns: [
      { match: "ung", type: "suffix", minLen: 6, hint: "Ein {len}-Buchstaben-Wort, Verbalnomen (Endung -ung), beginnt mit \"{first}\"" },
      { match: "heit", type: "suffix", minLen: 7, hint: "Ein {len}-Buchstaben-Wort, Abstraktum (Endung -heit), beginnt mit \"{first}\"" },
      { match: "keit", type: "suffix", minLen: 7, hint: "Ein {len}-Buchstaben-Wort, Abstraktum (Endung -keit), beginnt mit \"{first}\"" },
      { match: "lich", type: "suffix", minLen: 7, hint: "Ein {len}-Buchstaben-Wort, Adjektiv (Endung -lich), beginnt mit \"{first}\"" },
      { match: "isch", type: "suffix", minLen: 7, hint: "Ein {len}-Buchstaben-Wort, Adjektiv (Endung -isch), beginnt mit \"{first}\"" },
      { match: "bar", type: "suffix", minLen: 7, hint: "Ein {len}-Buchstaben-Wort, Adjektiv (Endung -bar), beginnt mit \"{first}\"" },
      { match: "cht", type: "suffix", minLen: 6, hint: "Ein {len}-Buchstaben-Wort (Endung -cht), beginnt mit \"{first}\"" },
      { match: "en", type: "suffix", minLen: 5, hint: "Ein {len}-Buchstaben-Wort, Plural oder Infinitiv (Endung -en), beginnt mit \"{first}\"" },
      { match: "er", type: "suffix", minLen: 5, hint: "Ein {len}-Buchstaben-Wort, Komparativ oder Nomen agentis (Endung -er), beginnt mit \"{first}\"" },
      { match: "ge", type: "prefix", minLen: 6, hint: "Ein {len}-Buchstaben-Wort mit dem Präfix «ge-», endet auf \"{last}\"" },
      { match: "ver", type: "prefix", minLen: 6, hint: "Ein {len}-Buchstaben-Wort mit dem Präfix «ver-», endet auf \"{last}\"" },
    ],
    generic: "Ein deutsches Wort mit {len} Buchstaben, beginnt mit \"{first}\" und endet auf \"{last}\"",
  },

  // ── ITALIAN ──────────────────────────────────────────────────────────
  it: {
    patterns: [
      { match: "ione", type: "suffix", minLen: 6, hint: "Una parola di {len} lettere, sostantivo di azione (terminazione -ione), inizia con \"{first}\"" },
      { match: "mente", type: "suffix", minLen: 7, hint: "Una parola di {len} lettere, avverbio (terminazione -mente), inizia con \"{first}\"" },
      { match: "bile", type: "suffix", minLen: 7, hint: "Una parola di {len} lettere, aggettivo (terminazione -bile), inizia con \"{first}\"" },
      { match: "oso", type: "suffix", minLen: 6, hint: "Una parola di {len} lettere, aggettivo (terminazione -oso), inizia con \"{first}\"" },
      { match: "ato", type: "suffix", minLen: 6, hint: "Una parola di {len} lettere, participio passato (terminazione -ato), inizia con \"{first}\"" },
      { match: "uto", type: "suffix", minLen: 6, hint: "Una parola di {len} lettere, participio passato (terminazione -uto), inizia con \"{first}\"" },
      { match: "ante", type: "suffix", minLen: 6, hint: "Una parola di {len} lettere, participio presente (terminazione -ante), inizia con \"{first}\"" },
      { match: "are", type: "suffix", minLen: 5, hint: "Una parola di {len} lettere, verbo all'infinito (terminazione -are), inizia con \"{first}\"" },
      { match: "ere", type: "suffix", minLen: 5, hint: "Una parola di {len} lettere, verbo all'infinito (terminazione -ere), inizia con \"{first}\"" },
      { match: "ire", type: "suffix", minLen: 5, hint: "Una parola di {len} lettere, verbo all'infinito (terminazione -ire), inizia con \"{first}\"" },
      { match: "i", type: "suffix", minLen: 5, hint: "Una parola di {len} lettere, plurale o verbo (terminazione -i), inizia con \"{first}\"" },
    ],
    generic: "Una parola italiana di {len} lettere che inizia con \"{first}\" e finisce con \"{last}\"",
  },

  // ── PORTUGUESE ───────────────────────────────────────────────────────
  pt: {
    patterns: [
      { match: "ção", type: "suffix", minLen: 6, hint: "Uma palavra de {len} letras, substantivo de ação (terminação -ção), começa com \"{first}\"" },
      { match: "mente", type: "suffix", minLen: 7, hint: "Uma palavra de {len} letras, advérbio (terminação -mente), começa com \"{first}\"" },
      { match: "vel", type: "suffix", minLen: 7, hint: "Uma palavra de {len} letras, adjetivo (terminação -vel), começa com \"{first}\"" },
      { match: "oso", type: "suffix", minLen: 6, hint: "Uma palavra de {len} letras, adjetivo (terminação -oso), começa com \"{first}\"" },
      { match: "ado", type: "suffix", minLen: 6, hint: "Uma palavra de {len} letras, particípio passado (terminação -ado), começa com \"{first}\"" },
      { match: "ido", type: "suffix", minLen: 6, hint: "Uma palavra de {len} letras, particípio passado (terminação -ido), começa com \"{first}\"" },
      { match: "nte", type: "suffix", minLen: 6, hint: "Uma palavra de {len} letras, particípio presente (terminação -nte), começa com \"{first}\"" },
      { match: "ar", type: "suffix", minLen: 5, hint: "Uma palavra de {len} letras, verbo no infinitivo (terminação -ar), começa com \"{first}\"" },
      { match: "er", type: "suffix", minLen: 5, hint: "Uma palavra de {len} letras, verbo no infinitivo (terminação -er), começa com \"{first}\"" },
      { match: "ir", type: "suffix", minLen: 5, hint: "Uma palavra de {len} letras, verbo no infinitivo (terminação -ir), começa com \"{first}\"" },
      { match: "s", type: "suffix", minLen: 5, hint: "Uma palavra de {len} letras, plural (terminação -s), começa com \"{first}\"" },
    ],
    generic: "Uma palavra portuguesa de {len} letras que começa com \"{first}\" e termina com \"{last}\"",
  },

  // ── DUTCH ────────────────────────────────────────────────────────────
  nl: {
    patterns: [
      { match: "ing", type: "suffix", minLen: 6, hint: "Een {len}-letterwoord, verbaal substantief (uitgang -ing), begint met \"{first}\"" },
      { match: "heid", type: "suffix", minLen: 7, hint: "Een {len}-letterwoord, abstractum (uitgang -heid), begint met \"{first}\"" },
      { match: "lijk", type: "suffix", minLen: 7, hint: "Een {len}-letterwoord, bijvoeglijk naamwoord (uitgang -lijk), begint met \"{first}\"" },
      { match: "ig", type: "suffix", minLen: 6, hint: "Een {len}-letterwoord, bijvoeglijk naamwoord (uitgang -ig), begint met \"{first}\"" },
      { match: "baar", type: "suffix", minLen: 7, hint: "Een {len}-letterwoord, bijvoeglijk naamwoord (uitgang -baar), begint met \"{first}\"" },
      { match: "je", type: "suffix", minLen: 5, hint: "Een {len}-letterwoord, verkleinwoord (uitgang -je), begint met \"{first}\"" },
      { match: "en", type: "suffix", minLen: 5, hint: "Een {len}-letterwoord, meervoud of infinitief (uitgang -en), begint met \"{first}\"" },
      { match: "er", type: "suffix", minLen: 5, hint: "Een {len}-letterwoord, comparatief (uitgang -er), begint met \"{first}\"" },
      { match: "ge", type: "prefix", minLen: 6, hint: "Een {len}-letterwoord met het voorvoegsel «ge-», eindigt op \"{last}\"" },
      { match: "ver", type: "prefix", minLen: 6, hint: "Een {len}-letterwoord met het voorvoegsel «ver-», eindigt op \"{last}\"" },
    ],
    generic: "Een Nederlands woord van {len} letters, begint met \"{first}\" en eindigt op \"{last}\"",
  },

  // ── JAPANESE (Romaji) ────────────────────────────────────────────────
  ja: {
    patterns: [
      // Japanese romaji doesn't have suffix patterns like European languages.
      // Hints focus on mora structure and vowel patterns.
      { match: "n", type: "suffix", minLen: 5, hint: "{len}文字のローマ字単語。語尾の「ん」(N)で終わる — 先頭文字は「{first}」" },
    ],
    generic: "{len}文字のローマ字単語。「{first}」で始まり「{last}」で終わる",
  },

  // ── CHINESE (Pinyin) ──────────────────────────────────────────────────
  zh: {
    patterns: [
      // Pinyin doesn't have suffix patterns. Hints focus on syllable structure.
      { match: "ng", type: "suffix", minLen: 5, hint: "{len}个字母的拼音词，以韵尾 -ng 结尾 — 起始字母是「{first}」" },
      { match: "n", type: "suffix", minLen: 5, hint: "{len}个字母的拼音词，以韵尾 -n 结尾 — 起始字母是「{first}」" },
    ],
    generic: "{len}个字母的拼音词，以「{first}」开头，以「{last}」结尾",
  },
};

/** Generate a language-specific hint from the word itself (no external API call).
 *  Each language has its own suffix/prefix patterns and hint phrasing. */
function buildHint(word: string, lang: LanguageCode): string {
  const w = word.toLowerCase();
  const len = word.length;
  const firstLetter = w[0]!.toUpperCase();
  const lastLetter = w[len - 1]!.toUpperCase();

  const templates = HINT_TEMPLATES[lang] ?? HINT_TEMPLATES.en;

  for (const pattern of templates.patterns) {
    if (len < pattern.minLen) continue;
    if (pattern.type === "suffix" && w.endsWith(pattern.match)) {
      return pattern.hint
        .replace("{len}", String(len))
        .replace("{first}", firstLetter)
        .replace("{last}", lastLetter);
    }
    if (pattern.type === "prefix" && w.startsWith(pattern.match)) {
      return pattern.hint
        .replace("{len}", String(len))
        .replace("{first}", firstLetter)
        .replace("{last}", lastLetter);
    }
  }

  return templates.generic
    .replace("{len}", String(len))
    .replace("{first}", firstLetter)
    .replace("{last}", lastLetter);
}

export const runtime = "nodejs";

// ───────────────────────────────────────────────────────────────────────
// CACHED GAME WORD POOL
// Build the 5-8 letter word array ONCE per language and cache it.
// Previously this rebuilt a 30k+ element array on EVERY request, which
// added ~50-100ms of unnecessary work per call. Now it's O(1) after
// the first build.
// ───────────────────────────────────────────────────────────────────────
const gameWordPoolCache = new Map<LanguageCode, string[]>();

function getGameWordPool(lang: LanguageCode): string[] {
  const cached = gameWordPoolCache.get(lang);
  if (cached) return cached;

  const dict = getDict(lang);
  const words: string[] = [];
  for (let l = 5; l <= 8; l++) {
    const bucket = dict.byLength.get(l) ?? [];
    for (const entry of bucket) {
      words.push(entry.word.toUpperCase());
    }
  }

  const fallbackDictionary = [
    "AWESOME", "MYSTERY", "SHUFFLE", "DYNAMIC", "SOLVER", "BLITZ",
    "PUZZLE", "VICTORY", "WORDSMITH", "ALPHABET", "CREATIVE", "MATRIX",
  ];

  if (words.length === 0) {
    words.push(...fallbackDictionary);
  }

  gameWordPoolCache.set(lang, words);
  return words;
}

// Pre-warm the English game word pool on module load (server boot).
// This ensures the first /api/game/random-word request doesn't pay
// the ~1s dictionary load + ~50ms array build cost. Fire-and-forget.
if (typeof window === "undefined") {
  void import("@/lib/dictionary").then(({ getDict }) => {
    try {
      getDict("en"); // loads dictionary
      getGameWordPool("en"); // builds + caches game word pool
    } catch {
      /* ignore — per-request path will retry */
    }
  }).catch(() => {
    /* ignore */
  });
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawLang = searchParams.get("lang");
    const mode = searchParams.get("mode") || "infinite";
    const lang = rawLang && rawLang.trim() ? rawLang.toLowerCase() : "en";

    // Use the cached game word pool — O(1) after first build per language.
    const words = getGameWordPool(lang as LanguageCode);

    const targetIndex = mode === "daily" ? getDailySeedIndex(words.length) : Math.floor(Math.random() * words.length);
    const targetWord = words[targetIndex]!.trim().toUpperCase();

    const scrambledWord = scrambleString(targetWord);
    const hint = buildHint(targetWord, lang as LanguageCode);

    return NextResponse.json(
      {
        scrambled: scrambledWord,
        answer: targetWord,
        hint,
      },
      {
        headers: {
          // Cache for 1 hour on CDN, serve stale while revalidating.
          // For daily mode, the same word is returned all day so caching is safe.
          // For infinite mode, the random pick happens server-side per request,
          // but the CDN can still cache the dictionary-loaded module.
          "Cache-Control": mode === "daily" ? "public, s-maxage=3600, stale-while-revalidate=86400" : "no-store",
        },
      }
    );
  } catch (error) {
    console.error("[/api/game/random-word] error:", error);
    return NextResponse.json({ scrambled: "PUZZLE", answer: "PUZZLE", hint: "A 6-letter fallback word." });
  }
}

