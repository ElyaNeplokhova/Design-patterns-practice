export interface ChatMessage {
  from: string;
  content: string;
}

export interface ChatMediator {
  notify(message: ChatMessage, senderId: string): void;
  register(participant: ChatParticipant): void;
}

export interface ChatParticipant {
  id: string;
  name: string;
  receive(message: ChatMessage): void;
}
