import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "wordizy-admin";

function bad(msg: string, status = 400) {
  return NextResponse.json({ ok: false, error: msg }, { status });
}

/** POST — anonymous search event (no PII, fire-and-forget from the client). */
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return bad("Invalid JSON body.");
  }

  const { query, route, lang, resultCount, eventType } = (body || {}) as Record<string, unknown>;

  if (typeof query !== "string" || !query.trim()) return bad("query is required.");
  if (typeof route !== "string" || !route.trim()) return bad("route is required.");

  const cleanQuery = query.trim().slice(0, 50);
  const cleanRoute = route.trim().slice(0, 30);
  const cleanLang = typeof lang === "string" && lang.length <= 8 ? lang : "en";
  const count = typeof resultCount === "number" && resultCount >= 0 ? Math.min(resultCount, 1_000_000) : 0;
  const cleanType = eventType === "copy" ? "copy" : "search"; // 🎯 Standardize event types safely

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

  const topQueries = await db.searchEvent.groupBy({
    by: ["query"],
    where: { createdAt: { gte: since } },
    _count: { query: true },
    orderBy: { _count: { query: "desc" } },
    take: 20,
  });

  const topRoutes = await db.searchEvent.groupBy({
    by: ["route"],
    where: { createdAt: { gte: since } },
    _count: { route: true },
    orderBy: { _count: { route: "desc" } },
    take: 20,
  });

  const topLangs = await db.searchEvent.groupBy({
    by: ["lang"],
    where: { createdAt: { gte: since } },
    _count: { lang: true },
    orderBy: { _count: { lang: "desc" } },
    take: 10,
  });

  const zeroResults = await db.searchEvent.groupBy({
    by: ["query"],
    where: { createdAt: { gte: since }, resultCount: 0 },
    _count: { query: true },
    orderBy: { _count: { query: "desc" } },
    take: 20,
  });

  const total = await db.searchEvent.count({ where: { createdAt: { gte: since } } });

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
