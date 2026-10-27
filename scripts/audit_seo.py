#!/usr/bin/env python3
"""Live SEO spot-check for wordIzy dev server — extracts on-page SEO signals per URL."""
import re
import urllib.request

BASE = "http://127.0.0.1:3000"

URLS = [
    "/", "/blitz", "/scramble", "/anagram", "/wordle", "/quordle", "/scrabble",
    "/random", "/wordfeud", "/dictionary", "/wordlists", "/wordstarts",
    "/wordends", "/wordle-starts", "/wordle-ends", "/about", "/contact",
    "/privacy", "/sitemap", "/guides/best-wordle-starter-words",
    "/words-starts-with-a", "/words-ends-with-e", "/wordle-words-starts-with-s",
    "/unscramble-5-letter-words", "/nonexistent-page-xyz", "/Blitz", "/blitz/",
]

def fetch(url):
    try:
        req = urllib.request.Request(BASE + url, headers={"User-Agent": "Mozilla/5.0 (audit)"})
        with urllib.request.urlopen(req, timeout=15) as r:
            return r.status, r.read().decode("utf-8", "replace"), r.headers.get("Content-Type", "")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", "replace"), ""
    except Exception as e:
        return 0, str(e), ""

def grab(pattern, html, flags=0):
    m = re.search(pattern, html, flags)
    return m.group(1).strip() if m else None

print(f"{'URL':<38} {'st':<4} {'title':<42} {'tlen':<5} {'dlen':<5} {'h1':<3} {'canon':<5} {'noix':<5} {'og':<4} {'ld':<3} {'kb':<6}")
print("-" * 175)
issues = []
for u in URLS:
    st, html, ct = fetch(u)
    kb = f"{len(html)/1024:.0f}"
    if st == 0:
        print(f"{u:<38} ERR {html[:60]}")
        continue
    title = grab(r"<title[^>]*>([^<]*)</title>", html) or ""
    title = re.sub(r"\s+", " ", title)
    desc = grab(r'<meta\s+name="description"\s+content="([^"]*)"', html) or grab(r'<meta\s+content="([^"]*)"\s+name="description"', html) or ""
    h1s = re.findall(r"<h1[^>]*>(.*?)</h1>", html, re.S)
    h1n = len(h1s)
    h1 = re.sub(r"<[^>]+>|\s+", " ", h1s[0]).strip()[:40] if h1s else "(none)"
    canon = grab(r'<link\s+rel="canonical"\s+href="([^"]*)"', html) or grab(r'<link\s+href="([^"]*)"\s+rel="canonical"', html) or ""
    robots_meta = grab(r'<meta\s+name="robots"\s+content="([^"]*)"', html) or ""
    og = "Y" if re.search(r'property="og:title"', html) else "-"
    ld = "Y" if "application/ld+json" in html else "-"
    print(f"{u:<38} {st:<4} {title[:40]:<42} {len(title):<5} {len(desc):<5} {h1n:<3} {canon[:5]:<5} {('Y' if 'noindex' in robots_meta else '-'):<5} {og:<4} {ld:<3} {kb:<6}")
    # collect issues
    if st == 200 and u == "/nonexistent-page-xyz":
        issues.append(f"SOFT-404: {u} returns 200 (should be 404)")
    if len(title) == 0:
        issues.append(f"NO TITLE: {u}")
    elif len(title) > 65:
        issues.append(f"TITLE>65 ({len(title)}): {u} — '{title[:50]}...'")
    if len(desc) == 0:
        issues.append(f"NO DESC: {u}")
    elif len(desc) > 170:
        issues.append(f"DESC>170 ({len(desc)}): {u}")
    if h1n != 1:
        issues.append(f"H1 count={h1n}: {u}")
    if not canon:
        issues.append(f"NO CANONICAL: {u}")

print("\n=== ISSUES ===")
for i in issues:
    print(" -", i)
if not issues:
    print(" (none)")
