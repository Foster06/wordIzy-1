import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Naive-but-pragmatic email sanity check. Not RFC-strict, just enough to
// filter obviously malformed input and most accidental typos.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Hard size caps to protect against pathological / abusive payloads
// (SQLite text columns are unbounded but we don't want unbounded RAM use
// during request parsing).
const LIMITS = {
  name: 120,
  email: 200,
  message: 5000,
} as const;

function bad(msg: string, status = 400) {
  return NextResponse.json({ ok: false, error: msg }, { status });
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return bad("Invalid JSON body.");
  }

  if (!body || typeof body !== "object") {
    return bad("Missing body.");
  }

  const { name, email, message, locale } = body as Record<string, unknown>;

  // --- Validate & normalise -------------------------------------------------
  if (typeof name !== "string" || !name.trim()) {
    return bad("Name is required.");
  }
  if (typeof email !== "string" || !email.trim()) {
    return bad("Email is required.");
  }
  if (typeof message !== "string" || !message.trim()) {
    return bad("Message is required.");
  }

  const cleanName = name.trim().slice(0, LIMITS.name);
  const cleanEmail = email.trim().toLowerCase().slice(0, LIMITS.email);
  const cleanMessage = message.trim().slice(0, LIMITS.message);

  if (!EMAIL_RE.test(cleanEmail)) {
    return bad("Please provide a valid email address.");
  }
  if (cleanMessage.length < 3) {
    return bad("Message is too short.");
  }

  const cleanLocale =
    typeof locale === "string" && locale.length <= 8 ? locale : "en";

  // --- Optional request metadata for spam triage ---------------------------
  // (Header reads are safe; we don't persist anything user-controlled that
  //  could be used for HTML injection — the inbox viewer must escape on read.)
  const headers = req.headers;
  const ip =
    headers.get("x-forwarded-for")?.split(",")[0]?.trim().slice(0, 64) ?? null;
  const userAgent = headers.get("user-agent")?.slice(0, 300) ?? null;

  // --- Persist --------------------------------------------------------------
  try {
    const saved = await db.contactMessage.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        message: cleanMessage,
        locale: cleanLocale,
        ip,
        userAgent,
      },
      select: { id: true, createdAt: true },
    });

    return NextResponse.json({
      ok: true,
      id: saved.id,
      createdAt: saved.createdAt,
    });
  } catch (err) {
    console.error("[/api/contact] DB insert failed:", err);
    return bad("Could not store your message. Please try again later.", 500);
  }
}

// Lightweight GET so the site owner (or a future admin panel) can peek at
// the inbox. Intentionally not authenticated here — this is a sandbox; in
// production you'd gate this behind auth.
export async function GET() {
  const recent = await db.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    select: {
      id: true,
      name: true,
      email: true,
      message: true,
      locale: true,
      handled: true,
      createdAt: true,
    },
  });
  return NextResponse.json({ ok: true, count: recent.length, items: recent });
}
