/**
 * API route to create a Discord thread for a chat session
 * Thread ID is stored client-side in localStorage, so this endpoint just creates new threads
 */

import { DISCORD_API } from "@/lib/discord";
import {
  createRateLimiter,
  getClientIP,
  jsonResponse,
  tooManyRequests,
} from "@/lib/rate-limit";

export const runtime = "edge";

// A visitor normally needs one thread per browser; this only stops floods.
const isRateLimited = createRateLimiter({ limit: 5, windowMs: 60 * 60_000 });

// Discord thread type constants
const DISCORD_THREAD_TYPE_PUBLIC = 11;
const DISCORD_AUTO_ARCHIVE_DURATION_24H = 1440; // minutes

export async function POST(req: Request) {
  try {
    if (isRateLimited(getClientIP(req) ?? "unknown")) {
      return tooManyRequests();
    }

    const { chatId, firstMessage } = await req.json();

    if (
      typeof firstMessage !== "undefined" &&
      typeof firstMessage !== "string"
    ) {
      return jsonResponse({ error: "firstMessage must be a string" }, 400);
    }

    if (typeof chatId !== "string" || !chatId || chatId.length > 100) {
      return new Response(JSON.stringify({ error: "chatId is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const botToken = process.env.DISCORD_BOT_TOKEN;
    const channelId = process.env.DISCORD_CHANNEL_ID;

    if (!botToken || !channelId) {
      return new Response(JSON.stringify({ error: "Discord not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create new thread
    const threadName = `Chat ${chatId.slice(0, 8)} - ${new Date().toLocaleDateString()}`;
    const initialMessage = firstMessage
      ? `Chat session started. First message: "${firstMessage.substring(0, 200)}${firstMessage.length > 200 ? "..." : ""}"`
      : "New chat session started";

    const response = await fetch(
      `${DISCORD_API}/channels/${channelId}/threads`,
      {
        method: "POST",
        headers: {
          Authorization: `Bot ${botToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: threadName,
          type: DISCORD_THREAD_TYPE_PUBLIC,
          auto_archive_duration: DISCORD_AUTO_ARCHIVE_DURATION_24H,
          message: {
            content: initialMessage,
            allowed_mentions: { parse: [] },
          },
        }),
      },
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Failed to create Discord thread:", error);
      return new Response(
        JSON.stringify({ error: "Failed to create thread" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const thread = await response.json();

    return new Response(JSON.stringify({ threadId: thread.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in thread creation:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
