"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Bot, Send } from "lucide-react";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useChatContext } from "@/components/chat/ChatContext";

/**
 * Chat Widget component with AI integration and Discord logging
 */

const STORAGE_KEY = "ir-chat-session";
const STORAGE_MESSAGES_KEY = "ir-chat-messages";
const STORAGE_THREAD_KEY = "ir-discord-thread";
const MAX_STORED_MESSAGES = 10;

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

export function ChatWidget() {
  const { isOpen } = useChatContext();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [discordThreadId, setDiscordThreadId] = useState<string | null>(null);

  // Load session data from localStorage on mount
  const [initialSessionId, setInitialSessionId] = useState<string | undefined>(
    undefined,
  );
  const [initialMessages, setInitialMessages] = useState<
    ChatMessage[] | undefined
  >(undefined);

  useEffect(() => {
    // SSR safety: only access localStorage on client
    if (typeof window === "undefined") return;

    // Load saved session
    const savedSessionId = localStorage.getItem(STORAGE_KEY);
    const savedMessages = localStorage.getItem(STORAGE_MESSAGES_KEY);
    const savedThreadId = localStorage.getItem(STORAGE_THREAD_KEY);

    // Initialize state from localStorage on mount - this is intentional
    if (savedSessionId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInitialSessionId(savedSessionId);
    }

    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        // Only keep last 10 messages
        const limitedMessages = parsed.slice(-MAX_STORED_MESSAGES);

        setInitialMessages(limitedMessages);
      } catch (e) {
        console.error("Failed to parse saved messages:", e);
      }
    }

    if (savedThreadId) {
      setDiscordThreadId(savedThreadId);
    }
  }, []);

  // Save thread ID to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (discordThreadId) {
      localStorage.setItem(STORAGE_THREAD_KEY, discordThreadId);
    }
  }, [discordThreadId]);

  // Use default transport - simple and clean
  const transport = useMemo(() => {
    return new DefaultChatTransport({
      api: "/api/chat",
    });
  }, []);

  const {
    messages,
    sendMessage,
    status,
    error,
    id: chatId,
    setMessages,
  } = useChat({
    id: initialSessionId,
    transport,
  });

  // Restore messages after component mounts
  useEffect(() => {
    if (
      initialMessages &&
      initialMessages.length > 0 &&
      messages.length === 0
    ) {
      // Cast to UIMessage[] since these are messages that came from useChat originally
      setMessages(initialMessages as unknown as typeof messages);
    }
  }, [initialMessages, messages.length, setMessages]);

  // Save chatId to localStorage when it changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (chatId) {
      localStorage.setItem(STORAGE_KEY, chatId);
    }
  }, [chatId]);

  // Save messages to localStorage (limit to last 10)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (messages.length > 0) {
      const limitedMessages = messages.slice(-MAX_STORED_MESSAGES);
      localStorage.setItem(
        STORAGE_MESSAGES_KEY,
        JSON.stringify(limitedMessages),
      );
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
          console.error("Failed to create Discord thread");
          return null;
        }

        const data = await response.json();
        if (data.threadId) {
          setDiscordThreadId(data.threadId);
          return data.threadId;
        }
        return null;
      } catch (error) {
        console.error("Error creating Discord thread:", error);
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
          console.error("Failed to log message to Discord");
        }
      } catch (error) {
        console.error("Error logging to Discord:", error);
      }
    },
    [discordThreadId, chatId, getOrCreateDiscordThread],
  );

  // Helper to get text content from a message
  // UIMessage has a `parts` array with text parts
  const getMessageText = (message: ChatMessage): string => {
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
  };

  // Track previous status to detect when streaming completes
  const prevStatusRef = useRef<string>(status);

  // Log AI responses to Discord only when streaming just completed
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    const justFinishedStreaming =
      prevStatusRef.current === "streaming" && status === "ready";

    if (
      lastMessage &&
      lastMessage.role === "assistant" &&
      justFinishedStreaming // Only log when we just finished streaming (not on restore)
    ) {
      const messageText = getMessageText(lastMessage as ChatMessage);
      if (messageText) {
        // Log to Discord asynchronously - this is fire-and-forget, not a state update
        // eslint-disable-next-line react-hooks/set-state-in-effect
        logToDiscord(messageText, "assistant").catch((err) => {
          console.error("Failed to log AI response to Discord:", err);
        });
      }
    }

    prevStatusRef.current = status;
  }, [messages, status, logToDiscord]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status !== "ready") return;

    const messageText = input.trim();

    // Send message to AI (no Discord involvement)
    sendMessage({ text: messageText });
    setInput("");

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
                <span className="absolute h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                <span className="absolute h-2 w-2 rounded-full bg-green-500 opacity-75"></span>
              </div>
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Online
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-zinc-200 p-5 dark:bg-zinc-900/50">
            {messages.length === 0 ? (
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
                {messages.map((message) => {
                  const messageText = getMessageText(message as ChatMessage);
                  return (
                    <div
                      key={message.id}
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
                {error && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-xl bg-red-50 px-4 py-2.5 text-red-800 ring-1 ring-red-200 dark:bg-red-900/20 dark:text-red-400 dark:ring-red-900/30">
                      <p className="text-sm">Error: {error.message}</p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="border-t-2 border-zinc-300 bg-zinc-300 p-3.5 dark:border-zinc-700 dark:bg-zinc-800"
          >
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 rounded-lg border-2 border-zinc-400 bg-zinc-100 px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-zinc-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500 dark:focus:bg-zinc-800 dark:focus:ring-zinc-500/20 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex cursor-pointer items-center justify-center rounded-lg bg-zinc-700 px-4 py-2 text-white shadow-sm transition-all hover:bg-zinc-600 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500/40 dark:bg-zinc-600 dark:hover:bg-zinc-500"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
