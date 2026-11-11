#!/usr/bin/env python3
"""EXHAUSTIVE meta-description audit for wordizy.com (Bing 25-160 char rule).

Sources audited:
  A. Static source strings:
     1. layout.tsx root default + og + twitter descriptions
     2. meta-config.ts TOOL_METADATA_REGISTRY (19 tools) + blitz twitter copy
     3. [[...tool]]/page.tsx fallback description
     4. seo.ts ROUTE_META (legacy, unused — flagged separately)
     5. scrabble-words/page.tsx index description
     6. guides/[slug]/page.tsx fallback description
  B. Live dev-server crawl (actual rendered <meta name="description">):
     7. All 19 tool/home pages
     8. All 118 programmatic word-list pages (52 scrabble letters, 52 wordle
        letters, 14 lengths)
     9. All 4 guides × 9 language cookies (wordizy-lang=xx) — guides render
        per-language SSR descriptions
    10. Sample scrabble-words pages: short valid, long valid (4+ letters,
        ISR), invalid words, 15-letter words
    11. scrabble-words index

Usage: python3 scripts/audit-meta-descriptions-v2.py
"""
import re
import subprocess
import sys
import urllib.request
from pathlib import Path
from urllib.error import HTTPError

ROOT = Path(__file__).resolve().parent.parent
MIN, MAX = 25, 160
BASE = "http://localhost:3000"
LANGS = ["en", "fr", "es", "de", "it", "pt", "nl", "ja", "zh"]
ALPHABET = "abcdefghijklmnopqrstuvwxyz"
GUIDES = [
    "best-wordle-starter-words",
    "5-crossword-solving-tips-for-beginners",
    "score-400-in-anagram-blitz",
    "memorize-2-letter-scrabble-words",
]
TOOLS = [
    "", "scramble", "anagram", "wordle", "quordle", "random", "wordfeud",
    "dictionary", "scrabble", "wordlists", "wordstarts", "wordends",
    "wordle-starts", "wordle-ends", "about", "contact", "privacy", "terms",
    "sitemap", "blitz",
]

issues = []
checked = 0


def check(label, desc, note=""):
    global checked
    checked += 1
    import html as _html
    # Next.js HTML-escapes the content attribute (& -> &amp;, ' -> &#x27;),
    # so measure BOTH the decoded value (what Bing reads from the DOM) and
    # the escaped value (what a naive raw-attribute parser would measure).
    n = len(desc)
    n_esc = len(_html.escape(desc, quote=True))
    ok = (MIN <= n <= MAX) and (MIN <= n_esc <= MAX)
    if not ok:
        status = "LONG" if max(n, n_esc) > MAX else "SHORT"
        issues.append((status, label, max(n, n_esc), desc))
        print(f"  [{status:>5}] {label}: {n} chars (escaped {n_esc}) {note}")
        print(f"          {desc[:100]}{'…' if n > 100 else ''}")
    return ok


def fetch(url, cookie_lang=None):
    for attempt in range(3):
        req = urllib.request.Request(url)
        if cookie_lang:
            req.add_header("Cookie", f"wordizy-lang={cookie_lang}")
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                return resp.read().decode("utf-8", errors="replace")
        except HTTPError as e:
            if e.code == 404:
                return e.read().decode("utf-8", errors="replace")
            return None
        except Exception:
            if attempt == 2:
                return None
    return None


def meta_desc(html):
    if html is None:
        return None
    m = re.search(r'<meta\s+name="description"\s+content="([^"]*)"', html)
    if not m:
        m = re.search(r'<meta\s+content="([^"]*)"\s+name="description"', html)
    if not m:
        # Next.js may emit with single quotes or data-rh
        m = re.search(r'<meta[^>]+name=[\'"]description[\'"][^>]+content=[\'"]([^\'"]*)[\'"]', html)
        if m:
            pass
    return m.group(1) if m else None


def section(title):
    print()
    print("=" * 72)
    print(title)
    print("=" * 72)


def extract_str(src, pattern):
    m = re.search(pattern, src, re.DOTALL)
    return m.group(1) if m else None


def main():
    # ------------------------------------------------------------------
    section("A. STATIC SOURCE STRINGS")
    # ------------------------------------------------------------------
    # 1. layout.tsx
    layout = (ROOT / "src/app/layout.tsx").read_text(encoding="utf-8")
    d = extract_str(layout, r'description:\s*\n?\s*"([^"]+)",\n\s*keywords')
    if d:
        check("layout.tsx root metadata.description (sitewide default)", d)
    d = extract_str(layout, r'openGraph:\s*\{[^}]*?description:\s*\n?\s*"([^"]+)"', )
    # og description (first occurrence after openGraph)
    m = re.search(r'openGraph:\s*\{.*?description:\s*\n?\s*"([^"]+)"', layout, re.DOTALL)
    if m:
        check("layout.tsx openGraph.description", m.group(1))
    for m in re.finditer(r'twitter:\s*\{.*?description:\s*\n?\s*"([^"]+)"', layout, re.DOTALL):
        check("layout.tsx twitter.description", m.group(1))
    # WebApplication JSON-LD description (Bing reads JSON-LD too)
    d = extract_str(layout, r'@\n?@\n?"?description"?:?\s*\n?\s*"([^"]+)"')
    m = re.search(r'description:\s*\n?\s*"([^"]+)",\n\s*applicationCategory', layout)
    if m:
        check("layout.tsx WebApplication JSON-LD description", m.group(1))

    # 2. meta-config.ts
    meta_cfg = (ROOT / "src/lib/meta-config.ts").read_text(encoding="utf-8")
    for m in re.finditer(r'"([a-z-]+)":\s*\{[^{}]*?description:\s*"([^"]+)"', meta_cfg, re.DOTALL):
        check(f"meta-config.ts /{m.group(1)}", m.group(2))
    # blitz twitter override
    m = re.search(r'twitter:\s*\{\s*title:[^}]*?description:\s*\n?\s*"([^"]+)"', meta_cfg, re.DOTALL)
    if m:
        check("meta-config.ts blitz twitter.description", m.group(1))

    # 3. [[...tool]] fallback
    tool_page = (ROOT / "src/app/[[...tool]]/page.tsx").read_text(encoding="utf-8")
    m = re.search(r'Fallback — omit title.*?description:\s*"([^"]+)"', tool_page, re.DOTALL)
    if m:
        check("[[...tool]] fallback description", m.group(1))
    # blitz VideoGame JSON-LD
    m = re.search(r'VideoGame.*?description:\s*"([^"]+)"', tool_page, re.DOTALL)
    if m:
        check("[[...tool]] blitz VideoGame JSON-LD description", m.group(1))

    # 4. seo.ts (legacy — check but flag)
    seo = (ROOT / "src/lib/seo.ts").read_text(encoding="utf-8")
    for m in re.finditer(r'"(/[a-z]*)":\s*\{\s*title:[^}]*?description:\s*"([^"]+)"', seo, re.DOTALL):
        check(f"seo.ts ROUTE_META {m.group(1)} (legacy/unused)", m.group(2))

    # 5. scrabble-words index
    sw = (ROOT / "src/app/scrabble-words/page.tsx").read_text(encoding="utf-8")
    descs = re.findall(r'description:\s*\n?\s*"([^"]+)"', sw)
    for i, d in enumerate(descs):
        check(f"scrabble-words/page.tsx description #{i + 1}", d)

    # 6. guides fallback
    gp = (ROOT / "src/app/guides/[slug]/page.tsx").read_text(encoding="utf-8")
    m = re.search(r'let description = "([^"]+)"', gp)
    if m:
        check("guides fallback description (file-not-found path)", m.group(1))

    # 7. ALL guide md files
    for md in sorted((ROOT / "src/content/guides").glob("*.md")):
        content = md.read_text(encoding="utf-8")
        m = re.search(r'^description:\s*"([^"]+)"', content, re.MULTILINE)
        if m:
            check(f"guide {md.name}", m.group(1))
        else:
            print(f"  [NO-DESC-FIELD] {md.name}")

    # ------------------------------------------------------------------
    section("B. LIVE DEV SERVER — rendered <meta name=description>")
    # ------------------------------------------------------------------
    # 7. tool pages (en, no cookie)
    for tool in TOOLS:
        url = f"{BASE}/{tool}" if tool else BASE + "/"
        desc = meta_desc(fetch(url))
        if desc is None:
            issues.append(("NO-DESC", f"/{tool}", 0, ""))
            print(f"  [NO-DESC] /{tool or '(home)'}")
        else:
            check(f"live /{tool or '(home)'}", desc)

    # 8. programmatic word-list pages — all 118
    urls = []
    for c in ALPHABET:
        urls.append(f"/words-starts-with-{c}")
        urls.append(f"/words-ends-with-{c}")
        urls.append(f"/wordle-words-starts-with-{c}")
        urls.append(f"/wordle-words-ends-with-{c}")
    for n in range(2, 16):
        urls.append(f"/unscramble-{n}-letter-words")
    for u in urls:
        desc = meta_desc(fetch(BASE + u))
        if desc is None:
            issues.append(("NO-DESC", u, 0, ""))
            print(f"  [NO-DESC] {u}")
        else:
            check(f"live {u}", desc)

    # 9. guides × 9 languages (cookie-driven SSR)
    for guide in GUIDES:
        for lang in LANGS:
            url = f"{BASE}/guides/{guide}"
            desc = meta_desc(fetch(url, cookie_lang=lang))
            label = f"live /guides/{guide} (lang={lang})"
            if desc is None:
                issues.append(("NO-DESC", label, 0, ""))
                print(f"  [NO-DESC] {label}")
            else:
                check(label, desc)

    # 10. scrabble-words samples
    samples = [
        "qi", "za", "aa", "jo", "ox",              # 2-letter valid
        "cat", "dog", "zax", "faq",                # 3-letter valid
        "quit", "quiz", "jeux",                    # 4-letter (ISR)
        "quixotic", "jazzy",                       # longer (ISR)
        "pneumonoultramicroscopicsilicovolcanoconiosis",  # 45-char → 404
        "zave", "xyzzy", "qqq",                    # invalid
        "a",                                       # 1-letter → 404
    ]
    for w in samples:
        url = f"{BASE}/scrabble-words/{w}"
        html = fetch(url)
        if html and "Page Not Found" in html:
            print(f"  [404-OK] /scrabble-words/{w} (expected 404, not indexed)")
            continue
        desc = meta_desc(html)
        if desc is None:
            issues.append(("NO-DESC", f"/scrabble-words/{w}", 0, ""))
            print(f"  [NO-DESC] /scrabble-words/{w}")
        else:
            check(f"live /scrabble-words/{w}", desc)

    # 11. scrabble-words index
    desc = meta_desc(fetch(f"{BASE}/scrabble-words"))
    if desc:
        check("live /scrabble-words (index)", desc)

    # ------------------------------------------------------------------
    section(f"SUMMARY: {checked} checked, {len(issues)} issues")
    # ------------------------------------------------------------------
    if issues:
        print(f"\n{'★' if False else '!!'} {len(issues)} OUT-OF-RANGE DESCRIPTIONS:")
        for status, label, n, d in issues:
            print(f"  [{status:>5}] {label} ({n} chars)")
    else:
        print("All descriptions within 25-160 chars.")
    return 0 if not issues else 1


if __name__ == "__main__":
    sys.exit(main())
