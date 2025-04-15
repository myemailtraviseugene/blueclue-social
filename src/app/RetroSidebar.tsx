"use client";
import { useState } from "react";

export default function RetroSidebar() {
  const [search, setSearch] = useState("");

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
          <li className="text-gray-400 text-sm">User search is not available yet.</li>
        </ul>
      </div>
    </aside>
  );
}
