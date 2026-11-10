#!/usr/bin/env python3
"""Generate the 3 charts for the wordIzy organic traffic analysis report (docx).

Outputs 200-dpi PNGs to scripts/report-assets/.
Palette derives from the docx DM-1 (Deep Cyan) table accent #1B6B7A.
"""
import json
import os

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

OUT = "/home/z/my-project/scripts/report-assets"
os.makedirs(OUT, exist_ok=True)

# DM-1-derived palette (darkened accent for print, per design-system rule)
P = {
    "primary": "#1B6B7A",   # dark teal (DM-1 table accent)
    "accent": "#37DCF2",    # bright cyan (DM-1 accent) — sparingly
    "muted": "#8AA6AD",
    "warn": "#C0653B",      # warm contrast for "actual/lost" series
    "grid": "#E0E6E8",
    "text": "#333333",
}
plt.rcParams["axes.unicode_minus"] = False
plt.rcParams["font.family"] = "DejaVu Sans"


def style_ax(ax):
    ax.spines[["top", "right"]].set_visible(False)
    ax.spines[["left", "bottom"]].set_color("#B8C4C8")
    ax.tick_params(colors=P["text"], labelsize=10)
    ax.grid(axis="y", alpha=0.35, color=P["grid"], linewidth=0.8)
    ax.set_axisbelow(True)


pages = json.load(open("/home/z/my-project/scripts/gsc_page_opportunities.json"))
clusters = json.load(open("/home/z/my-project/scripts/gsc_clusters.json"))

# ---------------------------------------------------------------- Chart 1
# Actual CTR vs benchmark CTR at current position (top pages by impressions)
top = [p for p in pages if p["impressions"] >= 100][:10]
labels = []
actual = []
bench = []
for p in top:
    label = p["page"] if p["page"] != "/" else "/ (home)"
    if label.startswith("/guides/"):
        label = "/guides/best-wordle…"
    labels.append(label)
    actual.append(round(p["ctr"] * 100, 2))
    bench.append(p["exp_ctr"])

fig, ax = plt.subplots(figsize=(11, 5.6))
y = range(len(labels))
h = 0.38
ax.barh([i + h / 2 for i in y], actual, height=h, color=P["warn"], label="Actual CTR")
ax.barh([i - h / 2 for i in y], bench, height=h, color=P["primary"], label="Benchmark CTR at same position")
for i, (a, b) in enumerate(zip(actual, bench)):
    ax.text(a + 0.04, i + h / 2, f"{a:.2f}%", va="center", fontsize=9, color=P["warn"])
    ax.text(b + 0.04, i - h / 2, f"{b:.2f}%", va="center", fontsize=9, color=P["primary"])
ax.set_yticks(list(y))
ax.set_yticklabels(labels, fontsize=10)
ax.invert_yaxis()
ax.set_xlabel("Click-through rate (%)", fontsize=11, color=P["text"])
ax.set_title("Actual CTR vs. benchmark CTR at the same average position (pages ≥ 100 impressions)",
             fontsize=12.5, color=P["text"], pad=12)
ax.legend(loc="lower right", frameon=False, fontsize=10)
style_ax(ax)
ax.grid(axis="x", alpha=0.35, color=P["grid"], linewidth=0.8)
ax.grid(axis="y", alpha=0)
ax.set_xlim(0, max(bench) * 1.22)
fig.savefig(f"{OUT}/chart1-ctr-gap.png", dpi=200, bbox_inches="tight",
            pad_inches=0.15, facecolor="white")
plt.close(fig)

# ---------------------------------------------------------------- Chart 2
# Query clusters: impressions + weighted avg position
cl = [c for c in clusters if c["imps"] >= 300][:10]
cl.sort(key=lambda c: c["imps"])
names = [c["cluster"] for c in cl]
imps = [c["imps"] for c in cl]
wpos = [c["wpos"] for c in cl]

fig, ax = plt.subplots(figsize=(11, 5.8))
bars = ax.barh(names, imps, color=P["primary"], height=0.62, edgecolor="white")
for bar, imp, wp in zip(bars, imps, wpos):
    ax.text(bar.get_width() + 60, bar.get_y() + bar.get_height() / 2,
            f"{imp:,} imp · avg pos {wp:.0f}", va="center", fontsize=9.5, color=P["text"])
ax.set_xlabel("Impressions (28 days)", fontsize=11, color=P["text"])
ax.set_title("Query demand by intent cluster (named queries only — ~40% of impressions are anonymized)",
             fontsize=12.5, color=P["text"], pad=12)
style_ax(ax)
ax.grid(axis="x", alpha=0.35, color=P["grid"], linewidth=0.8)
ax.grid(axis="y", alpha=0)
ax.set_xlim(0, max(imps) * 1.30)
fig.savefig(f"{OUT}/chart2-clusters.png", dpi=200, bbox_inches="tight",
            pad_inches=0.15, facecolor="white")
plt.close(fig)

# ---------------------------------------------------------------- Chart 3
# Click opportunity: current vs benchmark-CTR vs position-5 scenario
opp = [p for p in pages if p["impressions"] >= 500][:8]
labels3 = []
cur = []
pot = []
pos5 = []
for p in opp:
    label = p["page"] if p["page"] != "/" else "/ (home)"
    if label.startswith("/guides/"):
        label = "/guides/best-wordle…"
    labels3.append(label)
    cur.append(p["clicks"])
    pot.append(p["clicks"] + p["lost_clicks"])
    pos5.append(p["clicks_at_pos5"])

fig, ax = plt.subplots(figsize=(11, 5.6))
x = range(len(labels3))
w = 0.27
b1 = ax.bar([i - w for i in x], cur, width=w, color=P["warn"], label="Clicks today (28 days)")
b2 = ax.bar(list(x), pot, width=w, color=P["muted"], label="Expected at benchmark CTR (same rank)")
b3 = ax.bar([i + w for i in x], pos5, width=w, color=P["primary"], label="Potential at position ~5")
for bars in (b1, b2, b3):
    for bar in bars:
        v = bar.get_height()
        ax.text(bar.get_x() + bar.get_width() / 2, v + 6, str(round(v)),
                ha="center", va="bottom", fontsize=8.5, color=P["text"])
ax.set_xticks(list(x))
ax.set_xticklabels(labels3, fontsize=9.5, rotation=18, ha="right")
ax.set_ylabel("Clicks per 28 days", fontsize=11, color=P["text"])
ax.set_title("Click opportunity by page — fixing CTR is the near-term lever; ranking is the structural one",
             fontsize=12.5, color=P["text"], pad=12)
ax.legend(frameon=False, fontsize=10)
style_ax(ax)
ax.set_ylim(0, max(pos5) * 1.15)
fig.savefig(f"{OUT}/chart3-opportunity.png", dpi=200, bbox_inches="tight",
            pad_inches=0.15, facecolor="white")
plt.close(fig)

for f in sorted(os.listdir(OUT)):
    print(f, os.path.getsize(os.path.join(OUT, f)))
print("charts done")
