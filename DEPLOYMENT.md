# WordIzy Deployment Guide

## Prerequisites

### 1. Environment Variables

Create a `.env` file (or set these in your hosting platform's dashboard):

```env
# Database (see "Database" section below)
DATABASE_URL="your-production-database-url"

# Admin password for the inbox (#/inbox) and dashboard (#/dashboard)
# CHANGE THIS to a strong, unique password!
ADMIN_PASSWORD="your-strong-password-here"

# Google AdSense (optional — leave as XXXXXXXX to show placeholders)
NEXT_PUBLIC_ADSENSE_CLIENT="ca-pub-XXXXXXXXXXXXXXXX"

# Email notifications for contact form (optional — uses Resend)
# Get a free API key at https://resend.com
RESEND_API_KEY=""
NOTIFY_EMAIL="dorciusforteson@gmail.com"
```

### 2. Database

The development database is SQLite (`file:./db/custom.db`). For production, you have two options:

#### Option A: Turso (hosted SQLite — easiest, keeps schema unchanged)
1. Create a free account at https://turso.tech
2. Create a database and get the connection URL
3. Set `DATABASE_URL="libsql://your-db.turso.io"`
4. Add `TURSO_AUTH_TOKEN` to your env and update `src/lib/db.ts` to use the Turso client

#### Option B: PostgreSQL (recommended for scale)
1. Provision a PostgreSQL database (Supabase, Neon, Railway, etc.)
2. Set `DATABASE_URL="postgresql://user:pass@host:port/dbname"`
3. Update `prisma/schema.prisma` — change the provider:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
4. Run `npx prisma db push` to create tables
5. Run `npx prisma generate` to regenerate the client

### 3. Build Verification

Before deploying, verify the production build:

```bash
bun run build
```

This catches type errors and other issues that dev mode skips.

## Deployment Platforms

### Vercel (recommended)
1. Push your code to GitHub
2. Import the repo at https://vercel.com/new
3. Set all environment variables in the Vercel dashboard
4. Deploy — Vercel auto-detects Next.js

### Netlify
1. Push to GitHub
2. New site from Git → select repo
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Set environment variables

### Self-hosted (Docker)
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Post-Deployment Checklist

- [ ] Verify the site loads at your domain
- [ ] Test the contact form — submit a message, check the inbox at `#/inbox`
- [ ] Change `ADMIN_PASSWORD` from the default
- [ ] Test all 9 languages via the language selector
- [ ] Verify AdSense ads appear (if configured) or placeholders show
- [ ] Check that `robots.txt` is accessible at `/robots.txt`
- [ ] Check that `sitemap.xml` is accessible at `/sitemap.xml`
- [ ] Check that `manifest.json` is accessible at `/manifest.json`
- [ ] Test on mobile (iOS Safari + Android Chrome)
- [ ] Verify cookie consent banner appears on first visit
- [ ] Check the analytics dashboard at `#/dashboard`

## Known Limitations

- **Hash-based routing** — Search engines see only one URL. The per-route meta tags update client-side via JavaScript. If SEO is critical, consider migrating to Next.js App Router pages.
- **German/Portuguese dictionaries** — Use filtered npm packages, not official Scrabble lists. Some words may differ from tournament play.
- **Inbox/Dashboard auth** — Shared password gate, not real authentication. Don't use for sensitive data without upgrading to NextAuth.js.
- **Rate limiting** — In-memory, per-instance. In a multi-instance deployment, each instance has its own counter. Use Upstash Redis for global rate limiting.
- **Analytics** — Stored in the same database. For high-traffic sites, consider a dedicated analytics service.
