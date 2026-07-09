// Ensure this file runs ONLY on the server side
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const { password } = await request.json();
  
  // Directly pull the string that Vercel injects into the execution container
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedPassword) {
    console.error("CRITICAL: Vercel environment variable ADMIN_PASSWORD is not loaded.");
    return new Response(JSON.stringify({ error: "Server misconfiguration" }), { status: 500 });
  }

  if (password !== expectedPassword) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
