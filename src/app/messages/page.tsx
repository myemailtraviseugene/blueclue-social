"use client";

import { useUser } from '@clerk/nextjs';
import Image from "next/image";
import { useState } from 'react';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  subject: string;
  content: string;
  timestamp: Date;
}

export default function MessagesPage() {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState({
    to: '',
    subject: '',
    content: ''
  });
  const [showCompose, setShowCompose] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleSendMessage = () => {
    if (!user || !newMessage.to || !newMessage.subject || !newMessage.content) return;
    const message: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      receiverId: newMessage.to,
      subject: newMessage.subject,
      content: newMessage.content,
      timestamp: new Date()
    };
    setMessages([message, ...messages]);
    setNewMessage({ to: '', subject: '', content: '' });
    setShowCompose(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#3B5998]">Messages</h1>
          <button
            onClick={() => setShowCompose(true)}
            className="bg-[#3B5998] text-white px-4 py-2 rounded hover:bg-[#365899] transition-colors"
          >
            Compose Message
          </button>
        </div>
        {showCompose && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
              <h2 className="text-xl font-bold text-[#3B5998] mb-4">New Message</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To (User ID):</label>
                  <input
                    type="text"
                    value={newMessage.to}
                    onChange={(e) => setNewMessage({ ...newMessage, to: e.target.value })}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3B5998]"
                    placeholder="Enter recipient's user ID (user search coming soon)"
                  />
                  <div className="text-xs text-gray-500 mt-1">User search is not available yet. Please enter a user ID.</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject:</label>
                  <input
                    type="text"
                    value={newMessage.subject}
                    onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3B5998]"
                    placeholder="Enter subject"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message:</label>
                  <textarea
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3B5998]"
                    rows={4}
                    placeholder="Type your message here..."
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowCompose(false)}
                    className="px-4 py-2 border rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendMessage}
                    className="bg-[#3B5998] text-white px-4 py-2 rounded hover:bg-[#365899] transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="space-y-4">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No messages yet. Start a conversation!</p>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                onClick={() => setSelectedMessage(message)}
                className="bg-white border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src="/file.svg"
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-[#3B5998]">
                      {message.senderId === user?.id ? 'You' : message.senderId}
                    </div>
                    <div className="text-sm text-gray-600">{message.subject}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(message.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {selectedMessage && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#3B5998]">{selectedMessage.subject}</h2>
            <button
              onClick={() => setSelectedMessage(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Image
                src="/file.svg"
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <div className="font-semibold text-[#3B5998]">
                  {selectedMessage.senderId === user?.id ? 'You' : selectedMessage.senderId}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(selectedMessage.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
            <p className="text-gray-800 whitespace-pre-wrap">{selectedMessage.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}
