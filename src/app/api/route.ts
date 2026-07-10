import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Resend } from "resend";
import { db } from "@/lib/db";

// Force runtime execution so environment variables load cleanly on Vercel
export const dynamic = "force-dynamic";

// Initialize the Resend client using your Vercel Environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

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

    // 4. Trigger Resend to automatically email the user back
    // (Note: While testing with a free Resend account, the 'to' address 
    // must be your own account email until you verify your domain inside Resend)
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "wordIzy <onboarding@resend.dev>", // Replace with support@wordizy.com after DNS verification
        to: email, 
        subject: `Thank you for contacting wordIzy, ${name}!`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #4f46e5;">We received your message!</h2>
            <p>Hello ${name},</p>
            <p>Thank you for reaching out to wordIzy. This is an automated confirmation to let you know we've received your submission.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p><strong>A copy of your message:</strong></p>
            <blockquote style="font-style: italic; color: #555; background: #f9f9f9; padding: 15px; border-left: 4px solid #4f46e5; margin: 10px 0;">
              "${message}"
            </blockquote>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p>Best regards,<br />The wordIzy Team</p>
          </div>
        `,
      });
    } else {
      console.warn("Resend skipped: RESEND_API_KEY environment variable is not defined on Vercel.");
    }

    return NextResponse.json({ success: true, data: savedMessage });

  } catch (error) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
