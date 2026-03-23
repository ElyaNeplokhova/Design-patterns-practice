import { useState, useCallback } from 'react';
import type { ChatMessage } from '../../shared/types';

const PARTICIPANTS = ['Alice', 'Bob', 'Charlie'] as const;
export type ParticipantName = (typeof PARTICIPANTS)[number];

export function useChatMediator(initialUser: ParticipantName = 'Alice') {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentUser, setCurrentUser] = useState<ParticipantName>(initialUser);

  const send = useCallback(
    (content: string) => {
      if (!content.trim()) return;
      setMessages((prev) => [...prev, { from: currentUser, content: content.trim() }]);
    },
    [currentUser]
  );

  return { messages, send, currentUser, setCurrentUser, participants: PARTICIPANTS };
}
