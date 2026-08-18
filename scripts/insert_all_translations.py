#!/usr/bin/env python3
"""
Insert wordPages + blitz translation blocks AND wordlengths nav key
into translations.ts for all 9 languages. Uses precise line-based
parsing to avoid corrupting string values.
"""
import re

GEN_FILE = "/home/z/my-project/wordIzy-1/wordIzy_translations_wordPages_blitz.ts"
TRANS_FILE = "/home/z/my-project/wordIzy-1/src/components/i18n/translations.ts"

# ── 1. Extract wordPages + blitz blocks from the generated file ──
with open(GEN_FILE, "r") as f:
    generated = f.read()

lang_markers = ["EN", "FR", "ES", "DE", "IT", "PT", "NL", "JA", "ZH"]
blocks = {}
for i, lang in enumerate(lang_markers):
    marker = "// === " + lang + " ==="
    start = generated.find(marker)
    if start == -1:
        print("WARNING: could not find " + marker)
        continue
    if i + 1 < len(lang_markers):
        next_marker = "// === " + lang_markers[i + 1] + " ==="
        end = generated.find(next_marker)
    else:
        end = len(generated)
    section = generated[start:end]

    # Extract wordPages block (from "wordPages: {" to the next "},")
    wp_start = section.find("wordPages: {")
    if wp_start == -1:
        print("WARNING: no wordPages in " + lang)
        continue
    # Find the matching closing } — need to count braces
    depth = 0
    wp_end = wp_start
    for j in range(wp_start, len(section)):
        if section[j] == '{':
            depth += 1
        elif section[j] == '}':
            depth -= 1
            if depth == 0:
                wp_end = j + 1
                break
    word_pages_block = section[wp_start:wp_end].strip()

    # Extract blitz block
    bz_start = section.find("blitz: {")
    if bz_start == -1:
        print("WARNING: no blitz in " + lang)
        continue
    depth = 0
    bz_end = bz_start
    for j in range(bz_start, len(section)):
        if section[j] == '{':
            depth += 1
        elif section[j] == '}':
            depth -= 1
            if depth == 0:
                bz_end = j + 1
                break
    blitz_block = section[bz_start:bz_end].strip()

    blocks[lang.lower()] = (word_pages_block, blitz_block)

print("Extracted blocks for: " + ", ".join(blocks.keys()))

# ── 2. Read the translations file ──
with open(TRANS_FILE, "r") as f:
    lines = f.readlines()

# ── 3. Find each language's wordlists block and insert after it ──
lang_codes = ["en", "fr", "es", "de", "it", "pt", "nl", "ja", "zh"]
lang_nav_wl = {
    "en": "Unscramble by Length", "fr": "Anagrammes par Longueur",
    "es": "Desordenar por Longitud", "de": "Entwirren nach L\u00e4nge",
    "it": "Anagrammi per Lunghezza", "pt": "Descodificar por Tamanho",
    "nl": "Ontwarren op Lengte", "ja": "\u6587\u5b57\u6570\u3067\u89e3\u304f",
    "zh": "\u6309\u957f\u5ea6\u89e3\u8bcd",
}

# Find the wordlists block close for each language
# Strategy: find `const XX: Translation = {`, then find `wordlists: {`,
# then find the matching `};` that closes it.
insertions = []  # (line_number, text_to_insert) — will sort descending

for lang in lang_codes:
    if lang not in blocks:
        print("Skipping " + lang + " (no blocks)")
        continue

    # Find const line
    const_idx = None
    for i, line in enumerate(lines):
        if line.strip() == "const " + lang + ": Translation = {":
            const_idx = i
            break
    if const_idx is None:
        print("ERROR: could not find const " + lang)
        continue

    # Find wordlists: { after const
    wl_idx = None
    for i in range(const_idx + 1, len(lines)):
        if lines[i].strip().startswith("wordlists: {"):
            wl_idx = i
            break
    if wl_idx is None:
        print("ERROR: could not find wordlists block for " + lang)
        continue

    # Find matching }; — count braces from wordlists: {
    depth = 0
    wl_close_idx = None
    for i in range(wl_idx, len(lines)):
        stripped = lines[i].strip()
        # Count { and } in this line (but not inside strings — simple heuristic)
        for ch in stripped:
            if ch == '{':
                depth += 1
            elif ch == '}':
                depth -= 1
                if depth == 0:
                    wl_close_idx = i
                    break
        if wl_close_idx is not None:
            break

    if wl_close_idx is None:
        print("ERROR: could not find wordlists close for " + lang)
        continue

    # Insert after the }; line (which is wl_close_idx)
    wp_block, bz_block = blocks[lang]
    insertion_text = " " + wp_block + ",\n " + bz_block + ",\n"
    insertions.append((wl_close_idx + 1, insertion_text))
    print("  Queued " + lang + " insertion after line " + str(wl_close_idx + 1))

    # ── Also add wordlengths to the nav line ──
    # Find the nav line with `wordends:` in this language block
    # The nav line looks like: `  wordends: "...", about: "..."`
    for i in range(const_idx + 1, wl_idx):
        line = lines[i]
        # Check if this line has `wordends:` as a property (followed by a quote)
        if re.search(r'wordends:\s*"[^"]*",\s*about:', line):
            # Insert wordlengths before about:
            wl_value = lang_nav_wl[lang]
            new_line = re.sub(
                r'(wordends:\s*"[^"]*",\s*)(about:)',
                r'\1wordlengths: "' + wl_value + r'", \2',
                line
            )
            lines[i] = new_line
            print("  Added wordlengths to " + lang + " nav line " + str(i + 1))
            break

# ── 4. Apply insertions (bottom to top to preserve line numbers) ──
insertions.sort(key=lambda x: x[0], reverse=True)
for line_num, text in insertions:
    lines.insert(line_num, text)

# ── 5. Write back ──
with open(TRANS_FILE, "w") as f:
    f.writelines(lines)

print("\nDone! All insertions applied.")
