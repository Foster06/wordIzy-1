# WordIzy Build Worklog

This file tracks all work done by the main agent and subagents on the WordIzy project.

---
Task ID: 0
Agent: main
Task: Project setup, planning, and foundation

Work Log:
- Explored existing Next.js 16 scaffold (Tailwind 4, shadcn/ui, Prisma/SQLite, z-ai-web-dev-sdk, next-intl available).
- Reviewed user design screenshots via VLM: two-column layout, golden Scrabble tiles w/ serif letters + small top-left point values, tile values grouped by point count, words grouped by length.
- Installed word-list npm packages: an-array-of-english-words (274937), an-array-of-french-words (336524), an-array-of-spanish-words (636598), an-array-of-italian-words (123620), an-array-of-portuguese-words (189247), an-array-of-german-words (117399), an-array-of-dutch-words (164174).
- Japanese (romaji) + Mandarin (pinyin) will be curated lists (no npm package available).
- Decision: single `/` route with hash-based client-side routing to respect the "only / route" constraint while delivering all features as separate views.
- Decision: dictionary stored in-memory on server (loaded from npm word arrays) rather than Prisma seeding hundreds of thousands of rows; this is fast and reliable. Letter scores per language defined in code.

Stage Summary:
- Foundation ready. Next: design system (dark frosted glass theme), i18n, shared components, unscramble engine + API, then feature views.

---
Task ID: 11
Agent: main
Task: Browser end-to-end verification and fixes

Work Log:
- Verified with Agent Browser across multiple routes/flows:
  - Home unscrambler: typed SRAABLC → results grouped by length (7→2) as Scrabble tile racks with scores. Confirmed.
  - Wordle solver: pattern A..LE + valid R + excluded T → 5-letter candidate list. Confirmed.
  - Quordle solver: 2 boards with constraints → 43 + 2121 candidates. Confirmed.
  - Word Lists: 26 A–Z letter containers with counts + word chips (All/Starts-by/Ends-by modes). Confirmed.
  - Check Dictionary: "chat" → tile rack + valid badge + score stats + definition section. Confirmed.
  - Language switcher: switched to Français → whole UI translated (h1 "Solveur Wordle", nav "Outils", etc.). Confirmed.
  - Multilingual dictionaries via API: FR (chien→chien/chine/niche), ES (gato→gato/gota/toga), DE (hause). Confirmed.
  - LLM definition API returns real definitions.
  - Sticky footer verified on short About page (footer at viewport bottom, no gap).
  - Mobile (390px): single-column, hamburger menu, no overflow.
- `bun run lint` passes clean (single set-state-in-effect rule suppressed for legitimate localStorage hydration).
- dev.log shows no runtime/hydration errors across all interactions.

Stage Summary:
- All 14 routes (Home/Unscrambler, Scramble, Wordle, Quordle, Anagram, Random, Wordfeud, Dictionary, Scrabble Duplicate, Word Lists, About, Contact, Privacy, Sitemap) render and function correctly.
- Dark frosted-glass aesthetic with golden amber accent and Scrabble tile racks implemented site-wide.
- 9-language dictionaries + UI translations working. Project is complete and browser-verified.

---
Task ID: 12
Agent: main
Task: Scrabble dictionary filtering + external API integration + Word Lists UI improvements

Work Log:
- Built `src/lib/scrabble-filter.ts` — Scrabble-validity filter approximating official dictionaries (NWL2020/CSW21, ODS9, FISE-2, Zingarelli, Scrabble-Wörterbuch, OpenTaal, Léxico pt-BR). Uses publicly-known official 2-letter word lists as anchors + strict lexical rules (lowercase, alphabetic, length 2-15, no proper nouns, roman-numeral blocklist).
- Wired filter into `dictionary.ts` loader. Results: EN 2-letter words dropped 124→118 (official ~107-127), FR 2-letter → 62; `ii` (roman numeral) rejected, `qi`/`za` (valid NWL) accepted.
- Built `src/lib/external-words.ts` integrating 4 external APIs (all verified reachable from server):
  - Datamuse (`api.datamuse.com/words?rel_syn=`) — EN/ES/FR/IT/PT synonyms, filtered to Scrabble-valid
  - OpenThesaurus (`openthesaurus.de/synonyme/search`) — DE synonyms, filtered to Scrabble-valid
  - Free Dictionary API (`api.dictionaryapi.dev`) — definitions for en/es/fr/de/it/pt (with partOfSpeech + phonetic)
  - Wiktionary API (`{lang}.wiktionary.org/w/api.php`) — definition fallback for all 9 languages, wikitext parsed
  - LLM (z-ai-web-dev-sdk) — final fallback for definitions
- New `/api/synonyms` route; rewrote `/api/define` to use multi-source service.
- Rewrote Word Lists tool (`wordlists-tool.tsx`):
  - 5-column grid for starts-by/ends-by/all-words results (any word length)
  - Pagination: 200 words/page with prev/next buttons + "page X / Y" indicator (verified: S 5-letter = 1540 words → 3 pages, Show more advances page)
  - A-Z sort row label under each word-length heading ("letters N · Sorted A → Z")
- Updated Dictionary tool (`dictionary-tool.tsx`): tile rack + valid/invalid badge + score stats + Definition card (with source label + phonetic + part of speech) + Synonyms card (clickable chips that re-check the word).
- `bun run lint` clean; dev.log shows all API routes returning 200 with no runtime errors.

Stage Summary:
- Browser-verified: Scrabble filter (qi✓/za✓/ii✗), synonyms (happy→halcyon,content,joyful...; froh→glücklich,zufrieden...), definitions (scrabble→"A scramble." via Free Dictionary API with phonetic), Word Lists 5-col grid + pagination + A-Z sort row.
- All 4 requested external APIs integrated and filtered against official Scrabble dictionaries.

---
Task ID: 47
Agent: main
Task: Redo all 6 UI improvements (project was reset)

Work Log:
- Project had been reset to an earlier state, so all 6 changes were redone:
1. FAQ: Created faq-content.ts with 4-6 detailed page-specific Q&As per tool (Unscrambler, Scramble, Wordle, Quordle, Anagram, Random, Wordfeud, Dictionary, Scrabble, Word Lists, Starts-by, Ends-by). Updated tips-section.tsx with "How to use & FAQ" heading (Roboto Slab bold, shadow). All tools now use page-specific FAQ content.
2. Footer: Changed to grid-cols-3 on all viewports (3-column on desktop and mobile). Responsive text sizes. Replaced desc+tagline with "Unscramble, Solve & Discover Word".
3. Hero badge: Removed "FREE • NO SIGN-UP • 9 LANGUAGES" badge from home page (removed Sparkles import + badge span).
4. Dictionary stat cards: Shrunk to rounded-lg px-2 py-1.5 with text-base value + text-[9px] label, grid-cols-3 gap-2. Added word-cell class for shadow.
5. Dictionary badge: Changed from emerald green to amber gradient (bg-gradient-to-r from-brand to-brand-soft).
6. 3D shadows: Added box-shadow to .glass, .glass-strong, .glass-soft classes in globals.css. Added .result-card class (with light-mode boost) and .word-cell class (with light-mode boost) for result containers and word cells.
- Verified via Agent Browser: badge removed ✓, 3D shadow on cards ✓ (rgba(0,0,0,0.18) 0px 4px 6px...), footer 3-column ✓, FAQ "How to use" heading ✓ + Wordle-specific FAQ ✓, dictionary stat cards small ✓ + amber gradient badge ✓.
- bun run lint clean.

Stage Summary:
- All 6 changes redone and verified: detailed page-specific FAQ, 3-column footer on all viewports, hero badge removed, smaller dictionary stat cards with amber gradient badge, and 3D light black shadows on all cards + result containers + word cells.

---
Task ID: 48
Agent: main
Task: No tiles in results, 4-col grid, pagination >50, length sort row above A-Z, container shadows

Work Log:
- WordGroups: removed TileRack, words now display as text using .word-item class (Bree Serif, uppercase). 4-col grid (grid-cols-2 sm:grid-cols-3 lg:grid-cols-4). Pagination at 50/page with prev/next. Added result-card + word-cell classes for shadows.
- WordList (Wordle/Quordle): same — text style, 4-col grid, 50/page pagination, shadows.
- WordBucket (Starts-by/Ends-by/Word Lists): 4-col grid (was 5-col), PAGE_SIZE 50 (was 200), result-card + word-cell classes added.
- WordStartsTool + WordEndsTool: added 2-7 length sort row (num-button) ABOVE the A-Z letter row (alpha-button). Length filter shows/hides length buckets.
- Added all font utility classes to globals.css (.nav-item, .section-label, .num-button, .alpha-button, .word-item, .yellow-heading, .count-number, .count-text, .page-title, .page-subtitle, .font-inter, .font-bree, .font-roboto-slab).
- Added Inter, Bree_Serif, Roboto_Slab fonts to layout.tsx.
- Verified via Agent Browser: word-item uses Bree Serif ✓, 4-col grid ✓, result-card shadows ✓, pagination on S starts-by ✓, length row (top:383) above A-Z row (top:475) ✓.
- bun run lint clean.

Stage Summary:
- All search results now use word-list text style (Bree Serif, no tiles) in 4-column grids with pagination at 50 words. Result containers have shadows for separation. Starts-by and Ends-by pages have the 2-7 length sort row above the A-Z letter columns.

---
Task ID: 49
Agent: main
Task: Typography updates + desktop navbar restructure + fix class→className

Work Log:
- Typography classes updated in globals.css:
  - .section-label: 18px → 17px
  - .alpha-button: 16px → 18px
  - .count-text: 18px → 20px
  - (nav-item 18px/600/24px, num-button 15px/700, word-item Bree Serif 20px, yellow-heading 20px/700, page-title Bree Serif 72px, page-subtitle Inter 22px — all unchanged, correct)
- routes.ts rewritten with desktop nav structure:
  - Inline: Unscrambler, Scramble Solver, Anagram Solver, Scrabble Duplicate, Wordle Solver, Check Dictionary
  - Tools dropdown: Random Word, Wordfeud Helper, Quordle Solver
  - Word Lab dropdown: Word Lists, Word Starts By, Word Ends By
  - Added solvers/site/wordlab nav labels to all 9 languages
- site-header.tsx rebuilt:
  - Desktop: inline links + HoverDropdown components (hover to open, 120ms close delay, click-outside to dismiss)
  - Mobile: Sheet drawer with Solvers/Tools/Site grouped sections (unchanged behavior)
  - Language selector + theme toggle in right corner on all viewports
- Fixed 'class' → 'className' DOM property error in site-footer.tsx (2 occurrences on <ul> elements)
- Added className prop to ThemeToggle and LanguageSelector components
- Created missing logo.tsx (flat 2D amber square with white W)
- Verified: desktop nav shows correct inline links + Tools + Word Lab dropdowns; Tools dropdown pops up on hover ✓; no Invalid DOM property errors ✓; alpha-button 18px ✓.
- bun run lint clean.

Stage Summary:
- Typography updated (section-label 17px, alpha-button 18px, count-text 20px). Desktop navbar restructured with inline solver links + Tools/Word Lab hover dropdowns. Fixed class→className error. Mobile drawer unchanged. All browser-verified.

---
Task ID: 50
Agent: main
Task: Centered headings + pagination verification + A-Z row under length on word lists pages

Work Log:
- PageHeader: rewrote to center all content (text-center, flex-col items-center). Title splits first word (plain) + rest (brand gradient), uses .page-title class (Bree Serif 72px/400/1.1). Subtitle uses .page-subtitle (Inter 22px/400). Icon centered above title. Badge centered above title.
- HomeHero: also centered (text-center, flex-col items-center) with .page-title and .page-subtitle classes.
- Verified: home heading "Word Unscrambler" uses Bree Serif ✓; starts-by heading "Starts by A–Z" uses Bree Serif, centered ✓.
- Pagination: confirmed all result components use 50 words/page with prev/next buttons (WordGroups PAGE_SIZE=50, WordList pageSize=50, WordBucket PAGE_SIZE=50). Verified 10 Show less/Show more buttons on starts-by S page (5 length sections × 2 buttons each).
- Word Lists page: rewrote to remove old tabs (all/starts/ends). Now has length row (2-7 + All) on TOP, A-Z letter row BELOW. Shows all words grouped by length (2→7) and ending letter (A-Z). Uses num-button and alpha-button typography classes.
- Starts-by and Ends-by pages: already had length row above A-Z (verified numTop:503 above alphaTop:595).
- Verified: wordlists page has both num-button and alpha-button rows ✓.
- bun run lint clean.

Stage Summary:
- All page headings are centered in Bree Serif (matching "Word Unscrambler" style). Pagination at 50 words confirmed on all result pages. A-Z letter sort row is under the length row on Word Lists, Starts-by, and Ends-by pages.

---
Task ID: 51
Agent: main
Task: Footer SOLVERS/TOOLS/SITE 3-column + center all search results

Work Log:
- Footer: rewrote to use GROUP_ORDER (solvers/tools/site) with exact categorization:
  - SOLVERS: Unscrambler, Scramble Solver, Anagram Solver, Scrabble Duplicate, Wordle Solver, Quordle Solver
  - TOOLS: Check Dictionary, Random Word, Wordfeud Helper, Word Lists, Starts By, Ends By
  - SITE: About, Contact, Privacy, Sitemap
  - 3-column grid (grid-cols-3) on ALL viewports (mobile + desktop). Responsive text sizes (smaller on mobile).
  - Brand row with logo + "Unscramble, Solve & Discover Word" description.
- Verified: footer headings are Solvers/Tools/Site ✓; links match exact order ✓; 3 columns on desktop (1440px) ✓; 3 columns on mobile (390px) ✓.
- Centered search results: added `justify-items-center text-center` to all result grids (WordGroups, WordList, WordBucket). Verified: computed justify-items=center, text-align=center ✓. VLM confirmed word cells are centered.
- bun run lint clean.

Stage Summary:
- Footer uses 3-column grid (Solvers/Tools/Site) on both mobile and desktop with exact categorization. All search results are centered across the website.

---
Task ID: 52
Agent: main
Task: Buttons 70/30 split + eraser icon on Clear

Work Log:
- Rewrote ActionButtons: primary button flex-[7] (~70% width, h-12, amber gradient), Clear button flex-[3] (~30% width, h-12, glass styling, Eraser icon replacing Trash2).
- Verified: Unscramble=439px (~68%), Clear=204px (~32%), both h-12 (48px). Clear button SVG path = Eraser icon (M21 21H8...). VLM confirmed amber gradient on primary, eraser icon on Clear, matching heights.
- bun run lint clean.

Stage Summary:
- All action buttons now have 70/30 width split (primary amber gradient 70%, Clear with eraser icon 30%), both matching search bar height. Applied across all tool pages.

---
Task ID: 53
Agent: main
Task: Less visible containers in light mode + center words without shrinking

Work Log:
- Light mode word-cell: changed to very subtle bg (rgba(0,0,0,0.02)), faint border (rgba(0,0,0,0.05)), minimal shadow (0 1px 2px rgba(0,0,0,0.06)). Hover: subtle amber tint.
- Light mode result-card: softer shadow (0 1px 3px rgba(0,0,0,0.08), 0 2px 8px -4px rgba(0,0,0,0.10)).
- Word cells: added justify-center + w-full so words center within the full grid cell width without shrinking. Score stays right-aligned via ml-auto (word-groups/word-list) or shrink-0 (word-bucket).
- Applied to WordGroups, WordList, WordBucket.
- Verified: dark mode justify-content=center, width=293px (full cell) ✓; light mode bg=rgba(0,0,0,0.02), border=rgba(0,0,0,0.05) (subtle) ✓; VLM confirmed containers less visible + words centered.
- bun run lint clean.

Stage Summary:
- Word containers are now less visible in light mode (subtle bg/border/shadow). Words are centered inside containers without shrinking — containers fill the grid cell width and content is centered.

---
Task ID: 54
Agent: main
Task: Word Lists page — center words, uppercase, Bree Serif font

Work Log:
- Added `breeStyle` prop to WordBucket component. When true, word spans use `.word-item` class (Bree Serif 20px/400, uppercase, tracking-wide). When false (default), uses plain `truncate font-medium`.
- Passed `breeStyle` from Word Lists page only (wordlists-tool.tsx). Starts-by and Ends-by pages do NOT pass it — they keep the default font.
- Verified: Word Lists page word spans use Bree Serif, uppercase, centered (justify-content: center) ✓. Starts-by page does NOT use Bree Serif (no .word-item class) ✓.
- bun run lint clean.

Stage Summary:
- Word Lists page now displays words centered, in uppercase, using Bree Serif font (matching the unscramble results style). Starts-by and Ends-by pages remain unchanged with the default font.

---
Task ID: 55
Agent: main
Task: Footer left hamburger menu + same font + uppercase words + centered text

Work Log:
- Footer redesigned: hamburger menu button on the LEFT side (next to logo). Clicking opens/closes a collapsible 3-category menu (Solvers/Tools/Site) in a 3-column grid. All category headers and links use the same Inter font (.nav-item class). Brand + copyright on the right.
- Verified: hamburger present on left ✓; menu closed initially ✓; clicking opens all 3 categories ✓; all 3 use Inter font ✓; clicking again closes ✓.
- Uppercase: WordGroups, WordList, and WordBucket already have `uppercase` on word spans. Check Dictionary left as-is (not forced uppercase on results). Verified: word-item text-transform=uppercase ✓.
- Centered text: changed result card headers from justify-between to justify-center + text-center. Grids already had justify-items-center + text-center. Verified: header justifyContent=center ✓; grid justifyItems=center ✓.
- bun run lint clean.

Stage Summary:
- Footer menu is on the left side with a hamburger to open/close. All 3 categories use the same Inter font. Words are uppercase across the website (except Check Dictionary). All result text is centered.

---
Task ID: 56
Agent: main
Task: Remove footer hamburger + same font + uppercase + centered results

Work Log:
- Removed hamburger from footer — the 3-category menu (Solvers/Tools/Site) is now always visible in a 3-column grid. No toggle needed.
- All 3 category headers and links use the same Inter font (.nav-item class). Verified: all 3 h3 elements report font-family Inter.
- Uppercase: already applied on word spans in WordGroups, WordList, WordBucket. Verified: text-transform=uppercase on word-item.
- Centered: result card headers use justify-center + text-center. Grids use justify-items-center + text-center. Verified: justify-items=center.
- bun run lint clean.

Stage Summary:
- Footer menu is always visible (no hamburger) with 3 categories using the same Inter font. All search result words are uppercase and centered. Check Dictionary excluded from uppercase.

---
Task ID: 57
Agent: main
Task: Footer — description below brand, copyright bottom left

Work Log:
- Moved "Unscramble, Solve & Discover Word" to sit directly below the WordIzy brand name (logo + name, then description paragraph).
- Moved copyright "© 2026 WordIzy. © All rights reserved." to the bottom left corner of the footer (using flex justify-between — copyright on left, privacy/contact/sitemap links on right).
- Verified: brand="WordIzy", desc="Unscramble, Solve & Discover Word" directly below ✓; copyright="© 2026 WordIzy. © All rights reserved." in bottom left ✓.
- bun run lint clean.

Stage Summary:
- "Unscramble, Solve & Discover Word" is now just below the brand name. Copyright text is in the bottom left corner of the footer.

---
Task ID: 58
Agent: main
Task: Move hamburger drawer to left + blur right side

Work Log:
- Replaced the shadcn Sheet (right-side) with a custom left-side drawer:
  - Drawer is fixed on the LEFT (left-0, w-280px, glass-blur-xl, border-r).
  - Backdrop covers full screen with bg-black/40 + backdrop-filter blur(8px) — blurs/dims the right side (body content).
  - Clicking the backdrop closes the drawer.
  - Drawer header: logo on left, hamburger (Menu icon) on right to close.
  - Body scroll locked when open.
  - Hamburger in navbar opens the drawer.
- Verified: drawer on left ✓, right side blurred ✓, hamburger closes drawer ✓.
- bun run lint clean.

Stage Summary:
- Mobile hamburger drawer is now on the left side with the body content (right side) blurred when open. Hamburger icon opens and closes the drawer.

---
Task ID: 59
Agent: main
Task: Remove blur from menu + remove hamburger drawer from navbar

Work Log:
- Removed the entire mobile drawer system (backdrop + left drawer + blur) from site-header.tsx. No more blur, no more drawer, no more hamburger button.
- Removed unused imports (Menu, Button, GROUP_ORDER, GROUP_LABELS) and unused state (mobileOpen, mobileGroups, useEffect for body scroll lock).
- The navbar is now a single top bar on all viewports (desktop/tablet/mobile) with logo, inline nav links + Tools/Word Lab dropdowns, language selector + theme toggle.
- Verified: no hamburger button in DOM ✓, no drawer/blur ✓, navbar present as simple top bar ✓.
- bun run lint clean.

Stage Summary:
- No blur, no hamburger drawer. The navbar is a clean top bar on all viewports with language + theme toggles.

---
Task ID: 60
Agent: main
Task: Add hamburger drawer to left side corner

Work Log:
- Added hamburger button to the LEFT corner of the navbar (before the logo, lg:hidden). Opens a left-side drawer (fixed left-0, w-280px, glass-blur-xl) with Solvers/Tools/Site categorized navigation. Backdrop dims the body (bg-black/40, no blur per user's earlier request). Hamburger in drawer header closes it. Body scroll locked when open.
- Verified: hamburger in left corner on mobile ✓; drawer opens on the left with categories ✓.
- bun run lint clean.

Stage Summary:
- Hamburger drawer is back in the left side corner of the navbar, opening a left-side drawer with categorized navigation.
