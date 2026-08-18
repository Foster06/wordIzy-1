import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const key = url.searchParams.get("key");
  const adminPassword = process.env.ADMIN_PASSWORD || "";
  if (adminPassword && key !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const cutoff = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    const result = await db.searchEvent.deleteMany({ where: { createdAt: { lt: cutoff } } });
    return NextResponse.json({ ok: true, deleted: result.count, cutoff: cutoff.toISOString() });
  } catch (err) {
    console.error("[/api/cleanup-analytics] error:", err);
    return NextResponse.json({ error: "Cleanup failed" }, { status: 500 });
  }
}
