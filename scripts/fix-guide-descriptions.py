#!/usr/bin/env python3
"""Fix guide front-matter descriptions that exceed Bing's 160-char limit.

Strategy:
  - The 4 English canonical guides get hand-crafted replacement descriptions.
  - The 18 localized variants get their existing descriptions truncated at a
    word boundary to fit within 160 chars (localized pages share the English
    canonical URL, so crawlers only ever see English — but keep them compliant
    anyway for users with a language cookie set).

Usage: python3 scripts/fix-guide-descriptions.py [--dry-run]
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GUIDES = ROOT / "src/content/guides"
MAX = 160

# Hand-crafted replacements for the 4 English canonical guides.
EN_REPLACEMENTS = {
    "best-wordle-starter-words.md":
        "The mathematically optimal Wordle starter words ranked by real letter-frequency data, plus a second-guess framework and FAQ.",
    "5-crossword-solving-tips-for-beginners.md":
        "Master the five highest-leverage crossword solving techniques, from long answers first to checking cross-references.",
    "score-400-in-anagram-blitz.md":
        "Seven specific techniques to hit 400+ points in 60 seconds in Anagram Blitz, from common prefixes to keyboard strategy.",
    "memorize-2-letter-scrabble-words.md":
        "The complete NWL2023 2-letter Scrabble word list (107 words) grouped by memorization strategy, with definitions.",
}


def truncate_at_word(text: str, limit: int) -> str:
    """Truncate text to <= limit chars, cutting at a word boundary."""
    if len(text) <= limit:
        return text
    cut = text[:limit]
    # Back off to the last space (avoid cutting mid-word)
    if " " in cut:
        cut = cut[:cut.rfind(" ")]
    return cut.rstrip(",;:-— ")


def main():
    dry_run = "--dry-run" in sys.argv
    changed = 0
    for md in sorted(GUIDES.glob("*.md")):
        content = md.read_text(encoding="utf-8")
        match = re.search(r'^description:\s*"([^"]*)"', content, re.MULTILINE)
        if not match:
            continue
        old_desc = match.group(1)
        if len(old_desc) <= MAX:
            continue

        if md.name in EN_REPLACEMENTS:
            new_desc = EN_REPLACEMENTS[md.name]
        else:
            new_desc = truncate_at_word(old_desc, MAX)

        if len(new_desc) > MAX:
            print(f"  WARNING: {md.name} replacement still {len(new_desc)} chars")
            continue
        if len(new_desc) < 25:
            print(f"  WARNING: {md.name} replacement too short ({len(new_desc)} chars)")
            continue

        action = "would fix" if dry_run else "fixed"
        print(f"  [{action}] {md.name}: {len(old_desc)} → {len(new_desc)} chars")
        if not dry_run:
            new_content = content.replace(
                f'description: "{old_desc}"', f'description: "{new_desc}"'
            )
            md.write_text(new_content, encoding="utf-8")
        changed += 1

    print(f"\n{changed} guide files {'would be ' if dry_run else ''}updated.")


if __name__ == "__main__":
    main()
