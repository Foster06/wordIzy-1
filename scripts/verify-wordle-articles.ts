// scripts/verify-wordle-articles.ts
// Independent verification of all 9 language WORDLE_ARTICLES files:
// structure, letter counts, placeholder integrity, and per-language
// contextual markers (proves the content is contextual, not translated).
import { WORDLE_ARTICLES } from "../src/lib/wordle-articles";

const PLACEHOLDERS = ["{letter}", "{Letter}", "{angle}", "{score}", "{count}", "{total}", "{plural}", "{tileWord}", "{double}", "{triple}"];

// Per-language contextual markers (unique to each language's Wordle coaching)
const CONTEXT_MARKERS: Record<string, string[]> = {
  en: ["How to Win Wordle Games Using {angle}", "Q Words Without U", "excludes plurals", "FUZZY (29"],
  fr: ["Comment gagner au Wordle", "QUI, QUAND", "français"],
  es: ["Cómo ganar al Wordle", "Ñ"],
  de: ["gewinnst du Wordle", "Umlaut|Umlaute|Ä.*Ö|Großschreibung"],
  it: ["vincere a Wordle", "doppie|PIZZA"],
  pt: ["ganhar no Wordle", "ÃO|LH|NH|cedilha|Ç"],
  nl: ["win je Wordle|Zo win je", "IJ"],
  ja: ["Wordleに勝つ|を使って", "ローマ字|カタカナ|促音"],
  zh: ["如何用|赢下Wordle", "拼音|声调"],
};

let failures = 0;

for (const lang of ["en", "fr", "es", "de", "it", "pt", "nl", "ja", "zh"]) {
  const content = WORDLE_ARTICLES[lang as keyof typeof WORDLE_ARTICLES];
  if (!content) {
    console.log(`❌ ${lang}: MISSING ENTIRELY`);
    failures++;
    continue;
  }
  const issues: string[] = [];

  // 1. Letter count
  const letterKeys = Object.keys(content.letters);
  if (letterKeys.length !== 26) issues.push(`letters=${letterKeys.length} (want 26)`);

  // 2. All letters a-z present
  for (const l of "abcdefghijklmnopqrstuvwxyz") {
    const lp = content.letters[l];
    if (!lp) { issues.push(`missing letter ${l}`); continue; }
    if (!lp.title) issues.push(`letter ${l}: no title`);
    if (!lp.starts || lp.starts.length < 100) issues.push(`letter ${l}: starts too short (${lp.starts?.length ?? 0})`);
    if (!lp.ends || lp.ends.length < 100) issues.push(`letter ${l}: ends too short (${lp.ends?.length ?? 0})`);
  }

  // 3. Template placeholders exist where required
  if (!content.titleTemplate.includes("{angle}")) issues.push("titleTemplate missing {angle}");
  if (!content.startsLead.includes("{letter}") || !content.startsLead.includes("{total}")) issues.push("startsLead missing {letter}/{total}");
  if (!content.endsLead.includes("{letter}") || !content.endsLead.includes("{total}")) issues.push("endsLead missing {letter}/{total}");
  if (!content.tileTemplate.includes("{score}") || !content.tileTemplate.includes("{Letter}")) issues.push("tileTemplate missing {Letter}/{score}");

  // 4. Per-language contextual markers
  const blob = JSON.stringify(content);
  for (const marker of CONTEXT_MARKERS[lang] ?? []) {
    const alts = marker.split("|");
    const found = alts.some((a) => blob.includes(a));
    if (!found) issues.push(`context marker not found: ${marker}`);
  }

  // 5. No leftover draft artifacts
  if (/\? maybe|no wait|let me just/i.test(blob)) issues.push("DRAFT ARTIFACTS PRESENT");

  if (issues.length === 0) {
    console.log(`✅ ${lang}: 26 letters, placeholders OK, context markers OK (${content.titleTemplate})`);
  } else {
    console.log(`❌ ${lang}: ${issues.length} issues`);
    for (const i of issues.slice(0, 5)) console.log(`   - ${i}`);
    failures++;
  }
}

console.log("");
if (failures === 0) {
  console.log("ALL 9 LANGUAGES VERIFIED ✅");
} else {
  console.log(`${failures} language(s) FAILED ❌`);
  process.exit(1);
}
