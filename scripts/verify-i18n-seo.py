#!/usr/bin/env python3
"""Verify src/lib/i18n-seo.ts entries against Bing's meta rules:
   - descriptions: 25-160 chars decoded AND after HTML-escaping (target ≤150 escaped)
   - titles: ≤50 chars (the "| wordIzy" template appends 9)
Also checks structural completeness: 8 langs × 20 slugs.
"""
import html
import re
import sys
from pathlib import Path

src = Path("src/lib/i18n-seo.ts").read_text(encoding="utf-8")

# Extract per-language blocks
LANGS = ["de", "fr", "es", "it", "pt", "nl", "ja", "zh"]
SLUGS = ["home", "scramble", "anagram", "wordle", "quordle", "scrabble", "random",
         "wordfeud", "dictionary", "wordlists", "wordstarts", "wordends",
         "wordle-starts", "wordle-ends", "about", "contact", "privacy", "terms",
         "sitemap", "blitz"]

issues = 0
total = 0
for lang in LANGS:
    m = re.search(rf"^  {lang}: \{{(.*?)^  \}},?$", src, re.DOTALL | re.MULTILINE)
    if not m:
        print(f"[MISSING-LANG] {lang}")
        issues += 1
        continue
    block = m.group(1)
    found_slugs = set()
    for sm in re.finditer(r'^    ("[^"]+"|[a-z-]+): \{\s*\n\s*title: "([^"]+)",\s*\n\s*description:\s*\n?\s*"([^"]+)",?\s*\n\s*\}', block, re.MULTILINE):
        slug = sm.group(1).strip('"')
        title, desc = sm.group(2), sm.group(3)
        found_slugs.add(slug)
        total += 1
        tlen = len(title) + len(" | wordIzy")
        dlen = len(desc)
        dlen_esc = len(html.escape(desc, quote=True))
        problems = []
        if tlen > 60:
            problems.append(f"title {tlen}>60 (with | wordIzy)")
        if not (25 <= dlen <= 160):
            problems.append(f"desc {dlen} outside 25-160")
        if dlen_esc > 160:
            problems.append(f"desc escaped {dlen_esc}>160")
        if dlen_esc > 150:
            problems.append(f"desc escaped {dlen_esc}>150 (tight)")
        if problems:
            issues += 1
            print(f"[{'|'.join(problems)}] {lang}/{slug}")
            print(f"    title({tlen}): {title}")
            print(f"    desc({dlen}/{dlen_esc}): {desc[:80]}")
    missing = set(SLUGS) - found_slugs
    if missing:
        issues += 1
        print(f"[MISSING-SLUGS] {lang}: {sorted(missing)}")

print(f"\nChecked {total} entries across {len(LANGS)} languages — issues: {issues}")
sys.exit(1 if issues else 0)
