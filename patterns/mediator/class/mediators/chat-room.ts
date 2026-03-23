import type { ChatMediator, ChatMessage, ChatParticipant } from '../../shared/types';

export class ChatRoom implements ChatMediator {
  private readonly participants = new Map<string, ChatParticipant>();

  register(participant: ChatParticipant): void {
    this.participants.set(participant.id, participant);
  }

  notify(message: ChatMessage, senderId: string): void {
    for (const [id, participant] of this.participants) {
      if (id !== senderId) {
        participant.receive(message);
      }
    }
  }
}
