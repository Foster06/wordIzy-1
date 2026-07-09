import { NextResponse } from "next/server";

// Forces Next.js to treat this as a runtime-only API route
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ message: "Hello, world!" });
}
