"use client";

import { useState } from 'react';

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Clerk does not allow listing all users from the client for security reasons.
  // You must implement a server-side API route to fetch users if needed.
  // For now, show a placeholder message.

  return (
    <div className="px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-[#3B5998] mb-4">User Directory</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users by name..."
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3B5998]"
        />
      </div>
      <div className="space-y-4">
        <div className="text-center text-gray-500 py-8">
          User search is not available yet. Please check back later.
        </div>
      </div>
    </div>
  );
}
