"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useMemo } from "react";

/**
 * Hook for chat functionality
 * Handles transport setup and useChat initialization against /api/chat
 */
export function useAIChat() {
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
