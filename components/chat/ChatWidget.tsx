"use client";

import { Bot, Send } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useChatContext } from "@/components/chat/ChatContext";
import { useAIGateway } from "@/hooks/useAIGateway";
import { useDiscord } from "@/hooks/useDiscord";

/**
 * Chat Widget component with AI integration and Discord logging
 */

// Type for message parts
type MessagePart = {
  type: string;
  text?: string;
  content?: string;
};

// Type for messages from useChat
type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  parts?: MessagePart[];
  content?: string | MessagePart[];
};

// Type for stored messages in localStorage
type StoredMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: number;
};

const STORED_MESSAGES_KEY = "ir-chat-messages";
const MAX_STORED_MESSAGES = 10;

export function ChatWidget() {
  const { isOpen } = useChatContext();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasLoadedPreviousMessages, setHasLoadedPreviousMessages] =
    useState(false);
  const [previousMessagesTimestamp, setPreviousMessagesTimestamp] = useState<
    number | null
  >(null);

  // Use AI Gateway hook for chat functionality
  const {
    messages,
    sendMessage,
    status,
    error,
    id: chatId,
    setMessages,
  } = useAIGateway();

  // Use Discord hook for logging
  const { logToDiscord, isDiscordOffline } = useDiscord(chatId);

  // Track overall connection status (AI Gateway + Discord)
  // Offline if either service fails (non-200 response)
  const isOffline = !!error || isDiscordOffline;

  // Load previous messages from localStorage on mount and add them to useChat's messages array
  // This is intentional - we're loading initial state from localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && !hasLoadedPreviousMessages) {
      try {
        const stored = localStorage.getItem(STORED_MESSAGES_KEY);
        console.log("[ChatWidget] Loading from localStorage:", {
          hasStored: !!stored,
          storedLength: stored ? JSON.parse(stored).length : 0,
        });
        if (stored) {
          const parsed = JSON.parse(stored) as StoredMessage[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            console.log("[ChatWidget] Loaded previousMessages:", {
              count: parsed.length,
              messages: parsed.map((m) => ({
                role: m.role,
                textLength: m.text.length,
              })),
            });

            // Convert to UIMessage format and add to useChat's messages array
            const previousUIMessages = parsed.map((msg) => ({
              id: `prev-${msg.id}`,
              role: msg.role,
              parts: [{ type: "text" as const, text: msg.text }],
            }));

            // Store the timestamp of the last previous message for the separator
            const lastTimestamp = parsed[parsed.length - 1]?.timestamp;
            if (lastTimestamp) {
              // eslint-disable-next-line react-hooks/set-state-in-effect
              setPreviousMessagesTimestamp(lastTimestamp);
            }

            // Set messages to include previous messages
            // This ensures they're in the messages array when sendMessage is called
            setMessages(previousUIMessages as typeof messages);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setHasLoadedPreviousMessages(true);

            // Scroll to bottom after messages are loaded
            setTimeout(() => {
              messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }
        }
      } catch (err) {
        console.error("Failed to load previous messages:", err);
      }
    }
  }, [hasLoadedPreviousMessages, setMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      // Use setTimeout to ensure DOM has rendered
      setTimeout(() => {
        scrollToBottom();
      }, 50);
    }
  }, [messages]);

  // Scroll to bottom when widget opens (if there are messages)
  useEffect(() => {
    if (isOpen && messages.length > 0) {
      // Use setTimeout to ensure DOM has rendered
      setTimeout(() => {
        scrollToBottom();
      }, 150);
    }
  }, [isOpen, messages.length]);

  // Helper to get text content from a message
  // UIMessage has a `parts` array with text parts
  const getMessageText = useCallback((message: ChatMessage): string => {
    if (Array.isArray(message.parts)) {
      return message.parts
        .filter((part) => part.type === "text")
        .map((part) => part.text || "")
        .join("");
    }
    if (typeof message.content === "string") {
      return message.content;
    }
    if (Array.isArray(message.content)) {
      return message.content
        .filter((part) => part.type === "text" || part.type === "input_text")
        .map((part) => part.text || part.content || "")
        .join("");
    }
    return "";
  }, []);

  // Log AI responses to Discord when streaming completes
  // Track previous status to detect the transition from "streaming" to "ready"
  const prevStatusRef = useRef<string>(status);

  useEffect(() => {
    // Update ref on every status change
    const wasStreaming = prevStatusRef.current === "streaming";
    const isNowReady = status === "ready";
    prevStatusRef.current = status;

    // Only log when we just finished streaming (transition from streaming to ready)
    if (wasStreaming && isNowReady) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.role === "assistant") {
        const messageText = getMessageText(lastMessage as ChatMessage);
        if (messageText) {
          logToDiscord(messageText, "assistant").catch((err) => {
            console.error("Failed to log AI response to Discord:", err);
          });

          // Save all messages to localStorage (keep last 10)
          // Messages array now includes both previous and current messages
          if (typeof window !== "undefined") {
            try {
              // Convert all messages from useChat to StoredMessage format
              // Filter out messages without text content
              // Strip "prev-" prefix when saving (it's only for UI distinction)
              const messagesToSave: StoredMessage[] = messages
                .filter(
                  (msg) => msg.role === "user" || msg.role === "assistant",
                )
                .map((msg) => {
                  const text = getMessageText(msg as ChatMessage);
                  // Remove "prev-" prefix if present (it's only for UI, not storage)
                  const originalId = msg.id.startsWith("prev-")
                    ? msg.id.replace("prev-", "")
                    : msg.id;
                  return {
                    id: originalId,
                    role: msg.role as "user" | "assistant",
                    text,
                    timestamp: Date.now(),
                  };
                })
                .filter((msg) => msg.text.length > 0); // Only save messages with content

              // Keep only the last MAX_STORED_MESSAGES
              const latestMessages = messagesToSave.slice(-MAX_STORED_MESSAGES);
              localStorage.setItem(
                STORED_MESSAGES_KEY,
                JSON.stringify(latestMessages),
              );
            } catch (err) {
              console.error("Failed to save messages to localStorage:", err);
            }
          }
        }
      }
    }
  }, [messages, status, logToDiscord, getMessageText]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status !== "ready" || isOffline) return;

    const messageText = input.trim();

    // Clear input immediately for better UX
    setInput("");

    // sendMessage will automatically include all messages in the array
    // Previous messages are already in the messages array (loaded on mount)
    sendMessage({ text: messageText });

    // Log user message to Discord separately (non-blocking)
    logToDiscord(messageText, "user").catch((err) => {
      console.error("Failed to log user message to Discord:", err);
    });
  };

  const isLoading = status === "submitted" || status === "streaming";

  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-16 z-50 w-full">
      <div className="container mx-auto pl-3">
        <div className="flex h-[600px] w-[400px] flex-col overflow-hidden rounded-b-xl border-2 border-t-0 border-zinc-400 bg-zinc-200 shadow-2xl dark:border-zinc-600 dark:bg-zinc-800">
          {/* Status bar - thin techy header */}
          <div className="flex items-center justify-between border-b border-zinc-300 bg-zinc-300 px-4 py-1.5 dark:border-zinc-700 dark:bg-zinc-800">
            <div className="flex items-center gap-2">
              <div className="relative flex h-2 w-2 items-center">
                {isOffline ? (
                  <>
                    <span className="absolute h-2 w-2 rounded-full bg-red-500"></span>
                    <span className="absolute h-2 w-2 rounded-full bg-red-500 opacity-75"></span>
                  </>
                ) : (
                  <>
                    <span className="absolute h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                    <span className="absolute h-2 w-2 rounded-full bg-green-500 opacity-75"></span>
                  </>
                )}
              </div>
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                {isOffline ? "Offline" : "Online"}
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-zinc-200 p-5 dark:bg-zinc-900/50">
            {isOffline ? (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-300 dark:bg-zinc-700">
                    <Bot className="h-6 w-6 text-zinc-700 dark:text-zinc-400" />
                  </div>
                  <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    Chat service offline, try again later.
                  </p>
                </div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-300 dark:bg-zinc-700">
                    <Bot className="h-6 w-6 text-zinc-700 dark:text-zinc-400" />
                  </div>
                  <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    Hi! How can we help?
                  </p>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    Ask us about our services, pricing, or anything else.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {/* All messages from useChat (includes previous + current) */}
                {messages.map((message, index) => {
                  const messageText = getMessageText(message as ChatMessage);
                  const isPreviousMessage = message.id.startsWith("prev-");
                  const isLastPreviousMessage =
                    isPreviousMessage &&
                    (index === messages.length - 1 ||
                      !messages[index + 1]?.id.startsWith("prev-"));

                  return (
                    <div key={message.id}>
                      <div
                        className={`flex ${
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] break-words rounded-xl px-4 py-2.5 shadow-sm ${
                            message.role === "user"
                              ? "bg-zinc-500 text-white ring-1 ring-zinc-400 dark:bg-zinc-600 dark:ring-zinc-500"
                              : "bg-zinc-100 text-zinc-900 ring-1 ring-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700"
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                            {messageText}
                          </p>
                        </div>
                      </div>

                      {/* Separator after last previous message */}
                      {isLastPreviousMessage && previousMessagesTimestamp && (
                        <div className="my-4 flex items-center gap-3">
                          <div className="flex-1 border-t border-zinc-400 dark:border-zinc-600"></div>
                          <span className="text-xs text-zinc-600 dark:text-zinc-400">
                            Resuming chat session from{" "}
                            {new Date(
                              previousMessagesTimestamp,
                            ).toLocaleDateString()}
                          </span>
                          <div className="flex-1 border-t border-zinc-400 dark:border-zinc-600"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-xl bg-zinc-100 px-4 py-2.5 ring-1 ring-zinc-300 dark:bg-zinc-800 dark:ring-zinc-700">
                      <div className="flex gap-1.5">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-600 [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-600 [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-600"></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 border-t border-zinc-300 bg-zinc-200 p-4 dark:border-zinc-700 dark:bg-zinc-800"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading || isOffline}
              className="flex-1 rounded-lg border-2 border-zinc-400 bg-zinc-100 px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-zinc-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500 dark:focus:bg-zinc-800 dark:focus:ring-zinc-500/20 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim() || isOffline}
              aria-label="Send message"
              className="flex items-center justify-center rounded-lg bg-zinc-500 px-4 py-2 text-white transition-colors hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-600 dark:hover:bg-zinc-500"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
