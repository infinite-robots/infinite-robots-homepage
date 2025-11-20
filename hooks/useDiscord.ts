"use client";

import { useCallback, useState } from "react";

/**
 * Hook for Discord logging functionality
 * Handles thread creation and message logging to Discord
 * Tracks offline state based on non-200 responses
 */
export function useDiscord(chatId: string | undefined) {
  const [discordThreadId, setDiscordThreadId] = useState<string | null>(null);
  const [isDiscordOffline, setIsDiscordOffline] = useState(false);

  // Get or create Discord thread (only called when needed for logging)
  const getOrCreateDiscordThread = useCallback(
    async (firstMessage?: string): Promise<string | null> => {
      // If we already have a thread ID, use it
      if (discordThreadId) {
        return discordThreadId;
      }

      // Need chatId to create thread
      if (!chatId) {
        return null;
      }

      // Create a new thread
      try {
        const response = await fetch("/api/discord/thread", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatId,
            firstMessage: firstMessage || "Chat session started",
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to create Discord thread:", errorText);
          setIsDiscordOffline(true);
          return null;
        }

        // Success - clear offline state
        setIsDiscordOffline(false);

        const data = await response.json();
        if (data.threadId) {
          setDiscordThreadId(data.threadId);
          return data.threadId;
        }
        return null;
      } catch (error) {
        console.error("Error creating Discord thread:", error);
        setIsDiscordOffline(true);
        return null;
      }
    },
    [discordThreadId, chatId],
  );

  // Log message to Discord (completely separate from AI chat)
  const logToDiscord = useCallback(
    async (content: string, role: "user" | "assistant") => {
      // Get or create thread if needed
      let threadId = discordThreadId;
      if (!threadId && chatId) {
        threadId = await getOrCreateDiscordThread(content);
      }

      if (!threadId) {
        return; // Can't log without a thread
      }

      try {
        const response = await fetch("/api/discord/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            threadId,
            content,
            role,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to log message to Discord:", errorText);
          setIsDiscordOffline(true);
        } else {
          // Success - clear offline state
          setIsDiscordOffline(false);
        }
      } catch (error) {
        console.error("Error logging to Discord:", error);
        setIsDiscordOffline(true);
      }
    },
    [discordThreadId, chatId, getOrCreateDiscordThread],
  );

  return {
    logToDiscord,
    discordThreadId,
    isDiscordOffline,
  };
}
