import { describe, expect, it } from "vitest";

import { detectSpam, isDottedGmail, MIN_FILL_TIME_MS } from "./contact-spam";

const NOW = 1_800_000_000_000;

function submission(overrides: Partial<Parameters<typeof detectSpam>[0]> = {}) {
  return {
    email: "jane.doe@gmail.com",
    projectDetails: "We'd like help adding AI search to our support docs.",
    honeypot: "",
    startedAt: String(NOW - 30_000),
    ...overrides,
  };
}

describe("isDottedGmail", () => {
  it.each([
    "c.in.a.la.wi.d8.43@gmail.com",
    "a.b.c.d@gmail.com",
    "x.y.z.w@GoogleMail.com",
  ])("flags %s", (email) => {
    expect(isDottedGmail(email)).toBe(true);
  });

  it.each([
    "janedoe@gmail.com",
    "jane.doe@gmail.com",
    "jane.q.doe@gmail.com",
    "a.b.c.d.e@company.com",
    "not-an-email",
  ])("allows %s", (email) => {
    expect(isDottedGmail(email)).toBe(false);
  });
});

describe("detectSpam", () => {
  it("passes a normal submission", () => {
    expect(detectSpam(submission(), NOW)).toBeNull();
  });

  it("catches a filled honeypot", () => {
    expect(detectSpam(submission({ honeypot: "https://x.io" }), NOW)).toBe(
      "honeypot",
    );
  });

  it("catches a missing or garbage timestamp", () => {
    expect(detectSpam(submission({ startedAt: null }), NOW)).toBe(
      "missing-timestamp",
    );
    expect(detectSpam(submission({ startedAt: "abc" }), NOW)).toBe(
      "missing-timestamp",
    );
  });

  it("catches submissions faster than a human could type", () => {
    expect(
      detectSpam(
        submission({ startedAt: String(NOW - MIN_FILL_TIME_MS + 1) }),
        NOW,
      ),
    ).toBe("too-fast");
    // A timestamp from the future is forged.
    expect(
      detectSpam(submission({ startedAt: String(NOW + 60_000) }), NOW),
    ).toBe("too-fast");
  });

  it("catches dotted gmail addresses", () => {
    expect(
      detectSpam(submission({ email: "c.in.a.la.wi.d8.43@gmail.com" }), NOW),
    ).toBe("dotted-gmail");
  });

  it("catches link-stuffed messages", () => {
    const projectDetails =
      "Visit https://a.example https://b.example and www.c.example";
    expect(detectSpam(submission({ projectDetails }), NOW)).toBe(
      "too-many-links",
    );
    expect(
      detectSpam(
        submission({ projectDetails: "Our site is https://acme.example" }),
        NOW,
      ),
    ).toBeNull();
  });
});
