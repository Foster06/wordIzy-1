#!/usr/bin/env python3
"""Detail views for wordfeud / unscramble / non-English queries + page-URL audit."""
import json
import re

qs = json.load(open("/home/z/my-project/scripts/gsc_queries.json"))

print("--- WORDFEUD CLUSTER ---")
for q in sorted([x for x in qs if "wordfeud" in x["query"].lower()],
                key=lambda x: -x["impressions"]):
    print(f"  {q['query'][:50]:50s} imp={q['impressions']:4d} "
          f"clk={q['clicks']:2d} pos={q['position']:5.1f}")

print("--- UNSCRAMBLE-FAMILY QUERIES (imp>=10) ---")
for q in sorted([x for x in qs if "unscrambl" in x["query"].lower()
                 and x["impressions"] >= 10], key=lambda x: -x["impressions"])[:15]:
    print(f"  {q['query'][:50]:50s} imp={q['impressions']:4d} "
          f"clk={q['clicks']:2d} pos={q['position']:5.1f}")

print("--- NON-ENGLISH / LOCALIZED QUERIES (imp>=4) ---")
pat = re.compile(r"[àâæçéèêëîïôœùûüßäöüñáíóúãõåøæ]")
kw = [" oplosser", "dictionnaire", "kamus", "bestes ", "startwort", "wörter",
      " fusk", " juks", "fusk", "hjelp", "ordfeud"]
for q in sorted(qs, key=lambda x: -x["impressions"]):
    ql = q["query"].lower()
    if q["impressions"] >= 4 and (pat.search(ql) or any(w in ql for w in kw)):
        print(f"  {q['query'][:50]:50s} imp={q['impressions']:4d} "
              f"clk={q['clicks']:2d} pos={q['position']:5.1f}")

print("--- TOP 30 QUERIES BY IMPRESSIONS (any) ---")
for q in sorted(qs, key=lambda x: -x["impressions"])[:30]:
    print(f"  {q['query'][:50]:50s} imp={q['impressions']:5d} "
          f"clk={q['clicks']:2d} pos={q['position']:5.1f} ctr={q['ctr']*100:5.2f}%")
