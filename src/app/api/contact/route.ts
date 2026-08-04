import { NextResponse } from "next/server";
import { Resend } from "resend"; // 🎯 Import the official Resend package
import { db } from "@/lib/db";
import { contactLimiter, getClientIp } from "@/lib/rate-limit";

// Force runtime execution so environment variables load cleanly on Vercel
export const dynamic = "force-dynamic";

// Admin password for the inbox view (GET). No default — must be set via env.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { name: 120, email: 200, message: 5000 } as const;

// 🎯 FIXED DYNAMIC INITIALIZATION ENGINE: Prevents 'next build' static data aggregation crashes
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey && process.env.NODE_ENV !== "production") {
    return new Resend("re_mock_key_for_local_building_phase_only");
  }
  if (!apiKey) {
    console.warn("Resend client skipped: Missing RESEND_API_KEY.");
    return null;
  }
  return new Resend(apiKey);
}

function bad(msg: string, status = 400) {
  return NextResponse.json({ ok: false, error: msg }, { status });
}

/** POST — public submission endpoint (used by the Contact form). */
export async function POST(req: Request) {
  if (contactLimiter.hit(getClientIp(req))) {
    return NextResponse.json({ ok: false, error: "Too many submissions. Please try again later." }, { status: 429 });
  }
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
    // 1. First, store the submission inside your active Turso database
    const saved = await db.contactMessage.create({
      data: { name: cleanName, email: cleanEmail, message: cleanMessage, locale: cleanLocale, ip, userAgent },
      select: { id: true, createdAt: true },
    });

    // 2. Next, safely initialize the Resend client on-demand at runtime
    const resend = getResendClient();

    if (resend) {
      try {
        // 🎯 ACTION A: Send the automatic stylized confirmation reply back to the user
        await resend.emails.send({
          from: "wordIzy <support@wordizy.com>", // Works instantly on root domain after Vercel DNS verification!
          to: cleanEmail, 
          subject: `Thank you for contacting wordIzy, ${cleanName}!`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
              <h2 style="color: #4f46e5; margin-top: 0;">We received your message!</h2>
              <p>Hello ${cleanName},</p>
              <p>Thank you for reaching out to wordIzy. This is an automated confirmation to let you know we've received your submission.</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p><strong>A copy of your message:</strong></p>
              <blockquote style="font-style: italic; color: #555; background: #f9f9f9; padding: 15px; border-left: 4px solid #4f46e5; margin: 10px 0; border-radius: 4px;">
                "${cleanMessage}"
              </blockquote>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p>Best regards,<br /><strong>The wordIzy Team</strong></p>
            </div>
          `,
        });

        // 🎯 ACTION B: DUAL-ROUTING (Send a copy instantly to your personal reader inbox so you are instantly notified)
        await resend.emails.send({
          from: "wordIzy System <support@wordizy.com>",
          to: "dorciusforteson@gmail.com", 
          replyTo: cleanEmail, // 🎯 THE MAGIC FIXED LINE: Directs your ProtonMail "Reply" button to email the user instantly!
          subject: `🔔 New Contact Form Submission from ${cleanName}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 8px; color: #333; margin: 0 auto;">
              <h2 style="color: #ea580c; border-bottom: 2px solid #ea580c; padding-bottom: 8px; margin-top: 0;">New Inbox Submission Received</h2>
              <p><strong>Sender Name:</strong> ${cleanName}</p>
              <p><strong>Sender Email:</strong> <a href="mailto:${cleanEmail}">${cleanEmail}</a></p>
              <p><strong>Locale Code:</strong> ${cleanLocale}</p>
              <p><strong>IP Location:</strong> ${ip || "Unknown"}</p>
              <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #ea580c; margin-top: 15px; border-radius: 4px;">
                <p style="margin: 0; font-style: italic; white-space: pre-wrap;">"${cleanMessage}"</p>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        // Log email errors but don't crash the form return since the message was saved to the DB successfully
        console.error("[/api/contact] Resend dispatch failed:", emailErr);
      }
    } else {
      console.warn("Resend skipped: RESEND_API_KEY environment variable is not defined.");
    }

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
    // 🎯 FIXED: Fully closed the database query execution block properly
    await db.contactMessage.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] DELETE failed:", err);
    return bad("Could not delete message.", 500);
  }
}
