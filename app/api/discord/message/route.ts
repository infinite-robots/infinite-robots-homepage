import { DISCORD_API, isChatThread, isSnowflake } from "@/lib/discord";
import {
  createRateLimiter,
  getClientIP,
  jsonResponse,
  tooManyRequests,
} from "@/lib/rate-limit";

export const runtime = "edge";

const isRateLimited = createRateLimiter({ limit: 60, windowMs: 10 * 60_000 });

// Discord caps message content at 2000 characters; longer text (usually a
// long AI reply) is truncated rather than rejected. Anything past
// MAX_CONTENT_LENGTH isn't a real chat message.
const DISCORD_MESSAGE_MAX_LENGTH = 2000;
const MAX_CONTENT_LENGTH = 20_000;

export async function POST(req: Request) {
  try {
    // Get client IP address
    const clientIP = getClientIP(req);
    if (isRateLimited(clientIP ?? "unknown")) {
      return tooManyRequests();
    }

    const { threadId, content, role } = await req.json();

    if (!threadId || !content || !role) {
      return new Response(
        JSON.stringify({ error: "threadId, content, and role are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    if (typeof content !== "string" || content.length > MAX_CONTENT_LENGTH) {
      return new Response(
        JSON.stringify({
          error: `Content must be a string and less than ${MAX_CONTENT_LENGTH} characters`,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Validate role
    if (role !== "user" && role !== "assistant") {
      return new Response(
        JSON.stringify({ error: "role must be 'user' or 'assistant'" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    if (!isSnowflake(threadId)) {
      return jsonResponse({ error: "Invalid threadId" }, 400);
    }

    const botToken = process.env.DISCORD_BOT_TOKEN;
    const channelId = process.env.DISCORD_CHANNEL_ID;

    if (!botToken || !channelId) {
      return new Response(JSON.stringify({ error: "Discord not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!(await isChatThread(threadId, botToken, channelId))) {
      return jsonResponse({ error: "Unknown thread" }, 403);
    }

    // Format message for Discord
    const formattedMessage = formatDiscordMessage({
      content,
      role,
      clientIP,
    });

    // Post message to thread using Bot API
    const response = await fetch(
      `${DISCORD_API}/channels/${threadId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bot ${botToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: formattedMessage,
          // Never let chat text ping @everyone/@here, roles or users.
          allowed_mentions: { parse: [] },
        }),
      },
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Failed to post to Discord:", error);
      return new Response(JSON.stringify({ error: "Failed to post message" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error posting to Discord:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

function formatDiscordMessage(message: {
  content: string;
  role: "user" | "assistant";
  clientIP?: string | null;
}): string {
  const ipLabel = message.clientIP ? ` (${message.clientIP})` : "";
  const header =
    message.role === "user" ? `**User${ipLabel}:**` : `**AI Assistant:**`;
  const formatted = `${header}\n${message.content}`;
  return formatted.length > DISCORD_MESSAGE_MAX_LENGTH
    ? `${formatted.slice(0, DISCORD_MESSAGE_MAX_LENGTH - 1)}…`
    : formatted;
}
