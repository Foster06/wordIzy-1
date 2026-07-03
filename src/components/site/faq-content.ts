// src/components/site/faq-content.ts
// Rich, page-specific FAQ content for each tool page.

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_TITLE = "How to use & FAQ";

export const unscramblerFaq: FaqItem[] = [
  { q: "What is a Word Unscrambler and how do I use it?", a: "A word unscrambler takes a jumble of letters — like a Scrabble rack (e.g. SRAABLC) — and finds every valid dictionary word that can be spelled from those letters. Type your letters into the 'Your Letters' box, then click Unscramble. Results appear grouped by word length (longest first), each word showing its Scrabble point value. It's ideal for Scrabble, Words With Friends, Wordfeud, crosswords, and anagram puzzles." },
  { q: "How do wildcards (? and *) work?", a: "Use ? or * as a wildcard to represent any unknown letter. For example, entering 'QUER?Y' tells WordIzy to find all words matching 'QUER' + any single letter + 'Y'. Each wildcard acts as a blank tile (scoring 0 points). You can use multiple wildcards at once — 'A??LE' matches APPLE, ADDLE, AGILE, and more." },
  { q: "How do I use the Advanced Filters?", a: "Click 'Advanced Filters' to reveal three optional fields. 'Starts with' limits results to words beginning with given letters (e.g. 'AB' → only words starting with AB). 'Ends with' does the same for suffixes (e.g. 'ED' → only words ending in ED). 'Must include' guarantees certain letters appear in every result, in any position. Combine all three with wildcards for precise control." },
  { q: "How are words scored?", a: "Each word is scored using the official Scrabble letter values for the selected language. For English: A/E/I/O/U = 1pt, D/G = 2pt, B/C/M/P = 3pt, F/H/V/W/Y = 4pt, K = 5pt, J/X = 8pt, Q/Z = 10pt. Wildcards (? *) score 0. The total is shown next to each word, and results are sorted by score within each length group so the highest-scoring plays appear first." },
  { q: "Which dictionaries are available?", a: "WordIzy supports 9 languages: English (NWL2023 + CSW21), French (ODS9 2024), Spanish (FISE), Italian (Zingarelli), Portuguese, German, Dutch (OpenTaal), plus Japanese (romaji) and Mandarin (pinyin). All words are filtered against the official Scrabble dictionary for each language. Switch languages using the language selector in the navbar." },
  { q: "Why are results grouped by length?", a: "Grouping by word length makes it easy to find the type of play you need. In Scrabble, longer words generally score higher, but sometimes a shorter word fits the board better. The longest words appear at the top, descending to 2-letter words. Within each group, words are sorted by Scrabble score so you can quickly spot the best play." },
];

export const scrambleFaq: FaqItem[] = [
  { q: "What is the Scramble / Descrambler for?", a: "This tool solves jumble puzzles — where letters are scrambled and you must find the original word(s). Enter the scrambled letters (e.g. RBOLENW) and click Descramble to see all real words that can be formed. It's perfect for newspaper jumble puzzles, anagram games, and word-scramble challenges." },
  { q: "How is this different from the Unscrambler?", a: "The Descrambler uses the same engine as the Unscrambler but is focused on solving scrambled-word puzzles rather than finding every possible word from a rack. You can also use the 'Scramble a word' feature below the input to jumble a word into random variants — useful for creating your own puzzles." },
  { q: "Can I use wildcards?", a: "Yes. Use ? or * to represent unknown letters. For example, if a jumble puzzle has a missing letter, enter the known letters plus a ? and WordIzy will fill in the blank with every valid letter combination." },
  { q: "How do I create my own scrambled word?", a: "Use the 'Scramble a word' card below the main input. Type any word (e.g. 'scrabble') and click Generate — WordIzy produces several randomized scrambles of that word. Use these to create puzzles for friends or practice unscrambling." },
];

export const wordleFaq: FaqItem[] = [
  { q: "How does the Wordle Solver work?", a: "The Wordle Solver narrows down today's Wordle answer using your game feedback. Enter the information you've gathered from your guesses: green letters (correct position), yellow letters (in the word but wrong position), and gray letters (not in the word). The solver returns all valid words that match your constraints." },
  { q: "How do I enter placed (green) letters?", a: "In the 'Placed letters (green)' field, type the letters you know are in the correct position, using . or _ for empty slots. For example, if you know the word is A _ _ L E, enter 'A..LE'. The solver only returns words matching this exact pattern." },
  { q: "What are valid (yellow) and excluded (gray) letters?", a: "Valid letters (yellow) are letters you know are IN the word but not in the position you guessed — enter them all in the 'Valid letters' field (e.g. 'RST'). Excluded letters (gray) are letters confirmed NOT in the word — enter them in 'Excluded letters' (e.g. 'BXF'). The solver filters out any word containing excluded letters." },
  { q: "What word length should I use?", a: "Select the length of today's Wordle (default 5). WordIzy supports 4- to 8-letter words, so it works for Wordle variants like Quordle, Octordle, and custom-length games too." },
  { q: "Any tips for choosing the next guess?", a: "Pick a word from the results that uses common letters you haven't tested yet (like R, T, S, L, N). This maximizes information gain. If the list is long, choose a word that eliminates the most possibilities. The solver shows each word's Scrabble score — higher scores often mean rarer letters that can help narrow things down." },
];

export const quordleFaq: FaqItem[] = [
  { q: "What is the Quordle Solver?", a: "Quordle is a game where you solve four Wordle puzzles simultaneously. This solver lets you enter constraints for up to 4 boards at once and returns candidate words for each. Each board keeps its own placed (green), valid (yellow), and excluded (gray) letters." },
  { q: "How do I use multiple boards?", a: "Fill in what you know for each board. Board 1's constraints only affect Board 1's results. Click 'Add board' to add up to 4 boards. Use the X button to remove a board. When ready, click Solve to get candidate words for all boards at once." },
  { q: "Should I share letters between boards?", a: "Yes — a key Quordle strategy is using one guess to gather information across multiple boards. If a letter is green on Board 1, it's likely in the same position on other boards too. Enter shared constraints on each board to cross-pollinate information and narrow down all four answers faster." },
  { q: "Any strategy tips for Quordle?", a: "Start with a word rich in common letters (like CRANE or SLATE) to gather information across all boards. Focus on the board with the most constraints first — solving it frees up mental space. Use the solver after 2-3 guesses when you have enough info to narrow each board to a manageable list." },
];

export const anagramFaq: FaqItem[] = [
  { q: "What is an anagram?", a: "An anagram is a word or phrase formed by rearranging all the letters of another word. For example, LISTEN and SILENT are anagrams — same letters, different order. The Anagram Solver finds every word that uses exactly all the letters you provide." },
  { q: "How is this different from the Unscrambler?", a: "The Unscrambler finds words of ANY length that can be formed from your letters (including shorter words). The Anagram Solver only finds words that use ALL your letters — the full-length anagrams. For example, with 'CHIEN', the anagram solver returns CHIEN, CHINE, NICHE (all 5 letters), while the unscrambler would also return shorter words like ICE, IN, HE." },
  { q: "Can I use wildcards?", a: "Yes. Use ? or * as wildcards to fill remaining slots. For example, entering 'CAT??' finds all 5-letter anagrams where CAT is combined with any two letters. Wildcards score 0 points (like blank tiles)." },
  { q: "What are anagrams useful for?", a: "Anagrams are used in word games, puzzles, cryptography, and linguistics. In Scrabble, finding anagrams of your rack helps you spot bingos (using all 7 tiles for a 50-point bonus). They're also popular in crossword clues, trivia, and brain teasers." },
];

export const randomFaq: FaqItem[] = [
  { q: "What does the Random Word Generator do?", a: "It generates random real words from the selected dictionary, with optional filters. You can specify word length, starting letters, ending letters, or letters the word must contain. Use it for games, creative writing, naming, vocabulary practice, or generating passwords with real words." },
  { q: "How do I filter the random words?", a: "Set 'Length' to a specific number (2-12) or leave it as 'Any'. 'Starts with' limits words to those beginning with given letters. 'Ends with' limits to words ending with given letters. 'Contains' requires the word to include certain letters anywhere. 'How many' controls the number of words generated (1-200)." },
  { q: "Are the words valid Scrabble words?", a: "Yes. All generated words come from the official Scrabble dictionary for the selected language (NWL2023/CSW21 for English, ODS9 for French, etc.). Every word is playable in Scrabble and other word games." },
  { q: "Can I use this for word games?", a: "Absolutely. Generate random words for Pictionary, charades, word association games, or vocabulary quizzes. For password generation, combine 3-4 random words of different lengths — this creates memorable yet secure passphrases." },
];

export const wordfeudFaq: FaqItem[] = [
  { q: "What is the Wordfeud Helper?", a: "Wordfeud is a popular mobile word game similar to Scrabble. This helper finds the best words you can play from your rack. Enter your 7 letters (plus any board letters already placed) and WordIzy returns all playable words, sorted by Scrabble score." },
  { q: "How do I enter my rack?", a: "Type your 7 tile letters into the 'Your Letters' box. Use ? or * for blank tiles (which can represent any letter but score 0 points). If there are letters already on the board you want to build off, add them too — WordIzy will find words that can be formed from the combined pool." },
  { q: "Which dictionary should I use?", a: "Wordfeud supports multiple dictionaries depending on your region. English Wordfeud uses a Scrabble-like list, so English (NWL2023/CSW21) works well. For other languages, select the matching one (French ODS9, Spanish FISE, etc.) from the language selector." },
  { q: "How are scores calculated?", a: "Scores use the official Scrabble letter values for the selected language. Note that Wordfeud's actual scoring may differ slightly (it has bonus squares and its own tile distribution). Use the scores as a guide to identify high-value plays — the word with the most points from your rack is usually your best move." },
];

export const dictionaryFaq: FaqItem[] = [
  { q: "What does Check Dictionary do?", a: "Enter any word to verify whether it's valid in the official Scrabble dictionary for the selected language. The tool shows the word as Scrabble tiles, a valid/invalid badge, the Scrabble score, word length, letter tiles, a dictionary definition, and synonyms (where available)." },
  { q: "Where do definitions come from?", a: "Definitions are sourced from multiple references: the Free Dictionary API (for English, French, Spanish, German, Italian, Portuguese), Wiktionary (all languages as a fallback), and an AI assistant for any remaining gaps. The source is labeled next to each definition." },
  { q: "Where do synonyms come from?", a: "Synonyms come from Datamuse (for English, Spanish, French, Italian, Portuguese) and OpenThesaurus (for German). Only synonyms that are themselves valid Scrabble words are shown — click any synonym to check it instantly." },
  { q: "Why might a common word be invalid?", a: "Scrabble dictionaries are strict — they exclude proper nouns, abbreviations, hyphenated words, and words requiring apostrophes. For example, 'BRUNCH' is valid but 'BRUNCH'S' may not be. If a word seems missing, it may be a capitalized proper noun or a recent addition not yet in the official list. Switch languages to check the word in a different dictionary." },
];

export const scrabbleFaq: FaqItem[] = [
  { q: "What is Scrabble Duplicate?", a: "Duplicate Scrabble is a variant where every player receives the same rack and must find the best possible play. It's used in tournaments and training to test skill without luck. This tool helps you find the highest-scoring words from your rack — enter your 7 letters and optionally any board letters, then click 'Find best words'." },
  { q: "How do I enter board letters?", a: "If there are letters already on the board that you can build off, type them in the 'Board letters (optional)' field along with your rack letters. WordIzy treats the combined pool as available letters. This helps find words that hook onto existing plays — essential for maximizing score in real games." },
  { q: "How are the top plays ranked?", a: "Words are sorted by Scrabble score (highest first). The top 10 plays appear in a highlighted list at the top. Remember: actual game scores also depend on bonus squares (double/triple letter/word) and bingos (50-point bonus for using all 7 tiles). Use the tool's scores as a baseline, then factor in board positioning." },
  { q: "What's a bingo and how do I find one?", a: "A bingo is playing all 7 tiles in one turn for a 50-point bonus. To find bingos, enter your full 7-letter rack and look at the 7-letter results group. If any words appear, those are potential bingos. Wildcards (? *) can represent the blank tiles in your rack." },
];

export const wordlistsFaq: FaqItem[] = [
  { q: "What is the Word Lists page?", a: "Word Lists lets you browse every valid Scrabble word from 2 to 7 letters. Words are grouped by length, then by ending letter (A-Z), so you can explore the dictionary systematically. Use it to study, find words for games, or expand your vocabulary." },
  { q: "How do I filter by length?", a: "Use the length selector (2-7) at the top. Click 'All' to see every length stacked (2-letter words on top, 7-letter at the bottom), or click a specific number to see only that length. Each length section shows 26 containers (one per ending letter A-Z)." },
  { q: "How do I filter by letter?", a: "Use the A-Z letter row below the length selector. Click a letter to show only words ending with that letter, or 'All' to show every letter. This is useful for finding words that hook onto a specific letter already on the board." },
  { q: "Why are words shown in uppercase?", a: "Scrabble tiles are uppercase, so words are displayed in uppercase to match. Each word shows its Scrabble point value next to it. Words within each letter container are sorted alphabetically (A-Z) for easy scanning." },
];

export const wordstartsFaq: FaqItem[] = [
  { q: "What is the Word Starts By page?", a: "This page lets you browse all valid Scrabble words that START with a specific letter. Select a letter (A-Z) and WordIzy shows every word beginning with that letter, grouped by length (2-7 letters). It's perfect for studying openings and finding words to build off a starting letter on the board." },
  { q: "How do I use the length and letter selectors?", a: "First, pick a letter from the A-Z row — this sets the starting letter. Then use the length row (2-7 or All) to filter by word length. Each length section shows all words starting with your chosen letter, sorted alphabetically. Click 'All' in either row to remove that filter." },
  { q: "How is this useful for Scrabble?", a: "Knowing words that start with each letter helps you plan openings and hooks. If you have a Q, knowing all Q-starting words (QI, QAT, QUAD...) helps you play it effectively. The page is also valuable for crosswords, where clues often specify 'starts with...'." },
  { q: "Why paginate at 50 words?", a: "Some letters (like S, A, E) have thousands of starting words. To keep pages fast and readable, results paginate at 50 words per page with prev/next buttons. Each page shows the page number and total pages so you know where you are." },
];

export const wordendsFaq: FaqItem[] = [
  { q: "What is the Word Ends By page?", a: "This page lets you browse all valid Scrabble words that END with a specific letter. Select a letter (A-Z) and WordIzy shows every word ending with that letter, grouped by length (2-7 letters). It's ideal for finding words to hook onto an existing letter on the board." },
  { q: "How do I use the length and letter selectors?", a: "First, pick a letter from the A-Z row — this sets the ending letter. Then use the length row (2-7 or All) to filter by word length. Each length section shows all words ending with your chosen letter, sorted alphabetically. Click 'All' in either row to remove that filter." },
  { q: "How is this useful for Scrabble?", a: "Ending letters matter for hooks — if there's an S on the board, knowing all words ending in S lets you pluralize or extend plays. Similarly, knowing words ending in D, ED, ING helps you build off common suffixes. This page is a powerful study tool for competitive play." },
  { q: "Why paginate at 50 words?", a: "Some letters (like E, S, D) have thousands of ending words. To keep pages fast and readable, results paginate at 50 words per page with prev/next buttons. Each page shows the page number and total pages so you know where you are." },
];
