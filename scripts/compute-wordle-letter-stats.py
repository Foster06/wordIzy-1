#!/usr/bin/env python3
"""Compute letter-frequency stats for the Wordle starter-words guide.

Reads data/scrabble/EN_WORDLE.txt (104,322 valid Wordle guesses, 5-7 letters)
and computes:
  1. Letter frequency across 5-letter words (the daily-Wordle pool)
  2. Positional frequency (which slot each letter is most common in, for 5L)
  3. A ranked list of top starter words by a composite score that rewards:
       - high-frequency letters (weighted by overall freq)
       - vowel count (bonus for 3+ distinct vowels)
       - no repeated letters (penalty for dupes)
     Limited to the official Wordle *answer* pool feel — we score ALL 5L
     Wordle guesses but highlight the well-known openers (SALET, CRANE, ...).

Outputs JSON to scripts/wordle-letter-stats.json which the guide renderer
will read at build time.
"""
import json
import os
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WORDLE_FILE = ROOT / "data" / "scrabble" / "EN_WORDLE.txt"
OUT = ROOT / "scripts" / "wordle-letter-stats.json"

# Well-known openers cited in the guide — we report their computed score
# alongside the published rankings.
KNOWN_OPENERS = [
    "SALET", "CRANE", "SLATE", "CRATE", "TRACE", "ADIEU", "AUDIO",
    "RAISE", "SOARE", "IRATE", "STARE", "AROSE", "RAILE", "ARISE",
    "SLATE", "CARES", "TORSE", "LATER", "TARES", "CARTS",
]


def load_5letter_words():
    words = []
    with open(WORDLE_FILE, "r", encoding="utf-8") as f:
        for line in f:
            w = line.strip().lower()
            if len(w) == 5 and w.isalpha():
                words.append(w)
    return words


def compute_letter_freq(words):
    counter = Counter()
    for w in words:
        for ch in set(w):  # count each letter once per word (presence frequency)
            counter[ch] += 1
    total = len(words)
    return [
        {"letter": L.upper(), "count": c, "pct": round(100 * c / total, 1)}
        for L, c in counter.most_common()
    ]


def compute_positional_freq(words):
    """For 5-letter words, how often each letter appears in each slot (1-5)."""
    pos = [Counter() for _ in range(5)]
    for w in words:
        for i, ch in enumerate(w):
            pos[i][ch] += 1
    total = len(words)
    out = []
    for slot_idx, counter in enumerate(pos):
        # Top 5 letters for this slot
        top = [
            {"letter": L.upper(), "count": c, "pct": round(100 * c / total, 1)}
            for L, c in counter.most_common(8)
        ]
        out.append({"slot": slot_idx + 1, "top": top})
    return out


def compute_starter_scores(words, letter_freq_map):
    """Score every 5-letter word by sum of letter presence-frequencies,
    with a vowel bonus and a duplicate-letter penalty."""
    scored = []
    vowels = set("aeiou")
    for w in words:
        letters = set(w)
        # base: sum of each distinct letter's presence frequency
        base = sum(letter_freq_map.get(ch, 0) for ch in letters)
        # vowel bonus: +1% of total per distinct vowel beyond 2
        vowel_count = len(letters & vowels)
        vowel_bonus = max(0, vowel_count - 2) * 0.15 * base
        # duplicate penalty: 20% off if any letter repeats
        if len(letters) < len(w):
            base *= 0.8
        score = round(base + vowel_bonus, 1)
        scored.append((w, score, vowel_count, len(letters)))
    scored.sort(key=lambda x: x[1], reverse=True)
    return scored


def main():
    words5 = load_5letter_words()
    print(f"Loaded {len(words5)} 5-letter Wordle words")

    letter_freq = compute_letter_freq(words5)
    # build a quick lookup map: letter -> presence count
    lf_map = {row["letter"].lower(): row["count"] for row in letter_freq}

    positional = compute_positional_freq(words5)

    scored = compute_starter_scores(words5, lf_map)
    # Top 25 overall
    top25 = [
        {"word": w.upper(), "score": s, "vowels": vc, "distinct_letters": dl}
        for w, s, vc, dl in scored[:25]
    ]
    # Scores for the well-known openers
    known_scores = {}
    score_by_word = {w: (s, vc, dl) for w, s, vc, dl in scored}
    for opener in KNOWN_OPENERS:
        info = score_by_word.get(opener.lower())
        if info:
            known_scores[opener] = {
                "score": info[0], "vowels": info[1], "distinct_letters": info[2]
            }

    # Vowel coverage table for popular openers
    vowels = set("aeiou")
    vowel_coverage = []
    for opener in KNOWN_OPENERS[:12]:
        w = opener.lower()
        if w not in score_by_word:
            continue
        present_vowels = sorted(letters & vowels) if (letters := set(w)) else []
        vowel_coverage.append({
            "word": opener,
            "vowels_tested": "".join(v.upper() for v in present_vowels),
            "vowel_count": len(present_vowels),
            "distinct_consonants": len(set(w) - vowels),
            "has_repeat": len(set(w)) < len(w),
        })

    stats = {
        "word_count_5letter": len(words5),
        "letter_frequency": letter_freq,
        "positional_frequency": positional,
        "top_starters_by_score": top25,
        "known_openers_scored": known_scores,
        "vowel_coverage": vowel_coverage,
        "scoring_notes": (
            "Score = sum of each distinct letter's presence frequency across "
            "the 5-letter Wordle pool, plus a 15%-of-base bonus for each "
            "distinct vowel beyond two, minus a 20% penalty if any letter "
            "repeats. Presence frequency = how many of the 18,824 accepted "
            "5-letter Wordle guesses contain that letter at least once."
        ),
    }

    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(stats, f, indent=2, ensure_ascii=False)
    print(f"Wrote {OUT}")
    print(f"Top 5 starters by composite score:")
    for row in top25[:5]:
        print(f"  {row['word']:6}  score={row['score']:6.1f}  vowels={row['vowels']}")
    print(f"\nKnown openers (published ranking vs our score):")
    for op in KNOWN_OPENERS[:10]:
        s = known_scores.get(op)
        if s:
            print(f"  {op:6}  score={s['score']:6.1f}  vowels={s['vowels']}")


if __name__ == "__main__":
    main()
