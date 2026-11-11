#!/usr/bin/env python3
"""
Live JS-integrity + meta-description checker for wordizy.com.

1. Downloads the sitemap, samples pages across every route family
   (top-level tools, scrabble-words, guides, word lists, all locale
   subpaths added in Task 39).
2. For each page: records HTTP status, x-vercel-cache, Age, Cache-Control,
   meta-description length, and every referenced /_next/static/chunks/*.js.
3. Verifies every referenced chunk returns HTTP 200.
4. Flags pages whose Age header predates the current deployment
   (evidence of stale cross-deployment HTML serving).
"""
import re
import sys
import html as htmlmod
import urllib.request
from concurrent.futures import ThreadPoolExecutor

BASE = "https://wordizy.com"
CHUNK_RE = re.compile(r'/_next/static/chunks/[A-Za-z0-9._\-]+\.js')
META_DESC_RE = re.compile(
    r'<meta\s+[^>]*name=["\']description["\'][^>]*content=["\']([^"\']*)["\']|'
    r'<meta\s+[^>]*content=["\']([^"\']*)["\'][^>]*name=["\']description["\']',
    re.IGNORECASE)
UA = ("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36")


def fetch(url, timeout=30):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, dict(r.headers), r.read()
    except urllib.error.HTTPError as e:
        return e.code, dict(e.headers), b""
    except Exception as e:
        return 0, {"error": str(e)}, b""


def get_sitemap_urls():
    status, _, body = fetch(f"{BASE}/sitemap.xml")
    if status != 200:
        print(f"FATAL: sitemap status {status}")
        sys.exit(1)
    return re.findall(r"<loc>([^<]+)</loc>", body.decode("utf-8", "replace"))


def sample_pages(urls):
    reported_words = ["bobas", "sau", "its", "gu", "fon", "son", "rep", "yok",
                      "quean", "spunk", "walie", "sepia", "lipid", "suet", "vests"]
    pages = [f"{BASE}/", f"{BASE}/scrabble-words"]
    pages += [f"{BASE}/scrabble-words/{w}" for w in reported_words]
    guides = [u for u in urls if "/guides/" in u][:4]
    pages += guides
    locales = ["de", "es", "fr", "it", "ja", "nl", "pt", "zh"]
    for loc in locales:
        loc_pages = [u for u in urls if f"/{loc}/" in u.replace(f"{BASE}/{loc}", f"{BASE}/{loc}/")]
        pages.append(f"{BASE}/{loc}")
        pages += loc_pages[:2]
    wordlists = [f"{BASE}/words-starts-with-a", f"{BASE}/words-ends-with-z",
                 f"{BASE}/wordle-words-starts-with-s", f"{BASE}/unscramble-5-letter-words"]
    pages += wordlists
    tools = ["/blitz", "/scramble", "/wordle", "/quordle", "/anagram",
             "/random", "/wordfeud", "/wordstarts"]
    pages += [f"{BASE}{t}" for t in tools]
    seen, out = set(), []
    for p in pages:
        if p not in seen:
            seen.add(p)
            out.append(p)
    return out


def check_page(url):
    status, headers, body = fetch(url)
    info = {
        "url": url,
        "status": status,
        "cache": headers.get("x-vercel-cache", "-"),
        "age": headers.get("age", "0"),
        "cc": headers.get("cache-control", "-"),
        "chunks": [],
        "meta_len": None,
        "error": headers.get("error", ""),
    }
    if status == 200 and b"<html" in body[:2000].lower() or status == 200 and b"<!doctype" in body[:200].lower():
        text = body.decode("utf-8", "replace")
        info["chunks"] = sorted(set(CHUNK_RE.findall(text)))
        m = META_DESC_RE.search(text)
        if m:
            desc = m.group(1) or m.group(2) or ""
            desc = htmlmod.unescape(desc)
            info["meta_len"] = len(desc)
    return info


def main():
    urls = get_sitemap_urls()
    print(f"sitemap URLs: {len(urls)}")
    pages = sample_pages(urls)
    print(f"sampling {len(pages)} pages ...")
    with ThreadPoolExecutor(max_workers=10) as ex:
        results = list(ex.map(check_page, pages))

    all_chunks = sorted({c for r in results for c in r["chunks"]})
    print(f"unique chunk files referenced: {len(all_chunks)}\n")
    with ThreadPoolExecutor(max_workers=12) as ex:
        chunk_statuses = dict(zip(all_chunks, ex.map(
            lambda c: fetch(f"{BASE}{c}")[0], all_chunks)))

    print("=== CHUNK STATUS ===")
    broken = {c: s for c, s in chunk_statuses.items() if s != 200}
    if broken:
        for c, s in broken.items():
            print(f"  {s}  {c}")
    else:
        print("  all chunks 200 OK")

    print("\n=== PAGES ===")
    problems = 0
    meta_bad = []
    for r in results:
        flags = []
        if r["status"] != 200:
            flags.append(f"HTTP {r['status']}")
        bad_chunks = [c for c in r["chunks"] if chunk_statuses.get(c) != 200]
        if bad_chunks:
            flags.append(f"{len(bad_chunks)} broken chunks")
        if r["meta_len"] is not None and not (25 <= r["meta_len"] <= 160):
            flags.append(f"meta_desc len {r['meta_len']} outside 25-160")
            meta_bad.append((r["url"], r["meta_len"]))
        if flags:
            problems += 1
            print(f"  !! {r['url']}")
            for f in flags:
                print(f"     - {f}")
    if problems == 0:
        print("  no problems found on any sampled page")

    print("\n=== STALE-CACHE EVIDENCE (Age header) ===")
    stale = [r for r in results if r["cache"] == "HIT" and int(r["age"] or 0) > 900]
    if stale:
        for r in stale:
            print(f"  {r['url']}  age={r['age']}s  chunks_ok="
                  f"{all(chunk_statuses.get(c) == 200 for c in r['chunks'])}")
    else:
        print("  no HIT entries older than 900s observed")

    print(f"\n=== SUMMARY ===")
    print(f"pages checked: {len(results)}")
    print(f"pages with problems: {problems}")
    print(f"broken chunk files: {len(broken)}")
    print(f"meta-desc violations: {len(meta_bad)}")
    for u, l in meta_bad[:10]:
        print(f"   {l:>4} chars  {u}")


if __name__ == "__main__":
    main()
