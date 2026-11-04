// IndexNow API endpoint — lets the site programmatically notify
// participating search engines (Bing, Yandex, Naver, Seznam, Yeah) when
// content changes, instead of waiting for organic crawl discovery.
//
// Usage:
//   POST /api/indexnow
//   Content-Type: application/json
//   Body: { "urls": ["https://wordizy.com/", "https://wordizy.com/blitz", ...] }
//   OR: ["https://wordizy.com/", "https://wordizy.com/blitz", ...]
//
// The endpoint forwards the URL list to the IndexNow API at
// https://api.indexnow.org/indexnow which fans out to all participating
// search engines. IndexNow accepts up to 10,000 URLs per request.
//
// Verification: the IndexNow key is hosted at
// https://wordizy.com/b84e9188-610f-48a6-a40c-44a7d805f295.txt
// (served as a static file from /public/). Search engines fetch this URL
// to verify ownership before accepting pings.

import { NextRequest, NextResponse } from "next/server";

// Public IndexNow key — safe to hardcode (it's served at a public URL for
// verification anyway). Env-overridable for different environments.
const INDEXNOW_KEY =
  process.env.NEXT_PUBLIC_INDEXNOW_KEY ??
  "b84e9188-610f-48a6-a40c-44a7d805f295";

// The URL where the key file is hosted. Search engines fetch this to verify
// the site owner controls the domain.
const INDEXNOW_KEY_LOCATION = `https://wordizy.com/${INDEXNOW_KEY}.txt`;

// The site host (without protocol).
const SITE_HOST = "wordizy.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Accept either a bare array of URLs or an object with a `urls` array.
    let urls: string[];
    if (Array.isArray(body)) {
      urls = body;
    } else if (body && Array.isArray(body.urls)) {
      urls = body.urls;
    } else if (body && typeof body.url === "string") {
      // Convenience: accept a single `url` string for one-off pings.
      urls = [body.url];
    } else {
      return NextResponse.json(
        { error: "Expected { urls: string[] } or a string[] body" },
        { status: 400 },
      );
    }

    if (urls.length === 0) {
      return NextResponse.json(
        { error: "urls array is empty — nothing to submit" },
        { status: 400 },
      );
    }

    // IndexNow accepts up to 10,000 URLs per request. Slice to be safe.
    const urlList = urls.slice(0, 10000);

    const payload = {
      host: SITE_HOST,
      key: INDEXNOW_KEY,
      keyLocation: INDEXNOW_KEY_LOCATION,
      urlList,
    };

    // POST to the generic IndexNow endpoint — fans out to all participating
    // search engines (Bing, Yandex, Naver, Seznam, Yeah). Content-Type MUST
    // be application/json; charset=utf-8 per the IndexNow spec.
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    // IndexNow status codes:
    //   200 — OK (URLs accepted)
    //   202 — Accepted (URLs queued for processing)
    //   400 — Bad request (invalid payload)
    //   403 — Forbidden (key verification failed — key file not reachable)
    //   422 — Unprocessable entity (key doesn't match keyLocation content)
    const ok = response.status === 200 || response.status === 202;

    return NextResponse.json(
      {
        status: response.status,
        submitted: urlList.length,
        ok,
        message: ok
          ? "URLs submitted to IndexNow — search engines will re-crawl shortly"
          : `IndexNow returned ${response.status} — check key file is reachable at ${INDEXNOW_KEY_LOCATION}`,
      },
      { status: ok ? 200 : response.status },
    );
  } catch (error) {
    console.error("[indexnow] POST failed:", error);
    return NextResponse.json(
      { error: "Failed to submit URLs to IndexNow" },
      { status: 500 },
    );
  }
}

// GET handler — returns the IndexNow key + keyLocation so callers can
// verify the setup is correct without inspecting the source. Also useful
// for health checks.
export async function GET() {
  return NextResponse.json({
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    host: SITE_HOST,
    endpoint: "https://api.indexnow.org/indexnow",
    usage: 'POST with { "urls": ["https://wordizy.com/..."] }',
  });
}
