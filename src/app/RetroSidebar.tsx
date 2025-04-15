"use client";
import { useState } from "react";
import Link from "next/link";

export default function RetroSidebar() {
  const [search, setSearch] = useState("");
  // Placeholder users; replace with real user data from Clerk or your DB later
  const users = [
    { id: 1, name: "Alex Johnson" },
    { id: 2, name: "Jamie Lee" },
    { id: 3, name: "Taylor Smith" },
  ];
  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <aside className="bg-[#F7F7F7] w-60 min-h-screen border-r border-[#CCC] p-4 block">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3B5998]"
        />
      </div>
      <div>
        <h3 className="font-bold text-[#3B5998] mb-2 text-sm uppercase">Users</h3>
        <ul className="space-y-2">
          {filtered.length === 0 && <li className="text-gray-400 text-sm">No users found</li>}
          {filtered.map(user => (
            <li key={user.id}>
              <Link href={`/profile/${user.id}`} className="text-[#1D4088] hover:underline">
                {user.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
