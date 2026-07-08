# wordIzy

Free word unscrambler & anagram solver with 9-language official Scrabble dictionaries. 12 tools, no sign-up, no tracking. Built with Next.js 16, Prisma, and Tailwind CSS.

## Features

### 12 Word Tools
- **Word Unscrambler** — Enter scrambled letters, find every valid word
- **Scramble Solver** — Solve scrambled word puzzles
- **Anagram Solver** — Find all anagrams from any letters
- **Wordle Solver** — Enter green/yellow/grey clues, get possible answers
- **Quordle Solver** — Solve 4 Wordles simultaneously
- **Scrabble Duplicate** — Find the highest-scoring plays from your rack
- **Dictionary Checker** — Verify if a word is valid, see its Scrabble score and definition
- **Random Word Generator** — Generate random words by length and count
- **Wordfeud Helper** — Find the best Wordfeud words from your tiles
- **Word Lists** — Browse all 2–7 letter words by length and letter
- **Word Starts By** — Browse words starting with a specific letter
- **Word Ends By** — Browse words ending with a specific letter

### Official Scrabble Dictionaries
- **English**: NWL2023 + CSW21 (Collins)
- **French**: ODS9 (2024)
- **Spanish**: FISE
- **Italian**: Zingarelli
- **Dutch**: OpenTaal
- **German & Portuguese**: Curated Scrabble-filtered lists

### 9 Languages
English, French, Spanish, German, Italian, Portuguese, Dutch, Japanese (romaji), and Mandarin Chinese (pinyin). The entire interface — including FAQ, About, and Privacy pages — is fully translated.

### Smart Features
- Copy any word list to clipboard with one click
- Recent searches saved locally for quick re-running
- Loading skeletons for smooth perceived performance
- Progressive Web App (installable on phone/desktop)
- Light / Dark / System theme toggle
- Per-route SEO metadata with JSON-LD structured data
- Cookie consent banner (GDPR compliant)
- Rate limiting on contact form (5/hour/IP)
- Anonymous search analytics (no PII)
- Owner inbox for contact form submissions
- Analytics dashboard with popular searches and content gaps

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui (New York) |
| Database | Prisma ORM + SQLite (dev) / Turso (production) |
| Fonts | Inter (UI), Bree Serif (words), Roboto Slab 700 (brand) |
| Icons | Lucide React |
| State | React hooks + Context API |
| Routing | Hash-based client-side router (single `/` route) |

## Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh/)
- A Turso account (free) for production database — [sign up here](https://turso.tech)

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR-USERNAME/wordizy.git
cd wordizy

# Install dependencies
bun install

# Create .env file (see Configuration below)
# Create a file called .env in the project root

# Generate Prisma client
bunx prisma generate

# Push database schema (creates tables)
bun run db:push

# Start dev server
bun run dev
```

Open http://localhost:3000 in your browser.

### Configuration

Create a `.env` file in the project root:

```env
# Database (local dev)
DATABASE_URL="file:./db/custom.db"

# Admin password for #/inbox and #/dashboard
ADMIN_PASSWORD="your-strong-password-here"

# Turso (production) — uncomment after creating Turso DB
#TURSO_DATABASE_URL="libsql://wordizy-xxx.turso.io"
#TURSO_AUTH_TOKEN="your-turso-token"

# Google AdSense (optional)
#NEXT_PUBLIC_ADSENSE_CLIENT="ca-pub-XXXXXXXXXXXXXXXX"

# Email notifications (optional, uses Resend)
#RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxx"
#NOTIFY_EMAIL="info.wordizy@proton.me"
```

> **The `.env` file is in `.gitignore` and will never be pushed to GitHub.**

## Deployment (Vercel)

### 1. Create a Turso database

```bash
turso auth login
turso db create wordizy
turso db show wordizy --url        # copy this
turso db tokens create wordizy     # copy this
turso db shell wordizy < schema.sql
```

### 2. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 3. Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repo
3. Add environment variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `file:./db/custom.db` |
| `ADMIN_PASSWORD` | your strong password |
| `TURSO_DATABASE_URL` | `libsql://wordizy-xxx.turso.io` |
| `TURSO_AUTH_TOKEN` | your Turso token |

4. Click **Deploy**

### 4. Verify

- [ ] Home page loads
- [ ] Search works (type "SRAABLC", click Unscramble)
- [ ] Language selector works
- [ ] Contact form works
- [ ] Inbox at `yoursite.com/#/inbox` works
- [ ] Dashboard at `yoursite.com/#/dashboard` works
- [ ] Theme toggle works
- [ ] `yoursite.com/robots.txt` accessible
- [ ] `yoursite.com/sitemap.xml` accessible
- [ ] `yoursite.com/manifest.json` accessible

## Project Structure

```
wordizy/
├── prisma/
│   └── schema.prisma          # Database schema (ContactMessage, SearchEvent)
├── public/
│   ├── robots.txt             # Crawler rules
│   ├── sitemap.xml            # Sitemap
│   ├── manifest.json          # PWA manifest
│   ├── og-image.svg           # Social preview image
│   └── logo.svg               # Favicon
├── data/scrabble/             # Official Scrabble dictionary files
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (fonts, JSON-LD, AdSense, cookies)
│   │   ├── page.tsx           # Single-page app with hash router
│   │   ├── globals.css        # Theme variables, typography, glass utilities
│   │   └── api/               # API routes
│   │       ├── contact/       # Contact form + inbox (POST/GET/PATCH/DELETE)
│   │       ├── analytics/     # Search analytics (POST/GET)
│   │       ├── warmup/        # Pre-warm dictionary cache
│   │       ├── unscramble/    # Word unscrambling
│   │       ├── wordlists/     # Word list browsing
│   │       ├── length-counts/ # Word counts per length
│   │       └── ...            # Other tool APIs
│   ├── components/
│   │   ├── site/              # Shared components (header, footer, cards, etc.)
│   │   ├── tools/             # Tool components (unscrambler, wordle, etc.)
│   │   └── i18n/              # Translations + language provider
│   └── lib/                   # Dictionary service, unscramble logic, analytics
├── schema.sql                 # SQL schema for Turso setup
├── .env                       # Environment variables (NOT committed)
└── .gitignore                 # Includes .env*
```

## Owner Pages

| Page | URL | Purpose |
|------|-----|---------|
| Inbox | `/#/inbox` | Read/delete contact form submissions |
| Dashboard | `/#/dashboard` | View search analytics (top queries, tools, languages) |

Both are password-gated with `ADMIN_PASSWORD`.

## Privacy

- No accounts, no tracking, no fingerprinting
- Anonymous search analytics only (query string, tool, language, result count — no IP, no user ID)
- Cookie consent banner on first visit
- Contact form submissions stored in database, never shared with third parties
- GDPR and CCPA compliant

## License

This project is for personal use. The official Scrabble dictionary files are proprietary and not redistributable.

## Contact

- Email: info.wordizy@proton.me
- Use the contact form at `/#/contact`

---

For entertainment & word games. Not affiliated with Scrabble or Wordle.
