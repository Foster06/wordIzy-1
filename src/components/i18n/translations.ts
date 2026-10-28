// src/components/i18n/translations.ts
// UI translations for WordIzy. `t()` falls back to English if a key is missing.

import type { LanguageCode } from "@/lib/languages";

export type Translation = {
 nav: {
  unscrambler: string; scramble: string; wordle: string; quordle: string;
  anagram: string; random: string; wordfeud: string; dictionary: string;
  scrabble: string; wordlists: string; wordstarts: string; wordends: string; wordlestarts: string; wordleends: string; about: string; contact: string;
  privacy: string; terms: string; sitemap: string; tools: string; more: string;
  solvers: string; site: string; wordlab: string; inbox: string;
  dashboard: string; blitz: string; blitzShort: string;
 };
 brand: { name: string; tagline: string };
 common: {
  yourLetters: string; unscramble: string; clear: string; advancedFilters: string;
  startsWith: string; endsWith: string; mustInclude: string; dictionaryLabel: string;
  results: string; noResults: string; wordsFound: string; points: string; length: string;
  loading: string; search: string; copy: string; copied: string; tryExamples: string;
  tipsTitle: string; tileValues: string; blanks: string; languageLabel: string;
  showMore: string; showLess: string; allWords: string; perGroup: string;
  wordsCount: string; reset: string; apply: string; solve: string; generate: string;
  check: string; example: string; none: string; optional: string;
 };
 home: {
  title: string; subtitle: string; heroBadge: string;
  faqTitle: string;
  q1: string; a1: string; q2: string; a2: string; q3: string; a3: string;
  q4: string; a4: string;
 };
 scramble: { title: string; subtitle: string; inputLabel: string; btn: string; solutionLabel: string; hint: string };
 wordle: { title: string; subtitle: string; length: string; placed: string; valid: string; excluded: string; btn: string; hint: string };
 quordle: { title: string; subtitle: string; board: string; addBoard: string; hint: string };
 anagram: { title: string; subtitle: string; btn: string; hint: string };
 random: { title: string; subtitle: string; length: string; any: string; count: string; btn: string };
 wordfeud: { title: string; subtitle: string; btn: string; hint: string };
 dictionary: { title: string; subtitle: string; btn: string; exists: string; notExists: string; definition: string; score: string; tiles: string };
 scrabble: { title: string; subtitle: string; rack: string; board: string; btn: string; hint: string };
 wordlists: {
  title: string; subtitle: string; allWords: string; startsBy: string; endsBy: string;
  letter: string; selectLength: string; selectLetter: string; browse: string;
 };
 about: {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
 };
 contact: {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
  closing: string;
 };
 privacy: {
  title: string;
  intro: string;
  lastUpdated: string;
  sections: { heading: string; body: string }[];
  thirdPartyServices: { name: string; description: string; url: string }[];
 };
 terms: {
  title: string;
  intro: string;
  lastUpdated: string;
  sections: { heading: string; body: string }[];
 };
 sitemap: { title: string; body: string };
 footer: { rights: string; madeWith: string; links: string; desc: string; disclaimer: string };
 faq: {
  title: string;
  unscrambler: FaqItemT[]; scramble: FaqItemT[]; wordle: FaqItemT[]; quordle: FaqItemT[];
  anagram: FaqItemT[]; random: FaqItemT[]; wordfeud: FaqItemT[]; dictionary: FaqItemT[];
  scrabble: FaqItemT[]; wordlists: FaqItemT[]; wordstarts: FaqItemT[]; wordends: FaqItemT[];
  vault: FaqItemT[];
 };
 hubPages: {
  // Subtitles
  startsSubtitle: string;
  endsSubtitle: string;
  lengthSubtitle: string;
  wordleStartsSubtitle: string;
  wordleEndsSubtitle: string;
  // Section headings
  startsHeading: string;
  endsHeading: string;
  lengthHeading: string;
  wordleStartsHeading: string;
  wordleEndsHeading: string;
  // Helper text
  clickLetterStarts: string;
  clickLetterEnds: string;
  clickLength: string;
  clickLetterWordleStarts: string;
  clickLetterWordleEnds: string;
  // Badges
  wordleStartsBadge: string;
  wordleEndsBadge: string;
  // Titles
  wordleStartsTitle: string;
  wordleEndsTitle: string;
  // Return button
  returnHome: string;
  // Footer note
  footerNote: string;
  // Search bar
  searchPlaceholderStarts: string;
  searchPlaceholderEnds: string;
  searchPlaceholderLength: string;
  searchPlaceholderWordleStarts: string;
  searchPlaceholderWordleEnds: string;
  browseBtn: string;
 };
 wordListPage: {
  loading: string;
  filterPlaceholder: string;
  filterLabel: string;
  clearFilter: string;
  loadMore: string;
  remaining: string;
  allLengths: string;
  filterByLength: string;
  noMatch: string;
  noWords: string;
  wordsCount: string;
  error: string;
 };
 blitz: {
  loadingEngine: string;
  completed: string;
  todaysPuzzleSolved: string;
  alreadyPlayed: string;
  playInfinite: string;
  challengeTitle: string;
  challengeDesc: string;
  startToday: string;
  playInfiniteBtn: string;
  timesUp: string;
  finalScore: string;
  points: string;
  playAgain: string;
  dailyLocked: string;
  returnMenu: string;
  timeLeft: string;
  totalScore: string;
  generating: string;
  hint: string;
  waiting: string;
  typeWord: string;
  skipReveal: string;
  stopGame: string;
  play: string;
  correct: string;
  wrong: string;
  answerWas: string;
  challengeFriend: string;
  challengeText: string;
  // SEO content section (below the game card) — translated per language
  pageHeading: string;
  howToPlayTitle: string;
  howToPlayDesc: string;
  gameModesTitle: string;
  dailyModeName: string;
  dailyModeDesc: string;
  infiniteModeName: string;
  infiniteModeDesc: string;
  tipsTitle: string;
  tip1: string;
  tip2: string;
  tip3: string;
  tip4: string;
  blitzFooter: string;
 };
 ui: {
  advertisement: string;
  featuredGuide: string;
  saveVaultFaqTitle: string;
  relatedTools: string;
  published: string;
  backToHome: string;
  somethingWrong: string;
  tryAgain: string;
  reloadPage: string;
  returnLabel: string;
  allCopied: string;
  showLess: string;
  showMore: string;
  enterPassword: string;
  totalSearches: string;
  topQuery: string;
  topTool: string;
  topLanguage: string;
  newDailyChallenge: string;
  scrambleFeatureHint: string;
  wordList: string;
  copiedToClipboard: string;
 };
};

type FaqItemT = { q: string; a: string };

const en: Translation = {
 nav: {
  unscrambler: "Unscrambler", scramble: "Scramble", wordle: "Wordle",
  quordle: "Quordle", anagram: "Anagram", random: "Random Word",
  wordfeud: "Wordfeud", dictionary: "Dictionary", scrabble: "Duplicate",
  wordlists: "Unscramble by Length", wordstarts: "Words Starts With A-Z", wordends: "Words Ends With A-Z", wordlestarts: "Wordle Starts A-Z", wordleends: "Wordle Ends A-Z", about: "About", contact: "Contact", privacy: "Privacy", terms: "Terms of Service",
  sitemap: "Sitemap", tools: "Tools", more: "More", solvers: "Solvers", site: "Site", wordlab: "Word Lab", inbox: "Inbox",
  dashboard: "Dashboard", blitz: "Anagram Blitz", blitzShort: "Blitz"
 },
 brand: { name: "wordIzy", tagline: "Unscramble. Solve. Win." },
 common: {
  yourLetters: "Your Letters", unscramble: "Unscramble", clear: "Clear", advancedFilters: "Advanced Filters",
  startsWith: "Starts with", endsWith: "Ends with", mustInclude: "Must include", dictionaryLabel: "Dictionary",
  results: "Results", noResults: "No words found. Try different letters or add wildcards (? or *).",
  wordsFound: "words found", points: "pts", length: "letters", loading: "Loading…", search: "Search",
  copy: "Copy", copied: "Copied!", tryExamples: "Try:", tipsTitle: "Tips & How it works",
  tileValues: "Scrabble Tile Values", blanks: "Blanks", languageLabel: "Language",
  showMore: "Show more", showLess: "Show less", allWords: "All words", perGroup: "per group",
  wordsCount: "words", reset: "Reset", apply: "Apply", solve: "Solve", generate: "Generate",
  check: "Check", example: "Example", none: "None", optional: "optional",
 },
 home: {
  title: "Word Unscrambler", subtitle: "Enter your scrambled letters, add wildcards with ? or *, and find every playable word — grouped by length and sorted by Scrabble score.",
  heroBadge: "Free • No sign-up • 9 languages",
  faqTitle: "Frequently asked questions",
  q1: "What is the use of a Word Unscrambler?",
  a1: "A word unscrambler takes a jumble of letters (like a Scrabble rack) and finds every valid dictionary word that can be spelled from those letters. It's ideal for Scrabble, Words With Friends, Wordfeud, crosswords and anagram puzzles — giving you the highest-scoring plays instantly.",
  q2: "How do I use the advanced options?",
  a2: "After typing your letters, open Advanced Filters. \"Starts with\" limits results to words beginning with given letters, \"Ends with\" does the same for suffixes, and \"Must include\" guarantees certain letters appear in every result. Combine these with wildcards (? or *) to replace any unknown letter.",
  q3: "How does this work?",
  a3: "WordIzy compares your letter pool against a comprehensive in-memory dictionary for the selected language. It checks which words can be formed (treating ? and * as wildcards), applies your filters, scores each word with official Scrabble letter values, then groups the results by word length — longest first.",
  q4: "Which languages are supported?",
  a4: "English, French, Spanish, Italian, Portuguese, German, Dutch, plus Japanese (romaji) and Mandarin (pinyin). Switch the dictionary from the language selector to unscramble in any of them.",
 },
 scramble: {
  title: "Word Scramble / Descrambler", subtitle: "Stuck on a jumble puzzle? Enter the scrambled letters and we'll descramble them into real words.",
  inputLabel: "Scrambled letters", btn: "Descramble", solutionLabel: "Possible solutions", hint: "Use ? or * for unknown letters.",
 },
 wordle: {
  title: "Wordle Solver", subtitle: "Narrow down today's Wordle. Enter green letters in their position, yellow letters you know are in the word, and gray letters to exclude.",
  length: "Word length", placed: "Placed letters (green)", valid: "Valid letters (yellow)", excluded: "Excluded letters (gray)", btn: "Solve", hint: "Use . or _ for empty slots, e.g. A..LE",
 },
 quordle: {
  title: "Quordle Solver", subtitle: "Solve up to four Wordle puzzles at once. Each board keeps its own constraints; shared valid/excluded letters flow between them.",
  board: "Board", addBoard: "Add board", hint: "Fill in what you know for each board, then solve.",
 },
 anagram: {
  title: "Anagram Solver", subtitle: "Find every anagram of your letters — words that use exactly all the letters you provide.",
  btn: "Find anagrams", hint: "Wildcards (? *) fill the remaining letters.",
 },
 random: {
  title: "Random Word Generator", subtitle: "Generate random real words with optional length, prefix, suffix and contains filters.",
  length: "Length", any: "Any", count: "How many", btn: "Generate",
 },
 wordfeud: {
  title: "Wordfeud Helper", subtitle: "Find the best Wordfeud words from your rack. Wordfeud uses the same multilingual dictionaries — pick yours and solve.",
  btn: "Find words", hint: "Add ? or * for blank tiles.",
 },
 dictionary: {
  title: "Check Dictionary", subtitle: "Verify whether a word exists in the selected dictionary, see its Scrabble score and read a definition.",
  btn: "Check", exists: "is a valid word", notExists: "was not found in the dictionary", definition: "Definition", score: "Scrabble score", tiles: "Letter tiles",
 },
 scrabble: {
  title: "Scrabble Duplicate", subtitle: "Duplicate Scrabble gives every player the same rack. Enter your 7 letters (plus any board letters already placed) and find the highest-scoring plays.",
  rack: "Your rack", board: "Board letters (optional)", btn: "Find best words", hint: "Wildcards supported. Results are ranked by score.",
 },
 wordlists: {
  title: "Unscramble by Length", subtitle: "Browse every valid Scrabble word by length, from 2 to 7 letters.",
  allWords: "All words", startsBy: "Words Starts With A-Z", endsBy: "Words Ends With A-Z", letter: "Letter", selectLength: "Length", selectLetter: "Letter", browse: "Browse",
 },
 about: {
  title: "About wordIzy",
  intro: "Welcome to wordIzy, your premier destination for high-performance word game utilities, anagram solvers, and educational puzzle resources. Built by a dedicated team of indie developers and lifelong word puzzle enthusiasts, wordIzy was designed from the ground up to be the fastest, cleanest, and most distraction-free dictionary tool set on the web.",
  sections: [
   {
    heading: "Our Mission",
    body: "Our mission is to help players elevate their vocabulary, train their minds, and resolve friendly puzzle disputes with absolute accuracy. We believe that word solvers shouldn't be cluttered with intrusive layouts, sluggish load times, or complicated setups. That is why wordIzy features instant calculations, localized multi-language Scrabble dictionaries, and intuitive custom filtering engines built for seamless everyday use.",
   },
   {
    heading: "Why Choose wordIzy?",
    body: "Unlike basic, generic lookup tables, our tools are custom-tailored to match the exact mechanics of the world's most popular word games:\n• Comprehensive Dictionary Databases: We support 9 global languages, filtering your letters directly against official competition lexicons like NWL2023, CSW21, and French ODS9.\n• Realistic Game Logic: Our advanced wildcard filtering system recognizes rules like Scrabble blank tile distributions, assigning true zero-point values so you can plan precise tournament-level moves.\n• Innovative Educational Tools: Unique features like our locally saved Save Vault function as a personal companion flashcard manager, giving players an active environment to study word patterns, hooks, and extensions offline.\n• Engaging Gameplay: Beyond tools, we create custom experiences like Anagram Blitz to give word game lovers a fast-paced environment to test their speed and challenge their personal high scores.",
   },
   {
    heading: "Our Commitment to Privacy",
    body: "We value your digital security and your system's performance. Advanced options like your word bookmark history are executed directly using your browser's local storage. This means your personal study lists never leave your device, no user account registrations are required, and your data remains completely private to you.",
   },
   {
    heading: "Get in Touch",
    body: "We are constantly working to improve our lookup algorithms, expand our databases, and design new game modes. If you have any feature requests, dictionary corrections, or general feedback, please reach out to us through our contact page. Thank you for making wordIzy a part of your daily gaming routine!",
   },
  ],
 },
 contact: {
  title: "Contact Us",
  intro: "Have a question, feedback, or a feature suggestion for wordIzy? We would love to hear from you!\n\nWhether you found a missing word in our Scrabble dictionaries, encountered a bug while playing Anagram Blitz, or just want to suggest a new tool variation, your input helps us build a better platform for word puzzle players worldwide.",
  sections: [
   {
    heading: "How to Reach Us",
    body: "Please send all inquiries, feedback, or support requests directly to our official administration email:\n📩 support@wordizy.com",
   },
   {
    heading: "Please Include in Your Message",
    body: "To help us handle your request as quickly as possible, please include any relevant details:\n• For Bug Reports: Let us know what device or browser you were using (e.g., iPhone/Safari or Desktop/Chrome).\n• For Dictionary Corrections: Mention the specific word, language dictionary, or game mode you were using.\n• For Partnerships: Please state your company or platform name clearly in the subject line.",
   },
   {
    heading: "Expected Response Times",
    body: "We are a small, independent development team, but we read every piece of feedback we receive. You can generally expect a response from us within 24 to 48 hours, Monday through Friday.",
   },
  ],
  closing: "Thank you for being a part of the wordIzy community!",
 },
 privacy: {
  title: "Privacy Policy",
  intro: "At wordIzy, accessible from wordizy.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by wordIzy and how we use it.\n\nIf you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.",
  lastUpdated: "Last Updated: October 28, 2026",
  sections: [
   {
    heading: "Log Files",
    body: "wordIzy follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.",
   },
   {
    heading: "Cookies and Web Beacons",
    body: "Like any other website, wordIzy uses \"cookies\". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.",
   },
   {
    heading: "Google DoubleClick DART Cookie",
    body: "Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to wordizy.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: google.com",
   },
   {
    heading: "Our Advertising Partners",
    body: "Some of the advertisers on our site may use cookies and web beacons. Our advertising partners include: Google AdSense. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies above. Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on wordIzy, which are sent directly to users' browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.\n\nPlease note that wordIzy has no access to or control over these cookies that are used by third-party advertisers.",
   },
   {
    heading: "Third-Party Privacy Policies",
    body: "wordIzy's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.\n\nYou can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.",
   },
   {
    heading: "Browser Local Storage",
    body: "To provide our personalized features without requiring user accounts or registrations, wordIzy utilizes your browser's local storage (localStorage) for features like the Save Vault and game preferences. This data is stored entirely on your local device. It is never transmitted to our servers, shared with third parties, or used for tracking purposes across external websites. You can clear this data at any time by clearing your browser's cache or using the options provided within the tool interfaces.",
   },
   {
    heading: "Children's Information",
    body: "Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.\n\nwordIzy does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.",
   },
   {
    heading: "Online Privacy Policy Only",
    body: "This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in wordIzy. This policy is not applicable to any information collected offline or via channels other than this website.",
   },
   {
    heading: "Consent",
    body: "By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.",
   },
  ],
  thirdPartyServices: [
    {
      name: "Google AdSense",
      description: "Serves advertisements to our site visitors. Uses cookies (DART cookies) to serve ads based on your visits to wordizy.com and other sites. You can decline DART cookies by visiting Google's ad and content network Privacy Policy.",
      url: "https://policies.google.com/technologies/ads",
    },
  ],
 },
 terms: {
  title: "Terms of Service",
  intro: "Welcome to wordIzy (accessible via wordizy.com). These Terms of Service (\"Terms\") govern your access to and use of our website, word game helper tools, dictionaries, and interactive games like Anagram Blitz (collectively, the \"Services\").\n\nBy accessing or using wordIzy, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use our Services.",
  lastUpdated: "Last Updated: October 28, 2026",
  sections: [
   {
    heading: "1. Description of Service",
    body: "wordIzy provides free online word puzzle assistance tools, anagram solvers, dictionary lookups, and word-based mini-games. All Services are provided on an \"as-is\" and \"as-available\" basis for personal, non-commercial entertainment and educational purposes only.",
   },
   {
    heading: "2. Permitted Use and Restrictions",
    body: "You are granted a limited, non-exclusive, non-transferable, and revocable license to access and use wordIzy strictly in accordance with these Terms.\nAs a condition of your use, you agree not to:\n• Use any automated systems, scrapers, spiders, robots, or scripts to harvest data, text, or word lists from our databases.\n• Interfere with or disrupt the performance, integrity, or security of the website servers.\n• Frame or mirror any part of the site without our prior written authorization.\n• Use our word game helper tools or automated systems to cheat in competitive online environments where external assistance tools are explicitly banned by those platforms' respective terms.",
   },
   {
    heading: "3. Intellectual Property Rights",
    body: "All content, features, functionality, logos, site design, text, and custom gaming software (including Anagram Blitz) on wordIzy are the exclusive property of wordIzy and are protected by international copyright, trademark, and intellectual property laws. You may not reproduce, distribute, modify, or create derivative works of our property without express written consent.",
   },
   {
    heading: "4. Third-Party Trademarks and Disclaimer",
    body: "References to third-party games, including but not limited to Scrabble, Wordle, Words With Friends, Wordfeud, and Quordle, are used solely for informational and descriptive purposes to explain the compatibility of our toolsets. wordIzy is an independent platform and is not affiliated with, endorsed, authorized, or sponsored by Hasbro, Mattel, The New York Times Company, or any of their respective parent companies or affiliates.",
   },
   {
    heading: "5. User Data and Local Storage",
    body: "wordIzy does not require user registration or account creation. Features like the Save Vault utilize your web browser's local storage (localStorage) to save configuration states and word history locally on your device. We hold no responsibility or liability for any data loss occurring from cleared browser caches, hardware changes, or browser updates.",
   },
   {
    heading: "6. Limitations of Liability",
    body: "In no event shall wordIzy, its developers, or its affiliates be liable for any direct, indirect, incidental, special, or consequential damages arising out of the use or the inability to use our website, even if advised of the possibility of such damages. We do not guarantee that the word lists, scoring calculations, or dictionary helper configurations are entirely error-free or updated to match real-time live game dictionary patches.",
   },
   {
    heading: "7. Modifications to the Service and Terms",
    body: "We reserve the right to modify, suspend, or discontinue any aspect of our Services at any time without notice. We also reserve the right to amend these Terms at our discretion. Your continued use of wordIzy following any posted updates constitutes your acceptance of the revised Terms.",
   },
   {
    heading: "8. Governing Law",
    body: "These Terms shall be governed by and construed in accordance with international digital commerce practices, without regard to conflict of law principles.",
   },
   {
    heading: "9. Contact Information",
    body: "If you have any questions or clarifications regarding these Terms of Service, please contact us via our official contact page.",
   },
  ],
 },
 sitemap: { title: "Sitemap", body: "All pages on WordIzy." },
 footer: { rights: "All rights reserved.", madeWith: "Built for word lovers.", links: "Quick links", desc: "Free word unscrambler, anagram & puzzle solvers in 9 languages. No sign-up.", disclaimer: "For entertainment & word games. Not affiliated with Scrabble or Wordle." },
 faq: {
  title: "How to use & FAQ",
  unscrambler: [
   { q: "What is a Word Unscrambler and how do I use it?", a: "A word unscrambler takes a jumble of letters — like a Scrabble rack (e.g. SRAABLC) — and finds every valid dictionary word that can be spelled from those letters. Type your letters into the 'Your Letters' box, then click Unscramble. Results appear grouped by word length (longest first), each word showing its Scrabble point value. It's ideal for Scrabble, Words With Friends, Wordfeud, crosswords, and anagram puzzles." },
   { q: "How do wildcards (? and *) work?", a: "Use ? or * as a wildcard whenever you have an unknown letter — they represent a Scrabble blank tile, a missing crossword square, or the unconfirmed letter in a Wordle guess. Entering 'QUER?Y' tells WordIzy to find all words matching 'QUER' + any single letter + 'Y', returning QUERY directly. Each wildcard scores 0 points (matching real Scrabble blank-tile rules), which keeps your displayed score realistic when you're working with a blank on your rack. You can chain multiple wildcards at once — 'A??LE' matches APPLE, ADDLE, AGILE, AISLE, and ABLE — making wildcards ideal for exploring anagram possibilities when your rack is incomplete. To keep results useful, limit wildcards to one or two per query: every additional wildcard multiplies the candidate set, and beyond three you'll start seeing words that aren't actually playable from your real tiles. Wildcards also work in the Wordle Solver, Anagram Solver, and Wordfeud Helper with identical semantics, so you can carry the same partial-letter workflow across every tool on the site." },
   { q: "How do I use the Advanced Filters?", a: "Click 'Advanced Filters' to reveal three optional fields. 'Starts with' limits results to words beginning with given letters (e.g. 'AB' → only words starting with AB). 'Ends with' does the same for suffixes (e.g. 'ED' → only words ending in ED). 'Must include' guarantees certain letters appear in every result, in any position. Combine all three with wildcards for precise control." },
   { q: "How are words scored?", a: "Each word is scored using the official English Scrabble letter values: A=1, B=3, C=3, D=2, E=1, F=4, G=2, H=4, I=1, J=8, K=5, L=1, M=3, N=1, O=1, P=3, Q=10, R=1, S=1, T=1, U=1, V=4, W=4, X=8, Y=4, Z=10. Wildcards (? *) act as blank tiles and score 0 points, matching real Scrabble blank-tile rules. WordIzy automatically calculates the total for every result and sorts them by score within each length group, so the highest-scoring plays appear at the top of every list — saving you the mental math of summing tile values yourself and letting you spot the bingo candidate at a glance. For other languages, WordIzy uses the official Scrabble letter values for that language's dictionary (French ODS9, Spanish FISE, Italian Zingarelli, Portuguese, German, Dutch OpenTaal, plus curated romaji and pinyin lists for Japanese and Mandarin). Switch languages using the navbar selector to see localized scoring. Real-game scores also depend on bonus squares (double/triple letter, double/triple word) and the +50 bingo bonus for using all 7 tiles, so treat the displayed score as a baseline and add bonuses mentally when planning your move." },
   { q: "Which dictionaries are available?", a: "WordIzy supports 9 languages: English (NWL2023 + CSW21), French (ODS9 2024), Spanish (FISE), Italian (Zingarelli), Portuguese, German, Dutch (OpenTaal), plus Japanese (romaji) and Mandarin (pinyin). All words are filtered against the official Scrabble dictionary for each language. Switch languages using the language selector in the navbar." },
   { q: "Why are results grouped by length?", a: "Grouping by word length makes it easy to find the type of play you need. In Scrabble, longer words generally score higher, but sometimes a shorter word fits the board better. The longest words appear at the top, descending to 2-letter words. Within each group, words are sorted by Scrabble score so you can quickly spot the best play." },
  ],
  scramble: [
   { q: "What is the Scramble / Descrambler for?", a: "This tool solves jumble puzzles — where letters are scrambled and you must find the original word(s). Enter the scrambled letters (e.g. RBOLENW) and click Descramble to see all real words that can be formed. It's perfect for newspaper jumble puzzles, anagram games, and word-scramble challenges." },
   { q: "How is this different from the Unscrambler?", a: "The Descrambler uses the same engine as the Unscrambler but is focused on solving scrambled-word puzzles rather than finding every possible word from a rack. You can also use the 'Scramble a word' feature below the input to jumble a word into random variants — useful for creating your own puzzles." },
   { q: "Can I use wildcards?", a: "Yes. Use ? or * to represent unknown letters. For example, if a jumble puzzle has a missing letter, enter the known letters plus a ? and WordIzy will fill in the blank with every valid letter combination." },
   { q: "How do I create my own scrambled word?", a: "Use the 'Scramble a word' card below the main input. Type any word (e.g. 'scrabble') and click Generate — WordIzy produces several randomized scrambles of that word. Use these to create puzzles for friends or practice unscrambling." },
  ],
  wordle: [
   { q: "How does the Wordle Solver work?", a: "The Wordle Solver narrows down today's Wordle answer using your game feedback. Enter the information you've gathered from your guesses: green letters (correct position), yellow letters (in the word but wrong position), and gray letters (not in the word). The solver returns all valid words that match your constraints." },
   { q: "How do I enter placed (green) letters?", a: "In the 'Placed letters (green)' field, type the letters you know are in the correct position, using . or _ for empty slots. For example, if you know the word is A _ _ L E, enter 'A..LE'. The solver only returns words matching this exact pattern." },
   { q: "What are valid (yellow) and excluded (gray) letters?", a: "Valid letters (yellow) are letters you know are IN the word but not in the position you guessed — enter them all in the 'Valid letters' field (e.g. 'RST'). Excluded letters (gray) are letters confirmed NOT in the word — enter them in 'Excluded letters' (e.g. 'BXF'). The solver filters out any word containing excluded letters." },
   { q: "What word length should I use?", a: "Select the length of today's Wordle (default 5). WordIzy supports 4- to 8-letter words, so it works for Wordle variants like Quordle, Octordle, and custom-length games too." },
   { q: "Any tips for choosing the next guess?", a: "Pick a word from the results that uses common letters you haven't tested yet (like R, T, S, L, N). This maximizes information gain. If the list is long, choose a word that eliminates the most possibilities. The solver shows each word's Scrabble score — higher scores often mean rarer letters that can help narrow things down." },
  ],
  quordle: [
   { q: "What is the Quordle Solver?", a: "Quordle is a game where you solve four Wordle puzzles simultaneously. This solver lets you enter constraints for up to 4 boards at once and returns candidate words for each. Each board keeps its own placed (green), valid (yellow), and excluded (gray) letters." },
   { q: "How do I use multiple boards?", a: "Fill in what you know for each board. Board 1's constraints only affect Board 1's results. Click 'Add board' to add up to 4 boards. Use the X button to remove a board. When ready, click Solve to get candidate words for all boards at once." },
   { q: "Should I share letters between boards?", a: "Yes — a key Quordle strategy is using one guess to gather information across multiple boards. If a letter is green on Board 1, it's likely in the same position on other boards too. Enter shared constraints on each board to cross-pollinate information and narrow down all four answers faster." },
   { q: "Any strategy tips for Quordle?", a: "Start with a word rich in common letters (like CRANE or SLATE) to gather information across all boards. Focus on the board with the most constraints first — solving it frees up mental space. Use the solver after 2-3 guesses when you have enough info to narrow each board to a manageable list." },
  ],
  anagram: [
   { q: "What is an anagram?", a: "An anagram is a word or phrase formed by rearranging all the letters of another word. For example, LISTEN and SILENT are anagrams — same letters, different order. The Anagram Solver finds every word that uses exactly all the letters you provide." },
   { q: "How is this different from the Unscrambler?", a: "The Unscrambler finds words of ANY length that can be formed from your letters (including shorter words). The Anagram Solver only finds words that use ALL your letters — the full-length anagrams. For example, with 'CHIEN', the anagram solver returns CHIEN, CHINE, NICHE (all 5 letters), while the unscrambler would also return shorter words like ICE, IN, HE." },
   { q: "Can I use wildcards?", a: "Yes. Use ? or * as wildcards to fill remaining slots. For example, entering 'CAT??' finds all 5-letter anagrams where CAT is combined with any two letters. Wildcards score 0 points (like blank tiles)." },
   { q: "What are anagrams useful for?", a: "Anagrams are used in word games, puzzles, cryptography, and linguistics. In Scrabble, finding anagrams of your rack helps you spot bingos (using all 7 tiles for a 50-point bonus). They're also popular in crossword clues, trivia, and brain teasers." },
  ],
  random: [
   { q: "What does the Random Word Generator do?", a: "It generates random real words from the selected dictionary, with optional filters. You can specify word length, starting letters, ending letters, or letters the word must contain. Use it for games, creative writing, naming, vocabulary practice, or generating passwords with real words." },
   { q: "How do I filter the random words?", a: "Set 'Length' to a specific number (2-12) or leave it as 'Any'. 'Starts with' limits words to those beginning with given letters. 'Ends with' limits to words ending with given letters. 'Contains' requires the word to include certain letters anywhere. 'How many' controls the number of words generated (1-200)." },
   { q: "Are the words valid Scrabble words?", a: "Yes. All generated words come from the official Scrabble dictionary for the selected language (NWL2023/CSW21 for English, ODS9 for French, etc.). Every word is playable in Scrabble and other word games." },
   { q: "Can I use this for word games?", a: "Absolutely. Generate random words for Pictionary, charades, word association games, or vocabulary quizzes. For password generation, combine 3-4 random words of different lengths — this creates memorable yet secure passphrases." },
  ],
  wordfeud: [
   { q: "What is the Wordfeud Helper?", a: "Wordfeud is a popular mobile word game similar to Scrabble. This helper finds the best words you can play from your rack. Enter your 7 letters (plus any board letters already placed) and WordIzy returns all playable words, sorted by Scrabble score." },
   { q: "How do I enter my rack?", a: "Type your 7 tile letters into the 'Your Letters' box. Use ? or * for blank tiles (which can represent any letter but score 0 points). If there are letters already on the board you want to build off, add them too — WordIzy will find words that can be formed from the combined pool." },
   { q: "Which dictionary should I use?", a: "Wordfeud supports multiple dictionaries depending on your region. English Wordfeud uses a Scrabble-like list, so English (NWL2023/CSW21) works well. For other languages, select the matching one (French ODS9, Spanish FISE, etc.) from the language selector." },
   { q: "How are scores calculated?", a: "Scores use the official Scrabble letter values for the selected language. Note that Wordfeud's actual scoring may differ slightly (it has bonus squares and its own tile distribution). Use the scores as a guide to identify high-value plays — the word with the most points from your rack is usually your best move." },
  ],
  dictionary: [
   { q: "What does Check Dictionary do?", a: "Enter any word to verify whether it's valid in the official Scrabble dictionary for the selected language. The tool shows the word as Scrabble tiles, a valid/invalid badge, the Scrabble score, word length, letter tiles, a dictionary definition, and synonyms (where available)." },
   { q: "Where do definitions come from?", a: "Definitions are sourced from multiple references: the Free Dictionary API (for English, French, Spanish, German, Italian, Portuguese), Wiktionary (all languages as a fallback), and an AI assistant for any remaining gaps. The source is labeled next to each definition." },
   { q: "Where do synonyms come from?", a: "Synonyms come from Datamuse (for English, Spanish, French, Italian, Portuguese) and OpenThesaurus (for German). Only synonyms that are themselves valid Scrabble words are shown — click any synonym to check it instantly." },
   { q: "Why might a common word be invalid?", a: "Scrabble dictionaries are strict — they exclude proper nouns, abbreviations, hyphenated words, and words requiring apostrophes. For example, 'BRUNCH' is valid but 'BRUNCH'S' may not be. If a word seems missing, it may be a capitalized proper noun or a recent addition not yet in the official list. Switch languages to check the word in a different dictionary." },
  ],
  scrabble: [
   { q: "What is Scrabble Duplicate?", a: "Duplicate Scrabble is a variant where every player receives the same rack and must find the best possible play. It's used in tournaments and training to test skill without luck. This tool helps you find the highest-scoring words from your rack — enter your 7 letters and optionally any board letters, then click 'Find best words'." },
   { q: "How do I enter board letters?", a: "If there are letters already on the board that you can build off, type them in the 'Board letters (optional)' field along with your rack letters. WordIzy treats the combined pool as available letters. This helps find words that hook onto existing plays — essential for maximizing score in real games." },
   { q: "How are the top plays ranked?", a: "Words are sorted by Scrabble score (highest first). The top 10 plays appear in a highlighted list at the top. Remember: actual game scores also depend on bonus squares (double/triple letter/word) and bingos (50-point bonus for using all 7 tiles). Use the tool's scores as a baseline, then factor in board positioning." },
   { q: "What's a bingo and how do I find one?", a: "A bingo is the single biggest swing in Scrabble: playing all 7 of your tiles in one turn earns a +50 bonus on top of the word's base score, so a 30-point word becomes an 80-point play. To find bingos with WordIzy, enter your full 7-letter rack (use ? or * for any blank tiles) and look at the 7-letter results group at the top of the list — every word there is a potential bingo. The highest-scoring 7-letter bingos in English Scrabble include MUZJIKS (29 base + 50 = 79 points), JACUZZI (34 + 50 = 84), SYZYGY (21 + 50 = 71), OXAZOLIDINE (rare but devastating), and the ANATOMIZ-, ANTISOCIAL-, OVERLAPPING- stems that accept common suffixes. To spot bingos faster, learn the high-value stems — SATISFI-, ANTISOY-, OVERLAP- — that combine with -ER, -ED, -ING, -ATION, and -ATION. Hold one or two flexible letters (E, R, S, T) back when your rack is bingo-shaped, since the bingo bonus (+50) almost always outweighs the points from dumping those tiles early." },
  ],
  wordlists: [
   { q: "What is the Word Lists page?", a: "Word Lists lets you browse every valid Scrabble word from 2 to 7 letters. Words are grouped by length, then by ending letter (A-Z), so you can explore the dictionary systematically. Use it to study, find words for games, or expand your vocabulary." },
   { q: "How do I filter by length?", a: "Use the length selector (2-7) at the top. Click 'All' to see every length stacked (2-letter words on top, 7-letter at the bottom), or click a specific number to see only that length. Each length section shows 26 containers (one per ending letter A-Z)." },
   { q: "How do I filter by letter?", a: "Use the A-Z letter row below the length selector. Click a letter to show only words ending with that letter, or 'All' to show every letter. This is useful for finding words that hook onto a specific letter already on the board." },
   { q: "Why are words shown in uppercase?", a: "Scrabble tiles are uppercase, so words are displayed in uppercase to match. Each word shows its Scrabble point value next to it. Words within each letter container are sorted alphabetically (A-Z) for easy scanning." },
  ],
  wordstarts: [
   { q: "What is the Word Starts By page?", a: "This page lets you browse all valid Scrabble words that START with a specific letter. Select a letter (A-Z) and WordIzy shows every word beginning with that letter, grouped by length (2-7 letters). It's perfect for studying openings and finding words to build off a starting letter on the board." },
   { q: "How do I use the length and letter selectors?", a: "First, pick a letter from the A-Z row — this sets the starting letter. Then use the length row (2-7 or All) to filter by word length. Each length section shows all words starting with your chosen letter, sorted alphabetically. Click 'All' in either row to remove that filter." },
   { q: "How is this useful for Scrabble?", a: "Knowing words that start with each letter helps you plan openings and hooks. If you have a Q, knowing all Q-starting words (QI, QAT, QUAD...) helps you play it effectively. The page is also valuable for crosswords, where clues often specify 'starts with...'." },
   { q: "Why paginate at 50 words?", a: "Some letters (like S, A, E) have thousands of starting words. To keep pages fast and readable, results paginate at 50 words per page with prev/next buttons. Each page shows the page number and total pages so you know where you are." },
  ],
  wordends: [
   { q: "What is the Word Ends By page?", a: "This page lets you browse all valid Scrabble words that END with a specific letter. Select a letter (A-Z) and WordIzy shows every word ending with that letter, grouped by length (2-7 letters). It's ideal for finding words to hook onto an existing letter on the board." },
   { q: "How do I use the length and letter selectors?", a: "First, pick a letter from the A-Z row — this sets the ending letter. Then use the length row (2-7 or All) to filter by word length. Each length section shows all words ending with your chosen letter, sorted alphabetically. Click 'All' in either row to remove that filter." },
   { q: "How is this useful for Scrabble?", a: "Ending letters matter for hooks — if there's an S on the board, knowing all words ending in S lets you pluralize or extend plays. Similarly, knowing words ending in D, ED, ING helps you build off common suffixes. This page is a powerful study tool for competitive play." },
   { q: "Why paginate at 50 words?", a: "Some letters (like E, S, D) have thousands of ending words. To keep pages fast and readable, results paginate at 50 words per page with prev/next buttons. Each page shows the page number and total pages so you know where you are." },
  ],
  vault: [
   { q: "What is the Save Vault?", a: "The Save Vault is a built-in vocabulary training tool for competitive Scrabble and Wordle players — a personal word bookmark list designed specifically for spaced-repetition study of tricky letter combinations. Unlike generic browser bookmarks, the vault keeps each saved word's Scrabble score visible and lets you copy the entire list straight into a flashcard app or Anki deck for offline drilling. Here's a 4-step workflow competitive players use: (1) Run a search like '7-letter words from QUARTZE' or 'words starting with Q' and star the high-value words you keep forgetting — QAT, QOPH, FAQIR, MUZJIKS. (2) Open the vault drawer from the star icon in the top-right header; your saved words stay organized in one list with their live scores next to each entry. (3) Click 'Copy All Lines' to paste the list into Anki, Quizlet, or a printable flashcard template for spaced-repetition review away from the screen. (4) Re-run the same search next week and compare which words you've memorized — your saved list persists locally in your browser's localStorage, so it never leaves your device, requires no account, and works offline once the page is loaded." },
   { q: "How do I save a word to the vault?", a: "Click the star (☆) icon next to any word in the results. The star turns amber (★) when a word is saved. Click it again to remove the word from your vault." },
   { q: "How do I view my saved words?", a: "Click the star icon in the site header (top-right corner). A drawer slides in from the right showing all your saved words. You can copy individual words, copy the entire list, or clear the vault." },
   { q: "Is my vault synced across devices?", a: "No — the vault is stored in your browser's localStorage, so it's per-device. If you clear your browser data or use a different device, your vault won't transfer. No account is needed and no data leaves your device." },
  ],
 },
 blitz: {
  loadingEngine: "Loading Puzzle Engine...",
  completed: "Completed",
  todaysPuzzleSolved: "📅 Today's Puzzle Solved!",
  alreadyPlayed: "You have already used your daily attempt! Come back tomorrow at midnight for a brand-new challenge.",
  playInfinite: "Play Infinite Practice Mode",
  challengeTitle: "⚡ Anagram Blitz Challenge",
  challengeDesc: "Unscramble words under a 60-second time limit from our Scrabble dictionaries.",
  startToday: "Start Today's Puzzle",
  playInfiniteBtn: "Play Infinite Practice",
  timesUp: "⏱️ Time's Up! Game Over",
  finalScore: "Final Score:",
  points: "points.",
  playAgain: "🔄 Play Practice Again",
  dailyLocked: "Your daily attempt is locked. See you tomorrow!",
  returnMenu: "Return to Menu",
  timeLeft: "s",
  totalScore: "pts",
  generating: "🎲 Generating Word...",
  hint: "💡 Hint:",
  waiting: "Waiting...",
  typeWord: "Type word...",
  skipReveal: "🏳️ Skip & Reveal",
  stopGame: "🛑 Stop Game",
  play: "▶ Play",
  correct: "✨ Perfect! Correct Answer!",
  wrong: "❌ Wrong answer! Try again.",
  answerWas: "The answer was:",
  challengeFriend: "Challenge a Friend",
  challengeText: "I scored {score} on WordIzy Anagram Blitz — can you beat me? Play free: https://wordizy.com/blitz",
  // SEO content section (below the game card)
  pageHeading: "Play Anagram Blitz — Free 60-Second Word Game",
  howToPlayTitle: "How to Play Anagram Blitz",
  howToPlayDesc: "Anagram Blitz is a fast-paced 60-second word unscramble game. You are given a scrambled set of letters and must rearrange them to form a valid dictionary word. Each correct answer earns 20 points; each skip costs 5 points. Beat your high score and climb the daily leaderboard.",
  gameModesTitle: "Game Modes",
  dailyModeName: "Daily Challenge",
  dailyModeDesc: "One puzzle per day. Play once and lock in your score for the leaderboard.",
  infiniteModeName: "Infinite Practice",
  infiniteModeDesc: "Unlimited puzzles. Each correct answer adds 10 bonus seconds to the clock.",
  tipsTitle: "Tips & Strategy",
  tip1: "Look for common English endings: -S (plural, 31% of 5-letter words), -E (silent/feminine), -ER (comparative), -ED (past tense), -ING (present participle).",
  tip2: "S is the most common starting letter in English (11% of 5-letter answers) — if your first guess has no S info, consider testing it in your second.",
  tip3: "E is the most common ending letter — test words ending in E early to lock in the final position.",
  tip4: "The consonant cluster -ST is extremely common in English endings (TEST, MOST, COST) — if you have S green, consider T next to it.",
  blitzFooter: "Anagram Blitz uses official Scrabble dictionaries (NWL2023 + CSW21 for English) with multi-language support across 9 languages. Play free, no sign-up required.",
 },
 ui: {
  advertisement: "Advertisement",
  featuredGuide: "Featured Guide",
  saveVaultFaqTitle: "Save Vault — How to use it",
  relatedTools: "Related Tools",
  published: "Published:",
  backToHome: "Back to Home",
  somethingWrong: "Something went wrong",
  tryAgain: "Try again",
  reloadPage: "Reload page",
  returnLabel: "Return",
  allCopied: "All words copied successfully!",
  showLess: "Show less",
  showMore: "Show more",
  enterPassword: "Enter password",
  totalSearches: "Total searches",
  topQuery: "Top query",
  topTool: "Top tool",
  topLanguage: "Top language",
  newDailyChallenge: "New Daily Challenge Live",
  scrambleFeatureHint: "Use the Scramble a word feature below to create your own jumble puzzles.",
  wordList: "Word List",
  copiedToClipboard: "Copied to clipboard!",
 },
 hubPages: {
  startsSubtitle: "Browse every valid Scrabble word that starts with each letter of the alphabet, from 2 to 15 letters.",
  endsSubtitle: "Browse every valid Scrabble word that ends with each letter of the alphabet, from 2 to 15 letters.",
  lengthSubtitle: "Browse every valid Scrabble word by length, from 2 to 15 letters. Each length has its own dedicated page.",
  wordleStartsSubtitle: "Browse every valid Wordle word that starts with each letter of the alphabet. Perfect for finding the best starting words and narrowing down your daily puzzle.",
  wordleEndsSubtitle: "Browse every valid Wordle word that ends with each letter of the alphabet. Perfect for finding hooks, suffixes, and narrowing down your daily puzzle.",
  startsHeading: "Words Starting With — A to Z",
  endsHeading: "Words Ending With — A to Z",
  lengthHeading: "Unscramble by Word Length (2–15 letters)",
  wordleStartsHeading: "Wordle Words Starting With — A to Z",
  wordleEndsHeading: "Wordle Words Ending With — A to Z",
  clickLetterStarts: "Click a letter to browse all words starting with that letter on a dedicated page.",
  clickLetterEnds: "Click a letter to browse all words ending with that letter on a dedicated page.",
  clickLength: "Click a number to browse all words of that length on a dedicated page.",
  clickLetterWordleStarts: "Click a letter to browse all Wordle words starting with that letter on a dedicated page.",
  clickLetterWordleEnds: "Click a letter to browse all Wordle words ending with that letter on a dedicated page.",
  wordleStartsBadge: "Wordle Starts",
  wordleEndsBadge: "Wordle Ends",
  wordleStartsTitle: "Wordle Words Starting With A-Z",
  wordleEndsTitle: "Wordle Words Ending With A-Z",
  returnHome: "Return to home",
  footerNote: "All words filtered through official Scrabble dictionaries.",
  searchPlaceholderStarts: "Type a letter A-Z to browse words starting with it…",
  searchPlaceholderEnds: "Type a letter A-Z to browse words ending with it…",
  searchPlaceholderLength: "Type a number 2-15 to browse by length…",
  searchPlaceholderWordleStarts: "Type a letter A-Z to browse Wordle words starting with it…",
  searchPlaceholderWordleEnds: "Type a letter A-Z to browse Wordle words ending with it…",
  browseBtn: "Browse",
 },
 wordListPage: {
  loading: "Loading verified word lists…",
  filterPlaceholder: "Filter words…",
  filterLabel: "Filter words",
  clearFilter: "Clear filter",
  loadMore: "Load more",
  remaining: "remaining",
  allLengths: "All",
  filterByLength: "Filter by word length",
  noMatch: "No words match your filter.",
  noWords: "No words found.",
  wordsCount: "words",
  error: "Failed to load words. Please refresh.",
 },
};

const fr: Translation = {
 nav: {
  unscrambler: "Anagrammeur", scramble: "Mélange", wordle: "Wordle",
  quordle: "Quordle", anagram: "Anagrammes", random: "Mot Aléatoire",
  wordfeud: "Wordfeud", dictionary: "Dictionnaire", scrabble: "Duplicate",
  wordlists: "Listes de Mots", wordstarts: "Mots Commencent Par", wordends: "Mots Finissent Par", wordlestarts: "Wordle Commence A-Z", wordleends: "Wordle Finit A-Z", about: "À propos", contact: "Contact", privacy: "Confidentialité", terms: "Conditions d'utilisation",
  sitemap: "Plan du site", tools: "Outils", more: "Plus", solvers: "Solveurs", site: "Site", wordlab: "Labo des Mots", inbox: "Boîte de réception",
  dashboard: "Tableau de bord", blitz: "⚡ Anagram Blitz", blitzShort: "Blitz"
 },
 brand: { name: "wordIzy", tagline: "Anagrammez. Résolvez. Gagnez." },
 common: {
  yourLetters: "Vos lettres", unscramble: "Anagrammer", clear: "Effacer", advancedFilters: "Filtres avancés",
  startsWith: "Commence par", endsWith: "Finit par", mustInclude: "Doit contenir", dictionaryLabel: "Dictionnaire",
  results: "Résultats", noResults: "Aucun mot trouvé. Essayez d'autres lettres ou ajoutez des jokers (? ou *).",
  wordsFound: "mots trouvés", points: "pts", length: "lettres", loading: "Chargement…", search: "Rechercher",
  copy: "Copier", copied: "Copié !", tryExamples: "Essayer :", tipsTitle: "Astuces & fonctionnement",
  tileValues: "Valeurs des tuiles Scrabble", blanks: "Jokers", languageLabel: "Langue",
  showMore: "Afficher plus", showLess: "Afficher moins", allWords: "Tous les mots", perGroup: "par groupe",
  wordsCount: "mots", reset: "Réinitialiser", apply: "Appliquer", solve: "Résoudre", generate: "Générer",
  check: "Vérifier", example: "Exemple", none: "Aucun", optional: "optionnel",
 },
 home: {
  title: "Anagrammeur de Mots", subtitle: "Saisissez vos lettres mélangées, ajoutez des jokers avec ? ou *, et trouvez tous les mots jouables — groupés par longueur et triés par score Scrabble.",
  heroBadge: "Gratuit • Sans inscription • 9 langues",
  faqTitle: "Questions fréquentes",
  q1: "À quoi sert un anagrammeur ?",
  a1: "Un anagrammeur prend un mélange de lettres (comme un chevalet Scrabble) et trouve tous les mots valides du dictionnaire que l'on peut écrire avec ces lettres. Idéal pour Scrabble, Wordfeud, mots croisés et puzzles d'anagrammes — les meilleurs coups instantanément.",
  q2: "Comment utiliser les options avancées ?",
  a2: "Après avoir saisi vos lettres, ouvrez les Filtres avancés. « Commence par » limite aux mots commençant par ces lettres, « Finit par » fait de même pour les suffixes, et « Doit contenir » garantit que certaines lettres apparaissent dans chaque résultat. Combinez-les avec des jokers (? ou *) pour remplacer une lettre inconnue.",
  q3: "Comment ça marche ?",
  a3: "WordIzy compare votre pool de lettres à un dictionnaire complet en mémoire pour la langue choisie. Il vérifie quels mots peuvent être formés (? et * comme jokers), applique vos filtres, score chaque mot avec les valeurs Scrabble officielles, puis regroupe les résultats par longueur — les plus longs d'abord.",
  q4: "Quelles langues sont prises en charge ?",
  a4: "Anglais, français, espagnol, italien, portugais, allemand, néerlandais, plus japonais (romaji) et mandarin (pinyin). Changez le dictionnaire depuis le sélecteur de langue.",
 },
 scramble: {
  title: "Mélangeur / Démêleur de mots", subtitle: "Bloqué sur une anagramme ? Saisissez les lettres mélangées et nous les démêlerons en vrais mots.",
  inputLabel: "Lettres mélangées", btn: "Démêler", solutionLabel: "Solutions possibles", hint: "Utilisez ? ou * pour les lettres inconnues.",
 },
 wordle: {
  title: "Solveur Wordle", subtitle: "Réduisez le Wordle du jour. Saisissez les lettres vertes à leur place, les lettres jaunes connues, et les lettres grises à exclure.",
  length: "Longueur du mot", placed: "Lettres placées (vert)", valid: "Lettres valides (jaune)", excluded: "Lettres exclues (gris)", btn: "Résoudre", hint: "Utilisez . ou _ pour les cases vides, ex. A..LE",
 },
 quordle: {
  title: "Solveur Quordle", subtitle: "Résolvez jusqu'à quatre Wordle à la fois. Chaque plateau garde ses contraintes ; les lettres valides/exclues sont partagées.",
  board: "Plateau", addBoard: "Ajouter un plateau", hint: "Remplissez ce que vous savez pour chaque plateau, puis résolvez.",
 },
 anagram: {
  title: "Solveur d'Anagrammes", subtitle: "Trouvez toutes les anagrammes de vos lettres — les mots qui utilisent exactement toutes les lettres fournies.",
  btn: "Trouver les anagrammes", hint: "Les jokers (? *) complètent les lettres manquantes.",
 },
 random: {
  title: "Générateur de Mots Aléatoires", subtitle: "Générez des mots réels aléatoires avec filtres de longueur, préfixe, suffixe et contenu.",
  length: "Longueur", any: "Toutes", count: "Combien", btn: "Générer",
 },
 wordfeud: {
  title: "Aide Wordfeud", subtitle: "Trouvez les meilleurs mots Wordfeud depuis votre chevalet. Wordfeud utilise les mêmes dictionnaires multilingues — choisissez le vôtre.",
  btn: "Trouver des mots", hint: "Ajoutez ? ou * pour les tuiles vierges.",
 },
 dictionary: {
  title: "Vérifier le Dictionnaire", subtitle: "Vérifiez si un mot existe dans le dictionnaire choisi, voyez son score Scrabble et lisez une définition.",
  btn: "Vérifier", exists: "est un mot valide", notExists: "introuvable dans le dictionnaire", definition: "Définition", score: "Score Scrabble", tiles: "Tuiles de lettres",
 },
 scrabble: {
  title: "Scrabble Duplicate", subtitle: "Le Scrabble duplicate donne le même chevalet à tous. Saisissez vos 7 lettres (plus les lettres déjà posées) et trouvez les coups les plus forts.",
  rack: "Votre chevalet", board: "Lettres du plateau (optionnel)", btn: "Trouver les meilleurs mots", hint: "Jokers autorisés. Résultats classés par score.",
 },
 wordlists: {
  title: "Listes de Mots", subtitle: "Parcourez tous les mots de 2 à 7 lettres. Choisissez une vue, une longueur et une lettre pour explorer le dictionnaire de A à Z.",
  allWords: "Tous les mots", startsBy: "Commence par A–Z", endsBy: "Finit par A–Z", letter: "Lettre", selectLength: "Longueur", selectLetter: "Lettre", browse: "Parcourir",
 },
 about: {
  title: "À propos de wordIzy",
  intro: "Bienvenue sur wordIzy, votre destination de référence pour des utilitaires de jeux de mots performants, des solveurs d'anagrammes et des ressources éducatives pour casse-têtes. Conçu par une équipe dévouée de développeurs indépendants et de passionnés de casse-têtes lexicaux de longue date, wordIzy a été pensé dès le départ pour être l'ensemble d'outils de dictionnaire le plus rapide, le plus épuré et le plus exempt de distractions sur le Web.",
  sections: [
   {
    heading: "Notre mission",
    body: "Notre mission est d'aider les joueurs à enrichir leur vocabulaire, à stimuler leur esprit et à résoudre les petites querelles de casse-têtes avec une précision absolue. Nous pensons que les solveurs de mots ne devraient pas être encombrés de mises en page intrusives, de temps de chargement lents ou de configurations compliquées. C'est pourquoi wordIzy propose des calculs instantanés, des dictionnaires de Scrabble localisés en plusieurs langues et des moteurs de filtrage personnalisés et intuitifs, conçus pour un usage quotidien sans accroc.",
   },
   {
    heading: "Pourquoi choisir wordIzy ?",
    body: "Contrairement aux simples tableaux de recherche génériques, nos outils sont taillés sur mesure pour correspondre aux mécaniques exactes des jeux de mots les plus populaires au monde :\n• Bases de données de dictionnaires complètes : Nous prenons en charge 9 langues, en filtrant vos lettres directement par rapport aux lexiques de compétition officiels comme ODS9 (Officiel du Scrabble), NWL2023 et CSW21.\n• Logique de jeu réaliste : Notre système de filtrage avancé des jokers reconnaît des règles telles que la distribution des tuiles vierges au Scrabble, en attribuant de vraies valeurs à zéro point pour que vous puissiez planifier des coups précis de niveau tournoi.\n• Outils éducatifs innovants : Des fonctionnalités uniques comme notre Save Vault enregistré localement fonctionnent comme un gestionnaire de cartes mémoire compagnon personnel, offrant aux joueurs un environnement actif pour étudier les modèles de mots, les crochets et les extensions hors ligne.\n• Jeu captivant : Au-delà des outils, nous créons des expériences personnalisées comme Anagram Blitz pour offrir aux amateurs de jeux de mots un environnement rapide pour tester leur vitesse et défier leurs meilleurs scores personnels.",
   },
   {
    heading: "Notre engagement en matière de confidentialité",
    body: "Nous attachons de l'importance à votre sécurité numérique et aux performances de votre système. Des options avancées comme l'historique de vos mots favoris sont exécutées directement via le stockage local de votre navigateur. Cela signifie que vos listes d'étude personnelles ne quittent jamais votre appareil, qu'aucune inscription de compte utilisateur n'est requise et que vos données restent entièrement privées.",
   },
   {
    heading: "Contactez-nous",
    body: "Nous travaillons sans cesse à améliorer nos algorithmes de recherche, à enrichir nos bases de données et à concevoir de nouveaux modes de jeu. Si vous avez des demandes de fonctionnalités, des corrections de dictionnaire ou des commentaires généraux, n'hésitez pas à nous contacter via notre page Contact. Merci de faire de wordIzy une part de votre routine de jeu quotidienne !",
   },
  ],
 },
 contact: {
  title: "Contactez-nous",
  intro: "Vous avez une question, un retour ou une suggestion de fonctionnalité pour wordIzy ? Nous serions ravis de vous entendre !\n\nQue vous ayez trouvé un mot manquant dans nos dictionnaires Scrabble, rencontré un bug en jouant à Anagram Blitz, ou que vous souhaitiez simplement suggérer une nouvelle variante d'outil, votre contribution nous aide à construire une meilleure plateforme pour les joueurs de puzzles de mots du monde entier.",
  sections: [
   {
    heading: "Comment nous joindre",
    body: "Veuillez envoyer toutes les demandes, retours ou demandes d'assistance directement à notre adresse e-mail d'administration officielle :\n📩 support@wordizy.com",
   },
   {
    heading: "Veuillez inclure dans votre message",
    body: "Pour nous aider à traiter votre demande le plus rapidement possible, veuillez inclure toute information pertinente :\n• Pour les rapports de bug : Indiquez l'appareil ou le navigateur que vous utilisiez (par ex. iPhone/Safari ou Ordinateur/Chrome).\n• Pour les corrections de dictionnaire : Mentionnez le mot spécifique, le dictionnaire linguistique ou le mode de jeu que vous utilisiez.\n• Pour les partenariats : Veuillez indiquer clairement le nom de votre entreprise ou de votre plateforme dans l'objet du message.",
   },
   {
    heading: "Délais de réponse attendus",
    body: "Nous sommes une petite équipe de développement indépendante, mais nous lisons chaque retour que nous recevons. Vous pouvez généralement vous attendre à une réponse de notre part dans un délai de 24 à 48 heures, du lundi au vendredi.",
   },
  ],
  closing: "Merci de faire partie de la communauté wordIzy !",
 },
 privacy: {
  title: "Politique de confidentialité",
  intro: "Sur wordIzy, accessible depuis wordizy.com, l'une de nos principales priorités est la confidentialité de nos visiteurs. Ce document de Politique de confidentialité contient les types d'informations collectées et enregistrées par wordIzy et la manière dont nous les utilisons.\n\nSi vous avez des questions supplémentaires ou si vous souhaitez plus d'informations sur notre Politique de confidentialité, n'hésitez pas à nous contacter.",
  lastUpdated: "Dernière mise à jour : 28 octobre 2026",
  sections: [
   {
    heading: "Fichiers journaux",
    body: "wordIzy suit une procédure standard d'utilisation des fichiers journaux. Ces fichiers enregistrent les visiteurs lorsqu'ils visitent des sites web. Toutes les sociétés d'hébergement le font dans le cadre des analyses des services d'hébergement. Les informations collectées par les fichiers journaux comprennent les adresses de protocole Internet (IP), le type de navigateur, le fournisseur d'accès Internet (FAI), l'horodatage, les pages d'entrée et de sortie, et éventuellement le nombre de clics. Celles-ci ne sont liées à aucune information personnellement identifiable. L'objectif de ces informations est d'analyser les tendances, d'administrer le site, de suivre les déplacements des utilisateurs sur le site et de recueillir des informations démographiques.",
   },
   {
    heading: "Cookies et balises Web",
    body: "Comme tout autre site web, wordIzy utilise des « cookies ». Ces cookies sont utilisés pour stocker des informations, notamment les préférences des visiteurs et les pages du site que le visiteur a consultées ou visitées. Ces informations servent à optimiser l'expérience des utilisateurs en personnalisant le contenu de nos pages web en fonction du type de navigateur du visiteur et/ou d'autres informations.",
   },
   {
    heading: "Cookie Google DoubleClick DART",
    body: "Google est l'un des prestataires tiers sur notre site. Il utilise également des cookies, appelés cookies DART, pour diffuser des annonces auprès des visiteurs de notre site en fonction de leur visite sur wordizy.com et d'autres sites sur Internet. Toutefois, les visiteurs peuvent choisir de refuser l'utilisation des cookies DART en consultant la Politique de confidentialité du réseau de contenu et d'annonces de Google à l'URL suivant : google.com",
   },
   {
    heading: "Nos partenaires publicitaires",
    body: "Certains des annonceurs sur notre site peuvent utiliser des cookies et des balises Web. Nos partenaires publicitaires incluent : Google AdSense. Chacun de nos partenaires publicitaires possède sa propre Politique de confidentialité concernant ses pratiques en matière de données utilisateur. Pour faciliter l'accès, nous avons mis un lien hypertexte vers leurs Politiques de confidentialité ci-dessus. Les serveurs de publicités tiers ou les réseaux publicitaires utilisent des technologies telles que les cookies, JavaScript ou les balises Web dans leurs annonces respectives et les liens qui apparaissent sur wordIzy, qui sont envoyés directement aux navigateurs des utilisateurs. Ils reçoivent automatiquement votre adresse IP lorsque cela se produit. Ces technologies sont utilisées pour mesurer l'efficacité de leurs campagnes publicitaires et/ou pour personnaliser le contenu publicitaire que vous voyez sur les sites web que vous visitez.\n\nVeuillez noter que wordIzy n'a aucun accès ni contrôle sur ces cookies utilisés par les annonceurs tiers.",
   },
   {
    heading: "Politiques de confidentialité tierces",
    body: "La Politique de confidentialité de wordIzy ne s'applique pas aux autres annonceurs ou sites web. Ainsi, nous vous conseillons de consulter les Politiques de confidentialité respectives de ces serveurs publicitaires tiers pour des informations plus détaillées. Celles-ci peuvent inclure leurs pratiques et instructions sur la façon de vous désinscrire de certaines options.\n\nVous pouvez choisir de désactiver les cookies via les options individuelles de votre navigateur. Pour des informations plus détaillées sur la gestion des cookies avec des navigateurs web spécifiques, vous pouvez consulter les sites web respectifs des navigateurs.",
   },
   {
    heading: "Stockage local du navigateur",
    body: "Pour fournir nos fonctionnalités personnalisées sans nécessiter de comptes utilisateurs ni d'inscriptions, wordIzy utilise le stockage local de votre navigateur (localStorage) pour des fonctionnalités telles que la Save Vault et les préférences de jeu. Ces données sont stockées entièrement sur votre appareil local. Elles ne sont jamais transmises à nos serveurs, partagées avec des tiers ou utilisées à des fins de suivi sur des sites web externes. Vous pouvez effacer ces données à tout moment en vidant le cache de votre navigateur ou en utilisant les options fournies dans les interfaces des outils.",
   },
   {
    heading: "Informations relatives aux enfants",
    body: "Une autre partie de notre priorité est d'ajouter une protection pour les enfants lors de l'utilisation d'Internet. Nous encourageons les parents et les tuteurs à observer, participer et/ou surveiller et guider l'activité en ligne de leurs enfants.\n\nwordIzy ne collecte sciemment aucune information personnelle identifiable (Personal Identifiable Information) auprès d'enfants de moins de 13 ans. Si vous pensez que votre enfant a fourni ce type d'informations sur notre site web, nous vous encourageons vivement à nous contacter immédiatement et nous ferons de notre mieux pour supprimer rapidement ces informations de nos registres.",
   },
   {
    heading: "Politique de confidentialité en ligne uniquement",
    body: "Cette Politique de confidentialité ne s'applique qu'à nos activités en ligne et est valable pour les visiteurs de notre site web en ce qui concerne les informations qu'ils ont partagées et/ou collectées dans wordIzy. Cette politique ne s'applique à aucune information collectée hors ligne ou via d'autres canaux que ce site web.",
   },
   {
    heading: "Consentement",
    body: "En utilisant notre site web, vous consentez par la présente à notre Politique de confidentialité et acceptez ses Conditions générales.",
   },
  ],
  thirdPartyServices: [
    {
      name: "Google AdSense",
      description: "Diffuse des annonces auprès des visiteurs de notre site. Utilise des cookies (cookies DART) pour diffuser des annonces en fonction de vos visites sur wordizy.com et d'autres sites. Vous pouvez refuser les cookies DART en consultant la Politique de confidentialité du réseau de contenu et d'annonces de Google.",
      url: "https://policies.google.com/technologies/ads",
    },
  ],
 },
 terms: {
  title: "Conditions d'utilisation",
  intro: "Bienvenue sur wordIzy (accessible via wordizy.com). Les présentes Conditions d'utilisation (les « Conditions ») régissent votre accès et votre utilisation de notre site web, de nos outils d'aide aux jeux de mots, de nos dictionnaires et de nos jeux interactifs comme Anagram Blitz (collectivement, les « Services »).\n\nEn accédant ou en utilisant wordIzy, vous acceptez d'être lié par ces Conditions et par notre Politique de confidentialité. Si vous n'acceptez pas ces Conditions, veuillez ne pas utiliser nos Services.",
  lastUpdated: "Dernière mise à jour : 28 octobre 2026",
  sections: [
   {
    heading: "1. Description du Service",
    body: "wordIzy fournit des outils gratuits en ligne d'assistance aux énigmes de mots, des solveurs d'anagrammes, des recherches dans le dictionnaire et des mini-jeux basés sur les mots. Tous les Services sont fournis « tels quels » et « tels que disponibles » à des fins personnelles, non commerciales, de divertissement et éducatives uniquement.",
   },
   {
    heading: "2. Utilisation autorisée et restrictions",
    body: "Vous bénéficiez d'une licence limitée, non exclusive, non transférable et révocable pour accéder et utiliser wordIzy strictement conformément à ces Conditions.\nComme condition de votre utilisation, vous acceptez de ne pas :\n• Utiliser des systèmes automatisés, des aspirateurs, des spiders, des robots ou des scripts pour extraire des données, du texte ou des listes de mots de nos bases de données.\n• Interférer avec ou perturber la performance, l'intégrité ou la sécurité des serveurs du site web.\n• Encadrer ou mettre en miroir une partie du site sans notre autorisation écrite préalable.\n• Utiliser nos outils d'aide aux jeux de mots ou des systèmes automatisés pour tricher dans des environnements compétitifs en ligne où les outils d'assistance externes sont explicitement interdits par les conditions respectives de ces plateformes.",
   },
   {
    heading: "3. Droits de propriété intellectuelle",
    body: "Tout le contenu, les fonctionnalités, les caractéristiques, les logos, la conception du site, le texte et les logiciels de jeu personnalisés (y compris Anagram Blitz) sur wordIzy sont la propriété exclusive de wordIzy et sont protégés par les lois internationales sur le droit d'auteur, les marques et la propriété intellectuelle. Vous ne pouvez pas reproduire, distribuer, modifier ou créer des œuvres dérivées de notre propriété sans consentement écrit exprès.",
   },
   {
    heading: "4. Marques de tiers et clause de non-responsabilité",
    body: "Les références à des jeux tiers, y compris mais sans s'y limiter Scrabble, Wordle, Words With Friends, Wordfeud et Quordle, sont utilisées uniquement à des fins d'information et de description pour expliquer la compatibilité de nos outils. wordIzy est une plateforme indépendante et n'est pas affiliée, approuvée, autorisée ou sponsorisée par Hasbro, Mattel, The New York Times Company, ou l'une de leurs sociétés mères ou filiales respectives.",
   },
   {
    heading: "5. Données utilisateur et stockage local",
    body: "wordIzy ne nécessite pas d'inscription utilisateur ni de création de compte. Des fonctionnalités comme la Save Vault utilisent le stockage local de votre navigateur web (localStorage) pour enregistrer les états de configuration et l'historique des mots localement sur votre appareil. Nous n'assumons aucune responsabilité ni garantie en cas de perte de données due à l'effacement des caches du navigateur, à des changements de matériel ou à des mises à jour du navigateur.",
   },
   {
    heading: "6. Limitations de responsabilité",
    body: "En aucun cas wordIzy, ses développeurs ou ses affiliés ne pourront être tenus responsables de tout dommage direct, indirect, accessoire, spécial ou consécutif découlant de l'utilisation ou de l'impossibilité d'utiliser notre site web, même s'ils ont été informés de la possibilité de tels dommages. Nous ne garantissons pas que les listes de mots, les calculs de scores ou les configurations de l'aide au dictionnaire soient entièrement exempts d'erreurs ou mis à jour pour correspondre aux correctifs en temps réel des dictionnaires de jeu.",
   },
   {
    heading: "7. Modifications du Service et des Conditions",
    body: "Nous nous réservons le droit de modifier, suspendre ou interrompre tout aspect de nos Services à tout moment sans préavis. Nous nous réservons également le droit de modifier ces Conditions à notre discrétion. Votre utilisation continue de wordIzy suite à toute mise à jour publiée constitue votre acceptation des Conditions révisées.",
   },
   {
    heading: "8. Loi applicable",
    body: "Les présentes Conditions seront régies et interprétées conformément aux pratiques internationales du commerce numérique, sans égard aux principes de conflit de lois.",
   },
   {
    heading: "9. Coordonnées",
    body: "Si vous avez des questions ou des clarifications concernant ces Conditions d'utilisation, veuillez nous contacter via notre page de contact officielle.",
   },
  ],
 },
 sitemap: { title: "Plan du site", body: "Toutes les pages de WordIzy." },
 footer: { rights: "Tous droits réservés.", madeWith: "Conçu pour les amoureux des mots.", links: "Liens rapides", desc: "Anagrammeur et solveurs de puzzles gratuits en 9 langues. Sans inscription.", disclaimer: "Pour le divertissement et les jeux de mots. Non affilié au Scrabble ou au Wordle." },
 faq: {
  title: "Mode d'emploi & FAQ",
  unscrambler: [
   { q: "Qu'est-ce qu'un anagrammeur et comment l'utiliser ?", a: "Un anagrammeur prend un mélange de lettres — comme un chevalet Scrabble (ex. SRAABLC) — et trouve tous les mots valides du dictionnaire écrivables avec ces lettres. Saisissez vos lettres dans la case « Vos lettres », puis cliquez sur Anagrammer. Les résultats apparaissent groupés par longueur (les plus longs d'abord), chaque mot affichant sa valeur Scrabble. Idéal pour Scrabble, Words With Friends, Wordfeud, mots croisés et puzzles d'anagrammes." },
   { q: "Comment fonctionnent les jokers (? et *) ?", a: "Utilisez ? ou * comme joker chaque fois que vous avez une lettre inconnue — ils représentent une tuile vierge au Scrabble, une case vide de mots croisés, ou la lettre non confirmée d'une tentative Wordle. Saisir « QUER?Y » demande à WordIzy de trouver tous les mots correspondant à « QUER » + une lettre quelconque + « Y », ce qui renvoie QUERY directement. Chaque joker vaut 0 point (conformément aux règles officielles des tuiles vierges), ce qui maintient votre score affiché réaliste quand vous travaillez avec une tuile vierge sur votre chevalet. Vous pouvez chaîner plusieurs jokers à la fois — « A??LE » correspond à APPLE, ADDLE, AGILE, AISLE et ABLE — ce qui fait des jokers l'outil idéal pour explorer les anagrammes quand votre chevalet est incomplet. Pour garder les résultats utiles, limitez les jokers à un ou deux par requête : chaque joker supplémentaire multiplie le jeu de candidats, et au-delà de trois vous commencerez à voir des mots qui ne sont pas réellement jouables depuis vos tuiles réelles. Les jokers fonctionnent aussi dans le Solveur Wordle, le Solveur d'Anagrammes et l'Aide Wordfeud avec des sémantiques identiques, ce qui vous permet de garder le même flux de travail lettres partielles sur tous les outils du site." },
   { q: "Comment utiliser les Filtres avancés ?", a: "Cliquez sur « Filtres avancés » pour afficher trois champs facultatifs. « Commence par » limite les résultats aux mots commençant par les lettres indiquées (ex. « AB » → uniquement les mots commençant par AB). « Finit par » fait de même pour les suffixes (ex. « ED » → uniquement les mots finissant par ED). « Doit contenir » garantit que certaines lettres apparaissent dans chaque résultat, à n'importe quelle position. Combinez les trois avec des jokers pour un contrôle précis." },
   { q: "Comment les mots sont-ils scorés ?", a: "Chaque mot est scoré avec les valeurs officielles des lettres anglaises au Scrabble : A=1, B=3, C=3, D=2, E=1, F=4, G=2, H=4, I=1, J=8, K=5, L=1, M=3, N=1, O=1, P=3, Q=10, R=1, S=1, T=1, U=1, V=4, W=4, X=8, Y=4, Z=10. Les jokers (? *) agissent comme des tuiles vierges et valent 0 point, conformément aux règles officielles. WordIzy calcule automatiquement le total pour chaque résultat et les trie par score au sein de chaque groupe de longueur, de sorte que les coups les plus rentables apparaissent en tête de chaque liste — ce qui vous épargne l'effort mental d'additionner les valeurs des tuiles vous-même et vous permet de repérer le bingo candidat d'un coup d'œil. Pour les autres langues, WordIzy utilise les valeurs officielles des lettres Scrabble du dictionnaire de cette langue (ODS9 pour le français, FISE pour l'espagnol, Zingarelli pour l'italien, Portugais, Allemand, OpenTaal pour le néerlandais, plus des listes romanisées/pinyin pour le japonais et le mandarin). Changez de langue avec le sélecteur de la barre de navigation pour voir la cotation localisée. Les scores réels en partie dépendent aussi des cases bonus (lettre/mot double/triple) et du bonus bingo de +50 pour l'utilisation des 7 tuiles, donc considérez le score affiché comme une ligne de base et ajoutez mentalement les bonus quand vous planifiez votre coup." },
   { q: "Quels dictionnaires sont disponibles ?", a: "WordIzy prend en charge 9 langues : anglais (NWL2023 + CSW21), français (ODS9 2024), espagnol (FISE), italien (Zingarelli), portugais, allemand, néerlandais (OpenTaal), plus japonais (romaji) et mandarin (pinyin). Tous les mots sont filtrés selon le dictionnaire Scrabble officiel de chaque langue. Changez de langue via le sélecteur dans la barre de navigation." },
   { q: "Pourquoi les résultats sont-ils groupés par longueur ?", a: "Le regroupement par longueur facilite la recherche du type de coup dont vous avez besoin. Au Scrabble, les mots longs marquent généralement plus, mais parfois un mot plus court s'intègre mieux au plateau. Les mots les plus longs apparaissent en haut, jusqu'aux mots de 2 lettres. Au sein de chaque groupe, les mots sont triés par score Scrabble afin de repérer rapidement le meilleur coup." },
  ],
  scramble: [
   { q: "À quoi sert le Mélangeur / Démêleur ?", a: "Cet outil résout les puzzles d'anagrammes — où les lettres sont mélangées et vous devez retrouver le ou les mots d'origine. Saisissez les lettres mélangées (ex. RBOLENW) et cliquez sur Démêler pour voir tous les vrais mots formables. Parfait pour les anagrammes de journal, les jeux de lettres et les défis de mots mélangés." },
   { q: "Quelle est la différence avec l'Anagrammeur ?", a: "Le Démêleur utilise le même moteur que l'Anagrammeur, mais se concentre sur la résolution de puzzles de mots mélangés plutôt que sur la recherche de tous les mots possibles d'un chevalet. Vous pouvez aussi utiliser la fonction « Mélanger un mot » sous la saisie pour transformer un mot en variantes aléatoires — utile pour créer vos propres puzzles." },
   { q: "Puis-je utiliser des jokers ?", a: "Oui. Utilisez ? ou * pour représenter les lettres inconnues. Par exemple, si un puzzle a une lettre manquante, saisissez les lettres connues plus un ? et WordIzy remplira le blanc avec toutes les combinaisons valides." },
   { q: "Comment créer mon propre mot mélangé ?", a: "Utilisez la carte « Mélanger un mot » sous la saisie principale. Tapez n'importe quel mot (ex. « scrabble ») et cliquez sur Générer — WordIzy produit plusieurs mélanges aléatoires de ce mot. Utilisez-les pour créer des puzzles pour vos amis ou vous entraîner." },
  ],
  wordle: [
   { q: "Comment fonctionne le Solveur Wordle ?", a: "Le Solveur Wordle réduit les possibilités du Wordle du jour en utilisant les retours de votre partie. Saisissez les informations collectées : lettres vertes (bonne position), lettres jaunes (dans le mot mais mauvaise position) et lettres grises (absentes du mot). Le solveur renvoie tous les mots valides correspondant à vos contraintes." },
   { q: "Comment saisir les lettres placées (vertes) ?", a: "Dans le champ « Lettres placées (vert) », tapez les lettres dont vous savez qu'elles sont à la bonne position, en utilisant . ou _ pour les cases vides. Par exemple, si vous savez que le mot est A _ _ L E, saisissez « A..LE ». Le solveur ne renvoie que les mots correspondant exactement à ce motif." },
   { q: "Que sont les lettres valides (jaunes) et exclues (grises) ?", a: "Les lettres valides (jaunes) sont les lettres que vous savez DANS le mot, mais pas à la position devinée — saisissez-les toutes dans le champ « Lettres valides » (ex. « RST »). Les lettres exclues (grises) sont les lettres confirmées ABSENTES du mot — saisissez-les dans « Lettres exclues » (ex. « BXF »). Le solveur filtre tout mot contenant une lettre exclue." },
   { q: "Quelle longueur de mot utiliser ?", a: "Sélectionnez la longueur du Wordle du jour (par défaut 5). WordIzy prend en charge les mots de 4 à 8 lettres, donc il fonctionne aussi pour les variantes comme Quordle, Octordle et les parties à longueur personnalisée." },
   { q: "Des astuces pour choisir la prochaine tentative ?", a: "Choisissez dans les résultats un mot utilisant des lettres courantes non encore testées (R, T, S, L, N). Cela maximise le gain d'information. Si la liste est longue, choisissez un mot qui élimine le plus de possibilités. Le solveur affiche le score Scrabble de chaque mot — les scores élevés indiquent souvent des lettres rares qui aident à cerner la solution." },
  ],
  quordle: [
   { q: "Qu'est-ce que le Solveur Quordle ?", a: "Quordle est un jeu où vous résolvez quatre Wordle simultanément. Ce solveur vous permet de saisir les contraintes jusqu'à 4 plateaux à la fois et renvoie des mots candidats pour chacun. Chaque plateau conserve ses propres lettres placées (vertes), valides (jaunes) et exclues (grises)." },
   { q: "Comment utiliser plusieurs plateaux ?", a: "Remplissez ce que vous savez pour chaque plateau. Les contraintes du plateau 1 n'affectent que ses propres résultats. Cliquez sur « Ajouter un plateau » pour aller jusqu'à 4 plateaux. Utilisez le bouton X pour retirer un plateau. Quand vous êtes prêt, cliquez sur Résoudre pour obtenir les mots candidats de tous les plateaux." },
   { q: "Faut-il partager les lettres entre plateaux ?", a: "Oui — une stratégie clé de Quordle consiste à utiliser une tentative pour récolter de l'information sur plusieurs plateaux. Si une lettre est verte au plateau 1, elle est probablement à la même position sur les autres. Saisissez les contraintes partagées sur chaque plateau pour croiser les informations et réduire plus vite les quatre réponses." },
   { q: "Des astuces stratégiques pour Quordle ?", a: "Commencez par un mot riche en lettres courantes (comme CRANE ou SLATE) pour récolter de l'info sur tous les plateaux. Concentrez-vous d'abord sur le plateau le plus contraint — le résoudre libère de l'espace mental. Utilisez le solveur après 2-3 tentatives, quand vous avez assez d'infos pour ramener chaque plateau à une liste gérable." },
  ],
  anagram: [
   { q: "Qu'est-ce qu'une anagramme ?", a: "Une anagramme est un mot ou une expression formé en réarrangeant toutes les lettres d'un autre mot. Par exemple, LISTEN et SILENT sont des anagrammes — mêmes lettres, ordre différent. Le Solveur d'Anagrammes trouve tous les mots qui utilisent exactement toutes les lettres fournies." },
   { q: "Quelle est la différence avec l'Anagrammeur ?", a: "L'Anagrammeur trouve les mots de TOUTE longueur formables à partir de vos lettres (y compris plus courts). Le Solveur d'Anagrammes ne trouve que les mots utilisant TOUTES vos lettres — les anagrammes de pleine longueur. Par exemple, avec « CHIEN », le solveur d'anagrammes renvoie CHIEN, CHINE, NICHE (toutes 5 lettres), tandis que l'anagrammeur renverrait aussi des mots plus courts comme ICE, IN, HE." },
   { q: "Puis-je utiliser des jokers ?", a: "Oui. Utilisez ? ou * comme jokers pour remplir les cases restantes. Par exemple, saisir « CAT?? » trouve toutes les anagrammes de 5 lettres où CAT est combiné avec deux lettres quelconques. Les jokers valent 0 point (comme les tuiles vierges)." },
   { q: "À quoi servent les anagrammes ?", a: "Les anagrammes sont utilisées dans les jeux de lettres, puzzles, cryptographie et linguistique. Au Scrabble, trouver les anagrammes de son chevalet aide à repérer les bingos (jouer les 7 tuiles pour un bonus de 50 points). Elles sont aussi populaires dans les définitions de mots croisés, les trivia et les énigmes." },
  ],
  random: [
   { q: "Que fait le Générateur de Mots Aléatoires ?", a: "Il génère des mots réels aléatoires tirés du dictionnaire choisi, avec filtres facultatifs. Vous pouvez préciser la longueur, les lettres de début, de fin, ou les lettres que le mot doit contenir. Utilisez-le pour des jeux, l'écriture créative, le nommage, l'entraînement du vocabulaire ou générer des mots de passe avec de vrais mots." },
   { q: "Comment filtrer les mots aléatoires ?", a: "Réglez « Longueur » sur un nombre précis (2-12) ou laissez « Toutes ». « Commence par » limite aux mots commençant par les lettres indiquées. « Finit par » limite aux mots finissant par ces lettres. « Contient » exige que le mot contienne certaines lettres, n'importe où. « Combien » contrôle le nombre de mots générés (1-200)." },
   { q: "Les mots sont-ils valides au Scrabble ?", a: "Oui. Tous les mots générés proviennent du dictionnaire Scrabble officiel de la langue choisie (NWL2023/CSW21 pour l'anglais, ODS9 pour le français, etc.). Chaque mot est jouable au Scrabble et dans les autres jeux de lettres." },
   { q: "Puis-je l'utiliser pour des jeux de mots ?", a: "Absolument. Générez des mots aléatoires pour Pictionary, les charades, les jeux d'association de mots ou les quiz de vocabulaire. Pour les mots de passe, combinez 3-4 mots aléatoires de longueurs différentes — cela crée des phrases-mots de passe mémorables mais sûres." },
  ],
  wordfeud: [
   { q: "Qu'est-ce que l'Aide Wordfeud ?", a: "Wordfeud est un jeu de lettres mobile populaire similaire au Scrabble. Cette aide trouve les meilleurs mots jouables depuis votre chevalet. Saisissez vos 7 lettres (plus les lettres déjà posées sur le plateau) et WordIzy renvoie tous les mots jouables, triés par score Scrabble." },
   { q: "Comment saisir mon chevalet ?", a: "Tapez vos 7 lettres de tuiles dans la case « Vos lettres ». Utilisez ? ou * pour les tuiles vierges (elles représentent n'importe quelle lettre mais valent 0 point). S'il y a déjà des lettres sur le plateau dont vous voulez vous servir, ajoutez-les aussi — WordIzy trouvera les mots formables à partir du pool combiné." },
   { q: "Quel dictionnaire utiliser ?", a: "Wordfeud prend en charge plusieurs dictionnaires selon votre région. Le Wordfeud anglais utilise une liste proche du Scrabble, donc l'anglais (NWL2023/CSW21) convient. Pour les autres langues, sélectionnez la correspondante (français ODS9, espagnol FISE, etc.) via le sélecteur de langue." },
   { q: "Comment les scores sont-ils calculés ?", a: "Les scores utilisent les valeurs officielles Scrabble pour la langue choisie. À noter : le score réel de Wordfeud peut différer légèrement (cases bonus et distribution de tuiles propres). Utilisez les scores comme guide pour repérer les coups à forte valeur — le mot rapportant le plus de points depuis votre chevalet est généralement votre meilleur coup." },
  ],
  dictionary: [
   { q: "Que fait Vérifier le Dictionnaire ?", a: "Saisissez n'importe quel mot pour vérifier s'il est valide dans le dictionnaire Scrabble officiel de la langue choisie. L'outil affiche le mot en tuiles Scrabble, un badge valide/invalide, le score Scrabble, la longueur du mot, les tuiles de lettres, une définition et (si disponibles) des synonymes." },
   { q: "D'où viennent les définitions ?", a: "Les définitions proviennent de plusieurs sources : l'API Free Dictionary (anglais, français, espagnol, allemand, italien, portugais), Wiktionary (toutes langues, en repli) et un assistant IA pour les éventuels manquants. La source est indiquée à côté de chaque définition." },
   { q: "D'où viennent les synonymes ?", a: "Les synonymes proviennent de Datamuse (anglais, espagnol, français, italien, portugais) et d'OpenThesaurus (allemand). Seuls les synonymes qui sont eux-mêmes des mots valides au Scrabble sont affichés — cliquez sur n'importe quel synonyme pour le vérifier instantanément." },
   { q: "Pourquoi un mot courant pourrait-il être invalide ?", a: "Les dictionnaires Scrabble sont stricts — ils excluent les noms propres, abréviations, mots à trait d'union et mots avec apostrophe. Par exemple, « BRUNCH » est valide mais « BRUNCH'S » ne l'est peut-être pas. Si un mot semble manquant, c'est peut-être un nom propre capitalisé ou un ajout récent pas encore dans la liste officielle. Changez de langue pour vérifier le mot dans un autre dictionnaire." },
  ],
  scrabble: [
   { q: "Qu'est-ce que le Scrabble Duplicate ?", a: "Le Scrabble duplicate est une variante où chaque joueur reçoit le même chevalet et doit trouver le meilleur coup possible. Il est utilisé en tournoi et à l'entraînement pour tester la compétence sans chance. Cet outil vous aide à trouver les mots les plus forts depuis votre chevalet — saisissez vos 7 lettres et, si besoin, les lettres du plateau, puis cliquez sur « Trouver les meilleurs mots »." },
   { q: "Comment saisir les lettres du plateau ?", a: "S'il y a déjà des lettres sur le plateau sur lesquelles vous pouvez construire, tapez-les dans le champ « Lettres du plateau (optionnel) » avec vos lettres de chevalet. WordIzy traite le pool combiné comme lettres disponibles. Cela permet de trouver des mots qui s'accrochent aux coups existants — essentiel pour maximiser le score en partie réelle." },
   { q: "Comment les meilleurs coups sont-ils classés ?", a: "Les mots sont triés par score Scrabble (le plus élevé d'abord). Les 10 meilleurs coups apparaissent en haut dans une liste mise en valeur. À noter : le score réel dépend aussi des cases bonus (lettre/mot double/triple) et des bingos (bonus de 50 points pour les 7 tuiles). Utilisez les scores de l'outil comme base, puis intégrez le positionnement sur le plateau." },
   { q: "Qu'est-ce qu'un bingo et comment en trouver un ?", a: "Un bingo est le retournement de situation le plus important au Scrabble : jouer les 7 tuiles en un seul coup rapporte un bonus de +50 en plus du score de base du mot, si bien qu'un mot à 30 points devient un coup à 80 points. Pour trouver des bingos avec WordIzy, saisissez votre chevalet complet de 7 lettres (utilisez ? ou * pour les tuiles vierges) et regardez le groupe de résultats à 7 lettres en haut de la liste — chaque mot qui y figure est un bingo potentiel. Les bingos à 7 lettres les plus rentables en Scrabble anglais sont MUZJIKS (29 de base + 50 = 79 points), JACUZZI (34 + 50 = 84), SYZYGY (21 + 50 = 71), OXAZOLIDINE (rare mais dévastateur) et les racines ANATOMIZ-, ANTISOCIAL-, OVERLAPPING- qui acceptent des suffixes courants. Pour repérer les bingos plus vite, apprenez les racines à forte valeur — SATISFI-, ANTISOY-, OVERLAP- — qui se combinent avec -ER, -ED, -ING, -ATION. Gardez une ou deux lettres flexibles (E, R, S, T) en réserve quand votre chevalet est en forme de bingo, car le bonus de bingo (+50) l'emporte presque toujours sur les points que vous auriez gagnés en déchargeant ces tuiles tôt." },
  ],
  wordlists: [
   { q: "Qu'est-ce que la page Listes de Mots ?", a: "Listes de Mots permet de parcourir tous les mots valides au Scrabble de 2 à 7 lettres. Les mots sont groupés par longueur, puis par lettre finale (A-Z), pour explorer le dictionnaire de façon systématique. Utilisez-la pour étudier, trouver des mots pour vos parties ou enrichir votre vocabulaire." },
   { q: "Comment filtrer par longueur ?", a: "Utilisez le sélecteur de longueur (2-7) en haut. Cliquez sur « Tous » pour voir toutes les longueurs empilées (mots de 2 lettres en haut, 7 lettres en bas), ou sur un nombre précis pour ne voir que cette longueur. Chaque section de longueur affiche 26 conteneurs (un par lettre finale A-Z)." },
   { q: "Comment filtrer par lettre ?", a: "Utilisez la rangée A-Z sous le sélecteur de longueur. Cliquez sur une lettre pour ne voir que les mots finissant par cette lettre, ou « Tous » pour toutes les lettres. Utile pour trouver des mots qui s'accrochent à une lettre déjà présente sur le plateau." },
   { q: "Pourquoi les mots sont-ils en majuscules ?", a: "Les tuiles Scrabble sont en majuscules, donc les mots sont affichés en majuscules pour correspondre. Chaque mot affiche sa valeur Scrabble à côté. Au sein de chaque conteneur de lettre, les mots sont triés par ordre alphabétique (A-Z) pour faciliter le balayage." },
  ],
  wordstarts: [
   { q: "Qu'est-ce que la page Commence Par ?", a: "Cette page permet de parcourir tous les mots valides au Scrabble qui COMMENCENT par une lettre précise. Sélectionnez une lettre (A-Z) et WordIzy affiche tous les mots commençant par cette lettre, groupés par longueur (2-7 lettres). Parfait pour étudier les ouvertures et trouver des mots à construire depuis une lettre de départ sur le plateau." },
   { q: "Comment utiliser les sélecteurs de longueur et de lettre ?", a: "D'abord, choisissez une lettre dans la rangée A-Z — cela définit la lettre de départ. Puis utilisez la rangée de longueur (2-7 ou Tous) pour filtrer par longueur. Chaque section de longueur affiche tous les mots commençant par la lettre choisie, triés alphabétiquement. Cliquez sur « Tous » dans l'une ou l'autre rangée pour retirer ce filtre." },
   { q: "En quoi cela sert-il au Scrabble ?", a: "Connaître les mots commençant par chaque lettre aide à planifier ouvertures et accroches. Si vous avez un Q, connaître tous les mots en Q (QI, QAT, QUAD...) aide à le jouer efficacement. La page est aussi précieuse pour les mots croisés, où les définitions précisent souvent « commence par... »." },
   { q: "Pourquoi paginer à 50 mots ?", a: "Certaines lettres (S, A, E) ont des milliers de mots commençant par elles. Pour garder les pages rapides et lisibles, les résultats paginent à 50 mots par page avec des boutons précédent/suivant. Chaque page indique son numéro et le total pour vous repérer." },
  ],
  wordends: [
   { q: "Qu'est-ce que la page Finit Par ?", a: "Cette page permet de parcourir tous les mots valides au Scrabble qui FINISSENT par une lettre précise. Sélectionnez une lettre (A-Z) et WordIzy affiche tous les mots finissant par cette lettre, groupés par longueur (2-7 lettres). Idéal pour trouver des mots à accrocher à une lettre déjà présente sur le plateau." },
   { q: "Comment utiliser les sélecteurs de longueur et de lettre ?", a: "D'abord, choisissez une lettre dans la rangée A-Z — cela définit la lettre finale. Puis utilisez la rangée de longueur (2-7 ou Tous) pour filtrer par longueur. Chaque section de longueur affiche tous les mots finissant par la lettre choisie, triés alphabétiquement. Cliquez sur « Tous » dans l'une ou l'autre rangée pour retirer ce filtre." },
   { q: "En quoi cela sert-il au Scrabble ?", a: "Les lettres finales comptent pour les accroches — s'il y a un S sur le plateau, connaître tous les mots finissant par S permet de pluraliser ou prolonger un coup. De même, connaître les mots finissant par D, ED, ING aide à s'appuyer sur les suffixes courants. Cette page est un puissant outil d'étude pour la compétition." },
   { q: "Pourquoi paginer à 50 mots ?", a: "Certaines lettres (E, S, D) ont des milliers de mots finissant par elles. Pour garder les pages rapides et lisibles, les résultats paginent à 50 mots par page avec des boutons précédent/suivant. Chaque page indique son numéro et le total pour vous repérer." },
  ],
  vault: [
   { q: "Qu'est-ce que le Coffre-fort ?", a: "Le Coffre-fort est un outil d'entraînement lexical intégré pour les joueurs compétitifs de Scrabble et de Wordle — une liste personnelle de mots favoris conçue spécifiquement pour l'étude par répétition espacée des combinaisons de lettres difficiles. Contrairement aux marque-pages génériques du navigateur, le coffre-fort garde visible le score Scrabble de chaque mot enregistré et vous permet de copier la liste entière directement dans une application de cartes mémoire ou un paquet Anki pour un entraînement hors ligne. Voici le flux de travail en 4 étapes qu'utilisent les joueurs compétitifs : (1) Lancez une recherche comme « mots de 7 lettres à partir de QUARTZE » ou « mots commençant par Q » et étoilez les mots à forte valeur que vous oubliez — QAT, QOPH, FAQIR, MUZJIKS. (2) Ouvrez le panneau du coffre-fort depuis l'icône étoile en haut à droite ; vos mots enregistrés restent organisés dans une seule liste avec leur score en direct à côté de chaque entrée. (3) Cliquez sur « Tout copier » pour coller la liste dans Anki, Quizlet, ou un modèle de cartes imprimables pour une révision par répétition espacée loin de l'écran. (4) Relancez la même recherche la semaine prochaine et comparez les mots que vous avez mémorisés — votre liste enregistrée persiste localement dans le localStorage de votre navigateur, donc elle ne quitte jamais votre appareil, ne nécessite aucun compte et fonctionne hors ligne une fois la page chargée." },
   { q: "Comment enregistrer un mot dans le coffre-fort ?", a: "Cliquez sur l'icône étoile (☆) à côté d'un mot dans les résultats. L'étoile devient ambre (★) lorsqu'un mot est enregistré. Cliquez à nouveau pour retirer le mot de votre coffre-fort." },
   { q: "Comment voir mes mots enregistrés ?", a: "Cliquez sur l'icône étoile dans l'en-tête du site (coin haut droit). Un panneau s'ouvre depuis la droite affichant tous vos mots enregistrés. Vous pouvez copier des mots individuels, copier toute la liste, ou vider le coffre-fort." },
   { q: "Mon coffre-fort est-il synchronisé entre appareils ?", a: "Non — le coffre-fort est stocké dans le localStorage de votre navigateur, donc il est propre à chaque appareil. Si vous effacez les données de votre navigateur ou utilisez un autre appareil, votre coffre-fort ne sera pas transféré. Aucun compte n'est nécessaire et aucune donnée ne quitte votre appareil." },
  ],
 },
 blitz: {
  loadingEngine: "Chargement du moteur de puzzle...",
  completed: "Terminé",
  todaysPuzzleSolved: "📅 Puzzle du jour résolu !",
  alreadyPlayed: "Vous avez déjà utilisé votre tentative quotidienne ! Revenez demain à minuit pour un nouveau défi.",
  playInfinite: "Jouer en mode pratique infini",
  challengeTitle: "⚡ Défi Anagram Blitz",
  challengeDesc: "Remodez des mots en moins de 60 secondes depuis nos dictionnaires Scrabble.",
  startToday: "Commencer le puzzle du jour",
  playInfiniteBtn: "Pratique infinie",
  timesUp: "⏱️ Temps écoulé ! Partie terminée",
  finalScore: "Score final :",
  points: "points.",
  playAgain: "🔄 Rejouer",
  dailyLocked: "Votre tentative quotidienne est verrouillée. À demain !",
  returnMenu: "Retour au menu",
  timeLeft: "s",
  totalScore: "pts",
  generating: "🎲 Génération du mot...",
  hint: "💡 Indice :",
  waiting: "Attente...",
  typeWord: "Tapez le mot...",
  skipReveal: "🏳️ Passer & Révéler",
  stopGame: "🛑 Arrêter",
  play: "▶ Jouer",
  correct: "✨ Parfait ! Bonne réponse !",
  wrong: "❌ Mauvaise réponse ! Essayez encore.",
  answerWas: "La réponse était :",
  challengeFriend: "Défier un ami",
  challengeText: "J'ai marqué {score} à Anagram Blitz sur WordIzy — peux-tu faire mieux ? Joue gratuitement : https://wordizy.com/blitz",
  // Section contenu SEO (sous la carte du jeu)
  pageHeading: "Jouez à Anagram Blitz — Jeu de mots gratuit de 60 secondes",
  howToPlayTitle: "Comment jouer à Anagram Blitz",
  howToPlayDesc: "Anagram Blitz est un jeu d'anagrammes rapide de 60 secondes. Vous recevez un ensemble de lettres mélangées et devez les réarranger pour former un mot valide du dictionnaire. Chaque bonne réponse rapporte 20 points ; chaque skip coûte 5 points. Battez votre meilleur score et grimpez dans le classement quotidien.",
  gameModesTitle: "Modes de jeu",
  dailyModeName: "Défi quotidien",
  dailyModeDesc: "Une énigme par jour. Jouez une fois et enregistrez votre score pour le classement.",
  infiniteModeName: "Pratique infinie",
  infiniteModeDesc: "Énigmes illimitées. Chaque bonne réponse ajoute 10 secondes bonus au chronomètre.",
  tipsTitle: "Conseils et stratégie",
  tip1: "Cherchez les terminaisons typiques du français : -ENT (verbes), -TION (noms d'action), -ER (infinitifs), -É (participes passés).",
  tip2: "En français, E et A sont les lettres les plus fréquentes — testez d'abord les mots contenant ces deux voyelles.",
  tip3: "Le R français apparaît dans 33 % des mots de 5 lettres — placez-le en début ou en fin pour maximiser les chances de tuile verte.",
  tip4: "Si votre premier mot révèle un S final vert, la réponse est probablement un pluriel — concentrez-vous sur les substantifs pluriels.",
  blitzFooter: "Anagram Blitz utilise les dictionnaires officiels du Scrabble (ODS9 pour le français, NWL2023 + CSW21 pour l'anglais) avec un support multilingue pour 9 langues. Jouez gratuitement, sans inscription.",
 },
 ui: {
  advertisement: "Publicité",
  featuredGuide: "Guide en vedette",
  saveVaultFaqTitle: "Coffre-fort — Comment l'utiliser",
  relatedTools: "Outils associés",
  published: "Publié :",
  backToHome: "Retour à l'accueil",
  somethingWrong: "Une erreur est survenue",
  tryAgain: "Réessayer",
  reloadPage: "Recharger la page",
  returnLabel: "Retour",
  allCopied: "Tous les mots ont été copiés !",
  showLess: "Réduire",
  showMore: "Afficher plus",
  enterPassword: "Entrez le mot de passe",
  totalSearches: "Recherches totales",
  topQuery: "Requête principale",
  topTool: "Outil principal",
  topLanguage: "Langue principale",
  newDailyChallenge: "Nouveau défi quotidien",
  scrambleFeatureHint: "Utilisez la fonction Mélanger un mot ci-dessous pour créer vos propres puzzles.",
  wordList: "Liste de mots",
  copiedToClipboard: "Copié dans le presse-papiens !",
 },
 hubPages: {
  startsSubtitle: "Parcourez tous les mots Scrabble valides commençant par chaque lettre de l'alphabet, de 2 à 15 lettres.",
  endsSubtitle: "Parcourez tous les mots Scrabble valides se terminant par chaque lettre de l'alphabet, de 2 à 15 lettres.",
  lengthSubtitle: "Parcourez tous les mots Scrabble valides par longueur, de 2 à 15 lettres. Chaque longueur possède sa propre page dédiée.",
  wordleStartsSubtitle: "Parcourez tous les mots Wordle valides commençant par chaque lettre de l'alphabet. Idéal pour trouver les meilleurs mots de départ et affiner votre puzzle quotidien.",
  wordleEndsSubtitle: "Parcourez tous les mots Wordle valides se terminant par chaque lettre de l'alphabet. Idéal pour trouver les crochets, suffixes et affiner votre puzzle quotidien.",
  startsHeading: "Mots commençant par — A à Z",
  endsHeading: "Mots se terminant par — A à Z",
  lengthHeading: "Mots par longueur (2–15 lettres)",
  wordleStartsHeading: "Mots Wordle commençant par — A à Z",
  wordleEndsHeading: "Mots Wordle se terminant par — A à Z",
  clickLetterStarts: "Cliquez sur une lettre pour parcourir tous les mots commençant par cette lettre sur une page dédiée.",
  clickLetterEnds: "Cliquez sur une lettre pour parcourir tous les mots se terminant par cette lettre sur une page dédiée.",
  clickLength: "Cliquez sur un nombre pour parcourir tous les mots de cette longueur sur une page dédiée.",
  clickLetterWordleStarts: "Cliquez sur une lettre pour parcourir tous les mots Wordle commençant par cette lettre sur une page dédiée.",
  clickLetterWordleEnds: "Cliquez sur une lettre pour parcourir tous les mots Wordle se terminant par cette lettre sur une page dédiée.",
  wordleStartsBadge: "Wordle commence par",
  wordleEndsBadge: "Wordle se termine par",
  wordleStartsTitle: "Mots Wordle commençant par A-Z",
  wordleEndsTitle: "Mots Wordle se terminant par A-Z",
  returnHome: "Retour à l'accueil",
  footerNote: "Tous les mots sont filtrés selon les dictionnaires officiels du Scrabble.",
  searchPlaceholderStarts: "Tapez une lettre A-Z pour parcourir les mots qui commencent par elle…",
  searchPlaceholderEnds: "Tapez une lettre A-Z pour parcourir les mots qui se terminent par elle…",
  searchPlaceholderLength: "Tapez un nombre 2-15 pour parcourir par longueur…",
  searchPlaceholderWordleStarts: "Tapez une lettre A-Z pour parcourir les mots Wordle commençant par elle…",
  searchPlaceholderWordleEnds: "Tapez une lettre A-Z pour parcourir les mots Wordle se terminant par elle…",
  browseBtn: "Parcourir",
 },
 wordListPage: {
  loading: "Chargement des listes de mots vérifiées…",
  filterPlaceholder: "Filtrer les mots…",
  filterLabel: "Filtrer les mots",
  clearFilter: "Effacer le filtre",
  loadMore: "Charger plus",
  remaining: "restants",
  allLengths: "Tous",
  filterByLength: "Filtrer par longueur de mot",
  noMatch: "Aucun mot ne correspond à votre filtre.",
  noWords: "Aucun mot trouvé.",
  wordsCount: "mots",
  error: "Échec du chargement des mots. Veuillez rafraîchir la page.",
 },
};

const es: Translation = {
 nav: {
  unscrambler: "Desordenador", scramble: "Mezcla", wordle: "Wordle",
  quordle: "Quordle", anagram: "Anagramas", random: "Palabra Aleatoria",
  wordfeud: "Wordfeud", dictionary: "Diccionario", scrabble: "Duplicate",
  wordlists: "Listas de Palabras", wordstarts: "Palabras Empiezan Por", wordends: "Palabras Terminan En", wordlestarts: "Wordle Empieza A-Z", wordleends: "Wordle Termina A-Z", about: "Acerca de", contact: "Contacto", privacy: "Privacidad", terms: "Términos de servicio",
  sitemap: "Mapa del sitio", tools: "Herramientas", more: "Más", solvers: "Solucionadores", site: "Sitio", wordlab: "Lab de Palabras", inbox: "Bandeja de entrada",
  dashboard: "Panel", blitz: "⚡ Anagram Blitz", blitzShort: "Blitz"
 },
 brand: { name: "wordIzy", tagline: "Desordena. Resuelve. Gana." },
 common: {
  yourLetters: "Tus letras", unscramble: "Desordenar", clear: "Borrar", advancedFilters: "Filtros avanzados",
  startsWith: "Empieza por", endsWith: "Termina en", mustInclude: "Debe incluir", dictionaryLabel: "Diccionario",
  results: "Resultados", noResults: "No se encontraron palabras. Prueba otras letras o añade comodines (? o *).",
  wordsFound: "palabras encontradas", points: "pts", length: "letras", loading: "Cargando…", search: "Buscar",
  copy: "Copiar", copied: "¡Copiado!", tryExamples: "Probar:", tipsTitle: "Consejos y funcionamiento",
  tileValues: "Valores de fichas Scrabble", blanks: "Comodines", languageLabel: "Idioma",
  showMore: "Mostrar más", showLess: "Mostrar menos", allWords: "Todas las palabras", perGroup: "por grupo",
  wordsCount: "palabras", reset: "Reiniciar", apply: "Aplicar", solve: "Resolver", generate: "Generar",
  check: "Comprobar", example: "Ejemplo", none: "Ninguno", optional: "opcional",
 },
 home: {
  title: "Desordenador de Palabras", subtitle: "Introduce tus letras mezcladas, añade comodines con ? o *, y encuentra cada palabra jugable — agrupada por longitud y ordenada por puntuación Scrabble.",
  heroBadge: "Gratis • Sin registro • 9 idiomas",
  faqTitle: "Preguntas frecuentes",
  q1: "¿Para qué sirve un desordenador de palabras?",
  a1: "Un desordenador toma un grupo de letras (como un atril de Scrabble) y encuentra todas las palabras válidas del diccionario que pueden formarse con esas letras. Ideal para Scrabble, Wordfeud, crucigramas y puzzles de anagramas.",
  q2: "¿Cómo uso las opciones avanzadas?",
  a2: "Tras escribir tus letras, abre Filtros avanzados. «Empieza por» limita a palabras que comienzan con esas letras, «Termina en» hace lo mismo con sufijos, y «Debe incluir» garantiza que ciertas letras aparezcan en cada resultado. Combínalo con comodines (? o *) para letras desconocidas.",
  q3: "¿Cómo funciona?",
  a3: "WordIzy compara tu pool de letras con un diccionario completo en memoria para el idioma elegido. Comprueba qué palabras pueden formarse (? y * como comodines), aplica tus filtros, puntúa cada palabra con los valores oficiales Scrabble y agrupa los resultados por longitud — las más largas primero.",
  q4: "¿Qué idiomas están soportados?",
  a4: "Inglés, francés, español, italiano, portugués, alemán, neerlandés, además de japonés (romaji) y mandarín (pinyin). Cambia el dicionario desde el selector de idioma.",
 },
 scramble: { title: "Mezclador / Sol. de palabras", subtitle: "¿Atascado en un puzzle? Introduce las letras mezcladas y las resolveremos en palabras reales.", inputLabel: "Letras mezcladas", btn: "Resolver", solutionLabel: "Soluciones posibles", hint: "Usa ? o * para letras desconocidas." },
 wordle: { title: "Sol. Wordle", subtitle: "Acota el Wordle de hoy. Introduce letras verdes en su posición, letras amarillas conocidas y letras grises a excluir.", length: "Longitud", placed: "Letras colocadas (verde)", valid: "Letras válidas (amarillo)", excluded: "Letras excluidas (gris)", btn: "Resolver", hint: "Usa . o _ para huecos, ej. A..LE" },
 quordle: { title: "Sol. Quordle", subtitle: "Resuelve hasta cuatro Wordle a la vez. Cada tablero guarda sus restricciones; las letras válidas/excluidas se comparten.", board: "Tablero", addBoard: "Añadir tablero", hint: "Rellena lo que sepas de cada tablero y resuelve." },
 anagram: { title: "Sol. de Anagramas", subtitle: "Encuentra todos los anagramas de tus letras — palabras que usan exactamente todas las letras.", btn: "Buscar anagramas", hint: "Los comodines (? *) rellenan letras." },
 random: { title: "Generador de Palabras Aleatorias", subtitle: "Genera palabras reales al azar con filtros de longitud, prefijo, sufijo y contenido.", length: "Longitud", any: "Cualquiera", count: "Cuántas", btn: "Generar" },
 wordfeud: { title: "Ayuda Wordfeud", subtitle: "Encuentra las mejores palabras de Wordfeud desde tu atril. Elige tu diccionario y resuelve.", btn: "Buscar palabras", hint: "Añade ? o * para fichas en blanco." },
 dictionary: { title: "Ver Diccionario", subtitle: "Comprueba si una palabra existe en el diccionario, mira su puntuación Scrabble y lee una definición.", btn: "Comprobar", exists: "es una palabra válida", notExists: "no se encontró en el diccionario", definition: "Definición", score: "Puntuación Scrabble", tiles: "Fichas" },
 scrabble: { title: "Scrabble Duplicate", subtitle: "El Scrabble duplicate da el mismo atril a todos. Introduce tus 7 letras (y las del tablero) y encuentra las mejores jugadas.", rack: "Tu atril", board: "Letras del tablero (opcional)", btn: "Buscar mejores palabras", hint: "Comodines permitidos. Resultados por puntuación." },
 wordlists: { title: "Listas de Palabras", subtitle: "Explora todas las palabras de 2 a 7 letras. Elige vista, longitud y letra para navegar A–Z.", allWords: "Todas las palabras", startsBy: "Empieza por A–Z", endsBy: "Termina en A–Z", letter: "Letra", selectLength: "Longitud", selectLetter: "Letra", browse: "Explorar" },
 about: {
  title: "Acerca de wordIzy",
  intro: "Bienvenido a wordIzy, su destino principal para utilidades de juegos de palabras de alto rendimiento, solucionadores de anagramas y recursos educativos de acertijos. Creado por un equipo dedicado de desarrolladores independientes y entusiastas de los acertijos de palabras de toda la vida, wordIzy fue diseñado desde cero para ser el conjunto de herramientas de diccionario más rápido, limpio y libre de distracciones de la web.",
  sections: [
   {
    heading: "Nuestra misión",
    body: "Nuestra misión es ayudar a los jugadores a elevar su vocabulario, entrenar su mente y resolver disputas amistosas de acertijos con absoluta precisión. Creemos que los solucionadores de palabras no deberían estar llenos de diseños intrusivos, tiempos de carga lentos o configuraciones complicadas. Por eso wordIzy ofrece cálculos instantáneos, diccionarios de Scrabble localizados en varios idiomas y motores de filtrado personalizado intuitivos, diseñados para un uso diario sin fisuras.",
   },
   {
    heading: "¿Por qué elegir wordIzy?",
    body: "A diferencia de las tablas de búsqueda genéricas y básicas, nuestras herramientas están hechas a medida para coincidir con las mecánicas exactas de los juegos de palabras más populares del mundo:\n• Bases de datos de diccionarios completas: Ofrecemos 9 idiomas, filtrando sus letras directamente con los léxicos de competición oficiales como FISE (Federación Internacional de Scrabble en Español), NWL2023 y CSW21.\n• Lógica de juego realista: Nuestro sistema avanzado de filtrado de comodines reconoce reglas como las distribuciones de fichas en blanco de Scrabble, asignando verdaderos valores de cero puntos para que pueda planificar jugadas precisas de nivel torneo.\n• Herramientas educativas innovadoras: Funciones únicas como nuestra Save Vault guardada localmente funcionan como un gestor personal de tarjetas de estudio complementario, ofreciendo a los jugadores un entorno activo para estudiar patrones de palabras, ganchos y extensiones sin conexión.\n• Juego atractivo: Más allá de las herramientas, creamos experiencias personalizadas como Anagram Blitz para ofrecer a los amantes de los juegos de palabras un entorno rápido donde poner a prueba su velocidad y desafiar sus máximas puntuaciones personales.",
   },
   {
    heading: "Nuestro compromiso con la privacidad",
    body: "Valoramos su seguridad digital y el rendimiento de su sistema. Opciones avanzadas como el historial de sus palabras marcadas se ejecutan directamente usando el almacenamiento local de su navegador. Esto significa que sus listas de estudio personales nunca abandonan su dispositivo, no se requiere ningún registro de cuenta de usuario y sus datos permanecen completamente privados.",
   },
   {
    heading: "Póngase en contacto",
    body: "Trabajamos constantemente para mejorar nuestros algoritmos de búsqueda, ampliar nuestras bases de datos y diseñar nuevos modos de juego. Si tiene alguna petición de función, corrección de diccionario o comentario general, póngase en contacto con nosotros a través de nuestra página de Contacto. ¡Gracias por hacer de wordIzy parte de su rutina diaria de juego!",
   },
  ],
 },
 contact: {
  title: "Contáctanos",
  intro: "¿Tienes una pregunta, comentario o sugerencia de función para wordIzy? ¡Nos encantaría saber de ti!\n\nYa sea que hayas encontrado una palabra que falta en nuestros diccionarios de Scrabble, hayas encontrado un error mientras jugabas Anagram Blitz, o simplemente quieras sugerir una nueva variación de herramienta, tu aporte nos ayuda a construir una mejor plataforma para los jugadores de puzzles de palabras en todo el mundo.",
  sections: [
   {
    heading: "Cómo contactarnos",
    body: "Por favor, envía todas las consultas, comentarios o solicitudes de soporte directamente a nuestro correo electrónico oficial de administración:\n📩 support@wordizy.com",
   },
   {
    heading: "Por favor incluye en tu mensaje",
    body: "Para ayudarnos a manejar tu solicitud lo más rápido posible, por favor incluye cualquier detalle relevante:\n• Para reportes de errores: Indícanos qué dispositivo o navegador estabas usando (p. ej. iPhone/Safari o Escritorio/Chrome).\n• Para correcciones de diccionario: Menciona la palabra específica, el diccionario de idioma o el modo de juego que estabas usando.\n• Para colaboraciones: Por favor, indica claramente el nombre de tu empresa o plataforma en el asunto del mensaje.",
   },
   {
    heading: "Tiempos de respuesta esperados",
    body: "Somos un pequeño equipo de desarrollo independiente, pero leemos cada comentario que recibimos. Por lo general, puedes esperar una respuesta nuestra dentro de las 24 a 48 horas, de lunes a viernes.",
   },
  ],
  closing: "¡Gracias por ser parte de la comunidad wordIzy!",
 },
 privacy: {
  title: "Política de privacidad",
  intro: "En wordIzy, accesible desde wordizy.com, una de nuestras principales prioridades es la privacidad de nuestros visitantes. Este documento de Política de privacidad contiene los tipos de información que recopila y registra wordIzy y cómo la utilizamos.\n\nSi tiene preguntas adicionales o requiere más información sobre nuestra Política de privacidad, no dude en contactarnos.",
  lastUpdated: "Última actualización: 28 de octubre de 2026",
  sections: [
   {
    heading: "Archivos de registro",
    body: "wordIzy sigue un procedimiento estándar de uso de archivos de registro. Estos archivos registran a los visitantes cuando visitan sitios web. Todas las empresas de alojamiento lo hacen como parte de las analíticas de los servicios de alojamiento. La información recopilada por los archivos de registro incluye direcciones de protocolo de Internet (IP), tipo de navegador, proveedor de servicios de Internet (ISP), marca de fecha y hora, páginas de entrada/salida y posiblemente el número de clics. Estos no se vinculan a ninguna información personalmente identificable. El propósito de la información es analizar tendencias, administrar el sitio, rastrear el movimiento de los usuarios en el sitio web y recopilar información demográfica.",
   },
   {
    heading: "Cookies y balizas web",
    body: "Como cualquier otro sitio web, wordIzy utiliza \"cookies\". Estas cookies se utilizan para almacenar información, incluidas las preferencias de los visitantes y las páginas del sitio web que el visitante accedió o visitó. La información se utiliza para optimizar la experiencia de los usuarios personalizando el contenido de nuestra página web según el tipo de navegador del visitante y/u otra información.",
   },
   {
    heading: "Cookie DART de Google DoubleClick",
    body: "Google es uno de los proveedores externos en nuestro sitio. También utiliza cookies, conocidas como cookies DART, para mostrar anuncios a los visitantes de nuestro sitio en función de su visita a wordizy.com y a otros sitios en Internet. Sin embargo, los visitantes pueden optar por rechazar el uso de cookies DART visitando la Política de privacidad de la red de contenido y anuncios de Google en la siguiente URL: google.com",
   },
   {
    heading: "Nuestros socios publicitarios",
    body: "Algunos de los anunciantes en nuestro sitio pueden usar cookies y balizas web. Nuestros socios publicitarios incluyen: Google AdSense. Cada uno de nuestros socios publicitarios tiene su propia Política de privacidad para sus políticas sobre datos de usuario. Para facilitar el acceso, hemos puesto un hipervínculo a sus Políticas de privacidad anteriormente. Los servidores de anuncios de terceros o las redes de anuncios utilizan tecnologías como cookies, JavaScript o balizas web que se usan en sus anuncios y enlaces respectivos que aparecen en wordIzy, que se envían directamente a los navegadores de los usuarios. Reciben automáticamente su dirección IP cuando esto ocurre. Estas tecnologías se utilizan para medir la eficacia de sus campañas publicitarias y/o personalizar el contenido publicitario que ve en los sitios web que visita.\n\nTenga en cuenta que wordIzy no tiene acceso ni control sobre estas cookies que utilizan los anunciantes externos.",
   },
   {
    heading: "Políticas de privacidad de terceros",
    body: "La Política de privacidad de wordIzy no se aplica a otros anunciantes o sitios web. Por lo tanto, le aconsejamos que consulte las respectivas Políticas de privacidad de estos servidores de anuncios de terceros para obtener información más detallada. Puede incluir sus prácticas e instrucciones sobre cómo excluirse de ciertas opciones.\n\nPuede optar por desactivar las cookies a través de las opciones individuales de su navegador. Para obtener información más detallada sobre la gestión de cookies con navegadores web específicos, puede encontrarse en los sitios web respectivos de los navegadores.",
   },
   {
    heading: "Almacenamiento local del navegador",
    body: "Para proporcionar nuestras funciones personalizadas sin requerir cuentas de usuario ni registros, wordIzy utiliza el almacenamiento local de su navegador (localStorage) para funciones como la Save Vault y las preferencias del juego. Estos datos se almacenan completamente en su dispositivo local. Nunca se transmiten a nuestros servidores, se comparten con terceros ni se utilizan con fines de seguimiento en sitios web externos. Puede borrar estos datos en cualquier momento limpiando la caché de su navegador o usando las opciones proporcionadas dentro de las interfaces de las herramientas.",
   },
   {
    heading: "Información sobre niños",
    body: "Otra parte de nuestra prioridad es añadir protección para los niños mientras usan Internet. Animamos a los padres y tutores a observar, participar y/o monitorear y guiar su actividad en línea.\n\nwordIzy no recopila a sabiendas ninguna Información de identificación personal de niños menores de 13 años. Si cree que su hijo proporcionó este tipo de información en nuestro sitio web, le animamos encarecidamente a contactarnos inmediatamente y haremos todo lo posible para eliminar rápidamente dicha información de nuestros registros.",
   },
   {
    heading: "Solo política de privacidad en línea",
    body: "Esta Política de privacidad se aplica solo a nuestras actividades en línea y es válida para los visitantes de nuestro sitio web con respecto a la información que compartieron y/o recopilaron en wordIzy. Esta política no se aplica a ninguna información recopilada sin conexión o a través de canales que no sean este sitio web.",
   },
   {
    heading: "Consentimiento",
    body: "Al usar nuestro sitio web, por la presente consiente a nuestra Política de privacidad y acepta sus Términos y condiciones.",
   },
  ],
  thirdPartyServices: [
    {
      name: "Google AdSense",
      description: "Muestra anuncios a los visitantes de nuestro sitio. Utiliza cookies (cookies DART) para mostrar anuncios basados en sus visitas a wordizy.com y otros sitios. Puede rechazar las cookies DART visitando la Política de privacidad de la red de contenido y anuncios de Google.",
      url: "https://policies.google.com/technologies/ads",
    },
  ],
 },
 terms: {
  title: "Términos de servicio",
  intro: "Bienvenido a wordIzy (accesible vía wordizy.com). Estos Términos de servicio (los \"Términos\") rigen su acceso y uso de nuestro sitio web, herramientas de ayuda para juegos de palabras, diccionarios y juegos interactivos como Anagram Blitz (colectivamente, los \"Servicios\").\n\nAl acceder o usar wordIzy, usted acepta estar sujeto a estos Términos y a nuestra Política de privacidad. Si no está de acuerdo con estos Términos, por favor no utilice nuestros Servicios.",
  lastUpdated: "Última actualización: 28 de octubre de 2026",
  sections: [
   {
    heading: "1. Descripción del Servicio",
    body: "wordIzy proporciona herramientas gratuitas en línea de asistencia para puzzles de palabras, solucionadores de anagramas, búsquedas en diccionario y mini-juegos basados en palabras. Todos los Servicios se proporcionan \"tal cual\" y \"según disponibilidad\" para fines personales, no comerciales, de entretenimiento y educativos únicamente.",
   },
   {
    heading: "2. Uso permitido y restricciones",
    body: "Se le concede una licencia limitada, no exclusiva, no transferible y revocable para acceder y usar wordIzy estrictamente de acuerdo con estos Términos.\nComo condición de su uso, usted acepta no:\n• Usar sistemas automatizados, scrapers, arañas, robots o scripts para extraer datos, texto o listas de palabras de nuestras bases de datos.\n• Interferir o interrumpir el rendimiento, la integridad o la seguridad de los servidores del sitio web.\n• Enmarcar o reflejar cualquier parte del sitio sin nuestra autorización escrita previa.\n• Usar nuestras herramientas de ayuda para juegos de palabras o sistemas automatizados para hacer trampa en entornos competitivos en línea donde las herramientas de asistencia externa están explícitamente prohibidas por los términos respectivos de esas plataformas.",
   },
   {
    heading: "3. Derechos de propiedad intelectual",
    body: "Todo el contenido, características, funcionalidad, logotipos, diseño del sitio, texto y software de juego personalizado (incluyendo Anagram Blitz) en wordIzy son propiedad exclusiva de wordIzy y están protegidos por leyes internacionales de derechos de autor, marcas y propiedad intelectual. Usted no puede reproducir, distribuir, modificar o crear obras derivadas de nuestra propiedad sin consentimiento escrito expreso.",
   },
   {
    heading: "4. Marcas de terceros y exención de responsabilidad",
    body: "Las referencias a juegos de terceros, incluyendo pero no limitándose a Scrabble, Wordle, Words With Friends, Wordfeud y Quordle, se utilizan únicamente con fines informativos y descriptivos para explicar la compatibilidad de nuestras herramientas. wordIzy es una plataforma independiente y no está afiliada, respaldada, autorizada o patrocinada por Hasbro, Mattel, The New York Times Company, o cualquiera de sus respectivas matrices o afiliadas.",
   },
   {
    heading: "5. Datos de usuario y almacenamiento local",
    body: "wordIzy no requiere registro de usuario ni creación de cuenta. Funciones como la Save Vault utilizan el almacenamiento local de su navegador web (localStorage) para guardar estados de configuración e historial de palabras localmente en su dispositivo. No asumimos ninguna responsabilidad ni obligación por cualquier pérdida de datos derivada del borrado de cachés del navegador, cambios de hardware o actualizaciones del navegador.",
   },
   {
    heading: "6. Limitaciones de responsabilidad",
    body: "En ningún caso wordIzy, sus desarrolladores o sus afiliados serán responsables de ningún daño directo, indirecto, incidental, especial o consecuyente que surja del uso o la imposibilidad de usar nuestro sitio web, incluso si se les hubiera informado de la posibilidad de tales daños. No garantizamos que las listas de palabras, los cálculos de puntuación o las configuraciones de la ayuda del diccionario sean totalmente libres de errores o estén actualizados para coincidir con los parches en tiempo real de los diccionarios de juego.",
   },
   {
    heading: "7. Modificaciones al Servicio y los Términos",
    body: "Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto de nuestros Servicios en cualquier momento sin previo aviso. También nos reservamos el derecho de modificar estos Términos a nuestra discreción. Su uso continuado de wordIzy tras cualquier actualización publicada constituye su aceptación de los Términos revisados.",
   },
   {
    heading: "8. Ley aplicable",
    body: "Estos Términos se regirán e interpretarán de acuerdo con las prácticas internacionales de comercio digital, sin tener en cuenta los principios de conflicto de leyes.",
   },
   {
    heading: "9. Información de contacto",
    body: "Si tiene alguna pregunta o aclaración sobre estos Términos de servicio, contáctenos a través de nuestra página de contacto oficial.",
   },
  ],
 },
 sitemap: { title: "Mapa del sitio", body: "Todas las páginas de WordIzy." },
 footer: { rights: "Todos los derechos reservados.", madeWith: "Hecho para amantes de las palabras.", links: "Enlaces rápidos", desc: "Desordenador y resolvedores gratuitos en 9 idiomas. Sin registro.", disclaimer: "Para entretenimiento y juegos de palabras. No afiliado con Scrabble ni Wordle." },
 faq: {
  title: "Cómo usar y preguntas frecuentes",
  unscrambler: [
   { q: "¿Qué es un desordenador de palabras y cómo se usa?", a: "Un desordenador toma un grupo de letras — como un atril de Scrabble (p. ej. SRAABLC) — y encuentra todas las palabras válidas del diccionario que pueden escribirse con esas letras. Escribe tus letras en la casilla «Tus letras» y haz clic en Desordenar. Los resultados aparecen agrupados por longitud (las más largas primero), cada palabra muestra su valor en puntos Scrabble. Ideal para Scrabble, Words With Friends, Wordfeud, crucigramas y puzzles de anagramas." },
   { q: "¿Cómo funcionan los comodines (? y *)?", a: "Usa ? o * como comodín siempre que tengas una letra desconocida — representan una ficha en blanco de Scrabble, una casilla vacía de crucigrama o la letra no confirmada en un intento de Wordle. Escribir «QUER?Y» pide a WordIzy que busque todas las palabras que coincidan con «QUER» + una letra cualquiera + «Y», lo que devuelve QUERY directamente. Cada comodín puntúa 0 (igual que en las reglas oficiales de fichas en blanco), lo que mantiene tu puntuación mostrada realista cuando juegas con una ficha en blanco en tu atril. Puedes encadenar varios comodines a la vez — «A??LE» coincide con APPLE, ADDLE, AGILE, AISLE y ABLE — lo que hace de los comodines la herramienta ideal para explorar anagramas cuando tu atril está incompleto. Para mantener los resultados útiles, limita los comodines a uno o dos por consulta: cada comodín adicional multiplica el conjunto de candidatos, y más allá de tres empezarás a ver palabras que no son realmente jugables con tus fichas reales. Los comodines también funcionan en el Solver de Wordle, el Solver de Anagramas y la Ayuda Wordfeud con la misma semántica, así que puedes usar el mismo flujo de letras parciales en todas las herramientas del sitio." },
   { q: "¿Cómo uso los Filtros avanzados?", a: "Haz clic en «Filtros avanzados» para mostrar tres campos opcionales. «Empieza por» limita los resultados a palabras que comienzan con las letras dadas (p. ej. «AB» → solo palabras que empiezan por AB). «Termina en» hace lo mismo con sufijos (p. ej. «ED» → solo palabras que terminan en ED). «Debe incluir» garantiza que ciertas letras aparezcan en cada resultado, en cualquier posición. Combina los tres con comodines para un control preciso." },
   { q: "¿Cómo se puntúan las palabras?", a: "Cada palabra se puntúa con los valores oficiales de las letras inglesas de Scrabble: A=1, B=3, C=3, D=2, E=1, F=4, G=2, H=4, I=1, J=8, K=5, L=1, M=3, N=1, O=1, P=3, Q=10, R=1, S=1, T=1, U=1, V=4, W=4, X=8, Y=4, Z=10. Los comodines (? *) actúan como fichas en blanco y puntúan 0, igual que en las reglas oficiales. WordIzy calcula automáticamente el total de cada resultado y los ordena por puntuación dentro de cada grupo de longitud, de modo que las jugadas más valiosas aparecen al principio de cada lista — ahorrándote el cálculo mental de sumar los valores de las fichas y permitiéndote identificar el bingo candidato de un vistazo. Para otros idiomas, WordIzy usa los valores oficiales de Scrabble del diccionario de ese idioma (ODS9 para francés, FISE para español, Zingarelli para italiano, Portugués, Alemán, OpenTaal para neerlandés, más listas romanizadas/pinyin para japonés y mandarín). Cambia de idioma con el selector de la barra de navegación para ver la puntuación localizada. Las puntuaciones reales en partida también dependen de las casillas bonus (letra/palabra doble/triple) y del bonus de bingo de +50 por usar las 7 fichas, así que considera la puntuación mostrada como una línea base y añade mentalmente los bonuses al planear tu jugada." },
   { q: "¿Qué diccionarios están disponibles?", a: "WordIzy admite 9 idiomas: inglés (NWL2023 + CSW21), francés (ODS9 2024), español (FISE), italiano (Zingarelli), portugués, alemán, neerlandés (OpenTaal), además de japonés (romaji) y mandarín (pinyin). Todas las palabras se filtran contra el diccionario oficial Scrabble de cada idioma. Cambia de idioma con el selector en la barra de navegación." },
   { q: "¿Por qué los resultados se agrupan por longitud?", a: "Agrupar por longitud facilita encontrar el tipo de jugada que necesitas. En Scrabble, las palabras largas suelen puntuar más, pero a veces una palabra más corta encaja mejor en el tablero. Las palabras más largas aparecen arriba, descendiendo hasta las de 2 letras. Dentro de cada grupo, las palabras se ordenan por puntuación Scrabble para detectar rápidamente la mejor jugada." },
  ],
  scramble: [
   { q: "¿Para qué sirve el Mezclador / Solucionador?", a: "Esta herramienta resuelve puzzles de anagramas — donde las letras están mezcladas y debes encontrar la(s) palabra(s) original(es). Escribe las letras mezcladas (p. ej. RBOLENW) y haz clic en Resolver para ver todas las palabras reales que pueden formarse. Perfecto para anagramas de periódico, juegos de palabras y retos de palabras mezcladas." },
   { q: "¿En qué se diferencia del Desordenador?", a: "El Solucionador usa el mismo motor que el Desordenador pero se centra en resolver puzzles de palabras mezcladas más que en encontrar todas las palabras posibles de un atril. También puedes usar la función «Mezclar una palabra» bajo la entrada para convertir una palabra en variantes aleatorias — útil para crear tus propios puzzles." },
   { q: "¿Puedo usar comodines?", a: "Sí. Usa ? o * para representar letras desconocidas. Por ejemplo, si un puzzle tiene una letra que falta, escribe las letras conocidas más un ? y WordIzy rellenará el hueco con todas las combinaciones válidas." },
   { q: "¿Cómo creo mi propia palabra mezclada?", a: "Usa la tarjeta «Mezclar una palabra» bajo la entrada principal. Escribe cualquier palabra (p. ej. «scrabble») y haz clic en Generar — WordIzy produce varias mezclas aleatorias de esa palabra. Úsalas para crear puzzles para tus amigos o practicar el desordenado." },
  ],
  wordle: [
   { q: "¿Cómo funciona el Sol. Wordle?", a: "El Solucionador Wordle reduce las posibilidades de la respuesta de hoy usando la retroalimentación de tu partida. Introduce la información recopilada en tus intentos: letras verdes (posición correcta), letras amarillas (en la palabra pero en posición equivocada) y letras grises (no en la palabra). El solver devuelve todas las palabras válidas que cumplen tus restricciones." },
   { q: "¿Cómo introduzco las letras colocadas (verdes)?", a: "En el campo «Letras colocadas (verde)», escribe las letras que sabes que están en la posición correcta, usando . o _ para huecos vacíos. Por ejemplo, si sabes que la palabra es A _ _ L E, escribe «A..LE». El solver solo devuelve palabras que coinciden exactamente con ese patrón." },
   { q: "¿Qué son las letras válidas (amarillas) y excluidas (grises)?", a: "Las letras válidas (amarillas) son letras que sabes que ESTÁN en la palabra pero no en la posición que probaste — escríbelas todas en «Letras válidas» (p. ej. «RST»). Las letras excluidas (grises) son letras confirmadas que NO están en la palabra — escríbelas en «Letras excluidas» (p. ej. «BXF»). El solver filtra cualquier palabra que contenga letras excluidas." },
   { q: "¿Qué longitud de palabra debo usar?", a: "Selecciona la longitud del Wordle de hoy (por defecto 5). WordIzy admite palabras de 4 a 8 letras, así que también funciona con variantes como Quordle, Octordle y partidas de longitud personalizada." },
   { q: "¿Algún consejo para elegir el siguiente intento?", a: "Elige de los resultados una palabra que use letras comunes que aún no hayas probado (como R, T, S, L, N). Esto maximiza la información obtenida. Si la lista es larga, elige una palabra que elimine la mayor cantidad de posibilidades. El solver muestra la puntuación Scrabble de cada palabra — las puntuaciones altas suelen indicar letras raras que ayudan a acotar." },
  ],
  quordle: [
   { q: "¿Qué es el Sol. Quordle?", a: "Quordle es un juego en el que resuelves cuatro Wordle a la vez. Este solver te permite introducir restricciones para hasta 4 tableros a la vez y devuelve palabras candidatas para cada uno. Cada tablero mantiene sus propias letras colocadas (verdes), válidas (amarillas) y excluidas (grises)." },
   { q: "¿Cómo uso varios tableros?", a: "Rellena lo que sepas de cada tablero. Las restricciones del tablero 1 solo afectan a sus resultados. Haz clic en «Añadir tablero» para llegar hasta 4 tableros. Usa el botón X para eliminar un tablero. Cuando estés listo, haz clic en Resolver para obtener palabras candidatas de todos los tableros." },
   { q: "¿Debo compartir letras entre tableros?", a: "Sí — una estrategia clave de Quordle es usar un intento para obtener información de varios tableros. Si una letra es verde en el tablero 1, probablemente esté en la misma posición en los otros. Introduce restricciones compartidas en cada tablero para cruzar información y reducir las cuatro respuestas más rápido." },
   { q: "¿Algún consejo estratégico para Quordle?", a: "Empieza con una palabra rica en letras comunes (como CRANE o SLATE) para obtener información de todos los tableros. Céntrate primero en el tablero con más restricciones — resolverlo libera espacio mental. Usa el solver tras 2-3 intentos, cuando tengas suficiente información para reducir cada tablero a una lista manejable." },
  ],
  anagram: [
   { q: "¿Qué es un anagrama?", a: "Un anagrama es una palabra o frase formada al reorganizar todas las letras de otra palabra. Por ejemplo, LISTEN y SILENT son anagramas — mismas letras, distinto orden. El Solucionador de Anagramas encuentra cada palabra que usa exactamente todas las letras que proporciones." },
   { q: "¿En qué se diferencia del Desordenador?", a: "El Desordenador encuentra palabras de CUALQUIER longitud formables con tus letras (incluidas las más cortas). El Solucionador de Anagramas solo encuentra palabras que usan TODAS tus letras — los anagramas de longitud completa. Por ejemplo, con «CHIEN», el solver de anagramas devuelve CHIEN, CHINE, NICHE (todas de 5 letras), mientras que el desordenador también devolvería palabras más cortas como ICE, IN, HE." },
   { q: "¿Puedo usar comodines?", a: "Sí. Usa ? o * como comodines para rellenar huecos restantes. Por ejemplo, escribir «CAT??» encuentra todos los anagramas de 5 letras donde CAT se combina con dos letras cualesquiera. Los comodines puntúan 0 (como fichas en blanco)." },
   { q: "¿Para qué sirven los anagramas?", a: "Los anagramas se usan en juegos de palabras, puzzles, criptografía y lingüística. En Scrabble, encontrar anagramas de tu atril ayuda a detectar bingos (usar las 7 fichas para un bonus de 50 puntos). También son populares en definiciones de crucigramas, trivia y acertijos." },
  ],
  random: [
   { q: "¿Qué hace el Generador de Palabras Aleatorias?", a: "Genera palabras reales al azar del diccionario seleccionado, con filtros opcionales. Puedes especificar longitud, letras iniciales, letras finales o letras que la palabra debe contener. Úsalo para juegos, escritura creativa, naming, práctica de vocabulario o generar contraseñas con palabras reales." },
   { q: "¿Cómo filtro las palabras aleatorias?", a: "Ajusta «Longitud» a un número concreto (2-12) o déjalo en «Cualquiera». «Empieza por» limita a palabras que comienzan con esas letras. «Termina en» limita a palabras que terminan con esas letras. «Contiene» exige que la palabra incluya ciertas letras en cualquier posición. «Cuántas» controla el número de palabras generadas (1-200)." },
   { q: "¿Las palabras son válidas en Scrabble?", a: "Sí. Todas las palabras generadas provienen del diccionario oficial Scrabble del idioma elegido (NWL2023/CSW21 para inglés, ODS9 para francés, etc.). Cada palabra es jugable en Scrabble y otros juegos de palabras." },
   { q: "¿Puedo usarlo para juegos de palabras?", a: "Por supuesto. Genera palabras aleatorias para Pictionary, charadas, juegos de asociación o quizzes de vocabulario. Para contraseñas, combina 3-4 palabras aleatorias de distintas longitudes — crea frases-contraseña memorables pero seguras." },
  ],
  wordfeud: [
   { q: "¿Qué es la Ayuda Wordfeud?", a: "Wordfeud es un popular juego móvil de palabras similar a Scrabble. Esta ayuda encuentra las mejores palabras que puedes jugar desde tu atril. Introduce tus 7 letras (más las letras ya colocadas en el tablero) y WordIzy devuelve todas las palabras jugables, ordenadas por puntuación Scrabble." },
   { q: "¿Cómo introduzco mi atril?", a: "Escribe tus 7 letras de fichas en la casilla «Tus letras». Usa ? o * para fichas en blanco (representan cualquier letra pero puntúan 0). Si hay letras en el tablero sobre las que quieras construir, añádelas también — WordIzy buscará palabras formables del pool combinado." },
   { q: "¿Qué diccionario debo usar?", a: "Wordfeud admite varios diccionarios según tu región. El Wordfeud en inglés usa una lista tipo Scrabble, así que inglés (NWL2023/CSW21) funciona bien. Para otros idiomas, selecciona el correspondiente (francés ODS9, español FISE, etc.) en el selector de idioma." },
   { q: "¿Cómo se calculan las puntuaciones?", a: "Las puntuaciones usan los valores oficiales Scrabble del idioma elegido. Ten en cuenta que la puntuación real de Wordfeud puede diferir ligeramente (tiene casillas bonus y su propia distribución de fichas). Usa las puntuaciones como guía para identificar jugadas de alto valor — la palabra con más puntos desde tu atril suele ser tu mejor jugada." },
  ],
  dictionary: [
   { q: "¿Qué hace Ver Diccionario?", a: "Introduce cualquier palabra para verificar si es válida en el diccionario oficial Scrabble del idioma elegido. La herramienta muestra la palabra como fichas Scrabble, un distintivo válido/no válido, la puntuación Scrabble, la longitud, las fichas, una definición y sinónimos (cuando estén disponibles)." },
   { q: "¿De dónde provienen las definiciones?", a: "Las definiciones proceden de varias fuentes: la API Free Dictionary (inglés, francés, español, alemán, italiano, portugués), Wiktionary (todos los idiomas como respaldo) y un asistente de IA para los huecos restantes. La fuente se indica junto a cada definición." },
   { q: "¿De dónde provienen los sinónimos?", a: "Los sinónimos provienen de Datamuse (inglés, español, francés, italiano, portugués) y OpenThesaurus (alemán). Solo se muestran los sinónimos que a su vez son palabras válidas en Scrabble — haz clic en cualquiera para comprobarlo al instante." },
   { q: "¿Por qué una palabra común podría ser inválida?", a: "Los diccionarios Scrabble son estrictos — excluyen nombres propios, abreviaturas, palabras con guion y palabras que requieren apóstrofo. Por ejemplo, «BRUNCH» es válida pero «BRUNCH'S» puede no serlo. Si una palabra parece faltar, puede ser un nombre propio en mayúscula o una incorporación reciente aún no en la lista oficial. Cambia de idioma para comprobar la palabra en otro diccionario." },
  ],
  scrabble: [
   { q: "¿Qué es Scrabble Duplicate?", a: "El Scrabble duplicate es una variante en la que cada jugador recibe el mismo atril y debe encontrar la mejor jugada posible. Se usa en torneos y entrenamiento para medir habilidad sin suerte. Esta herramienta te ayuda a encontrar las palabras de mayor puntuación desde tu atril — introduce tus 7 letras y, opcionalmente, las del tablero, y haz clic en «Buscar mejores palabras»." },
   { q: "¿Cómo introduzco las letras del tablero?", a: "Si hay letras ya colocadas en el tablero sobre las que puedas construir, escríbelas en el campo «Letras del tablero (opcional)» junto con las de tu atril. WordIzy trata el pool combinado como letras disponibles. Esto ayuda a encontrar palabras que enganchan con jugadas existentes — esencial para maximizar la puntuación en partidas reales." },
   { q: "¿Cómo se clasifican las mejores jugadas?", a: "Las palabras se ordenan por puntuación Scrabble (la más alta primero). Las 10 mejores jugadas aparecen en una lista destacada arriba. Recuerda: la puntuación real también depende de las casillas bonus (letra/palabra doble/triple) y los bingos (bonus de 50 puntos por usar las 7 fichas). Usa las puntuaciones de la herramienta como base y luego integra la posición en el tablero." },
   { q: "¿Qué es un bingo y cómo encuentro uno?", a: "Un bingo es el giro más importante de Scrabble: jugar las 7 fichas en un solo turno da un bonus de +50 además de la puntuación base de la palabra, así que una palabra de 30 puntos se convierte en una jugada de 80. Para encontrar bingos con WordIzy, introduce tu atril completo de 7 letras (usa ? o * para las fichas en blanco) y mira el grupo de resultados de 7 letras al principio de la lista — cada palabra ahí es un bingo potencial. Los bingos de 7 letras más rentables en Scrabble inglés son MUZJIKS (29 base + 50 = 79 puntos), JACUZZI (34 + 50 = 84), SYZYGY (21 + 50 = 71), OXAZOLIDINE (raro pero devastador) y las raíces ANATOMIZ-, ANTISOCIAL-, OVERLAPPING- que aceptan sufijos comunes. Para identificar bingos más rápido, aprende las raíces de alto valor — SATISFI-, ANTISOY-, OVERLAP- — que se combinan con -ER, -ED, -ING, -ATION. Guarda una o dos letras flexibles (E, R, S, T) cuando tu atril tiene forma de bingo, porque el bonus de bingo (+50) casi siempre compensa los puntos que perderías por descargar esas fichas pronto." },
  ],
  wordlists: [
   { q: "¿Qué es la página Listas de Palabras?", a: "Listas de Palabras te permite explorar todas las palabras válidas en Scrabble de 2 a 7 letras. Las palabras se agrupan por longitud y luego por letra final (A-Z), para explorar el diccionario de forma sistemática. Úsala para estudiar, encontrar palabras para tus partidas o ampliar vocabulario." },
   { q: "¿Cómo filtro por longitud?", a: "Usa el selector de longitud (2-7) arriba. Haz clic en «Todas» para ver todas las longitudes apiladas (palabras de 2 letras arriba, de 7 abajo), o en un número concreto para ver solo esa longitud. Cada sección de longitud muestra 26 contenedores (uno por letra final A-Z)." },
   { q: "¿Cómo filtro por letra?", a: "Usa la fila A-Z bajo el selector de longitud. Haz clic en una letra para mostrar solo las palabras que terminan con esa letra, o «Todas» para mostrar todas. Útil para encontrar palabras que enganchan con una letra ya en el tablero." },
   { q: "¿Por qué las palabras se muestran en mayúsculas?", a: "Las fichas Scrabble son mayúsculas, así que las palabras se muestran así para coincidir. Cada palabra muestra su valor Scrabble junto a ella. Dentro de cada contenedor de letra, las palabras se ordenan alfabéticamente (A-Z) para facilitar el escaneo." },
  ],
  wordstarts: [
   { q: "¿Qué es la página Empieza Por?", a: "Esta página te permite explorar todas las palabras válidas en Scrabble que EMPIEZAN por una letra concreta. Selecciona una letra (A-Z) y WordIzy muestra cada palabra que empieza por esa letra, agrupada por longitud (2-7 letras). Perfecta para estudiar aperturas y encontrar palabras para construir desde una letra inicial en el tablero." },
   { q: "¿Cómo uso los selectores de longitud y letra?", a: "Primero, elige una letra de la fila A-Z — eso fija la letra inicial. Luego usa la fila de longitud (2-7 o Todas) para filtrar por longitud. Cada sección muestra todas las palabras que empiezan por la letra elegida, ordenadas alfabéticamente. Haz clic en «Todas» en cualquiera de las filas para quitar ese filtro." },
   { q: "¿En qué ayuda esto para Scrabble?", a: "Conocer las palabras que empiezan por cada letra ayuda a planificar aperturas y enganches. Si tienes una Q, saber todas las palabras que empiezan por Q (QI, QAT, QUAD...) te ayuda a jugarla con eficacia. La página también es útil para crucigramas, donde las pistas suelen especificar «empieza por...»." },
   { q: "¿Por qué paginar a 50 palabras?", a: "Algunas letras (como S, A, E) tienen miles de palabras que empiezan por ellas. Para mantener las páginas rápidas y legibles, los resultados se paginan a 50 palabras por página con botones anterior/siguiente. Cada página indica su número y el total para que sepas dónde estás." },
  ],
  wordends: [
   { q: "¿Qué es la página Termina En?", a: "Esta página te permite explorar todas las palabras válidas en Scrabble que TERMINAN con una letra concreta. Selecciona una letra (A-Z) y WordIzy muestra cada palabra que termina con esa letra, agrupada por longitud (2-7 letras). Ideal para encontrar palabras que enganchen con una letra ya presente en el tablero." },
   { q: "¿Cómo uso los selectores de longitud y letra?", a: "Primero, elige una letra de la fila A-Z — eso fija la letra final. Luego usa la fila de longitud (2-7 o Todas) para filtrar por longitud. Cada sección muestra todas las palabras que terminan con la letra elegida, ordenadas alfabéticamente. Haz clic en «Todas» en cualquiera de las filas para quitar ese filtro." },
   { q: "¿En qué ayuda esto para Scrabble?", a: "Las letras finales importan para los enganches — si hay una S en el tablero, conocer todas las palabras terminadas en S te permite pluralizar o extender jugadas. Igualmente, conocer las palabras terminadas en D, ED, ING ayuda a apoyarte en sufijos comunes. Esta página es una poderosa herramienta de estudio para juego competitivo." },
   { q: "¿Por qué paginar a 50 palabras?", a: "Algunas letras (como E, S, D) tienen miles de palabras que terminan con ellas. Para mantener las páginas rápidas y legibles, los resultados se paginan a 50 palabras por página con botones anterior/siguiente. Cada página indica su número y el total para que sepas dónde estás." },
  ],
  vault: [
   { q: "¿Qué es la Bóveda de guardado?", a: "La Bóveda de guardado es una herramienta de entrenamiento de vocabulario integrada para jugadores competitivos de Scrabble y Wordle — una lista personal de palabras favoritas diseñada específicamente para el estudio por repetición espaciada de combinaciones de letras difíciles. A diferencia de los marcadores genéricos del navegador, la bóveda mantiene visible la puntuación Scrabble de cada palabra guardada y te permite copiar toda la lista directamente a una aplicación de tarjetas o un mazo Anki para practicar sin conexión. He aquí el flujo de 4 pasos que usan los jugadores competitivos: (1) Ejecuta una búsqueda como «palabras de 7 letras a partir de QUARTZE» o «palabras que empiezan por Q» y marca con estrella las palabras de alto valor que sigues olvidando — QAT, QOPH, FAQIR, MUZJIKS. (2) Abre el panel de la bóveda desde el icono de estrella en la esquina superior derecha; tus palabras guardadas se mantienen organizadas en una lista con su puntuación en vivo junto a cada entrada. (3) Haz clic en «Copiar todas las líneas» para pegar la lista en Anki, Quizlet o una plantilla de tarjetas imprimibles para repaso por repetición espaciada lejos de la pantalla. (4) Vuelve a ejecutar la misma búsqueda la semana que viene y compara qué palabras has memorizado — tu lista guardada persiste localmente en el localStorage de tu navegador, así que nunca sale de tu dispositivo, no requiere cuenta y funciona sin conexión una vez cargada la página." },
   { q: "¿Cómo guardo una palabra en la bóveda?", a: "Haga clic en el icono de estrella (☆) junto a cualquier palabra en los resultados. La estrella se vuelve ámbar (★) cuando una palabra está guardada. Haga clic de nuevo para eliminar la palabra de su bóveda." },
   { q: "¿Cómo veo mis palabras guardadas?", a: "Haga clic en el icono de estrella en el encabezado del sitio (esquina superior derecha). Se abre un panel desde la derecha mostrando todas sus palabras guardadas. Puede copiar palabras individuales, copiar toda la lista, o vaciar la bóveda." },
   { q: "¿Se sincroniza mi bóveda entre dispositivos?", a: "No — la bóveda se almacena en el localStorage de su navegador, por lo que es por dispositivo. Si borra los datos de su navegador o usa un dispositivo diferente, su bóveda no se transferirá. No se necesita cuenta y ningún dato sale de su dispositivo." },
  ],
 },
 blitz: {
  loadingEngine: "Cargando motor de puzzle...",
  completed: "Completado",
  todaysPuzzleSolved: "📅 ¡Puzzle de hoy resuelto!",
  alreadyPlayed: "¡Ya has usado tu intento diario! Vuelve mañana a medianoche para un nuevo desafío.",
  playInfinite: "Jugar modo práctica infinita",
  challengeTitle: "⚡ Desafío Anagram Blitz",
  challengeDesc: "Descifra palabras en menos de 60 segundos de nuestros diccionarios Scrabble.",
  startToday: "Comenzar el puzzle de hoy",
  playInfiniteBtn: "Práctica infinita",
  timesUp: "⏱️ ¡Se acabó el tiempo! Juego terminado",
  finalScore: "Puntuación final:",
  points: "puntos.",
  playAgain: "🔄 Jugar de nuevo",
  dailyLocked: "Tu intento diario está bloqueado. ¡Hasta mañana!",
  returnMenu: "Volver al menú",
  timeLeft: "s",
  totalScore: "pts",
  generating: "🎲 Generando palabra...",
  hint: "💡 Pista:",
  waiting: "Esperando...",
  typeWord: "Escribe la palabra...",
  skipReveal: "🏳️ Saltar y revelar",
  stopGame: "🛑 Detener",
  play: "▶ Jugar",
  wrong: "❌ ¡Respuesta incorrecta! Inténtalo de nuevo.",
  correct: "✨ ¡Perfecto! ¡Respuesta correcta!",
  answerWas: "La respuesta era:",
  challengeFriend: "Reta a un amigo",
  challengeText: "Puntué {score} en Anagram Blitz de WordIzy — ¿puedes superarme? Juega gratis: https://wordizy.com/blitz",
  // Sección de contenido SEO (debajo de la tarjeta del juego)
  pageHeading: "Juega a Anagram Blitz — Juego de palabras gratis de 60 segundos",
  howToPlayTitle: "Cómo jugar a Anagram Blitz",
  howToPlayDesc: "Anagram Blitz es un juego rápido de anagramas de 60 segundos. Recibe un conjunto de letras mezcladas y debe reordenarlas para formar una palabra válida del diccionario. Cada respuesta correcta gana 20 puntos; cada omisión cuesta 5 puntos. Supere su mejor puntuación y suba en la clasificación diaria.",
  gameModesTitle: "Modos de juego",
  dailyModeName: "Desafío diario",
  dailyModeDesc: "Un acertijo por día. Juegue una vez y asegure su puntuación para la clasificación.",
  infiniteModeName: "Práctica infinita",
  infiniteModeDesc: "Acertijos ilimitados. Cada respuesta correcta añade 10 segundos extra al reloj.",
  tipsTitle: "Consejos y estrategia",
  tip1: "Busque las terminaciones típicas del español : -AR, -ER, -IR (infinitivos), -CIÓN (sustantivos de acción), -ADO/-IDA (participios pasados).",
  tip2: "En español, A y E son las letras más frecuentes — la A aparece en el 70 % de las palabras de cinco letras, pruébelas primero.",
  tip3: "La terminación -A (femenino singular) es la más común en español — si obtiene un verde en la última posición, probablemente es un sustantivo femenino.",
  tip4: "Los grupos consonánticos BL, CL, FL, GL, PL son muy frecuentes en español — si ve una L amarilla, considere estas combinaciones.",
  blitzFooter: "Anagram Blitz utiliza diccionarios oficiales de Scrabble (FISE para el español, NWL2023 + CSW21 para el inglés) con soporte multilingüe para 9 idiomas. Juegue gratis, sin necesidad de registrarse.",
 },
 ui: {
  advertisement: "Anuncio",
  featuredGuide: "Guía destacada",
  saveVaultFaqTitle: "Bóveda — Cómo usarla",
  relatedTools: "Herramientas relacionadas",
  published: "Publicado:",
  backToHome: "Volver al inicio",
  somethingWrong: "Algo salió mal",
  tryAgain: "Intentar de nuevo",
  reloadPage: "Recargar página",
  returnLabel: "Volver",
  allCopied: "¡Todas las palabras copiadas!",
  showLess: "Mostrar menos",
  showMore: "Mostrar más",
  enterPassword: "Ingrese la contraseña",
  totalSearches: "Búsquedas totales",
  topQuery: "Búsqueda principal",
  topTool: "Herramienta principal",
  topLanguage: "Idioma principal",
  newDailyChallenge: "Nuevo desafío diario",
  scrambleFeatureHint: "Use la función Mezclar una palabra a continuación para crear sus propios puzzles.",
  wordList: "Lista de palabras",
  copiedToClipboard: "¡Copiado al portapapeles!",
 },
 hubPages: {
  startsSubtitle: "Explore todas las palabras válidas de Scrabble que comienzan con cada letra del alfabeto, de 2 a 15 letras.",
  endsSubtitle: "Explore todas las palabras válidas de Scrabble que terminan con cada letra del alfabeto, de 2 a 15 letras.",
  lengthSubtitle: "Explore todas las palabras válidas de Scrabble por longitud, de 2 a 15 letras. Cada longitud tiene su propia página dedicada.",
  wordleStartsSubtitle: "Explore todas las palabras válidas de Wordle que comienzan con cada letra del alfabeto. Perfecto para encontrar las mejores palabras iniciales y acotar su puzzle diario.",
  wordleEndsSubtitle: "Explore todas las palabras válidas de Wordle que terminan con cada letra del alfabeto. Perfecto para encontrar ganchos, sufijos y acotar su puzzle diario.",
  startsHeading: "Palabras que comienzan con — A a Z",
  endsHeading: "Palabras que terminan con — A a Z",
  lengthHeading: "Desordenar por longitud de palabra (2–15 letras)",
  wordleStartsHeading: "Palabras de Wordle que comienzan con — A a Z",
  wordleEndsHeading: "Palabras de Wordle que terminan con — A a Z",
  clickLetterStarts: "Haga clic en una letra para explorar todas las palabras que comienzan con esa letra en una página dedicada.",
  clickLetterEnds: "Haga clic en una letra para explorar todas las palabras que terminan con esa letra en una página dedicada.",
  clickLength: "Haga clic en un número para explorar todas las palabras de esa longitud en una página dedicada.",
  clickLetterWordleStarts: "Haga clic en una letra para explorar todas las palabras de Wordle que comienzan con esa letra en una página dedicada.",
  clickLetterWordleEnds: "Haga clic en una letra para explorar todas las palabras de Wordle que terminan con esa letra en una página dedicada.",
  wordleStartsBadge: "Wordle comienza",
  wordleEndsBadge: "Wordle termina",
  wordleStartsTitle: "Palabras de Wordle que comienzan con A-Z",
  wordleEndsTitle: "Palabras de Wordle que terminan con A-Z",
  returnHome: "Volver al inicio",
  footerNote: "Todas las palabras se filtran a través de diccionarios oficiales de Scrabble.",
  searchPlaceholderStarts: "Escriba una letra A-Z para explorar palabras que comienzan con ella…",
  searchPlaceholderEnds: "Escriba una letra A-Z para explorar palabras que terminan con ella…",
  searchPlaceholderLength: "Escriba un número 2-15 para explorar por longitud…",
  searchPlaceholderWordleStarts: "Escriba una letra A-Z para explorar palabras de Wordle que comienzan con ella…",
  searchPlaceholderWordleEnds: "Escriba una letra A-Z para explorar palabras de Wordle que terminan con ella…",
  browseBtn: "Explorar",
 },
 wordListPage: {
  loading: "Cargando listas de palabras verificadas…",
  filterPlaceholder: "Filtrar palabras…",
  filterLabel: "Filtrar palabras",
  clearFilter: "Borrar filtro",
  loadMore: "Cargar más",
  remaining: "restantes",
  allLengths: "Todos",
  filterByLength: "Filtrar por longitud de palabra",
  noMatch: "Ninguna palabra coincide con su filtro.",
  noWords: "No se encontraron palabras.",
  wordsCount: "palabras",
  error: "Error al cargar las palabras. Por favor, refresque la página.",
 },
};

const de: Translation = {
 nav: {
  unscrambler: "Entwirker", scramble: "Misch", wordle: "Wordle",
  quordle: "Quordle", anagram: "Anagramme", random: "Zufallswort",
  wordfeud: "Wordfeud", dictionary: "Wörterbuch", scrabble: "Duplicate",
  wordlists: "Wortlisten", wordstarts: "Wörter Beginnen Mit", wordends: "Wörter Enden Mit", wordlestarts: "Wordle Beginnt A-Z", wordleends: "Wordle Endet A-Z", about: "Über", contact: "Kontakt", privacy: "Datenschutz", terms: "Nutzungsbedingungen",
  sitemap: "Sitemap", tools: "Werkzeuge", more: "Mehr", solvers: "Löser", site: "Seite", wordlab: "Wort-Labor", inbox: "Posteingang",
  dashboard: "Dashboard", blitz:"Anagramm-Blitz", blitzShort: "Blitz"
 },
 brand: { name: "wordIzy", tagline: "Entwirren. Lösen. Gewinnen." },
 common: {
  yourLetters: "Deine Buchstaben", unscramble: "Entwirren", clear: "Löschen", advancedFilters: "Erweiterte Filter",
  startsWith: "Beginnt mit", endsWith: "Endet mit", mustInclude: "Muss enthalten", dictionaryLabel: "Wörterbuch",
  results: "Ergebnisse", noResults: "Keine Wörter gefunden. Andere Buchstaben oder Platzhalter (? oder *) versuchen.",
  wordsFound: "Wörter gefunden", points: "Pkt", length: "Buchstaben", loading: "Lädt…", search: "Suchen",
  copy: "Kopieren", copied: "Kopiert!", tryExamples: "Testen:", tipsTitle: "Tipps & Funktionsweise",
  tileValues: "Scrabble-Steinwerte", blanks: "Blankos", languageLabel: "Sprache",
  showMore: "Mehr anzeigen", showLess: "Weniger", allWords: "Alle Wörter", perGroup: "pro Gruppe",
  wordsCount: "Wörter", reset: "Zurücksetzen", apply: "Anwenden", solve: "Lösen", generate: "Generieren",
  check: "Prüfen", example: "Beispiel", none: "Keine", optional: "optional",
 },
 home: {
  title: "Wort-Entwirker", subtitle: "Gib deine gemischten Buchstaben ein, füge Platzhalter mit ? oder * hinzu und finde jedes spielbare Wort — nach Länge gruppiert und nach Scrabble-Punktzahl sortiert.",
  heroBadge: "Kostenlos • Keine Anmeldung • 9 Sprachen",
  faqTitle: "Häufige Fragen",
  q1: "Wozu dient ein Wort-Entwirker?",
  a1: "Ein Entwirker nimmt Buchstaben (wie ein Scrabble-Gestell) und findet jedes gültige Wörterbuchwort, das sich daraus bilden lässt. Ideal für Scrabble, Wordfeud, Kreuzworträtsel und Anagramm-Puzzles.",
  q2: "Wie nutze ich die erweiterten Optionen?",
  a2: "Öffne nach der Eingabe die Erweiterten Filter. »Beginnt mit« beschränkt auf Wörter mit diesem Präfix, »Endet mit« auf Suffixe, »Muss enthalten« garantiert bestimmte Buchstaben. Mit Platzhaltern (? oder *) ersetzt du unbekannte Buchstaben.",
  q3: "Wie funktioniert das?",
  a3: "WordIzy vergleicht deinen Buchstabenpool mit einem vollständigen Wörterbuch im Speicher für die gewählte Sprache, prüft welche Wörter bildbar sind (? und * als Platzhalter), wendet deine Filter an, bewertet jedes Wort mit offiziellen Scrabble-Werten und gruppiert die Ergebnisse nach Länge — längste zuerst.",
  q4: "Welche Sprachen werden unterstützt?",
  a4: "Englisch, Französisch, Spanisch, Italienisch, Portugiesisch, Deutsch, Niederländisch sowie Japanisch (Romaji) und Mandarin (Pinyin). Wechsle das Wörterbuch über die Sprachauswahl.",
 },
 scramble: { title: "Wort-Mischer / -Löser", subtitle: "Bei einem Misch-Rätsel festgefahren? Buchstaben eingeben und in echte Wörter aufgelöst.", inputLabel: "Gemischte Buchstaben", btn: "Auflösen", solutionLabel: "Mögliche Lösungen", hint: "? oder * für unbekannte Buchstaben." },
 wordle: { title: "Wordle-Löser", subtitle: "Das heutige Wordle eingrenzen: grüne Buchstaben an Position, gelbe bekannte, graue ausschließen.", length: "Wortlänge", placed: "Platzierte (grün)", valid: "Gültige (gelb)", excluded: "Ausgeschlossene (grau)", btn: "Lösen", hint: ". oder _ für Leerstellen, z. B. A..LE" },
 quordle: { title: "Quordle-Löser", subtitle: "Bis zu vier Wordle gleichzeitig lösen. Jedes Brett behält eigene Bedingungen.", board: "Brett", addBoard: "Brett hinzufügen", hint: "Fülle aus, was du weißt, und löse." },
 anagram: { title: "Anagramm-Löser", subtitle: "Finde jedes Anagramm deiner Buchstaben — Wörter, die genau alle Buchstaben nutzen.", btn: "Anagramme finden", hint: "Platzhalter (? *) füllen auf." },
 random: { title: "Zufallswort-Generator", subtitle: "Zufällige echte Wörter mit Längen-, Präfix-, Suffix- und Inhaltsfiltern.", length: "Länge", any: "Beliebig", count: "Wie viele", btn: "Generieren" },
 wordfeud: { title: "Wordfeud-Hilfe", subtitle: "Finde die besten Wordfeud-Wörter aus deinem Gestell. Wähle dein Wörterbuch.", btn: "Wörter finden", hint: "? oder * für Blankos." },
 dictionary: { title: "Wörterbuch prüfen", subtitle: "Prüfe, ob ein Wort existiert, sieh Scrabble-Punkte und eine Definition.", btn: "Prüfen", exists: "ist ein gültiges Wort", notExists: "nicht im Wörterbuch gefunden", definition: "Definition", score: "Scrabble-Punkte", tiles: "Buchstabensteine" },
 scrabble: { title: "Scrabble Duplicate", subtitle: "Duplicate gibt allen dasselbe Gestell. 7 Buchstaben (plus Brett-Buchstaben) eingeben und die besten Züge finden.", rack: "Dein Gestell", board: "Brett-Buchstaben (optional)", btn: "Beste Wörter finden", hint: "Platzhalter erlaubt. Nach Punkten sortiert." },
 wordlists: { title: "Wortlisten", subtitle: "Alle 2- bis 7-Buchstaben-Wörter durchsuchen. Ansicht, Länge und Buchstabe wählen, A–Z erkunden.", allWords: "Alle Wörter", startsBy: "Beginnt mit A–Z", endsBy: "Endet mit A–Z", letter: "Buchstabe", selectLength: "Länge", selectLetter: "Buchstabe", browse: "Durchsuchen" },
 about: {
  title: "Über wordIzy",
  intro: "Willkommen bei wordIzy, Ihrer ersten Anlaufstelle für hochleistungs-Wortspielwerkzeuge, Anagramm-Löser und bildungsorientierte Rätselressourcen. Von einem engagierten Team aus Indie-Entwicklern und lebenslangen Worträtsel-Enthusiasten entwickelt, wurde wordIzy von Grund auf so konzipiert, dass es das schnellste, übersichtlichste und ablenkungsfreiste Wörterbuch-Werkzeugset im Web ist.",
  sections: [
   {
    heading: "Unsere Mission",
    body: "Unsere Mission ist es, Spielern zu helfen, ihren Wortschatz zu erweitern, ihren Geist zu trainieren und freundschaftliche Rätselstreitigkeiten mit absoluter Genauigkeit zu klären. Wir glauben, dass Wortlöser nicht mit aufdringlichen Layouts, trägen Ladezeiten oder komplizierten Setups überladen sein sollten. Deshalb bietet wordIzy Sofortberechnungen, lokalisierte mehrsprachige Scrabble-Wörterbücher und intuitive, maßgeschneiderte Filter-Engines für einen nahtlosen Alltagseinsatz.",
   },
   {
    heading: "Warum wordIzy wählen?",
    body: "Anders als bei einfachen, generischen Nachschlagetabellen sind unsere Werkzeuge maßgeschneidert, um exakt den Mechaniken der weltweit beliebtesten Wortspiele zu entsprechen:\n• Umfassende Wörterbuchdatenbanken: Wir unterstützen 9 Sprachen und filtern Ihre Buchstaben direkt gegen offizielle Wettbewerbslexika wie das Scrabble-Wörterbuch (Deutsch), NWL2023 und CSW21.\n• Realistische Spiellogik: Unser fortschrittliches Joker-Filter-System erkennt Regeln wie die Verteilung von Scrabble-Leerfeldern und weist echte Nullpunkt-Werte zu, damit Sie präzise, turnierreife Züge planen können.\n• Innovative Lernwerkzeuge: Einzigartige Funktionen wie unser lokal gespeicherter Save Vault dienen als persönlicher Lernkarten-Manager und bieten den Spielern eine aktive Umgebung, um Wortmuster, Haken und Erweiterungen offline zu studieren.\n• Fesselndes Spiel: Über Werkzeuge hinaus erschaffen wir personalisierte Erlebnisse wie Anagram Blitz, um Liebhabern von Wortspielen eine temporeiche Umgebung zu bieten, in der sie ihre Geschwindigkeit testen und ihre persönlichen High Scores herausfordern können.",
   },
   {
    heading: "Unser Engagement für den Datenschutz",
    body: "Wir legen Wert auf Ihre digitale Sicherheit und die Leistung Ihres Systems. Erweiterte Optionen wie Ihr Wort-Lesezeichen-Verlauf werden direkt über den lokalen Speicher Ihres Browsers ausgeführt. Das bedeutet, dass Ihre persönlichen Studienlisten niemals Ihr Gerät verlassen, keine Benutzerkonto-Registrierungen erforderlich sind und Ihre Daten vollständig privat bleiben.",
   },
   {
    heading: "Kontakt aufnehmen",
    body: "Wir arbeiten ständig daran, unsere Suchalgorithmen zu verbessern, unsere Datenbanken zu erweitern und neue Spielmodi zu entwerfen. Wenn Sie Funktionswünsche, Wörterbuchkorrekturen oder allgemeines Feedback haben, erreichen Sie uns über unsere Kontaktseite. Danke, dass Sie wordIzy zu einem Teil Ihrer täglichen Gaming-Routine machen!",
   },
  ],
 },
 contact: {
  title: "Kontakt aufnehmen",
  intro: "Hast du eine Frage, ein Feedback oder einen Funktionsvorschlag für wordIzy? Wir würden uns freuen, von dir zu hören!\n\nEgal, ob du ein fehlendes Wort in unseren Scrabble-Wörterbüchern gefunden hast, beim Spielen von Anagram Blitz einen Fehler entdeckt hast oder einfach eine neue Werkzeugvariante vorschlagen möchtest — dein Input hilft uns, eine bessere Plattform für Wortpuzzle-Spieler weltweit aufzubauen.",
  sections: [
   {
    heading: "So erreichst du uns",
    body: "Bitte sende alle Anfragen, Feedback oder Support-Anfragen direkt an unsere offizielle Verwaltungs-E-Mail-Adresse:\n📩 support@wordizy.com",
   },
   {
    heading: "Bitte gib in deiner Nachricht an",
    body: "Um uns zu helfen, deine Anfrage so schnell wie möglich zu bearbeiten, gib bitte alle relevanten Details an:\n• Für Fehlerberichte: Teile uns mit, welches Gerät oder welchen Browser du verwendet hast (z. B. iPhone/Safari oder Desktop/Chrome).\n• Für Wörterbuch-Korrekturen: Erwähne das spezifische Wort, das Sprachwörterbuch oder den Spielmodus, den du verwendet hast.\n• Für Partnerschaften: Bitte gib deinen Firmen- oder Plattformnamen klar im Betreff an.",
   },
   {
    heading: "Erwartete Antwortzeiten",
    body: "Wir sind ein kleines, unabhängiges Entwicklerteam, aber wir lesen jedes Feedback, das wir erhalten. Du kannst im Allgemeinen innerhalb von 24 bis 48 Stunden von Montag bis Freitag mit einer Antwort von uns rechnen.",
   },
  ],
  closing: "Danke, dass du Teil der wordIzy-Community bist!",
 },
 privacy: {
  title: "Datenschutzerklärung",
  intro: "Auf wordIzy, erreichbar unter wordizy.com, ist die Privatsphäre unserer Besucher eine unserer Hauptprioritäten. Dieses Dokument zur Datenschutzerklärung enthält die Arten von Informationen, die von wordIzy erfasst und aufgezeichnet werden, und wie wir sie verwenden.\n\nWenn Sie weitere Fragen haben oder weitere Informationen zu unserer Datenschutzerklärung benötigen, zögern Sie nicht, uns zu kontaktieren.",
  lastUpdated: "Zuletzt aktualisiert: 28. Oktober 2026",
  sections: [
   {
    heading: "Protokolldateien",
    body: "wordIzy folgt einem Standardverfahren zur Verwendung von Protokolldateien. Diese Dateien protokollieren Besucher, wenn sie Websites besuchen. Alle Hosting-Unternehmen tun dies im Rahmen der Analysen der Hosting-Dienste. Die von den Protokolldateien erfassten Informationen umfassen Internetprotokoll-(IP)-Adressen, Browsertyp, Internetdienstanbieter (ISP), Datums- und Uhrzeitstempel, verweisende/Ausstiegs-Seiten und möglicherweise die Anzahl der Klicks. Diese sind nicht mit Informationen verknüpft, die persönlich identifizierbar sind. Zweck der Informationen ist die Analyse von Trends, die Verwaltung der Website, die Verfolgung der Bewegung der Benutzer auf der Website und die Erhebung demografischer Informationen.",
   },
   {
    heading: "Cookies und Web Beacons",
    body: "Wie jede andere Website verwendet wordIzy \"Cookies\". Diese Cookies werden verwendet, um Informationen zu speichern, darunter die Präferenzen der Besucher und die Seiten auf der Website, die der Besucher aufgerufen oder besucht hat. Die Informationen werden verwendet, um die Benutzererfahrung zu optimieren, indem unser Webseiteninhalt basierend auf dem Browsertyp des Besuchers und/oder anderen Informationen angepasst wird.",
   },
   {
    heading: "Google DoubleClick DART-Cookie",
    body: "Google ist einer der Drittanbieter auf unserer Website. Es verwendet auch Cookies, sogenannte DART-Cookies, um Besuchern unserer Website basierend auf ihrem Besuch auf wordizy.com und anderen Websites im Internet Werbung anzuzeigen. Besucher können die Verwendung von DART-Cookies jedoch ablehnen, indem sie die Datenschutzerklärung des Google-Werbe- und Content-Netzwerks unter der folgenden URL aufrufen: google.com",
   },
   {
    heading: "Unsere Werbepartner",
    body: "Einige der Werbetreibenden auf unserer Website verwenden möglicherweise Cookies und Web Beacons. Unsere Werbepartner sind: Google AdSense. Jeder unserer Werbepartner hat eine eigene Datenschutzerklärung für seine Richtlinien zu Benutzerdaten. Für einen leichteren Zugang haben wir oben einen Link zu ihren Datenschutzerklärungen eingefügt. Drittanbieter-Werbeserver oder Werbenetzwerke verwenden Technologien wie Cookies, JavaScript oder Web Beacons, die in ihren jeweiligen Anzeigen und Links verwendet werden, die auf wordIzy erscheinen und direkt an die Browser der Benutzer gesendet werden. Sie erhalten automatisch Ihre IP-Adresse, wenn dies geschieht. Diese Technologien werden verwendet, um die Wirksamkeit ihrer Werbekampagnen zu messen und/oder die Werbeinhalte zu personalisieren, die Sie auf von Ihnen besuchten Websites sehen.\n\nBitte beachten Sie, dass wordIzy keinen Zugriff auf oder keine Kontrolle über diese von Drittanbieter-Werbetreibenden verwendeten Cookies hat.",
   },
   {
    heading: "Datenschutzerklärung von Drittanbietern",
    body: "Die Datenschutzerklärung von wordIzy gilt nicht für andere Werbetreibende oder Websites. Daher raten wir Ihnen, die jeweiligen Datenschutzerklärungen dieser Drittanbieter-Werbeserver für detailliertere Informationen zu konsultieren. Diese können deren Praktiken und Anweisungen zum Opt-out bestimmter Optionen umfassen.\n\nSie können Cookies über die individuellen Optionen Ihres Browsers deaktivieren. Detailliertere Informationen zur Cookie-Verwaltung mit bestimmten Webbrowsern finden Sie auf den jeweiligen Websites der Browser.",
   },
   {
    heading: "Lokaler Browser-Speicher",
    body: "Um unsere personalisierten Funktionen ohne Benutzerkonten oder Registrierungen anzubieten, nutzt wordIzy den lokalen Speicher Ihres Browsers (localStorage) für Funktionen wie die Save Vault und Spieleinstellungen. Diese Daten werden vollständig auf Ihrem lokalen Gerät gespeichert. Sie werden niemals an unsere Server übertragen, an Dritte weitergegeben oder für Tracking-Zwecke über externe Websites hinweg verwendet. Sie können diese Daten jederzeit durch Leeren des Browser-Caches oder über die in den Werkzeugschnittstellen bereitgestellten Optionen löschen.",
   },
   {
    heading: "Informationen für Kinder",
    body: "Ein weiterer Teil unserer Priorität ist der Schutz von Kindern bei der Nutzung des Internets. Wir bitten Eltern und Erziehungsberechtigte, die Online-Aktivität ihrer Kinder zu beobachten, daran teilzunehmen und/oder sie zu überwachen und zu leiten.\n\nwordIzy erfasst wissentlich keine personenbezogenen Daten (Personal Identifiable Information) von Kindern unter 13 Jahren. Wenn Sie der Meinung sind, dass Ihr Kind diese Art von Informationen auf unserer Website angegeben hat, bitten wir Sie dringend, uns umgehend zu kontaktieren, und wir werden unser Bestes tun, um solche Informationen umgehend aus unseren Aufzeichnungen zu entfernen.",
   },
   {
    heading: "Nur Online-Datenschutzerklärung",
    body: "Diese Datenschutzerklärung gilt nur für unsere Online-Aktivitäten und ist für Besucher unserer Website in Bezug auf die Informationen gültig, die sie auf wordIzy geteilt und/oder gesammelt haben. Diese Richtlinie ist nicht auf Informationen anwendbar, die offline oder über andere Kanäle als diese Website erfasst werden.",
   },
   {
    heading: "Einwilligung",
    body: "Durch die Nutzung unserer Website stimmen Sie hiermit unserer Datenschutzerklärung zu und akzeptieren deren Allgemeine Geschäftsbedingungen.",
   },
  ],
  thirdPartyServices: [
    {
      name: "Google AdSense",
      description: "Liefert Werbung an die Besucher unserer Website. Verwendet Cookies (DART-Cookies), um Anzeigen basierend auf Ihren Besuchen auf wordizy.com und anderen Websites zu liefern. Sie können DART-Cookies ablehnen, indem Sie die Datenschutzerklärung des Google-Werbe- und Content-Netzwerks aufrufen.",
      url: "https://policies.google.com/technologies/ads",
    },
  ],
 },
 terms: {
  title: "Nutzungsbedingungen",
  intro: "Willkommen bei wordIzy (erreichbar über wordizy.com). Diese Nutzungsbedingungen (\"Bedingungen\") regeln Ihren Zugriff auf und Ihre Nutzung unserer Website, unserer Hilfswerkzeuge für Wortspiele, unserer Wörterbücher und unserer interaktiven Spiele wie Anagram Blitz (zusammenfassend die \"Dienste\").\n\nDurch den Zugriff auf oder die Nutzung von wordIzy erklären Sie sich mit diesen Bedingungen und unserer Datenschutzerklärung einverstanden. Wenn Sie diesen Bedingungen nicht zustimmen, nutzen Sie unsere Dienste bitte nicht.",
  lastUpdated: "Zuletzt aktualisiert: 28. Oktober 2026",
  sections: [
   {
    heading: "1. Beschreibung des Dienstes",
    body: "wordIzy bietet kostenlose Online-Worträtsel-Hilfswerkzeuge, Anagramm-Löser, Wörterbuch-Recherchen und wortbasierte Mini-Spiele. Alle Dienste werden auf \"As-is\"- und \"As-available\"-Basis ausschließlich für persönliche, nicht-kommerzielle Unterhaltungs- und Bildungszwecke bereitgestellt.",
   },
   {
    heading: "2. Erlaubte Nutzung und Beschränkungen",
    body: "Ihnen wird eine eingeschränkte, nicht-exklusive, nicht-übertragbare und widerrufliche Lizenz gewährt, auf wordIzy zuzugreifen und es strikt gemäß diesen Bedingungen zu nutzen.\nAls Bedingung für Ihre Nutzung erklären Sie sich damit einverstanden, Folgendes zu unterlassen:\n• Verwenden von automatisierten Systemen, Scrapern, Spidern, Robots oder Skripten, um Daten, Text oder Wortlisten aus unseren Datenbanken zu extrahieren.\n• Stören oder Unterbrechen der Leistung, Integrität oder Sicherheit der Website-Server.\n• Einrahmen oder Spiegeln eines Teils der Website ohne unsere vorherige schriftliche Genehmigung.\n• Verwenden unserer Hilfswerkzeuge für Wortspiele oder automatisierter Systeme, um in kompetitiven Online-Umgebungen zu betrügen, in denen externe Hilfswerkzeuge durch die jeweiligen Bedingungen dieser Plattformen ausdrücklich verboten sind.",
   },
   {
    heading: "3. Rechte an geistigem Eigentum",
    body: "Alle Inhalte, Funktionen, Merkmale, Logos, das Site-Design, Text und benutzerdefinierte Gaming-Software (einschließlich Anagram Blitz) auf wordIzy sind das exklusive Eigentum von wordIzy und sind durch internationale Urheberrechts-, Marken- und Gesetze zum geistigen Eigentum geschützt. Sie dürfen unser Eigentum ohne ausdrückliche schriftliche Zustimmung nicht reproduzieren, verbreiten, modifizieren oder davon abgeleitete Werke erstellen.",
   },
   {
    heading: "4. Marken von Drittanbietern und Haftungsausschluss",
    body: "Verweise auf Spiele von Drittanbietern, einschließlich, aber nicht beschränkt auf Scrabble, Wordle, Words With Friends, Wordfeud und Quordle, dienen ausschließlich Informations- und Beschreibungszwecken, um die Kompatibilität unserer Werkzeuge zu erklären. wordIzy ist eine unabhängige Plattform und ist nicht mit Hasbro, Mattel, The New York Times Company oder einem ihrer jeweiligen Mutterunternehmen oder Tochtergesellschaften verbunden, von ihnen befürwortet, autorisiert oder gesponsert.",
   },
   {
    heading: "5. Benutzerdaten und lokaler Speicher",
    body: "wordIzy erfordert keine Benutzerregistrierung oder Kontoerstellung. Funktionen wie die Save Vault nutzen den lokalen Speicher Ihres Webbrowsers (localStorage), um Konfigurationsstatus und Wortverlauf lokal auf Ihrem Gerät zu speichern. Wir übernehmen keine Verantwortung oder Haftung für Datenverluste, die durch das Leeren von Browser-Caches, Hardwareänderungen oder Browser-Updates entstehen.",
   },
   {
    heading: "6. Haftungsbeschränkungen",
    body: "In keinem Fall haftet wordIzy, seine Entwickler oder verbundene Unternehmen für direkte, indirekte, beiläufige, besondere oder Folgeschäden, die aus der Nutzung oder der Unmöglichkeit der Nutzung unserer Website entstehen, selbst wenn über die Möglichkeit solcher Schäden informiert wurde. Wir garantieren nicht, dass die Wortlisten, Berechnungen der Punktzahl oder die Konfigurationen der Wörterbuch-Hilfe völlig fehlerfrei sind oder mit Echtzeit-Patches der Spielwörterbücher übereinstimmen.",
   },
   {
    heading: "7. Änderungen des Dienstes und der Bedingungen",
    body: "Wir behalten uns das Recht vor, jederzeit ohne Vorankündigung jeden Aspekt unserer Dienste zu ändern, auszusetzen oder einzustellen. Wir behalten uns auch das Recht vor, diese Bedingungen nach unserem Ermessen zu ändern. Ihre fortgesetzte Nutzung von wordIzy nach Veröffentlichung von Aktualisierungen stellt Ihre Zustimmung zu den geänderten Bedingungen dar.",
   },
   {
    heading: "8. Anwendbares Recht",
    body: "Diese Bedingungen unterliegen den internationalen Digital-Commerce-Praktiken und sind in Übereinstimmung damit auszulegen, ohne Berücksichtigung von Grundsätzen des Kollisionsrechts.",
   },
   {
    heading: "9. Kontaktinformationen",
    body: "Wenn Sie Fragen oder Klarstellungen zu diesen Nutzungsbedingungen haben, kontaktieren Sie uns über unsere offizielle Kontaktseite.",
   },
  ],
 },
 sitemap: { title: "Sitemap", body: "Alle Seiten von WordIzy." },
 footer: { rights: "Alle Rechte vorbehalten.", madeWith: "Für Wortliebhaber gemacht.", links: "Schnelllinks", desc: "Kostenloser Entwirker und Löser in 9 Sprachen. Ohne Anmeldung.", disclaimer: "Für Unterhaltung und Wortspiele. Nicht verbunden mit Scrabble oder Wordle." },
 faq: {
  title: "Anleitung & FAQ",
  unscrambler: [
   { q: "Was ist ein Wort-Entwirker und wie benutze ich ihn?", a: "Ein Entwirker nimmt einen Buchstabensalat — z. B. ein Scrabble-Gestell (SRAABLC) — und findet jedes gültige Wörterbuchwort, das aus diesen Buchstaben gebildet werden kann. Tippe deine Buchstaben ins Feld »Deine Buchstaben« und klicke auf Entwirren. Die Ergebnisse erscheinen nach Wortlänge gruppiert (längste zuerst), jedes Wort zeigt seinen Scrabble-Punktwert. Ideal für Scrabble, Words With Friends, Wordfeud, Kreuzworträtsel und Anagramm-Puzzles." },
   { q: "Wie funktionieren Platzhalter (? und *)?", a: "Verwende ? oder * als Platzhalter, sobald du einen unbekannten Buchstaben hast — sie vertreten einen Scrabble-Blanko-Stein, ein leeres Kreuzworträtsel-Kästchen oder den noch unbestätigten Buchstaben in einem Wordle-Versuch. Die Eingabe »QUER?Y« weist WordIzy an, alle Wörter zu finden, die auf »QUER« + einen beliebigen Buchstaben + »Y« passen, und liefert QUERY direkt. Jeder Platzhalter zählt 0 Punkte (entspricht den offiziellen Blanko-Stein-Regeln), damit deine angezeigte Punktzahl realistisch bleibt, wenn du mit einem Blanko auf deinem Gestell spielst. Du kannst mehrere Platzhalter gleichzeitig verketten — »A??LE« liefert APPLE, ADDLE, AGILE, AISLE und ABLE — was Platzhalter zum idealen Werkzeug macht, um Anagramm-Möglichkeiten zu erkunden, wenn dein Gestell unvollständig ist. Halte Platzhalter auf ein bis zwei pro Abfrage begrenzt: jeder zusätzliche Platzhalter multipliziert die Ergebnismenge, und über drei hinaus siehst du Wörter, die von deinen echten Steinen gar nicht spielbar sind. Platzhalter funktionieren auch im Wordle-Löser, Anagramm-Löser und Wordfeud-Helfer mit gleicher Semantik, sodass du denselben Teilbuchstaben-Workflow über alle Werkzeuge der Site hinweg nutzen kannst." },
   { q: "Wie nutze ich die Erweiterten Filter?", a: "Klicke auf »Erweiterte Filter«, um drei optionale Felder einzublenden. »Beginnt mit« beschränkt die Ergebnisse auf Wörter, die mit den angegebenen Buchstaben beginnen (z. B. »AB« → nur Wörter, die mit AB beginnen). »Endet mit« macht das Gleiche für Suffixe (z. B. »ED« → nur Wörter auf ED). »Muss enthalten« garantiert, dass bestimmte Buchstaben in jedem Ergebnis vorkommen, an beliebiger Position. Kombiniere alle drei mit Platzhaltern für präzise Kontrolle." },
   { q: "Wie werden Wörter bewertet?", a: "Jedes Wort wird mit den offiziellen englischen Scrabble-Buchstabenwerten bewertet: A=1, B=3, C=3, D=2, E=1, F=4, G=2, H=4, I=1, J=8, K=5, L=1, M=3, N=1, O=1, P=3, Q=10, R=1, S=1, T=1, U=1, V=4, W=4, X=8, Y=4, Z=10. Platzhalter (? *) wirken als Blanko-Steine und zählen 0 Punkte, genau wie die offiziellen Regeln. WordIzy berechnet automatisch die Summe für jedes Ergebnis und sortiert sie nach Punkten innerhalb jeder Längengruppe, sodass die wertvollsten Züge oben in jeder Liste stehen — das erspart dir die Kopfrechnerei beim Addieren der Steinwerte und lässt dich den Bingo-Kandidaten auf einen Blick erkennen. Für andere Sprachen verwendet WordIzy die offiziellen Scrabble-Buchstabenwerte des jeweiligen Wörterbuchs (ODS9 für Französisch, FISE für Spanisch, Zingarelli für Italienisch, Portugiesisch, Deutsch, OpenTaal für Niederländisch sowie kuratierte Romaji- und Pinyin-Listen für Japanisch und Mandarin). Wechsle die Sprache über den Navbar-Selektor, um die lokalisierte Bewertung zu sehen. Echte Spielstand-Punktzahlen hängen auch von den Bonusfeldern (Buchstabe/Wort doppelt/dreifach) und dem +50-Bingo-Bonus für die Nutzung aller 7 Steine ab, also betrachte die angezeigte Punktzahl als Basiswert und addiere Boni gedanklich, wenn du deinen Zug planst." },
   { q: "Welche Wörterbücher sind verfügbar?", a: "WordIzy unterstützt 9 Sprachen: Englisch (NWL2023 + CSW21), Französisch (ODS9 2024), Spanisch (FISE), Italienisch (Zingarelli), Portugiesisch, Deutsch, Niederländisch (OpenTaal) sowie Japanisch (Romaji) und Mandarin (Pinyin). Alle Wörter werden gegen das offizielle Scrabble-Wörterbuch der jeweiligen Sprache gefiltert. Wechsle die Sprache über die Sprachauswahl in der Navigationsleiste." },
   { q: "Warum sind die Ergebnisse nach Länge gruppiert?", a: "Die Gruppierung nach Wortlänge erleichtert es, die Art Zug zu finden, die du brauchst. Bei Scrabble bringen längere Wörter meist mehr Punkte, doch manchmal passt ein kürzeres besser aufs Brett. Die längsten Wörter erscheinen oben, absteigend bis zu 2-Buchstaben-Wörtern. Innerhalb jeder Gruppe sind die Wörter nach Scrabble-Punkten sortiert, damit du den besten Zug schnell erkennst." },
  ],
  scramble: [
   { q: "Wozu dient der Wort-Mischer / -Löser?", a: "Dieses Werkzeug löst Buchstaben-Rätsel — bei denen die Buchstaben gemischt sind und du das/die ursprüngliche(n) Wort(e) finden musst. Gib die gemischten Buchstaben ein (z. B. RBOLENW) und klicke auf Auflösen, um alle echten Wörter zu sehen, die sich bilden lassen. Perfekt für Zeitungsanagramme, Wortspiele und Misch-Rätsel." },
   { q: "Worin unterscheidet sich das vom Entwirker?", a: "Der Löser nutzt denselben Motor wie der Entwirker, konzentriert sich aber auf das Lösen von Misch-Rätseln statt alle möglichen Wörter eines Gestells zu finden. Du kannst auch die Funktion »Wort mischen« unter der Eingabe nutzen, um ein Wort in zufällige Varianten zu mischen — nützlich, um eigene Rätsel zu erstellen." },
   { q: "Kann ich Platzhalter verwenden?", a: "Ja. Nutze ? oder * für unbekannte Buchstaben. Wenn ein Rätsel z. B. einen fehlenden Buchstaben hat, gib die bekannten Buchstaben plus ein ? ein und WordIzy füllt die Lücke mit allen gültigen Kombinationen." },
   { q: "Wie erstelle ich mein eigenes gemischtes Wort?", a: "Nutze die Karte »Wort mischen« unter der Haupteingabe. Tippe ein beliebiges Wort (z. B. »scrabble«) und klicke auf Generieren — WordIzy erzeugt mehrere zufällige Mischungen dieses Wortes. Nutze sie, um Rätsel für Freunde zu basteln oder das Entwirren zu üben." },
  ],
  wordle: [
   { q: "Wie funktioniert der Wordle-Löser?", a: "Der Wordle-Löser grenzt die heutige Wordle-Antwort anhand deines Spiel-Feedbacks ein. Gib die gesammelten Infos ein: grüne Buchstaben (richtige Position), gelbe Buchstaben (im Wort, aber falsche Position) und graue Buchstaben (nicht im Wort). Der Löser liefert alle gültigen Wörter, die deinen Bedingungen entsprechen." },
   { q: "Wie gebe ich platzierte (grüne) Buchstaben ein?", a: "Trage im Feld »Platzierte (grün)« die Buchstaben ein, von denen du weißt, dass sie an der richtigen Position stehen, mit . oder _ für leere Felder. Wenn du z. B. weißt, das Wort ist A _ _ L E, gib »A..LE« ein. Der Löser liefert nur Wörter, die genau auf dieses Muster passen." },
   { q: "Was sind gültige (gelbe) und ausgeschlossene (graue) Buchstaben?", a: "Gültige Buchstaben (gelb) sind Buchstaben, die im Wort, aber nicht an der geratenen Position sind — trage sie alle ins Feld »Gültige (gelb)« ein (z. B. »RST«). Ausgeschlossene Buchstaben (grau) sind bestätigt NICHT im Wort — trage sie unter »Ausgeschlossene (grau)« ein (z. B. »BXF«). Der Löser filtert jedes Wort, das ausgeschlossene Buchstaben enthält." },
   { q: "Welche Wortlänge soll ich verwenden?", a: "Wähle die Länge des heutigen Wordle (standardmäßig 5). WordIzy unterstützt 4- bis 8-buchstabige Wörter, funktioniert also auch für Varianten wie Quordle, Octordle und eigene Längen." },
   { q: "Tipps für den nächsten Tipp?", a: "Wähle aus den Ergebnissen ein Wort mit häufigen Buchstaben, die du noch nicht getestet hast (R, T, S, L, N). Das maximiert den Informationsgewinn. Bei langer Liste wähle ein Wort, das die meisten Möglichkeiten ausschließt. Der Löser zeigt die Scrabble-Punkte jedes Wortes — hohe Werte bedeuten oft seltene Buchstaben, die helfen, die Lösung einzugrenzen." },
  ],
  quordle: [
   { q: "Was ist der Quordle-Löser?", a: "Quordle ist ein Spiel, bei dem du vier Wordle gleichzeitig löst. Dieser Löser lässt dich Bedingungen für bis zu 4 Bretter gleichzeitig eingeben und liefert Kandidatenwörter für jedes. Jedes Brett behält eigene platzierte (grüne), gültige (gelbe) und ausgeschlossene (graue) Buchstaben." },
   { q: "Wie nutze ich mehrere Bretter?", a: "Fülle aus, was du für jedes Brett weißt. Die Bedingungen von Brett 1 beeinflussen nur dessen Ergebnisse. Klicke auf »Brett hinzufügen«, um bis zu 4 Bretter anzulegen. Mit der X-Schaltfläche entfernst du ein Brett. Wenn du bereit bist, klicke auf Lösen, um Kandidaten für alle Bretter zu erhalten." },
   { q: "Sollte ich Buchstaben zwischen den Brettern teilen?", a: "Ja — eine zentrale Quordle-Strategie ist es, einen Tipp zu nutzen, um Informationen über mehrere Bretter zu sammeln. Ist ein Buchstabe auf Brett 1 grün, ist er wahrscheinlich auch auf den anderen an derselben Position. Gib gemeinsame Bedingungen in jedes Brett ein, um Informationen zu kreuzen und alle vier Antworten schneller einzugrenzen." },
   { q: "Strategie-Tipps für Quordle?", a: "Starte mit einem Wort voller häufiger Buchstaben (wie CRANE oder SLATE), um auf allen Brettern Infos zu sammeln. Konzentriere dich zuerst auf das Brett mit den meisten Einschränkungen — es zu lösen, schafft mentalen Freiraum. Nutze den Löser nach 2-3 Tipps, wenn du genug Infos hast, um jedes Brett auf eine handhabbare Liste zu reduzieren." },
  ],
  anagram: [
   { q: "Was ist ein Anagramm?", a: "Ein Anagramm ist ein Wort oder Satz, das/der durch Umstellen aller Buchstaben eines anderen Wortes entsteht. So sind LISTEN und SILENT Anagramme — dieselben Buchstaben, andere Reihenfolge. Der Anagramm-Löser findet jedes Wort, das genau alle deine Buchstaben verwendet." },
   { q: "Worin unterscheidet sich das vom Entwirker?", a: "Der Entwirker findet Wörter JEGLICHER Länge aus deinen Buchstaben (auch kürzere). Der Anagramm-Löser findet nur Wörter, die ALLE deine Buchstaben nutzen — die vollständigen Anagramme. Mit »CHIEN« liefert der Anagramm-Löser z. B. CHIEN, CHINE, NICHE (alle 5 Buchstaben), während der Entwirker auch kürzere wie ICE, IN, HE liefern würde." },
   { q: "Kann ich Platzhalter verwenden?", a: "Ja. Nutze ? oder * als Platzhalter für die restlichen Felder. »CAT??« findet z. B. alle 5-Buchstaben-Anagramme, bei denen CAT mit zwei beliebigen Buchstaben kombiniert wird. Platzhalter zählen 0 Punkte (wie Blankos)." },
   { q: "Wofür sind Anagramme nützlich?", a: "Anagramme werden in Wortspielen, Puzzles, Kryptografie und Linguistik verwendet. Beim Scrabble hilft es, Anagramme des eigenen Gestells zu kennen, um Bingos zu erkennen (alle 7 Steine für 50 Punkte Bonus). Sie sind auch beliebt in Kreuzwort-Hinweisen, Trivia und Denksportaufgaben." },
  ],
  random: [
   { q: "Was macht der Zufallswort-Generator?", a: "Er erzeugt zufällige echte Wörter aus dem gewählten Wörterbuch, mit optionalen Filtern. Du kannst Wortlänge, Anfangsbuchstaben, Endbuchstaben oder Buchstaben, die daswort enthalten muss, festlegen. Nutze ihn für Spiele, kreatives Schreiben, Namensfindung, Vokabel-Training oder um Passwörter aus echten Wörtern zu erzeugen." },
   { q: "Wie filtere ich die Zufallswörter?", a: "Setze »Länge« auf eine konkrete Zahl (2-12) oder lass sie auf »Beliebig«. »Beginnt mit« beschränkt auf Wörter mit diesen Anfangsbuchstaben. »Endet mit« auf Wörter mit diesen Endbuchstaben. »Enthält« verlangt, dass daswort bestimmte Buchstaben irgendwo enthält. »Wie viele« steuert die Anzahl erzeugter Wörter (1-200)." },
   { q: "Sind die Wörter gültige Scrabble-Wörter?", a: "Ja. Alle erzeugten Wörter stammen aus dem offiziellen Scrabble-Wörterbuch der gewählten Sprache (NWL2023/CSW21 für Englisch, ODS9 für Französisch usw.). Jedes Wort ist in Scrabble und anderen Wortspielen spielbar." },
   { q: "Kann ich das für Wortspiele verwenden?", a: "Absolut. Erzeuge Zufallswörter für Pictionary, Scharade, Wortassoziation oder Vokabel-Quiz. Für Passwörter kombiniere 3-4 Zufallswörter unterschiedlicher Länge — das ergibt einprägsame, aber sichere Passphrasen." },
  ],
  wordfeud: [
   { q: "Was ist die Wordfeud-Hilfe?", a: "Wordfeud ist ein beliebtes mobiles Wortspiel ähnlich wie Scrabble. Diese Hilfe findet die besten Wörter, die du aus deinem Gestell spielen kannst. Gib deine 7 Buchstaben (plus eventuelle Brett-Buchstaben) ein und WordIzy liefert alle spielbaren Wörter, sortiert nach Scrabble-Punkten." },
   { q: "Wie gebe ich mein Gestell ein?", a: "Tippe deine 7 Buchstaben ins Feld »Deine Buchstaben«. Nutze ? oder * für Blankos (sie vertreten jeden Buchstaben, zählen aber 0 Punkte). Wenn es schon Buchstaben auf dem Brett gibt, an die du anknüpfen willst, füge sie hinzu — WordIzy findet Wörter aus dem kombinierten Pool." },
   { q: "Welches Wörterbuch soll ich verwenden?", a: "Wordfeud unterstützt je nach Region mehrere Wörterbücher. Das englische Wordfeud nutzt eine Scrabble-ähnliche Liste, daher passt Englisch (NWL2023/CSW21). Für andere Sprachen wähle das passende (Französisch ODS9, Spanisch FISE usw.) in der Sprachauswahl." },
   { q: "Wie werden die Punkte berechnet?", a: "Die Punkte nutzen die offiziellen Scrabble-Buchstabenwerte der gewählten Sprache. Hinweis: Die tatsächliche Wordfeud-Wertung kann leicht abweichen (Bonusfelder und eigene Steine-Verteilung). Nutze die Punkte als Orientierung, um wertvolle Züge zu erkennen — das Wort mit den meisten Punkten aus deinem Gestell ist meist dein bester Zug." },
  ],
  dictionary: [
   { q: "Was macht Wörterbuch prüfen?", a: "Gib ein beliebiges Wort ein, um zu prüfen, ob es im offiziellen Scrabble-Wörterbuch der gewählten Sprache gültig ist. Das Werkzeug zeigt das Wort als Scrabble-Steine, ein gültig/ungültig-Badge, die Scrabble-Punkte, Wortlänge, Buchstaben-Steine, eine Wörterbuchdefinition und (falls verfügbar) Synonyme." },
   { q: "Woher kommen die Definitionen?", a: "Definitionen stammen aus mehreren Quellen: der Free Dictionary API (Englisch, Französisch, Spanisch, Deutsch, Italienisch, Portugiesisch), Wiktionary (alle Sprachen als Fallback) und einem KI-Assistenten für verbleibende Lücken. Die Quelle ist neben jeder Definition angegeben." },
   { q: "Woher kommen die Synonyme?", a: "Synonyme kommen von Datamuse (Englisch, Spanisch, Französisch, Italienisch, Portugiesisch) und OpenThesaurus (Deutsch). Es werden nur Synonyme gezeigt, die selbst gültige Scrabble-Wörter sind — klicke auf ein Synonym, um es sofort zu prüfen." },
   { q: "Warum könnte ein häufiges Wort ungültig sein?", a: "Scrabble-Wörterbücher sind streng — sie schließen Eigennamen, Abkürzungen, Bindestrichwörter und Wörter mit Apostroph aus. »BRUNCH« ist z. B. gültig, »BRUNCH'S« vielleicht nicht. Wenn ein Wort zu fehlen scheint, ist es vielleicht ein großgeschriebener Eigenname oder eine aktuelle Ergänzung, die noch nicht in der offiziellen Liste steht. Wechsle die Sprache, um das Wort in einem anderen Wörterbuch zu prüfen." },
  ],
  scrabble: [
   { q: "Was ist Scrabble Duplicate?", a: "Duplicate-Scrabble ist eine Variante, bei der jeder Spieler dasselbe Gestell erhält und den bestmöglichen Zug finden muss. Es wird in Turnieren und Training genutzt, um Können ohne Glück zu testen. Dieses Werkzeug hilft dir, die punktereichsten Wörter aus deinem Gestell zu finden — gib deine 7 Buchstaben und optional Brett-Buchstaben ein und klicke auf »Beste Wörter finden«." },
   { q: "Wie gebe ich Brett-Buchstaben ein?", a: "Wenn es schon Buchstaben auf dem Brett gibt, an die du anknüpfen kannst, tippe sie zusammen mit deinen Gestell-Buchstaben ins Feld »Brett-Buchstaben (optional)«. WordIzy behandelt den kombinierten Pool als verfügbare Buchstaben. So findest du Wörter, die an bestehende Züge andocken — wichtig, um in echten Partien die Punktzahl zu maximieren." },
   { q: "Wie werden die Top-Züge gerankt?", a: "Die Wörter sind nach Scrabble-Punkten sortiert (höchste zuerst). Die Top-10-Züge erscheinen oben in einer hervorgehobenen Liste. Achtung: Tatsächliche Spiel-Punkte hängen auch von Bonusfeldern (Buchstabe/Wort doppelt/dreifach) und Bingos (50-Punkte-Bonus für alle 7 Steine) ab. Nutze die Punktzahlen des Werkzeugs als Basis und beziehe dann die Brett-Position ein." },
   { q: "Was ist ein Bingo und wie finde ich einen?", a: "Ein Bingo ist der größte einzelne Schwung im Scrabble: das Spielen aller 7 Steine in einem Zug bringt einen +50-Bonus zusätzlich zur Grundpunktzahl des Wortes, sodass ein 30-Punkte-Wort zu einem 80-Punkte-Zug wird. Um Bingos mit WordIzy zu finden, gib dein vollständiges 7-Buchstaben-Gestell ein (verwende ? oder * für Blanko-Steine) und schau in die 7-Buchstaben-Ergebnisgruppe oben in der Liste — jedes Wort dort ist ein potenzielles Bingo. Die hochwertigsten 7-Buchstaben-Bingos im englischen Scrabble sind MUZJIKS (29 Basis + 50 = 79 Punkte), JACUZZI (34 + 50 = 84), SYZYGY (21 + 50 = 71), OXAZOLIDINE (selten, aber verheerend) und die Stämme ANATOMIZ-, ANTISOCIAL-, OVERLAPPING-, die geläufige Suffixe akzeptieren. Um Bingos schneller zu erkennen, lerne die hochwertigen Stämme — SATISFI-, ANTISOY-, OVERLAP- — die sich mit -ER, -ED, -ING, -ATION kombinieren. Halte ein oder zwei flexible Buchstaben (E, R, S, T) zurück, wenn dein Gestell Bingo-Form hat, denn der Bingo-Bonus (+50) wiegt fast immer schwerer als die Punkte, die du durch frühes Ablegen dieser Steine gewinnst." },
  ],
  wordlists: [
   { q: "Was ist die Seite Wortlisten?", a: "Wortlisten lässt dich jedes gültige Scrabble-Wort von 2 bis 7 Buchstaben durchsuchen. Wörter sind nach Länge und dann nach Endbuchstabe (A-Z) gruppiert, damit du das Wörterbuch systematisch erkunden kannst. Nutze sie zum Studieren, zum Finden von Wörtern für Partien oder zum Erweitern deines Wortschatzes." },
   { q: "Wie filtere ich nach Länge?", a: "Nutze oben den Längen-Selector (2-7). Klicke auf »Alle«, um alle Längen gestapelt zu sehen (2-Buchstaben oben, 7-Buchstaben unten), oder auf eine Zahl, um nur diese Länge zu sehen. Jeder Längen-Abschnitt zeigt 26 Container (einen pro Endbuchstabe A-Z)." },
   { q: "Wie filtere ich nach Buchstabe?", a: "Nutze die A-Z-Reihe unter dem Längen-Selector. Klicke auf einen Buchstaben, um nur Wörter zu zeigen, die damit enden, oder auf »Alle«, um jeden Buchstaben zu sehen. Hilfreich, um Wörter zu finden, die an einen bestimmten Buchstaben auf dem Brett andocken." },
   { q: "Warum werden die Wörter großgeschrieben?", a: "Scrabble-Steine sind groß, daher werden die Wörter passend groß angezeigt. Jedes Wort zeigt seinen Scrabble-Wert daneben. Innerhalb jedes Buchstaben-Containers sind die Wörter alphabetisch (A-Z) sortiert für leichtes Überfliegen." },
  ],
  wordstarts: [
   { q: "Was ist die Seite Beginnt Mit?", a: "Diese Seite lässt dich alle gültigen Scrabble-Wörter durchsuchen, die MIT einem bestimmten Buchstaben BEGINNEN. Wähle einen Buchstaben (A-Z) und WordIzy zeigt jedes Wort, das damit beginnt, gruppiert nach Länge (2-7 Buchstaben). Perfekt, um Eröffnungen zu studieren und Wörter zu finden, die an einen Anfangsbuchstaben auf dem Brett anknüpfen." },
   { q: "Wie nutze ich die Längen- und Buchstaben-Selectoren?", a: "Wähle zuerst einen Buchstaben aus der A-Z-Reihe — das legt den Anfangsbuchstaben fest. Nutze dann die Längen-Reihe (2-7 oder Alle), um nach Wortlänge zu filtern. Jeder Längen-Abschnitt zeigt alle Wörter, die mit dem gewählten Buchstaben beginnen, alphabetisch sortiert. Klicke in einer der Reihen auf »Alle«, um diesen Filter zu entfernen." },
   { q: "Wie ist das für Scrabble nützlich?", a: "Zu wissen, welche Wörter mit jedem Buchstaben beginnen, hilft beim Planen von Eröffnungen und Anknüpfungen. Hast du ein Q, hilft es, alle Q-Wörter (QI, QAT, QUAD...) zu kennen, um es wirksam zu spielen. Die Seite ist auch wertvoll für Kreuzworträtsel, wo Hinweise oft »beginnt mit...« angeben." },
   { q: "Warum bei 50 Wörtern paginieren?", a: "Manche Buchstaben (wie S, A, E) haben Tausende Anfangswörter. Damit die Seiten schnell und lesbar bleiben, paginieren die Ergebnisse mit 50 Wörtern pro Seite und Vor-/Zurück-Schaltflächen. Jede Seite zeigt Seitennummer und Gesamtseiten, damit du weißt, wo du bist." },
  ],
  wordends: [
   { q: "Was ist die Seite Endet Mit?", a: "Diese Seite lässt dich alle gültigen Scrabble-Wörter durchsuchen, die MIT einem bestimmten Buchstaben ENDEN. Wähle einen Buchstaben (A-Z) und WordIzy zeigt jedes Wort, das damit endet, gruppiert nach Länge (2-7 Buchstaben). Ideal, um Wörter zu finden, die an einen bestehenden Buchstaben auf dem Brett andocken." },
   { q: "Wie nutze ich die Längen- und Buchstaben-Selectoren?", a: "Wähle zuerst einen Buchstaben aus der A-Z-Reihe — das legt den Endbuchstaben fest. Nutze dann die Längen-Reihe (2-7 oder Alle), um nach Wortlänge zu filtern. Jeder Längen-Abschnitt zeigt alle Wörter, die auf den gewählten Buchstaben enden, alphabetisch sortiert. Klicke in einer der Reihen auf »Alle«, um diesen Filter zu entfernen." },
   { q: "Wie ist das für Scrabble nützlich?", a: "Endbuchstaben zählen für Anknüpfungen — ist ein S auf dem Brett, hilft es, alle Wörter auf S zu kennen, um zu pluralisieren oder Züge zu erweitern. Ebenso helfen Wörter auf D, ED, ING, um an häufige Suffixe anzudocken. Diese Seite ist ein mächtiges Trainingswerkzeug für den Wettkampf." },
   { q: "Warum bei 50 Wörtern paginieren?", a: "Manche Buchstaben (wie E, S, D) haben Tausende Endwörter. Damit die Seiten schnell und lesbar bleiben, paginieren die Ergebnisse mit 50 Wörtern pro Seite und Vor-/Zurück-Schaltflächen. Jede Seite zeigt Seitennummer und Gesamtseiten, damit du weißt, wo du bist." },
  ],
  vault: [
   { q: "Was ist der Speichertresor?", a: "Der Speichertresor ist ein eingebautes Vokabel-Trainingswerkzeug für kompetitive Scrabble- und Wordle-Spieler — eine persönliche Wort-Lesezeichenliste, die eigens für das Spaced-Repetition-Lernen schwieriger Buchstabenkombinationen entwickelt wurde. Anders als generische Browser-Lesezeichen zeigt der Tresor die Scrabble-Punktzahl jedes gespeicherten Wortes sichtbar an und lässt dich die ganze Liste direkt in eine Karteikarten-App oder einen Anki-Stapel kopieren, um offline zu üben. Hier ist der 4-Schritt-Workflow, den kompetitive Spieler nutzen: (1) Führe eine Abfrage wie »7-Buchstaben-Wörter aus QUARTZE« oder »Wörter beginnend mit Q« aus und markiere die hochwertigen Wörter, die du immer wieder vergisst — QAT, QOPH, FAQIR, MUZJIKS. (2) Öffne die Tresor-Schublade über das Sternsymbol oben rechts im Header; deine gespeicherten Wörter bleiben in einer einzigen Liste organisiert, mit der Live-Punktzahl neben jedem Eintrag. (3) Klicke auf »Alle Zeilen kopieren«, um die Liste in Anki, Quizlet oder eine druckbare Karteikartenvorlage einzufügen und am Bildschirm vorbei mit Spaced Repetition zu wiederholen. (4) Führe dieselbe Abfrage nächste Woche nochmal aus und vergleiche, welche Wörter du memoriert hast — deine gespeicherte Liste bleibt lokal im localStorage deines Browsers, verlässt nie dein Gerät, braucht keinen Account und funktioniert offline, sobald die Seite geladen ist." },
   { q: "Wie speichere ich ein Wort im Tresor?", a: "Klicken Sie auf das Sternsymbol (☆) neben einem Wort in den Ergebnissen. Der Stern wird bernsteinfarben (★), wenn ein Wort gespeichert ist. Klicken Sie erneut, um das Wort aus Ihrem Tresor zu entfernen." },
   { q: "Wie sehe ich meine gespeicherten Wörter?", a: "Klicken Sie auf das Sternsymbol in der Kopfzeile der Website (obere rechte Ecke). Eine Schublade öffnet sich von rechts und zeigt alle Ihre gespeicherten Wörter. Sie können einzelne Wörter kopieren, die gesamte Liste kopieren oder den Tresor leeren." },
   { q: "Wird mein Tresor zwischen Geräten synchronisiert?", a: "Nein — der Tresor wird im localStorage Ihres Browsers gespeichert, also gerätespezifisch. Wenn Sie Ihre Browserdaten löschen oder ein anderes Gerät verwenden, wird Ihr Tresor nicht übertragen. Kein Konto erforderlich und keine Daten verlassen Ihr Gerät." },
  ],
 },
 blitz: {
  loadingEngine: "Puzzle-Motor wird geladen...",
  completed: "Abgeschlossen",
  todaysPuzzleSolved: "📅 Rätsel von heute gelöst!",
  alreadyPlayed: "Sie haben Ihren täglichen Versuch bereits verwendet! Kommen Sie morgen um Mitternacht für eine neue Herausforderung zurück.",
  playInfinite: "Endlosen Übungsmodus spielen",
  challengeTitle: "⚡ Anagram Blitz Herausforderung",
  challengeDesc: "Entschlüsseln Sie Wörter in 60 Sekunden aus unseren Scrabble-Wörterbüchern.",
  startToday: "Heutiges Rätsel starten",
  playInfiniteBtn: "Endlos üben",
  timesUp: "⏱️ Zeit ist um! Spiel vorbei",
  finalScore: "Endpunktzahl:",
  points: "Punkte.",
  playAgain: "🔄 Nochmal üben",
  dailyLocked: "Ihr täglicher Versuch ist gesperrt. Bis morgen!",
  returnMenu: "Zum Menü",
  timeLeft: "s",
  totalScore: "Pkt",
  generating: "🎲 Wort wird generiert...",
  hint: "💡 Tipp:",
  waiting: "Warten...",
  typeWord: "Wort eingeben...",
  skipReveal: "🏳️ Überspringen & Aufdecken",
  stopGame: "🛑 Stopp",
  wrong: "❌ Falsche Antwort! Versuche es noch einmal.",
  play: "▶ Spielen",
  correct: "✨ Perfekt! Richtige Antwort!",
  answerWas: "Die Antwort war:",
  challengeFriend: "Freund herausfordern",
  challengeText: "Ich habe {score} Punkte bei WordIzy Anagram Blitz erzielt — schlägst du mich? Kostenlos spielen: https://wordizy.com/blitz",
  // SEO-Inhaltsabschnitt (unter der Spielkarte)
  pageHeading: "Spiele Anagram Blitz — Gratis 60-Sekunden-Wortspiel",
  howToPlayTitle: "So spielen Sie Anagram Blitz",
  howToPlayDesc: "Anagram Blitz ist ein schnelles 60-Sekunden-Anagramm-Spiel. Sie erhalten ein durcheinandergebrachtes Buchstaben-Set und müssen diese neu anordnen, um ein gültiges Wörterbuchwort zu bilden. Jede richtige Antwort bringt 20 Punkte; jedes Überspringen kostet 5 Punkte. Schlagen Sie Ihren Highscore und steigen Sie in der täglichen Rangliste auf.",
  gameModesTitle: "Spielmodi",
  dailyModeName: "Tägliche Herausforderung",
  dailyModeDesc: "Ein Rätsel pro Tag. Spielen Sie einmal und sichern Sie Ihre Punktzahl für die Rangliste.",
  infiniteModeName: "Endlose Übung",
  infiniteModeDesc: "Unbegrenzte Rätsel. Jede richtige Antwort fügt der Uhr 10 Bonussekunden hinzu.",
  tipsTitle: "Tipps & Strategie",
  tip1: "Suchen Sie nach typischen deutschen Endungen : -EN (Plural/Infinitiv), -ER (Komparativ/Nomen agentis), -UNG (Verbalsubstantive), -CHT (wie in MACHT, NACHT).",
  tip2: "Das E ist im Deutschen mit 75 % der häufigste Buchstabe — testen Sie Wörter mit E, besonders in der Endposition (Flexionsendung).",
  tip3: "Die Buchstabenkombinationen CH, SCH, CK sind spezifisch für das Deutsche und sehr häufig — testen Sie H, wenn Sie unsicher sind.",
  tip4: "Deutsche Doppelkonsonanten (LL, TT, SS, RR) sind häufig — wenn Sie eine grüne Position haben, prüfen Sie, ob das nächste Zeichen gleich sein könnte.",
  blitzFooter: "Anagram Blitz verwendet offizielle Scrabble-Wörterbücher (DE_FILTERED für Deutsch, NWL2023 + CSW21 für Englisch) mit Mehrsprachunterstützung für 9 Sprachen. Kostenlos spielen, keine Anmeldung erforderlich.",
 },
 ui: {
  advertisement: "Werbung",
  featuredGuide: "Empfohlener Leitfaden",
  saveVaultFaqTitle: "Speichertresor — So verwenden Sie ihn",
  relatedTools: "Verwandte Werkzeuge",
  published: "Veröffentlicht:",
  backToHome: "Zurück zur Startseite",
  somethingWrong: "Etwas ist schiefgegangen",
  tryAgain: "Erneut versuchen",
  reloadPage: "Seite neu laden",
  returnLabel: "Zurück",
  allCopied: "Alle Wörter kopiert!",
  showLess: "Weniger anzeigen",
  showMore: "Mehr anzeigen",
  enterPassword: "Passwort eingeben",
  totalSearches: "Suchanfragen gesamt",
  topQuery: "Top-Suchanfrage",
  topTool: "Top-Werkzeug",
  topLanguage: "Top-Sprache",
  newDailyChallenge: "Neue tägliche Herausforderung",
  scrambleFeatureHint: "Verwenden Sie die Funktion Wort mischen unten, um eigene Rätsel zu erstellen.",
  wordList: "Wortliste",
  copiedToClipboard: "In die Zwischenablage kopiert!",
 },
 hubPages: {
  startsSubtitle: "Durchsuchen Sie jedes gültige Scrabble-Wort, das mit jedem Buchstaben des Alphabets beginnt, von 2 bis 15 Buchstaben.",
  endsSubtitle: "Durchsuchen Sie jedes gültige Scrabble-Wort, das mit jedem Buchstaben des Alphabets endet, von 2 bis 15 Buchstaben.",
  lengthSubtitle: "Durchsuchen Sie jedes gültige Scrabble-Wort nach Länge, von 2 bis 15 Buchstaben. Jede Länge hat ihre eigene dedizierte Seite.",
  wordleStartsSubtitle: "Durchsuchen Sie jedes gültige Wordle-Wort, das mit jedem Buchstaben des Alphabets beginnt. Perfekt, um die besten Startwörter zu finden und Ihr tägliches Puzzle einzugrenzen.",
  wordleEndsSubtitle: "Durchsuchen Sie jedes gültige Wordle-Wort, das mit jedem Buchstaben des Alphabets endet. Perfekt, um Haken, Suffixe zu finden und Ihr tägliches Puzzle einzugrenzen.",
  startsHeading: "Wörter, die beginnen mit — A bis Z",
  endsHeading: "Wörter, die enden mit — A bis Z",
  lengthHeading: "Entschlüsseln nach Wortlänge (2–15 Buchstaben)",
  wordleStartsHeading: "Wordle-Wörter, die beginnen mit — A bis Z",
  wordleEndsHeading: "Wordle-Wörter, die enden mit — A bis Z",
  clickLetterStarts: "Klicken Sie auf einen Buchstaben, um alle Wörter, die mit diesem Buchstaben beginnen, auf einer dedizierten Seite zu durchsuchen.",
  clickLetterEnds: "Klicken Sie auf einen Buchstaben, um alle Wörter, die mit diesem Buchstaben enden, auf einer dedizierten Seite zu durchsuchen.",
  clickLength: "Klicken Sie auf eine Zahl, um alle Wörter dieser Länge auf einer dedizierten Seite zu durchsuchen.",
  clickLetterWordleStarts: "Klicken Sie auf einen Buchstaben, um alle Wordle-Wörter, die mit diesem Buchstaben beginnen, auf einer dedizierten Seite zu durchsuchen.",
  clickLetterWordleEnds: "Klicken Sie auf einen Buchstaben, um alle Wordle-Wörter, die mit diesem Buchstaben enden, auf einer dedizierten Seite zu durchsuchen.",
  wordleStartsBadge: "Wordle beginnt",
  wordleEndsBadge: "Wordle endet",
  wordleStartsTitle: "Wordle-Wörter, die beginnen mit A-Z",
  wordleEndsTitle: "Wordle-Wörter, die enden mit A-Z",
  returnHome: "Zurück zur Startseite",
  footerNote: "Alle Wörter werden durch offizielle Scrabble-Wörterbücher gefiltert.",
  searchPlaceholderStarts: "Tippen Sie einen Buchstaben A-Z, um Wörter, die damit beginnen, zu durchsuchen…",
  searchPlaceholderEnds: "Tippen Sie einen Buchstaben A-Z, um Wörter, die damit enden, zu durchsuchen…",
  searchPlaceholderLength: "Tippen Sie eine Zahl 2-15, um nach Länge zu durchsuchen…",
  searchPlaceholderWordleStarts: "Tippen Sie einen Buchstaben A-Z, um Wordle-Wörter, die damit beginnen, zu durchsuchen…",
  searchPlaceholderWordleEnds: "Tippen Sie einen Buchstaben A-Z, um Wordle-Wörter, die damit enden, zu durchsuchen…",
  browseBtn: "Durchsuchen",
 },
 wordListPage: {
  loading: "Verifizierte Wortlisten werden geladen…",
  filterPlaceholder: "Wörter filtern…",
  filterLabel: "Wörter filtern",
  clearFilter: "Filter löschen",
  loadMore: "Mehr laden",
  remaining: "verbleibend",
  allLengths: "Alle",
  filterByLength: "Nach Wortlänge filtern",
  noMatch: "Keine Wörter entsprechen Ihrem Filter.",
  noWords: "Keine Wörter gefunden.",
  wordsCount: "Wörter",
  error: "Wörter konnten nicht geladen werden. Bitte aktualisieren Sie die Seite.",
 },
};

const it: Translation = {
 nav: {
  unscrambler: "Anagrammatore", scramble: "Mischia", wordle: "Wordle",
  quordle: "Quordle", anagram: "Anagrammi", random: "Parola Casuale",
  wordfeud: "Wordfeud", dictionary: "Verifica Diz.", scrabble: "Duplicate",
  wordlists: "Liste Parole", wordstarts: "Parole Iniziano Per", wordends: "Parole Finiscono Per", wordlestarts: "Wordle Inizia A-Z", wordleends: "Wordle Finisce A-Z", about: "Info", contact: "Contatti", privacy: "Privacy", terms: "Termini di servizio",
  sitemap: "Mappa", tools: "Strumenti", more: "Altro", solvers: "Risolutori", site: "Sito", wordlab: "Lab delle Parole", inbox: "Posta in arrivo",
  dashboard: "Cruscotto",blitz: "⚡ Anagramma Blitz", blitzShort: "Blitz"
 },
 brand: { name: "wordIzy", tagline: "Riordina. Risolvi. Vinci." },
 common: {
  yourLetters: "Le tue lettere", unscramble: "Anagramma", clear: "Pulisci", advancedFilters: "Filtri avanzati",
  startsWith: "Inizia per", endsWith: "Finisce per", mustInclude: "Deve contenere", dictionaryLabel: "Dizionario",
  results: "Risultati", noResults: "Nessuna parola. Prova altre lettere o aggiungi jolly (? o *).",
  wordsFound: "parole trovate", points: "pt", length: "lettere", loading: "Caricamento…", search: "Cerca",
  copy: "Copia", copied: "Copiato!", tryExamples: "Prova:", tipsTitle: "Suggerimenti e funzionamento",
  tileValues: "Valori tessere Scrabble", blanks: "Jolly", languageLabel: "Lingua",
  showMore: "Mostra di più", showLess: "Mostra meno", allWords: "Tutte le parole", perGroup: "per gruppo",
  wordsCount: "parole", reset: "Reimposta", apply: "Applica", solve: "Risolvi", generate: "Genera",
  check: "Verifica", example: "Esempio", none: "Nessuno", optional: "facoltativo",
 },
 home: {
  title: "Anagrammatore di Parole", subtitle: "Inserisci le lettere mescolate, aggiungi jolly con ? o *, e trova ogni parola giocabile — raggruppata per lunghezza e ordinata per punteggio Scrabble.",
  heroBadge: "Gratis • Senza registrazione • 9 lingue",
  faqTitle: "Domande frequenti",
  q1: "A cosa serve un anagrammatore?",
  a1: "Prende un insieme di lettere (come una rastrelliera Scrabble) e trova ogni parola valida del dizionario formabile con quelle lettere. Ideale per Scrabble, Wordfeud, cruciverba e puzzle di anagrammi.",
  q2: "Come uso le opzioni avanzate?",
  a2: "Dopo aver digitato le lettere, apri Filtri avanzati. «Inizia per» limita alle parole con quel prefisso, «Finisce per» ai suffissi, «Deve contenere» garantisce certe lettere. Combina con jolly (? o *) per lettere ignote.",
  q3: "Come funziona?",
  a3: "WordIzy confronta le tue lettere con un dizionario completo in memoria per la lingua scelta, verifica quali parole sono formabili (? e * come jolly), applica i filtri, assegna il punteggio Scrabble ufficiale e raggruppa per lunghezza — prima le più lunghe.",
  q4: "Quali lingue sono supportate?",
  a4: "Inglese, francese, spagnolo, italiano, portoghese, tedesco, olandese, più giapponese (romaji) e mandarino (pinyin). Cambia dizionario dal selettore lingua.",
 },
 scramble: { title: "Mischia / Risolvi parole", subtitle: "Bloccato in un puzzle? Inserisci le lettere mescolate e le risolveremo in parole reali.", inputLabel: "Lettere mescolate", btn: "Risolvi", solutionLabel: "Soluzioni possibili", hint: "Usa ? o * per lettere ignote." },
 wordle: { title: "Ris. Wordle", subtitle: "Restringi il Wordle di oggi: lettere verdi in posizione, gialle note, grigie da escludere.", length: "Lunghezza", placed: "Posizionate (verde)", valid: "Valide (giallo)", excluded: "Escluse (grigio)", btn: "Risolvi", hint: "Usa . o _ per spazi, es. A..LE" },
 quordle: { title: "Ris. Quordle", subtitle: "Risolvi fino a quattro Wordle insieme. Ogni tabellone ha i suoi vincoli.", board: "Tabellone", addBoard: "Aggiungi tabellone", hint: "Compila ciò che sai e risolvi." },
 anagram: { title: "Ris. Anagrammi", subtitle: "Trova ogni anagramma delle tue lettere — parole che usano esattamente tutte le lettere.", btn: "Trova anagrammi", hint: "I jolly (? *) completano." },
 random: { title: "Generatore di Parole Casuali", subtitle: "Genera parole reali casuali con filtri di lunghezza, prefisso, suffisso e contenuto.", length: "Lunghezza", any: "Qualsiasi", count: "Quante", btn: "Genera" },
 wordfeud: { title: "Aiuto Wordfeud", subtitle: "Trova le migliori parole Wordfeud dalla tua rastrelliera. Scegli il dizionario.", btn: "Trova parole", hint: "Aggiungi ? o * per tessere vuote." },
 dictionary: { title: "Verifica Dizionario", subtitle: "Verifica se una parola esiste, vedi il punteggio Scrabble e una definizione.", btn: "Verifica", exists: "è una parola valida", notExists: "non trovata nel dizionario", definition: "Definizione", score: "Punteggio Scrabble", tiles: "Tessere" },
 scrabble: { title: "Scrabble Duplicate", subtitle: "Il duplicate dà a tutti la stessa rastrelliera. Inserisci 7 lettere (più quelle in tabellone) e trova le mosse migliori.", rack: "La tua rastrelliera", board: "Lettere tabellone (facoltative)", btn: "Trova le migliori", hint: "Jolly ammessi. Risultati per punteggio." },
 wordlists: { title: "Liste Parole", subtitle: "Sfoglia tutte le parole da 2 a 7 lettere. Scegli vista, lunghezza e lettera per esplorare A–Z.", allWords: "Tutte le parole", startsBy: "Inizia per A–Z", endsBy: "Finisce per A–Z", letter: "Lettera", selectLength: "Lunghezza", selectLetter: "Lettera", browse: "Sfoglia" },
 about: {
  title: "Informazioni su wordIzy",
  intro: "Benvenuto su wordIzy, la tua destinazione di riferimento per utilità di giochi di parole ad alte prestazioni, risolutori di anagrammi e risorse educative per enigmi. Realizzato da un team dedicato di sviluppatori indipendenti e appassionati di enigmi lessicali di sempre, wordIzy è stato progettato fin dall'inizio per essere la suite di strumenti di dizionario più veloce, pulita e priva di distrazioni sul Web.",
  sections: [
   {
    heading: "La nostra missione",
    body: "La nostra missione è aiutare i giocatori ad ampliare il proprio vocabolario, allenare la mente e risolvere dispute amichevoli di enigmi con assoluta precisione. Crediamo che i risolutori di parole non debbano essere ingombrati da layout intrusivi, tempi di caricamento lenti o configurazioni complicate. Ecco perché wordIzy offre calcoli istantanei, dizionari di Scrabble localizzati in più lingue e motori di filtraggio personalizzati e intuitivi, pensati per un uso quotidiano senza intoppi.",
   },
   {
    heading: "Perché scegliere wordIzy?",
    body: "A differenza delle semplici tabelle di ricerca generiche, i nostri strumenti sono su misura per corrispondere alle meccaniche esatte dei giochi di parole più popolari al mondo:\n• Database di dizionari completi: Supportiamo 9 lingue, filtrando le vostre lettere direttamente con i lessici di competizione ufficiali come Zingarelli (italiano), NWL2023 e CSW21.\n• Logica di gioco realistica: Il nostro sistema avanzato di filtraggio dei jolly riconosce regole come le distribuzioni delle tessere vuote di Scrabble, assegnando veri valori a zero punti per permettervi di pianificare mosse precise di livello da torneo.\n• Strumenti didattici innovativi: Funzionalità uniche come la nostra Save Vault salvata localmente funzionano come gestore personale di schede didattiche, offrendo ai giocatori un ambiente attivo per studiare i modelli delle parole, i ganci e le estensioni offline.\n• Gioco coinvolgente: Oltre agli strumenti, creiamo esperienze personalizzate come Anagram Blitz per offrire agli amanti dei giochi di parole un ambiente rapido in cui mettere alla prova la loro velocità e sfidare i propri record personali.",
   },
   {
    heading: "Il nostro impegno per la privacy",
    body: "Diamo valore alla tua sicurezza digitale e alle prestazioni del tuo sistema. Opzioni avanzate come la cronologia dei segnalibri delle parole vengono eseguite direttamente utilizzando l'archiviazione locale del tuo browser. Ciò significa che i tuoi elenchi di studio personali non lasciano mai il tuo dispositivo, non è richiesta alcuna registrazione di account utente e i tuoi dati rimangono completamente privati.",
   },
   {
    heading: "Contattaci",
    body: "Lavoriamo costantemente per migliorare i nostri algoritmi di ricerca, ampliare i nostri database e progettare nuove modalità di gioco. Se hai richieste di funzionalità, correzioni al dizionario o feedback generale, contattaci tramite la nostra pagina Contatti. Grazie per aver reso wordIzy parte della tua routine di gioco quotidiana!",
   },
  ],
 },
 contact: {
  title: "Contattaci",
  intro: "Hai una domanda, un feedback o un suggerimento su una funzionalità per wordIzy? Ci piacerebbe sentirti!\n\nChe tu abbia trovato una parola mancante nei nostri dizionari Scrabble, abbia riscontrato un bug giocando ad Anagram Blitz, o voglia semplicemente suggerire una nuova variante di strumento, il tuo contributo ci aiuta a costruire una piattaforma migliore per i giocatori di puzzle di parole in tutto il mondo.",
  sections: [
   {
    heading: "Come raggiungerci",
    body: "Si prega di inviare tutte le richieste, i feedback o le richieste di assistenza direttamente alla nostra email ufficiale di amministrazione:\n📩 support@wordizy.com",
   },
   {
    heading: "Si prega di includere nel messaggio",
    body: "Per aiutarci a gestire la tua richiesta il più rapidamente possibile, ti preghiamo di includere tutti i dettagli pertinenti:\n• Per le segnalazioni di bug: Facci sapere quale dispositivo o browser stavi utilizzando (ad es. iPhone/Safari o Desktop/Chrome).\n• Per le correzioni del dizionario: Menziona la parola specifica, il dizionario della lingua o la modalità di gioco che stavi utilizzando.\n• Per le partnership: Ti preghiamo di indicare chiaramente il nome della tua azienda o piattaforma nell'oggetto del messaggio.",
   },
   {
    heading: "Tempi di risposta previsti",
    body: "Siamo un piccolo team di sviluppo indipendente, ma leggiamo ogni feedback che riceviamo. In generale puoi aspettarti una risposta da noi entro 24-48 ore, dal lunedì al venerdì.",
   },
  ],
  closing: "Grazie per far parte della community di wordIzy!",
 },
 privacy: {
  title: "Informativa sulla privacy",
  intro: "Su wordIzy, accessibile da wordizy.com, una delle nostre principali priorità è la privacy dei nostri visitatori. Questo documento dell'Informativa sulla privacy contiene i tipi di informazioni raccolte e registrate da wordIzy e come le utilizziamo.\n\nSe hai domande aggiuntive o richiedi maggiori informazioni sulla nostra Informativa sulla privacy, non esitare a contattarci.",
  lastUpdated: "Ultimo aggiornamento: 28 ottobre 2026",
  sections: [
   {
    heading: "File di registro",
    body: "wordIzy segue una procedura standard per l'utilizzo dei file di registro. Questi file registrano i visitatori quando visitano siti web. Tutte le società di hosting lo fanno come parte delle analisi dei servizi di hosting. Le informazioni raccolte dai file di registro includono indirizzi di protocollo Internet (IP), tipo di browser, provider di servizi Internet (ISP), timestamp di data e ora, pagine di riferimento/uscita ed eventualmente il numero di clic. Questi non sono collegati ad alcuna informazione personalmente identificabile. Lo scopo delle informazioni è analizzare le tendenze, amministrare il sito, monitorare i movimenti degli utenti sul sito web e raccogliere informazioni demografiche.",
   },
   {
    heading: "Cookie e Web Beacon",
    body: "Come qualsiasi altro sito web, wordIzy utilizza dei \"cookie\". Questi cookie sono utilizzati per memorizzare informazioni tra cui le preferenze dei visitatori e le pagine del sito web che il visitatore ha accesso o visitato. Le informazioni vengono utilizzate per ottimizzare l'esperienza degli utenti personalizzando il contenuto delle nostre pagine web in base al tipo di browser del visitatore e/o ad altre informazioni.",
   },
   {
    heading: "Cookie DART di Google DoubleClick",
    body: "Google è uno dei fornitori di terze parti sul nostro sito. Utilizza inoltre cookie, noti come cookie DART, per mostrare annunci ai visitatori del nostro sito in base alla loro visita a wordizy.com e ad altri siti su internet. Tuttavia, i visitatori possono scegliere di rifiutare l'uso dei cookie DART visitando l'Informativa sulla privacy della rete di annunci e contenuti di Google al seguente URL: google.com",
   },
   {
    heading: "I nostri partner pubblicitari",
    body: "Alcuni degli inserzionisti sul nostro sito potrebbero utilizzare cookie e web beacon. I nostri partner pubblicitari includono: Google AdSense. Ciascuno dei nostri partner pubblicitari ha una propria Informativa sulla privacy per le politiche sui dati degli utenti. Per un accesso più facile, abbiamo inserito un link alle loro Informative sulla privacy sopra. I server di annunci di terze parti o le reti pubblicitarie utilizzano tecnologie come cookie, JavaScript o Web Beacon che vengono utilizzati nei rispettivi annunci e link che appaiono su wordIzy, che vengono inviati direttamente ai browser degli utenti. Ricevono automaticamente il tuo indirizzo IP quando ciò si verifica. Queste tecnologie vengono utilizzate per misurare l'efficacia delle loro campagne pubblicitarie e/o per personalizzare i contenuti pubblicitari che vedi sui siti web che visiti.\n\nSi prega di notare che wordIzy non ha accesso né controllo su questi cookie utilizzati dagli inserzionisti di terze parti.",
   },
   {
    heading: "Informativa sulla privacy di terze parti",
    body: "L'Informativa sulla privacy di wordIzy non si applica ad altri inserzionisti o siti web. Pertanto, ti consigliamo di consultare le rispettive Informative sulla privacy di questi server di annunci di terze parti per informazioni più dettagliate. Queste possono includere le loro pratiche e istruzioni su come disattivare determinate opzioni.\n\nPuoi scegliere di disabilitare i cookie tramite le opzioni individuali del tuo browser. Per informazioni più dettagliata sulla gestione dei cookie con specifici browser web, puoi trovarle sui rispettivi siti web dei browser.",
   },
   {
    heading: "Archiviazione locale del browser",
    body: "Per fornire le nostre funzionalità personalizzate senza richiedere account utente o registrazioni, wordIzy utilizza l'archiviazione locale del tuo browser (localStorage) per funzionalità come la Save Vault e le preferenze di gioco. Questi dati sono memorizzati interamente sul tuo dispositivo locale. Non vengono mai trasmessi ai nostri server, condivisi con terze parti o utilizzati per scopi di tracciamento su siti web esterni. Puoi cancellare questi dati in qualsiasi momento svuotando la cache del tuo browser o utilizzando le opzioni fornite all'interno delle interfacce degli strumenti.",
   },
   {
    heading: "Informazioni sui bambini",
    body: "Un'altra parte della nostra priorità è aggiungere protezione per i bambini durante l'utilizzo di internet. Incoraggiamo i genitori e i tutori a osservare, partecipare e/o monitorare e guidare l'attività online dei propri figli.\n\nwordIzy non raccoglie consapevolmente alcuna Informazione di identificazione personale (Personal Identifiable Information) da bambini di età inferiore ai 13 anni. Se ritieni che tuo figlio abbia fornito questo tipo di informazioni sul nostro sito web, ti invitiamo caldamente a contattarci immediatamente e faremo del nostro meglio per rimuovere tempestivamente tali informazioni dai nostri archivi.",
   },
   {
    heading: "Solo informativa sulla privacy online",
    body: "Questa Informativa sulla privacy si applica solo alle nostre attività online ed è valida per i visitatori del nostro sito web per quanto riguarda le informazioni che hanno condiviso e/o raccolto in wordIzy. Questa politica non è applicabile a nessuna informazione raccolta offline o tramite canali diversi da questo sito web.",
   },
   {
    heading: "Consenso",
    body: "Utilizzando il nostro sito web, con il presente acconsenti alla nostra Informativa sulla privacy e accetti i suoi Termini e condizioni.",
   },
  ],
  thirdPartyServices: [
    {
      name: "Google AdSense",
      description: "Pubblica annunci ai visitatori del nostro sito. Utilizza cookie (cookie DART) per mostrare annunci in base alle tue visite su wordizy.com e altri siti. Puoi rifiutare i cookie DART visitando l'Informativa sulla privacy della rete di annunci e contenuti di Google.",
      url: "https://policies.google.com/technologies/ads",
    },
  ],
 },
 terms: {
  title: "Termini di servizio",
  intro: "Benvenuto su wordIzy (accessibile tramite wordizy.com). Questi Termini di servizio (i \"Termini\") regolano l'accesso e l'utilizzo del nostro sito web, degli strumenti di aiuto per giochi di parole, dei dizionari e dei giochi interattivi come Anagram Blitz (collettivamente, i \"Servizi\").\n\nAccedendo o utilizzando wordIzy, accetti di essere vincolato da questi Termini e dalla nostra Informativa sulla privacy. Se non accetti questi Termini, ti preghiamo di non utilizzare i nostri Servizi.",
  lastUpdated: "Ultimo aggiornamento: 28 ottobre 2026",
  sections: [
   {
    heading: "1. Descrizione del Servizio",
    body: "wordIzy fornisce strumenti online gratuiti di assistenza per puzzle di parole, solver di anagrammi, ricerche nel dizionario e mini-giochi basati su parole. Tutti i Servizi sono forniti su base \"così com'è\" e \"come disponibile\" per scopi personali, non commerciali, di intrattenimento ed educativi esclusivamente.",
   },
   {
    heading: "2. Uso consentito e restrizioni",
    body: "Ti viene concessa una licenza limitata, non esclusiva, non trasferibile e revocabile per accedere e utilizzare wordIzy strettamente in conformità con questi Termini.\nCome condizione del tuo utilizzo, accetti di non:\n• Utilizzare sistemi automatizzati, scraper, spider, robot o script per estrarre dati, testo o elenchi di parole dai nostri database.\n• Interferire o interrompere le prestazioni, l'integrità o la sicurezza dei server del sito web.\n• Inquadrare o replicare qualsiasi parte del sito senza la nostra previa autorizzazione scritta.\n• Utilizzare i nostri strumenti di aiuto per giochi di parole o sistemi automatizzati per barare in ambienti competitivi online dove gli strumenti di assistenza esterni sono espressamente vietati dai rispettivi termini di quelle piattaforme.",
   },
   {
    heading: "3. Diritti di proprietà intellettuale",
    body: "Tutti i contenuti, le caratteristiche, le funzionalità, i loghi, il design del sito, il testo e il software di gioco personalizzato (incluso Anagram Blitz) su wordIzy sono di proprietà esclusiva di wordIzy e sono protetti dalle leggi internazionali sul diritto d'autore, sui marchi e sulla proprietà intellettuale. Non puoi riprodurre, distribuire, modificare o creare opere derivate della nostra proprietà senza espresso consenso scritto.",
   },
   {
    heading: "4. Marchi di terze parti e disclaimer",
    body: "I riferimenti a giochi di terze parti, inclusi ma non limitati a Scrabble, Wordle, Words With Friends, Wordfeud e Quordle, sono utilizzati esclusivamente a scopo informativo e descrittivo per spiegare la compatibilità dei nostri strumenti. wordIzy è una piattaforma indipendente e non è affiliata, approvata, autorizzata o sponsorizzata da Hasbro, Mattel, The New York Times Company, o una qualsiasi delle rispettive società madri o affiliate.",
   },
   {
    heading: "5. Dati utente e archiviazione locale",
    body: "wordIzy non richiede registrazione utente o creazione di account. Funzionalità come la Save Vault utilizzano l'archiviazione locale del tuo browser web (localStorage) per salvare gli stati di configurazione e la cronologia delle parole localmente sul tuo dispositivo. Non assumiamo alcuna responsabilità o obbligo per eventuali perdite di dati derivanti dalla cancellazione della cache del browser, da modifiche hardware o aggiornamenti del browser.",
   },
   {
    heading: "6. Limitazioni di responsabilità",
    body: "In nessun caso wordIzy, i suoi sviluppatori o i suoi affiliati saranno responsabili per eventuali danni diretti, indiretti, incidentali, speciali o consequenziali derivanti dall'uso o dall'impossibilità di utilizzare il nostro sito web, anche se informati della possibilità di tali danni. Non garantiamo che gli elenchi di parole, i calcoli dei punteggi o le configurazioni dell'assistente dizionario siano del tutto privi di errori o aggiornati per corrispondere alle patch in tempo reale dei dizionari di gioco.",
   },
   {
    heading: "7. Modifiche al Servizio e ai Termini",
    body: "Ci riserviamo il diritto di modificare, sospendere o interrompere qualsiasi aspetto dei nostri Servizi in qualsiasi momento senza preavviso. Ci riserviamo anche il diritto di modificare questi Termini a nostra discrezione. Il tuo utilizzo continuato di wordIzy in seguito a qualsiasi aggiornamento pubblicato costituisce la tua accettazione dei Termini revisionati.",
   },
   {
    heading: "8. Legge applicabile",
    body: "Questi Termini saranno disciplinati e interpretati in conformità con le pratiche internazionali del commercio digitale, senza riguardo ai principi di conflitto di leggi.",
   },
   {
    heading: "9. Informazioni di contatto",
    body: "Se hai domande o chiarimenti riguardo questi Termini di servizio, contattaci tramite la nostra pagina di contatto ufficiale.",
   },
  ],
 },
 sitemap: { title: "Mappa del sito", body: "Tutte le pagine di WordIzy." },
 footer: { rights: "Tutti i diritti riservati.", madeWith: "Fatto per gli amanti delle parole.", links: "Link rapidi", desc: "Anagrammatore e risolutori gratuiti in 9 lingue. Senza registrazione.", disclaimer: "Per intrattenimento e giochi di parole. Non affiliato con Scrabble o Wordle." },
 faq: {
  title: "Come usare & FAQ",
  unscrambler: [
   { q: "Cos'è un anagrammatore di parole e come si usa?", a: "Un anagrammatore prende un insieme di lettere — come un portatile Scrabble (es. SRAABLC) — e trova ogni parola valida del dizionario scrivibile con quelle lettere. Digita le lettere nella casella «Le tue lettere» e clicca su Anagramma. I risultati appaiono raggruppati per lunghezza (le più lunghe prima), ogni parola mostra il suo valore Scrabble. Ideale per Scrabble, Words With Friends, Wordfeud, cruciverba e puzzle di anagrammi." },
   { q: "Come funzionano i jolly (? e *)?", a: "Usa ? o * come jolly ogni volta che hai una lettera sconosciuta — rappresentano una tessera bianca dello Scrabble, una casella vuota di cruciverba o la lettera non confermata in un tentativo di Wordle. Inserendo «QUER?Y» chiedi a WordIzy di cercare tutte le parole che corrispondono a «QUER» + una lettera qualsiasi + «Y», restituendo QUERY direttamente. Ogni jolly vale 0 punti (come da regole ufficiali delle tessere bianche), il che mantiene il punteggio mostrato realistico quando giochi con una tessera bianca nel tuo portatile. Puoi concatenare più jolly insieme — «A??LE» corrisponde a APPLE, ADDLE, AGILE, AISLE e ABLE — rendendo i jolly lo strumento ideale per esplorare le possibilità di anagramma quando il portatile è incompleto. Per mantenere utili i risultati, limita i jolly a uno o due per ricerca: ogni jolly aggiuntivo moltiplica l'insieme dei candidati, e oltre tre inizierai a vedere parole non realmente giocabili dalle tue tessere reali. I jolly funzionano anche nel Risolutore Wordle, nel Risolutore Anagrammi e nell'Aiuto Wordfeud con semantica identica, così puoi portare lo stesso flusso di lavoro lettere-parziali in ogni strumento del sito." },
   { q: "Come uso i Filtri avanzati?", a: "Clicca su «Filtri avanzati» per mostrare tre campi opzionali. «Inizia con» limita i risultati alle parole che iniziano con le lettere indicate (es. «AB» → solo parole che iniziano per AB). «Finisce con» fa lo stesso per i suffissi (es. «ED» → solo parole che finiscono in ED). «Deve includere» garantisce che certe lettere appaiano in ogni risultato, in qualsiasi posizione. Combina i tre con i jolly per un controllo preciso." },
   { q: "Come sono punteggiate le parole?", a: "Ogni parola è punteggiata con i valori ufficiali delle lettere inglesi dello Scrabble: A=1, B=3, C=3, D=2, E=1, F=4, G=2, H=4, I=1, J=8, K=5, L=1, M=3, N=1, O=1, P=3, Q=10, R=1, S=1, T=1, U=1, V=4, W=4, X=8, Y=4, Z=10. I jolly (? *) agiscono come tessere bianche e valgono 0 punti, come da regole ufficiali. WordIzy calcola automaticamente il totale per ogni risultato e li ordina per punteggio entro ogni gruppo di lunghezza, così le giocate più redditizie appaiono in cima a ogni lista — risparmiandoti il calcolo mentale di sommare i valori delle tessere e permettendoti di individuare il bingo candidato a colpo d'occhio. Per le altre lingue, WordIzy usa i valori ufficiali Scrabble del dizionario di quella lingua (ODS9 per francese, FISE per spagnolo, Zingarelli per italiano, Portoghese, Tedesco, OpenTaal per olandese, più liste romanizzate/pinyin per giapponese e mandarino). Cambia lingua con il selettore nella barra di navigazione per vedere la punteggio localizzato. I punteggi reali in partita dipendono anche dalle caselle bonus (lettera/parola doppia/tripla) e dal bonus bingo di +50 per l'uso di tutte e 7 le tessere, quindi considera il punteggio mostrato come baseline e aggiungi mentalmente i bonus quando pianifichi la giocata." },
   { q: "Quali dizionari sono disponibili?", a: "WordIzy supporta 9 lingue: inglese (NWL2023 + CSW21), francese (ODS9 2024), spagnolo (FISE), italiano (Zingarelli), portoghese, tedesco, olandese (OpenTaal), più giapponese (romaji) e mandarino (pinyin). Tutte le parole sono filtrate rispetto al dizionario Scrabble ufficiale di ogni lingua. Cambia lingua con il selettore nella barra di navigazione." },
   { q: "Perché i risultati sono raggruppati per lunghezza?", a: "Il raggruppamento per lunghezza rende facile trovare il tipo di giocata che ti serve. A Scrabble, le parole più lunghe di solito valgono di più, ma a volte una parola più corta si adatta meglio alla scacchiera. Le parole più lunghe appaiono in alto, scendendo fino alle parole di 2 lettere. Entro ogni gruppo, le parole sono ordinate per punteggio Scrabble per individuare in fretta la giocata migliore." },
  ],
  scramble: [
   { q: "A cosa serve il Mischia / Risolutore?", a: "Questo strumento risolve puzzle di anagrammi — in cui le lettere sono mischiate e devi trovare la/le parola/e originale/i. Inserisci le lettere mischiate (es. RBOLENW) e clicca su Risolvi per vedere tutte le parole reali componibili. Perfetto per anagrammi di giornale, giochi di parole e sfide di parole mischiate." },
   { q: "In cosa differisce dall'Anagrammatore?", a: "Il Risolutore usa lo stesso motore dell'Anagrammatore ma è focalizzato sulla risoluzione di puzzle di parole mischiate piuttosto che nel trovare ogni parola possibile da un portatile. Puoi anche usare la funzione «Mischia una parola» sotto l'input per trasformare una parola in varianti casuali — utile per creare i tuoi puzzle." },
   { q: "Posso usare i jolly?", a: "Sì. Usa ? o * per rappresentare lettere sconosciute. Ad esempio, se un puzzle ha una lettera mancante, inserisci le lettere note più un ? e WordIzy riempirà lo spazio con ogni combinazione valida." },
   { q: "Come creo la mia parola mischiata?", a: "Usa la scheda «Mischia una parola» sotto l'input principale. Digita una parola qualsiasi (es. «scrabble») e clicca su Genera — WordIzy produce diverse mescolate casuali di quella parola. Usale per creare puzzle per gli amici o per esercitarti." },
  ],
  wordle: [
   { q: "Come funziona il Ris. Wordle?", a: "Il Risolutore Wordle restringe la risposta di oggi usando il feedback della tua partita. Inserisci le informazioni raccolte dai tentativi: lettere verdi (posizione corretta), lettere gialle (nella parola ma posizione sbagliata) e lettere grigie (non nella parola). Il solver restituisce tutte le parole valide che rispettano i tuoi vincoli." },
   { q: "Come inserisco le lettere collocate (verdi)?", a: "Nel campo «Lettere collocate (verde)», digita le lettere che sai essere nella posizione corretta, usando . o _ per gli spazi vuoti. Ad esempio, se sai che la parola è A _ _ L E, inserisci «A..LE». Il solver restituisce solo le parole che corrispondono esattamente a questo schema." },
   { q: "Cosa sono le lettere valide (gialle) ed escluse (grigie)?", a: "Le lettere valide (gialle) sono lettere che sai essere NELLA parola ma non nella posizione tentata — inseriscile tutte nel campo «Lettere valide» (es. «RST»). Le lettere escluse (grigie) sono lettere confermate NON nella parola — inseriscile in «Lettere escluse» (es. «BXF»). Il solver filtra ogni parola che contiene lettere escluse." },
   { q: "Quale lunghezza di parola usare?", a: "Seleziona la lunghezza del Wordle di oggi (predefinita 5). WordIzy supporta parole da 4 a 8 lettere, quindi funziona anche per varianti come Quordle, Octordle e partite a lunghezza personalizzata." },
   { q: "Consigli per scegliere il prossimo tentativo?", a: "Scegli tra i risultati una parola che usi lettere comuni non ancora testate (R, T, S, L, N). Questo massimizza il guadagno di informazioni. Se la lista è lunga, scegli una parola che elimini più possibilità. Il solver mostra il punteggio Scrabble di ogni parola — punteggi alti spesso indicano lettere rare che aiutano a restringere." },
  ],
  quordle: [
   { q: "Cos'è il Ris. Quordle?", a: "Quordle è un gioco in cui risolvi quattro Wordle contemporaneamente. Questo solver ti permette di inserire vincoli per fino a 4 tabelloni in una volta e restituisce parole candidate per ciascuno. Ogni tabellone mantiene le proprie lettere collocate (verdi), valide (gialle) ed escluse (grigie)." },
   { q: "Come uso più tabelloni?", a: "Compila ciò che sai per ogni tabellone. I vincoli del tabellone 1 influenzano solo i suoi risultati. Clicca su «Aggiungi tabellone» per arrivare fino a 4 tabelloni. Usa il pulsante X per rimuovere un tabellone. Quando sei pronto, clicca su Risolvi per ottenere le parole candidate di tutti i tabelloni." },
   { q: "Devo condividere lettere tra tabelloni?", a: "Sì — una strategia chiave di Quordle è usare un tentativo per raccogliere informazioni su più tabelloni. Se una lettera è verde sul tabellone 1, è probabile che sia nella stessa posizione anche sugli altri. Inserisci vincoli condivisi su ogni tabellone per incrociare le informazioni e restringere più in fretta le quattro risposte." },
   { q: "Consigli strategici per Quordle?", a: "Inizia con una parola ricca di lettere comuni (come CRANE o SLATE) per raccogliere informazioni su tutti i tabelloni. Concentrati prima sul tabellone con più vincoli — risolverlo libera spazio mentale. Usa il solver dopo 2-3 tentativi, quando hai abbastanza informazioni per ridurre ogni tabellone a una lista gestibile." },
  ],
  anagram: [
   { q: "Cos'è un anagramma?", a: "Un anagramma è una parola o frase formata riorganizzando tutte le lettere di un'altra parola. Ad esempio, LISTEN e SILENT sono anagrammi — stesse lettere, ordine diverso. Il Risolutore di Anagrammi trova ogni parola che usa esattamente tutte le lettere fornite." },
   { q: "In cosa differisce dall'Anagrammatore?", a: "L'Anagrammatore trova parole di QUALSIASI lunghezza componibili dalle tue lettere (anche più corte). Il Risolutore di Anagrammi trova solo parole che usano TUTTE le tue lettere — gli anagrammi a lunghezza piena. Ad esempio, con «CHIEN», il solver restituisce CHIEN, CHINE, NICHE (tutte 5 lettere), mentre l'anagrammatore restituirebbe anche parole più corte come ICE, IN, HE." },
   { q: "Posso usare i jolly?", a: "Sì. Usa ? o * come jolly per riempire gli spazi restanti. Ad esempio, inserendo «CAT??» trovi tutti gli anagrammi di 5 lettere in cui CAT è combinato con due lettere qualsiasi. I jolly valgono 0 punti (come caselle bianche)." },
   { q: "A cosa servono gli anagrammi?", a: "Gli anagrammi si usano in giochi di parole, puzzle, crittografia e linguistica. A Scrabble, trovare anagrammi del proprio portatile aiuta a individuare bingo (usare tutte e 7 le tessere per un bonus di 50 punti). Sono anche popolari in definizioni di cruciverba, trivia e indovinelli." },
  ],
  random: [
   { q: "Cosa fa il Generatore di Parole Casuali?", a: "Genera parole reali casuali dal dizionario selezionato, con filtri opzionali. Puoi specificare lunghezza, lettere iniziali, lettere finali o lettere che la parola deve contenere. Usalo per giochi, scrittura creativa, naming, pratica di vocabolario o per generare password con parole reali." },
   { q: "Come filtro le parole casuali?", a: "Imposta «Lunghezza» su un numero specifico (2-12) o lascia «Qualsiasi». «Inizia con» limita alle parole che iniziano con certe lettere. «Finisce con» limita alle parole che finiscono con certe lettere. «Contiene» richiede che la parola includa certe lettere ovunque. «Quante» controlla il numero di parole generate (1-200)." },
   { q: "Le parole sono valide per Scrabble?", a: "Sì. Tutte le parole generate provengono dal dizionario Scrabble ufficiale della lingua selezionata (NWL2023/CSW21 per l'inglese, ODS9 per il francese, ecc.). Ogni parola è giocabile in Scrabble e altri giochi di parole." },
   { q: "Posso usarlo per giochi di parole?", a: "Assolutamente. Genera parole casuali per Pictionary, sciarade, giochi di associazione o quiz di vocabolario. Per le password, combina 3-4 parole casuali di lunghezze diverse — questo crea passphrase memorabili ma sicure." },
  ],
  wordfeud: [
   { q: "Cos'è l'Aiuto Wordfeud?", a: "Wordfeud è un popolare gioco mobile di parole simile a Scrabble. Questo aiuto trova le migliori parole giocabili dal tuo portatile. Inserisci le tue 7 lettere (più eventuali lettere già in tabellone) e WordIzy restituisce tutte le parole giocabili, ordinate per punteggio Scrabble." },
   { q: "Come inserisco il mio portatile?", a: "Digita le tue 7 lettere nella casella «Le tue lettere». Usa ? o * per le caselle bianche (rappresentano qualsiasi lettera ma valgono 0 punti). Se ci sono lettere già in tabellone su cui vuoi costruire, aggiungile — WordIzy troverà le parole componibili dal pool combinato." },
   { q: "Quale dizionario usare?", a: "Wordfeud supporta più dizionari a seconda della regione. Il Wordfeud inglese usa una lista tipo Scrabble, quindi inglese (NWL2023/CSW21) funziona bene. Per altre lingue, seleziona quella corrispondente (francese ODS9, spagnolo FISE, ecc.) dal selettore di lingua." },
   { q: "Come sono calcolati i punteggi?", a: "I punteggi usano i valori ufficiali Scrabble della lingua selezionata. Nota: il punteggio reale di Wordfeud può differire leggermente (ha caselle bonus e una propria distribuzione di tessere). Usa i punteggi come guida per individuare giocate di alto valore — la parola con più punti dal tuo portatile è di solito la tua mossa migliore." },
  ],
  dictionary: [
   { q: "Cosa fa Verifica Dizionario?", a: "Inserisci una parola qualsiasi per verificare se è valida nel dizionario Scrabble ufficiale della lingua selezionata. Lo strumento mostra la parola come tessere Scrabble, un badge valido/non valido, il punteggio Scrabble, la lunghezza, le tessere, una definizione e sinonimi (se disponibili)." },
   { q: "Da dove provengono le definizioni?", a: "Le definizioni provengono da più fonti: l'API Free Dictionary (per inglese, francese, spagnolo, tedesco, italiano, portoghese), Wiktionary (tutte le lingue come fallback) e un assistente IA per eventuali lacune. La fonte è indicata accanto a ogni definizione." },
   { q: "Da dove provengono i sinonimi?", a: "I sinonimi provengono da Datamuse (per inglese, spagnolo, francese, italiano, portoghese) e OpenThesaurus (per il tedesco). Sono mostrati solo i sinonimi che sono a loro volta parole valide in Scrabble — clicca su un sinonimo per verificarlo all'istante." },
   { q: "Perché una parola comune potrebbe essere invalida?", a: "I dizionari Scrabble sono severi — escludono nomi propri, abbreviazioni, parole con trattino e parole con apostrofo. Ad esempio, «BRUNCH» è valida ma «BRUNCH'S» potrebbe non esserlo. Se una parola sembra mancare, può essere un nome proprio maiuscolo o un'inclusione recente non ancora nella lista ufficiale. Cambia lingua per controllare la parola in un altro dizionario." },
  ],
  scrabble: [
   { q: "Cos'è Scrabble Duplicate?", a: "Lo Scrabble duplicate è una variante in cui ogni giocatore riceve lo stesso portatile e deve trovare la migliore giocata possibile. È usato in tornei e allenamenti per testare l'abilità senza fortuna. Questo strumento ti aiuta a trovare le parole più redditizie dal tuo portatile — inserisci le tue 7 lettere ed eventualmente le lettere in tabellone, poi clicca su «Trova migliori parole»." },
   { q: "Come inserisco le lettere del tabellone?", a: "Se ci sono lettere già sul tabellone su cui puoi costruire, digita nel campo «Lettere del tabellone (opzionale)» insieme alle lettere del tuo portatile. WordIzy tratta il pool combinato come lettere disponibili. Questo aiuta a trovare parole che si agganciano a giocate esistenti — essenziale per massimizzare il punteggio in partite reali." },
   { q: "Come sono classificate le migliori giocate?", a: "Le parole sono ordinate per punteggio Scrabble (più alto prima). Le 10 migliori giocate appaiono in cima in una lista evidenziata. Ricorda: il punteggio reale dipende anche dalle caselle bonus (lettera/parola doppia/tripla) e dai bingo (bonus di 50 punti per l'uso di tutte e 7 le tessere). Usa i punteggi dello strumento come base, poi integra il posizionamento sul tabellone." },
   { q: "Cos'è un bingo e come ne trovo uno?", a: "Un bingo è il singolo colpo di scena più grande nello Scrabble: giocare tutte e 7 le tessere in un turno dà un bonus di +50 oltre al punteggio base della parola, così una parola da 30 punti diventa una giocata da 80. Per trovare bingo con WordIzy, inserisci il portatile completo di 7 lettere (usa ? o * per le tessere bianche) e guarda il gruppo di risultati a 7 lettere in cima alla lista — ogni parola lì è un bingo potenziale. I bingo a 7 lettere più redditizi nello Scrabble inglese sono MUZJIKS (29 base + 50 = 79 punti), JACUZZI (34 + 50 = 84), SYZYGY (21 + 50 = 71), OXAZOLIDINE (raro ma devastante) e i radicali ANATOMIZ-, ANTISOCIAL-, OVERLAPPING- che accettano suffissi comuni. Per individuare i bingo più in fretta, impara i radicali ad alto valore — SATISFI-, ANTISOY-, OVERLAP- — che si combinano con -ER, -ED, -ING, -ATION. Trattieni una o due lettere flessibili (E, R, S, T) quando il tuo portatile ha forma da bingo, perché il bonus bingo (+50) quasi sempre supera i punti che otterresti scaricando quelle tessere presto." },
  ],
  wordlists: [
   { q: "Cos'è la pagina Liste di Parole?", a: "Liste di Parole ti permette di sfogliare ogni parola valida in Scrabble da 2 a 7 lettere. Le parole sono raggruppate per lunghezza e poi per lettera finale (A-Z), per esplorare il dizionario in modo sistematico. Usala per studiare, trovare parole per le partite o ampliare il vocabolario." },
   { q: "Come filtro per lunghezza?", a: "Usa il selettore di lunghezza (2-7) in alto. Clicca su «Tutte» per vedere tutte le lunghezze impilate (parole di 2 lettere sopra, 7 sotto), o su un numero specifico per vedere solo quella lunghezza. Ogni sezione di lunghezza mostra 26 contenitori (uno per lettera finale A-Z)." },
   { q: "Come filtro per lettera?", a: "Usa la riga A-Z sotto il selettore di lunghezza. Clicca su una lettera per mostrare solo le parole che finiscono con quella lettera, o «Tutte» per mostrarle tutte. Utile per trovare parole che si agganciano a una lettera già sul tabellone." },
   { q: "Perché le parole sono in maiuscolo?", a: "Le tessere Scrabble sono maiuscole, quindi le parole sono mostrate in maiuscolo per corrispondenza. Ogni parola mostra accanto il suo valore Scrabble. Entro ogni contenitore di lettera, le parole sono ordinate alfabeticamente (A-Z) per una scansione agevole." },
  ],
  wordstarts: [
   { q: "Cos'è la pagina Inizia Per?", a: "Questa pagina ti permette di sfogliare tutte le parole valide in Scrabble che INIZIANO con una lettera specifica. Seleziona una lettera (A-Z) e WordIzy mostra ogni parola che inizia con quella lettera, raggruppata per lunghezza (2-7 lettere). Perfetta per studiare aperture e trovare parole da costruire su una lettera iniziale sul tabellone." },
   { q: "Come uso i selettori di lunghezza e lettera?", a: "Prima, scegli una lettera dalla riga A-Z — questo fissa la lettera iniziale. Poi usa la riga di lunghezza (2-7 o Tutte) per filtrare per lunghezza. Ogni sezione mostra tutte le parole che iniziano con la lettera scelta, ordinate alfabeticamente. Clicca su «Tutte» in una delle righe per rimuovere quel filtro." },
   { q: "In che modo è utile per Scrabble?", a: "Conoscere le parole che iniziano con ciascuna lettera aiuta a pianificare aperture e agganci. Se hai una Q, conoscere tutte le parole in Q (QI, QAT, QUAD...) ti aiuta a giocarla in modo efficace. La pagina è utile anche per cruciverba, dove le definizioni spesso specificano «inizia per...»." },
   { q: "Perché impaginare a 50 parole?", a: "Alcune lettere (come S, A, E) hanno migliaia di parole iniziali. Per mantenere le pagine veloci e leggibili, i risultati impaginano a 50 parole per pagina con pulsanti precedente/successivo. Ogni pagina indica il numero e il totale per orientarti." },
  ],
  wordends: [
   { q: "Cos'è la pagina Finisce Con?", a: "Questa pagina ti permette di sfogliare tutte le parole valide in Scrabble che FINISCONO con una lettera specifica. Seleziona una lettera (A-Z) e WordIzy mostra ogni parola che finisce con quella lettera, raggruppata per lunghezza (2-7 lettere). Ideale per trovare parole da agganciare a una lettera già sul tabellone." },
   { q: "Come uso i selettori di lunghezza e lettera?", a: "Prima, scegli una lettera dalla riga A-Z — questo fissa la lettera finale. Poi usa la riga di lunghezza (2-7 o Tutte) per filtrare per lunghezza. Ogni sezione mostra tutte le parole che finiscono con la lettera scelta, ordinate alfabeticamente. Clicca su «Tutte» in una delle righe per rimuovere quel filtro." },
   { q: "In che modo è utile per Scrabble?", a: "Le lettere finali contano per gli agganci — se c'è una S sul tabellone, conoscere tutte le parole in S ti permette di pluralizzare o estendere giocate. Allo stesso modo, conoscere le parole in D, ED, ING aiuta ad appoggiarti sui suffissi comuni. Questa pagina è un potente strumento di studio per il gioco agonistico." },
   { q: "Perché impaginare a 50 parole?", a: "Alcune lettere (come E, S, D) hanno migliaia di parole finali. Per mantenere le pagine veloci e leggibili, i risultati impaginano a 50 parole per pagina con pulsanti precedente/successivo. Ogni pagina indica il numero e il totale per orientarti." },
  ],
  vault: [
   { q: "Cos'è il Salvavault?", a: "Il Salvavault è uno strumento integrato di allenamento lessicale per giocatori competitivi di Scrabble e Wordle — una lista personale di parole preferite progettata specificamente per lo studio a ripetizione distanziata di combinazioni di lettere difficili. A differenza dei segnalibri generici del browser, il vault mantiene visibile il punteggio Scrabble di ogni parola salvata e ti permette di copiare l'intera lista direttamente in un'app di flashcard o in un mazzo Anki per esercitazione offline. Ecco il flusso di lavoro in 4 fasi che i giocatori competitivi usano: (1) Esegui una ricerca come «parole di 7 lettere da QUARTZE» o «parole che iniziano per Q» e metti la stella alle parole ad alto valore che continui a dimenticare — QAT, QOPH, FAQIR, MUZJIKS. (2) Apri il pannello del vault dall'icona a stella in alto a destra nell'intestazione; le parole salvate restano organizzate in una sola lista con il punteggio live accanto a ogni voce. (3) Clicca su «Copia tutte le righe» per incollare la lista in Anki, Quizlet o un modello di flashcard stampabile per ripetizione distanziata lontano dallo schermo. (4) Riesegui la stessa ricerca la settimana prossima e confronta quali parole hai memorizzato — la tua lista salvata persiste localmente nel localStorage del browser, quindi non lascia mai il tuo dispositivo, non richiede account e funziona offline una volta caricata la pagina." },
   { q: "Come salvo una parola nel vault?", a: "Clicca sull'icona a stella (☆) accanto a qualsiasi parola nei risultati. La stella diventa ambra (★) quando una parola è salvata. Clicca di nuovo per rimuovere la parola dal tuo vault." },
   { q: "Come vedo le mie parole salvate?", a: "Clicca sull'icona a stella nell'intestazione del sito (angolo in alto a destra). Si apre un pannello da destra che mostra tutte le tue parole salvate. Puoi copiare singole parole, copiare l'intera lista, o svuotare il vault." },
   { q: "Il mio vault è sincronizzato tra dispositivi?", a: "No — il vault è memorizzato nel localStorage del tuo browser, quindi è per dispositivo. Se cancelli i dati del browser o usi un dispositivo diverso, il tuo vault non verrà trasferito. Non serve alcun account e nessun dato lascia il tuo dispositivo." },
  ],
 },
 blitz: {
  loadingEngine: "Caricamento motore puzzle...",
  completed: "Completato",
  todaysPuzzleSolved: "📅 Puzzle di oggi risolto!",
  alreadyPlayed: "Hai già usato il tuo tentativo giornaliero! Torna domani a mezzanotte per una nuova sfida.",
  playInfinite: "Gioca in modalità pratica infinita",
  challengeTitle: "⚡ Sfida Anagram Blitz",
  challengeDesc: "Decifra parole in 60 secondi dai nostri dizionari Scrabble.",
  startToday: "Inizia il puzzle di oggi",
  playInfiniteBtn: "Pratica infinita",
  timesUp: "⏱️ Tempo scaduto! Gioco finito",
  finalScore: "Punteggio finale:",
  points: "punti.",
  playAgain: "🔄 Gioca di nuovo",
  dailyLocked: "Il tuo tentativo giornaliero è bloccato. A domani!",
  returnMenu: "Torna al menu",
  timeLeft: "s",
  totalScore: "pt",
  generating: "🎲 Generazione parola...",
  hint: "💡 Indizio:",
  waiting: "In attesa...",
  typeWord: "Scrivi parola...",
  skipReveal: "🏳️ Salta e rivela",
  wrong: "❌ Risposta sbagliata! Riprova.",
  stopGame: "🛑 Ferma",
  play: "▶ Gioca",
  correct: "✨ Perfetto! Risposta corretta!",
  answerWas: "La risposta era:",
  challengeFriend: "Sfida un amico",
  challengeText: "Ho totalizzato {score} punti su WordIzy Anagram Blitz — mi batti? Gioca gratis: https://wordizy.com/blitz",
  // Sezione contenuto SEO (sotto la carta del gioco)
  pageHeading: "Gioca ad Anagram Blitz — Gioco di parole gratuito da 60 secondi",
  howToPlayTitle: "Come giocare ad Anagram Blitz",
  howToPlayDesc: "Anagram Blitz è un gioco di anagrammi veloce di 60 secondi. Ricevi un insieme di lettere mescolate e devi riordinarle per formare una parola valida del dizionario. Ogni risposta corretta guadagna 20 punti; ogni salto costa 5 punti. Supera il tuo punteggio migliore e sali nella classifica giornaliera.",
  gameModesTitle: "Modalità di gioco",
  dailyModeName: "Sfida quotidiana",
  dailyModeDesc: "Un indovinello al giorno. Gioca una volta e blocca il tuo punteggio per la classifica.",
  infiniteModeName: "Pratica infinita",
  infiniteModeDesc: "Indovinelli illimitati. Ogni risposta corretta aggiunge 10 secondi bonus al cronometro.",
  tipsTitle: "Consigli e strategia",
  tip1: "Cerca le terminazioni tipiche dell'italiano : -ARE, -ERE, -IRE (infiniti dei verbi), -IONE (sostantivi di azione), -ATO/-UTO (participi passati).",
  tip2: "In italiano, quasi il 94% delle parole di cinque lettere termina con una vocale — identifica la vocale finale il prima possibile.",
  tip3: "La I è la lettera più frequente in italiano (61% delle parole) — testala in prima posizione o alla fine (verbi plurali).",
  tip4: "Le doppie consonanti (LL, TT, SS, RR, CC) sono molto comuni in italiano — se hai una posizione verde, considera se la lettera successiva possa essere uguale.",
  blitzFooter: "Anagram Blitz utilizza dizionari ufficiali di Scarabeo (Zingarelli per l'italiano, NWL2023 + CSW21 per l'inglese) con supporto multilingua per 9 lingue. Gioca gratis, senza registrazione.",
 },
 ui: {
  advertisement: "Pubblicità",
  featuredGuide: "Guida in evidenza",
  saveVaultFaqTitle: "Salvavault — Come usarlo",
  relatedTools: "Strumenti correlati",
  published: "Pubblicato:",
  backToHome: "Torna alla home",
  somethingWrong: "Qualcosa è andato storto",
  tryAgain: "Riprova",
  reloadPage: "Ricarica pagina",
  returnLabel: "Indietro",
  allCopied: "Tutte le parole copiate!",
  showLess: "Mostra meno",
  showMore: "Mostra altro",
  enterPassword: "Inserisci la password",
  totalSearches: "Ricerche totali",
  topQuery: "Ricerca principale",
  topTool: "Strumento principale",
  topLanguage: "Lingua principale",
  newDailyChallenge: "Nuova sfida quotidiana",
  scrambleFeatureHint: "Usa la funzione Mescola una parola qui sotto per creare i tuoi puzzle.",
  wordList: "Lista parole",
  copiedToClipboard: "Copiato negli appunti!",
 },
 hubPages: {
  startsSubtitle: "Sfogli tutte le parole Scrabble valide che iniziano con ogni lettera dell'alfabeto, da 2 a 15 lettere.",
  endsSubtitle: "Sfogli tutte le parole Scrabble valide che terminano con ogni lettera dell'alfabeto, da 2 a 15 lettere.",
  lengthSubtitle: "Sfogli tutte le parole Scrabble valide per lunghezza, da 2 a 15 lettere. Ogni lunghezza ha la propria pagina dedicata.",
  wordleStartsSubtitle: "Sfogli tutte le parole Wordle valide che iniziano con ogni lettera dell'alfabeto. Perfetto per trovare le migliori parole iniziali e restringere il puzzle giornaliero.",
  wordleEndsSubtitle: "Sfogli tutte le parole Wordle valide che terminano con ogni lettera dell'alfabeto. Perfetto per trovare ganci, suffissi e restringere il puzzle giornaliero.",
  startsHeading: "Parole che iniziano con — A a Z",
  endsHeading: "Parole che terminano con — A a Z",
  lengthHeading: "Riordina per lunghezza parola (2–15 lettere)",
  wordleStartsHeading: "Parole Wordle che iniziano con — A a Z",
  wordleEndsHeading: "Parole Wordle che terminano con — A a Z",
  clickLetterStarts: "Clicchi su una lettera per sfogliare tutte le parole che iniziano con quella lettera in una pagina dedicata.",
  clickLetterEnds: "Clicchi su una lettera per sfogliare tutte le parole che terminano con quella lettera in una pagina dedicata.",
  clickLength: "Clicchi su un numero per sfogliare tutte le parole di quella lunghezza in una pagina dedicata.",
  clickLetterWordleStarts: "Clicchi su una lettera per sfogliare tutte le parole Wordle che iniziano con quella lettera in una pagina dedicata.",
  clickLetterWordleEnds: "Clicchi su una lettera per sfogliare tutte le parole Wordle che terminano con quella lettera in una pagina dedicata.",
  wordleStartsBadge: "Wordle inizia",
  wordleEndsBadge: "Wordle termina",
  wordleStartsTitle: "Parole Wordle che iniziano con A-Z",
  wordleEndsTitle: "Parole Wordle che terminano con A-Z",
  returnHome: "Torna alla home",
  footerNote: "Tutte le parole sono filtrate attraverso dizionari ufficiali di Scrabble.",
  searchPlaceholderStarts: "Digiti una lettera A-Z per sfogliare le parole che iniziano con essa…",
  searchPlaceholderEnds: "Digiti una lettera A-Z per sfogliare le parole che terminano con essa…",
  searchPlaceholderLength: "Digiti un numero 2-15 per sfogliare per lunghezza…",
  searchPlaceholderWordleStarts: "Digiti una lettera A-Z per sfogliare le parole Wordle che iniziano con essa…",
  searchPlaceholderWordleEnds: "Digiti una lettera A-Z per sfogliare le parole Wordle che terminano con essa…",
  browseBtn: "Sfoglia",
 },
 wordListPage: {
  loading: "Caricamento delle liste di parole verificate…",
  filterPlaceholder: "Filtra parole…",
  filterLabel: "Filtra parole",
  clearFilter: "Cancella filtro",
  loadMore: "Carica altro",
  remaining: "rimanenti",
  allLengths: "Tutti",
  filterByLength: "Filtra per lunghezza parola",
  noMatch: "Nessuna parola corrisponde al filtro.",
  noWords: "Nessuna parola trovata.",
  wordsCount: "parole",
  error: "Caricamento delle parole non riuscito. Aggiorni la pagina.",
 },
};

const pt: Translation = {
 nav: {
  unscrambler: "Descodificador", scramble: "Mistura", wordle: "Wordle",
  quordle: "Quordle", anagram: "Anagramas", random: "Palavra Aleatória",
  wordfeud: "Wordfeud", dictionary: "Verificar Dicio.", scrabble: "Duplicate",
  wordlists: "Listas de Palavras", wordstarts: "Palavras Começam Por", wordends: "Palavras Terminam Em", wordlestarts: "Wordle Começa A-Z", wordleends: "Wordle Termina A-Z", about: "Sobre", contact: "Contato", privacy: "Privacidade", terms: "Termos de serviço",
  sitemap: "Mapa do site", tools: "Ferramentas", more: "Mais", solvers: "Solucionadores", site: "Site", wordlab: "Lab de Palavras", inbox: "Caixa de entrada",
  dashboard: "Painel", blitz: "Anagrama blitz", blitzShort: "Blitz"
 },
 brand: { name: "wordIzy", tagline: "Descodifica. Resolve. Vence." },
 common: {
  yourLetters: "Suas letras", unscramble: "Descodificar", clear: "Limpar", advancedFilters: "Filtros avançados",
  startsWith: "Começa por", endsWith: "Termina em", mustInclude: "Deve conter", dictionaryLabel: "Dicionário",
  results: "Resultados", noResults: "Nenhuma palavra. Tente outras letras ou curingas (? ou *).",
  wordsFound: "palavras encontradas", points: "pts", length: "letras", loading: "Carregando…", search: "Buscar",
  copy: "Copiar", copied: "Copiado!", tryExamples: "Testar:", tipsTitle: "Dicas e funcionamento",
  tileValues: "Valores das fichas Scrabble", blanks: "Curingas", languageLabel: "Idioma",
  showMore: "Mostrar mais", showLess: "Mostrar menos", allWords: "Todas as palavras", perGroup: "por grupo",
  wordsCount: "palavras", reset: "Redefinir", apply: "Aplicar", solve: "Resolver", generate: "Gerar",
  check: "Verificar", example: "Exemplo", none: "Nenhum", optional: "opcional",
 },
 home: {
  title: "Descodificador de Palavras", subtitle: "Digite suas letras misturadas, adicione curingas com ? ou *, e encontre todas as palavras jogáveis — agrupadas por tamanho e ordenadas por pontos Scrabble.",
  heroBadge: "Grátis • Sem cadastro • 9 idiomas",
  faqTitle: "Perguntas frequentes",
  q1: "Para que serve um descodificador de palavras?",
  a1: "Pega num conjunto de letras (como um suporte Scrabble) e encontra todas as palavras válidas do dicionário formáveis com essas letras. Ideal para Scrabble, Wordfeud, palavras-cruzadas e anagramas.",
  q2: "Como uso as opções avançadas?",
  a2: "Após digitar as letras, abra Filtros avançados. «Começa por» limita a palavras com esse prefixo, «Termina em» a sufixos, «Deve conter» garante certas letras. Combine com curingas (? ou *) para letras desconhecidas.",
  q3: "Como funciona?",
  a3: "O WordIzy compara suas letras com um dicionário completo em memória para o idioma escolhido, verifica quais palavras são formáveis (? e * como curingas), aplica filtros, pontua cada palavra com valores oficiais Scrabble e agrupa por tamanho — maiores primeiro.",
  q4: "Quais idiomas são suportados?",
  a4: "Inglês, francês, espanhol, italiano, português, alemão, neerlandês, mais japonês (romaji) e mandarim (pinyin). Troque o dicionário no seletor de idioma.",
 },
 scramble: { title: "Misturador / Sol. de palavras", subtitle: "Travado num anagrama? Digite as letras misturadas e as resolveremos em palavras reais.", inputLabel: "Letras misturadas", btn: "Resolver", solutionLabel: "Soluções possíveis", hint: "Use ? ou * para letras desconhecidas." },
 wordle: { title: "Sol. Wordle", subtitle: "Reduza o Wordle de hoje: letras verdes na posição, amarelas conhecidas, cinzas a excluir.", length: "Tamanho", placed: "Posicionadas (verde)", valid: "Válidas (amarelo)", excluded: "Excluídas (cinza)", btn: "Resolver", hint: "Use . ou _ para espaços, ex. A..LE" },
 quordle: { title: "Sol. Quordle", subtitle: "Resolva até quatro Wordle ao mesmo tempo. Cada tabuleiro tem suas restrições.", board: "Tabuleiro", addBoard: "Adicionar tabuleiro", hint: "Preencha o que souber e resolva." },
 anagram: { title: "Sol. Anagramas", subtitle: "Encontre todos os anagramas das suas letras — palavras que usam exatamente todas as letras.", btn: "Encontrar anagramas", hint: "Curingas (? *) completam." },
 random: { title: "Gerador de Palavras Aleatórias", subtitle: "Gere palavras reais aleatórias com filtros de tamanho, prefixo, sufixo e conteúdo.", length: "Tamanho", any: "Qualquer", count: "Quantas", btn: "Gerar" },
 wordfeud: { title: "Ajuda Wordfeud", subtitle: "Encontre as melhores palavras Wordfeud do seu suporte. Escolha o dicionário.", btn: "Encontrar palavras", hint: "Adicione ? ou * para fichas vazias." },
 dictionary: { title: "Verificar Dicionário", subtitle: "Verifique se uma palavra existe, veja a pontuação Scrabble e uma definição.", btn: "Verificar", exists: "é uma palavra válida", notExists: "não encontrada no dicionário", definition: "Definição", score: "Pontuação Scrabble", tiles: "Fichas" },
 scrabble: { title: "Scrabble Duplicate", subtitle: "O duplicate dá o mesmo suporte a todos. Digite 7 letras (e as do tabuleiro) e encontre as melhores jogadas.", rack: "Seu suporte", board: "Letras do tabuleiro (opcional)", btn: "Encontrar melhores", hint: "Curingas permitidos. Por pontuação." },
 wordlists: { title: "Listas de Palavras", subtitle: "Navegue por todas as palavras de 2 a 7 letras. Escolha vista, tamanho e letra para explorar A–Z.", allWords: "Todas as palavras", startsBy: "Começa por A–Z", endsBy: "Termina em A–Z", letter: "Letra", selectLength: "Tamanho", selectLetter: "Letra", browse: "Navegar" },
 about: {
  title: "Sobre o wordIzy",
  intro: "Bem-vindo ao wordIzy, seu destino principal para utilitários de jogos de palavras de alto desempenho, resolvedores de anagramas e recursos educacionais de quebra-cabeças. Criado por uma equipe dedicada de desenvolvedores independentes e entusiastas de quebra-cabeças de palavras de longa data, o wordIzy foi projetado desde o início para ser o conjunto de ferramentas de dicionário mais rápido, limpo e livre de distrações da web.",
  sections: [
   {
    heading: "Nossa missão",
    body: "Nossa missão é ajudar os jogadores a elevar seu vocabulário, treinar suas mentes e resolver disputas amigáveis de quebra-cabeças com precisão absoluta. Acreditamos que resolvedores de palavras não devem ser carregados de layouts intrusivos, tempos de carregamento lentos ou configurações complicadas. É por isso que o wordIzy oferece cálculos instantâneos, dicionários de Scrabble localizados em vários idiomas e motores de filtragem personalizados e intuitivos, projetados para um uso diário sem interrupções.",
   },
   {
    heading: "Por que escolher o wordIzy?",
    body: "Ao contrário das tabelas de consulta genéricas e básicas, nossas ferramentas são feitas sob medida para corresponder às mecânicas exatas dos jogos de palavras mais populares do mundo:\n• Bancos de dados de dicionários abrangentes: Oferecemos 9 idiomas, filtrando suas letras diretamente com os léxicos de competição oficiais como o Léxico (português pt-BR), NWL2023 e CSW21.\n• Lógica de jogo realista: Nosso sistema avançado de filtragem de curingas reconhece regras como as distribuições de letras em branco do Scrabble, atribuindo verdadeiros valores de zero ponto para que você possa planejar jogadas precisas de nível de torneio.\n• Ferramentas educativas inovadoras: Recursos exclusivos como nossa Save Vault salva localmente funcionam como um gerenciador pessoal de cartões de estudo, oferecendo aos jogadores um ambiente ativo para estudar padrões de palavras, ganchos e extensões offline.\n• Jogo envolvente: Além das ferramentas, criamos experiências personalizadas como o Anagram Blitz para oferecer aos amantes de jogos de palavras um ambiente acelerado para testar sua velocidade e desafiar seus recordes pessoais.",
   },
   {
    heading: "Nosso compromisso com a privacidade",
    body: "Valorizamos sua segurança digital e o desempenho do seu sistema. Opções avançadas como o histórico de favoritos de palavras são executadas diretamente usando o armazenamento local do seu navegador. Isso significa que suas listas de estudo pessoais nunca saem do seu dispositivo, não é necessário nenhum registro de conta de usuário e seus dados permanecem completamente privados.",
   },
   {
    heading: "Entre em contato",
    body: "Trabalhamos constantemente para melhorar nossos algoritmos de busca, expandir nossos bancos de dados e projetar novos modos de jogo. Se você tiver pedidos de recursos, correções de dicionário ou feedback geral, entre em contato conosco através de nossa página de Contato. Obrigado por fazer do wordIzy parte da sua rotina diária de jogos!",
   },
  ],
 },
 contact: {
  title: "Contacte-nos",
  intro: "Tem uma pergunta, feedback ou sugestão de funcionalidade para o wordIzy? Adoraríamos ouvir de si!\n\nSeja por ter encontrado uma palavra em falta nos nossos dicionários de Scrabble, ter encontrado um erro enquanto jogava Anagram Blitz, ou simplesmente querer sugerir uma nova variação de ferramenta, o seu contributo ajuda-nos a construir uma melhor plataforma para os jogadores de puzzles de palavras em todo o mundo.",
  sections: [
   {
    heading: "Como nos contactar",
    body: "Por favor, envie todas as consultas, feedback ou pedidos de suporte diretamente para o nosso e-mail oficial de administração:\n📩 support@wordizy.com",
   },
   {
    heading: "Por favor, inclua na sua mensagem",
    body: "Para nos ajudar a processar o seu pedido o mais rapidamente possível, por favor inclua quaisquer detalhes relevantes:\n• Para relatórios de erros: Indique-nos qual o dispositivo ou navegador que estava a usar (por ex. iPhone/Safari ou Computador/Chrome).\n• Para correções de dicionário: Mencione a palavra específica, o dicionário de idioma ou o modo de jogo que estava a usar.\n• Para parcerias: Por favor, indique claramente o nome da sua empresa ou plataforma na linha de assunto.",
   },
   {
    heading: "Tempos de resposta esperados",
    body: "Somos uma pequena equipa de desenvolvimento independente, mas lemos cada feedback que recebemos. Pode geralmente esperar uma resposta nossa dentro de 24 a 48 horas, de segunda a sexta-feira.",
   },
  ],
  closing: "Obrigado por fazer parte da comunidade wordIzy!",
 },
 privacy: {
  title: "Política de privacidade",
  intro: "No wordIzy, acessível em wordizy.com, uma das nossas principais prioridades é a privacidade dos nossos visitantes. Este documento de Política de privacidade contém os tipos de informação que são recolhidos e registados pelo wordIzy e como os utilizamos.\n\nSe tiver questões adicionais ou necessitar de mais informações sobre a nossa Política de privacidade, não hesite em contactar-nos.",
  lastUpdated: "Última atualização: 28 de outubro de 2026",
  sections: [
   {
    heading: "Ficheiros de registro",
    body: "O wordIzy segue um procedimento padrão de utilização de ficheiros de registro. Estes ficheiros registam os visitantes quando visitam sites. Todas as empresas de alojamento o fazem como parte das análises dos serviços de alojamento. As informações recolhidas pelos ficheiros de registro incluem endereços de protocolo de Internet (IP), tipo de navegador, fornecedor de serviços de Internet (ISP), carimbo de data e hora, páginas de referência/saída e possivelmente o número de cliques. Estes não estão ligados a nenhuma informação pessoal identificável. O propósito da informação é analisar tendências, administrar o site, monitorizar o movimento dos utilizadores no site e recolher informações demográficas.",
   },
   {
    heading: "Cookies e Web Beacons",
    body: "Como qualquer outro site, o wordIzy utiliza \"cookies\". Estes cookies são usados para armazenar informações, incluindo as preferências dos visitantes, e as páginas no site que o visitante acessou ou visitou. A informação é usada para otimizar a experiência dos utilizadores personalizando o conteúdo da nossa página web com base no tipo de navegador do visitante e/ou outras informações.",
   },
   {
    heading: "Cookie DART do Google DoubleClick",
    body: "O Google é um dos fornecedores terceiros no nosso site. Também utiliza cookies, conhecidos como cookies DART, para veicular anúncios aos visitantes do nosso site com base na sua visita a wordizy.com e a outros sites na internet. No entanto, os visitantes podem optar por recusar a utilização de cookies DART visitando a Política de privacidade da rede de anúncios e conteúdos do Google no seguinte URL: google.com",
   },
   {
    heading: "Os nossos parceiros publicitários",
    body: "Alguns dos anunciantes no nosso site podem utilizar cookies e web beacons. Os nossos parceiros publicitários incluem: Google AdSense. Cada um dos nossos parceiros publicitários tem a sua própria Política de privacidade para as suas políticas sobre dados de utilizadores. Para um acesso mais fácil, colocamos uma hiperligação para as suas Políticas de privacidade acima. Os servidores de anúncios de terceiros ou as redes de anúncios usam tecnologias como cookies, JavaScript ou Web Beacons que são usados nos respetivos anúncios e ligações que aparecem no wordIzy, que são enviados diretamente para os navegadores dos utilizadores. Eles recebem automaticamente o seu endereço IP quando isso ocorre. Estas tecnologias são usadas para medir a eficácia das suas campanhas publicitárias e/ou personalizar o conteúdo publicitário que vê nos sites que visita.\n\nPor favor, note que o wordIzy não tem acesso nem controlo sobre estes cookies que são usados pelos anunciantes terceiros.",
   },
   {
    heading: "Políticas de privacidade de terceiros",
    body: "A Política de privacidade do wordIzy não se aplica a outros anunciantes ou sites. Assim, aconselhamos-o a consultar as respetivas Políticas de privacidade destes servidores de anúncios de terceiros para informações mais detalhadas. Estas podem incluir as suas práticas e instruções sobre como excluir-se de certas opções.\n\nPode optar por desativar os cookies através das opções individuais do seu navegador. Para obter informações mais detalhadas sobre a gestão de cookies com navegadores web específicos, pode ser encontrada nos respetivos sites dos navegadores.",
   },
   {
    heading: "Armazenamento local do navegador",
    body: "Para fornecer as nossas funcionalidades personalizadas sem exigir contas de utilizador ou registos, o wordIzy utiliza o armazenamento local do seu navegador (localStorage) para funcionalidades como a Save Vault e preferências de jogo. Estes dados são armazenados inteiramente no seu dispositivo local. Nunca são transmitidos para os nossos servidores, partilhados com terceiros ou usados para fins de rastreamento entre sites externos. Pode limpar estes dados a qualquer momento limpando a cache do seu navegador ou usando as opções fornecidas dentro das interfaces das ferramentas.",
   },
   {
    heading: "Informações sobre crianças",
    body: "Outra parte da nossa prioridade é acrescentar proteção às crianças durante a utilização da internet. Encorajamos os pais e encarregados de educação a observar, participar e/ou monitorizar e orientar a sua atividade online.\n\nO wordIzy não recolhe conscientemente nenhuma Informação Pessoal Identificável de crianças com idade inferior a 13 anos. Se achar que a sua criança forneceu este tipo de informação no nosso site, encorajamos fortemente a contactar-nos imediatamente e faremos o nosso melhor para prontamente remover tal informação dos nossos registos.",
   },
   {
    heading: "Apenas política de privacidade online",
    body: "Esta Política de privacidade aplica-se apenas às nossas atividades online e é válida para os visitantes do nosso site no que diz respeito à informação que partilharam e/ou recolheram no wordIzy. Esta política não se aplica a nenhuma informação recolhida offline ou através de canais que não este site.",
   },
   {
    heading: "Consentimento",
    body: "Ao usar o nosso site, aceita assim a nossa Política de privacidade e concorda com os seus Termos e Condições.",
   },
  ],
  thirdPartyServices: [
    {
      name: "Google AdSense",
      description: "Exibe anúncios aos visitantes do nosso site. Utiliza cookies (cookies DART) para mostrar anúncios com base nas suas visitas a wordizy.com e outros sites. Pode recusar os cookies DART visitando a Política de privacidade da rede de anúncios e conteúdos do Google.",
      url: "https://policies.google.com/technologies/ads",
    },
  ],
 },
 terms: {
  title: "Termos de serviço",
  intro: "Bem-vindo ao wordIzy (acessível via wordizy.com). Estes Termos de serviço (os \"Termos\") regem o seu acesso e uso do nosso site, ferramentas de ajuda para jogos de palavras, dicionários e jogos interativos como Anagram Blitz (coletivamente, os \"Serviços\").\n\nAo aceder ou utilizar o wordIzy, concorda em ficar vinculado a estes Termos e à nossa Política de privacidade. Se não concordar com estes Termos, por favor não utilize os nossos Serviços.",
  lastUpdated: "Última atualização: 28 de outubro de 2026",
  sections: [
   {
    heading: "1. Descrição do Serviço",
    body: "O wordIzy fornece ferramentas gratuitas online de assistência a puzzles de palavras, solucionadores de anagramas, pesquisas em dicionário e mini-jogos baseados em palavras. Todos os Serviços são fornecidos numa base \"tal como está\" e \"conforme disponível\" para fins pessoais, não comerciais, de entretenimento e educativos apenas.",
   },
   {
    heading: "2. Uso permitido e restrições",
    body: "É-lhe concedida uma licença limitada, não exclusiva, não transferível e revogável para aceder e usar o wordIzy estritamente em conformidade com estes Termos.\nComo condição de uso, concorda em não:\n• Utilizar sistemas automatizados, scrapers, spiders, robots ou scripts para extrair dados, texto ou listas de palavras das nossas bases de dados.\n• Interferir ou interromper o desempenho, integridade ou segurança dos servidores do site.\n• Enquadrar ou espelhar qualquer parte do site sem a nossa autorização prévia por escrito.\n• Utilizar as nossas ferramentas de ajuda a jogos de palavras ou sistemas automatizados para fazer batota em ambientes competitivos online onde ferramentas de assistência externa são explicitamente proibidas pelos termos respetivos dessas plataformas.",
   },
   {
    heading: "3. Direitos de propriedade intelectual",
    body: "Todo o conteúdo, funcionalidades, características, logótipos, design do site, texto e software de jogo personalizado (incluindo Anagram Blitz) no wordIzy são propriedade exclusiva do wordIzy e estão protegidos por leis internacionais de direitos de autor, marcas e propriedade intelectual. Não pode reproduzir, distribuir, modificar ou criar obras derivadas da nossa propriedade sem consentimento expresso por escrito.",
   },
   {
    heading: "4. Marcas de terceiros e isenção de responsabilidade",
    body: "As referências a jogos de terceiros, incluindo mas não limitando-se a Scrabble, Wordle, Words With Friends, Wordfeud e Quordle, são usadas apenas para fins informativos e descritivos para explicar a compatibilidade das nossas ferramentas. O wordIzy é uma plataforma independente e não é afiliada, apoiada, autorizada ou patrocinada pela Hasbro, Mattel, The New York Times Company, ou qualquer uma das suas respetivas empresas-mãe ou afiliadas.",
   },
   {
    heading: "5. Dados do utilizador e armazenamento local",
    body: "O wordIzy não requer registo de utilizador ou criação de conta. Funcionalidades como a Save Vault utilizam o armazenamento local do seu navegador web (localStorage) para guardar estados de configuração e histórico de palavras localmente no seu dispositivo. Não assumimos qualquer responsabilidade ou obrigação por qualquer perda de dados decorrente da limpeza de caches do navegador, mudanças de hardware ou atualizações do navegador.",
   },
   {
    heading: "6. Limitações de responsabilidade",
    body: "Em nenhuma circunstância o wordIzy, os seus programadores ou os seus afiliados serão responsáveis por quaisquer danos diretos, indiretos, incidentais, especiais ou consequentes decorrentes do uso ou da impossibilidade de usar o nosso site, mesmo que informados da possibilidade de tais danos. Não garantimos que as listas de palavras, cálculos de pontuação ou configurações do assistente de dicionário sejam totalmente isentos de erros ou atualizadas para corresponder aos patches em tempo real dos dicionários de jogo.",
   },
   {
    heading: "7. Modificações ao Serviço e aos Termos",
    body: "Reservamo-nos o direito de modificar, suspender ou descontinuar qualquer aspeto dos nossos Serviços a qualquer momento sem aviso prévio. Reservamo-nos também o direito de alterar estes Termos ao nosso critério. O seu uso continuado do wordIzy após qualquer atualização publicada constitui a sua aceitação dos Termos revistos.",
   },
   {
    heading: "8. Lei aplicável",
    body: "Estes Termos serão regidos e interpretados de acordo com as práticas internacionais de comércio digital, sem consideração pelos princípios de conflito de leis.",
   },
   {
    heading: "9. Informações de contacto",
    body: "Se tiver alguma questão ou esclarecimento sobre estes Termos de serviço, contacte-nos através da nossa página de contacto oficial.",
   },
  ],
 },
 sitemap: { title: "Mapa do site", body: "Todas as páginas do WordIzy." },
 footer: { rights: "Todos os direitos reservados.", madeWith: "Feito para amantes das palavras.", links: "Links rápidos", desc: "Descodificador e resolvedores gratuitos em 9 idiomas. Sem cadastro.", disclaimer: "Para entretenimento e jogos de palavras. Não afiliado com Scrabble ou Wordle." },
 faq: {
  title: "Como usar & FAQ",
  unscrambler: [
   { q: "O que é um descodificador de palavras e como o uso?", a: "Um descodificador pega num conjunto de letras — como um suporte de Scrabble (ex. SRAABLC) — e encontra todas as palavras válidas do dicionário escrevíveis com essas letras. Escreve as tuas letras na caixa «As tuas letras» e clica em Descodificar. Os resultados aparecem agrupados por comprimento (os mais longos primeiro), cada palavra mostra o seu valor em pontos Scrabble. Ideal para Scrabble, Words With Friends, Wordfeud, palavras cruzadas e puzzles de anagramas." },
   { q: "Como funcionam os curingas (? e *)?", a: "Usa ? ou * como curinga sempre que tiveres uma letra desconhecida — representam uma peça em branco do Scrabble, uma casa vazia de palavras cruzadas ou a letra não confirmada num palpite de Wordle. Escrever «QUER?Y» pede ao WordIzy que encontre todas as palavras correspondentes a «QUER» + uma letra qualquer + «Y», devolvendo QUERY diretamente. Cada curinga vale 0 pontos (igual às regras oficiais das peças em branco), o que mantém a pontuação mostrada realista quando jogas com um branco no teu suporte. Podes encadear vários curingas ao mesmo tempo — «A??LE» corresponde a APPLE, ADDLE, AGILE, AISLE e ABLE — tornando os curingas a ferramenta ideal para explorar anagramas quando o suporte está incompleto. Para manter os resultados úteis, limita os curingas a um ou dois por consulta: cada curinga adicional multiplica o conjunto de candidatos, e para além de três começarás a ver palavras que não são realmente jogáveis das tuas peças reais. Os curingas também funcionam no Solver Wordle, no Solver de Anagramas e no Ajuda Wordfeud com semântica idêntica, para que possas usar o mesmo fluxo de letras parciais em todas as ferramentas do site." },
   { q: "Como uso os Filtros avançados?", a: "Clica em «Filtros avançados» para mostrar três campos opcionais. «Começa por» limita os resultados a palavras que começam pelas letras indicadas (ex. «AB» → só palavras que começam por AB). «Termina em» faz o mesmo para sufixos (ex. «ED» → só palavras que terminam em ED). «Deve incluir» garante que certas letras apareçam em cada resultado, em qualquer posição. Combina os três com curingas para controlo preciso." },
   { q: "Como são pontuadas as palavras?", a: "Cada palavra é pontuada com os valores oficiais das letras inglesas do Scrabble: A=1, B=3, C=3, D=2, E=1, F=4, G=2, H=4, I=1, J=8, K=5, L=1, M=3, N=1, O=1, P=3, Q=10, R=1, S=1, T=1, U=1, V=4, W=4, X=8, Y=4, Z=10. Os curingas (? *) atuam como peças em branco e valem 0 pontos, como nas regras oficiais. O WordIzy calcula automaticamente o total de cada resultado e ordena-os por pontuação dentro de cada grupo de comprimento, de modo que as jogadas mais valiosas aparecem no topo de cada lista — poupando-te a aritmética mental de somar os valores das peças e permitindo-te identificar o bingo candidato num relance. Para os outros idiomas, o WordIzy usa os valores oficiais Scrabble do dicionário desse idioma (ODS9 para francês, FISE para espanhol, Zingarelli para italiano, Português, Alemão, OpenTaal para holandês, mais listas romanizadas/pinyin para japonês e mandarim). Muda de idioma com o seletor na barra de navegação para ver a pontuação localizada. As pontuações reais em jogo também dependem das casas bónus (letra/palavra dupla/tripla) e do bónus bingo de +50 por usar as 7 peças, por isso considera a pontuação mostrada como linha de base e adiciona mentalmente os bónus ao planear a jogada." },
   { q: "Que dicionários estão disponíveis?", a: "O WordIzy suporta 9 idiomas: inglês (NWL2023 + CSW21), francês (ODS9 2024), espanhol (FISE), italiano (Zingarelli), português, alemão, neerlandês (OpenTaal), além de japonês (romaji) e mandarim (pinyin). Todas as palavras são filtradas pelo dicionário oficial Scrabble de cada idioma. Muda de idioma no seletor da barra de navegação." },
   { q: "Por que os resultados são agrupados por comprimento?", a: "Agrupar por comprimento facilita encontrar o tipo de jogada que precisas. No Scrabble, palavras mais longas costumam valer mais, mas às vezes uma palavra mais curta encaixa melhor no tabuleiro. As palavras mais longas aparecem no topo, descendo até às de 2 letras. Dentro de cada grupo, as palavras são ordenadas por pontuação Scrabble para detetares rapidamente a melhor jogada." },
  ],
  scramble: [
   { q: "Para que serve o Mistura / Resolvedor?", a: "Esta ferramenta resolve puzzles de anagramas — em que as letras estão misturadas e tens de encontrar a(s) palavra(s) original(is). Escreve as letras misturadas (ex. RBOLENW) e clica em Resolver para ver todas as palavras reais formáveis. Perfeito para anagramas de jornal, jogos de palavras e desafios de palavras misturadas." },
   { q: "Em que difere do Descodificador?", a: "O Resolvedor usa o mesmo motor do Descodificador mas foca-se em resolver puzzles de palavras misturadas em vez de encontrar todas as palavras possíveis de um suporte. Podes também usar a função «Misturar uma palavra» sob a entrada para transformar uma palavra em variantes aleatórias — útil para criar os teus próprios puzzles." },
   { q: "Posso usar curingas?", a: "Sim. Usa ? ou * para representar letras desconhecidas. Por exemplo, se um puzzle tem uma letra em falta, escreve as letras conhecidas mais um ? e o WordIzy preenche o espaço com todas as combinações válidas." },
   { q: "Como crio a minha própria palavra misturada?", a: "Usa o cartão «Misturar uma palavra» sob a entrada principal. Escreve qualquer palavra (ex. «scrabble») e clica em Gerar — o WordIzy produz várias misturas aleatórias dessa palavra. Usa-as para criar puzzles para amigos ou praticar." },
  ],
  wordle: [
   { q: "Como funciona o Sol. Wordle?", a: "O Resolvedor Wordle estreita a resposta de hoje usando o feedback da tua partida. Introduz as informações recolhidas dos teus palpites: letras verdes (posição correta), letras amarelas (na palavra mas na posição errada) e letras cinzentas (não na palavra). O solver devolve todas as palavras válidas que cumprem as tuas restrições." },
   { q: "Como introduzo as letras colocadas (verdes)?", a: "No campo «Letras colocadas (verde)», escreve as letras que sabes estar na posição correta, usando . ou _ para espaços vazios. Por exemplo, se sabes que a palavra é A _ _ L E, escreve «A..LE». O solver só devolve palavras que correspondem exatamente a esse padrão." },
   { q: "O que são letras válidas (amarelas) e excluídas (cinzentas)?", a: "Letras válidas (amarelas) são letras que sabes ESTAR na palavra mas não na posição que tentaste — escreve-as todas no campo «Letras válidas» (ex. «RST»). Letras excluídas (cinzentas) são letras confirmadas NÃO na palavra — escreve-as em «Letras excluídas» (ex. «BXF»). O solver filtra qualquer palavra que contenha letras excluídas." },
   { q: "Que comprimento de palavra usar?", a: "Seleciona o comprimento do Wordle de hoje (predefinição 5). O WordIzy suporta palavras de 4 a 8 letras, pelo que também funciona para variantes como Quordle, Octordle e jogos de comprimento personalizado." },
   { q: "Dicas para escolher o próximo palpite?", a: "Escolhe dos resultados uma palavra que use letras comuns que ainda não testaste (R, T, S, L, N). Isso maximiza o ganho de informação. Se a lista for longa, escolhe uma palavra que elimine mais possibilidades. O solver mostra a pontuação Scrabble de cada palavra — pontuações altas costumam indicar letras raras que ajudam a estreitar." },
  ],
  quordle: [
   { q: "O que é o Sol. Quordle?", a: "Quordle é um jogo em que resolves quatro Wordle em simultâneo. Este solver permite introduzir restrições para até 4 tabuleiros de uma só vez e devolve palavras candidatas para cada um. Cada tabuleiro mantém as suas próprias letras colocadas (verdes), válidas (amarelas) e excluídas (cinzentas)." },
   { q: "Como uso vários tabuleiros?", a: "Preenche o que sabes de cada tabuleiro. As restrições do tabuleiro 1 só afetam os seus resultados. Clica em «Adicionar tabuleiro» para chegar até 4 tabuleiros. Usa o botão X para remover um tabuleiro. Quando estiveres pronto, clica em Resolver para obter palavras candidatas de todos os tabuleiros." },
   { q: "Devo partilhar letras entre tabuleiros?", a: "Sim — uma estratégia chave do Quordle é usar um palpite para recolher informação em vários tabuleiros. Se uma letra é verde no tabuleiro 1, é provável que esteja na mesma posição nos outros. Introduz restrições partilhadas em cada tabuleiro para cruzar informação e estreitar as quatro respostas mais depressa." },
   { q: "Dicas estratégicas para Quordle?", a: "Começa com uma palavra rica em letras comuns (como CRANE ou SLATE) para recolher informação em todos os tabuleiros. Foca-te primeiro no tabuleiro com mais restrições — resolvê-lo liberta espaço mental. Usa o solver após 2-3 palpites, quando tens informação suficiente para reduzir cada tabuleiro a uma lista gerível." },
  ],
  anagram: [
   { q: "O que é um anagrama?", a: "Um anagrama é uma palavra ou frase formada ao reorganizar todas as letras de outra palavra. Por exemplo, LISTEN e SILENT são anagramas — mesmas letras, ordem diferente. O Resolvedor de Anagramas encontra todas as palavras que usam exatamente todas as letras que forneces." },
   { q: "Em que difere do Descodificador?", a: "O Descodificador encontra palavras de QUALQUER comprimento formáveis com as tuas letras (incluindo mais curtas). O Resolvedor de Anagramas só encontra palavras que usam TODAS as tuas letras — os anagramas de comprimento completo. Por exemplo, com «CHIEN», o solver devolve CHIEN, CHINE, NICHE (todas 5 letras), enquanto o descodificador também devolveria palavras mais curtas como ICE, IN, HE." },
   { q: "Posso usar curingas?", a: "Sim. Usa ? ou * como curingas para preencher espaços restantes. Por exemplo, escrever «CAT??» encontra todos os anagramas de 5 letras em que CAT é combinado com duas letras quaisquer. Os curingas valem 0 pontos (como peças em branco)." },
   { q: "Para que servem os anagramas?", a: "Anagramas usam-se em jogos de palavras, puzzles, criptografia e linguística. No Scrabble, encontrar anagramas do suporte ajuda a detetar bingos (usar as 7 peças para um bónus de 50 pontos). Também são populares em definições de palavras cruzadas, trivialidades e enigmas." },
  ],
  random: [
   { q: "O que faz o Gerador de Palavras Aleatórias?", a: "Gera palavras reais aleatórias do dicionário selecionado, com filtros opcionais. Podes especificar comprimento, letras iniciais, letras finais ou letras que a palavra deve conter. Usa-o para jogos, escrita criativa, naming, prática de vocabulário ou gerar palavras-passe com palavras reais." },
   { q: "Como filtro as palavras aleatórias?", a: "Define «Comprimento» num número específico (2-12) ou deixa em «Qualquer». «Começa por» limita a palavras que começam por essas letras. «Termina em» limita a palavras que terminam com essas letras. «Contém» exige que a palavra inclua certas letras em qualquer posição. «Quantas» controla o número de palavras geradas (1-200)." },
   { q: "As palavras são válidas no Scrabble?", a: "Sim. Todas as palavras geradas vêm do dicionário oficial Scrabble do idioma selecionado (NWL2023/CSW21 para inglês, ODS9 para francês, etc.). Cada palavra é jogável em Scrabble e outros jogos de palavras." },
   { q: "Posso usar isto para jogos de palavras?", a: "Com certeza. Gera palavras aleatórias para Pictionary, charadas, jogos de associação ou quizzes de vocabulário. Para palavras-passe, combina 3-4 palavras aleatórias de comprimentos diferentes — cria passphrases memoráveis mas seguras." },
  ],
  wordfeud: [
   { q: "O que é a Ajuda Wordfeud?", a: "Wordfeud é um popular jogo móvel de palavras semelhante ao Scrabble. Esta ajuda encontra as melhores palavras que podes jogar do teu suporte. Introduz as tuas 7 letras (mais letras já no tabuleiro) e o WordIzy devolve todas as palavras jogáveis, ordenadas por pontuação Scrabble." },
   { q: "Como introduzo o meu suporte?", a: "Escreve as tuas 7 letras de peças na caixa «As tuas letras». Usa ? ou * para peças em branco (representam qualquer letra mas valem 0 pontos). Se já há letras no tabuleiro sobre as quais queiras construir, adiciona-as também — o WordIzy encontra palavras formáveis do pool combinado." },
   { q: "Que dicionário devo usar?", a: "Wordfeud suporta vários dicionários consoante a tua região. O Wordfeud em inglês usa uma lista tipo Scrabble, por isso inglês (NWL2023/CSW21) funciona bem. Para outros idiomas, seleciona o correspondente (francês ODS9, espanhol FISE, etc.) no seletor de idioma." },
   { q: "Como são calculadas as pontuações?", a: "As pontuações usam os valores oficiais Scrabble do idioma selecionado. Nota: a pontuação real do Wordfeud pode diferir ligeiramente (tem casas bónus e a sua própria distribuição de peças). Usa as pontuações como guia para identificar jogadas de alto valor — a palavra com mais pontos do teu suporte é geralmente a tua melhor jogada." },
  ],
  dictionary: [
   { q: "O que faz Verificar Dicionário?", a: "Introduz qualquer palavra para verificar se é válida no dicionário oficial Scrabble do idioma selecionado. A ferramenta mostra a palavra como peças Scrabble, um selo válido/inválido, a pontuação Scrabble, o comprimento, as peças, uma definição e sinónimos (quando disponíveis)." },
   { q: "De onde vêm as definições?", a: "As definições vêm de várias fontes: a API Free Dictionary (inglês, francês, espanhol, alemão, italiano, português), Wiktionary (todos os idiomas como recurso) e um assistente de IA para eventuais lacunas. A fonte é indicada junto a cada definição." },
   { q: "De onde vêm os sinónimos?", a: "Os sinónimos vêm de Datamuse (inglês, espanhol, francês, italiano, português) e OpenThesaurus (alemão). Apenas se mostram sinónimos que são eles próprios palavras válidas em Scrabble — clica num sinónimo para verificá-lo de imediato." },
   { q: "Por que uma palavra comum poderia ser inválida?", a: "Os dicionários Scrabble são rigorosos — excluem nomes próprios, abreviaturas, palavras com hífen e palavras com apóstrofo. Por exemplo, «BRUNCH» é válida mas «BRUNCH'S» pode não ser. Se uma palavra parece faltar, pode ser um nome próprio capitalizado ou um acréscimo recente ainda não na lista oficial. Muda de idioma para verificar a palavra noutro dicionário." },
  ],
  scrabble: [
   { q: "O que é Scrabble Duplicate?", a: "Scrabble duplicate é uma variante em que cada jogador recebe o mesmo suporte e deve encontrar a melhor jogada possível. Usa-se em torneios e treino para testar habilidade sem sorte. Esta ferramenta ajuda-te a encontrar as palavras mais pontuadas do teu suporte — introduz as tuas 7 letras e, opcionalmente, letras do tabuleiro, depois clica em «Buscar melhores palavras»." },
   { q: "Como introduzo letras do tabuleiro?", a: "Se já há letras no tabuleiro sobre as quais podes construir, escreve-as no campo «Letras do tabuleiro (opcional)» juntamente com as do teu suporte. O WordIzy trata o pool combinado como letras disponíveis. Isto ajuda a encontrar palavras que se engatam em jogadas existentes — essencial para maximizar a pontuação em partidas reais." },
   { q: "Como são classificadas as melhores jogadas?", a: "As palavras são ordenadas por pontuação Scrabble (mais alta primeiro). As 10 melhores jogadas aparecem no topo numa lista destacada. Lembra-te: a pontuação real também depende de casas bónus (letra/palavra dupla/tripla) e de bingos (bónus de 50 pontos por usar as 7 peças). Usa as pontuações da ferramenta como base e depois integra o posicionamento no tabuleiro." },
   { q: "O que é um bingo e como encontro um?", a: "Um bingo é a maior virada isolada no Scrabble: jogar todas as 7 peças num único turno dá um bónus de +50 para além da pontuação base da palavra, por isso uma palavra de 30 pontos transforma-se numa jogada de 80. Para encontrar bingos com o WordIzy, introduz o teu suporte completo de 7 letras (usa ? ou * para peças em branco) e olha o grupo de resultados de 7 letras no topo da lista — cada palavra aí é um bingo potencial. Os bingos de 7 letras mais valiosos no Scrabble inglês são MUZJIKS (29 base + 50 = 79 pontos), JACUZZI (34 + 50 = 84), SYZYGY (21 + 50 = 71), OXAZOLIDINE (raro mas devastador) e os radicais ANATOMIZ-, ANTISOCIAL-, OVERLAPPING- que aceitam sufixos comuns. Para detetar bingos mais depressa, aprende os radicais de alto valor — SATISFI-, ANTISOY-, OVERLAP- — que se combinam com -ER, -ED, -ING, -ATION. Guarda uma ou duas letras flexíveis (E, R, S, T) quando o teu suporte tem forma de bingo, porque o bónus de bingo (+50) quase sempre compensa os pontos que ganharias ao descarregar essas peças cedo." },
  ],
  wordlists: [
   { q: "O que é a página Listas de Palavras?", a: "Listas de Palavras permite-te navegar por todas as palavras válidas em Scrabble de 2 a 7 letras. As palavras são agrupadas por comprimento e depois por letra final (A-Z), para explorar o dicionário de forma sistemática. Usa-a para estudar, encontrar palavras para partidas ou ampliar o vocabulário." },
   { q: "Como filtro por comprimento?", a: "Usa o seletor de comprimento (2-7) no topo. Clica em «Todas» para ver todos os comprimentos empilhados (palavras de 2 letras no topo, de 7 no fundo), ou num número específico para ver só esse comprimento. Cada secção de comprimento mostra 26 contentores (um por letra final A-Z)." },
   { q: "Como filtro por letra?", a: "Usa a linha A-Z sob o seletor de comprimento. Clica numa letra para mostrar só as palavras que terminam com essa letra, ou «Todas» para mostrar todas. Útil para encontrar palavras que se engatam numa letra já no tabuleiro." },
   { q: "Por que as palavras são mostradas em maiúsculas?", a: "As peças Scrabble são maiúsculas, por isso as palavras são mostradas em maiúsculas para corresponder. Cada palavra mostra o seu valor Scrabble ao lado. Dentro de cada contentor de letra, as palavras são ordenadas alfabeticamente (A-Z) para facilitar a leitura." },
  ],
  wordstarts: [
   { q: "O que é a página Começa Por?", a: "Esta página permite-te navegar por todas as palavras válidas em Scrabble que COMEÇAM por uma letra específica. Seleciona uma letra (A-Z) e o WordIzy mostra todas as palavras que começam por essa letra, agrupadas por comprimento (2-7 letras). Perfeita para estudar aberturas e encontrar palavras para construir sobre uma letra inicial no tabuleiro." },
   { q: "Como uso os seletores de comprimento e letra?", a: "Primeiro, escolhe uma letra da linha A-Z — isso define a letra inicial. Depois usa a linha de comprimento (2-7 ou Todas) para filtrar por comprimento. Cada secção mostra todas as palavras que começam pela letra escolhida, ordenadas alfabeticamente. Clica em «Todas» numa das linhas para remover esse filtro." },
   { q: "Como isto ajuda no Scrabble?", a: "Conhecer as palavras que começam por cada letra ajuda a planear aberturas e engates. Se tens um Q, conhecer todas as palavras com Q (QI, QAT, QUAD...) ajuda a jogá-lo com eficácia. A página também é valiosa para palavras cruzadas, onde as pistas costumam indicar «começa por...»." },
   { q: "Por que paginar a 50 palavras?", a: "Algumas letras (como S, A, E) têm milhares de palavras iniciais. Para manter as páginas rápidas e legíveis, os resultados paginam a 50 palavras por página com botões anterior/seguinte. Cada página indica o número e o total para te localizares." },
  ],
  wordends: [
   { q: "O que é a página Termina Em?", a: "Esta página permite-te navegar por todas as palavras válidas em Scrabble que TERMINAM com uma letra específica. Seleciona uma letra (A-Z) e o WordIzy mostra todas as palavras que terminam com essa letra, agrupadas por comprimento (2-7 letras). Ideal para encontrar palavras que se engatem numa letra já presente no tabuleiro." },
   { q: "Como uso os seletores de comprimento e letra?", a: "Primeiro, escolhe uma letra da linha A-Z — isso define a letra final. Depois usa a linha de comprimento (2-7 ou Todas) para filtrar por comprimento. Cada secção mostra todas as palavras que terminam com a letra escolhida, ordenadas alfabeticamente. Clica em «Todas» numa das linhas para remover esse filtro." },
   { q: "Como isto ajuda no Scrabble?", a: "As letras finais importam para os engates — se há um S no tabuleiro, conhecer todas as palavras terminadas em S permite-te pluralizar ou estender jogadas. Do mesmo modo, conhecer palavras terminadas em D, ED, ING ajuda a apoiar-te em sufixos comuns. Esta página é uma poderosa ferramenta de estudo para jogo competitivo." },
   { q: "Por que paginar a 50 palavras?", a: "Algumas letras (como E, S, D) têm milhares de palavras finais. Para manter as páginas rápidas e legíveis, os resultados paginam a 50 palavras por página com botões anterior/seguinte. Cada página indica o número e o total para te localizares." },
  ],
  vault: [
   { q: "O que é o Cofre de salvamento?", a: "O Cofre de salvamento é uma ferramenta integrada de treino vocabulatório para jogadores competitivos de Scrabble e Wordle — uma lista pessoal de palavras favoritas concebida especificamente para o estudo por repetição espaçada de combinações de letras difíceis. Ao contrário dos marcadores genéricos do navegador, o cofre mantém visível a pontuação Scrabble de cada palavra guardada e deixa-te copiar toda a lista diretamente para uma app de flashcards ou um baralho Anki para exercitação offline. Eis o fluxo de trabalho em 4 passos que os jogadores competitivos usam: (1) Executa uma pesquisa como «palavras de 7 letras a partir de QUARTZE» ou «palavras que começam por Q» e marca com estrela as palavras de alto valor que continuas a esquecer — QAT, QOPH, FAQIR, MUZJIKS. (2) Abre a gaveta do cofre a partir do ícone de estrela no canto superior direito; as tuas palavras guardadas ficam organizadas numa só lista com a pontuação ao vivo ao lado de cada entrada. (3) Clica em «Copiar Todas as Linhas» para colar a lista no Anki, Quizlet ou um modelo de flashcards imprimíveis para repetição espaçada longe do ecrã. (4) Volta a executar a mesma pesquisa na semana seguinte e compara quais palavras memorizaste — a tua lista guardada persiste localmente no localStorage do navegador, por isso nunca sai do teu dispositivo, não precisa de conta e funciona offline uma vez carregada a página." },
   { q: "Como salvo uma palavra no cofre?", a: "Clique no ícone de estrela (☆) ao lado de qualquer palavra nos resultados. A estrela fica âmbar (★) quando uma palavra é salva. Clique novamente para remover a palavra do seu cofre." },
   { q: "Como vejo minhas palavras salvas?", a: "Clique no ícone de estrela no cabeçalho do site (canto superior direito). Uma gaveta desliza da direita mostrando todas as suas palavras salvas. Você pode copiar palavras individuais, copiar toda a lista, ou limpar o cofre." },
   { q: "Meu cofre é sincronizado entre dispositivos?", a: "Não — o cofre é armazenado no localStorage do seu navegador, então é por dispositivo. Se você limpar os dados do navegador ou usar um dispositivo diferente, seu cofre não será transferido. Nenhuma conta é necessária e nenhum dado sai do seu dispositivo." },
  ],
 },
 blitz: {
  loadingEngine: "Carregando motor de puzzle...",
  completed: "Concluído",
  todaysPuzzleSolved: "📅 Puzzle de hoje resolvido!",
  alreadyPlayed: "Você já usou sua tentativa diária! Volte amanhã à meia-noite para um novo desafio.",
  playInfinite: "Jogar modo prática infinita",
  challengeTitle: "⚡ Desafio Anagram Blitz",
  challengeDesc: "Decifre palavras em 60 segundos dos nossos dicionários Scrabble.",
  startToday: "Começar puzzle de hoje",
  playInfiniteBtn: "Prática infinita",
  timesUp: "⏱️ Tempo esgotado! Jogo terminado",
  finalScore: "Pontuação final:",
  points: "pontos.",
  playAgain: "🔄 Jogar de novo",
  dailyLocked: "Sua tentativa diária está bloqueada. Até amanhã!",
  returnMenu: "Voltar ao menu",
  timeLeft: "s",
  totalScore: "pts",
  generating: "🎲 Gerando palavra...",
  hint: "💡 Dica:",
  waiting: "Aguardando...",
  typeWord: "Digite a palavra...",
  wrong: "❌ Resposta errada! Tente novamente.",
  skipReveal: "🏳️ Pular e revelar",
  stopGame: "🛑 Parar",
  play: "▶ Jogar",
  correct: "✨ Perfeito! Resposta correta!",
  answerWas: "A resposta era:",
  challengeFriend: "Desafie um amigo",
  challengeText: "Marquei {score} no Anagram Blitz da WordIzy — consegue me superar? Jogue grátis: https://wordizy.com/blitz",
  // Seção de conteúdo SEO (abaixo do cartão do jogo)
  pageHeading: "Jogue Anagram Blitz — Jogo de palavras grátis de 60 segundos",
  howToPlayTitle: "Como jogar Anagram Blitz",
  howToPlayDesc: "Anagram Blitz é um jogo de anagramas rápido de 60 segundos. Você recebe um conjunto de letras embaralhadas e deve reorganizá-las para formar uma palavra válida do dicionário. Cada resposta correta ganha 20 pontos; cada salto custa 5 pontos. Supere sua melhor pontuação e suba na classificação diária.",
  gameModesTitle: "Modos de jogo",
  dailyModeName: "Desafio diário",
  dailyModeDesc: "Um enigma por dia. Jogue uma vez e fixe sua pontuação para a classificação.",
  infiniteModeName: "Prática infinita",
  infiniteModeDesc: "Enigmas ilimitados. Cada resposta correta adiciona 10 segundos bônus ao relógio.",
  tipsTitle: "Dicas e estratégia",
  tip1: "Procure as terminações típicas do português : -AR, -ER, -IR (infinitivos), -ÇÃO (substantivos de ação), -ADO/-IDO (particípios passados).",
  tip2: "Em português, a vogal A aparece em 70 % das palavras de cinco letras — teste palavras com A, especialmente na posição final (feminino).",
  tip3: "Os dígrafos LH (como em FILHO) e NH (como em GENHO) são específicos do português — se você vir um H amarelo, considere essas combinações.",
  tip4: "A terminação -ÃO é típica do português (como CORAÇÃO, BALÃO) — se você obtiver um verde na penúltima posição com A, teste Õ na última.",
  blitzFooter: "Anagram Blitz usa dicionários oficiais de Scrabble (PT_FILTERED para português, NWL2023 + CSW21 para inglês) com suporte multilíngue para 9 idiomas. Jogue grátis, sem necessidade de cadastro.",
 },
 ui: {
  advertisement: "Anúncio",
  featuredGuide: "Guia em destaque",
  saveVaultFaqTitle: "Cofre — Como usar",
  relatedTools: "Ferramentas relacionadas",
  published: "Publicado:",
  backToHome: "Voltar ao início",
  somethingWrong: "Algo deu errado",
  tryAgain: "Tentar novamente",
  reloadPage: "Recarregar página",
  returnLabel: "Voltar",
  allCopied: "Todas as palavras copiadas!",
  showLess: "Mostrar menos",
  showMore: "Mostrar mais",
  enterPassword: "Digite a senha",
  totalSearches: "Pesquisas totais",
  topQuery: "Pesquisa principal",
  topTool: "Ferramenta principal",
  topLanguage: "Idioma principal",
  newDailyChallenge: "Novo desafio diário",
  scrambleFeatureHint: "Use a função Embaralhar uma palavra abaixo para criar seus próprios puzzles.",
  wordList: "Lista de palavras",
  copiedToClipboard: "Copiado para a área de transferência!",
 },
 hubPages: {
  startsSubtitle: "Navegue por todas as palavras válidas de Scrabble que começam com cada letra do alfabeto, de 2 a 15 letras.",
  endsSubtitle: "Navegue por todas as palavras válidas de Scrabble que terminam com cada letra do alfabeto, de 2 a 15 letras.",
  lengthSubtitle: "Navegue por todas as palavras válidas de Scrabble por comprimento, de 2 a 15 letras. Cada comprimento tem sua própria página dedicada.",
  wordleStartsSubtitle: "Navegue por todas as palavras válidas de Wordle que começam com cada letra do alfabeto. Perfeito para encontrar as melhores palavras iniciais e refinar o puzzle diário.",
  wordleEndsSubtitle: "Navegue por todas as palavras válidas de Wordle que terminam com cada letra do alfabeto. Perfeito para encontrar ganchos, sufixos e refinar o puzzle diário.",
  startsHeading: "Palavras que começam com — A a Z",
  endsHeading: "Palavras que terminam com — A a Z",
  lengthHeading: "Desembaralhar por comprimento da palavra (2–15 letras)",
  wordleStartsHeading: "Palavras de Wordle que começam com — A a Z",
  wordleEndsHeading: "Palavras de Wordle que terminam com — A a Z",
  clickLetterStarts: "Clique numa letra para navegar por todas as palavras que começam com essa letra numa página dedicada.",
  clickLetterEnds: "Clique numa letra para navegar por todas as palavras que terminam com essa letra numa página dedicada.",
  clickLength: "Clique num número para navegar por todas as palavras desse comprimento numa página dedicada.",
  clickLetterWordleStarts: "Clique numa letra para navegar por todas as palavras de Wordle que começam com essa letra numa página dedicada.",
  clickLetterWordleEnds: "Clique numa letra para navegar por todas as palavras de Wordle que terminam com essa letra numa página dedicada.",
  wordleStartsBadge: "Wordle começa",
  wordleEndsBadge: "Wordle termina",
  wordleStartsTitle: "Palavras de Wordle que começam com A-Z",
  wordleEndsTitle: "Palavras de Wordle que terminam com A-Z",
  returnHome: "Voltar ao início",
  footerNote: "Todas as palavras são filtradas através de dicionários oficiais de Scrabble.",
  searchPlaceholderStarts: "Digite uma letra A-Z para navegar pelas palavras que começam com ela…",
  searchPlaceholderEnds: "Digite uma letra A-Z para navegar pelas palavras que terminam com ela…",
  searchPlaceholderLength: "Digite um número 2-15 para navegar por comprimento…",
  searchPlaceholderWordleStarts: "Digite uma letra A-Z para navegar pelas palavras de Wordle que começam com ela…",
  searchPlaceholderWordleEnds: "Digite uma letra A-Z para navegar pelas palavras de Wordle que terminam com ela…",
  browseBtn: "Navegar",
 },
 wordListPage: {
  loading: "Carregando listas de palavras verificadas…",
  filterPlaceholder: "Filtrar palavras…",
  filterLabel: "Filtrar palavras",
  clearFilter: "Limpar filtro",
  loadMore: "Carregar mais",
  remaining: "restantes",
  allLengths: "Todos",
  filterByLength: "Filtrar por comprimento da palavra",
  noMatch: "Nenhuma palavra corresponde ao seu filtro.",
  noWords: "Nenhuma palavra encontrada.",
  wordsCount: "palavras",
  error: "Falha ao carregar palavras. Atualize a página.",
 },
};

const nl: Translation = {
 nav: {
  unscrambler: "Woordontwarer", scramble: "Meng", wordle: "Wordle",
  quordle: "Quordle", anagram: "Anagrammen", random: "Willekeurig Woord",
  wordfeud: "Wordfeud", dictionary: "Woordenboek", scrabble: "Duplicate",
  wordlists: "Woordlijsten", wordstarts: "Woorden Beginnen Met", wordends: "Woorden Eindigen Op", wordlestarts: "Wordle Begint A-Z", wordleends: "Wordle Eindigt A-Z", about: "Over", contact: "Contact", privacy: "Privacy", terms: "Servicevoorwaarden",
  sitemap: "Sitemap", tools: "Hulpmiddelen", more: "Meer", solvers: "Oplossers", site: "Site", wordlab: "Woord-Lab", inbox: "Postvak IN",
  dashboard: "Dashboard", blitz: "⚡ Anagram Blitz", blitzShort: "Blitz"
 },
 brand: { name: "wordIzy", tagline: "Ontwar. Los op. Win." },
 common: {
  yourLetters: "Jouw letters", unscramble: "Ontwarren", clear: "Wissen", advancedFilters: "Geavanceerde filters",
  startsWith: "Begint met", endsWith: "Eindigt op", mustInclude: "Moet bevatten", dictionaryLabel: "Woordenboek",
  results: "Resultaten", noResults: "Geen woorden gevonden. Probeer andere letters of jokers (? of *).",
  wordsFound: "woorden gevonden", points: "pn", length: "letters", loading: "Laden…", search: "Zoeken",
  copy: "Kopiëren", copied: "Gekopieerd!", tryExamples: "Probeer:", tipsTitle: "Tips & werking",
  tileValues: "Scrabble-tegelwaarden", blanks: "Jokers", languageLabel: "Taal",
  showMore: "Meer tonen", showLess: "Minder", allWords: "Alle woorden", perGroup: "per groep",
  wordsCount: "woorden", reset: "Resetten", apply: "Toepassen", solve: "Oplossen", generate: "Genereren",
  check: "Controleren", example: "Voorbeeld", none: "Geen", optional: "optioneel",
 },
 home: {
  title: "Woordontwarer", subtitle: "Voer je door elkaar gehaalde letters in, voeg jokers toe met ? of *, en vind elk speelbaar woord — gegroepeerd op lengte en gesorteerd op Scrabble-score.",
  heroBadge: "Gratis • Geen registratie • 9 talen",
  faqTitle: "Veelgestelde vragen",
  q1: "Waarvoor dient een woordontwarer?",
  a1: "Een ontwarer neemt een stapel letters (zoals een Scrabble-rek) en vindt elk geldig woordenboekwoord dat daarmee te vormen is. Ideaal voor Scrabble, Wordfeud, kruiswoordraadsels en anagrampuzzels.",
  q2: "Hoe gebruik ik de geavanceerde opties?",
  a2: "Open na het typen Geavanceerde filters. «Begint met» beperkt tot woorden met dat voorvoegsel, «Eindigt op» tot achtervoegsels, «Moet bevatten» garandeert bepaalde letters. Combineer met jokers (? of *) voor onbekende letters.",
  q3: "Hoe werkt het?",
  a3: "WordIzy vergelijkt je letterpool met een volledig woordenboek in het geheugen voor de gekozen taal, controleert welke woorden vormbaar zijn (? en * als jokers), past je filters toe, scoort elk woord met officiële Scrabble-waarden en groepeert per lengte — langste eerst.",
  q4: "Welke talen worden ondersteund?",
  a4: "Engels, Frans, Spaans, Italiaans, Portugees, Duits, Nederlands, plus Japans (romaji) en Mandarijn (pinyin). Wissel het woordenboek via de taalkiezer.",
 },
 scramble: { title: "Woordmenger / -oplosser", subtitle: "Vastgelopen op een anagram? Voer de letters in en we lossen ze op in echte woorden.", inputLabel: "Dooreengemengde letters", btn: "Oplossen", solutionLabel: "Mogelijke oplossingen", hint: "Gebruik ? of * voor onbekende letters." },
 wordle: { title: "Wordle-oplosser", subtitle: "Verklein de Wordle van vandaag: groene letters op positie, gele bekende, grijze uit te sluiten.", length: "Woordlengte", placed: "Geplaatst (groen)", valid: "Geldig (geel)", excluded: "Uitgesloten (grijs)", btn: "Oplossen", hint: "Gebruik . of _ voor lege plekken, bijv. A..LE" },
 quordle: { title: "Quordle-oplosser", subtitle: "Los tot wel vier Wordles tegelijk op. Elk bord houdt eigen voorwaarden.", board: "Bord", addBoard: "Bord toevoegen", hint: "Vul in wat je weet en los op." },
 anagram: { title: "Anagram-oplosser", subtitle: "Vind elk anagram van je letters — woorden die exact alle letters gebruiken.", btn: "Anagrammen vinden", hint: "Jokers (? *) vullen aan." },
 random: { title: "Willekeurige Woordgenerator", subtitle: "Genereer willekeurige echte woorden met lengte-, voorvoegsel-, achtervoegsel- en bevat-filters.", length: "Lengte", any: "Elke", count: "Hoeveel", btn: "Genereren" },
 wordfeud: { title: "Wordfeud-hulp", subtitle: "Vind de beste Wordfeud-woorden vanuit je rek. Kies je woordenboek.", btn: "Woorden vinden", hint: "Voeg ? of * toe voor lege tegels." },
 dictionary: { title: "Woordenboek controleren", subtitle: "Controleer of een woord bestaat, zie de Scrabble-score en een definitie.", btn: "Controleren", exists: "is een geldig woord", notExists: "niet in woordenboek gevonden", definition: "Definitie", score: "Scrabble-score", tiles: "Lettertegels" },
 scrabble: { title: "Scrabble Duplicate", subtitle: "Duplicate geeft iedereen hetzelfde rek. Voer 7 letters in (plus bordletters) en vind de beste zetten.", rack: "Jouw rek", board: "Bordletters (optioneel)", btn: "Beste woorden vinden", hint: "Jokers toegestaan. Op score gesorteerd." },
 wordlists: { title: "Woordlijsten", subtitle: "Doorzoek alle 2- tot 7-letterwoorden. Kies weergave, lengte en letter om A–Z te verkennen.", allWords: "Alle woorden", startsBy: "Begint met A–Z", endsBy: "Eindigt op A–Z", letter: "Letter", selectLength: "Lengte", selectLetter: "Letter", browse: "Bladeren" },
 about: {
  title: "Over wordIzy",
  intro: "Welkom bij wordIzy, jouw eersteklas bestemming voor krachtige woordspelhulpmiddelen, anagram-oplossers en educatieve puzzelbronnen. Gebouwd door een toegewijd team van onafhankelijke ontwikkelaars en levenslange woordpuzzel-liefhebbers, is wordIzy vanaf de basis ontworpen om de snelste, meest overzichtelijke en minst afleidende woordenboek-toolset op het web te zijn.",
  sections: [
   {
    heading: "Onze missie",
    body: "Onze missie is om spelers te helpen hun woordenschat te verrijken, hun geest te trainen en vriendelijke puzzelgeschillen met absolute nauwkeurigheid op te lossen. Wij vinden dat woordoplossers niet vol moeten zitten met opdringerige lay-outs, trage laadtijden of ingewikkelde instellingen. Daarom biedt wordIzy directe berekeningen, gelokaliseerde meertalige Scrabble-woordenboeken en intuïtieve, op maat gemaakte filtermotoren voor naadloos dagelijks gebruik.",
   },
   {
    heading: "Waarom voor wordIzy kiezen?",
    body: "In tegenstelling tot eenvoudige, generieke opzoektabellen zijn onze tools op maat gemaakt om exact te passen bij de mechaniek van de populairste woordspellen ter wereld:\n• Uitgebreide woordenboekdatabases: We ondersteunen 9 talen en filteren je letters direct tegen officiële competitielexicons zoals OpenTaal (Nederlands), NWL2023 en CSW21.\n• Realistische spellogica: Ons geavanceerde joker-filtersysteem herkent regels zoals de verdeling van Scrabble-blanco-tegels en wijst echte nulpunt-waarden toe, zodat je precieze, tornooiwaardige zetten kunt plannen.\n• Innovatieve leermiddelen: Unieke functies zoals onze lokaal opgeslagen Save Vault fungeren als een persoonlijke flashcard-manager en bieden spelers een actieve omgeving om woordpatronen, haken en uitbreidingen offline te bestuderen.\n• Boeiend spel: Voorbij de tools creëren we op maat gemaakte ervaringen zoals Anagram Blitz om woordspel-liefhebbers een vlotte omgeving te bieden om hun snelheid te testen en hun persoonlijke high scores uit te dagen.",
   },
   {
    heading: "Onze toewijding aan privacy",
    body: "Wij hechten waarde aan jouw digitale veiligheid en de prestaties van jouw systeem. Geavanceerde opties zoals jouw woordbladgeschiedenis worden direct uitgevoerd via de lokale opslag van je browser. Dit betekent dat jouw persoonlijke studielijsten nooit je apparaat verlaten, er geen gebruikersaccountregistraties nodig zijn en jouw gegevens volledig privé blijven.",
   },
   {
    heading: "Neem contact op",
    body: "We werken voortdurend aan het verbeteren van onze opzoek-algoritmes, het uitbreiden van onze databases en het ontwerpen van nieuwe spelmodi. Als je functieverzoeken, woordenboekcorrecties of algemene feedback hebt, neem dan contact met ons op via onze contactpagina. Bedankt dat je wordIzy deel laat uitmaken van jouw dagelijkse spelroutine!",
   },
  ],
 },
 contact: {
  title: "Neem contact op",
  intro: "Heb je een vraag, feedback of een functievoorstel voor wordIzy? We horen graag van je!\n\nOf je nu een ontbrekend woord hebt gevonden in onze Scrabble-woordenboeken, een bug bent tegengeken tijdens het spelen van Anagram Blitz, of gewoon een nieuwe toolvariant wilt voorstellen, jouw inbreng helpt ons een beter platform te bouwen voor woordpuzzelspelers wereldwijd.",
  sections: [
   {
    heading: "Hoe je ons bereikt",
    body: "Stuur alle vragen, feedback of ondersteuningsverzoeken rechtstreeks naar ons officiële administratie-e-mailadres:\n📩 support@wordizy.com",
   },
   {
    heading: "Vermeld in je bericht",
    body: "Om ons te helpen je verzoek zo snel mogelijk af te handelen, vermeld eventuele relevante details:\n• Voor foutrapporten: Laat ons weten welk apparaat of browser je gebruikte (bijv. iPhone/Safari of Desktop/Chrome).\n• Voor woordenboekcorrecties: Vermeld het specifieke woord, het taalwoordenboek of de spelmodus die je gebruikte.\n• Voor partnerschappen: Vermeld duidelijk de naam van je bedrijf of platform in de onderwerpregel.",
   },
   {
    heading: "Verwachte reactietijden",
    body: "We zijn een klein, onafhankelijk ontwikkelingsteam, maar we lezen elk stukje feedback dat we ontvangen. Je kunt over het algemeen binnen 24 tot 48 uur een reactie van ons verwachten, van maandag tot en met vrijdag.",
   },
  ],
  closing: "Bedankt dat je deel uitmaakt van de wordIzy-community!",
 },
 privacy: {
  title: "Privacybeleid",
  intro: "Op wordIzy, bereikbaar via wordizy.com, is de privacy van onze bezoekers een van onze belangrijkste prioriteiten. Dit Privacybeleid-document bevat soorten informatie die door wordIzy worden verzameld en geregistreerd en hoe wij deze gebruiken.\n\nAls u aanvullende vragen heeft of meer informatie wenst over ons Privacybeleid, aarzel dan niet om contact met ons op te nemen.",
  lastUpdated: "Laatst bijgewerkt: 28 oktober 2026",
  sections: [
   {
    heading: "Logbestanden",
    body: "wordIzy volgt een standaardprocedure voor het gebruik van logbestanden. Deze bestanden registreren bezoekers wanneer zij websites bezoeken. Alle hostingbedrijven doen dit als onderdeel van de analyses van hostingservices. De informatie die door logbestanden wordt verzameld, omvat internetprotocoladressen (IP), browsertype, internetserviceprovider (ISP), datum- en tijdstempel, verwijzings-/uitgangspagina's en mogelijk het aantal klikken. Deze zijn niet gekoppeld aan informatie die persoonlijk identificeerbaar is. Het doel van de informatie is het analyseren van trends, het beheren van de site, het volgen van de beweging van gebruikers op de website en het verzamelen van demografische informatie.",
   },
   {
    heading: "Cookies en Web Beacons",
    body: "Zoals elke andere website maakt wordIzy gebruik van \"cookies\". Deze cookies worden gebruikt om informatie op te slaan, waaronder de voorkeuren van bezoekers en de pagina's op de website die de bezoeker heeft bezocht of geraadpleegd. De informatie wordt gebruikt om de gebruikerservaring te optimaliseren door onze webpagina-inhoud aan te passen op het browsertype van de bezoeker en/of andere informatie.",
   },
   {
    heading: "Google DoubleClick DART-cookie",
    body: "Google is een van de externe aanbieders op onze site. Het gebruikt ook cookies, zogenaamde DART-cookies, om advertenties te tonen aan bezoekers van onze site op basis van hun bezoek aan wordizy.com en andere sites op het internet. Bezoekers kunnen echter kiezen om het gebruik van DART-cookies af te wijzen door het Privacybeleid van het advertentie- en contentnetwerk van Google te raadplegen op de volgende URL: google.com",
   },
   {
    heading: "Onze advertentiepartners",
    body: "Sommige adverteerders op onze site gebruiken mogelijk cookies en web beacons. Onze advertentiepartners zijn: Google AdSense. Elke advertentiepartner heeft een eigen Privacybeleid voor het beleid rond gebruikersgegevens. Voor eenvoudiger toegang hebben we hierboven een link naar hun Privacybeleid geplaatst. Externe advertentieservers of advertentienetwerken gebruiken technologieën zoals cookies, JavaScript of Web Beacons die worden gebruikt in hun respectievelijke advertenties en links die op wordIzy verschijnen en die rechtstreeks naar de browsers van gebruikers worden verzonden. Zij ontvangen automatisch uw IP-adres wanneer dit plaatsvindt. Deze technologieën worden gebruikt om de effectiviteit van hun advertentiecampagnes te meten en/of de advertentie-inhoud te personaliseren die u ziet op websites die u bezoekt.\n\nLet op: wordIzy heeft geen toegang tot of controle over deze cookies die door externe adverteerders worden gebruikt.",
   },
   {
    heading: "Privacybeleid van derden",
    body: "Het Privacybeleid van wordIzy is niet van toepassing op andere adverteerders of websites. Daarom raden we u aan de respectievelijke Privacybeleid van deze externe advertentieservers te raadplegen voor meer gedetailleerde informatie. Dit kan hun praktijken en instructies bevatten over hoe u zich voor bepaalde opties kunt afmelden.\n\nU kunt ervoor kiezen om cookies uit te schakelen via de individuele opties van uw browser. Meer gedetailleerde informatie over cookiebeheer met specifieke webbrowsers is te vinden op de respectievelijke websites van de browsers.",
   },
   {
    heading: "Lokale opslag van de browser",
    body: "Om onze gepersonaliseerde functies te bieden zonder gebruikersaccounts of registraties te vereisen, maakt wordIzy gebruik van de lokale opslag van uw browser (localStorage) voor functies zoals de Save Vault en spelvoorkeuren. Deze gegevens worden volledig op uw lokale apparaat opgeslagen. Ze worden nooit naar onze servers verzonden, gedeeld met derden of gebruikt voor trackingdoeleinden op externe websites. U kunt deze gegevens op elk moment wissen door de cache van uw browser te legen of door de opties te gebruiken die binnen de tool-interfaces worden aangeboden.",
   },
   {
    heading: "Informatie over kinderen",
    body: "Een ander deel van onze prioriteit is het toevoegen van bescherming voor kinderen bij het gebruik van het internet. We moedigen ouders en voogden aan om hun online activiteit te observeren, eraan deel te nemen en/of deze te monitoren en te begeleiden.\n\nwordIzy verzamelt bewust geen persoonlijk identificeerbare informatie (Personal Identifiable Information) van kinderen onder de 13 jaar. Als u denkt dat uw kind dit soort informatie op onze website heeft verstrekt, dringen we er bij u op aan om onmiddellijk contact met ons op te nemen en wij zullen ons best doen om dergelijke informatie onmiddellijk uit onze administratie te verwijderen.",
   },
   {
    heading: "Alleen online Privacybeleid",
    body: "Dit Privacybeleid is alleen van toepassing op onze online activiteiten en is geldig voor bezoekers van onze website met betrekking tot de informatie die zij hebben gedeeld en/of verzameld in wordIzy. Dit beleid is niet van toepassing op informatie die offline of via andere kanalen dan deze website wordt verzameld.",
   },
   {
    heading: "Toestemming",
    body: "Door onze website te gebruiken, stemt u hierbij in met ons Privacybeleid en gaat u akkoord met de Algemene voorwaarden.",
   },
  ],
  thirdPartyServices: [
    {
      name: "Google AdSense",
      description: "Toont advertenties aan bezoekers van onze site. Gebruikt cookies (DART-cookies) om advertenties te tonen op basis van uw bezoeken aan wordizy.com en andere sites. U kunt DART-cookies afwijzen door het Privacybeleid van het advertentie- en contentnetwerk van Google te raadplegen.",
      url: "https://policies.google.com/technologies/ads",
    },
  ],
 },
 terms: {
  title: "Servicevoorwaarden",
  intro: "Welkom bij wordIzy (bereikbaar via wordizy.com). Deze Servicevoorwaarden (de \"Voorwaarden\") regelen uw toegang tot en gebruik van onze website, woordspel-hulpmiddelen, woordenboeken en interactieve spellen zoals Anagram Blitz (gezamenlijk de \"Diensten\").\n\nDoor toegang te krijgen tot of gebruik te maken van wordIzy, gaat u ermee akkoord gebonden te zijn aan deze Voorwaarden en ons Privacybeleid. Als u niet akkoord gaat met deze Voorwaarden, gebruik onze Diensten dan niet.",
  lastUpdated: "Laatst bijgewerkt: 28 oktober 2026",
  sections: [
   {
    heading: "1. Beschrijving van de Dienst",
    body: "wordIzy biedt gratis online hulpmiddelen voor woordpuzzels, anagram-oplossers, woordenboekopzoekingen en woordgebaseerde mini-spellen. Alle Diensten worden geleverd op een \"zo-is\"- en \"zo-beschikbaar\"-basis voor uitsluitend persoonlijk, niet-commercieel entertainment- en educatieve doeleinden.",
   },
   {
    heading: "2. Toegestane gebruik en beperkingen",
    body: "U krijgt een beperkte, niet-exclusieve, niet-overdraagbare en herroepbare licentie om toegang te krijgen tot en wordIzy te gebruiken, strikt in overeenstemming met deze Voorwaarden.\nAls voorwaarde voor uw gebruik gaat u ermee akkoord niet te:\n• Gebruik maken van geautomatiseerde systemen, scrapers, spiders, robots of scripts om gegevens, tekst of woordenlijsten uit onze databases te oogsten.\n• Storen of verstoren van de prestaties, integriteit of beveiliging van de websiteservers.\n• Inlijsten of spiegelen van enig deel van de site zonder onze voorafgaande schriftelijke autorisatie.\n• Onze hulpmiddelen voor woordspellen of geautomatiseerde systemen gebruiken om te valsspelen in competitieve online omgevingen waar externe hulpmiddelen expliciet verboden zijn door de respectievelijke voorwaarden van die platforms.",
   },
   {
    heading: "3. Intellectuele eigendomsrechten",
    body: "Alle inhoud, functies, functionaliteit, logo's, sitedesign, tekst en aangepaste gamingssoftware (inclusief Anagram Blitz) op wordIzy zijn het exclusieve eigendom van wordIzy en zijn beschermd door internationale auteursrecht-, merk- en intellectuele eigendomswetten. U mag onze eigendommen niet reproduceren, distribueren, wijzigen of afgeleide werken ervan maken zonder uitdrukkelijke schriftelijke toestemming.",
   },
   {
    heading: "4. Merken van derden en disclaimer",
    body: "Verwijzingen naar spellen van derden, waaronder maar niet beperkt tot Scrabble, Wordle, Words With Friends, Wordfeud en Quordle, worden uitsluitend voor informatieve en beschrijvende doeleinden gebruikt om de compatibiliteit van onze hulpmiddelen uit te leggen. wordIzy is een onafhankelijk platform en is niet gelieerd aan, noch onderschreven, geautoriseerd of gesponsord door Hasbro, Mattel, The New York Times Company, of een van hun respectievelijke moedermaatschappijen of dochterondernemingen.",
   },
   {
    heading: "5. Gebruikersgegevens en lokale opslag",
    body: "wordIzy vereist geen gebruikersregistratie of aanmaak van een account. Functies zoals de Save Vault maken gebruik van de lokale opslag van uw webbrowser (localStorage) om configuratiestatussen en woordgeschiedenis lokaal op uw apparaat op te slaan. Wij dragen geen verantwoordelijkheid of aansprakelijkheid voor enig gegevensverlies als gevolg van het wissen van browser-caches, hardwarewijzigingen of browser-updates.",
   },
   {
    heading: "6. Beperkingen van aansprakelijkheid",
    body: "In geen geval zijn wordIzy, zijn ontwikkelaars of zijn gelieerde ondernemingen aansprakelijk voor enige directe, indirecte, incidentele, bijzondere of gevolgschade voortvloeiend uit het gebruik of de onmogelijkheid om onze website te gebruiken, zelfs indien op de hoogte gesteld van de mogelijkheid van dergelijke schade. Wij garanderen niet dat de woordenlijsten, scoreberekeningen of configuraties van het woordenboek-hulpmiddel volledig foutloos zijn of bijgewerkt zijn om overeen te komen met real-time patches van de spelwoordenboeken.",
   },
   {
    heading: "7. Wijzigingen in de Dienst en de Voorwaarden",
    body: "Wij behouden ons het recht voor om op elk moment zonder kennisgeving elk aspect van onze Diensten te wijzigen, op te schorten of stop te zetten. Wij behouden ons ook het recht voor om deze Voorwaarden naar eigen goeddunken te wijzigen. Uw voortgezet gebruik van wordIzy na enige gepubliceerde update vormt uw aanvaarding van de herziene Voorwaarden.",
   },
   {
    heading: "8. Toepasselijk recht",
    body: "Deze Voorwaarden worden beheerst en uitgelegd in overeenstemming met internationale digitale handelspraktijken, zonder rekening te houden met beginselen van conflict van wetgeving.",
   },
   {
    heading: "9. Contactinformatie",
    body: "Als u vragen of verduidelijkingen heeft over deze Servicevoorwaarden, neem dan contact met ons op via onze officiële contactpagina.",
   },
  ],
 },
 sitemap: { title: "Sitemap", body: "Alle pagina's van WordIzy." },
 footer: { rights: "Alle rechten voorbehouden.", madeWith: "Gemaakt voor woordliefhebbers.", links: "Snelle links", desc: "Gratis ontwarer en oplossers in 9 talen. Zonder registratie.", disclaimer: "Voor entertainment en woordspellen. Niet gelieerd aan Scrabble of Wordle." },
 faq: {
  title: "Hoe te gebruiken & FAQ",
  unscrambler: [
   { q: "Wat is een woordontwarer en hoe gebruik ik hem?", a: "Een ontwarer neemt een hoop letters — zoals een Scrabble-rek (bijv. SRAABLC) — en vindt elk geldig woordenboekwoord dat met die letters gespeld kan worden. Typ je letters in het veld »Jouw letters« en klik op Ontwarren. Resultaten verschijnen gegroepeerd op woordlengte (langste eerst), elk woord toont zijn Scrabble-puntwaarde. Ideaal voor Scrabble, Words With Friends, Wordfeud, kruiswoordraadsels en anagram-puzzels." },
   { q: "Hoe werken jokers (? en *)?", a: "Gebruik ? of * als joker telkens wanneer je een onbekende letter hebt — ze vertegenwoordigen een Scrabble-blanco, een leeg kruiswoordvakje of de nog onbevestigde letter in een Wordle-poging. »QUER?Y« invoeren vraagt WordIzy om alle woorden te zoeken die matchen met »QUER« + één willekeurige letter + »Y«, wat QUERY direct oplevert. Elke joker levert 0 punten (overeenkomstig de officiële blanco-regels), zodat je getoonde score realistisch blijft wanneer je met een blanco op je rek speelt. Je kunt meerdere jokers tegelijk koppelen — »A??LE« levert APPLE, ADDLE, AGILE, AISLE en ABLE — wat jokers tot het ideale hulpmiddel maakt om anagram-mogelijkheden te verkennen wanneer je rek incompleet is. Beperk jokers tot één of twee per zoekopdracht om resultaten nuttig te houden: elke extra joker vermenigvuldigt de kandidaatenset, en na drie zie je woorden die met je echte stenen niet speelbaar zijn. Jokers werken ook in de Wordle-oplosser, Anagram-oplosser en Wordfeud-hulp met identieke semantiek, zodat je dezelfde werkwijze voor gedeeltelijke letters in elk gereedschap op de site kunt gebruiken." },
   { q: "Hoe gebruik ik de Geavanceerde filters?", a: "Klik op »Geavanceerde filters« om drie optionele velden te tonen. »Begint met« beperkt resultaten tot woorden die met de opgegeven letters beginnen (bijv. »AB« → alleen woorden die met AB beginnen). »Eindigt op« doet hetzelfde voor achtervoegsels (bijv. »ED« → alleen woorden die op ED eindigen). »Moet bevatten« garandeert dat bepaalde letters in elk resultaat voorkomen, op elke positie. Combineer alle drie met jokers voor nauwkeurige controle." },
   { q: "Hoe worden woorden gescoord?", a: "Elk woord wordt gescoord met de officiële Engelse Scrabble-letterwaarden: A=1, B=3, C=3, D=2, E=1, F=4, G=2, H=4, I=1, J=8, K=5, L=1, M=3, N=1, O=1, P=3, Q=10, R=1, S=1, T=1, U=1, V=4, W=4, X=8, Y=4, Z=10. Jokers (? *) fungeren als blanco's en scoren 0 punten, conform de officiële regels. WordIzy berekent automatisch het totaal voor elk resultaat en sorteert ze op score binnen elke lengtegroep, zodat de hoogst scorende zetten bovenaan elke lijst staan — wat je de hoofdrekenaar bespaart bij het optellen van steenwaarden en je in staat stelt de bingo-kandidaat in één oogopslag te herkennen. Voor andere talen gebruikt WordIzy de officiële Scrabble-letterwaarden van het woordenboek van die taal (ODS9 voor Frans, FISE voor Spaans, Zingarelli voor Italiaans, Portugees, Duits, OpenTaal voor Nederlands, plus gecureerde romaji- en pinyin-lijsten voor Japans en Mandarijn). Wissel van taal via de navbar-selector om de gelokaliseerde score te zien. Echte speelscores hangen ook af van bonusvakjes (letter/woord dubbel/driedubbel) en de +50 bingo-bonus voor het gebruiken van alle 7 stenen, dus beschouw de getoonde score als basislijn en tel bonussen er in je hoofd bij op bij het plannen van je zet." },
   { q: "Welke woordenboeken zijn beschikbaar?", a: "WordIzy ondersteunt 9 talen: Engels (NWL2023 + CSW21), Frans (ODS9 2024), Spaans (FISE), Italiaans (Zingarelli), Portugees, Duits, Nederlands (OpenTaal), plus Japans (romaji) en Mandarijn (pinyin). Alle woorden worden gefilterd tegen het officiële Scrabble-woordenboek van elke taal. Wissel van taal via de taalselectie in de navigatiebalk." },
   { q: "Waarom zijn resultaten op lengte gegroepeerd?", a: "Groeperen op woordlengte maakt het makkelijk om het type zet te vinden dat je nodig hebt. Bij Scrabble scoren langere woorden meestal hoger, maar soms past een korter woord beter op het bord. De langste woorden staan bovenaan, aflopend tot 2-letterwoorden. Binnen elke groep zijn woorden op Scrabble-score gesorteerd, zodat je de beste zet snel ziet." },
  ],
  scramble: [
   { q: "Waarvoor dient de Mengoplosser?", a: "Deze tool lost anagram-puzzels op — waarbij letters gemengd zijn en je het oorspronkelijke woord(en) moet vinden. Voer de gemengde letters in (bijv. RBOLENW) en klik op Oplossen om alle echte woorden te zien die gevormd kunnen worden. Perfect voor krantenanagrammen, woordspellen en meng-uitdagingen." },
   { q: "Waar verschilt dit van de Ontwarer?", a: "De Oplosser gebruikt dezelfde motor als de Ontwarer, maar richt zich op het oplossen van meng-puzzels in plaats van het vinden van elk mogelijk woord uit een rek. Je kunt ook de functie »Een woord mengen« onder de invoer gebruiken om een woord in willekeurige varianten te mengen — handig om je eigen puzzels te maken." },
   { q: "Kan ik jokers gebruiken?", a: "Ja. Gebruik ? of * voor onbekende letters. Als een puzzel bijvoorbeeld een ontbrekende letter heeft, voer dan de bekende letters plus een ? in en WordIzy vult de plek met elke geldige combinatie." },
   { q: "Hoe maak ik mijn eigen gemengde woord?", a: "Gebruik de kaart »Een woord mengen« onder de hoofdinvoer. Typ een willekeurig woord (bijv. »scrabble«) en klik op Genereren — WordIzy maakt verschillende willekeurige mengsels van dat woord. Gebruik ze om puzzels voor vrienden te maken of om het ontwarren te oefenen." },
  ],
  wordle: [
   { q: "Hoe werkt de Wordle-oplosser?", a: "De Wordle-oplosser beperkt het antwoord van vandaag met behulp van je spel-feedback. Voer de informatie uit je gissingen in: groene letters (juiste positie), gele letters (in het woord maar verkeerde positie) en grijze letters (niet in het woord). De solver retourneert alle geldige woorden die aan je voorwaarden voldoen." },
   { q: "Hoe voer ik geplaatste (groene) letters in?", a: "Typ in het veld »Geplaatste letters (groen)« de letters waarvan je weet dat ze op de juiste positie staan, met . of _ voor lege plekken. Als je bijvoorbeeld weet dat het woord A _ _ L E is, voer dan »A..LE« in. De solver retourneert alleen woorden die exact aan dit patroon voldoen." },
   { q: "Wat zijn geldige (gele) en uitgesloten (grijze) letters?", a: "Geldige letters (geel) zijn letters waarvan je weet dat ze IN het woord zitten, maar niet op de positie die je raadde — voer ze allemaal in het veld »Geldige letters« in (bijv. »RST«). Uitgesloten letters (grijs) zijn letters die bevestigd NIET in het woord zitten — voer ze in bij »Uitgesloten letters« (bijv. »BXF«). De solver filtert elk woord dat uitgesloten letters bevat." },
   { q: "Welke woordlengte moet ik gebruiken?", a: "Selecteer de lengte van de Wordle van vandaag (standaard 5). WordIzy ondersteunt woorden van 4 tot 8 letters, dus het werkt ook voor varianten zoals Quordle, Octordle en spellen met aangepaste lengte." },
   { q: "Tips voor de volgende gissing?", a: "Kies uit de resultaten een woord met veel voorkomende letters die je nog niet hebt getest (zoals R, T, S, L, N). Dat maximaliseert de informatiewinst. Is de lijst lang, kies dan een woord dat de meeste mogelijkheden uitsluit. De solver toont de Scrabble-score van elk woord — hoge scores betekenen vaak zeldzame letters die helpen om in te perken." },
  ],
  quordle: [
   { q: "Wat is de Quordle-oplosser?", a: "Quordle is een spel waarbij je vier Wordles tegelijk oplost. Deze solver laat je voorwaarden invoeren voor tot wel 4 borden tegelijk en retourneert kandidaatwoorden voor elk. Elk bord houdt zijn eigen geplaatste (groene), geldige (gele) en uitgesloten (grijze) letters." },
   { q: "Hoe gebruik ik meerdere borden?", a: "Vul in wat je voor elk bord weet. De voorwaarden van bord 1 beïnvloeden alleen de resultaten van bord 1. Klik op »Bord toevoegen« om tot 4 borden te maken. Gebruik de X-knop om een bord te verwijderen. Klik op Oplosser om kandidaten voor alle borden te krijgen." },
   { q: "Moet ik letters tussen borden delen?", a: "Ja — een belangrijke Quordle-strategie is één gissing gebruiken om informatie over meerdere borden te verzamelen. Als een letter groen is op bord 1, staat deze waarschijnlijk ook op dezelfde positie op de andere borden. Voer gedeelde voorwaarden op elk bord in om informatie te kruisen en de vier antwoorden sneller in te perken." },
   { q: "Strategie-tips voor Quordle?", a: "Begin met een woord vol veelvoorkomende letters (zoals CRANE of SLATE) om informatie over alle borden te verzamelen. Richt je eerst op het bord met de meeste voorwaarden — het oplossen ervan schept mentale ruimte. Gebruik de solver na 2-3 gissingen, als je genoeg info hebt om elk bord terug te brengen tot een beheersbare lijst." },
  ],
  anagram: [
   { q: "Wat is een anagram?", a: "Een anagram is een woord of zin dat wordt gevormd door alle letters van een ander woord te herschikken. LISTEN en SILENT zijn bijvoorbeeld anagrammen — dezelfde letters, andere volgorde. De Anagram-oplosser vindt elk woord dat exact al je letters gebruikt." },
   { q: "Waar verschilt dit van de Ontwarer?", a: "De Ontwarer vindt woorden van ELKE lengte die uit je letters gevormd kunnen worden (inclusief kortere). De Anagram-oplosser vindt alleen woorden die AL je letters gebruiken — de volledige anagrammen. Met »CHIEN« retourneert de anagram-solver bijvoorbeeld CHIEN, CHINE, NICHE (allemaal 5 letters), terwijl de ontwarer ook kortere woorden zou geven zoals ICE, IN, HE." },
   { q: "Kan ik jokers gebruiken?", a: "Ja. Gebruik ? of * als jokers om resterende plekken te vullen. »CAT??« vindt bijvoorbeeld alle 5-letter anagrammen waarbij CAT met twee willekeurige letters wordt gecombineerd. Jokers scoren 0 punten (zoals blanco's)." },
   { q: "Waarvoor zijn anagrammen nuttig?", a: "Anagrammen worden gebruikt in woordspellen, puzzels, cryptografie en taalkunde. Bij Scrabble helpt het kennen van anagrammen van je rek om bingo's te spotten (alle 7 stenen gebruiken voor 50 punten bonus). Ze zijn ook populair in kruiswoord-aanwijzingen, trivia en breinbrekers." },
  ],
  random: [
   { q: "Wat doet de Willekeurig Woord-generator?", a: "Hij genereert willekeurige echte woorden uit het gekozen woordenboek, met optionele filters. Je kunt woordlengte, beginletters, eindletters of letters die het woord moet bevatten opgeven. Gebruik hem voor spellen, creatief schrijven, naamgeving, woordenschat-oefening of om wachtwoorden met echte woorden te maken." },
   { q: "Hoe filter ik de willekeurige woorden?", a: "Zet »Lengte« op een specifiek getal (2-12) of laat het op »Willekeurig«. »Begint met« beperkt tot woorden die met die letters beginnen. »Eindigt op« beperkt tot woorden die op die letters eindigen. »Bevat« vereist dat het woord bepaalde letters ergens bevat. »Hoeveel« bepaalt het aantal gegenereerde woorden (1-200)." },
   { q: "Zijn de woorden geldige Scrabble-woorden?", a: "Ja. Alle gegenereerde woorden komen uit het officiële Scrabble-woordenboek van de gekozen taal (NWL2023/CSW21 voor Engels, ODS9 voor Frans, enz.). Elk woord is speelbaar in Scrabble en andere woordspellen." },
   { q: "Kan ik dit voor woordspellen gebruiken?", a: "Zeker. Genereer willekeurige woorden voor Pictionary, charades, woordassociatie-spellen of woordenschat-quizzes. Voor wachtwoorden combineer 3-4 willekeurige woorden van verschillende lengtes — dat levert memorabele maar veilige wachtzinnen op." },
  ],
  wordfeud: [
   { q: "Wat is de Wordfeud-hulp?", a: "Wordfeud is een populair mobiel woordspel vergelijkbaar met Scrabble. Deze hulp vindt de beste woorden die je vanuit je rek kunt spelen. Voer je 7 letters in (plus eventuele bordletters) en WordIzy retourneert alle speelbare woorden, gesorteerd op Scrabble-score." },
   { q: "Hoe voer ik mijn rek in?", a: "Typ je 7 steenletters in het veld »Jouw letters«. Gebruik ? of * voor blanco stenen (ze vertegenwoordigen elke letter maar scoren 0). Als er al bordletters zijn waarop je wilt bouwen, voeg die dan ook toe — WordIzy vindt woorden uit de gecombineerde verzameling." },
   { q: "Welk woordenboek moet ik gebruiken?", a: "Wordfeud ondersteunt meerdere woordenboeken afhankelijk van je regio. Engels Wordfeud gebruikt een Scrabble-achtige lijst, dus Engels (NWL2023/CSW21) werkt goed. Voor andere talen selecteer je de juiste (Frans ODS9, Spaans FISE, enz.) in de taalselectie." },
   { q: "Hoe worden scores berekend?", a: "Scores gebruiken de officiële Scrabble-letterwaarden van de gekozen taal. Let op: de werkelijke Wordfeud-score kan licht afwijken (het heeft bonusvakjes en een eigen steenverdeling). Gebruik de scores als richtlijn om waardevolle zetten te herkennen — het woord met de meeste punten uit je rek is meestal je beste zet." },
  ],
  dictionary: [
   { q: "Wat doet Woordenboek?", a: "Voer een willekeurig woord in om te controleren of het geldig is in het officiële Scrabble-woordenboek van de gekozen taal. De tool toont het woord als Scrabble-stenen, een geldig/ongeldig-badge, de Scrabble-score, woordlengte, letterstenen, een woordenboekdefinitie en synoniemen (indien beschikbaar)." },
   { q: "Waar komen de definities vandaan?", a: "Definities komen uit meerdere bronnen: de Free Dictionary API (voor Engels, Frans, Spaans, Duits, Italiaans, Portugees), Wiktionary (alle talen als fallback) en een AI-assistent voor resterende gaten. De bron staat naast elke definitie vermeld." },
   { q: "Waar komen de synoniemen vandaan?", a: "Synoniemen komen van Datamuse (voor Engels, Spaans, Frans, Italiaans, Portugees) en OpenThesaurus (voor Duits). Alleen synoniemen die zelf geldige Scrabble-woorden zijn worden getoond — klik op een synoniem om het direct te controleren." },
   { q: "Waarom zou een veelvoorkomend woord ongeldig kunnen zijn?", a: "Scrabble-woordenboeken zijn streng — ze sluiten eigennamen, afkortingen, woorden met koppelteken en woorden met apostrof uit. »BRUNCH« is bijvoorbeeld geldig, maar »BRUNCH'S« misschien niet. Als een woord lijkt te ontbreken, kan het een met hoofdletter geschreven eigennaam zijn of een recente toevoeging die nog niet in de officiële lijst staat. Wissel van taal om het woord in een ander woordenboek te controleren." },
  ],
  scrabble: [
   { q: "Wat is Scrabble Duplicate?", a: "Duplicate-Scrabble is een variant waarbij elke speler hetzelfde rek krijgt en de best mogelijke zet moet vinden. Het wordt gebruikt in toernooien en training om vaardigheid zonder geluk te testen. Deze tool helpt je de hoogst scorende woorden uit je rek te vinden — voer je 7 letters en optioneel bordletters in, en klik op »Beste woorden vinden«." },
   { q: "Hoe voer ik bordletters in?", a: "Als er al bordletters zijn waarop je kunt bouwen, typ ze dan in het veld »Bordletters (optioneel)« samen met je rekletters. WordIzy behandelt de gecombineerde verzameling als beschikbare letters. Dit helpt woorden te vinden die aansluiten op bestaande zetten — essentieel om in echte spellen de score te maximaliseren." },
   { q: "Hoe worden de top-zetten gerangschikt?", a: "Woorden worden op Scrabble-score gesorteerd (hoogste eerst). De top-10 zetten verschijnen bovenaan in een gemarkeerde lijst. Onthoud: de werkelijke spelscore hangt ook af van bonusvakjes (dubbele/drievoudige letter/woord) en bingo's (50-punten-bonus voor alle 7 stenen). Gebruik de scores van de tool als basis en weeg dan de bordpositie mee." },
   { q: "Wat is een bingo en hoe vind ik er een?", a: "Een bingo is de grootste enkele ommekeer in Scrabble: alle 7 stenen spelen in één beurt levert een +50-bonus bovenop de basisscore van het woord, zodat een woord van 30 punten een zet van 80 wordt. Om bingo's te vinden met WordIzy, voer je volledige 7-letter rek in (gebruik ? of * voor blanco's) en kijk naar de 7-letter resultaatgroep bovenaan de lijst — elk woord daar is een potentiële bingo. De meest renderende 7-letter bingo's in Engels Scrabble zijn MUZJIKS (29 basis + 50 = 79 punten), JACUZZI (34 + 50 = 84), SYZYGY (21 + 50 = 71), OXAZOLIDINE (zeldzaam maar verwoestend) en de stammen ANATOMIZ-, ANTISOCIAL-, OVERLAPPING- die veelvoorkomende achtervoegsels accepteren. Om bingo's sneller te herkennen, leer je de hoogwaardige stammen — SATISFI-, ANTISOY-, OVERLAP- — die combineren met -ER, -ED, -ING, -ATION. Houd één of twee flexibele letters (E, R, S, T) achteruit wanneer je rek op bingo lijkt, want de bingo-bonus (+50) weegt vrijwel altijd zwaarder dan de punten die je zou halen door die stenen vroeg te dumpen." },
  ],
  wordlists: [
   { q: "Wat is de pagina Woordlijsten?", a: "Woordlijsten laat je elk geldig Scrabble-woord van 2 tot 7 letters doorbladeren. Woorden zijn gegroepeerd op lengte en dan op eindletter (A-Z), zodat je het woordenboek systematisch kunt verkennen. Gebruik het om te studeren, woorden voor spellen te vinden of je woordenschat uit te breiden." },
   { q: "Hoe filter ik op lengte?", a: "Gebruik de lengte-selector (2-7) bovenaan. Klik op »Alle« om alle lengtes gestapeld te zien (2-letterwoorden bovenaan, 7-letter onderaan), of op een specifiek getal om alleen die lengte te zien. Elke lengtesectie toont 26 containers (één per eindletter A-Z)." },
   { q: "Hoe filter ik op letter?", a: "Gebruik de A-Z-rij onder de lengte-selector. Klik op een letter om alleen woorden te tonen die op die letter eindigen, of »Alle« om elke letter te tonen. Handig om woorden te vinden die aansluiten op een bepaalde letter die al op het bord ligt." },
   { q: "Waarom worden woorden in hoofdletters getoond?", a: "Scrabble-stenen zijn hoofdletters, dus woorden worden in hoofdletters weergegeven om daarmee overeen te komen. Elk woord toont zijn Scrabble-waarde ernaast. Binnen elke lettercontainer zijn woorden alfabetisch (A-Z) gesorteerd voor makkelijk scannen." },
  ],
  wordstarts: [
   { q: "Wat is de pagina Begint Met?", a: "Deze pagina laat je alle geldige Scrabble-woorden doorbladeren die MET een specifieke letter BEGINNEN. Selecteer een letter (A-Z) en WordIzy toont elk woord dat met die letter begint, gegroepeerd op lengte (2-7 letters). Perfect om openingen te bestuderen en woorden te vinden om op een beginletter op het bord te bouwen." },
   { q: "Hoe gebruik ik de lengte- en letter-selectors?", a: "Kies eerst een letter uit de A-Z-rij — dat stelt de beginletter in. Gebruik dan de lengte-rij (2-7 of Alle) om op woordlengte te filteren. Elke lengtesectie toont alle woorden die met de gekozen letter beginnen, alfabetisch gesorteerd. Klik op »Alle« in een van de rijen om dat filter te verwijderen." },
   { q: "Hoe is dit nuttig voor Scrabble?", a: "Het kennen van woorden die met elke letter beginnen helpt bij het plannen van openingen en aansluitingen. Heb je een Q, dan helpt het kennen van alle Q-woorden (QI, QAT, QUAD...) om hem effectief te spelen. De pagina is ook waardevol voor kruiswoordraadsels, waar aanwijzingen vaak »begint met...« specificeren." },
   { q: "Waarom pagineren op 50 woorden?", a: "Sommige letters (zoals S, A, E) hebben duizenden beginwoorden. Om pagina's snel en leesbaar te houden, pagineren de resultaten met 50 woorden per pagina en vorige/volgende-knoppen. Elke pagina toont het paginanummer en het totaal, zodat je weet waar je bent." },
  ],
  wordends: [
   { q: "Wat is de pagina Eindigt Op?", a: "Deze pagina laat je alle geldige Scrabble-woorden doorbladeren die OP een specifieke letter EINDIGEN. Selecteer een letter (A-Z) en WordIzy toont elk woord dat op die letter eindigt, gegroepeerd op lengte (2-7 letters). Ideaal om woorden te vinden die aansluiten op een bestaande letter op het bord." },
   { q: "Hoe gebruik ik de lengte- en letter-selectors?", a: "Kies eerst een letter uit de A-Z-rij — dat stelt de eindletter in. Gebruik dan de lengte-rij (2-7 of Alle) om op woordlengte te filteren. Elke lengtesectie toont alle woorden die op de gekozen letter eindigen, alfabetisch gesorteerd. Klik op »Alle« in een van de rijen om dat filter te verwijderen." },
   { q: "Hoe is dit nuttig voor Scrabble?", a: "Eindletters doen ertoe voor aansluitingen — als er een S op het bord ligt, helpt het kennen van alle woorden op S om te pluraliseren of zetten uit te breiden. Evenzo helpt het kennen van woorden op D, ED, ING om aan te haken op veelvoorkomende achtervoegsels. Deze pagina is een krachtige studie-tool voor competitief spel." },
   { q: "Waarom pagineren op 50 woorden?", a: "Sommige letters (zoals E, S, D) hebben duizenden eindwoorden. Om pagina's snel en leesbaar te houden, pagineren de resultaten met 50 woorden per pagina en vorige/volgende-knoppen. Elke pagina toont het paginanummer en het totaal, zodat je weet waar je bent." },
  ],
  vault: [
   { q: "Wat is de Opslagkluis?", a: "De Opslagkluis is een ingebouwd woordenschat-trainingswerktuig voor competitieve Scrabble- en Wordle-spelers — een persoonlijke woordenbladwijzerlijst specifiek ontworpen voor spaced-repetition-studie van lastige lettercombinaties. In tegenstelling tot generieke browserbladwijzers houdt de kluis de Scrabble-score van elk opgeslagen woord zichtbaar en laat hij je de hele lijst direct naar een flashcard-app of Anki-deck kopiëren voor offline oefenen. Hier is de 4-stappen workflow die competitieve spelers gebruiken: (1) Voer een zoekopdracht uit zoals »7-letterwoorden uit QUARTZE« of »woorden beginnend met Q« en markeer met een ster de hoogwaardige woorden die je blijft vergeten — QAT, QOPH, FAQIR, MUZJIKS. (2) Open de kluislade via het sterpictogram rechtsboven in de koptekst; je opgeslagen woorden blijven geordend in één lijst met hun live-score naast elke vermelding. (3) Klik op »Alle regels kopiëren« om de lijst in Anki, Quizlet of een printbare flashcardsjabloon te plakken voor spaced-repetition-herhaling buiten het scherm. (4) Voer dezelfde zoekopdracht volgende week opnieuw uit en vergelijk welke woorden je hebt onthouden — je opgeslagen lijst blijft lokaal in de localStorage van je browser, verlaat nooit je apparaat, vereist geen account en werkt offline zodra de pagina geladen is." },
   { q: "Hoe sla ik een woord op in de kluis?", a: "Klik op het sterpictogram (☆) naast een woord in de resultaten. De ster wordt amberkleurig (★) wanneer een woord is opgeslagen. Klik opnieuw om het woord uit uw kluis te verwijderen." },
   { q: "Hoe zie ik mijn opgeslagen woorden?", a: "Klik op het sterpictogram in de koptekst van de site (rechtsboven). Een lade schuift vanaf rechts open met al uw opgeslagen woorden. U kunt afzonderlijke woorden kopiëren, de hele lijst kopiëren, of de kluis legen." },
   { q: "Wordt mijn kluis gesynchroniseerd tussen apparaten?", a: "Nee — de kluis wordt opgeslagen in de localStorage van uw browser, dus het is per apparaat. Als u uw browsergegevens wist of een ander apparaat gebruikt, wordt uw kluis niet overgedragen. Geen account nodig en geen gegevens verlaten uw apparaat." },
  ],
 },
 blitz: {
  loadingEngine: "Puzzel-engine laden...",
  completed: "Voltooid",
  todaysPuzzleSolved: "📅 Puzzel van vandaag opgelost!",
  alreadyPlayed: "U heeft uw dagelijkse poging al gebruikt! Kom morgen om middernacht terug voor een nieuwe uitdaging.",
  playInfinite: "Oneindige oefenmodus spelen",
  challengeTitle: "⚡ Anagram Blitz Uitdaging",
  challengeDesc: "Ontcijfer woorden in 60 seconden uit onze Scrabble-woordenboeken.",
  startToday: "Begin puzzel van vandaag",
  playInfiniteBtn: "Oneindig oefenen",
  timesUp: "⏱️ Tijd is om! Spel voorbij",
  finalScore: "Eindscore:",
  points: "punten.",
  playAgain: "🔄 Opnieuw oefenen",
  dailyLocked: "Uw dagelijkse poging is vergrendeld. Tot morgen!",
  returnMenu: "Terug naar menu",
  timeLeft: "s",
  totalScore: "ptn",
  generating: "🎲 Woord genereren...",
  hint: "💡 Hint:",
  waiting: "Wachten...",
  wrong: "❌ Fout antwoord! Probeer het opnieuw.",
  typeWord: "Typ woord...",
  skipReveal: "🏳️ Overslaan & onthullen",
  stopGame: "🛑 Stoppen",
  play: "▶ Spelen",
  correct: "✨ Perfect! Goed antwoord!",
  answerWas: "Het antwoord was:",
  challengeFriend: "Daag een vriend uit",
  challengeText: "Ik scoorde {score} op WordIzy Anagram Blitz — kun je me verslaan? Speel gratis: https://wordizy.com/blitz",
  // SEO-inhoud sectie (onder de spelkaart)
  pageHeading: "Speel Anagram Blitz — Gratis 60-seconden woordspel",
  howToPlayTitle: "Hoe Anagram Blitz te spelen",
  howToPlayDesc: "Anagram Blitz is een snel 60-seconden anagramspel. U ontvangt een door elkaar gehusselde set letters en moet deze herschikken om een geldig woordenboekwoord te vormen. Elk juist antwoord levert 20 punten op; elke overslaing kost 5 punten. Versla uw highscore en klim in het dagelijkse klassement.",
  gameModesTitle: "Spelmodi",
  dailyModeName: "Dagelijkse uitdaging",
  dailyModeDesc: "Eén puzzel per dag. Speel één keer en vergrendel uw score voor het klassement.",
  infiniteModeName: "Oneindige oefening",
  infiniteModeDesc: "Onbeperkte puzzels. Elk juist antwoord voegt 10 bonusseconden toe aan de klok.",
  tipsTitle: "Tips en strategie",
  tip1: "Zoek naar typische Nederlandse uitgangen : -EN (meervoud/infinitief), -ER (comparatief), -ING (verbaal substantief), -JE (verkleinwoord, typisch Nederlands).",
  tip2: "De E is in het Nederlands de meest voorkomende letter (66% van de woorden) — test woorden met E, vooral in de eindpositie.",
  tip3: "De lettercombinaties SJ, TJ, NJ zijn specifiek voor het Nederlands (zoals in SJESES, TJE) — als u een J geel ziet, overweeg deze combinaties.",
  tip4: "De letters K en M zijn veel frequenter in het Nederlands dan in het Engels — test K (zoals in KANT, KAMER) als u onzeker bent.",
  blitzFooter: "Anagram Blitz gebruikt officiële Scrabble-woordenboeken (OpenTaal voor Nederlands, NWL2023 + CSW21 voor Engels) met meertalige ondersteuning voor 9 talen. Speel gratis, geen registratie vereist.",
 },
 ui: {
  advertisement: "Advertentie",
  featuredGuide: "Uitgelichte gids",
  saveVaultFaqTitle: "Opslagkluis — Hoe te gebruiken",
  relatedTools: "Gerelateerde tools",
  published: "Gepubliceerd:",
  backToHome: "Terug naar home",
  somethingWrong: "Er ging iets mis",
  tryAgain: "Opnieuw proberen",
  reloadPage: "Pagina herladen",
  returnLabel: "Terug",
  allCopied: "Alle woorden gekopieerd!",
  showLess: "Minder weergeven",
  showMore: "Meer weergeven",
  enterPassword: "Wachtwoord invoeren",
  totalSearches: "Totaal zoekopdrachten",
  topQuery: "Top zoekopdracht",
  topTool: "Top tool",
  topLanguage: "Top taal",
  newDailyChallenge: "Nieuwe dagelijkse uitdaging",
  scrambleFeatureHint: "Gebruik de functie Woord mengen hieronder om uw eigen puzzels te maken.",
  wordList: "Woordenlijst",
  copiedToClipboard: "Naar klembord gekopieerd!",
 },
 hubPages: {
  startsSubtitle: "Doorzoek elk geldig Scrabble-woord dat begint met elke letter van het alfabet, van 2 tot 15 letters.",
  endsSubtitle: "Doorzoek elk geldig Scrabble-woord dat eindigt op elke letter van het alfabet, van 2 tot 15 letters.",
  lengthSubtitle: "Doorzoek elk geldig Scrabble-woord op lengte, van 2 tot 15 letters. Elke lengte heeft een eigen speciale pagina.",
  wordleStartsSubtitle: "Doorzoek elk geldig Wordle-woord dat begint met elke letter van het alfabet. Perfect om de beste beginwoorden te vinden en uw dagelijkse puzzle te verfijnen.",
  wordleEndsSubtitle: "Doorzoek elk geldig Wordle-woord dat eindigt op elke letter van het alfabet. Perfect om haken, achtervoegsels te vinden en uw dagelijkse puzzle te verfijnen.",
  startsHeading: "Woorden die beginnen met — A tot Z",
  endsHeading: "Woorden die eindigen op — A tot Z",
  lengthHeading: "Ontcijfer op woordlengte (2–15 letters)",
  wordleStartsHeading: "Wordle-woorden die beginnen met — A tot Z",
  wordleEndsHeading: "Wordle-woorden die eindigen op — A tot Z",
  clickLetterStarts: "Klik op een letter om alle woorden die met die letter beginnen te doorzoeken op een speciale pagina.",
  clickLetterEnds: "Klik op een letter om alle woorden die op die letter eindigen te doorzoeken op een speciale pagina.",
  clickLength: "Klik op een getal om alle woorden van die lengte te doorzoeken op een speciale pagina.",
  clickLetterWordleStarts: "Klik op een letter om alle Wordle-woorden die met die letter beginnen te doorzoeken op een speciale pagina.",
  clickLetterWordleEnds: "Klik op een letter om alle Wordle-woorden die op die letter eindigen te doorzoeken op een speciale pagina.",
  wordleStartsBadge: "Wordle begint",
  wordleEndsBadge: "Wordle eindigt",
  wordleStartsTitle: "Wordle-woorden die beginnen met A-Z",
  wordleEndsTitle: "Wordle-woorden die eindigen op A-Z",
  returnHome: "Terug naar home",
  footerNote: "Alle woorden zijn gefilterd via officiële Scrabble-woordenboeken.",
  searchPlaceholderStarts: "Typ een letter A-Z om woorden die ermee beginnen te doorzoeken…",
  searchPlaceholderEnds: "Typ een letter A-Z om woorden die erop eindigen te doorzoeken…",
  searchPlaceholderLength: "Typ een getal 2-15 om op lengte te doorzoeken…",
  searchPlaceholderWordleStarts: "Typ een letter A-Z om Wordle-woorden die ermee beginnen te doorzoeken…",
  searchPlaceholderWordleEnds: "Typ een letter A-Z om Wordle-woorden die erop eindigen te doorzoeken…",
  browseBtn: "Doorzoeken",
 },
 wordListPage: {
  loading: "Geverifieerde woordenlijsten worden geladen…",
  filterPlaceholder: "Woorden filteren…",
  filterLabel: "Woorden filteren",
  clearFilter: "Filter wissen",
  loadMore: "Meer laden",
  remaining: "resterend",
  allLengths: "Alle",
  filterByLength: "Filteren op woordlengte",
  noMatch: "Geen woorden komen overeen met uw filter.",
  noWords: "Geen woorden gevonden.",
  wordsCount: "woorden",
  error: "Woorden laden mislukt. Vernieuw de pagina.",
 },
};

const ja: Translation = {
 ...en,
 nav: {
  unscrambler: "アナグラム", scramble: "ミックス", wordle: "Wordle",
  quordle: "Quordle", anagram: "アナグラム解決", random: "ランダム単語",
  wordfeud: "Wordfeud", dictionary: "辞書", scrabble: "Duplicate",
  wordlists: "単語リスト", wordstarts: "単語 始まる", wordends: "単語 終わる", wordlestarts: "Wordle 始まる", wordleends: "Wordle 終わる", about: "概要", contact: "お問い合わせ", privacy: "プライバシー", terms: "利用規約",
  sitemap: "サイトマップ", tools: "ツール", more: "その他", solvers: "ソルバー", site: "サイト", wordlab: "ワードラボ", inbox: "受信箱",
  dashboard: "ダッシュボード", blitz:"アナグラム・ブリッツ", blitzShort: "Blitz"
 },
 brand: { name: "wordIzy", tagline: "解き、勝つ。" },
 common: {
  ...en.common,
  yourLetters: "あなたの文字", unscramble: "解決", clear: "クリア", advancedFilters: "詳細フィルター",
  startsWith: "で始まる", endsWith: "で終わる", mustInclude: "必ず含む", dictionaryLabel: "辞書",
  results: "結果", noResults: "単語が見つかりません。別の文字かワイルドカード(? *)を試してください。",
  wordsFound: "件の単語", points: "点", length: "文字", loading: "読み込み中…", search: "検索",
  copy: "コピー", copied: "コピーしました", tryExamples: "試す:", tipsTitle: "ヒントと使い方",
  tileValues: "スクラブルタイルの値", blanks: "ブランク", languageLabel: "言語",
  showMore: "もっと見る", showLess: "折りたたむ", allWords: "すべての単語", perGroup: "グループごと",
  wordsCount: "単語", reset: "リセット", apply: "適用", solve: "解決", generate: "生成",
  check: "確認", example: "例", none: "なし", optional: "任意",
 },
 home: {
  ...en.home,
  title: "ワードアナグラム", subtitle: "混ぜた文字を入力し、? または * でワイルドカードを追加して、プレイ可能なすべての単語を長さ別・スクラブル得点順で見つけます。",
  heroBadge: "無料 • 登録不要 • 9言語",
  faqTitle: "よくある質問",
  q1: "ワードアナグラムの用途は？",
  a1: "スクラブルのラックのような文字の集まりから、辞書にある有効な単語をすべて見つけます。スクラブル、Wordfeud、クロスワード、アナグラムパズルに最適です。",
  q2: "詳細オプションの使い方は？",
  a2: "文字入力後、詳細フィルターを開きます。「で始まる」は接頭辞、「で終わる」は接尾辞、「必ず含む」は必須文字を制限します。ワイルドカード(? *)と組み合わせて不明文字を補えます。",
  q3: "仕組みは？",
  a3: "WordIzyは選択言語の辞書と文字を照合し、形成可能な単語を判定し、フィルターを適用し、スクラブル得点で評価、長さ別(長い順)にグループ化します。",
  q4: "対応言語は？",
  a4: "英語、フランス語、スペイン語、イタリア語、ポルトガル語、ドイツ語、オランダ語、日本語(ローマ字)、中国語(ピンイン)。",
 },
 scramble: { title: "ミックス / 解決", subtitle: "パズルで行き詰まったら、混ぜた文字を入力してください。", inputLabel: "混ぜた文字", btn: "解決", solutionLabel: "可能な解決", hint: "? または * で不明文字。" },
 wordle: { title: "Wordle解決", subtitle: "今日のWordleを絞り込みます。緑・黄・グレーの文字を入力。", length: "長さ", placed: "配置済(緑)", valid: "有効(黄)", excluded: "除外(グレー)", btn: "解決", hint: "空欄は . または _ 例: A..LE" },
 quordle: { title: "Quordle解決", subtitle: "最大4つのWordleを同時に解きます。", board: "ボード", addBoard: "ボード追加", hint: "各ボードの情報を入力して解決。" },
 anagram: { title: "アナグラム解決", subtitle: "文字のすべてのアナグラムを見つけます。", btn: "アナグラムを見つける", hint: "ワイルドカード(? *)で補完。" },
 random: { title: "ランダム単語生成", subtitle: "長さ・接頭辞・接尾辞・含有の条件でランダムな実在単語を生成。", length: "長さ", any: "任意", count: "生成数", btn: "生成" },
 wordfeud: { title: "Wordfeudヘルプ", subtitle: "ラックから最適なWordfeud単語を探します。", btn: "単語を見つける", hint: "? または * でブランク。" },
 dictionary: { title: "辞書チェック", subtitle: "単語の存在確認、スクラブル得点、定義を表示。", btn: "確認", exists: "は有効な単語です", notExists: "は辞書に見つかりません", definition: "定義", score: "スクラブル得点", tiles: "文字タイル" },
 scrabble: { title: "スクラブル複製", subtitle: "全員同じラックの複製モード。7文字(+盤面文字)で最高得点の手を見つけます。", rack: "ラック", board: "盤面文字(任意)", btn: "最適な単語を見つける", hint: "ワイルドカード可。得点順。" },
 wordlists: { title: "単語リスト", subtitle: "2〜7文字のすべての単語を閲覧。A〜Zで探索。", allWords: "すべての単語", startsBy: "A〜Zで始まる", endsBy: "A〜Zで終わる", letter: "文字", selectLength: "長さ", selectLetter: "文字", browse: "閲覧" },
 about: {
  title: "wordIzyについて",
  intro: "wordIzyへようこそ。高性能なワードゲームユーティリティ、アナグラムソルバー、教育的なパズルリソースを提供する最高峰の場所です。インディー開発者と長年の言葉パズル愛好家からなる専心のチームによって構築されたwordIzyは、ウェブで最速・最もクリーン・最も気が散らない辞書ツールセットになるよう、当初から設計されています。",
  sections: [
   {
    heading: "私たちのミッション",
    body: "私たちのミッションは、プレイヤーが語彙を高め、知力を鍛え、フレンドリーなパズルの議論を絶対的な精度で解決するのを助けることです。言葉ソルバーは、押し付けがましいレイアウトや遅い読み込み時間、複雑な設定で雑然としているべきではないと考えています。だからこそwordIzyは、即時計算、複数言語にローカライズされたスクラブル辞書、そして日常のシームレスな使用のために構築された直感的なカスタムフィルタリングエンジンを備えています。",
   },
   {
    heading: "wordIzyを選ぶ理由は？",
    body: "基本的で一般的な検索表とは異なり、当社のツールは世界で最も人気のある言葉ゲームの正確なメカニクスに合わせて特注されています：\n• 包括的な辞書データベース：9つの言語をサポートし、厳選された日本語ローマ字リスト、NWL2023、CSW21などの公式競技用語彙に対して直接文字を絞り込みます。\n• 現実的なゲームロジック：高度なワイルドカードフィルタリングシステムは、スクラブルの空白タイルの配布などのルールを認識し、真のゼロ点値を割り当てることで、大会レベルの正確な手を計画できます。\n• 革新的な教育ツール：ローカルに保存されるSave Vaultなどの独自機能は、個人の単語カード管理ツールとして機能し、プレイヤーがオフラインで単語のパターン、フック、拡張を学べるアクティブな環境を提供します。\n• 魅力的なゲームプレイ：ツールを超えて、Anagram Blitzのようなカスタム体験を創造し、言葉ゲーム愛好者にスピードを試し、自己ベストスコアに挑戦するテンポの速い環境を提供します。",
   },
   {
    heading: "プライバシーへの取り組み",
    body: "デジタルセキュリティとシステムのパフォーマンスを大切にしています。単語ブックマーク履歴のような高度なオプションは、ブラウザのローカルストレージを使用して直接実行されます。つまり、個人の学習リストがデバイスから離れることはなく、ユーザーアカウントの登録は不要で、データは完全にプライベートなまま保たれます。",
   },
   {
    heading: "お問い合わせ",
    body: "ルックアップアルゴリズムの改善、データベースの拡張、新しいゲームモードの設計に常に取り組んでいます。機能のリクエスト、辞書の修正、一般的なフィードバックがある場合は、お問い合わせページからご連絡ください。wordIzyを日々のゲームルーチンの一部にしていただきありがとうございます！",
   },
  ],
 },
 contact: {
  title: "お問い合わせ",
  intro: "wordIzy についてご質問、フィードバック、機能のご提案がありますか？ぜひお聞かせください！\n\nScrabble 辞書に載っていない単語を見つけた、Anagram Blitz のプレイ中にバグに遭遇した、あるいは新しいツールのバリエーションを提案したいなど、あなたのご意見は世界中のワードパズルプレイヤーのためにより良いプラットフォームを構築するのに役立ちます。",
  sections: [
   {
    heading: "お問い合わせ方法",
    body: "すべてのお問い合わせ、フィードバック、サポートリクエストは当社の公式管理者メールアドレスまで直接お送りください：\n📩 support@wordizy.com",
   },
   {
    heading: "メッセージにご記入ください",
    body: "お客様からのご要望をできるだけ迅速に処理するため、関連する詳細をご記入ください：\n• バグ報告の場合：使用していたデバイスやブラウザーをお知らせください（例：iPhone/Safari または デスクトップ/Chrome）。\n• 辞書の修正の場合：使用していた具体的な単語、言語辞書、ゲームモードをお知らせください。\n• 提携について：件名にお客様の会社名またはプラットフォーム名を明記してください。",
   },
   {
    heading: "想定される回答時間",
    body: "当社は小規模な独立開発チームですが、いただいたフィードバックはすべて拝読しております。原則として月曜から金曜の 24〜48 時間以内にご返信いたします。",
   },
  ],
  closing: "wordIzy コミュニティのご参加、ありがとうございます！",
 },
 privacy: {
  title: "プライバシーポリシー",
  intro: "wordizy.com からアクセス可能な wordIzy では、訪問者のプライバシーを最優先事項の一つとしています。このプライバシーポリシー文書には、wordIzy が収集・記録する情報の種類と、その利用方法が記載されています。\n\nプライバシーポリシーに関する追加のご質問や詳細情報が必要な場合は、お気軽にお問い合わせください。",
  lastUpdated: "最終更新日：2026年10月28日",
  sections: [
   {
    heading: "ログファイル",
    body: "wordIzy はログファイルを使用する標準的な手順に従っています。これらのファイルは、ユーザーがウェブサイトを訪問した際に記録します。すべてのホスティング企業は、ホスティングサービスの分析の一環としてこれを行っています。ログファイルに収集される情報には、インターネットプロトコル（IP）アドレス、ブラウザーの種類、インターネットサービスプロバイダー（ISP）、日付と時刻のタイムスタンプ、参照元・退出ページ、さらにはクリック数などが含まれます。これらは個人を特定できる情報にはリンクされません。情報の目的は、傾向の分析、サイトの管理、ウェブサイト上でのユーザーの移動の追跡、および人口統計情報の収集です。",
   },
   {
    heading: "Cookie とウェブビーコン",
    body: "他のウェブサイトと同様に、wordIzy は「Cookie」を使用します。これらの Cookie は、訪問者の設定や、訪問者がアクセスまたは訪問したウェブサイト上のページなど、情報を保存するために使用されます。この情報は、訪問者のブラウザーの種類やその他の情報に基づいてウェブページのコンテンツをカスタマイズすることで、ユーザーエクスペリエンスを最適化するために使用されます。",
   },
   {
    heading: "Google DoubleClick DART Cookie",
    body: "Google は当サイトのサードパーティベンダーの一つです。また、wordizy.com やインターネット上の他のサイトへの訪問に基づいて当サイトの訪問者に広告を配信するために、DART Cookie と呼ばれる Cookie を使用しています。ただし、訪問者は Google の広告およびコンテンツネットワークプライバシーポリシー（次の URL：google.com）にアクセスすることで、DART Cookie の使用を拒否できます。",
   },
   {
    heading: "当社の広告パートナー",
    body: "当サイトの広告主の一部は Cookie やウェブビーコンを使用する場合があります。当社の広告パートナーには次が含まれます：Google AdSense。各広告パートナーには、ユーザーデータに関するポリシーについて独自のプライバシーポリシーがあります。アクセスしやすいように、上記に各社のプライバシーポリシーへのハイパーリンクを設定しています。サードパーティの広告サーバーや広告ネットワークは、wordIzy 上に表示されるそれぞれの広告やリンクで使用される Cookie、JavaScript、ウェブビーコンなどの技術を使用し、これらはユーザーのブラウザーに直接送信されます。これらが発生した際、自動的にあなたの IP アドレスを受信します。これらの技術は、広告キャンペーンの効果を測定したり、あなたが訪問するウェブサイトで表示される広告コンテンツをパーソナライズするために使用されます。\n\nwordIzy は、サードパーティの広告主が使用するこれらの Cookie に対してアクセス権も制御権も持たないことにご留意ください。",
   },
   {
    heading: "サードパーティのプライバシーポリシー",
    body: "wordIzy のプライバシーポリシーは他の広告主やウェブサイトには適用されません。したがって、より詳細な情報については、これらのサードパーティ広告サーバーのそれぞれのプライバシーポリシーを参照することをお勧めします。これには、特定のオプションのオプトアウト方法に関する慣行や指示が含まれる場合があります。\n\nブラウザーの個別のオプションから Cookie を無効にすることを選択できます。特定のウェブブラウザーでの Cookie 管理に関する詳細情報は、それぞれのブラウザーのウェブサイトで見つけることができます。",
   },
   {
    heading: "ブラウザーのローカルストレージ",
    body: "ユーザーアカウントや登録を必要とせずにパーソナライズされた機能を提供するため、wordIzy は Save Vault やゲーム設定などの機能について、お使いのブラウザーのローカルストレージ（localStorage）を利用しています。このデータは完全にあなたのローカルデバイスに保存されます。当社のサーバーに送信されたり、第三者と共有されたり、外部ウェブサイトにまたがる追跡目的で使用されることはありません。ブラウザーのキャッシュをクリアするか、ツールインターフェース内で提供されるオプションを使用することで、いつでもこのデータを消去できます。",
   },
   {
    heading: "子どもに関する情報",
    body: "当社のもう一つの優先事項は、インターネットを使用する子どもの保護を強化することです。親や後見人には、お子様のオンライン活動を観察し、参加し、かつ/または監視・指導することをお勧めします。\n\nwordIzy は、13 歳未満の子どもから個人を特定できる情報（Personal Identifiable Information）を意図的に収集することはありません。お子様が当ウェブサイトでこの種の情報を提供したと思われる場合は、直ちに当社にご連絡いただくよう強くお勧めします。当社は記録から当該情報を速やかに削除するよう最善を尽くします。",
   },
   {
    heading: "オンラインプライバシーポリシーのみ",
    body: "本プライバシーポリシーは当社のオンライン活動にのみ適用され、wordIzy で共有および/または収集した情報に関して当ウェブサイトの訪問者に有効です。このポリシーは、オフラインで収集された、または当ウェブサイト以外のチャネルを通じて収集された情報には適用されません。",
   },
   {
    heading: "同意",
    body: "当ウェブサイトを利用することにより、あなたは本プライバシーポリシーに同意し、その利用規約に同意したことになります。",
   },
  ],
  thirdPartyServices: [
    {
      name: "Google AdSense",
      description: "当サイトの訪問者に広告を配信します。wordizy.com や他のサイトへの訪問に基づいて広告を配信するために Cookie（DART Cookie）を使用します。Google の広告およびコンテンツネットワークプライバシーポリシーにアクセスすることで、DART Cookie の使用を拒否できます。",
      url: "https://policies.google.com/technologies/ads",
    },
  ],
 },
 terms: {
  title: "利用規約",
  intro: "wordIzy（wordizy.com からアクセス可能）へようこそ。本利用規約（以下「規約」）は、当社のウェブサイト、ワードゲーム支援ツール、辞書、および Anagram Blitz などのインタラクティブゲーム（総称して「サービス」）へのアクセスおよび利用を規定します。\n\nwordIzy にアクセスまたは使用することにより、あなたは本規約およびプライバシーポリシーに拘束されることに同意します。本規約に同意されない場合は、当社のサービスを使用しないでください。",
  lastUpdated: "最終更新日：2026年10月28日",
  sections: [
   {
    heading: "1. サービスの説明",
    body: "wordIzy は無料のオンライン・ワードパズル支援ツール、アナグラム・ソルバー、辞書検索、ワードベースのミニゲームを提供します。すべてのサービスは「現状有姿」および「利用可能な状態」ベースで、個人的・非商用の娯楽および教育目的のみに提供されます。",
   },
   {
    heading: "2. 許可される使用と制限",
    body: "あなたには、本規約に厳密に従って wordIzy にアクセスおよび使用するための、限定的かつ非独占的、譲渡不可、取消可能なライセンスが付与されます。\n使用の条件として、あなたは以下を行わないことに同意します：\n• 当社のデータベースからデータ、テキスト、単語リストを収集するために、自動化システム、スクレイパー、スパイダー、ロボット、スクリプトを使用すること。\n• ウェブサイトサーバーのパフォーマンス、完全性、またはセキュリティを妨害または混乱させること。\n• 当社の事前の書面による許可なく、サイトのいかなる部分のフレーム化またはミラーリングを行うこと。\n• 当社のワードゲーム支援ツールまたは自動化システムを使用して、それらのプラットフォームのそれぞれの規約によって外部支援ツールが明示的に禁止されている競争環境で不正行為を行うこと。",
   },
   {
    heading: "3. 知的財産権",
    body: "wordIzy 上のすべてのコンテンツ、機能、特徴、ロゴ、サイトデザイン、テキスト、およびカスタムゲームソフトウェア（Anagram Blitz を含む）は wordIzy の専有財産であり、国際著作権法、商標法、知的財産権法によって保護されています。明示的な書面による同意なく、当社の財産を複製、配布、改変、または派生的作品を作成することはできません。",
   },
   {
    heading: "4. サードパーティの商標と免責事項",
    body: "Scrabble、Wordle、Words With Friends、Wordfeud、Quordle など（ただしこれらに限定されない）のサードパーティゲームへの言及は、当社のツール群の互換性を説明するための情報提供および記述目的のみに使用されます。wordIzy は独立したプラットフォームであり、Hasbro、Mattel、The New York Times Company、またはそれらのそれぞれの親会社もしくは関連会社と提携、推奨、承認、またはスポンサーされる関係にはありません。",
   },
   {
    heading: "5. ユーザーデータとローカルストレージ",
    body: "wordIzy はユーザー登録やアカウント作成を必要としません。Save Vault のような機能は、設定状態や単語履歴をあなたのデバイス上にローカルで保存するため、ウェブブラウザーのローカルストレージ（localStorage）を利用します。ブラウザーのキャッシュクリア、ハードウェアの変更、またはブラウザーのアップデートから生じるデータ損失について、当社は一切の責任または義務を負いません。",
   },
   {
    heading: "6. 責任の制限",
    body: "wordIzy、その開発者、または関連会社は、当社のウェブサイトの使用または使用不能に起因する直接的、間接的、付随的、特別、または結果的損害について、たとえそのような損害の可能性を知らされていた場合でも、一切の責任を負いません。単語リスト、スコア計算、または辞書支援設定が完全にエラーがないこと、またはリアルタイムのゲーム辞書パッチと一致するように更新されていることを保証しません。",
   },
   {
    heading: "7. サービスおよび規約の変更",
    body: "当社は、いつでも事前通知なくサービスのいかなる側面も変更、一時停止、または中止する権利を留保します。また、当社の裁量で本規約を修正する権利も留保します。公開されたアップデート後の wordIzy の継続使用は、改訂された規約への承認とみなされます。",
   },
   {
    heading: "8. 準拠法",
    body: "本規約は、国際的なデジタル商取引の実務に準拠し、それに従って解釈されるものとし、法の抵触原則は考慮しません。",
   },
   {
    heading: "9. 連絡先情報",
    body: "本利用規約に関するご質問やご不明な点がございましたら、当社の公式お問い合わせページよりご連絡ください。",
   },
  ],
 },
 sitemap: { title: "サイトマップ", body: "WordIzyのすべてのページ。" },
 footer: { rights: "全著作権所有。", madeWith: "言葉を愛する人のために。", links: "クイックリンク", desc: "9言語の無料アナグラム&解決ツール。登録不要。", disclaimer: "エンターテインメントとワードゲーム用。ScrabbleやWordleとは提携していません。" },
 faq: {
  title: "使い方 & FAQ",
  unscrambler: [
   { q: "ワードアナグラムとは？使い方は？", a: "アナグラムは、スクラブルのラックのような文字の集まり（例：SRAABLC）を受け取り、その文字で綴れる辞書内の有効な単語をすべて見つけます。「あなたの文字」ボックスに文字を入力し、解決をクリックします。結果は長さ別（長い順）にグループ化され、各単語にスクラブルの得点が表示されます。スクラブル、Words With Friends、Wordfeud、クロスワード、アナグラムパズルに最適です。" },
   { q: "ワイルドカード(? と *)の仕組みは？", a: "不明な文字がある場合は ? または * をワイルドカードとして使います — スクラブルのブランクタイル、クロスワードの空欄、Wordleの未確定文字を表します。「QUER?Y」と入力すると、WordIzyは「QUER」+任意1文字+「Y」に一致するすべての単語を探し、QUERYを直接返します。各ワイルドカードは0点（公式ブランクタイル規則に準拠）なので、ブランクタイルを持ってプレイする際の表示スコアが現実的になります。複数のワイルドカードを同時にチェーンできます — 「A??LE」はAPPLE、ADDLE、AGILE、AISLE、ABLEに一致 — ラックが不完全なときアナグラム候補を探索するのに最適です。結果を有用に保つため、ワイルドカードは1クエリにつき1〜2個に制限してください：追加のワイルドカードごとに候補集合が掛け算で増え、3個を超えると実際のタイルではプレイできない単語が出始めます。ワイルドカードはWordle解答機、アナグラム解答機、Wordfeudヘルパーでも同じ意味で動作し、サイト全体で同一の部分文字ワークフローを使えます。" },
   { q: "詳細フィルターの使い方は？", a: "「詳細フィルター」をクリックすると3つのオプション欄が表示されます。「で始まる」は指定文字で始まる単語に限定（例：「AB」→ABで始まる単語のみ）。「で終わる」は同様に接尾辞で制限。「必ず含む」は特定の文字が結果のどこかに必ず含まれるようにします。3つすべてをワイルドカードと組み合わせて精密に制御できます。" },
   { q: "単語の得点はどう計算されますか？", a: "各単語は公式英語スクラブル文字得点で評価されます：A=1、B=3、C=3、D=2、E=1、F=4、G=2、H=4、I=1、J=8、K=5、L=1、M=3、N=1、O=1、P=3、Q=10、R=1、S=1、T=1、U=1、V=4、W=4、X=8、Y=4、Z=10。ワイルドカード(? *)はブランクタイルとして扱われ0点（公式規則通り）です。WordIzyは各結果の合計を自動計算し、各長さグループ内で得点順に並べるため、最も高得点の手がすべてのリストの先頭に出ます — タイル価値の暗算を省き、ビンゴ候補を一目で判別できます。他言語では、WordIzyはその言語の辞書の公式スクラブル文字得点（フランス語ODS9、スペイン語FISE、伊語Zingarelli、ポルトガル語、独語、蘭語OpenTaal、日本語と北京語には厳選ローマ字・ピンインリスト）を使います。ナビバーのセレクターで言語を切り替えると、ローカライズされた採点を確認できます。実際のゲーム得点はボーナスマス（ダブル/トリプル文字・語）と7タイル全使用の+50ビンゴボーナスにも依存するため、表示スコアを基準値として扱い、手を計画する際は頭の中でボーナスを加算してください。" },
   { q: "どんな辞書が使えますか？", a: "WordIzyは9言語に対応：英語（NWL2023 + CSW21）、フランス語（ODS9 2024）、スペイン語（FISE）、イタリア語（Zingarelli）、ポルトガル語、ドイツ語、オランダ語（OpenTaal）、さらに日本語（ローマ字）と中国語（ピンイン）。すべての単語は各言語の公式スクラブル辞書で絞り込まれています。ナビバーの言語セレクターで切替できます。" },
   { q: "なぜ結果は長さ別にグループ化されるのですか？", a: "長さ別グループ化により、必要な手の種類を見つけやすくなります。スクラブルでは長い単語ほど高得点ですが、短い単語が盤面に合うこともあります。最も長い単語が上に、2文字単語まで順に表示されます。各グループ内ではスクラブル得点順に並び、最善手を素早く見つけられます。" },
  ],
  scramble: [
   { q: "ミックス / 解決ツールの用途は？", a: "このツールは、文字が混ぜられて元の単語を探すアナグラムパズルを解きます。混ぜた文字（例：RBOLENW）を入力して解決をクリックすると、形成可能な実在単語をすべて表示します。新聞のアナグラム、言葉遊び、ミックス挑戦に最適です。" },
   { q: "アナグラム（ワードアナグラム）との違いは？", a: "この解決ツールはワードアナグラムと同じエンジンを使いますが、ラックから可能な単語をすべて探すのではなく、混ぜられた単語パズルの解決に特化しています。入力下の「単語を混ぜる」機能で、単語をランダムなバリエーションに混ぜることもできます——自作パズルに便利です。" },
   { q: "ワイルドカードは使えますか？", a: "はい。? または * で不明文字を表せます。パズルに欠けた文字がある場合、既知の文字に ? を加えて入力すると、WordIzyがすべての有効な組み合わせで埋めます。" },
   { q: "自分で混ぜた単語を作るには？", a: "メイン入力下の「単語を混ぜる」カードを使います。任意の単語（例：「scrabble」）を入力して生成をクリックすると、WordIzyがその単語のランダムな混ぜ合わせを複数生成します。友人向けのパズル作成や、解く練習に使えます。" },
  ],
  wordle: [
   { q: "Wordle解決の仕組みは？", a: "Wordle解決は、ゲームのフィードバックを使って今日の答えを絞り込みます。緑（正しい位置）、黄（単語内だが位置違い）、グレー（単語にない）の文字情報を入力すると、条件に合う有効な単語をすべて返します。" },
   { q: "配置済（緑）文字の入力方法は？", a: "「配置済(緑)」欄に、正しい位置にあることが分かっている文字を入力し、空欄は . または _ で表します。例：A _ _ L E と分かっていれば「A..LE」と入力します。解決はこのパターンに完全一致する単語のみを返します。" },
   { q: "有効（黄）と除外（グレー）の文字とは？", a: "有効文字（黄）は単語内にあることが分かっているが、推測した位置にはない文字です——「有効(黄)」欄にすべて入力します（例：「RST」）。除外文字（グレー）は単語にないことが確認された文字です——「除外(グレー)」欄に入力します（例：「BXF」）。解決は除外文字を含む単語をすべて取り除きます。" },
   { q: "単語の長さはどう選ぶ？", a: "今日のWordleの長さを選択します（既定5）。WordIzyは4〜8文字の単語に対応しているため、Quordle、Octordle、長さカスタムのゲームにも使えます。" },
   { q: "次の推測の選び方のヒントは？", a: "結果から、まだ試していない一般的な文字（R、T、S、L、Nなど）を使う単語を選びましょう。情報量が最大になります。候補が多ければ、最も多くの可能性を消せる単語を選びます。解決は各単語のスクラブル得点を表示します——高得点はまれな文字を意味し、絞り込みに役立つことが多いです。" },
  ],
  quordle: [
   { q: "Quordle解決とは？", a: "Quordleは4つのWordleを同時に解くゲームです。この解決ツールは最大4ボード分の条件を一度に入力でき、各ボードの候補単語を返します。各ボードは独自の配置済（緑）、有効（黄）、除外（グレー）文字を保持します。" },
   { q: "複数ボードの使い方は？", a: "各ボードについて分かっていることを入力します。ボード1の条件はボード1の結果にのみ影響します。「ボード追加」をクリックして最大4ボードまで追加できます。Xボタンでボードを削除。準備ができたら解決をクリックして全ボードの候補を取得します。" },
   { q: "ボード間で文字を共有すべき？", a: "はい——Quordleの主要戦略は、1つの推測で複数ボードの情報を集めることです。ある文字がボード1で緑なら、他のボードでも同じ位置にある可能性が高いです。各ボードに共有条件を入力して情報を交差させ、4つの答えをより早く絞りましょう。" },
   { q: "Quordleの戦略ヒントは？", a: "一般的な文字を多く含む単語（CRANEやSLATEなど）で始め、全ボードの情報を集めましょう。最も条件の多いボードに先に集中します——解決すれば精神的な余裕が生まれます。各ボードが扱いやすいリストまで絞れる十分な情報（2〜3推測後）が揃ったら解決を使いましょう。" },
  ],
  anagram: [
   { q: "アナグラムとは？", a: "アナグラムとは、別の単語のすべての文字を並べ替えて作られた単語やフレーズです。例えばLISTENとSILENTはアナグラム——同じ文字、異なる順序。アナグラム解決は、指定したすべての文字をちょうど使う単語をすべて見つけます。" },
   { q: "ワードアナグラムとの違いは？", a: "ワードアナグラムは文字から形成できる「任意の長さ」の単語を（短いものも含めて）見つけます。アナグラム解決は「すべての」文字を使う単語のみ——完全長のアナグラム——を見つけます。例：「CHIEN」では、アナグラム解決はCHIEN、CHINE、NICHE（すべて5文字）を返しますが、ワードアナグラムはICE、IN、HEのような短い単語も返します。" },
   { q: "ワイルドカードは使えますか？", a: "はい。? または * をワイルドカードとして残り枠を埋めます。例：「CAT??」と入力すると、CATと任意2文字を組み合わせた5文字アナグラムをすべて見つけます。ワイルドカードは0点（ブランクタイル同様）です。" },
   { q: "アナグラムは何に役立つ？", a: "アナグラムは言葉遊び、パズル、暗号、言語学に使われます。スクラブルでは、ラックのアナグラムを見つけるとビンゴ（7タイルすべてを使って50点ボーナス）を見つけやすくなります。クロスワードのヒント、トリビア、頭の体操にも人気です。" },
  ],
  random: [
   { q: "ランダム単語生成は何をしますか？", a: "選択した辞書から、オプションのフィルター付きでランダムな実在単語を生成します。単語の長さ、先頭文字、末尾文字、必須文字を指定できます。ゲーム、創作、ネーミング、語彙練習、実在単語によるパスワード生成に使えます。" },
   { q: "ランダム単語の絞り込み方は？", a: "「長さ」を特定の数（2〜12）にするか「任意」のままにします。「で始まる」は先頭文字で絞り込みます。「で終わる」は末尾文字で絞り込みます。「含む」は特定の文字がどこかに含まれることを要求します。「生成数」は生成する単語数（1〜200）を制御します。" },
   { q: "スクラブルで有効な単語ですか？", a: "はい。生成されるすべての単語は選択言語の公式スクラブル辞書（英語はNWL2023/CSW21、フランス語はODS9など）から取得されます。すべてスクラブルや他の言葉遊びでプレイ可能です。" },
   { q: "言葉遊びに使えますか？", a: "もちろんです。Pictionary、シャレード、連想ゲーム、語彙クイズ用にランダム単語を生成できます。パスワード生成には、異なる長さのランダム単語を3〜4個組み合わせると、覚えやすく安全なパスフレーズになります。" },
  ],
  wordfeud: [
   { q: "Wordfeudヘルプとは？", a: "Wordfeudはスクラブルに似た人気のモバイル言葉遊びです。このヘルプは、ラックからプレイ可能な最良の単語を見つけます。7文字（＋盤面の既存文字）を入力すると、WordIzyがプレイ可能なすべての単語をスクラブル得点順で返します。" },
   { q: "ラックの入力方法は？", a: "「あなたの文字」ボックスに7つのタイル文字を入力します。ブランクタイルには ? または * を使います（任意の文字を表すが0点）。盤面に既にある文字から繋げたい場合はそれも加えます——WordIzyは合わせたプールから形成可能な単語を探します。" },
   { q: "どの辞書を使うべき？", a: "Wordfeudは地域によって複数の辞書に対応しています。英語版Wordfeudはスクラブル類似のリストを使うため、英語（NWL2023/CSW21）が適しています。他言語は、言語セレクターから対応するもの（フランス語ODS9、スペイン語FISEなど）を選びます。" },
   { q: "得点はどう計算されますか？", a: "得点は選択言語の公式スクラブル文字得点を使います。なお、Wordfeudの実際の得点計算は少し異なる場合があります（ボーナスマスや独自タイル配布があるため）。高得点の手を見つける目安として使ってください——ラックから最も点数の高い単語が通常、最善の手です。" },
  ],
  dictionary: [
   { q: "辞書チェックは何をしますか？", a: "任意の単語を入力すると、選択言語の公式スクラブル辞書で有効かどうかを確認します。ツールは単語をスクラブルタイルとして表示し、有効/無効バッジ、スクラブル得点、単語の長さ、文字タイル、辞書の定義、（あれば）同義語を表示します。" },
   { q: "定義はどこから来ますか？", a: "定義は複数の出典から取得します：Free Dictionary API（英語、フランス語、スペイン語、ドイツ語、イタリア語、ポルトガル語）、Wiktionary（全言語のフォールバック）、残りのギャップはAIアシスタント。各定義の横に出典が表示されます。" },
   { q: "同義語はどこから来ますか？", a: "同義語はDatamuse（英語、スペイン語、フランス語、イタリア語、ポルトガル語）とOpenThesaurus（ドイツ語）から取得します。表示されるのは、それ自体がスクラブル有効単語である同義語のみです——同義語をクリックすると即座に確認できます。" },
   { q: "よく使う単語が無効になるのはなぜ？", a: "スクラブル辞書は厳格——固有名詞、略語、ハイフン付き単語、アポストロフィ必要な単語を除外します。例：「BRUNCH」は有効ですが「BRUNCH'S」は無効かも。単語が欠けているように見える場合、大文字の固有名詞か、公式リストにまだ追加されていない新語かもしれません。他言語に切替えて別辞書で確認してみてください。" },
  ],
  scrabble: [
   { q: "スクラブル複製とは？", a: "複製スクラブルは、全プレイヤーが同じラックを受け取り、最善の手を見つける変種です。運ではなく技術を試すため、大会や練習で使われます。このツールはラックから最も高得点の単語を見つけるのに役立ちます——7文字と、必要なら盤面文字を入力し、「最適な単語を見つける」をクリックします。" },
   { q: "盤面文字の入力方法は？", a: "盤面にすでに置かれていて繋げられる文字があれば、「盤面文字(任意)」欄にラック文字と一緒に入力します。WordIzyは合わせたプールを利用可能文字として扱います。これにより、既存の手に引っ掛ける単語を見つけやすくなります——実戦で得点を最大化するために必須です。" },
   { q: "上位手のランキングは？", a: "単語はスクラブル得点順（高い順）に並びます。上位10手が上部のハイライトリストに表示されます。実際の得点はボーナスマス（文字/単語の2倍/3倍）やビンゴ（7タイルすべてで50点ボーナス）にも依存することに注意。ツールの得点を基準にし、盤面の位置を考慮してください。" },
   { q: "ビンゴとは？見つけ方は？", a: "ビンゴはスクラブルで最大の単独の大逆転です：1ターンに7タイルすべてを使うと単語の基礎得点に+50ボーナスが加算され、30点の単語が80点の手になります。WordIzyでビンゴを見つけるには、完全な7文字ラックを入力し（ブランクには ? または * を使用）、リスト最上部の7文字結果グループを見ます — そこに出る各単語が潜在的ビンゴです。英語スクラブルの最も高得点な7文字ビンゴには、MUZJIKS（基礎29+50=79点）、JACUZZI（34+50=84）、SYZYGY（21+50=71）、OXAZOLIDINE（まれだが壊滅的）、そしてよくある接尾辞を受け入れる語幹ANATOMIZ-、ANTISOCIAL-、OVERLAPPING- があります。ビンゴを素早く見つけるため、-ER、-ED、-ING、-ATIONと組み合わさる高価値語幹 — SATISFI-、ANTISOY-、OVERLAP- — を覚えましょう。ラックがビンゴの形をしているときは柔軟な文字（E、R、S、T）を1〜2個キープしましょう。ビンゴボーナス(+50)は、これらのタイルを早く捨てて得る点数をほぼ常に上回るからです。" },
  ],
  wordlists: [
   { q: "単語リストページとは？", a: "単語リストでは、2〜7文字のすべての有効スクラブル単語を閲覧できます。単語は長さ別、さらに末尾文字別（A〜Z）にグループ化され、辞書を体系的に探索できます。学習、ゲーム用単語の発見、語彙の拡張に使えます。" },
   { q: "長さで絞り込むには？", a: "上部の長さセレクター（2〜7）を使います。「すべて」をクリックするとすべての長さが積み重なって表示され（2文字が上、7文字が下）、特定の数字をクリックするとその長さのみ表示されます。各長さセクションには26個のコンテナ（末尾文字A〜Zごとに1つ）があります。" },
   { q: "文字で絞り込むには？", a: "長さセレクター下のA〜Z文字列を使います。文字をクリックするとその文字で終わる単語のみが表示され、「すべて」で全文字を表示します。盤面の特定文字に引っ掛ける単語を見つけるのに便利です。" },
   { q: "なぜ単語は大文字で表示されるの？", a: "スクラブルタイルは大文字なので、合わせて大文字で表示されます。各単語の隣にスクラブル得点が表示されます。各文字コンテナ内では、単語はアルファベット順（A〜Z）に並んでおり、眺めやすいです。" },
  ],
  wordstarts: [
   { q: "「始まる」ページとは？", a: "このページでは、特定の文字で「始まる」すべての有効スクラブル単語を閲覧できます。文字（A〜Z）を選ぶと、WordIzyはその文字で始まるすべての単語を長さ別（2〜7文字）にグループ化して表示します。オープニングの研究や、盤面の先頭文字から繋ぐ単語を見つけるのに最適です。" },
   { q: "長さ・文字セレクターの使い方は？", a: "まずA〜Z列から文字を選び——先頭文字が決まります。次に長さ列（2〜7またはすべて）で長さを絞ります。各長さセクションは、選んだ文字で始まるすべての単語をアルファベット順で表示します。どちらかの列で「すべて」をクリックするとそのフィルターが外れます。" },
   { q: "スクラブルにどう役立つ？", a: "各文字で始まる単語を知ることは、オープニングや引っ掛けの計画に役立ちます。Qを持っていれば、Qで始まる単語（QI、QAT、QUAD…）を知ることで効果的にプレイできます。クロスワードのヒントが「〜で始まる」と指定することも多く、このページは重宝します。" },
   { q: "なぜ50単語でページ分割？", a: "S、A、Eなどの文字には何千もの先頭単語があります。ページを高速で読みやすく保つため、結果は50単語ごとにページ分割され、前/次ボタンが付きます。各ページにページ番号と総ページ数が表示され、現在地が分かります。" },
  ],
  wordends: [
   { q: "「終わる」ページとは？", a: "このページでは、特定の文字で「終わる」すべての有効スクラブル単語を閲覧できます。文字（A〜Z）を選ぶと、WordIzyはその文字で終わるすべての単語を長さ別（2〜7文字）にグループ化して表示します。盤面の既存文字に引っ掛ける単語を見つけるのに理想的です。" },
   { q: "長さ・文字セレクターの使い方は？", a: "まずA〜Z列から文字を選び——末尾文字が決まります。次に長さ列（2〜7またはすべて）で長さを絞ります。各長さセクションは、選んだ文字で終わるすべての単語をアルファベット順で表示します。どちらかの列で「すべて」をクリックするとそのフィルターが外れます。" },
   { q: "スクラブルにどう役立つ？", a: "末尾文字は引っ掛けに重要——盤面にSがあれば、Sで終わる単語を知ることで複数形や手の延長が可能です。同様に、D、ED、INGで終わる単語を知ることで、よくある接尾辞に繋げやすくなります。このページは競技プレイのための強力な学習ツールです。" },
   { q: "なぜ50単語でページ分割？", a: "E、S、Dなどの文字には何千もの末尾単語があります。ページを高速で読みやすく保つため、結果は50単語ごとにページ分割され、前/次ボタンが付きます。各ページにページ番号と総ページ数が表示され、現在地が分かります。" },
  ],
  vault: [
   { q: "保存ボールトとは何ですか？", a: "保存ボールトは、競技スクラブル・Wordleプレイヤー向けの内蔵語彙訓練ツール — 難しい文字組み合わせを間隔反復学習するために特別設計された個人単語ブックマークリストです。一般的なブラウザブックマークと違い、ボールトは保存した各単語のスクラブルスコアを可視化し、リスト全体をフラッシュカードアプリやAnkiデッキに直接コピーしてオフライン訓練できます。競技プレイヤーが使う4ステップのワークフローを紹介します：(1)「QUARTZEから作れる7文字単語」や「Qで始まる単語」を検索し、忘れがちな高価値単語 — QAT、QOPH、FAQIR、MUZJIKS — に星をつけます。(2) ヘッダー右上の星アイコンからボールドロワーを開きます。保存した単語は1つのリストに整理され、各項目の隣にリアルタイムスコアが表示されます。(3)「すべての行をコピー」をクリックし、Anki、Quizlet、印刷可能なフラッシュカードテンプレートに貼り付けて、画面から離れて間隔反復で復習します。(4) 翌週同じ検索を再実行し、どの単語を覚えたか比較します — 保存リストはブラウザのlocalStorageに局所保存されるため、デバイスから出ることはなく、アカウント不要で、一度ページを読み込めばオフラインで機能します。" },
   { q: "単語をボールトに保存するには？", a: "結果の単語の横の星アイコン（☆）をクリックします。保存されると星が琥珀色（★）になります。もう一度クリックすると単語がボールトから削除されます。" },
   { q: "保存した単語を表示するには？", a: "サイトヘッダー（右上隅）の星アイコンをクリックします。右からドロワーが開き、保存したすべての単語が表示されます。個別の単語をコピー、リスト全体をコピー、ボールトを空にすることができます。" },
   { q: "ボールトはデバイス間で同期されますか？", a: "いいえ — ボールトはブラウザのlocalStorageに保存されるため、デバイスごとです。ブラウザデータを消去したり別のデバイスを使用したりすると、ボールトは転送されません。アカウント不要で、データはデバイスから外部に送信されません。" },
  ],
 },
 blitz: {
  loadingEngine: "パズルエンジンを読み込み中...",
  completed: "完了",
  todaysPuzzleSolved: "📅 今日のパズル解決！",
  alreadyPlayed: "本日の挑戦は既に使用済みです！真夜中に新しい課題でお戻りください。",
  playInfinite: "無限練習モードをプレイ",
  challengeTitle: "⚡ アナグラムブリッツチャレンジ",
  challengeDesc: "スクラブル辞書から60秒以内に単語を解読してください。",
  startToday: "今日のパズルを開始",
  playInfiniteBtn: "無限練習",
  timesUp: "⏱️ 時間切れ！ゲームオーバー",
  finalScore: "最終スコア：",
  points: "ポイント。",
  playAgain: "🔄 もう一度練習",
  dailyLocked: "本日の挑戦はロックされています。また明日！",
  returnMenu: "メニューに戻る",
  timeLeft: "秒",
  totalScore: "pt",
  generating: "🎲 単語を生成中...",
  hint: "💡 ヒント：",
  wrong: "❌ 不正解！もう一度お試しください。",
  waiting: "待機中...",
  typeWord: "単語を入力...",
  skipReveal: "🏳️ スキップ＆表示",
  stopGame: "🛑 停止",
  play: "▶ プレイ",
  correct: "✨ 完璧！正解！",
  answerWas: "答えは：",
  challengeFriend: "友達を挑発する",
  challengeText: "WordIzyアナグラムブリッツで{score}点獲得 — 負けられる？無料でプレイ: https://wordizy.com/blitz",
  // SEOコンテンツセクション（ゲームカードの下）
  pageHeading: "Anagram Blitz をプレイ — 無料の60秒ワードゲーム",
  howToPlayTitle: "アナグラム・ブリッツの遊び方",
  howToPlayDesc: "アナグラム・ブリッツは60秒の高速アナグラムゲームです。シャッフルされた文字のセットが与えられ、辞書の有効な単語になるように並べ替える必要があります。正解ごとに20ポイント獲得、スキップごとに5ポイント失います。ハイスコアを更新してデイリーリーダーボードを登りましょう。",
  gameModesTitle: "ゲームモード",
  dailyModeName: "デイリーチャレンジ",
  dailyModeDesc: "1日1パズル。1回プレイしてリーダーボード用のスコアを確定します。",
  infiniteModeName: "無限プラクティス",
  infiniteModeDesc: "無制限のパズル。正解ごとに時計に10秒のボーナスが追加されます。",
  tipsTitle: "ヒントと戦略",
  tip1: "ローマ字の拍（モーラ）構造を意識しましょう：各拍は通常「子音+母音」（KA、KI、KU、KE、KO）の形をとります。",
  tip2: "ローマ字で最も頻度の高い母音は A、I、O の順です — これらを含む単語を優先的に試しましょう。",
  tip3: "「N」は語尾の「ん」として唯一子音単独で使われる文字です — N が黄色なら語尾の可能性が高いです。",
  tip4: "促音（「っ」）は子音の重複で表現されます（例：「かっこ」= KAKKO） — 同じ子音が2回連続する可能性を考えましょう。",
  blitzFooter: "アナグラム・ブリッツは公式スクラブル辞書（英語はNWL2023 + CSW21、日本語ローマ字辞書）を使用し、9言語の多言語サポートを提供します。無料で遊べ、登録不要です。",
 },
 ui: {
  advertisement: "広告",
  featuredGuide: "おすすめガイド",
  saveVaultFaqTitle: "保存ボールト — 使い方",
  relatedTools: "関連ツール",
  published: "公開日：",
  backToHome: "ホームに戻る",
  somethingWrong: "エラーが発生しました",
  tryAgain: "再試行",
  reloadPage: "ページを再読み込み",
  returnLabel: "戻る",
  allCopied: "すべての単語をコピーしました！",
  showLess: "折りたたむ",
  showMore: "もっと見る",
  enterPassword: "パスワードを入力",
  totalSearches: "合計検索数",
  topQuery: "人気の検索",
  topTool: "人気のツール",
  topLanguage: "人気の言語",
  newDailyChallenge: "本日の新しいチャレンジ",
  scrambleFeatureHint: "下の単語をシャッフル機能を使って、オリジナルのパズルを作成できます。",
  wordList: "単語リスト",
  copiedToClipboard: "クリップボードにコピーしました！",
 },
 hubPages: {
  startsSubtitle: "アルファベットの各文字で始まる、2〜15文字のすべての有効なScrabble単語を閲覧できます。",
  endsSubtitle: "アルファベットの各文字で終わる、2〜15文字のすべての有効なScrabble単語を閲覧できます。",
  lengthSubtitle: "長さ2〜15文字ごとのすべての有効なScrabble単語を閲覧できます。各長さには専用のページがあります。",
  wordleStartsSubtitle: "アルファベットの各文字で始まる、すべての有効なWordle単語を閲覧できます。最適な最初の単語を見つけ、毎日のパズルを絞り込むのに役立ちます。",
  wordleEndsSubtitle: "アルファベットの各文字で終わる、すべての有効なWordle単語を閲覧できます。フック、接尾辞を見つけ、毎日のパズルを絞り込むのに役立ちます。",
  startsHeading: "各文字で始まる単語 — A から Z",
  endsHeading: "各文字で終わる単語 — A から Z",
  lengthHeading: "単語の長さでアナグラム解除（2〜15文字）",
  wordleStartsHeading: "各文字で始まるWordle単語 — A から Z",
  wordleEndsHeading: "各文字で終わるWordle単語 — A から Z",
  clickLetterStarts: "文字をクリックすると、その文字で始まるすべての単語を専用ページで閲覧できます。",
  clickLetterEnds: "文字をクリックすると、その文字で終わるすべての単語を専用ページで閲覧できます。",
  clickLength: "数字をクリックすると、その長さのすべての単語を専用ページで閲覧できます。",
  clickLetterWordleStarts: "文字をクリックすると、その文字で始まるすべてのWordle単語を専用ページで閲覧できます。",
  clickLetterWordleEnds: "文字をクリックすると、その文字で終わるすべてのWordle単語を専用ページで閲覧できます。",
  wordleStartsBadge: "Wordle 始まり",
  wordleEndsBadge: "Wordle 終わり",
  wordleStartsTitle: "各文字で始まるWordle単語 A-Z",
  wordleEndsTitle: "各文字で終わるWordle単語 A-Z",
  returnHome: "ホームに戻る",
  footerNote: "すべての単語は公式Scrabble辞書でフィルタリングされています。",
  searchPlaceholderStarts: "A-Zの文字を入力して、その文字で始まる単語を閲覧…",
  searchPlaceholderEnds: "A-Zの文字を入力して、その文字で終わる単語を閲覧…",
  searchPlaceholderLength: "2-15の数字を入力して、長さで閲覧…",
  searchPlaceholderWordleStarts: "A-Zの文字を入力して、その文字で始まるWordle単語を閲覧…",
  searchPlaceholderWordleEnds: "A-Zの文字を入力して、その文字で終わるWordle単語を閲覧…",
  browseBtn: "閲覧",
 },
 wordListPage: {
  loading: "確認済みの単語リストを読み込み中…",
  filterPlaceholder: "単語を絞り込む…",
  filterLabel: "単語を絞り込む",
  clearFilter: "絞り込みをクリア",
  loadMore: "もっと読み込む",
  remaining: "件残り",
  allLengths: "すべて",
  filterByLength: "単語の長さで絞り込む",
  noMatch: "絞り込み条件に一致する単語はありません。",
  noWords: "単語が見つかりませんでした。",
  wordsCount: "単語",
  error: "単語の読み込みに失敗しました。更新してください。",
 },
};

const zh: Translation = {
 ...en,
 nav: {
  unscrambler: "字母重组", scramble: "乱序", wordle: "Wordle",
  quordle: "Quordle", anagram: "易位词", random: "随机单词",
  wordfeud: "Wordfeud", dictionary: "词典", scrabble: "Duplicate",
  wordlists: "单词表", wordstarts: "单词 开头", wordends: "单词 结尾", wordlestarts: "Wordle 开头", wordleends: "Wordle 结尾", about: "关于", contact: "联系", privacy: "隐私", terms: "服务条款",
  sitemap: "网站地图", tools: "工具", more: "更多", solvers: "求解器", site: "站点", wordlab: "词汇实验室", inbox: "收件箱",
  dashboard: "仪表盘", blitz:"字谜闪击", blitzShort: "Blitz"
 },
 brand: { name: "wordIzy", tagline: "重组。求解。获胜。" },
 common: {
  ...en.common,
  yourLetters: "你的字母", unscramble: "重组", clear: "清除", advancedFilters: "高级筛选",
  startsWith: "开头为", endsWith: "结尾为", mustInclude: "必须包含", dictionaryLabel: "词典",
  results: "结果", noResults: "未找到单词。请更换字母或添加通配符(? *)。", wordsFound: "个单词",
  points: "分", length: "字母", loading: "加载中…", search: "搜索",
  copy: "复制", copied: "已复制！", tryExamples: "试试：", tipsTitle: "提示与原理",
  tileValues: "Scrabble字母分值", blanks: "空白", languageLabel: "语言",
  showMore: "显示更多", showLess: "收起", allWords: "全部单词", perGroup: "每组",
  wordsCount: "个单词", reset: "重置", apply: "应用", solve: "求解", generate: "生成",
  check: "检查", example: "示例", none: "无", optional: "可选",
 },
 home: {
  ...en.home,
  title: "单词重组器", subtitle: "输入打乱的字母，用 ? 或 * 添加通配符，找出所有可拼单词——按长度分组并按Scrabble得分排序。",
  heroBadge: "免费 • 无需注册 • 9种语言",
  faqTitle: "常见问题",
  q1: "单词重组器有什么用？",
  a1: "它接收一组字母（如Scrabble牌架），找出所有可用这些字母拼出的有效词典单词。适合Scrabble、Wordfeud、填字和易位词谜题。",
  q2: "如何使用高级选项？",
  a2: "输入字母后打开高级筛选。「开头为」限制前缀，「结尾为」限制后缀，「必须包含」确保某些字母出现。配合通配符(? *)可替代未知字母。",
  q3: "原理是什么？",
  a3: "WordIzy将你的字母与所选语言的内存词典比对，判断哪些单词可拼出（? * 作通配符），应用筛选，按官方Scrabble分值计分，并按长度分组（长词优先）。",
  q4: "支持哪些语言？",
  a4: "英语、法语、西班牙语、意大利语、葡萄牙语、德语、荷兰语，以及日语（罗马字）和普通话（拼音）。",
 },
 scramble: { title: "乱序 / 求解", subtitle: "卡在谜题上？输入乱序字母，我们还原成真实单词。", inputLabel: "乱序字母", btn: "求解", solutionLabel: "可能的解", hint: "? 或 * 表示未知字母。" },
 wordle: { title: "Wordle求解", subtitle: "缩小今日Wordle范围：输入绿色（位置）、黄色（已知）、灰色（排除）字母。", length: "长度", placed: "已放置(绿)", valid: "有效(黄)", excluded: "已排除(灰)", btn: "求解", hint: "用 . 或 _ 表示空位，如 A..LE" },
 quordle: { title: "Quordle求解", subtitle: "同时求解最多四个Wordle。每个棋盘保留各自约束。", board: "棋盘", addBoard: "添加棋盘", hint: "填写已知信息后求解。" },
 anagram: { title: "易位词求解", subtitle: "找出字母的所有易位词——恰好用完所有字母的单词。", btn: "查找易位词", hint: "通配符(? *)补全。" },
 random: { title: "随机单词生成器", subtitle: "按长度、前缀、后缀、包含条件生成随机真实单词。", length: "长度", any: "任意", count: "数量", btn: "生成" },
 wordfeud: { title: "Wordfeud助手", subtitle: "从牌架找出最佳Wordfeud单词。选择词典后求解。", btn: "查找单词", hint: "? 或 * 作空白牌。" },
 dictionary: { title: "查词典", subtitle: "验证单词是否存在，查看Scrabble得分和释义。", btn: "检查", exists: "是有效单词", notExists: "未在词典中找到", definition: "释义", score: "Scrabble得分", tiles: "字母牌" },
 scrabble: { title: "Scrabble复刻", subtitle: "复刻模式每人相同牌架。输入7个字母（加已放字母）找出最高分。", rack: "你的牌架", board: "盘面字母(可选)", btn: "找最佳单词", hint: "支持通配符。按得分排序。" },
 wordlists: { title: "单词表", subtitle: "浏览所有2到7字母单词。选择视图、长度和字母按A–Z探索。", allWords: "全部单词", startsBy: "开头A–Z", endsBy: "结尾A–Z", letter: "字母", selectLength: "长度", selectLetter: "字母", browse: "浏览" },
 about: {
  title: "关于 wordIzy",
  intro: "欢迎使用 wordIzy，您的高性能文字游戏工具、字谜求解器和教育性谜题资源首选目的地。wordIzy 由一支专注的独立开发者团队和终身文字谜题爱好者共同打造，从设计之初就以成为网络上最快、最干净、最少干扰的字典工具集为目标。",
  sections: [
   {
    heading: "我们的使命",
    body: "我们的使命是帮助玩家提升词汇、训练头脑，并以绝对的准确性解决友好的谜题争议。我们相信，文字求解器不应被杂乱的布局、缓慢的加载时间或复杂的设置所困扰。因此 wordIzy 提供即时计算、本地化的多语言 Scrabble 字典以及直观的自定义过滤引擎，专为实现无缝的日常使用而打造。",
   },
   {
    heading: "为什么选择 wordIzy？",
    body: "与基础、通用的查找表不同，我们的工具经过精心定制，精准契合全球最受欢迎文字游戏的核心机制：\n• 全面的字典数据库：我们支持 9 种语言，将您的字母直接对照官方竞赛词汇表进行筛选，例如精心整理的中文拼音列表、NWL2023 和 CSW21。\n• 真实的游戏逻辑：我们先进的通配符筛选系统能够识别 Scrabble 空白牌分配等规则，并赋予真正的零分值，帮助您精确规划比赛级别的棋步。\n• 创新的教育工具：像我们本地保存的 Save Vault 这样的独特功能可用作个人随卡片管理器，为玩家提供一个活跃的环境来离线学习单词模式、挂接和扩展。\n• 引人入胜的游戏体验：除了工具之外，我们还打造像 Anagram Blitz 这样的定制体验，让文字游戏爱好者在快节奏的环境中测试速度并挑战自己的最高分。",
   },
   {
    heading: "我们对隐私的承诺",
    body: "我们重视您的数字安全和系统性能。诸如单词书签历史之类的高级选项直接通过浏览器的本地存储来执行。这意味着您的个人学习列表永远不会离开您的设备，无需用户账户注册，且您的数据完全保持私密。",
   },
   {
    heading: "联系我们",
    body: "我们不断努力改进查找算法、扩展数据库并设计新的游戏模式。如果您有任何功能请求、字典更正或一般反馈，请通过我们的联系页面与我们联系。感谢您将 wordIzy 纳入您的日常游戏惯例！",
   },
  ],
 },
 contact: {
  title: "联系我们",
  intro: "对 wordIzy 有疑问、反馈或功能建议吗？我们很乐意收到您的来信！\n\n无论您是在我们的 Scrabble 词典中发现遗漏的单词、在玩 Anagram Blitz 时遇到 bug，还是想建议新的工具变体，您的意见都能帮助我们为全球字谜玩家打造更好的平台。",
  sections: [
   {
    heading: "如何联系我们",
    body: "请将所有咨询、反馈或支持请求直接发送至我们的官方管理邮箱：\n📩 support@wordizy.com",
   },
   {
    heading: "请在留言中包含",
    body: "为帮助我们尽快处理您的请求，请提供相关详细信息：\n• 提交 Bug 报告：请说明您使用的设备或浏览器（例如 iPhone/Safari 或 桌面端/Chrome）。\n• 提交词典修正：请说明具体的单词、语言词典或您使用的游戏模式。\n• 合作意向：请在主题行中清楚注明您的公司或平台名称。",
   },
   {
    heading: "预期响应时间",
    body: "我们是一支小型的独立开发团队，但我们会认真阅读收到的每一条反馈。一般情况下，您可以在周一至周五的 24 至 48 小时内收到我们的回复。",
   },
  ],
  closing: "感谢您成为 wordIzy 社区的一员！",
 },
 privacy: {
  title: "隐私政策",
  intro: "在 wordIzy（可通过 wordizy.com 访问），我们最优先考虑的事项之一就是访客的隐私。本《隐私政策》文档包含 wordIzy 收集和记录的信息类型以及我们如何使用这些信息。\n\n如对本《隐私政策》有其他问题或需要更多信息，请随时与我们联系。",
  lastUpdated: "最后更新：2026 年 10 月 28 日",
  sections: [
   {
    heading: "日志文件",
    body: "wordIzy 遵循使用日志文件的标准程序。这些文件记录访客访问网站时的信息。所有托管公司都将此作为托管服务分析的一部分。日志文件收集的信息包括互联网协议（IP）地址、浏览器类型、互联网服务提供商（ISP）、日期和时间戳、推荐/退出页面，以及可能的点击次数。这些信息不与任何可识别个人的信息相关联。该信息用于分析趋势、管理网站、跟踪用户在网站上的移动以及收集人口统计信息。",
   },
   {
    heading: "Cookie 和网络信标",
    body: "与其他任何网站一样，wordIzy 使用\"Cookie\"。这些 Cookie 用于存储信息，包括访客偏好以及访客访问或浏览过的网站页面。该信息用于根据访客浏览器类型和/或其他信息来定制我们的网页内容，从而优化用户体验。",
   },
   {
    heading: "Google DoubleClick DART Cookie",
    body: "Google 是我们网站上的第三方供应商之一。它还使用 Cookie（即所谓的 DART Cookie）根据访客对 wordizy.com 和互联网上其他网站的访问情况向其投放广告。不过，访客可通过访问以下网址的 Google 广告与内容网络隐私政策来选择停用 DART Cookie：google.com",
   },
   {
    heading: "我们的广告合作伙伴",
    body: "我们网站上的一些广告主可能使用 Cookie 和网络信标。我们的广告合作伙伴包括：Google AdSense。我们的每个广告合作伙伴就其用户数据政策都有各自的隐私政策。为方便访问，我们已在上文提供其隐私政策的超链接。第三方广告服务器或广告网络使用 Cookie、JavaScript 或网络信标等技术，这些技术用于出现在 wordIzy 上的各自广告和链接中，并直接发送至用户的浏览器。发生这种情况时，他们会自动接收您的 IP 地址。这些技术用于衡量其广告活动的有效性，和/或个性化您在所访问网站上看到的广告内容。\n\n请注意，wordIzy 无法访问或控制第三方广告主使用的这些 Cookie。",
   },
   {
    heading: "第三方隐私政策",
    body: "wordIzy 的隐私政策不适用于其他广告主或网站。因此，我们建议您查阅这些第三方广告服务器各自的隐私政策以获取更详细的信息。其中可能包含其做法以及有关如何停用某些选项的说明。\n\n您可以通过各个浏览器的选项选择停用 Cookie。有关特定网络浏览器中 Cookie 管理的更多详细信息，可在各浏览器的相应网站上找到。",
   },
   {
    heading: "浏览器本地存储",
    body: "为了在无需用户帐户或注册的情况下提供我们的个性化功能，wordIzy 使用浏览器的本地存储（localStorage）来支持 Save Vault 和游戏偏好等功能。这些数据完全存储在您的本地设备上。它们绝不会传输到我们的服务器、与第三方共享或用于在外部网站之间进行跟踪。您可以随时通过清除浏览器缓存或使用工具界面中提供的选项来清除这些数据。",
   },
   {
    heading: "儿童信息",
    body: "我们的另一项优先工作是加强对使用互联网的儿童的保护。我们鼓励父母和监护人观察、参与和/或监督和指导其在线活动。\n\nwordIzy 不会故意收集任何 13 岁以下儿童的可识别个人信息（Personal Identifiable Information）。如果您认为您的孩子在本网站上提供了此类信息，我们强烈建议您立即与我们联系，我们将尽最大努力迅速从我们的记录中删除此类信息。",
   },
   {
    heading: "仅在线隐私政策",
    body: "本《隐私政策》仅适用于我们的在线活动，并对访问本网站的访客就其在 wordIzy 中共享和/或收集的信息有效。本政策不适用于通过本网站以外的渠道或离线收集的任何信息。",
   },
   {
    heading: "同意",
    body: "使用本网站即表示您特此同意本《隐私政策》并接受其《条款与条件》。",
   },
  ],
  thirdPartyServices: [
    {
      name: "Google AdSense",
      description: "向我们网站的访客投放广告。根据您对 wordizy.com 和其他网站的访问情况使用 Cookie（DART Cookie）投放广告。您可以通过访问 Google 广告与内容网络隐私政策来拒绝 DART Cookie。",
      url: "https://policies.google.com/technologies/ads",
    },
  ],
 },
 terms: {
  title: "服务条款",
  intro: "欢迎使用 wordIzy（可通过 wordizy.com 访问）。本《服务条款》（简称\"条款\"）规管您对本网站、文字游戏辅助工具、词典以及互动游戏（如 Anagram Blitz）的访问与使用（统称\"服务\"）。\n\n访问或使用 wordIzy 即表示您同意受本条款及我们的《隐私政策》约束。如您不同意本条款，请勿使用我们的服务。",
  lastUpdated: "最后更新：2026 年 10 月 28 日",
  sections: [
   {
    heading: "1. 服务说明",
    body: "wordIzy 提供免费的在线字谜辅助工具、易位词求解器、词典查询以及基于文字的迷你游戏。所有服务均按\"现状\"及\"可用性\"基础提供，仅供个人、非商业性娱乐及教育用途使用。",
   },
   {
    heading: "2. 许可使用与限制",
    body: "您获得的是有限、非独家、不可转让且可撤销的许可，仅可在严格遵守本条款的前提下访问和使用 wordIzy。\n作为使用条件，您同意不会：\n• 使用任何自动化系统、抓取器、爬虫、机器人或脚本，从我们的数据库中提取数据、文字或单词列表。\n• 干扰或破坏网站服务器的性能、完整性或安全性。\n• 未经我们事先书面授权，对本网站的任何部分进行框架化或镜像。\n• 在那些外部辅助工具被其各自条款明令禁止的竞争性在线环境中，使用我们的文字游戏辅助工具或自动化系统进行作弊。",
   },
   {
    heading: "3. 知识产权",
    body: "wordIzy 上的所有内容、功能、特性、徽标、网站设计、文本和定制游戏软件（包括 Anagram Blitz）均为 wordIzy 的专属财产，受国际版权、商标和知识产权法保护。未经明确书面同意，您不得复制、分发、修改或对我们的财产制作衍生作品。",
   },
   {
    heading: "4. 第三方商标与免责声明",
    body: "对第三方游戏（包括但不限于 Scrabble、Wordle、Words With Friends、Wordfeud 和 Quordle）的引用，仅出于信息和描述目的，用于说明我们工具的兼容性。wordIzy 是独立平台，与 Hasbro、Mattel、The New York Times Company 或其各自的母公司或附属公司无任何附属、认可、授权或赞助关系。",
   },
   {
    heading: "5. 用户数据与本地存储",
    body: "wordIzy 无需用户注册或创建账户。Save Vault 等功能利用您的网络浏览器本地存储（localStorage）将配置状态和单词历史记录保存在您的设备上。对于因清除浏览器缓存、硬件更改或浏览器更新而导致的任何数据丢失，我们不承担任何责任或义务。",
   },
   {
    heading: "6. 责任限制",
    body: "在任何情况下，wordIzy、其开发者或其关联方均不对因使用或无法使用本网站而产生的任何直接、间接、附带、特殊或后果性损害负责，即使已被告知此类损害的可能性。我们不保证单词列表、积分计算或词典辅助配置完全无错或已更新至与游戏实时词典补丁一致。",
   },
   {
    heading: "7. 服务与条款的修改",
    body: "我们保留随时在不另行通知的情况下修改、暂停或终止我们服务任何方面的权利。我们亦保留自行决定修改本条款的权利。您在发布任何更新后继续使用 wordIzy 即视为您接受修订后的条款。",
   },
   {
    heading: "8. 适用法律",
    body: "本条款受国际数字商业惯例管辖并据此解释，不考虑法律冲突原则。",
   },
   {
    heading: "9. 联系信息",
    body: "如对本《服务条款》有任何疑问或澄清需求，请通过我们的官方联系页面与我们联系。",
   },
  ],
 },
 sitemap: { title: "网站地图", body: "WordIzy的全部页面。" },
 footer: { rights: "保留所有权利。", madeWith: "为词语爱好者打造。", links: "快速链接", desc: "9种语言的免费重组与求解工具。无需注册。", disclaimer: "仅供娱乐与文字游戏。与Scrabble或Wordle无关。" },
 faq: {
  title: "使用说明 & 常见问题",
  unscrambler: [
   { q: "什么是单词重组器？如何使用？", a: "重组器接收一组字母——比如Scrabble牌架（如SRAABLC）——并找出字典中所有可用这些字母拼出的有效单词。在「你的字母」框中输入字母，然后点击重组。结果按单词长度分组（最长在前），每个单词显示其Scrabble得分。适合Scrabble、Words With Friends、Wordfeud、填字和易位词谜题。" },
   { q: "通配符(? 和 *)如何工作？", a: "当你有未知字母时，用 ? 或 * 作为通配符 — 它们代表 Scrabble 空白牌、填字游戏的空格、或 Wordle 猜测中尚未确认的字母。输入「QUER?Y」会让 WordIzy 查找所有匹配「QUER」+任一字母+「Y」的单词，直接返回 QUERY。每个通配符计 0 分（符合官方空白牌规则），这样当你牌架上有空白牌时，显示的得分仍然真实可信。你可以同时串联多个通配符——「A??LE」匹配 APPLE、ADDLE、AGILE、AISLE、ABLE——当你的牌架不完整时，通配符是探索易位词可能性的理想工具。为保持结果有用，请将每次查询的通配符数量限制在一两个以内：每多一个通配符候选集合会成倍增加，超过三个时你会开始看到从真实牌面根本拼不出的单词。通配符在 Wordle 求解器、易位词求解器和 Wordfeud 助手中同样适用，因此你可以在站内所有工具间沿用同一套部分字母工作流。" },
   { q: "如何使用高级筛选？", a: "点击「高级筛选」展开三个可选字段。「开头为」将结果限定为以指定字母开头的单词（如「AB」→仅以AB开头的单词）。「结尾为」对后缀做同样限制（如「ED」→仅以ED结尾的单词）。「必须包含」确保某些字母出现在每个结果中（任意位置）。三者可与通配符组合，实现精确控制。" },
   { q: "单词如何计分？", a: "每个单词都使用官方英语 Scrabble 字母分值计分：A=1、B=3、C=3、D=2、E=1、F=4、G=2、H=4、I=1、J=8、K=5、L=1、M=3、N=1、O=1、P=3、Q=10、R=1、S=1、T=1、U=1、V=4、W=4、X=8、Y=4、Z=10。通配符（? *）作为空白牌计 0 分，符合官方规则。WordIzy 会自动计算每个结果的总分，并在每个长度组内按得分排序，让得分最高的玩法出现在每个列表最上方 — 省去你心算字母分值相加的精力，让你一眼就能识别出 bingo 候选词。对其他语言，WordIzy 使用该语言字典的官方 Scrabble 字母分值（法语 ODS9、西班牙语 FISE、意大利语 Zingarelli、葡萄牙语、德语、荷兰语 OpenTaal，以及日语和普通话的精选拼音/罗马字列表）。通过导航栏的语言切换器可查看本地化分值。真实对局得分还取决于加分成格（双倍/三倍字母·单词）以及用完 7 张牌的 +50 bingo 奖励，因此请把显示的得分视为基线，并在规划出牌时心算加上奖励。" },
   { q: "有哪些词典？", a: "WordIzy支持9种语言：英语（NWL2023 + CSW21）、法语（ODS9 2024）、西班牙语（FISE）、意大利语（Zingarelli）、葡萄牙语、德语、荷兰语（OpenTaal），以及日语（罗马字）和普通话（拼音）。所有单词都按各语言的官方Scrabble词典筛选。可在导航栏的语言选择器中切换语言。" },
   { q: "为何结果按长度分组？", a: "按长度分组便于找到你需要的玩法类型。Scrabble中较长的单词通常得分更高，但有时较短的单词更适合棋盘。最长的单词出现在顶部，向下到2字母单词。每组内单词按Scrabble得分排序，便于快速找到最佳玩法。" },
  ],
  scramble: [
   { q: "乱序/求解工具是做什么的？", a: "此工具用于解决易位词谜题——字母被打乱，你需要找出原词。输入乱序字母（如RBOLENW），点击求解即可看到所有可组成的真实单词。适合报纸易位词、单词游戏和乱序挑战。" },
   { q: "与重组器有何不同？", a: "求解工具使用与重组器相同的引擎，但专注于解决乱序词谜题，而非从牌架找出所有可能的单词。你也可使用输入下方的「打乱单词」功能，把单词随机打乱成多个变体——便于自制谜题。" },
   { q: "可以使用通配符吗？", a: "可以。用 ? 或 * 表示未知字母。例如谜题缺一个字母，输入已知字母加一个 ?，WordIzy会用所有有效字母组合填补空缺。" },
   { q: "如何创建自己的乱序单词？", a: "使用主输入下方的「打乱单词」卡片。输入任意单词（如「scrabble」），点击生成——WordIzy会生成该单词的多个随机乱序版本。可用于为朋友出题或练习重组。" },
  ],
  wordle: [
   { q: "Wordle求解器如何工作？", a: "Wordle求解器根据你的游戏反馈缩小今日答案范围。输入你从猜测中收集的信息：绿色字母（位置正确）、黄色字母（在词中但位置错误）和灰色字母（不在词中）。求解器返回所有符合约束的有效单词。" },
   { q: "如何输入已放置（绿）字母？", a: "在「已放置(绿)」字段中，输入你知道位置正确的字母，用 . 或 _ 表示空位。例如你已知单词是A _ _ L E，输入「A..LE」。求解器只返回与此模式完全匹配的单词。" },
   { q: "什么是有效（黄）和已排除（灰）字母？", a: "有效字母（黄）是你知道在词中但不在所猜位置的字母——全部输入到「有效(黄)」字段（如「RST」）。已排除字母（灰）是确认不在词中的字母——输入到「已排除(灰)」（如「BXF」）。求解器会过滤掉任何包含已排除字母的单词。" },
   { q: "应该用多长的单词？", a: "选择今日Wordle的长度（默认5）。WordIzy支持4至8字母单词，因此也适用于Quordle、Octordle等变体以及自定义长度的游戏。" },
   { q: "选择下一个猜测有什么技巧？", a: "从结果中挑选使用尚未测试的常见字母（如R、T、S、L、N）的单词，可最大化信息收益。若列表很长，选择能排除最多可能性的单词。求解器显示每个单词的Scrabble得分——高分往往意味着稀有字母，有助于缩小范围。" },
  ],
  quordle: [
   { q: "什么是Quordle求解器？", a: "Quordle是一款同时解四个Wordle的游戏。此求解器允许你一次输入最多4个棋盘的约束，并返回每个棋盘的候选单词。每个棋盘保留各自的已放置（绿）、有效（黄）和已排除（灰）字母。" },
   { q: "如何使用多个棋盘？", a: "填入每个棋盘已知信息。棋盘1的约束只影响棋盘1的结果。点击「添加棋盘」可加到最多4个棋盘。用X按钮可移除棋盘。准备好后点击求解，即可获取所有棋盘的候选单词。" },
   { q: "应该在棋盘间共享字母吗？", a: "应该——Quordle的关键策略是用一次猜测在多个棋盘上获取信息。如果某字母在棋盘1为绿色，在其他棋盘上很可能也在相同位置。在每个棋盘上输入共享约束，可交叉信息并更快缩小四个答案。" },
   { q: "Quordle有什么策略建议？", a: "以富含常见字母的单词（如CRANE或SLATE）开局，在所有棋盘上获取信息。先聚焦约束最多的棋盘——解出它能释放脑力。在2-3次猜测、有足够信息把每个棋盘缩减到可管理列表后再使用求解器。" },
  ],
  anagram: [
   { q: "什么是易位词？", a: "易位词是通过重新排列另一个词的所有字母所组成的词或短语。例如LISTEN和SILENT是易位词——字母相同，顺序不同。易位词求解器找出所有恰好使用你提供的所有字母的单词。" },
   { q: "与重组器有何不同？", a: "重组器找出可用你的字母组成的「任意长度」的单词（包括较短的）。易位词求解器只找出使用你「全部」字母的单词——即完整长度的易位词。例如用「CHIEN」，易位词求解器返回CHIEN、CHINE、NICHE（都是5字母），而重组器还会返回较短的单词如ICE、IN、HE。" },
   { q: "可以使用通配符吗？", a: "可以。用 ? 或 * 作为通配符填补剩余位置。例如输入「CAT??」可找出所有CAT与任意两个字母组合的5字母易位词。通配符为0分（如同空白牌）。" },
   { q: "易位词有什么用？", a: "易位词用于文字游戏、谜题、密码学和语言学。在Scrabble中，找出牌架的易位词有助于发现bingo（用完所有7个牌得到50分奖励）。它在填字提示、问答和脑筋急转弯中也很流行。" },
  ],
  random: [
   { q: "随机单词生成器是做什么的？", a: "它从所选词典中生成随机真实单词，可选用筛选条件。可指定单词长度、开头字母、结尾字母或必须包含的字母。可用于游戏、创意写作、命名、词汇练习，或生成由真实单词组成的密码。" },
   { q: "如何筛选随机单词？", a: "将「长度」设为具体数字（2-12）或保持「任意」。「开头为」限定以这些字母开头的单词。「结尾为」限定以这些字母结尾的单词。「包含」要求单词在任意位置包含某些字母。「数量」控制生成的单词数（1-200）。" },
   { q: "这些单词是有效的Scrabble单词吗？", a: "是的。所有生成的单词都来自所选语言的官方Scrabble词典（英语为NWL2023/CSW21、法语为ODS9等）。每个单词都可在Scrabble和其他文字游戏中使用。" },
   { q: "可用于文字游戏吗？", a: "当然。可生成随机单词用于Pictionary、你画我猜、词语联想游戏或词汇问答。生成密码时，组合3-4个不同长度的随机单词——能创建既好记又安全的口令短语。" },
  ],
  wordfeud: [
   { q: "什么是Wordfeud助手？", a: "Wordfeud是一款类似Scrabble的热门手机文字游戏。此助手帮你从牌架找出可玩的最佳单词。输入你的7个字母（加上已放置的棋盘字母），WordIzy返回所有可玩单词，按Scrabble得分排序。" },
   { q: "如何输入我的牌架？", a: "在「你的字母」框中输入你的7个字母牌。空白牌用 ? 或 *（可代表任意字母但0分）。如果棋盘上已有字母你想接续，也加上它们——WordIzy会从合并字母池中找出可组成的单词。" },
   { q: "应使用哪个词典？", a: "Wordfeud根据你的地区支持多个词典。英语Wordfeud使用类Scrabble词表，因此英语（NWL2023/CSW21）即可。其他语言请从语言选择器选择对应的（法语ODS9、西班牙语FISE等）。" },
   { q: "得分如何计算？", a: "得分使用所选语言的官方Scrabble字母分值。注意Wordfeud的实际计分可能略有不同（有奖励格和自己的牌分布）。把得分作为识别高价值玩法的指南——牌架上得分最高的单词通常是你最好的选择。" },
  ],
  dictionary: [
   { q: "查词典是做什么的？", a: "输入任意单词可验证它在所选语言的官方Scrabble词典中是否有效。工具显示单词的Scrabble字母牌、有效/无效徽章、Scrabble得分、单词长度、字母牌、词典释义以及（如可用的）同义词。" },
   { q: "释义来自哪里？", a: "释义来自多个来源：Free Dictionary API（英语、法语、西班牙语、德语、意大利语、葡萄牙语）、Wiktionary（所有语言的兜底）和AI助手用于剩余缺口。每个释义旁标注了来源。" },
   { q: "同义词来自哪里？", a: "同义词来自Datamuse（英语、西班牙语、法语、意大利语、葡萄牙语）和OpenThesaurus（德语）。只显示本身是有效Scrabble单词的同义词——点击任意同义词即可立即验证。" },
   { q: "为什么常见单词可能无效？", a: "Scrabble词典很严格——排除专有名词、缩写、带连字符的单词和需要撇号的单词。例如「BRUNCH」有效，但「BRUNCH'S」可能无效。如果某词似乎缺失，可能是大写的专有名词或尚未加入官方列表的新词。切换语言以在不同词典中查证。" },
  ],
  scrabble: [
   { q: "什么是Scrabble复刻？", a: "复刻Scrabble是一种变体，每位玩家收到相同牌架，需找出最佳玩法。用于比赛和训练，在不靠运气的情况下考验技术。此工具帮你从牌架找出最高分单词——输入你的7个字母（可选填棋盘字母），然后点击「找最佳单词」。" },
   { q: "如何输入棋盘字母？", a: "如果棋盘上已有可接续的字母，请在「盘面字母(可选)」字段中连同牌架字母一起输入。WordIzy将合并字母池视为可用字母。这有助于找出接续已有玩法的单词——在实际对局中最大化得分的关键。" },
   { q: "最佳玩法如何排名？", a: "单词按Scrabble得分排序（最高在前）。前10名玩法在顶部高亮列表中显示。注意：实际对局得分还取决于奖励格（字母/单词双倍/三倍）和bingo（用完7个牌得50分奖励）。把工具得分作为基线，再考虑盘面位置。" },
   { q: "什么是bingo？如何找到？", a: "bingo 是 Scrabble 中最大的单回合逆转：一回合打完 7 张牌可获得单词基础分之上 +50 的奖励，于是 30 分的单词会变成 80 分的玩法。要用 WordIzy 寻找 bingo，请输入完整的 7 字母牌架（用 ? 或 * 表示空白牌），查看列表最上方的 7 字母结果组——那里的每个单词都是潜在 bingo。英语 Scrabble 中得分最高的 7 字母 bingo 包括 MUZJIKS（基础 29+50=79 分）、JACUZZI（34+50=84）、SYZYGY（21+50=71）、OXAZOLIDINE（罕见但毁灭性），以及能接常见后缀的词干 ANATOMIZ-、ANTISOCIAL-、OVERLAPPING-。要更快识别 bingo，请学习与 -ER、-ED、-ING、-ATION 组合的高价值词干——SATISFI-、ANTISOY-、OVERLAP-。当你的牌架呈 bingo 形态时，请保留一两个灵活字母（E、R、S、T），因为 bingo 奖励（+50）几乎总是胜过早早扔掉这些牌得到的分数。" },
  ],
  wordlists: [
   { q: "什么是单词表页面？", a: "单词表让你浏览所有2到7字母的有效Scrabble单词。单词按长度分组，再按结尾字母（A-Z）分组，便于系统化探索词典。可用于学习、为对局找词或扩展词汇。" },
   { q: "如何按长度筛选？", a: "使用顶部的长度选择器（2-7）。点击「全部」可查看所有长度叠加（2字母在上，7字母在下），或点击具体数字只看该长度。每个长度部分显示26个容器（每个结尾字母A-Z一个）。" },
   { q: "如何按字母筛选？", a: "使用长度选择器下方的A-Z字母行。点击字母只显示以该字母结尾的单词，或点「全部」显示所有字母。便于找出接续棋盘上特定字母的单词。" },
   { q: "为什么单词以大写显示？", a: "Scrabble字母牌是大写的，因此单词也以大写显示以保持一致。每个单词旁显示其Scrabble分值。每个字母容器内的单词按字母顺序（A-Z）排序，便于浏览。" },
  ],
  wordstarts: [
   { q: "什么是「开头」页面？", a: "此页面让你浏览所有以特定字母「开头」的有效Scrabble单词。选择一个字母（A-Z），WordIzy会显示所有以该字母开头的单词，按长度分组（2-7字母）。适合研究开局并找出从棋盘上开头字母接续的单词。" },
   { q: "如何使用长度和字母选择器？", a: "先从A-Z行选一个字母——设定开头字母。然后用长度行（2-7或全部）按长度筛选。每个长度部分显示所有以所选字母开头的单词，按字母顺序排序。在任一行点「全部」可移除该筛选。" },
   { q: "这对Scrabble有何帮助？", a: "了解每个字母开头的单词有助于规划开局和接续。如果你有Q，了解所有以Q开头的单词（QI、QAT、QUAD…）有助于有效使用它。此页面在填字游戏中也很有用，因为提示常指定「以…开头」。" },
   { q: "为什么按50个单词分页？", a: "有些字母（如S、A、E）有数千个开头单词。为保持页面快速可读，结果按每页50个单词分页，配以上/下一页按钮。每页显示页码和总页数，便于了解当前位置。" },
  ],
  wordends: [
   { q: "什么是「结尾」页面？", a: "此页面让你浏览所有以特定字母「结尾」的有效Scrabble单词。选择一个字母（A-Z），WordIzy会显示所有以该字母结尾的单词，按长度分组（2-7字母）。适合找出接续棋盘上已有字母的单词。" },
   { q: "如何使用长度和字母选择器？", a: "先从A-Z行选一个字母——设定结尾字母。然后用长度行（2-7或全部）按长度筛选。每个长度部分显示所有以所选字母结尾的单词，按字母顺序排序。在任一行点「全部」可移除该筛选。" },
   { q: "这对Scrabble有何帮助？", a: "结尾字母对接续很重要——如果棋盘上有S，了解所有以S结尾的单词可让你复数化或扩展玩法。同样，了解以D、ED、ING结尾的单词有助于借助常见后缀。此页面是竞技对局的强力学习工具。" },
   { q: "为什么按50个单词分页？", a: "有些字母（如E、S、D）有数千个结尾单词。为保持页面快速可读，结果按每页50个单词分页，配以上/下一页按钮。每页显示页码和总页数，便于了解当前位置。" },
  ],
  vault: [
   { q: "什么是保存库？", a: "保存库是面向竞技 Scrabble 与 Wordle 玩家的内建词汇训练工具 — 一个专门为间隔重复学习难记字母组合而设计的个人单词书签列表。与通用浏览器书签不同，保存库会显示每个已存单词的 Scrabble 得分，并允许你将整份列表直接复制到闪卡应用或 Anki 卡组进行离线训练。以下是竞技玩家使用的 4 步工作流：(1) 运行一次搜索，如「用 QUARTZE 能拼出的 7 字母单词」或「以 Q 开头的单词」，给那些你总是忘记的高价值单词加星 — QAT、QOPH、FAQIR、MUZJIKS。(2) 从右上角页眉的星形图标打开库抽屉；你保存的单词被整理在同一个列表里，每条旁边显示实时得分。(3) 点击「全部复制」将列表粘贴到 Anki、Quizlet 或可打印的闪卡模板，离开屏幕进行间隔重复复习。(4) 下周再次运行同样的搜索，对比哪些单词你已经记住 — 你的已保存列表会持久存储在浏览器的 localStorage 中，因此从不离开你的设备、无需账户，页面加载后即可离线使用。" },
   { q: "如何将单词保存到库中？", a: "点击结果中任意单词旁边的星形图标（☆）。保存单词时星形变为琥珀色（★）。再次点击可从库中删除该单词。" },
   { q: "如何查看我保存的单词？", a: "点击网站页眉（右上角）中的星形图标。右侧滑出抽屉显示所有已保存的单词。您可以复制单个单词、复制整个列表或清空库。" },
   { q: "我的库会在设备间同步吗？", a: "不会 — 库存储在浏览器的localStorage中，因此是按设备的。如果您清除浏览器数据或使用其他设备，您的库不会被转移。无需账户，数据不会离开您的设备。" },
  ],
 },
 blitz: {
  loadingEngine: "正在加载谜题引擎...",
  completed: "已完成",
  todaysPuzzleSolved: "📅 今日谜题已解决！",
  alreadyPlayed: "您已经使用了今日的挑战机会！请明天午夜再来挑战全新的谜题。",
  playInfinite: "播放无限练习模式",
  challengeTitle: "⚡ 字谜闪击挑战",
  challengeDesc: "在60秒内从我们的Scrabble词典中解开单词。",
  startToday: "开始今日谜题",
  playInfiniteBtn: "无限练习",
  timesUp: "⏱️ 时间到！游戏结束",
  finalScore: "最终得分：",
  points: "分。",
  playAgain: "🔄 再玩一次",
  dailyLocked: "您的每日挑战已锁定。明天见！",
  returnMenu: "返回菜单",
  timeLeft: "秒",
  totalScore: "分",
  generating: "🎲 正在生成单词...",
  wrong: "❌ 回答错误！再试一次。",
  hint: "💡 提示：",
  waiting: "等待中...",
  typeWord: "输入单词...",
  skipReveal: "🏳️ 跳过并显示",
  stopGame: "🛑 停止",
  play: "▶ 播放",
  correct: "✨ 完美！回答正确！",
  answerWas: "答案是：",
  challengeFriend: "挑战好友",
  challengeText: "我在 WordIzy 字谜闪击中得了 {score} 分 — 能超越我吗？免费游玩: https://wordizy.com/blitz",
  // SEO内容部分（游戏卡片下方）
  pageHeading: "玩 Anagram Blitz — 免费60秒单词游戏",
  howToPlayTitle: "如何玩字谜闪击",
  howToPlayDesc: "字谜闪击是一款快节奏的60秒字谜重排游戏。你会收到一组打乱的字母，必须重新排列以组成一个有效的词典单词。每个正确答案获得20分；每次跳过扣5分。刷新你的高分纪录，登上每日排行榜。",
  gameModesTitle: "游戏模式",
  dailyModeName: "每日挑战",
  dailyModeDesc: "每天一个谜题。玩一次并锁定你的排行榜分数。",
  infiniteModeName: "无限练习",
  infiniteModeDesc: "无限谜题。每个正确答案为时钟增加10秒奖励时间。",
  tipsTitle: "提示和策略",
  tip1: "拼音遵循严格的音节结构：每个音节通常是「声母+韵母」（如 MA、NI、HAO）— 理解音节结构是关键。",
  tip2: "拼音中最常见的字母是 A、I、N、H、O — 优先测试包含这些字母的词。",
  tip3: "卷舌声母 ZH、CH、SH 是拼音特有的 — 如果看到 H 黄色，考虑这些组合（如 ZHONG、SHENG）。",
  tip4: "韵尾 -N（an、en、in）和 -NG（ang、eng、ing、ong）非常常见 — 如果倒数第二位有 N，测试最后一位是 N 还是 G。",
  blitzFooter: "字谜闪击使用官方拼字游戏词典（英语为NWL2023 + CSW21，中文拼音词典）并提供9种语言的多语言支持。免费游玩，无需注册。",
 },
 ui: {
  advertisement: "广告",
  featuredGuide: "精选指南",
  saveVaultFaqTitle: "保存库 — 如何使用",
  relatedTools: "相关工具",
  published: "发布日期：",
  backToHome: "返回首页",
  somethingWrong: "出错了",
  tryAgain: "重试",
  reloadPage: "重新加载页面",
  returnLabel: "返回",
  allCopied: "所有单词已复制！",
  showLess: "收起",
  showMore: "展开更多",
  enterPassword: "输入密码",
  totalSearches: "搜索总数",
  topQuery: "热门搜索",
  topTool: "热门工具",
  topLanguage: "热门语言",
  newDailyChallenge: "每日新挑战",
  scrambleFeatureHint: "使用下方的打乱单词功能创建您自己的谜题。",
  wordList: "单词列表",
  copiedToClipboard: "已复制到剪贴板！",
 },
 hubPages: {
  startsSubtitle: "浏览以字母表中每个字母开头的所有有效 Scrabble 单词，长度从 2 到 15 个字母。",
  endsSubtitle: "浏览以字母表中每个字母结尾的所有有效 Scrabble 单词，长度从 2 到 15 个字母。",
  lengthSubtitle: "按长度浏览所有有效的 Scrabble 单词，长度从 2 到 15 个字母。每个长度都有独立的专属页面。",
  wordleStartsSubtitle: "浏览以字母表中每个字母开头的所有有效 Wordle 单词。非常适合寻找最佳起始单词并缩小每日谜题范围。",
  wordleEndsSubtitle: "浏览以字母表中每个字母结尾的所有有效 Wordle 单词。非常适合寻找接续、后缀并缩小每日谜题范围。",
  startsHeading: "以…开头的单词 — A 到 Z",
  endsHeading: "以…结尾的单词 — A 到 Z",
  lengthHeading: "按单词长度解谜（2–15 个字母）",
  wordleStartsHeading: "以…开头的 Wordle 单词 — A 到 Z",
  wordleEndsHeading: "以…结尾的 Wordle 单词 — A 到 Z",
  clickLetterStarts: "点击字母即可在专属页面浏览以该字母开头的所有单词。",
  clickLetterEnds: "点击字母即可在专属页面浏览以该字母结尾的所有单词。",
  clickLength: "点击数字即可在专属页面浏览该长度的所有单词。",
  clickLetterWordleStarts: "点击字母即可在专属页面浏览以该字母开头的所有 Wordle 单词。",
  clickLetterWordleEnds: "点击字母即可在专属页面浏览以该字母结尾的所有 Wordle 单词。",
  wordleStartsBadge: "Wordle 开头",
  wordleEndsBadge: "Wordle 结尾",
  wordleStartsTitle: "以 A-Z 开头的 Wordle 单词",
  wordleEndsTitle: "以 A-Z 结尾的 Wordle 单词",
  returnHome: "返回首页",
  footerNote: "所有单词均通过官方 Scrabble 词典筛选。",
  searchPlaceholderStarts: "输入 A-Z 中的字母以浏览以该字母开头的单词…",
  searchPlaceholderEnds: "输入 A-Z 中的字母以浏览以该字母结尾的单词…",
  searchPlaceholderLength: "输入 2-15 之间的数字以按长度浏览…",
  searchPlaceholderWordleStarts: "输入 A-Z 中的字母以浏览以该字母开头的 Wordle 单词…",
  searchPlaceholderWordleEnds: "输入 A-Z 中的字母以浏览以该字母结尾的 Wordle 单词…",
  browseBtn: "浏览",
 },
 wordListPage: {
  loading: "正在加载已验证的单词列表…",
  filterPlaceholder: "筛选单词…",
  filterLabel: "筛选单词",
  clearFilter: "清除筛选",
  loadMore: "加载更多",
  remaining: "剩余",
  allLengths: "全部",
  filterByLength: "按单词长度筛选",
  noMatch: "没有单词符合您的筛选条件。",
  noWords: "未找到单词。",
  wordsCount: "个单词",
  error: "加载单词失败，请刷新。",
 },
};

export const translations: Record<LanguageCode, Translation> = {
 en, fr, es, de, it, pt, nl, ja, zh,
};
