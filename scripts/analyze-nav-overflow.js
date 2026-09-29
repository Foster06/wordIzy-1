// Properly extract nav labels per language block and measure overflow
const fs = require('fs');
const path = require('path');

const transFile = path.join(process.cwd(), 'src/components/i18n/translations.ts');
const content = fs.readFileSync(transFile, 'utf8');

// Split into language blocks by finding the nav: { markers
// Each language block starts with a nav: { ... } section
const navBlocks = [];
const navRegex = /nav:\s*\{([^}]+)\}/g;
let match;
while ((match = navRegex.exec(content)) !== null) {
  const block = match[1];
  // Skip the type definition block (contains "string")
  if (block.includes('string')) continue;
  navBlocks.push(block);
}

console.log('Found ' + navBlocks.length + ' nav blocks (one per language)');

const languages = ['en', 'fr', 'es', 'it', 'pt', 'de', 'nl', 'ja', 'zh'];
const inlineKeys = ['unscrambler', 'scramble', 'anagram', 'scrabble', 'wordle', 'dictionary'];
const dropdownKeys = ['tools', 'wordlab', 'more'];
const blitzKey = 'blitz';

console.log('');
console.log('Lang | Inline labels                                  | Blitz label       | Dropdowns           | With Blitz px | Risk');
console.log('-----|------------------------------------------------|-------------------|--------------------|---------------|-----');

const overflowLangs = [];

for (let i = 0; i < languages.length && i < navBlocks.length; i++) {
  const lang = languages[i];
  const block = navBlocks[i];

  const getVal = (key) => {
    const pattern = new RegExp('\\b' + key + ':\\s*"([^"]+)"');
    const m = block.match(pattern);
    return m ? m[1] : key;
  };

  const inlineLabels = inlineKeys.map(k => getVal(k));
  const dropdownLabels = dropdownKeys.map(k => getVal(k));
  const blitzLabel = getVal(blitzKey);

  const allLabels = [...inlineLabels, blitzLabel, ...dropdownLabels];
  const totalChars = allLabels.join('').length;

  // Width estimation:
  // CJK chars (ja, zh): ~16px each at 14px font
  // Latin chars: ~8px each at 14px font
  // Each nav item: px-2 = 16px padding (8px each side), plus text
  const isCJK = (lang === 'ja' || lang === 'zh');
  const charPx = isCJK ? 14 : 7.5;
  const paddingPerItem = 16;
  const itemCount = allLabels.length; // 10 with blitz
  const totalPx = totalChars * charPx + itemCount * paddingPerItem;

  // Available width: max-w-7xl = 1280px, minus logo (~140px) minus right controls (~200px) = ~940px
  const availablePx = 940;
  let risk = 'OK';
  if (totalPx > availablePx) risk = 'OVERFLOW';
  else if (totalPx > availablePx * 0.92) risk = 'TIGHT';

  if (risk === 'OVERFLOW') overflowLangs.push(lang);

  console.log(
    lang.padEnd(5) + ' | ' +
    inlineLabels.join(', ').padEnd(46) + ' | ' +
    blitzLabel.padEnd(17) + ' | ' +
    dropdownLabels.join(', ').padEnd(18) + ' | ' +
    Math.round(totalPx).toString().padEnd(13) + ' | ' +
    risk
  );
}

console.log('');
console.log('=== SUMMARY ===');
if (overflowLangs.length > 0) {
  console.log('OVERFLOW in: ' + overflowLangs.join(', '));
  console.log('RECOMMENDATION: Do NOT add Blitz to inline menu (would overflow in ' + overflowLangs.length + ' language(s))');
} else {
  console.log('No overflow detected in any language.');
  console.log('RECOMMENDATION: Safe to add Blitz to inline menu');
}
