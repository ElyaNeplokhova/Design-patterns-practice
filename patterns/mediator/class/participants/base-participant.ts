import type { ChatMediator, ChatMessage, ChatParticipant } from '../../shared/types';

export abstract class BaseParticipant implements ChatParticipant {
  constructor(
    public readonly id: string,
    public readonly name: string,
    protected readonly mediator: ChatMediator
  ) {
    mediator.register(this);
  }

  send(content: string): void {
    this.mediator.notify({ from: this.name, content }, this.id);
  }

  abstract receive(message: ChatMessage): void;
}
