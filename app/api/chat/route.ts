import { anthropic, type AnthropicProviderOptions } from "@ai-sdk/anthropic";
import {
  streamText,
  toUIMessageStream,
  createUIMessageStreamResponse,
  convertToModelMessages,
  type UIMessage,
} from "ai";
import { CHAT_SYSTEM_PROMPT } from "@/lib/prompts/chat-system-prompt";
import {
  createRateLimiter,
  getClientIP,
  jsonResponse,
  tooManyRequests,
} from "@/lib/rate-limit";

export const runtime = "edge";

// The widget resends stored history with every message, so long-lived chats
// are trimmed to the most recent turns rather than rejected.
const MAX_HISTORY_MESSAGES = 30;
const MAX_MESSAGE_CHARS = 2_000;
const MAX_TOTAL_CHARS = 30_000;
// Includes thinking tokens; site Q&A replies are short.
const MAX_OUTPUT_TOKENS = 2_048;

const isRateLimited = createRateLimiter({ limit: 20, windowMs: 5 * 60_000 });

function messageText(message: UIMessage): string {
  return message.parts
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("");
}

function validateMessages(raw: unknown): UIMessage[] | string {
  if (!Array.isArray(raw) || raw.length === 0) {
    return "messages must be a non-empty array";
  }

  const messages = (raw as UIMessage[]).slice(-MAX_HISTORY_MESSAGES);

  for (const message of messages) {
    if (
      !message ||
      (message.role !== "user" && message.role !== "assistant") ||
      !Array.isArray(message.parts) ||
      // Only plain text is accepted from the browser: no files or tool parts.
      message.parts.some((part) => part?.type !== "text")
    ) {
      return "Invalid message";
    }
  }

  const last = messages[messages.length - 1];
  if (last.role !== "user") return "Last message must be from the user";
  if (messageText(last).length > MAX_MESSAGE_CHARS) {
    return `Messages must be under ${MAX_MESSAGE_CHARS} characters`;
  }

  const total = messages.reduce((sum, m) => sum + messageText(m).length, 0);
  if (total > MAX_TOTAL_CHARS) return "Conversation is too long";

  return messages;
}

export async function POST(req: Request) {
  try {
    if (isRateLimited(getClientIP(req) ?? "unknown")) {
      return tooManyRequests();
    }

    const { messages: rawMessages } = await req.json();
    const messages = validateMessages(rawMessages);
    if (typeof messages === "string") {
      return jsonResponse({ error: messages }, 400);
    }

    // Convert UIMessages to ModelMessages for streamText
    // Previous messages are now included in the messages array (prepended on first message)
    const modelMessages = await convertToModelMessages(messages);

    // Stream AI response (no Discord involvement - that's handled client-side)
    const result = streamText({
      model: anthropic("claude-haiku-5-5"),
      instructions: CHAT_SYSTEM_PROMPT,
      messages: modelMessages,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      // Haiku 5.5 thinks adaptively; low effort keeps chat replies quick.
      providerOptions: {
        anthropic: { effort: "low" } satisfies AnthropicProviderOptions,
      },
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({
        stream: result.stream,
        // Stream errors surface after the 200/SSE handshake, so they never reach
        // the catch below. Log them here; the client only needs to know that
        // something failed so the widget can flip to its offline state.
        onError: (error) => {
          console.error("Chat stream error:", error);
          return "An error occurred.";
        },
      }),
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
