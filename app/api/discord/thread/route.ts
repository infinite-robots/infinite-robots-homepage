/**
 * API route to create a Discord thread for a chat session
 * Thread ID is stored client-side in localStorage, so this endpoint just creates new threads
 */

export const runtime = "edge";

// Discord thread type constants
const DISCORD_THREAD_TYPE_PUBLIC = 11;
const DISCORD_AUTO_ARCHIVE_DURATION_24H = 1440; // minutes

export async function POST(req: Request) {
  try {
    const { chatId, firstMessage } = await req.json();

    if (!chatId) {
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
      `https://discord.com/api/v10/channels/${channelId}/threads`,
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
