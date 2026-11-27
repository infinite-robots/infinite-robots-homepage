const DISCORD_API = "https://discord.com/api/v10";

/** Discord IDs ("snowflakes") are 17-20 digit integers. */
export function isSnowflake(value: unknown): value is string {
  return typeof value === "string" && /^\d{17,20}$/.test(value);
}

// Threads already confirmed to belong to the chat channel. Per-instance, so
// each cold start re-checks a thread once.
const verifiedThreads = new Set<string>();

/**
 * True only for threads created under the chat log channel, so the public
 * message endpoint can't be used to post into any other channel the bot
 * can see.
 */
export async function isChatThread(
  threadId: string,
  botToken: string,
  channelId: string,
): Promise<boolean> {
  if (verifiedThreads.has(threadId)) return true;

  const response = await fetch(`${DISCORD_API}/channels/${threadId}`, {
    headers: { Authorization: `Bot ${botToken}` },
  });
  if (!response.ok) return false;

  const channel = (await response.json()) as { parent_id?: string | null };
  if (channel.parent_id !== channelId) return false;

  verifiedThreads.add(threadId);
  return true;
}

export { DISCORD_API };
