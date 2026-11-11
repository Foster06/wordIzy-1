#!/usr/bin/env python3
"""Audit all meta descriptions on wordizy.com against Bing's 25-160 char rule.

Checks:
  1. TOOL_METADATA_REGISTRY descriptions (src/lib/meta-config.ts)
  2. /scrabble-words/[word] per-page descriptions (valid + invalid templates)
  3. /scrabble-words index page description
  4. Guide front-matter descriptions (src/content/guides/*.md)
  5. A sample of live pages (fetched from localhost dev server) to catch
     anything generated dynamically (word-list pages, etc.)

Usage: python3 scripts/audit-meta-descriptions.py [--live]
"""
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MIN, MAX = 25, 160


def extract_descriptions_from_meta_config():
    """Parse meta-config.ts and extract tool -> description pairs."""
    src = (ROOT / "src/lib/meta-config.ts").read_text(encoding="utf-8")
    # Match: "tool-slug": { ... description: "..." ... }
    # Descriptions are long single-line strings after description:
    pairs = re.findall(r'"([a-z-]+)":\s*\{[^}]*?description:\s*"([^"]+)"', src, re.DOTALL)
    return pairs


def extract_guide_descriptions():
    """Parse guide .md front-matter for description fields."""
    guides_dir = ROOT / "src/content/guides"
    results = []
    for md in sorted(guides_dir.glob("*.md")):
        content = md.read_text(encoding="utf-8")
        match = re.search(r'^description:\s*"([^"]+)"', content, re.MULTILINE)
        if match:
            results.append((md.name, match.group(1)))
    return results


def check(label, desc):
    n = len(desc)
    status = "OK " if MIN <= n <= MAX else ("LONG" if n > MAX else "SHORT")
    if status != "OK ":
        print(f"  [{status}] {label}: {n} chars")
        print(f"         {desc[:80]}{'...' if n > 80 else ''}")
        return False
    return True


def main():
    issues = 0

    print("=" * 70)
    print("1. Tool metadata registry (meta-config.ts)")
    print("=" * 70)
    for tool, desc in extract_descriptions_from_meta_config():
        if not check(f"/{tool}", desc):
            issues += 1

    print()
    print("=" * 70)
    print("2. Guide front-matter descriptions")
    print("=" * 70)
    for name, desc in extract_guide_descriptions():
        if not check(name, desc):
            issues += 1

    print()
    print("=" * 70)
    print("3. Scrabble-words index page")
    print("=" * 70)
    desc = ("Check whether any word is valid in Scrabble. Browse valid words by length "
            "with points and definitions.")
    if not check("/scrabble-words (index)", desc):
        issues += 1

    print()
    print("=" * 70)
    print("4. Scrabble-words per-word templates (computed from real words)")
    print("=" * 70)
    # Simulate the description builder from scrabble-words/[word]/page.tsx
    # Valid: "{W} is a valid Scrabble word worth {P} points. Definition: {D(120)}. Valid in {dicts}."
    # Invalid: "{W} is not a valid Scrabble word in either the NWL2023 (Tournament Word List) or CSW21 (Collins Scrabble Words) dictionary. See why, and find similar valid words."
    nwl_path = ROOT / "data/scrabble/NWL2023.txt"
    defs = {}
    for line in nwl_path.read_text(encoding="utf-8").split("\n"):
        m = re.match(r"^(\S+)\s+(.+?)\s*\[([^\]]+)\]$", line.strip())
        if m:
            defs[m.group(1).lower()] = m.group(2)

    # Valid: dynamic truncation — fixed part first, definition gets the budget.
    # Simulate with the real QI data:
    test_words = ["qi", "za", "jo", "xu", "aa", "ab", "ae", "ka", "xi", "ox",
                  "cat", "dog", "zax", "faq", "gyo"]
    for w in test_words:
        d = defs.get(w, "the vital force that in Chinese thought is inherent in all things")
        pts = {"qi": 11, "za": 11, "jo": 9, "xu": 9, "aa": 2, "ab": 4,
               "ae": 2, "ka": 6, "xi": 9, "ox": 9, "cat": 5, "dog": 5,
               "zax": 19, "faq": 14, "gyo": 8}.get(w, 10)
        fixed = f"{w.upper()} is a valid Scrabble word worth {pts} points. Valid in NWL2023 & CSW21."
        budget = 160 - len(fixed) - len(" Definition: ")
        desc = fixed
        if budget >= 20:
            desc = f"{fixed} Definition: {d[:budget]}"
        if not check(f"/scrabble-words/{w} (valid)", desc):
            issues += 1

    # Invalid template — always the same shape:
    desc = "ZAVE is not a valid Scrabble word in NWL2023 or CSW21. See why, and find similar valid words to play."
    if not check("/scrabble-words/{invalid} (invalid template)", desc):
        issues += 1

    print()
    print("=" * 70)
    print(f"TOTAL ISSUES: {issues}")
    print("=" * 70)

    # Optionally check live pages
    if "--live" in sys.argv:
        print()
        print("=" * 70)
        print("5. Live pages (dev server)")
        print("=" * 70)
        urls = [
            "http://localhost:3000/",
            "http://localhost:3000/wordle",
            "http://localhost:3000/scrabble",
            "http://localhost:3000/scrabble-words",
            "http://localhost:3000/scrabble-words/qi",
            "http://localhost:3000/scrabble-words/zave",
            "http://localhost:3000/guides/best-wordle-starter-words",
            "http://localhost:3000/words-starts-with-t",
            "http://localhost:3000/unscramble-5-letter-words",
            "http://localhost:3000/wordle-words-starts-with-s",
        ]
        live_issues = 0
        for url in urls:
            try:
                html = subprocess.run(
                    ["curl", "-s", url], capture_output=True, text=True, timeout=15
                ).stdout
                m = re.search(r'<meta\s+name="description"\s+content="([^"]*)"', html)
                if not m:
                    m = re.search(r'content="([^"]*)"\s+name="description"', html)
                if m:
                    desc = m.group(1)
                    if not check(url, desc):
                        live_issues += 1
                else:
                    print(f"  [NO-DESC] {url}")
                    live_issues += 1
            except Exception as e:
                print(f"  [ERR] {url}: {e}")
        print(f"LIVE ISSUES: {live_issues}")


if __name__ == "__main__":
    main()
