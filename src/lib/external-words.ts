// src/lib/external-words.ts
// Server-side integration with external word APIs:
//   - Datamuse (https://api.datamuse.com) — English synonyms/related words
//   - OpenThesaurus (https://www.openthesaurus.de) — German synonyms
//   - Free Dictionary API (https://api.dictionaryapi.dev) — definitions (en/es/fr/de/it/pt)
//   - Wiktionary API — definitions fallback for all languages
// All results are filtered through the Scrabble-validity checker so only
// official-dictionary-acceptable words are returned.

import type { LanguageCode } from "./languages";
import { normalizeWord } from "./languages";
import { isScrabbleValid } from "./scrabble-filter";

const FETCH_TIMEOUT = 8000;

async function fetchJson(url: string): Promise<unknown | null> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT);
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { "Accept": "application/json", "User-Agent": "WordIzy/1.0" },
    });
    clearTimeout(t);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export interface SynonymResult {
  synonyms: string[];
  source: string;
}

/** Fetch synonyms, filtered to Scrabble-valid words only. */
export async function getSynonyms(word: string, lang: LanguageCode): Promise<SynonymResult> {
  const clean = word.trim();
  if (!clean) return { synonyms: [], source: "" };

  if (lang === "de") {
    return openThesaurus(clean);
  }
  // Datamuse supports English well; usable for en/es/fr/it/pt with rel_syn.
  return datamuse(clean, lang);
}

async function datamuse(word: string, lang: LanguageCode): Promise<SynonymResult> {
  const langCode = lang === "en" ? "en" : lang === "es" ? "es" : lang === "fr" ? "fr" : lang === "it" ? "it" : lang === "pt" ? "pt" : "en";
  const url = `https://api.datamuse.com/words?rel_syn=${encodeURIComponent(word)}&max=30&v=${langCode}`;
  const data = (await fetchJson(url)) as { word: string }[] | null;
  if (!Array.isArray(data)) return { synonyms: [], source: "datamuse" };
  const syns = data
    .map((d) => d.word)
    .filter((w) => isScrabbleValid(w, lang) && normalizeWord(w).length >= 2)
    .slice(0, 20);
  return { synonyms: syns, source: "datamuse" };
}

async function openThesaurus(word: string): Promise<SynonymResult> {
  const url = `https://www.openthesaurus.de/synonyme/search?q=${encodeURIComponent(word)}&format=application/json`;
  const data = (await fetchJson(url)) as {
    synsets?: { terms?: { term: string }[] }[];
  } | null;
  if (!data?.synsets) return { synonyms: [], source: "openthesaurus" };
  const set = new Set<string>();
  for (const ss of data.synsets) {
    for (const t of ss.terms ?? []) {
      const w = t.term.split("(")[0].trim().split(/\s+/)[0]; // first word only
      if (w && isScrabbleValid(w, "de") && normalizeWord(w).length >= 2) {
        set.add(w);
      }
    }
  }
  return { synonyms: Array.from(set).slice(0, 20), source: "openthesaurus" };
}

export interface DefinitionResult {
  definition: string;
  partOfSpeech?: string;
  source: string;
  phonetic?: string;
}

const DICT_API_LANGS: Record<LanguageCode, string | null> = {
  en: "en", es: "es", fr: "fr", de: "de", it: "it", pt: "pt",
  nl: null, ja: null, zh: null,
};

const WIKT_LANGS: Record<LanguageCode, string> = {
  en: "en", es: "es", fr: "fr", de: "de", it: "it", pt: "pt",
  nl: "nl", ja: "ja", zh: "zh",
};

/** Fetch a definition: try Free Dictionary API, then Wiktionary, then LLM. */
export async function getDefinition(word: string, lang: LanguageCode): Promise<DefinitionResult> {
  const clean = word.trim();
  if (!clean) return { definition: "", source: "" };

  // 1. Free Dictionary API
  const dl = DICT_API_LANGS[lang];
  if (dl) {
    const r = await freeDictionaryApi(clean, dl);
    if (r.definition) return r;
  }
  // 2. Wiktionary
  const w = await wiktionary(clean, WIKT_LANGS[lang]);
  if (w.definition) return w;
  // 3. LLM fallback (best-effort concise definition)
  return llmDefinition(clean, lang);
}

async function freeDictionaryApi(word: string, lang: string): Promise<DefinitionResult> {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/${lang}/${encodeURIComponent(word)}`;
  const data = (await fetchJson(url)) as Array<{
    word: string;
    phonetic?: string;
    phonetics?: { text?: string }[];
    meanings?: { partOfSpeech?: string; definitions?: { definition: string }[] }[];
  }> | null;
  if (!Array.isArray(data) || data.length === 0) return { definition: "", source: "freedict" };
  const e = data[0];
  const meaning = e.meanings?.[0];
  const def = meaning?.definitions?.[0]?.definition;
  const phonetic = e.phonetic || e.phonetics?.find((p) => p.text)?.text;
  if (!def) return { definition: "", source: "freedict" };
  return {
    definition: def,
    partOfSpeech: meaning?.partOfSpeech,
    phonetic,
    source: "Free Dictionary API",
  };
}

async function wiktionary(word: string, lang: string): Promise<DefinitionResult> {
  const url = `https://${lang}.wiktionary.org/w/api.php?action=query&titles=${encodeURIComponent(word)}&prop=revisions&rvprop=content&format=json&rvslots=main&redirects=1`;
  const data = (await fetchJson(url)) as {
    query?: { pages?: Record<string, { revisions?: { slots?: { main?: { "*": string } } }[] }> };
  } | null;
  const pages = data?.query?.pages;
  if (!pages) return { definition: "", source: "wiktionary" };
  const first = Object.values(pages)[0];
  const wikitext = first?.revisions?.[0]?.slots?.main?.["*"];
  if (!wikitext) return { definition: "", source: "wiktionary" };
  const def = extractWiktionaryDef(wikitext);
  return { definition: def, source: def ? "Wiktionary" : "wiktionary" };
}

/** Parse the first gloss line from wikitext (handles # definitions, {{gloss}}). */
function extractWiktionaryDef(wikitext: string): string {
  const lines = wikitext.split("\n");
  for (const line of lines) {
    const m = line.match(/^#\s+(.+)/);
    if (m) {
      let def = m[1];
      // strip wiki templates {{...}} but keep inner text where useful
      def = def.replace(/\{\{gloss\|([^}]*)\}\}/g, "$1");
      def = def.replace(/\{\{[^}]*\}\}/g, "");
      def = def.replace(/\[\[([^\]|]*\|)?([^\]]*)\]\]/g, "$2"); // [[link|text]] -> text
      def = def.replace(/'''/g, "").replace(/''/g, "");
      def = def.replace(/<[^>]+>/g, "");
      def = def.trim();
      if (def.length > 3 && def.length < 300) return def;
    }
  }
  return "";
}

async function llmDefinition(word: string, lang: LanguageCode): Promise<DefinitionResult> {
  const NATIVE: Record<LanguageCode, string> = {
    en: "English", fr: "French", es: "Spanish", it: "Italian", pt: "Portuguese",
    de: "German", nl: "Dutch", ja: "Japanese (romaji)", zh: "Mandarin (pinyin)",
  };
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const ZAI = require("z-ai-web-dev-sdk").default;
    const zai = await ZAI.create();
    const prompt = `Give a concise dictionary definition (max ~25 words) for the word "${word}" in ${NATIVE[lang]}. Reply with only the definition.`;
    const response = await zai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a concise multilingual dictionary assistant." },
        { role: "user", content: prompt },
      ],
      thinking: { type: "disabled" },
    });
    const definition = (response.choices?.[0]?.message?.content || "").trim();
    return { definition, source: "AI" };
  } catch {
    return { definition: "", source: "" };
  }
}
