import { describe, it, expect } from 'vitest';
import { ChatRoom } from '../mediators/chat-room';
import { User } from '../participants/user';

/**
 * Tests for the Mediator pattern — class-based implementation.
 * Covers: (1) mediator routes messages to other participants, (2) sender does not
 * receive own messages, (3) all participants receive messages from others.
 */
describe('Mediator — Class', () => {
  describe('ChatRoom mediator', () => {
    it('broadcasts message to all participants except sender', () => {
      const room = new ChatRoom();
      const alice = new User('a1', 'Alice', room);
      const bob = new User('b1', 'Bob', room);

      alice.send('Hello Bob!');

      expect(alice.receivedMessages).toHaveLength(0);
      expect(bob.receivedMessages).toHaveLength(1);
      expect(bob.receivedMessages[0]).toEqual({ from: 'Alice', content: 'Hello Bob!' });
    });

    it('routes messages between multiple participants', () => {
      const room = new ChatRoom();
      const alice = new User('a1', 'Alice', room);
      const bob = new User('b1', 'Bob', room);
      const charlie = new User('c1', 'Charlie', room);

      alice.send('Hi all');
      bob.send('Hi Alice');
      charlie.send('Hey!');

      expect(alice.receivedMessages).toHaveLength(2); // from Bob and Charlie
      expect(bob.receivedMessages).toHaveLength(2); // from Alice and Charlie
      expect(charlie.receivedMessages).toHaveLength(2); // from Alice and Bob
    });

    it('participants do not receive their own messages', () => {
      const room = new ChatRoom();
      const alice = new User('a1', 'Alice', room);
      const bob = new User('b1', 'Bob', room);

      alice.send('Msg 1');
      alice.send('Msg 2');

      expect(alice.receivedMessages).toHaveLength(0);
      expect(bob.receivedMessages).toHaveLength(2);
    });

    it('message content and sender are preserved', () => {
      const room = new ChatRoom();
      const alice = new User('a1', 'Alice', room);
      const bob = new User('b1', 'Bob', room);

      alice.send('Test content');

      expect(bob.receivedMessages[0].from).toBe('Alice');
      expect(bob.receivedMessages[0].content).toBe('Test content');
    });
  });
});
