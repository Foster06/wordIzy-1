/**
 * Dispatches an anonymous interaction log straight to your own server endpoint
 */
export async function logPrivateEvent(word: string, toolName: string, langCode: string, type: "search" | "copy") {
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: word,
        route: toolName,
        lang: langCode,
        resultCount: 1,
        eventType: type, // Sends either "search" or "copy"
      }),
    });
  } catch (err) {
    console.error("Private tracker network log failed:", err);
  }
}
