"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface ChatContextType {
  isOpen: boolean;
  hasNotification: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  clearNotification: () => void;
  showNotification: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setHasNotification(false);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => {
      const newState = !prev;
      if (newState) {
        setHasNotification(false);
      }
      return newState;
    });
  }, []);

  const clearNotification = useCallback(() => {
    setHasNotification(false);
  }, []);

  const showNotification = useCallback(() => {
    if (!isOpen) {
      setHasNotification(true);
    }
  }, [isOpen]);

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        hasNotification,
        openChat,
        closeChat,
        toggleChat,
        clearNotification,
        showNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}
