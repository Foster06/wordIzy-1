#!/usr/bin/env python3
"""Remove aboutTitle/aboutBody/canonicalUrl lines from translations.ts.

These fields are no longer used after removing the 'About this word list'
section from programmatic-seo-view.tsx.
"""
import re
from pathlib import Path

path = Path("/home/z/my-project/src/components/i18n/translations.ts")
content = path.read_text(encoding="utf-8")

# Match lines like: `  aboutTitle: "...",` or `  aboutBody: "...",` or `  canonicalUrl: "...",`
# These appear inside the wordListPage: { ... } blocks for each of 9 languages.
pattern = re.compile(r'^  (aboutTitle|aboutBody|canonicalUrl): .*$\n', re.MULTILINE)
new_content, count = pattern.subn('', content)

path.write_text(new_content, encoding="utf-8")
print(f"Removed {count} lines from {path}")

# Verify the fields are gone
remaining = re.findall(r'^  (aboutTitle|aboutBody|canonicalUrl):', new_content, re.MULTILINE)
print(f"Remaining matches: {len(remaining)} (should be 0)")
