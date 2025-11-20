export const runtime = "edge";

function getClientIP(req: Request): string | null {
  // Try various headers that might contain the IP
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(",")[0].trim();
  }

  const realIP = req.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }

  const cfConnectingIP = req.headers.get("cf-connecting-ip"); // Cloudflare
  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  return null;
}

// Discord message content limit (2000 characters)
const DISCORD_MESSAGE_MAX_LENGTH = 2000;

export async function POST(req: Request) {
  try {
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

    // Validate content length (Discord limit is 2000 characters)
    if (
      typeof content !== "string" ||
      content.length > DISCORD_MESSAGE_MAX_LENGTH
    ) {
      return new Response(
        JSON.stringify({
          error: `Content must be a string and less than ${DISCORD_MESSAGE_MAX_LENGTH} characters`,
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

    const botToken = process.env.DISCORD_BOT_TOKEN;

    if (!botToken) {
      return new Response(JSON.stringify({ error: "Discord not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get client IP address
    const clientIP = getClientIP(req);

    // Format message for Discord
    const formattedMessage = formatDiscordMessage({
      content,
      role,
      clientIP,
    });

    // Post message to thread using Bot API
    const response = await fetch(
      `https://discord.com/api/v10/channels/${threadId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bot ${botToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: formattedMessage,
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
  if (message.role === "user") {
    const ipLabel = message.clientIP ? ` (${message.clientIP})` : "";
    return `**User${ipLabel}:**\n${message.content}`;
  }
  return `**AI Assistant:**\n${message.content}`;
}
