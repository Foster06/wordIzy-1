import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Admin password for the inbox view (GET). Defaults to a simple value;
// override with ADMIN_PASSWORD env var in production.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "wordizy-admin";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { name: 120, email: 200, message: 5000 } as const;

function bad(msg: string, status = 400) {
  return NextResponse.json({ ok: false, error: msg }, { status });
}

/** POST — public submission endpoint (used by the Contact form). */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return bad("Invalid JSON body.");
  }

  if (!body || typeof body !== "object") return bad("Missing body.");

  const { name, email, message, locale } = body as Record<string, unknown>;

  if (typeof name !== "string" || !name.trim()) return bad("Name is required.");
  if (typeof email !== "string" || !email.trim()) return bad("Email is required.");
  if (typeof message !== "string" || !message.trim()) return bad("Message is required.");

  const cleanName = name.trim().slice(0, LIMITS.name);
  const cleanEmail = email.trim().toLowerCase().slice(0, LIMITS.email);
  const cleanMessage = message.trim().slice(0, LIMITS.message);

  if (!EMAIL_RE.test(cleanEmail)) return bad("Please provide a valid email address.");
  if (cleanMessage.length < 3) return bad("Message is too short.");

  const cleanLocale = typeof locale === "string" && locale.length <= 8 ? locale : "en";

  const headers = req.headers;
  const ip = headers.get("x-forwarded-for")?.split(",")[0]?.trim().slice(0, 64) ?? null;
  const userAgent = headers.get("user-agent")?.slice(0, 300) ?? null;

  try {
    const saved = await db.contactMessage.create({
      data: { name: cleanName, email: cleanEmail, message: cleanMessage, locale: cleanLocale, ip, userAgent },
      select: { id: true, createdAt: true },
    });
    return NextResponse.json({ ok: true, id: saved.id, createdAt: saved.createdAt });
  } catch (err) {
    console.error("[/api/contact] DB insert failed:", err);
    return bad("Could not store your message. Please try again later.", 500);
  }
}

/** GET — auth-gated inbox listing (for the site owner). */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get("key");

  if (key !== ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const items = await db.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    select: {
      id: true, name: true, email: true, message: true,
      locale: true, handled: true, createdAt: true, ip: true,
    },
  });
  const unread = items.filter((i) => !i.handled).length;
  return NextResponse.json({ ok: true, count: items.length, unread, items });
}

/** PATCH — mark a message as handled/unhandled. Auth-gated. */
export async function PATCH(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get("key");
  if (key !== ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return bad("Invalid JSON body.");
  }
  const { id, handled } = (body || {}) as Record<string, unknown>;
  if (typeof id !== "string" || typeof handled !== "boolean") {
    return bad("`id` (string) and `handled` (boolean) are required.");
  }

  try {
    await db.contactMessage.update({
      where: { id },
      data: { handled },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] PATCH failed:", err);
    return bad("Could not update message.", 500);
  }
}

/** DELETE — remove a message. Auth-gated. */
export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get("key");
  if (key !== ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const id = url.searchParams.get("id");
  if (typeof id !== "string") return bad("`id` query param is required.");

  try {
    await db.contactMessage.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] DELETE failed:", err);
    return bad("Could not delete message.", 500);
  }
}
