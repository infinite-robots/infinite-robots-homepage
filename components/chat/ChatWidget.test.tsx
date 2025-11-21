import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatWidget } from "./ChatWidget";

// Type for useAIGateway return value
type UseAIGatewayReturn = {
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

// Type for useDiscord return value
type UseDiscordReturn = {
  logToDiscord: (content: string, role: "user" | "assistant") => Promise<void>;
  discordThreadId: string | null;
  isDiscordOffline: boolean;
};

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
});

// Mock the useAIGateway hook - NEVER make real AI API calls in tests
const mockSendMessage = vi.fn();
const mockSetMessages = vi.fn();
const mockUseAIGateway = vi.fn(
  (): UseAIGatewayReturn => ({
    messages: [],
    sendMessage: mockSendMessage,
    status: "ready",
    error: undefined,
    id: "test-chat-id",
    setMessages: mockSetMessages,
  }),
);

vi.mock("@/hooks/useAIGateway", () => ({
  useAIGateway: () => mockUseAIGateway(),
}));

// Mock the useDiscord hook
const mockLogToDiscord = vi.fn(() => Promise.resolve());
const mockUseDiscord = vi.fn(
  (): UseDiscordReturn => ({
    logToDiscord: mockLogToDiscord,
    discordThreadId: null,
    isDiscordOffline: false,
  }),
);

vi.mock("@/hooks/useDiscord", () => ({
  useDiscord: (chatId: string | undefined) => mockUseDiscord(chatId),
}));

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
    mockUseAIGateway.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "test-chat-id",
      setMessages: mockSetMessages,
    });
    // Reset Discord hook
    mockUseDiscord.mockReturnValue({
      logToDiscord: mockLogToDiscord,
      discordThreadId: null,
      isDiscordOffline: false,
    });
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

  it("should display messages from useAIGateway", () => {
    // Mock useAIGateway to return messages
    mockUseAIGateway.mockReturnValue({
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
    mockUseAIGateway.mockReturnValue({
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

  it("should show offline state when error exists", () => {
    mockUseAIGateway.mockReturnValue({
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
    // Error should show offline state, not error text
    expect(
      screen.getByText("Chat service offline, try again later."),
    ).toBeInTheDocument();
    expect(screen.getByText("Offline")).toBeInTheDocument();
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
        text: "Saved message",
        timestamp: Date.now(),
      },
      {
        id: "msg-2",
        role: "assistant",
        text: "Saved response",
        timestamp: Date.now(),
      },
    ];

    localStorageMock.getItem.mockImplementation((key: string) => {
      if (key === "ir-chat-messages") {
        return JSON.stringify(savedMessages);
      }
      return null;
    });

    const mockSetMessages = vi.fn();
    mockUseAIGateway.mockReturnValue({
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
      // Should call setMessages to restore with converted format
      expect(mockSetMessages).toHaveBeenCalled();
      const callArgs = mockSetMessages.mock.calls[0][0];
      expect(callArgs).toHaveLength(2);
      expect(callArgs[0].id).toBe("prev-msg-1");
      expect(callArgs[0].role).toBe("user");
      expect(callArgs[1].id).toBe("prev-msg-2");
      expect(callArgs[1].role).toBe("assistant");
    });
  });

  it("should save messages to localStorage when streaming completes", async () => {
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

    // First render with streaming status
    mockUseAIGateway.mockReturnValue({
      messages,
      sendMessage: mockSendMessage,
      status: "streaming",
      error: undefined,
      id: "test-chat-id",
      setMessages: mockSetMessages,
    });

    const { rerender } = render(<ChatWidget />);

    // Then update to ready status (simulating streaming completion)
    mockUseAIGateway.mockReturnValue({
      messages,
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "test-chat-id",
      setMessages: mockSetMessages,
    });

    rerender(<ChatWidget />);

    // Wait for useEffect to run
    await waitFor(() => {
      // Should save messages to localStorage when streaming completes
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "ir-chat-messages",
        expect.any(String),
      );
      const savedData = JSON.parse(
        localStorageMock.setItem.mock.calls.find(
          (call) => call[0] === "ir-chat-messages",
        )?.[1] || "[]",
      );
      expect(savedData).toHaveLength(2);
    });
  });

  it("should not save chatId to localStorage (handled by useAIGateway)", () => {
    mockUseAIGateway.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "new-chat-id",
      setMessages: vi.fn(),
    });

    render(<ChatWidget />);

    // ChatWidget no longer saves chatId - that's handled by useAIGateway
    // This test verifies the component doesn't interfere
    const chatIdCalls = localStorageMock.setItem.mock.calls.filter(
      (call) => call[0] === "ir-chat-session",
    );
    expect(chatIdCalls).toHaveLength(0);
  });

  it("should log user message to Discord when sending", async () => {
    const user = userEvent.setup();
    mockUseAIGateway.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "test-chat-id",
      setMessages: mockSetMessages,
    });

    mockLogToDiscord.mockResolvedValue(undefined);

    render(<ChatWidget />);

    const input = screen.getByPlaceholderText("Type your message...");
    await user.type(input, "First message");
    await user.click(screen.getByLabelText("Send message"));

    // Should call logToDiscord from useDiscord hook
    await waitFor(() => {
      expect(mockLogToDiscord).toHaveBeenCalledWith("First message", "user");
    });
  });

  it("should log user message to Discord after sending", async () => {
    const user = userEvent.setup();
    mockUseAIGateway.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "test-chat-id",
      setMessages: vi.fn(),
    });

    mockLogToDiscord.mockResolvedValue(undefined);

    render(<ChatWidget />);

    const input = screen.getByPlaceholderText("Type your message...");
    await user.type(input, "Test message");
    await user.click(screen.getByLabelText("Send message"));

    // Should log to Discord via hook
    await waitFor(() => {
      expect(mockLogToDiscord).toHaveBeenCalledWith("Test message", "user");
    });
  });

  it("should handle getMessageText with parts array format", () => {
    mockUseAIGateway.mockReturnValue({
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
    mockUseAIGateway.mockReturnValue({
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
    mockUseAIGateway.mockReturnValue({
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
    mockUseAIGateway.mockReturnValue({
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
    // First render with streaming status
    mockUseAIGateway.mockReturnValue({
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
    mockUseAIGateway.mockReturnValue({
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

    // Should attempt to log to Discord via hook
    await waitFor(
      () => {
        expect(mockLogToDiscord).toHaveBeenCalledWith(
          "AI response",
          "assistant",
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
      "Failed to load previous messages:",
      expect.any(Error),
    );

    consoleSpy.mockRestore();
  });

  it("should limit stored messages to last 10 when streaming completes", async () => {
    // Create 15 messages, ensuring the last one is an assistant message (triggers save)
    const manyMessages = Array.from({ length: 15 }, (_, i) => {
      // Make sure last message (index 14) is assistant
      const role = i % 2 === 0 ? ("user" as const) : ("assistant" as const);
      return {
        id: `msg-${i}`,
        role,
        parts: [{ type: "text", text: `Message ${i}` }],
      };
    });
    // Ensure last message is assistant (required for save to trigger)
    manyMessages[14] = {
      id: "msg-14",
      role: "assistant" as const,
      parts: [{ type: "text", text: "Message 14" }],
    };

    // First render with streaming status
    mockUseAIGateway.mockReturnValue({
      messages: manyMessages,
      sendMessage: mockSendMessage,
      status: "streaming",
      error: undefined,
      id: "test-chat-id",
      setMessages: vi.fn(),
    });

    const { rerender } = render(<ChatWidget />);

    // Then update to ready status (simulating streaming completion)
    mockUseAIGateway.mockReturnValue({
      messages: manyMessages,
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "test-chat-id",
      setMessages: vi.fn(),
    });

    rerender(<ChatWidget />);

    // Wait for useEffect to run - save happens when streaming completes with assistant message
    await waitFor(
      () => {
        // Should only save last 10 messages
        const setItemCalls = localStorageMock.setItem.mock.calls;
        const messagesCall = setItemCalls.find(
          (call) => call[0] === "ir-chat-messages",
        );
        expect(messagesCall).toBeDefined();
        if (messagesCall) {
          const savedMessages = JSON.parse(messagesCall[1]);
          expect(savedMessages).toHaveLength(10);
        }
      },
      { timeout: 3000 },
    );
  });

  it("should handle Discord logging failure gracefully", async () => {
    const user = userEvent.setup();
    mockUseAIGateway.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "test-chat-id",
      setMessages: vi.fn(),
    });

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    // Mock logToDiscord to reject
    mockLogToDiscord.mockRejectedValueOnce(new Error("Discord error"));

    render(<ChatWidget />);

    const input = screen.getByPlaceholderText("Type your message...");
    await user.type(input, "Test message");
    await user.click(screen.getByLabelText("Send message"));

    // Should handle error gracefully
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to log user message to Discord:",
        expect.any(Error),
      );
    });

    consoleSpy.mockRestore();
  });

  it("should handle Discord message logging failure", async () => {
    const user = userEvent.setup();
    mockUseAIGateway.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "test-chat-id",
      setMessages: vi.fn(),
    });

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    // Mock logToDiscord to reject
    mockLogToDiscord.mockRejectedValueOnce(new Error("Discord error"));

    render(<ChatWidget />);

    const input = screen.getByPlaceholderText("Type your message...");
    await user.type(input, "Test message");
    await user.click(screen.getByLabelText("Send message"));

    // Should handle error gracefully
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to log user message to Discord:",
        expect.any(Error),
      );
    });

    consoleSpy.mockRestore();
  });

  it("should handle Discord logging error", async () => {
    const user = userEvent.setup();
    mockUseAIGateway.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "test-chat-id",
      setMessages: vi.fn(),
    });

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    // Mock logToDiscord to reject
    mockLogToDiscord.mockRejectedValueOnce(new Error("Network error"));

    render(<ChatWidget />);

    const input = screen.getByPlaceholderText("Type your message...");
    await user.type(input, "Test message");
    await user.click(screen.getByLabelText("Send message"));

    // Should handle error gracefully
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to log user message to Discord:",
        expect.any(Error),
      );
    });

    consoleSpy.mockRestore();
  });

  it("should handle Discord AI response logging error", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    // Mock logToDiscord to reject for AI response
    mockLogToDiscord.mockRejectedValueOnce(new Error("Network error"));

    // First render with streaming status
    mockUseAIGateway.mockReturnValue({
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
    mockUseAIGateway.mockReturnValue({
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

    // Should handle error gracefully
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to log AI response to Discord:",
        expect.any(Error),
      );
    });

    consoleSpy.mockRestore();
  });

  it("should still attempt to log to Discord even without chatId (hook handles it)", async () => {
    const user = userEvent.setup();
    mockUseAIGateway.mockReturnValue({
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

    // Component still calls logToDiscord, hook handles the chatId check
    await waitFor(() => {
      expect(mockLogToDiscord).toHaveBeenCalledWith("Test message", "user");
    });
  });

  it("should handle empty message text in getMessageText", () => {
    mockUseAIGateway.mockReturnValue({
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

  it("should show offline state when Discord is offline", () => {
    mockUseAIGateway.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      id: "test-chat-id",
      setMessages: mockSetMessages,
    });

    mockUseDiscord.mockReturnValue({
      logToDiscord: mockLogToDiscord,
      discordThreadId: null,
      isDiscordOffline: true,
    });

    render(<ChatWidget />);
    expect(screen.getByText("Offline")).toBeInTheDocument();
    expect(
      screen.getByText("Chat service offline, try again later."),
    ).toBeInTheDocument();
  });

  it("should show offline state when both AI and Discord are offline", () => {
    mockUseAIGateway.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "ready",
      error: { message: "AI error" } as Error,
      id: "test-chat-id",
      setMessages: mockSetMessages,
    });

    mockUseDiscord.mockReturnValue({
      logToDiscord: mockLogToDiscord,
      discordThreadId: null,
      isDiscordOffline: true,
    });

    render(<ChatWidget />);
    expect(screen.getByText("Offline")).toBeInTheDocument();
    expect(
      screen.getByText("Chat service offline, try again later."),
    ).toBeInTheDocument();
  });
});
