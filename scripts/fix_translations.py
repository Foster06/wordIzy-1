#!/usr/bin/env python3
"""Fix the broken wordlists/wordPages/blitz blocks in translations.ts.

After the first insert script, wordlists blocks were not properly closed before
the inserted wordPages + blitz blocks, leaving a stray ` },` at the end.
This script closes wordlists properly and removes the stray brace.
"""

import re
from pathlib import Path

PATH = Path("/home/z/my-project/wordIzy-1/src/components/i18n/translations.ts")

# For each broken pattern, we know the wordlists block ends with `browse: "<X>"` or
# `browse: "<X>",` (depending on single-line vs multi-line). After that line should
# come ` },` to close wordlists, but it's missing. The fix:
# 1. Add ` },` after the browse line (if it doesn't already have one).
# 2. Remove the stray ` },` that appears after the blitz block (before ` about: {`).

BROWSE_LINES = [
    # (browse_line_substring, has_trailing_comma)
    ('browse: "Parcourir",', True),       # fr
    ('browse: "Explorar"', False),         # es
    ('browse: "Durchsuchen"', False),      # de
    ('browse: "Sfoglia"', False),          # it
    ('browse: "Navegar"', False),          # pt
    ('browse: "Bladeren"', False),         # nl
    ('browse: "閲覧"', False),             # ja
    ('browse: "浏览"', False),             # zh
]

text = PATH.read_text(encoding="utf-8")

for browse_line, has_comma in BROWSE_LINES:
    # 1. Add ` },` after the browse line (close wordlists block).
    if has_comma:
        old = browse_line + "\n"
        new = browse_line + "\n },\n"
    else:
        old = browse_line + "\n"
        new = browse_line + " },\n"
    cnt = text.count(old)
    if cnt != 1:
        # Maybe already fixed for this one. Skip if not found.
        if cnt == 0:
            print(f"WARN: pattern not found for {browse_line!r}; skipping")
            continue
        raise RuntimeError(f"Pattern {browse_line!r} appears {cnt} times")
    text = text.replace(old, new, 1)
    print(f"closed wordlists block for {browse_line!r}")

# 2. Remove the stray ` },` after the blitz block (before ` about: {`).
# The pattern is: `boredDesc: "...",\n },\n },\n about: {`
# Remove one ` },` so we have: `boredDesc: "...",\n },\n about: {`
stray_pattern = re.compile(r'(\n },\n) },\n about: \{')
new_text, n = stray_pattern.subn(r'\1 about: {', text)
print("removed " + str(n) + " stray brace closers")
text = new_text

PATH.write_text(text, encoding="utf-8")
print("OK — translations.ts fixed.")
