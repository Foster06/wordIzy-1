import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { name, email, message, locale } = await request.json();
    
    // 1. Extract request headers
    const reqHeaders = await headers();
    const userAgent = reqHeaders.get("user-agent") || null;
    
    // Vercel routes real IPs through x-forwarded-for.
    // If it's a chain of proxy IPs, we grab the first one (the user's real IP).
    const forwardedFor = reqHeaders.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : null;

    // 2. Save to Turso
    const savedMessage = await db.contactMessage.create({
      data: {
        name,
        email,
        message,
        locale: locale || "en",
        handled: false,
        ip,          // Populated safely for anti-spam tracking
        userAgent,   // Saved to troubleshoot form display bugs
      },
    });

    return NextResponse.json({ success: true, data: savedMessage });
  } catch (error) {
    console.error("Contact form processing error:", error);
    return NextResponse.json({ error: "Failed to process form message" }, { status: 500 });
  }
}
