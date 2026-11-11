// Spot-check cross-language Scrabble validity for representative words.
// Run: bunx tsx scripts/test-scrabble-multilang.ts
import { getScrabbleWordData } from "../src/lib/scrabble-word-data";

const cases = [
  "qi",     // valid English (NWL) — also French "qi" (QI = IQ)?
  "chat",   // valid English — also French word (cat)
  "huis",   // Dutch "house" — expect NOT valid English, valid Dutch
  "casa",   // Spanish/Italian "house" — expect valid ES/IT
  "eleve",  // French élève (accent-stripped) — expect valid FR
  "gluck",  // German Glück (umlaut-stripped) — expect valid DE list
  "coracao",// Portuguese coração — expect valid PT list
  "zave",   // invalid everywhere (the site's canonical example non-word)
  "izy",    // invalid everywhere
];

for (const w of cases) {
  const d = getScrabbleWordData(w);
  const en = `${d.inNWL ? "NWL" : "--"}/${d.inCSW ? "CSW" : "--"}`;
  const others = d.validInOtherLanguages.map((r) => r.lang).join(",") || "none";
  console.log(
    `${w.padEnd(8)} EN:${en.padEnd(8)} other: ${others.padEnd(16)} valid=${d.valid}`
  );
}
