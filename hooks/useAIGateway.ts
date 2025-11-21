"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useMemo } from "react";

/**
 * Hook for AI Gateway chat functionality
 * Handles transport setup and useChat initialization using Vercel AI Gateway
 */
export function useAIGateway() {
  // Use default transport - simple and clean
  const transport = useMemo(() => {
    return new DefaultChatTransport({
      api: "/api/chat",
    });
  }, []);

  const chat = useChat({
    transport,
  });

  return chat;
}
