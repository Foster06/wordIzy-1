-- WordIzy database schema for Turso (SQLite-compatible)
-- Run this with: turso db shell wordizy < schema.sql
-- Or use: bun run db:push (with TURSO_DATABASE_URL and TURSO_AUTH_TOKEN set)

-- Legacy table (unused, kept from template)
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- Legacy table (unused, kept from template)
CREATE TABLE IF NOT EXISTS "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- Contact form submissions — stored when users submit the contact form.
-- Read by the owner via the #/inbox page (auth-gated by ADMIN_PASSWORD).
CREATE TABLE IF NOT EXISTS "ContactMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'en',
    "handled" BOOLEAN NOT NULL DEFAULT false,
    "ip" TEXT,
    "userAgent" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Anonymous search analytics — NO personal data.
-- Stores query string, tool, language, and result count only.
-- Read by the owner via the #/dashboard page (auth-gated).
CREATE TABLE IF NOT EXISTS "SearchEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "query" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "lang" TEXT NOT NULL DEFAULT 'en',
    "resultCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
CREATE INDEX IF NOT EXISTS "ContactMessage_handled_idx" ON "ContactMessage"("handled");
CREATE INDEX IF NOT EXISTS "ContactMessage_createdAt_idx" ON "ContactMessage"("createdAt");
CREATE INDEX IF NOT EXISTS "SearchEvent_route_idx" ON "SearchEvent"("route");
CREATE INDEX IF NOT EXISTS "SearchEvent_lang_idx" ON "SearchEvent"("lang");
CREATE INDEX IF NOT EXISTS "SearchEvent_createdAt_idx" ON "SearchEvent"("createdAt");
CREATE INDEX IF NOT EXISTS "SearchEvent_query_idx" ON "SearchEvent"("query");
