import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Resend } from "resend";
import { db } from "@/lib/db";

// Force runtime execution so environment variables load cleanly on Vercel
export const dynamic = "force-dynamic";

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

export async function POST(request: Request) {
  try {
    const { name, email, message, locale } = await request.json();

    // 1. Basic field validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 2. Extract request headers and IP for spam validation
    const reqHeaders = await headers();
    const userAgent = reqHeaders.get("user-agent") || null;
    const forwardedFor = reqHeaders.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : null;

    // 3. Store submission inside your active Turso table
    const savedMessage = await db.contactMessage.create({
      data: {
        name,
        email,
        message,
        locale: locale || "en",
        handled: false,
        ip,
        userAgent,
      },
    });

    // 4. Safely initialize Resend client on-demand at runtime
    const resend = getResendClient();

    if (resend) {
      // 🎯 ACTION A: Send the automatic stylized confirmation reply back to the user
      await resend.emails.send({
        from: "wordIzy <support@wordizy.com>", // Enabled after Resend DNS verification
        to: email, 
        subject: `Thank you for contacting wordIzy, ${name}!`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
            <h2 style="color: #4f46e5; margin-top: 0;">We received your message!</h2>
            <p>Hello ${name},</p>
            <p>Thank you for reaching out to wordIzy. This is an automated confirmation to let you know we've received your submission.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p><strong>A copy of your message:</strong></p>
            <blockquote style="font-style: italic; color: #555; background: #f9f9f9; padding: 15px; border-left: 4px solid #4f46e5; margin: 10px 0; border-radius: 4px;">
              "${message}"
            </blockquote>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p>Best regards,<br /><strong>The wordIzy Team</strong></p>
          </div>
        `,
      });

      // 🎯 ACTION B: DUAL-ROUTING (Send a separate structural copy instantly to your personal reader inbox)
      await resend.emails.send({
        from: "wordIzy System <support.wordizy.com>",
        to: "info.wordizy@proton.me", // 👈 Type your primary personal reader email address here!
        subject: `🔔 New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 8px; color: #333;">
            <h2 style="color: #ea580c; border-bottom: 2px solid #ea580c; padding-bottom: 8px; margin-top: 0;">New Inbox Submission Received</h2>
            <p><strong>Sender Name:</strong> ${name}</p>
            <p><strong>Sender Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Locale Code:</strong> ${locale || "en"}</p>
            <p><strong>IP Location:</strong> ${ip || "Unknown"}</p>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #ea580c; margin-top: 15px; border-radius: 4px;">
              <p style="margin: 0; font-style: italic; white-space: pre-wrap;">"${message}"</p>
            </div>
          </div>
        `,
      });
    } else {
      console.warn("Resend skipped: RESEND_API_KEY environment variable is not defined.");
    }

    return NextResponse.json({ success: true, data: savedMessage });

  } catch (error) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
