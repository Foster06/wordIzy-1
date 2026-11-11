// scripts/test-scrabble-localized.ts
// Spot-check harness for the LOCALIZED scrabble-words data layer
// (/{lang}/scrabble-words/[word]) — run with: bunx tsx scripts/test-scrabble-localized.ts
//
// Verifies that each language edition checks its OWN dictionary first, uses
// its OWN tile values, and reports cross-language validity consistently with
// the English section (Task 42).

import {
  DICT_LANGS,
  getLocalizedScrabbleWordData,
  getDictInfo,
  getLangPrerenderWords,
} from "../src/lib/scrabble-word-data";

interface Expectation {
  lang: (typeof DICT_LANGS)[number];
  word: string;
  valid: boolean;
  /** Only checked when valid is true. */
  points?: number;
  /** substrings expected in the built valid-list (empty = none). */
  listIncludes?: string[];
}

const expectations: Expectation[] = [
  // French (ODS9)
  { lang: "fr", word: "chat", valid: true, points: 9 }, // C3+H4+A1+T1 (FR values)
  { lang: "fr", word: "eleve", valid: true, points: 8 }, // ÉLÈVE — E1×3+L1+V4
  { lang: "fr", word: "ka", valid: true, points: 11 }, // French K=10 (EN would be 5)
  { lang: "fr", word: "qi", valid: true, points: 9 }, // QI is in ODS9; French Q=8 (EN 10)
  { lang: "fr", word: "zave", valid: false, points: 0, listIncludes: [] },
  { lang: "fr", word: "the", valid: true, points: 6 }, // THÉ, T1+H4+E1
  // Spanish (FISE)
  { lang: "es", word: "casa", valid: true, points: 5 }, // C2+A1+S1+A1 (ES values)
  // Italian (Zingarelli)
  { lang: "it", word: "casa", valid: true, points: 5 }, // C2+A1+S1+A1 (IT values)
  // Dutch (OpenTaal)
  { lang: "nl", word: "koe", valid: true, points: 4 }, // K2+O1+E1 (NL values)
  // German (wordIzy list)
  { lang: "de", word: "gluck", valid: true, points: 13 }, // GLÜCK G2+L2+U1+C4+K4
  { lang: "de", word: "zave", valid: false, points: 0 },
  // Portuguese (wordIzy list)
  { lang: "pt", word: "coracao", valid: true, points: 9 }, // CORAÇÃO C2+O1+R1+A1+C2+A1+O1
  // Cross-language: WC valid in Italian + Dutch, not French (data layer
  // reports English language names — the page localizes them).
  { lang: "fr", word: "wc", valid: false, listIncludes: ["Italian", "Dutch"] },
];

let failures = 0;
for (const exp of expectations) {
  const data = getLocalizedScrabbleWordData(exp.lang, exp.word);
  const problems: string[] = [];
  if (data.valid !== exp.valid) {
    problems.push(`valid: got ${data.valid}, want ${exp.valid}`);
  }
  if (exp.valid && data.points !== exp.points) {
    problems.push(`points: got ${data.points}, want ${exp.points}`);
  }
  for (const substr of exp.listIncludes ?? []) {
    const list = [
      ...(data.inNWL || data.inCSW ? ["NWL2023"] : []),
      ...data.validInOtherLanguages.map((r) => r.languageName),
    ].join(", ");
    if (!list.toLowerCase().includes(substr.toLowerCase())) {
      problems.push(`list "${list}" missing "${substr}"`);
    }
  }
  const tag = `${exp.lang}/${exp.word}`;
  if (problems.length === 0) {
    console.log(`  ok  ${tag} valid=${data.valid} points=${data.points}`);
  } else {
    failures++;
    console.error(`FAIL  ${tag}: ${problems.join("; ")}`);
  }
}

// Prerender set sanity: every dict language has a non-empty 2-letter set, and
// none of the showcase words is consonant-only junk (bb, cd, tv, …).
console.log("\nPrerender sets:");
for (const lang of DICT_LANGS) {
  const words = getLangPrerenderWords(lang);
  const junk = words.filter((w) => !/[aeiou]/.test(w));
  const info = getDictInfo(lang);
  const status = junk.length === 0 && words.length > 0 ? "ok" : "FAIL";
  if (status === "FAIL") failures++;
  console.log(
    `  ${status}  ${lang}: ${words.length} words (${info.dictName}${info.official ? "" : ", unofficial"}), junk=${junk.length}`
  );
}

console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
