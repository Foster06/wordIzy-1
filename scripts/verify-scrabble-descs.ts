// Verify scrabble-words meta descriptions for ALL valid words (2-15 letters)
// against Bing's 25-160 char rule, using the SAME template + escaping logic
// as src/app/scrabble-words/[word]/page.tsx.
import { getScrabbleWordData, getAllValidScrabbleWords } from "../src/lib/scrabble-word-data";

function escapedLength(s: string): number {
  let n = 0;
  for (const ch of s) {
    if (ch === '"') n += 6;
    else if (ch === "'") n += 6;
    else if (ch === "&") n += 5;
    else if (ch === "<" || ch === ">") n += 4;
    else n += 1;
  }
  return n;
}

const MAX_DESC = 150;
let bad = 0;
let checked = 0;
const samples: string[] = [];

function describe(data: ReturnType<typeof getScrabbleWordData>): string {
  const display = data.display;
  if (!data.valid) {
    return `${display} is not a valid Scrabble word in NWL2023 or CSW21. See why, and find similar valid words to play.`;
  }
  const dicts = `${data.inNWL ? "NWL2023" : ""}${data.inNWL && data.inCSW ? " & " : ""}${data.inCSW ? "CSW21" : ""}`;
  const fixed = `${display} is a valid Scrabble word worth ${data.points} points. Valid in ${dicts}.`;
  let desc = fixed;
  if (data.definition) {
    const budget = MAX_DESC - escapedLength(fixed) - " Definition: ".length;
    if (budget >= 20) {
      let defPart = data.definition.slice(0, budget);
      while (escapedLength(`${fixed} Definition: ${defPart}`) > MAX_DESC && defPart.length > 20) {
        defPart = defPart.slice(0, -1);
      }
      desc = `${fixed} Definition: ${defPart}`;
    }
  }
  return desc;
}

// All valid words across all lengths
const words = getAllValidScrabbleWords(2, 15);
console.log(`Checking ${words.length} valid words…`);

for (const w of words) {
  const data = getScrabbleWordData(w);
  const desc = describe(data);
  const raw = escapedLength(desc);
  checked++;
  if (raw > 160 || desc.length < 25) {
    bad++;
    if (samples.length < 10) samples.push(`  [${raw}] ${w}: ${desc.slice(0, 90)}`);
  }
}

// Non-words (invalid template) — min case
for (const w of ["zave", "qqq", "xyzzy", "aeiouxyz"]) {
  const data = getScrabbleWordData(w);
  const desc = describe(data);
  checked++;
  if (desc.length > 160 || desc.length < 25) {
    bad++;
    samples.push(`  [${desc.length}] ${w} (invalid): ${desc.slice(0, 90)}`);
  }
}

console.log(`Checked ${checked} words — out of range: ${bad}`);
samples.forEach((s) => console.log(s));
process.exit(bad > 0 ? 1 : 0);
