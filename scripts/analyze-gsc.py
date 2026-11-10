#!/usr/bin/env python3
"""Analyze Google Search Console exports (GA4 organic search report) for wordizy.com.

Period: 2026-10-13 .. 2026-11-09 (28 days)

Inputs (upload/):
  - Trafic_issu*.csv  -> landing page report
      page | clicks | impressions | ctr | position | users | engaged_sessions |
      engagement_rate | avg_engagement_time | events | key_events | ad_revenue
  - Requ*.csv         -> query report
      query | clicks | impressions | ctr | position

Outputs:
  - scripts/gsc_pages.json / gsc_queries.json  (parsed rows)
  - stdout analysis: totals, clusters, striking distance, CTR gaps
"""
import csv
import glob
import hashlib
import json
import os
import re

UPLOAD = "/home/z/my-project/upload"
OUT = "/home/z/my-project/scripts"


def unique_files(pattern):
    """Glob and dedupe byte-identical copies (gateway saves both NFC & NFD names)."""
    seen = {}
    for f in sorted(glob.glob(os.path.join(UPLOAD, pattern))):
        with open(f, "rb") as fh:
            h = hashlib.md5(fh.read()).hexdigest()
        seen.setdefault(h, f)
    return list(seen.values())


def parse_gsc_csv(path, min_cols):
    with open(path, encoding="utf-8-sig") as fh:
        lines = [ln for ln in fh if not ln.lstrip().startswith("#")]
    reader = csv.reader(lines, delimiter=",")
    header = next(reader)
    rows = [r for r in reader if len(r) >= min_cols and r[0].strip()]
    return header, rows


# ---------------------------------------------------------------- parsing
page_files = unique_files("Trafic_issu*.csv")
query_files = unique_files("Requ*.csv")
print(f"page files: {[os.path.basename(p) for p in page_files]}")
print(f"query files: {[os.path.basename(p) for p in query_files]}")

pages = []
for pf in page_files:
    hdr, rows = parse_gsc_csv(pf, 12)
    for r in rows:
        try:
            pages.append({
                "page": r[0].strip(),
                "clicks": int(float(r[1])),
                "impressions": int(float(r[2])),
                "ctr": float(r[3]),
                "position": float(r[4]),
                "users": int(float(r[5])),
            })
        except (ValueError, IndexError):
            continue

queries = []
for qf in query_files:
    hdr, rows = parse_gsc_csv(qf, 5)
    for r in rows:
        try:
            queries.append({
                "query": r[0].strip(),
                "clicks": int(float(r[1])),
                "impressions": int(float(r[2])),
                "ctr": float(r[3]),
                "position": float(r[4]),
            })
        except (ValueError, IndexError):
            continue

print(f"\nparsed rows: {len(pages)} pages, {len(queries)} queries")

# ---------------------------------------------------------------- totals
t_clicks = sum(p["clicks"] for p in pages)
t_imps = sum(p["impressions"] for p in pages)
w_pos = (sum(p["position"] * p["impressions"] for p in pages) / t_imps) if t_imps else 0
q_clicks = sum(q["clicks"] for q in queries)
q_imps = sum(q["impressions"] for q in queries)

print("=" * 78)
print("SITE TOTALS (28 days)")
print(f"  clicks: {t_clicks}   impressions: {t_imps}   CTR: {t_clicks/t_imps*100:.3f}%"
      f"   weighted avg position: {w_pos:.1f}")
print(f"  (queries report: {q_clicks} clicks / {q_imps} imps -> "
      f"{q_imps - t_imps:+d} imps from anonymized queries)")

json.dump(pages, open(f"{OUT}/gsc_pages.json", "w"), ensure_ascii=False, indent=1)
json.dump(queries, open(f"{OUT}/gsc_queries.json", "w"), ensure_ascii=False, indent=1)

# ---------------------------------------------------------------- CTR benchmark
CURVE = [(1, 27.6), (2, 15.1), (3, 9.9), (4, 7.2), (5, 5.5), (6, 4.1), (7, 3.2),
         (8, 2.7), (9, 2.4), (10, 2.2), (11, 1.8), (12, 1.5), (13, 1.3),
         (14, 1.15), (15, 1.0), (20, 0.5), (30, 0.15), (50, 0.05), (100, 0.01)]


def exp_ctr_pct(pos):
    """Benchmark organic CTR (%) at a given average position (published-study blend)."""
    if pos <= CURVE[0][0]:
        return CURVE[0][1]
    if pos >= CURVE[-1][0]:
        return CURVE[-1][1]
    for i in range(len(CURVE) - 1):
        (p1, c1), (p2, c2) = CURVE[i], CURVE[i + 1]
        if p1 <= pos <= p2:
            t = (pos - p1) / (p2 - p1)
            return c1 + t * (c2 - c1)
    return CURVE[-1][1]


print("=" * 78)
print("PAGE OPPORTUNITY TABLE (impressions >= 100)")
print(f"{'page':52s} {'clk':>4s} {'imps':>6s} {'ctr%':>6s} {'pos':>5s} "
      f"{'exp%':>5s} {'ratio':>6s} {'lost':>6s} {'pos5':>6s}")
rows_opp = []
for p in sorted(pages, key=lambda x: -x["impressions"]):
    if p["impressions"] < 100:
        continue
    e = exp_ctr_pct(p["position"])
    ratio = (p["ctr"] * 100 / e) if e else 0
    lost = round(max(0.0, e / 100 * p["impressions"] - p["clicks"]))
    p5 = round(5.5 / 100 * p["impressions"])
    rows_opp.append({**p, "exp_ctr": round(e, 2), "ratio": round(ratio, 2),
                     "lost_clicks": lost, "clicks_at_pos5": p5})
    print(f"{p['page'][:52]:52s} {p['clicks']:4d} {p['impressions']:6d} "
          f"{p['ctr']*100:6.2f} {p['position']:5.1f} {e:5.2f} {ratio:6.2f} "
          f"{lost:6d} {p5:6d}")
json.dump(rows_opp, open(f"{OUT}/gsc_page_opportunities.json", "w"),
          ensure_ascii=False, indent=1)

# ---------------------------------------------------------------- page families
FAMILIES = [
    ("wordle-starts/ends programmatic", re.compile(
        r"^/wordle-words-(starts|ends)-with-[a-z]$|^/wordle-(starts|ends)$")),
    ("general starts/ends programmatic", re.compile(
        r"^/words-(starts|ends)-(with|by)-[a-z]$|^/word(starts|ends)$")),
    ("unscramble programmatic", re.compile(r"^/unscramble")),
    ("guides", re.compile(r"^/guides/")),
    ("core tools + home", re.compile(
        r"^/(wordle|anagram|scramble|dictionary|scrabble|quordle|wordfeud|random|blitz|wordlists|about|contact)?$")),
]
print("=" * 78)
print("PAGE FAMILIES")
for name, rx in FAMILIES:
    grp = [p for p in pages if rx.search(p["page"])]
    c = sum(p["clicks"] for p in grp)
    i = sum(p["impressions"] for p in grp)
    w = (sum(p["position"] * p["impressions"] for p in grp) / i) if i else 0
    print(f"  {name:38s} n={len(grp):3d}  clicks={c:3d}  imps={i:6d}  wpos={w:5.1f}")

# ---------------------------------------------------------------- query clustering
def q_has(q, *subs):
    return any(s in q for s in subs)


def classify(q):
    ql = q.lower()
    # brand / competitor brand first
    if q_has(ql, "wordizy", "worldzy", "wordzy"):
        return "brand"
    if q_has(ql, "capitalize my title", "capitalizemytitle", "capitalise my title",
             "andy's", "andys anagram", "andy anagram", "thewordfinder",
             "scrabble-solver.com", "scrambled.world", "myanagramsolver",
             "scrabblewordfinder.org"):
        return "competitor-brand"
    if "wordfeud" in ql:
        return "wordfeud"
    if q_has(ql, "quordle", "quordly", "qordle", "4 in 1 wordle"):
        return "quordle"
    is_wordle = q_has(ql, "wordle", "worlde", "wordel", "wordl ")
    if is_wordle and "cheat" in ql:
        return "wordle-cheat"
    if is_wordle and q_has(ql, "sol", "help", "find", "answer", "guess", "ai"):
        return "wordle-solver"
    if is_wordle and q_has(ql, "start", "first", "open", "begin", "word to"):
        return "wordle-starting-words"
    if "crossword" in ql:
        return "crossword"
    if q_has(ql, "anagram", "anagrams", "anagr", "annag", "anahram", "anargam",
             "angram", "annogram", "anogram", "anafram", "amagram", "amagrams",
             "anagran", "ansgrams", "annegram", "nagram", "anahram"):
        return "anagram-solver"
    if "scrab" in ql and q_has(ql, "check", "valid", "diction", "is ", "word",
                               "finder", "verif", "search"):
        return "scrabble-checker"
    if re.search(r"\bis (it|this) a word\b|check a word|word check", ql):
        return "is-it-a-word"
    if "random" in ql and q_has(ql, "word", "letter"):
        return "random-generator"
    if q_has(ql, "scrambl", "jumbl", "unscrambl", "uncramble", "unacramble",
             "ubscramble", "un scramble", "descrambl", "de scramble", "rearrange",
             "arrange the", "inscramble"):
        return "unscramble-jumble"
    if q_has(ql, "these letters", "from letters", "with letters", "letters to",
             "letters into", "letters from", "make a word", "make words",
             "form a word", "form words", "create a word", "create words",
             "build word", "generate words", "spell a word", "spell words",
             "how many words", "out of letters", "out these letters",
             "using letters", "given letters", "possible words", "letters make",
             "letters spell", "turn letters", "word from", "words from",
             "word using", "words using", "word with the letters"):
        return "make-words-from-letters"
    if q_has(ql, "start", "begin"):
        return "starts-with"
    if q_has(ql, "end", "ending"):
        return "ends-with"
    if is_wordle:
        return "wordle-other"
    if q_has(ql, "dictionary", "dictionnaire", "kamus"):
        return "dictionary"
    if re.match(r"^[a-z_]{3,}$", ql) and "_" in ql:
        return "wordle-pattern"
    if q_has(ql, "letter"):
        return "letter-words-other"
    return "other"


clusters = {}
for q in queries:
    c = classify(q["query"])
    clusters.setdefault(c, []).append(q)

print("=" * 78)
print("QUERY CLUSTERS (grouped by intent)")
cluster_rows = []
for name in sorted(clusters, key=lambda n: -sum(x["impressions"] for x in clusters[n])):
    grp = clusters[name]
    c = sum(x["clicks"] for x in grp)
    i = sum(x["impressions"] for x in grp)
    w = (sum(x["position"] * x["impressions"] for x in grp) / i) if i else 0
    striking = [x for x in grp if 4 <= x["position"] <= 15 and x["impressions"] >= 2]
    s_imp = sum(x["impressions"] for x in striking)
    cluster_rows.append({"cluster": name, "n": len(grp), "clicks": c, "imps": i,
                         "wpos": round(w, 1), "striking_imps": s_imp})
    print(f"  {name:26s} n={len(grp):4d} clicks={c:3d} imps={i:6d} wpos={w:5.1f} "
          f"| striking(4-15,imp>=2) imps={s_imp}")
json.dump(cluster_rows, open(f"{OUT}/gsc_clusters.json", "w"),
          ensure_ascii=False, indent=1)

# ---------------------------------------------------------------- striking distance
print("=" * 78)
print("STRIKING-DISTANCE QUERIES (pos 4-15, imps >= 3) — top 40 by impressions")
sd = [q for q in queries if 4 <= q["position"] <= 15 and q["impressions"] >= 3]
sd.sort(key=lambda x: -x["impressions"])
for q in sd[:40]:
    e = exp_ctr_pct(q["position"])
    gain = round(max(0.0, (5.5 - e) / 100 * q["impressions"]))
    print(f"  {q['query'][:56]:56s} clk={q['clicks']:2d} imp={q['impressions']:5d} "
          f"pos={q['position']:5.1f} ctr={q['ctr']*100:5.2f}% -> pos5 +{gain}")
pot_sd = sum(max(0.0, (5.5 - exp_ctr_pct(q["position"])) / 100 * q["impressions"])
             for q in queries if 4 <= q["position"] <= 15)
print(f"\n  TOTAL striking-distance pool: {len(sd)} queries, "
      f"{sum(q['impressions'] for q in sd)} imps, est +{round(pot_sd)} clicks/mo if all reach pos 5")
json.dump(sd, open(f"{OUT}/gsc_striking.json", "w"), ensure_ascii=False, indent=1)

# ---------------------------------------------------------------- anomalies
print("=" * 78)
print("ANOMALIES: imps >= 40 with 0 clicks")
for q in sorted(queries, key=lambda x: -x["impressions"]):
    if q["impressions"] >= 40 and q["clicks"] == 0:
        e = exp_ctr_pct(q["position"])
        print(f"  {q['query'][:56]:56s} imp={q['impressions']:5d} pos={q['position']:5.1f} "
              f"exp_ctr={e:.2f}% (expected ~{round(e/100*q['impressions'])} clicks)")

print("\nDONE. JSON files written to scripts/.")
