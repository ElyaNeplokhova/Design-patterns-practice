'use client';

import { useState } from 'react';
import { useChatMediator } from '../hooks/useChatMediator';
import type { ParticipantName } from '../hooks/useChatMediator';

export function ChatRoom() {
  const { messages, send, currentUser, setCurrentUser, participants } = useChatMediator();
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
    setInput('');
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">You are</label>
        <select
          value={currentUser}
          onChange={(e) => setCurrentUser(e.target.value as ParticipantName)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {participants.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="p-4 bg-gray-50 rounded-md border max-h-48 overflow-y-auto">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Messages</h3>
        {messages.length === 0 ? (
          <p className="text-sm text-gray-500">No messages yet. Send one below.</p>
        ) : (
          <ul className="space-y-1 text-sm">
            {messages.map((msg, i) => (
              <li key={i}>
                <span className="font-medium text-blue-600">{msg.from}:</span> {msg.content}
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
    </div>
  );
}
