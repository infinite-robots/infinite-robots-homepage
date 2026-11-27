import { describe, expect, it } from "vitest";

import { createRateLimiter, getClientIP } from "./rate-limit";

describe("createRateLimiter", () => {
  it("allows up to the limit, then blocks until the window resets", () => {
    const isRateLimited = createRateLimiter({ limit: 2, windowMs: 1_000 });
    expect(isRateLimited("a", 0)).toBe(false);
    expect(isRateLimited("a", 10)).toBe(false);
    expect(isRateLimited("a", 20)).toBe(true);
    // Other keys are tracked separately.
    expect(isRateLimited("b", 20)).toBe(false);
    // A new window starts once the old one expires.
    expect(isRateLimited("a", 1_000)).toBe(false);
  });
});

describe("getClientIP", () => {
  it("takes the first x-forwarded-for entry", () => {
    const req = new Request("http://x", {
      headers: { "x-forwarded-for": "1.2.3.4, 10.0.0.1" },
    });
    expect(getClientIP(req)).toBe("1.2.3.4");
  });

  it("falls back to x-real-ip, then null", () => {
    expect(
      getClientIP(
        new Request("http://x", { headers: { "x-real-ip": "5.6.7.8" } }),
      ),
    ).toBe("5.6.7.8");
    expect(getClientIP(new Request("http://x"))).toBeNull();
  });
});
