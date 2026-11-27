/**
 * Best-effort, in-memory fixed-window rate limiter.
 *
 * State lives in the module scope of each serverless/edge instance, so a
 * determined attacker spread across many instances can exceed the limit. It
 * still stops the common case (one client hammering an endpoint) without
 * needing an external store.
 */
export function createRateLimiter({
  limit,
  windowMs,
}: {
  limit: number;
  windowMs: number;
}) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return function isRateLimited(
    key: string,
    now: number = Date.now(),
  ): boolean {
    // Drop expired entries so the map can't grow without bound.
    if (hits.size > 5_000) {
      for (const [k, entry] of hits) {
        if (entry.resetAt <= now) hits.delete(k);
      }
    }

    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return false;
    }

    entry.count += 1;
    return entry.count > limit;
  };
}

export function getClientIP(req: Request): string | null {
  // On Vercel, x-forwarded-for is set by the platform; its first entry is
  // the client. The others cover local dev and other proxies.
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return (
    req.headers.get("x-real-ip") ?? req.headers.get("cf-connecting-ip") ?? null
  );
}

export function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function tooManyRequests(): Response {
  return jsonResponse(
    { error: "Too many requests, please try again later" },
    429,
  );
}
