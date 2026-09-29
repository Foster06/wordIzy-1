// Analyze letter frequencies and find best Wordle starter words per language
const fs = require('fs');
const path = require('path');

const LANG_FILES = {
  en: 'data/scrabble/NWL2023.txt',
  fr: 'data/scrabble/ODS9.txt',
  es: 'data/scrabble/FISE.txt',
  it: 'data/scrabble/ZINGA.txt',
  nl: 'data/scrabble/OpenTaal.txt',
};

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u', 'y']); // y is sometimes vowel
const VOWELS_NO_Y = new Set(['a', 'e', 'i', 'o', 'u']);

for (const [lang, file] of Object.entries(LANG_FILES)) {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) {
    console.log(`\n${lang.toUpperCase()}: FILE NOT FOUND (${file})`);
    continue;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  // Extract first token per line (some files have "WORD definition")
  const allWords = content.split('\n')
    .map(l => l.trim().split(/\s/)[0].toLowerCase())
    .filter(w => w.length >= 2 && w.length <= 15 && /^[a-z]+$/.test(w));
  
  const words5 = allWords.filter(w => w.length === 5);
  console.log(`\n${lang.toUpperCase()}: ${words5.length} five-letter words (from ${allWords.length} total)`);
  
  if (words5.length === 0) continue;
  
  // Letter frequency in 5-letter words
  const freq = {};
  for (const w of words5) {
    for (const ch of w) freq[ch] = (freq[ch] || 0) + 1;
  }
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  console.log('Top 12 letters:', sorted.slice(0, 12).map(([l, c]) => `${l}:${c}`).join(', '));
  
  // Positional frequency (first letter, last letter)
  const firstLetter = {};
  const lastLetter = {};
  for (const w of words5) {
    firstLetter[w[0]] = (firstLetter[w[0]] || 0) + 1;
    lastLetter[w[4]] = (lastLetter[w[4]] || 0) + 1;
  }
  const topFirst = Object.entries(firstLetter).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const topLast = Object.entries(lastLetter).sort((a, b) => b[1] - a[1]).slice(0, 5);
  console.log('Top first letters:', topFirst.map(([l, c]) => `${l}:${c}`).join(', '));
  console.log('Top last letters:', topLast.map(([l, c]) => `${l}:${c}`).join(', '));
  
  // Find best starter words
  const topLetters = new Set(sorted.slice(0, 10).map(([l]) => l));
  
  const scored = words5.map(w => {
    const uniqueLetters = new Set(w);
    const vowelCount = [...uniqueLetters].filter(l => VOWELS_NO_Y.has(l)).length;
    const consonantCount = [...uniqueLetters].filter(l => !VOWELS_NO_Y.has(l) && topLetters.has(l)).length;
    const freqScore = [...w].reduce((sum, l) => sum + (freq[l] || 0), 0);
    return { word: w, vowelCount, consonantCount, unique: uniqueLetters.size, freqScore };
  });
  
  // Top balanced words (2+ vowels, 2+ top consonants, all unique letters)
  const balanced = scored
    .filter(w => w.unique === 5 && w.vowelCount >= 2 && w.consonantCount >= 2)
    .sort((a, b) => b.freqScore - a.freqScore)
    .slice(0, 10);
  console.log('Top 10 balanced starters:', balanced.map(w => w.word.toUpperCase()).join(', '));
  
  // Top vowel-heavy words (3+ vowels)
  const vowelHeavy = scored
    .filter(w => w.unique === 5 && w.vowelCount >= 3)
    .sort((a, b) => b.freqScore - a.freqScore)
    .slice(0, 5);
  console.log('Top 5 vowel-heavy starters:', vowelHeavy.map(w => w.word.toUpperCase()).join(', '));
}
