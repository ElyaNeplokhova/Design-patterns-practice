import { BaseParticipant } from './base-participant';
import type { ChatMediator, ChatMessage } from '../../shared/types';

export class User extends BaseParticipant {
  readonly receivedMessages: ChatMessage[] = [];

  constructor(id: string, name: string, mediator: ChatMediator) {
    super(id, name, mediator);
  }

  receive(message: ChatMessage): void {
    this.receivedMessages.push(message);
  }
}
