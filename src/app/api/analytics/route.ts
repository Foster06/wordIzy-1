import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { heavyLimiter, getClientIp } from "@/lib/rate-limit";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

function bad(msg: string, status = 400) {
  return NextResponse.json({ ok: false, error: msg }, { status });
}

/** POST — anonymous search event (no PII, fire-and-forget from the client). */
export async function POST(req: NextRequest) {
  if (heavyLimiter.hit(getClientIp(req))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return bad("Invalid JSON body.");
  }

  const { query, route, lang, resultCount, eventType, type, metric, value, ts } = (body || {}) as Record<string, unknown>;

  // Branch A: Web-vital beacon from <WebVitals />. Not stored in DB (high volume);
  // logged server-side for optional log aggregation. Always returns ok.
  if (typeof type === "string" && type === "web-vital") {
    if (process.env.NODE_ENV !== "production") {
      console.log("[web-vital]", { metric, value, ts });
    }
    return NextResponse.json({ ok: true });
  }

  // Branch B: Standard search/copy event — requires query + route.
  if (typeof query !== "string" || !query.trim()) return bad("query is required.");
  if (typeof route !== "string" || !route.trim()) return bad("route is required.");

  const cleanQuery = query.trim().slice(0, 50);
  const cleanRoute = route.trim().slice(0, 30);
  const cleanLang = typeof lang === "string" && lang.length <= 8 ? lang : "en";
  const count = typeof resultCount === "number" && resultCount >= 0 ? Math.min(resultCount, 1_000_000) : 0;
  const cleanType = eventType === "copy" ? "copy" : "search";

  try {
    await db.searchEvent.create({
      data: { query: cleanQuery, route: cleanRoute, lang: cleanLang, resultCount: count, eventType: cleanType },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/analytics] Private insert failed:", err);
    return NextResponse.json({ ok: true });
  }
}

/** GET — auth-gated analytics summary for the site owner. */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const key = url.searchParams.get("key");
  if (key !== ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const days = Math.min(30, Math.max(1, Number(url.searchParams.get("days")) || 7));
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  // Run all 5 queries in parallel — cuts latency ~5× on remote DBs (Turso/libSQL).
  const [topQueries, topRoutes, topLangs, zeroResults, total] = await Promise.all([
    db.searchEvent.groupBy({
      by: ["query"],
      where: { createdAt: { gte: since } },
      _count: { query: true },
      orderBy: { _count: { query: "desc" } },
      take: 20,
    }),
    db.searchEvent.groupBy({
      by: ["route"],
      where: { createdAt: { gte: since } },
      _count: { route: true },
      orderBy: { _count: { route: "desc" } },
      take: 20,
    }),
    db.searchEvent.groupBy({
      by: ["lang"],
      where: { createdAt: { gte: since } },
      _count: { lang: true },
      orderBy: { _count: { lang: "desc" } },
      take: 10,
    }),
    db.searchEvent.groupBy({
      by: ["query"],
      where: { createdAt: { gte: since }, resultCount: 0 },
      _count: { query: true },
      orderBy: { _count: { query: "desc" } },
      take: 20,
    }),
    db.searchEvent.count({ where: { createdAt: { gte: since } } }),
  ]);

  return NextResponse.json({
    ok: true,
    days,
    total,
    topQueries: topQueries.map((q) => ({ query: q.query, count: q._count.query })),
    topRoutes: topRoutes.map((r) => ({ route: r.route, count: r._count.route })),
    topLangs: topLangs.map((l) => ({ lang: l.lang, count: l._count.lang })),
    zeroResults: zeroResults.map((q) => ({ query: q.query, count: q._count.query })),
  });
}
