'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useChatMediator } from '../hooks/useChatMediator';

type ChatMediatorContextValue = ReturnType<typeof useChatMediator>;

const ChatMediatorContext = createContext<ChatMediatorContextValue | null>(null);

export function ChatRoomProvider({ children }: { children: ReactNode }) {
  const value = useChatMediator();
  return (
    <ChatMediatorContext.Provider value={value}>{children}</ChatMediatorContext.Provider>
  );
}

export function useChatMediatorContext() {
  const ctx = useContext(ChatMediatorContext);
  if (!ctx) {
    throw new Error('useChatMediatorContext must be used within ChatRoomProvider');
  }
  return ctx;
}
