'use client';

import Link from 'next/link';
import { ChatRoom } from '@/patterns/mediator/react/components/ChatRoom';

export default function MediatorPage() {
  return (
    <main>
      <Link href="/" className="text-blue-600 hover:underline mb-4 block">
        ← Back
      </Link>
      <h1>Mediator</h1>
      <p className="text-gray-600 mb-6">
        Chat room: participants (Alice, Bob, Charlie) send messages through the mediator.
        They do not communicate directly—all messages flow through the chat room.
      </p>
      <div className="max-w-md">
        <ChatRoom />
      </div>
    </main>
  );
}
