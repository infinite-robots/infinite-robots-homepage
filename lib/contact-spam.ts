/**
 * Lightweight spam heuristics for the contact form. None of these need a
 * third-party service; each one catches a common class of form bot.
 */

/** Hidden field real people never see, so never fill in. */
export const HONEYPOT_FIELD = "website";
/** Hidden field holding the time (ms since epoch) the form was rendered. */
export const STARTED_AT_FIELD = "startedAt";

/** Faster than this and it wasn't a human typing. */
export const MIN_FILL_TIME_MS = 3_000;
const MAX_LINKS = 2;

const GMAIL_DOMAINS = new Set(["gmail.com", "googlemail.com"]);

export type SpamReason =
  | "honeypot"
  | "missing-timestamp"
  | "too-fast"
  | "dotted-gmail"
  | "too-many-links";

/**
 * Gmail ignores dots in the local part, so bots sprinkle them in
 * (c.in.a.la.wi.d8.43@gmail.com) to make one inbox look like many addresses.
 * Real people rarely use more than two (first.m.last@gmail.com).
 */
export function isDottedGmail(email: string): boolean {
  const at = email.lastIndexOf("@");
  if (at < 0) return false;
  const local = email.slice(0, at);
  const domain = email.slice(at + 1).toLowerCase();
  if (!GMAIL_DOMAINS.has(domain)) return false;
  const dots = local.split(".").length - 1;
  return dots >= 3;
}

function countLinks(text: string): number {
  return (text.match(/https?:\/\/|www\./gi) ?? []).length;
}

export function detectSpam(
  fields: {
    email: string;
    projectDetails: string;
    honeypot: string | null;
    startedAt: string | null;
  },
  now: number = Date.now(),
): SpamReason | null {
  if (fields.honeypot) return "honeypot";

  const startedAt = Number(fields.startedAt);
  if (!fields.startedAt || !Number.isFinite(startedAt)) {
    return "missing-timestamp";
  }
  if (now - startedAt < MIN_FILL_TIME_MS) return "too-fast";

  if (isDottedGmail(fields.email)) return "dotted-gmail";
  if (countLinks(fields.projectDetails) > MAX_LINKS) return "too-many-links";

  return null;
}
