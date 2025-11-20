import {
  streamText,
  createUIMessageStreamResponse,
  convertToModelMessages,
  createGateway,
} from "ai";
import { CHAT_SYSTEM_PROMPT } from "@/lib/prompts/chat-system-prompt";

export const runtime = "edge";

// Use Vercel AI Gateway - model-agnostic!
// Just specify the model as a string like "anthropic/claude-3.5-haiku"
// The gateway handles routing to the correct provider
const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Convert UIMessages to ModelMessages for streamText
    const modelMessages = convertToModelMessages(messages);

    // Stream AI response (no Discord involvement - that's handled client-side)
    const result = streamText({
      model: gateway("anthropic/claude-haiku-4.5"),
      system: CHAT_SYSTEM_PROMPT,
      messages: modelMessages,
    });

    const stream = result.toUIMessageStream();

    return createUIMessageStreamResponse({
      stream,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
