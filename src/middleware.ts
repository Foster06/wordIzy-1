// src/middleware.ts
// Internationalized routing + language preference negotiation.
//
// PUBLIC URL SCHEME
//   /                     → English homepage (canonical)
//   /wordle               → English tool pages (canonical)
//   /de, /de/wordle, …    → localized subpaths (8 languages) — rewritten to the
//                           internal static route /i18n/{lang}/{tool}
//   /de/scrabble-words[/word] → localized Scrabble-words section (6 dictionary
//                           languages only) — rewritten to
//                           /i18n/{lang}/scrabble-words[/{word}]
//   /de/<non-localized>   → 308 to the English canonical (word lists, guides;
//                           ja/zh scrabble-words — no Scrabble dictionary)
//
// LANGUAGE PREFERENCE (first visit, no wordizy-lang cookie)
//   Accept-Language header ONLY — the user's own browser preference. We do NOT
//   use the Vercel edge geo header (x-vercel-ip-country) and we do NOT redirect
//   based on the visitor's IP/location. Google explicitly warns against IP-based
//   redirects because Googlebot crawls from US IPs and would be trapped on the
//   English version; Accept-Language is the privacy-friendly, Google-approved
//   alternative (every localized URL stays separately crawlable in sitemap.xml,
//   and hreflang clusters connect them).
//   - Accept-Language matches an offered language → 307 to /{lang}/…
//   - Accept-Language is English (or absent, or an un-offered language like
//     da/no/sv/pl/ru) → stay on the English canonical. Googlebot (US IP,
//     Accept-Language: en) always lands here.
//   An explicit earlier choice (wordizy-lang cookie, incl. "en") always wins.
//   Applies to / and the 19 localized tool pages, as a temporary 307 redirect
//   so it never poisons caches. The scrabble-words section ALSO honors a cookie
//   in one of its 6 dictionary languages (a variant exists, so the user's
//   chosen language wins there too).
//
// PRIVACY: detection happens per-request in edge memory only. Nothing is
// logged or stored by us. See the "Language and Region Detection" section of
// the privacy policy (all 9 languages).

import { NextRequest, NextResponse } from "next/server";
import { isWordListPage } from "@/lib/word-list-urls";

/** Languages that have localized subpaths (must match src/lib/i18n-seo.ts). */
const I18N_LANGS = ["de", "fr", "es", "it", "pt", "nl", "ja", "zh"] as const;

/** Tool slugs available under /{lang}/ (must match LOCALIZED_TOOL_SLUGS). */
const TOOL_SLUGS = new Set([
  "scramble", "anagram", "wordle", "quordle", "scrabble", "random", "wordfeud",
  "dictionary", "wordlists", "wordstarts", "wordends", "wordle-starts",
  "wordle-ends", "about", "contact", "privacy", "terms", "sitemap", "blitz",
]);

/** Languages with a localized /{lang}/scrabble-words section (they ship a
 *  Scrabble dictionary — must mirror DICT_LANGS in src/lib/scrabble-word-data.ts).
 *  ja/zh have no Scrabble dictionary → their /{lang}/scrabble-words URLs fall
 *  through to the 308 English-canonical redirect below. */
const DICT_LANGS = new Set(["de", "fr", "es", "it", "pt", "nl"]);

/** /scrabble-words/[word] URL space — mirrors the guard in the word pages. */
const SCRABBLE_WORD_RE = /^[a-z]{2,15}$/;

/** Internal route prefix that serves the localized pages. */
const I18N_PREFIX = "/i18n";

/**
 * Negotiate the preferred language for a first-time visitor. null → English.
 *
 * Uses ONLY the Accept-Language header (the user's own browser setting). We
 * deliberately do NOT consult x-vercel-ip-country or any other IP/geo signal —
 * Google warns that IP-based redirects trap Googlebot (US IPs) on the English
 * version. Accept-Language is the Google-approved signal because it reflects
 * the user's explicit browser preference, not their location, and Googlebot
 * sends Accept-Language: en so it always sees the English canonical.
 */
function negotiateLanguage(req: NextRequest): string | null {
  const accept = req.headers.get("accept-language") || "";
  for (const part of accept.split(",")) {
    const tag = part.split(";")[0]?.trim().toLowerCase() ?? "";
    if (!tag) continue;
    const base = tag.split("-")[0];
    if (base === "en") return null; // user prefers English — respect it
    if ((I18N_LANGS as readonly string[]).includes(base)) return base;
  }
  // English fallback — covers Googlebot, un-offered languages (da/no/sv/pl/…),
  // and visitors who send no Accept-Language at all.
  return null;
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const segs = pathname.split("/").filter(Boolean);

  // ── A. Internal path guard: /i18n/* is never public. Redirect to the
  //       canonical /{lang}/… form so crawlers can't index duplicate URLs.
  if (segs[0] === "i18n") {
    const lang = segs[1];
    const rest = segs.slice(2).join("/");
    if (lang && (I18N_LANGS as readonly string[]).includes(lang)) {
      const publicUrl = `/${lang}${rest ? `/${rest}` : ""}${search}`;
      return NextResponse.redirect(new URL(publicUrl, req.url), 308);
    }
    return NextResponse.next();
  }

  // ── B. Localized URLs: /{lang} and /{lang}/{tool} → static i18n route.
  if (segs.length > 0 && (I18N_LANGS as readonly string[]).includes(segs[0])) {
    const lang = segs[0];
    // /de → German homepage
    if (segs.length === 1) {
      return NextResponse.rewrite(new URL(`${I18N_PREFIX}/${lang}${search}`, req.url));
    }
    // /de/wordle → localized tool page
    if (segs.length === 2 && TOOL_SLUGS.has(segs[1])) {
      return NextResponse.rewrite(new URL(`${I18N_PREFIX}/${lang}/${segs[1]}${search}`, req.url));
    }
    // /de/unscrambler → /de (homepage alias, mirrors the English /unscrambler redirect)
    if (segs.length === 2 && segs[1] === "unscrambler") {
      return NextResponse.redirect(new URL(`/${lang}${search}`, req.url), 308);
    }
    // /fr/scrabble-words and /fr/scrabble-words/{word} → localized
    // Scrabble-words section (dictionary languages only; ja/zh and malformed
    // word slugs fall through to the 308 English-canonical redirect below).
    if (segs[1] === "scrabble-words" && DICT_LANGS.has(lang)) {
      if (segs.length === 2) {
        return NextResponse.rewrite(new URL(`${I18N_PREFIX}/${lang}/scrabble-words${search}`, req.url));
      }
      if (segs.length === 3 && SCRABBLE_WORD_RE.test(segs[2])) {
        return NextResponse.rewrite(
          new URL(`${I18N_PREFIX}/${lang}/scrabble-words/${segs[2]}${search}`, req.url)
        );
      }
    }
    // /{lang}/<word-list-slug> → localized word-list page (all 8 languages).
    // Word-list programmatic pages (unscramble-N-letter-words, words-starts-with-X,
    // wordle-words-starts/ends-with-X) now have per-language variants with
    // native shell + that language's dictionary words.
    if (segs.length === 2 && isWordListPage(segs[1])) {
      return NextResponse.rewrite(new URL(`${I18N_PREFIX}/${lang}/${segs[1]}${search}`, req.url));
    }
    // Everything else under /{lang}/ has no localized variant → English canonical.
    const rest = segs.slice(1).join("/");
    return NextResponse.redirect(new URL(`/${rest}${search}`.replace(/\/$/, "") || "/", req.url), 308);
  }

  // ── C. Language preference on the localized surface (home + 19 tools) for
  //       first-time visitors (no cookie). Explicit cookie choice always wins.
  const isLocalizablePage =
    segs.length === 0 || (segs.length === 1 && TOOL_SLUGS.has(segs[0]));
  if (isLocalizablePage && !req.cookies.get("wordizy-lang")?.value) {
    const lang = negotiateLanguage(req);
    if (lang) {
      const target = `/${lang}${segs.length ? `/${segs[0]}` : ""}${search}`;
      // 307 (temporary): content negotiation must never be cached permanently.
      return NextResponse.redirect(new URL(target, req.url), 307);
    }
  }

  // ── C2. Scrabble-words section: send the visitor to their language's
  //        edition when one exists. Unlike the 19 tools, this ALSO honors a
  //        wordizy-lang cookie in a dictionary language (an explicit choice
  //        wins wherever a localized variant exists — French visitors should
  //        never land on the all-English pages). Cookie-less visitors use the
  //        same Accept-Language / geo negotiation as the tools. CRITICALLY,
  //        an explicit NON-dict-language cookie choice (en, ja, zh) is
  //        honored: if the user picked English in the language selector
  //        (cookie "en"), they MUST stay on the English /scrabble-words pages
  //        even when their browser Accept-Language header is fr/de/es/… —
  //        the explicit user choice always wins. Never applies to ja/zh
  //        (no variant — a redirect would loop back here) or to cookie "en"
  //        (explicit English choice). 307, never cached.
  const isScrabbleWordsPath =
    segs[0] === "scrabble-words" &&
    (segs.length === 1 || (segs.length === 2 && SCRABBLE_WORD_RE.test(segs[1])));
  if (isScrabbleWordsPath) {
    const cookie = req.cookies.get("wordizy-lang")?.value;
    // Explicit user choice in a NON-dict language (en/ja/zh) → stay on the
    // English /scrabble-words pages. The user picked English (or a language
    // with no Scrabble dictionary) on purpose; we must not override that
    // choice with an Accept-Language negotiation.
    const explicitNonDictChoice = !!(cookie && !DICT_LANGS.has(cookie));
    if (!explicitNonDictChoice) {
      const target = cookie && DICT_LANGS.has(cookie) ? cookie : negotiateLanguage(req);
      if (target && DICT_LANGS.has(target)) {
        const rest = segs.length === 2 ? `/${segs[1]}` : "";
        return NextResponse.redirect(new URL(`/${target}/scrabble-words${rest}${search}`, req.url), 307);
      }
    }
  }

  return NextResponse.next();
}

// Run on all page paths; skip API routes, Next internals, and any path with a
// file extension (sitemap.xml, robots.txt, fonts, images, key files, …).
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
