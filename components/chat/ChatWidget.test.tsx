import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatWidget } from "./ChatWidget";

// Type for useChat return value
type UseChatReturn = {
  messages: Array<{
    id: string;
    role: "user" | "assistant";
    parts?: Array<{ type: string; text?: string }>;
    content?: string | Array<{ type: string; text?: string; content?: string }>;
  }>;
  sendMessage: (options: { text: string }) => void;
  status: "ready" | "submitted" | "streaming";
  error?: Error;
  id: string;
  setMessages: (messages: unknown[]) => void;
};

// Mock ALL fetch calls - never make real API requests in tests
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: async () => ({ threadId: "mock-thread-id" }),
  } as Response),
);

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock the useChat hook - NEVER make real AI API calls in tests
const mockSendMessage = vi.fn();
const mockSetMessages = vi.fn();
const mockUseChat = vi.fn(
  (): UseChatReturn => ({
    messages: [],
    sendMessage: mockSendMessage,
    status: "ready",
    error: undefined,
    id: "test-chat-id",
    setMessages: mockSetMessages,
  }),
);

vi.mock("@ai-sdk/react", () => ({
  useChat: () => mockUseChat(),
}));

// Mock DefaultChatTransport to prevent real API calls
// This ensures no real HTTP requests are made during tests
vi.mock("ai", async () => {
  const actual = await vi.importActual("ai");
  return {
    ...actual,
    DefaultChatTransport: class MockDefaultChatTransport {
      constructor() {}
      sendMessages = vi.fn(() => Promise.resolve(new ReadableStream()));
      reconnectToStream = vi.fn();
    },
  };
});

// Mock the ChatContext
const mockCloseChat = vi.fn();
const mockUseChatContext = vi.fn(() => ({
  isOpen: true,
  closeChat: mockCloseChat,
  showNotification: vi.fn(),
}));

vi.mock("./ChatContext", () => ({
  useChatContext: () => mockUseChatContext(),
}));

describe("ChatWidget", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    // Reset to default empty messages
    mockUseChat.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "test-chat-id",
      setMessages: mockSetMessages,
    });
    // Mock fetch to NEVER make real requests
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ threadId: "mock-thread-id" }),
    } as Response);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should display placeholder when no messages", () => {
    render(<ChatWidget />);
    expect(screen.getByText("Hi! How can we help?")).toBeInTheDocument();
  });

  it("should call sendMessage when form is submitted", async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    const input = screen.getByPlaceholderText("Type your message...");
    const sendButton = screen.getByLabelText("Send message");

    // Type a message
    await user.type(input, "Hello, this is a test");

    // Submit the form
    await user.click(sendButton);

    // Wait a bit for async operations
    await waitFor(() => {
      // Verify sendMessage was called (may be called with threadId)
      expect(mockSendMessage).toHaveBeenCalled();
    });

    // Input should be cleared
    expect(input).toHaveValue("");
  });

  it("should display messages from useChat", () => {
    // Mock useChat to return messages
    mockUseChat.mockReturnValue({
      messages: [
        {
          id: "msg-1",
          role: "user" as const,
          parts: [{ type: "text", text: "Hello, this is a test" }],
        },
      ],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "test-chat-id",
      setMessages: mockSetMessages,
    });

    render(<ChatWidget />);
    expect(screen.getByText("Hello, this is a test")).toBeInTheDocument();
  });

  it("should clear input after sending message", async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    const input = screen.getByPlaceholderText("Type your message...");
    const sendButton = screen.getByLabelText("Send message");

    await user.type(input, "Test message");
    await user.click(sendButton);

    // Input should be cleared immediately
    expect(input).toHaveValue("");
  });

  it("should not send empty messages", async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    const sendButton = screen.getByLabelText("Send message");

    // Try to send empty message
    await user.click(sendButton);

    // sendMessage should not be called
    expect(mockSendMessage).not.toHaveBeenCalled();

    // Should still show placeholder
    expect(screen.getByText("Hi! How can we help?")).toBeInTheDocument();
  });

  it("should handle Enter key to submit", async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    const input = screen.getByPlaceholderText("Type your message...");

    await user.type(input, "Message via Enter{Enter}");

    // Verify sendMessage was called (no options - Discord is separate)
    expect(mockSendMessage).toHaveBeenCalledWith({
      text: "Message via Enter",
    });
  });

  it("should show loading indicator when status is streaming", () => {
    mockUseChat.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "streaming",
      error: undefined,
      id: "test-chat-id",
      setMessages: mockSetMessages,
    });

    render(<ChatWidget />);
    // When streaming, the loading indicator should appear
    // Let's check if the input is disabled (which happens when loading)
    const input = screen.getByPlaceholderText("Type your message...");
    expect(input).toBeDisabled();
  });

  it("should show error message when error exists", () => {
    mockUseChat.mockReturnValue({
      messages: [
        {
          id: "msg-1",
          role: "user" as const,
          parts: [{ type: "text", text: "Test message" }],
        },
      ],
      sendMessage: mockSendMessage,
      status: "ready",
      error: { message: "Test error" } as Error,
      id: "test-chat-id",
      setMessages: mockSetMessages,
    });

    render(<ChatWidget />);
    // Error should be displayed in the messages area
    expect(screen.getByText(/Error: Test error/)).toBeInTheDocument();
  });

  it("should not render when isOpen is false", () => {
    mockUseChatContext.mockReturnValueOnce({
      isOpen: false,
      closeChat: mockCloseChat,
      showNotification: vi.fn(),
    });

    const { container } = render(<ChatWidget />);
    expect(container.firstChild).toBeNull();
  });

  it("should restore messages from localStorage on mount", async () => {
    const savedMessages = [
      {
        id: "msg-1",
        role: "user",
        parts: [{ type: "text", text: "Saved message" }],
      },
      {
        id: "msg-2",
        role: "assistant",
        parts: [{ type: "text", text: "Saved response" }],
      },
    ];

    localStorageMock.getItem.mockImplementation((key: string) => {
      if (key === "ir-chat-messages") {
        return JSON.stringify(savedMessages);
      }
      if (key === "ir-chat-session") {
        return "saved-chat-id";
      }
      if (key === "ir-discord-thread") {
        return "saved-thread-id";
      }
      return null;
    });

    const mockSetMessages = vi.fn();
    mockUseChat.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "saved-chat-id",
      setMessages: mockSetMessages,
    });

    render(<ChatWidget />);

    // Wait for useEffect to run
    await waitFor(() => {
      // Should call setMessages to restore
      expect(mockSetMessages).toHaveBeenCalledWith(savedMessages);
    });
  });

  it("should save messages to localStorage when messages change", () => {
    const messages = [
      {
        id: "msg-1",
        role: "user" as const,
        parts: [{ type: "text", text: "Message 1" }],
      },
      {
        id: "msg-2",
        role: "assistant" as const,
        parts: [{ type: "text", text: "Response 1" }],
      },
    ];

    mockUseChat.mockReturnValue({
      messages,
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "test-chat-id",
      setMessages: mockSetMessages,
    });

    render(<ChatWidget />);

    // Should save messages to localStorage
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "ir-chat-messages",
      JSON.stringify(messages),
    );
  });

  it("should save chatId to localStorage when it changes", () => {
    mockUseChat.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "new-chat-id",
      setMessages: vi.fn(),
    });

    render(<ChatWidget />);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "ir-chat-session",
      "new-chat-id",
    );
  });

  it("should handle Discord thread creation when logging first message", async () => {
    const user = userEvent.setup();
    mockUseChat.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "test-chat-id",
      setMessages: mockSetMessages,
    });

    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ threadId: "new-thread-id" }),
    } as Response);

    render(<ChatWidget />);

    const input = screen.getByPlaceholderText("Type your message...");
    await user.type(input, "First message");
    await user.click(screen.getByLabelText("Send message"));

    // Should attempt to create Discord thread
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/discord/thread",
        expect.objectContaining({
          method: "POST",
        }),
      );
    });
  });

  it("should log user message to Discord after sending", async () => {
    const user = userEvent.setup();
    localStorageMock.getItem.mockImplementation((key: string) => {
      if (key === "ir-discord-thread") {
        return "existing-thread-id";
      }
      return null;
    });

    mockUseChat.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "test-chat-id",
      setMessages: vi.fn(),
    });

    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    } as Response);

    render(<ChatWidget />);

    const input = screen.getByPlaceholderText("Type your message...");
    await user.type(input, "Test message");
    await user.click(screen.getByLabelText("Send message"));

    // Should log to Discord
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/discord/message",
        expect.objectContaining({
          method: "POST",
          body: expect.stringContaining("Test message"),
        }),
      );
    });
  });

  it("should handle getMessageText with parts array format", () => {
    mockUseChat.mockReturnValue({
      messages: [
        {
          id: "msg-1",
          role: "user" as const,
          parts: [{ type: "text", text: "Parts message" }],
        },
      ],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "test-chat-id",
      setMessages: mockSetMessages,
    });

    render(<ChatWidget />);
    expect(screen.getByText("Parts message")).toBeInTheDocument();
  });

  it("should handle getMessageText with string content format", () => {
    mockUseChat.mockReturnValue({
      messages: [
        {
          id: "msg-2",
          role: "assistant" as const,
          content: "String content",
        },
      ],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "test-chat-id",
      setMessages: mockSetMessages,
    });

    render(<ChatWidget />);
    expect(screen.getByText("String content")).toBeInTheDocument();
  });

  it("should handle getMessageText with array content format", () => {
    mockUseChat.mockReturnValue({
      messages: [
        {
          id: "msg-3",
          role: "assistant" as const,
          content: [
            { type: "text", text: "Array text" },
            { type: "input_text", text: "Input text" },
          ],
        },
      ],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "test-chat-id",
      setMessages: mockSetMessages,
    });

    render(<ChatWidget />);
    // Should extract text from array content - both text and input_text should be included
    expect(screen.getByText("Array textInput text")).toBeInTheDocument();
  });

  it("should not send message when status is not ready", async () => {
    const user = userEvent.setup();
    mockUseChat.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "streaming",
      error: undefined,
      id: "test-chat-id",
      setMessages: mockSetMessages,
    });

    render(<ChatWidget />);

    const input = screen.getByPlaceholderText("Type your message...");
    const sendButton = screen.getByLabelText("Send message");

    await user.type(input, "Test message");
    await user.click(sendButton);

    // Should not call sendMessage when status is not ready
    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  it("should log AI response to Discord when streaming completes", async () => {
    localStorageMock.getItem.mockImplementation((key: string) => {
      if (key === "ir-discord-thread") {
        return "existing-thread-id";
      }
      return null;
    });

    // First render with streaming status
    mockUseChat.mockReturnValue({
      messages: [
        {
          id: "msg-1",
          role: "assistant" as const,
          parts: [{ type: "text", text: "AI response" }],
        },
      ],
      sendMessage: mockSendMessage,
      status: "streaming",
      error: undefined,
      id: "test-chat-id",
      setMessages: mockSetMessages,
    });

    const { rerender } = render(<ChatWidget />);

    // Then update to ready status (simulating streaming completion)
    mockUseChat.mockReturnValue({
      messages: [
        {
          id: "msg-1",
          role: "assistant" as const,
          parts: [{ type: "text", text: "AI response" }],
        },
      ],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "test-chat-id",
      setMessages: mockSetMessages,
    });

    rerender(<ChatWidget />);

    // Should attempt to log to Discord
    await waitFor(
      () => {
        expect(global.fetch).toHaveBeenCalledWith(
          "/api/discord/message",
          expect.objectContaining({
            method: "POST",
          }),
        );
      },
      { timeout: 2000 },
    );
  });

  it("should handle error parsing saved messages from localStorage", () => {
    localStorageMock.getItem.mockImplementation((key: string) => {
      if (key === "ir-chat-messages") {
        return "invalid-json";
      }
      return null;
    });

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<ChatWidget />);

    // Should handle error gracefully
    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to parse saved messages:",
      expect.any(Error),
    );

    consoleSpy.mockRestore();
  });

  it("should limit stored messages to last 10", () => {
    const manyMessages = Array.from({ length: 15 }, (_, i) => {
      const role = i % 2 === 0 ? ("user" as const) : ("assistant" as const);
      return {
        id: `msg-${i}`,
        role,
        parts: [{ type: "text", text: `Message ${i}` }],
      };
    });

    mockUseChat.mockReturnValue({
      messages: manyMessages,
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "test-chat-id",
      setMessages: vi.fn(),
    });

    render(<ChatWidget />);

    // Should only save last 10 messages
    const setItemCalls = localStorageMock.setItem.mock.calls;
    const messagesCall = setItemCalls.find(
      (call) => call[0] === "ir-chat-messages",
    );
    expect(messagesCall).toBeDefined();
    if (messagesCall) {
      const savedMessages = JSON.parse(messagesCall[1]);
      expect(savedMessages).toHaveLength(10);
      expect(savedMessages[0].id).toBe("msg-5"); // First of last 10
    }
  });

  it("should handle Discord thread creation failure", async () => {
    const user = userEvent.setup();
    mockUseChat.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "test-chat-id",
      setMessages: vi.fn(),
    });

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    } as Response);

    render(<ChatWidget />);

    const input = screen.getByPlaceholderText("Type your message...");
    await user.type(input, "Test message");
    await user.click(screen.getByLabelText("Send message"));

    // Should handle error gracefully
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to create Discord thread",
      );
    });

    consoleSpy.mockRestore();
  });

  it("should handle Discord message logging failure", async () => {
    const user = userEvent.setup();
    localStorageMock.getItem.mockImplementation((key: string) => {
      if (key === "ir-discord-thread") {
        return "existing-thread-id";
      }
      return null;
    });

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    mockUseChat.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "test-chat-id",
      setMessages: vi.fn(),
    });

    vi.mocked(global.fetch).mockResolvedValue({
      ok: false,
      json: async () => ({}),
    } as Response);

    render(<ChatWidget />);

    const input = screen.getByPlaceholderText("Type your message...");
    await user.type(input, "Test message");
    await user.click(screen.getByLabelText("Send message"));

    // Should handle error gracefully
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to log message to Discord",
      );
    });

    consoleSpy.mockRestore();
  });

  it("should handle Discord thread creation error", async () => {
    const user = userEvent.setup();
    mockUseChat.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "test-chat-id",
      setMessages: vi.fn(),
    });

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    vi.mocked(global.fetch).mockRejectedValueOnce(new Error("Network error"));

    render(<ChatWidget />);

    const input = screen.getByPlaceholderText("Type your message...");
    await user.type(input, "Test message");
    await user.click(screen.getByLabelText("Send message"));

    // Should handle error gracefully
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error creating Discord thread:",
        expect.any(Error),
      );
    });

    consoleSpy.mockRestore();
  });

  it("should handle Discord message logging error", async () => {
    const user = userEvent.setup();
    localStorageMock.getItem.mockImplementation((key: string) => {
      if (key === "ir-discord-thread") {
        return "existing-thread-id";
      }
      return null;
    });

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    mockUseChat.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "test-chat-id",
      setMessages: vi.fn(),
    });

    vi.mocked(global.fetch).mockRejectedValueOnce(new Error("Network error"));

    render(<ChatWidget />);

    const input = screen.getByPlaceholderText("Type your message...");
    await user.type(input, "Test message");
    await user.click(screen.getByLabelText("Send message"));

    // Should handle error gracefully
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error logging to Discord:",
        expect.any(Error),
      );
    });

    consoleSpy.mockRestore();
  });

  it("should not log to Discord if threadId is not available", async () => {
    const user = userEvent.setup();
    mockUseChat.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "", // No chatId
      setMessages: mockSetMessages,
    });

    render(<ChatWidget />);

    const input = screen.getByPlaceholderText("Type your message...");
    await user.type(input, "Test message");
    await user.click(screen.getByLabelText("Send message"));

    // Should not attempt to create thread or log if no chatId
    await waitFor(() => {
      // Should not call Discord API
      const discordCalls = vi
        .mocked(global.fetch)
        .mock.calls.filter((call: unknown[]) => {
          const url = call[0] as string | undefined;
          return url?.includes("/api/discord");
        });
      expect(discordCalls.length).toBe(0);
    });
  });

  it("should handle empty message text in getMessageText", () => {
    mockUseChat.mockReturnValue({
      messages: [
        {
          id: "msg-1",
          role: "assistant" as const,
          content: [], // Empty array
        },
        {
          id: "msg-2",
          role: "assistant" as const,
          // No content or parts
        },
      ],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "test-chat-id",
      setMessages: mockSetMessages,
    });

    render(<ChatWidget />);
    // Should render without crashing even with empty messages
    // Messages exist, so placeholder won't show, but component should render
    const input = screen.getByPlaceholderText("Type your message...");
    expect(input).toBeInTheDocument();
  });
});
