import { anthropic } from "@ai-sdk/anthropic";
import {
  streamText,
  toUIMessageStream,
  createUIMessageStreamResponse,
  convertToModelMessages,
} from "ai";
import { CHAT_SYSTEM_PROMPT } from "@/lib/prompts/chat-system-prompt";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Convert UIMessages to ModelMessages for streamText
    // Previous messages are now included in the messages array (prepended on first message)
    const modelMessages = await convertToModelMessages(messages);

    // Stream AI response (no Discord involvement - that's handled client-side)
    const result = streamText({
      model: anthropic("claude-haiku-4-5"),
      instructions: CHAT_SYSTEM_PROMPT,
      messages: modelMessages,
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
