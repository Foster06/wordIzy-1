# wordIzy

> Free word unscrambler & anagram solver with 9-language official Scrabble dictionaries. 12 tools, no sign-up, no tracking. Built with Next.js 16, Prisma, and Tailwind CSS.

A privacy-first word puzzle platform built for word game enthusiasts, students, and language lovers worldwide. Whether you're stuck on a Wordle puzzle, looking for the best Scrabble play, or exploring a new language, wordIzy gives you the answers without friction, sign-ups, or paywalls.

---

## Table of Contents

- [Features](#features)
  - [12 Word Tools](#12-word-tools)
  - [Official Scrabble Dictionaries](#official-scrabble-dictionaries)
  - [9 Languages](#9-languages)
  - [Smart Features](#smart-features)
  - [Privacy & Security](#privacy--security)
  - [Performance](#performance)
  - [Accessibility](#accessibility)
  - [SEO](#seo)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
- [Database](#database)
  - [Local SQLite (Development)](#local-sqlite-development)
  - [Turso (Production)](#turso-production)
  - [Database Schema](#database-schema)
- [Deployment](#deployment-vercel)
  - [Step 1: Create Turso Database](#step-1-create-turso-database)
  - [Step 2: Push to GitHub](#step-2-push-to-github)
  - [Step 3: Deploy on Vercel](#step-3-deploy-on-vercel)
  - [Step 4: Post-Deployment Verification](#step-4-post-deployment-verification)
  - [Step 5: Optional — Add AdSense](#step-5-optional--add-adsense)
  - [Step 6: Optional — Email Notifications](#step-6-optional--email-notifications)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Owner Pages](#owner-pages)
- [Internationalization](#internationalization)
- [Theming](#theming)
- [Scripts](#scripts)
- [Known Limitations](#known-limitations)
- [License](#license)
- [Contact](#contact)

---

## Features

### 12 Word Tools

| Tool | Description |
|------|-------------|
| **Word Unscrambler** | Enter scrambled letters (e.g., `SRAABLC`), find every valid dictionary word. Supports wildcards (`?` and `*`), advanced filters (starts with, ends with, must include), and groups results by length with Scrabble scores. |
| **Scramble Solver** | Solve scrambled word puzzles. Enter any jumble of letters and get all valid words that can be formed. |
| **Anagram Solver** | Find all anagrams from any set of letters. Perfect for anagram puzzles and word games. |
| **Wordle Solver** | Enter your green/yellow/grey clues (placed letters, valid letters, excluded letters) and get every possible Wordle answer. Supports 5–7 letter words. |
| **Quordle Solver** | Solve 4 Wordles simultaneously. Add multiple boards with independent clue sets and find words that match all boards. |
| **Scrabble Duplicate** | Duplicate Scrabble gives every player the same rack. Enter your 7 letters (plus any board letters already placed) and find the highest-scoring plays, ranked by score. |
| **Dictionary Checker** | Verify whether a word exists in the official Scrabble dictionary, see its Scrabble point value, and read a definition (pulled from Free Dictionary API and Wiktionary). |
| **Random Word Generator** | Generate random valid words by length (2–7 letters) and count. Great for games, naming, and vocabulary practice. |
| **Wordfeud Helper** | Find the best Wordfeud words from your tiles. Supports wildcards and all 9 language dictionaries. |
| **Word Lists** | Browse every 2–7 letter word. Filter by length and starting/ending letter. Alphabetical, paginated, with live word counts on each length button. |
| **Word Starts By** | Browse all words that start with a specific letter, filtered by length (2–7). Per-length word counts shown on number buttons. |
| **Word Ends By** | Browse all words that end with a specific letter, filtered by length (2–7). Per-length word counts shown on number buttons. |

### Official Scrabble Dictionaries

wordIzy uses authoritative tournament word lists as the primary source — the same words accepted in official Scrabble competition play:

| Language | Dictionary | Word Count |
|----------|-----------|------------|
| English | NWL2023 + CSW21 (Collins) | ~475,000 |
| French | ODS9 (2024) | ~412,000 |
| Spanish | FISE | ~637,000 |
| Italian | Zingarelli | ~662,000 |
| Dutch | OpenTaal | ~414,000 |
| German | Curated Scrabble-filtered list | ~105,000 |
| Portuguese | Curated Scrabble-filtered list | ~179,000 |
| Japanese | Romaji word list (curated) | ~700 |
| Mandarin | Pinyin word list (curated) | ~1,800 |

> **Total**: 3.4+ million words across 9 languages, loaded server-side and cached in memory.

The German and Portuguese official Scrabble lists are proprietary and not freely redistributable. For these languages, wordIzy uses curated lists filtered from comprehensive dictionaries using Scrabble-validity rules (including the official 2-letter word lists for each language, proper noun filtering, length validation, and blocklist of non-Scrabble forms).

### 9 Languages

The entire interface is fully translated into 9 languages:

| Code | Language | Native Name |
|------|----------|-------------|
| `en` | English | English |
| `fr` | French | Français |
| `es` | Spanish | Español |
| `de` | German | Deutsch |
| `it` | Italian | Italiano |
| `pt` | Portuguese | Português |
| `nl` | Dutch | Nederlands |
| `ja` | Japanese | 日本語 (Romaji) |
| `zh` | Chinese | 中文 (Pinyin) |

This includes navigation labels, tool pages, FAQ/tips sections, About page (8 sections), Privacy Policy (8 sections + third-party services), footer, cookie consent banner, and contact form — all 1,845 lines of translations.

Switch languages at any time using the selector in the navigation bar. The selection persists in `localStorage` and the entire interface, FAQ tips, and underlying dictionary change instantly.

### Smart Features

- **Copy to clipboard** — One-click "Copy all" button on every result card copies the full word list (uppercase, newline-separated) to your clipboard with a "Copied!" confirmation
- **Recent searches** — Your last 10 searches are saved locally (in `localStorage`) and appear as clickable chips below the search input for quick re-running
- **Loading skeletons** — Shimmer-animated skeleton placeholders match the result grid layout for a smooth perceived loading experience (instead of a plain spinner)
- **Progressive Web App** — Installable on phone or desktop via `manifest.json`. Full-screen, app-like experience with the wordIzy icon on your home screen
- **Word counts on buttons** — The number buttons (2–7) on Word Lists, Word Starts By, and Word Ends By pages show live word counts per length, fetched from `/api/length-counts`
- **Dictionary pre-warming** — On app load, a fire-and-forget request to `/api/warmup` pre-loads all 9 dictionaries into server memory so the first real search is fast
- **Error boundaries** — Every tool is wrapped in a React error boundary so a crash in one tool doesn't break the whole page

### Privacy & Security

- **No accounts** — Nothing to sign up for, no login, no profile
- **No cross-site tracking** — No fingerprinting, no tracking pixels, no cross-site cookies
- **Anonymous search analytics** — Only the query string, tool used, language, and result count are recorded. No IP address, no user ID, no browser fingerprint
- **Cookie consent banner** — Appears on first visit with Accept/Decline buttons. Choice stored in `localStorage`
- **Contact form rate limiting** — Maximum 5 submissions per hour per IP address (in-memory, per-instance)
- **Contact form data** — Name, email, and message stored in the database. Only accessible to the site owner via the password-gated inbox. Never shared with third parties
- **GDPR & CCPA compliant** — Right to access, rectify, and erase personal data. No data sold or shared

### Performance

- **In-memory dictionary caching** — Dictionaries are loaded once and cached in a `Map` on the server. Subsequent searches are instant
- **Per-length indexing** — Words are indexed by length (`byLength: Map<number, WordEntry[]>`) for O(1) length-based lookups
- **Dictionary pre-warming** — All 9 dictionaries pre-loaded on server startup via `/api/warmup`
- **Skeleton loading states** — Animated placeholders instead of spinners for better perceived performance
- **Lazy loading** — Dictionaries load lazily on first use, then cached for all subsequent requests

### Accessibility

- **Semantic HTML** — Uses `<main>`, `<header>`, `<nav>`, `<footer>`, `<section>`, `<article>`
- **ARIA labels** — All icon buttons have descriptive `aria-label`s
- **`aria-current="page"`** — Active navigation items are marked for screen readers
- **Keyboard navigation** — All interactive elements are keyboard accessible
- **Focus visible** — Focus rings on all focusable elements
- **Screen reader friendly** — `sr-only` class for screen reader-only content

### SEO

- **Per-route metadata** — Each of the 18 routes has a unique `<title>` and `<meta description>` that update on navigation
- **JSON-LD structured data** — `WebApplication` schema in `<head>` with feature list, supported languages, and pricing
- **Open Graph + Twitter cards** — `og:image` (1200×630 SVG), `og:title`, `og:description`, Twitter `summary_large_image` card
- **`robots.txt`** — Allows all crawlers, blocks `/api/` and private pages
- **`sitemap.xml`** — Lists the home page and all site pages with priority and changefreq
- **`manifest.json`** — PWA manifest with app name, theme color, icons, and display mode

---

## Tech Stack

| Layer | Technology | Details |
|-------|-----------|---------|
| Framework | Next.js 16 | App Router, Turbopack, server-side rendering |
| Language | TypeScript 5 | Strict typing throughout |
| Styling | Tailwind CSS 4 | Custom theme variables, glass morphism utilities |
| UI Components | shadcn/ui (New York) | Radix UI primitives, Lucide icons |
| Database ORM | Prisma 6 | Schema-first, type-safe queries |
| Database (dev) | SQLite | Local file at `db/custom.db` |
| Database (prod) | Turso | Hosted SQLite via `@prisma/adapter-libsql` |
| Fonts | Google Fonts | Inter (UI), Bree Serif (words), Roboto Slab 700 (brand) |
| Icons | Lucide React | Consistent icon set throughout |
| State | React hooks + Context | `LanguageProvider`, `ThemeProvider` |
| Routing | Hash-based client router | Single `/` route, 18 hash routes |
| Analytics | Custom (Prisma) | Anonymous search event tracking |
| Notifications | Sonner | Toast notifications |
| Deployment | Vercel | Auto-deploy from GitHub |

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh/)
- A [Turso](https://turso.tech) account (free tier) — for production database
- A [Vercel](https://vercel.com) account — for deployment
- A [GitHub](https://github.com) account — for code hosting

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR-USERNAME/wordizy.git
cd wordizy

# Install dependencies
bun install

# Create .env file (see Environment Configuration below)
touch .env
# Then edit .env with your values

# Generate Prisma client
bunx prisma generate

# Push database schema (creates tables in local SQLite)
bun run db:push

# Start the development server
bun run dev
```

Open http://localhost:3000 in your browser.

### Environment Configuration

Create a `.env` file in the project root. **This file is in `.gitignore` and will never be pushed to GitHub.**

```env
# ─── DATABASE (required) ──────────────────────────────────────
# Local development: SQLite file in the project folder
DATABASE_URL="file:./db/custom.db"

# Production (Vercel): Turso hosted SQLite
# Create a free database at https://turso.tech
#TURSO_DATABASE_URL="libsql://wordizy-xxx.turso.io"
#TURSO_AUTH_TOKEN="your-turso-auth-token"

# ─── ADMIN PASSWORD (required — change this!) ────────────────
# Password for the owner-only inbox (#/inbox) and dashboard (#/dashboard)
ADMIN_PASSWORD="your-strong-password-here"

# ─── GOOGLE ADSENSE (optional) ───────────────────────────────
# Your AdSense publisher ID. Leave commented to show placeholder ad slots.
#NEXT_PUBLIC_ADSENSE_CLIENT="ca-pub-XXXXXXXXXXXXXXXX"

# ─── EMAIL NOTIFICATIONS (optional) ──────────────────────────
# Send an email notification when the contact form is submitted.
# Uses Resend (https://resend.com) — free tier: 100 emails/day.
#RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxx"
#NOTIFY_EMAIL="info.wordizy@proton.me"
```

---

## Database

### Local SQLite (Development)

For local development, wordIzy uses a SQLite file at `db/custom.db`. This requires no setup beyond running `bun run db:push` after creating your `.env` file.

### Turso (Production)

Vercel's filesystem is ephemeral — local SQLite files get wiped on every deploy. For production, use [Turso](https://turso.tech) (hosted SQLite). The `db.ts` file automatically detects Turso when `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` are set, and falls back to local SQLite when they're not.

### Database Schema

The database has 4 tables (2 active, 2 legacy from template):

| Table | Purpose | Active? |
|-------|---------|---------|
| `ContactMessage` | Contact form submissions (name, email, message, locale, handled, IP, userAgent) | ✅ Yes |
| `SearchEvent` | Anonymous search analytics (query, route, lang, resultCount) | ✅ Yes |
| `User` | Legacy template table | ❌ No |
| `Post` | Legacy template table | ❌ No |

**Indexes**: `ContactMessage` is indexed on `handled` and `createdAt`. `SearchEvent` is indexed on `route`, `lang`, `createdAt`, and `query`.

---

## Deployment (Vercel)

### Step 1: Create Turso Database

```bash
# Install Turso CLI (if you don't have it)
curl -sSfL https://get.tur.so/install.sh | bash

# Log in (opens browser)
turso auth login

# Create database
turso db create wordizy

# Get the connection URL (copy this)
turso db show wordizy --url
# → libsql://wordizy-xxx.turso.io

# Get the auth token (copy this)
turso db tokens create wordizy
# → eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...

# Create all tables in Turso
turso db shell wordizy < schema.sql
```

Alternatively, you can push the schema using Prisma:
```bash
# Set Turso env vars in .env first, then:
TURSO_DATABASE_URL="libsql://wordizy-xxx.turso.io" \
TURSO_AUTH_TOKEN="your-token" \
bun run db:push
```

### Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "wordIzy — ready for deployment"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/wordizy.git
git push -u origin main
```

The `.env` file will NOT be pushed (it's in `.gitignore`).

### Step 3: Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your `wordizy` repo
4. In the **Environment Variables** section, add:

| Name | Value | Required? |
|------|-------|-----------|
| `DATABASE_URL` | `file:./db/custom.db` | ✅ Yes |
| `ADMIN_PASSWORD` | Your strong password | ✅ Yes |
| `TURSO_DATABASE_URL` | `libsql://wordizy-xxx.turso.io` | ✅ Yes (for Vercel) |
| `TURSO_AUTH_TOKEN` | Your Turso auth token | ✅ Yes (for Vercel) |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | `ca-pub-XXXXXXXXXXXXXXXX` | ❌ Optional |
| `RESEND_API_KEY` | `re_xxxxxxxxxxxx` | ❌ Optional |
| `NOTIFY_EMAIL` | `info.wordizy@proton.me` | ❌ Optional |

5. Click **Deploy**
6. Wait 2–3 minutes for the build to complete

### Step 4: Post-Deployment Verification

Visit your deployed Vercel URL and verify:

- [ ] Home page loads
- [ ] Search works (type `SRAABLC`, click Unscramble)
- [ ] Copy button works on result cards
- [ ] Recent searches appear after clearing input
- [ ] Language selector works (switch to French, then back)
- [ ] Theme toggle works (Light → Dark → System)
- [ ] Contact form works (submit a test message)
- [ ] Inbox at `yoursite.com/#/inbox` works (enter your `ADMIN_PASSWORD`)
- [ ] Dashboard at `yoursite.com/#/dashboard` works
- [ ] About page renders (8 sections)
- [ ] Privacy page renders (8 sections + third-party services with clickable links)
- [ ] Sitemap page renders (stylish cards with icons)
- [ ] Cookie consent banner appears on first visit
- [ ] `yoursite.com/robots.txt` is accessible
- [ ] `yoursite.com/sitemap.xml` is accessible
- [ ] `yoursite.com/manifest.json` is accessible
- [ ] PWA installable on mobile (Add to Home Screen)

### Step 5: Optional — Add AdSense

1. Get your Google AdSense publisher ID (format: `ca-pub-XXXXXXXXXXXXXXXX`)
2. Add it to Vercel: Settings → Environment Variables → `NEXT_PUBLIC_ADSENSE_CLIENT`
3. Redeploy

### Step 6: Optional — Email Notifications

1. Create a free account at [Resend](https://resend.com)
2. Get your API key (format: `re_xxxxxxxxxxxx`)
3. Add to Vercel: `RESEND_API_KEY` and `NOTIFY_EMAIL`
4. Redeploy

---

## Project Structure

```
wordizy/
├── prisma/
│   └── schema.prisma              # Prisma schema (ContactMessage, SearchEvent, User, Post)
├── public/
│   ├── robots.txt                 # Crawler rules (allows all, blocks /api/)
│   ├── sitemap.xml                # XML sitemap
│   ├── manifest.json              # PWA manifest (name, icons, theme color)
│   ├── og-image.svg               # 1200×630 social preview image
│   └── logo.svg                   # Favicon (amber square with white W)
├── data/
│   └── scrabble/                  # Official Scrabble dictionary files
│       ├── NWL2023.txt            # English (North American)
│       ├── CSW21.txt              # English (Collins, international)
│       ├── ODS9.txt               # French
│       ├── FISE.txt               # Spanish
│       ├── ZINGA.txt              # Italian (Zingarelli)
│       ├── OpenTaal.txt           # Dutch
│       ├── DE_FILTERED.txt        # German (curated, Scrabble-filtered)
│       └── PT_FILTERED.txt        # Portuguese (curated, Scrabble-filtered)
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout (fonts, JSON-LD, AdSense, cookies, web vitals)
│   │   ├── page.tsx               # Single-page app with hash router + ErrorBoundary
│   │   ├── globals.css            # Theme variables, typography, glass utilities, skeletons
│   │   └── api/                   # 16 API route handlers
│   │       ├── contact/           # Contact form (POST) + inbox (GET/PATCH/DELETE)
│   │       ├── analytics/         # Search analytics (POST + GET summary)
│   │       ├── warmup/            # Pre-warm all 9 dictionaries on server startup
│   │       ├── unscramble/        # Word unscrambling with filters
│   │       ├── anagram/           # Anagram solving
│   │       ├── scramble/          # Scramble solving
│   │       ├── wordle/            # Wordle solver
│   │       ├── quordle/           # Quordle solver
│   │       ├── check/             # Dictionary word checker
│   │       ├── define/            # Word definitions (Free Dictionary API + Wiktionary)
│   │       ├── synonyms/          # Synonyms (Datamuse + OpenThesaurus)
│   │       ├── random/            # Random word generator
│   │       ├── wordlists/         # Word list browsing (by length + letter)
│   │       ├── length-counts/     # Word counts per length (for number buttons)
│   │       ├── letter-counts/     # Letter availability counts
│   │       └── dict-info/         # Dictionary metadata (size, language)
│   ├── components/
│   │   ├── site/                  # 30+ shared components
│   │   │   ├── site-header.tsx    # Sticky navbar (mobile drawer + desktop inline + dropdowns)
│   │   │   ├── site-footer.tsx    # 3-column footer + copyright + disclaimer
│   │   │   ├── language-selector.tsx  # Dropdown with 9 languages (2-letter codes)
│   │   │   ├── theme-toggle.tsx   # Light → Dark → System cycle button
│   │   │   ├── routes.ts          # Route registry (18 routes, hidden flag)
│   │   │   ├── use-hash-route.ts  # SSR-safe hash-based router hook
│   │   │   ├── word-groups.tsx    # Results grouped by length + copy + pagination
│   │   │   ├── word-list.tsx      # Flat word list + copy + pagination
│   │   │   ├── word-bucket.tsx    # Word bucket for Lists/Starts/Ends
│   │   │   ├── tips-section.tsx   # FAQ accordion (hydrated after mount)
│   │   │   ├── cookie-consent.tsx # GDPR cookie banner
│   │   │   ├── error-boundary.tsx # React error boundary with fallback UI
│   │   │   ├── route-seo.tsx      # Per-route title + description updates
│   │   │   ├── web-vitals.tsx     # LCP/CLS/FID tracking (production only)
│   │   │   ├── dictionary-warmer.tsx  # Fires /api/warmup on app load
│   │   │   ├── result-skeleton.tsx # Shimmer loading placeholder
│   │   │   └── ...                # Glass card, page header, ad slot, logo, etc.
│   │   ├── tools/                 # Tool-specific components
│   │   │   ├── unscrambler-tool.tsx   # Main unscrambler with advanced filters
│   │   │   ├── scrabble-tool.tsx      # Scrabble Duplicate with top plays
│   │   │   ├── letters-solver.tsx     # Shared solver (anagram, scramble, wordfeud)
│   │   │   ├── wordle-tool.tsx        # Wordle solver
│   │   │   ├── quordle-tool.tsx       # Quordle multi-board solver
│   │   │   ├── dictionary-tool.tsx    # Dictionary checker + definitions
│   │   │   ├── random-tool.tsx        # Random word generator
│   │   │   ├── wordlists-tool.tsx     # Word Lists browser
│   │   │   ├── word-starts-tool.tsx   # Word Starts By browser
│   │   │   ├── word-ends-tool.tsx     # Word Ends By browser
│   │   │   ├── info-views.tsx         # About, Contact, Privacy, Sitemap views
│   │   │   ├── inbox-view.tsx         # Owner inbox (password-gated)
│   │   │   └── dashboard-view.tsx     # Analytics dashboard (password-gated)
│   │   └── i18n/
│   │       ├── translations.ts    # All 9 languages (1,845 lines)
│   │       └── language-provider.tsx  # Context provider + localStorage persistence
│   └── lib/
│       ├── db.ts                  # Prisma client (auto-detects Turso vs local SQLite)
│       ├── dictionary.ts          # Dictionary loading + caching + per-length indexing
│       ├── unscramble.ts          # Word unscrambling algorithm
│       ├── languages.ts           # Language metadata + Scrabble tile values
│       ├── scrabble-filter.ts     # Scrabble-validity filtering (2-letter word lists)
│       ├── analytics.ts           # Fire-and-forget search tracking
│       ├── seo.ts                 # Per-route SEO metadata
│       └── utils.ts               # cn() class merge utility
├── schema.sql                     # SQL schema for Turso setup
├── .env                           # Environment variables (NOT committed)
├── .gitignore                     # Includes .env*
├── next.config.ts                 # Next.js config (standalone output)
├── package.json                   # Dependencies + scripts
└── README.md                      # This file
```

---

## API Reference

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/unscramble?letters=SRAABLC&lang=en` | Unscramble letters, returns words grouped by length |
| `GET` | `/api/anagram?letters=LISTEN&lang=en` | Find all anagrams |
| `GET` | `/api/scramble?letters=SRAABLC&lang=en` | Solve scramble |
| `GET` | `/api/wordle?length=5&placed=___l&valid=aeiou&excluded=bcdfg&lang=en` | Wordle solver |
| `GET` | `/api/quordle?...` | Quordle solver (multi-board) |
| `GET` | `/api/check?word=HELLO&lang=en` | Check if word is valid |
| `GET` | `/api/define?word=hello&lang=en` | Get word definition |
| `GET` | `/api/synonyms?word=happy&lang=en` | Get synonyms |
| `GET` | `/api/random?length=5&count=10&lang=en` | Generate random words |
| `GET` | `/api/wordlists?lang=en&mode=all&length=5&letter=A&offset=0&limit=200` | Browse word lists |
| `GET` | `/api/length-counts?lang=en&mode=all` | Word counts per length (2–7) |
| `GET` | `/api/letter-counts?lang=en&mode=starts` | Letter availability counts |
| `GET` | `/api/dict-info?lang=en` | Dictionary metadata (size) |
| `GET` | `/api/warmup` | Pre-warm all 9 dictionaries |
| `POST` | `/api/contact` | Submit contact form (rate-limited: 5/hour/IP) |
| `POST` | `/api/analytics` | Record anonymous search event |

### Auth-Gated Endpoints (require `?key=ADMIN_PASSWORD`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/contact?key=PASSWORD` | List all contact form submissions |
| `PATCH` | `/api/contact?key=PASSWORD` | Mark message as read/unread |
| `DELETE` | `/api/contact?key=PASSWORD&id=ID` | Delete a message |
| `GET` | `/api/analytics?key=PASSWORD&days=7` | Analytics summary (top queries, routes, languages) |

---

## Owner Pages

| Page | URL | Auth | Description |
|------|-----|------|-------------|
| Inbox | `/#/inbox` | `ADMIN_PASSWORD` | Read, mark as read/unread, and delete contact form submissions |
| Dashboard | `/#/dashboard` | `ADMIN_PASSWORD` | View search analytics: total searches, top queries (bar chart), top tools, top languages, zero-result searches (content gaps), time range selector (24h/7d/30d) |

Both pages are hidden from navigation and the footer. They use `sessionStorage` for session-based auth (cleared when the browser closes).

---

## Internationalization

All UI text is driven by `src/components/i18n/translations.ts` (1,845 lines). The `LanguageProvider` context loads the saved language from `localStorage` on mount and falls back to English.

To add a new language:
1. Add the language code to `LanguageCode` in `src/lib/languages.ts`
2. Add the language definition (flag, native name, letter values, tile counts) to the `LANGUAGES` object
3. Add the full translation block to `translations.ts`
4. Add the language to the `LANGUAGE_LIST` export

---

## Theming

wordIzy supports three themes via [next-themes](https://github.com/pacocoursey/next-themes):

| Theme | Icon | Description |
|-------|------|-------------|
| Dark | Moon | Dark background (`#0d0d0f`), light text |
| Light | Sun | Cream background (`#f7f4ec`), dark text |
| System | Monitor | Follows the OS preference |

The toggle button cycles: Dark → System → Light → Dark. The choice persists in `localStorage`.

Theme variables are defined in `globals.css` as CSS custom properties (`:root` for light, `.dark` for dark) and consumed by Tailwind via `@theme inline`.

---

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server (port 3000) |
| `bun run build` | Production build |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run db:push` | Push Prisma schema to database |
| `bun run db:generate` | Generate Prisma client |
| `bun run db:migrate` | Create a database migration |
| `bun run db:reset` | Reset database (delete all data) |

---

## Known Limitations

- **Hash-based routing** — Search engines see only one URL. Per-route meta tags update client-side via JavaScript. If SEO is critical, consider migrating to App Router pages with real URLs.
- **German & Portuguese dictionaries** — Use curated filtered lists, not official Scrabble lists (which are proprietary). Some words may differ from tournament play.
- **Inbox & Dashboard auth** — Shared password gate, not real authentication. Don't use for sensitive data without upgrading to NextAuth.js.
- **Rate limiting** — In-memory, per-instance. In a multi-instance deployment, each instance has its own counter. Use Upstash Redis for global rate limiting.
- **Analytics storage** — Stored in the same SQLite/Turso database. For high-traffic sites, consider a dedicated analytics service.

---

## License

This project is for personal use. The official Scrabble dictionary files in `data/scrabble/` are proprietary and not freely redistributable.

---

## Contact

- **Email**: [info.wordizy@proton.me](mailto:info.wordizy@proton.me)
- **Contact form**: Visit `/#/contact` on the site

---

*For entertainment & word games. Not affiliated with Scrabble or Wordle.*
