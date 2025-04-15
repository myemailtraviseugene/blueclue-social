import { useState } from 'react';
import Image from 'next/image';

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: 'Alex Johnson', school: 'State University', avatar: '/file.svg', isFriend: false },
    { id: 2, name: 'Jamie Lee', school: 'City College', avatar: '/file.svg', isFriend: true },
  ]);

  const handleAddFriend = (userId: number) => {
    setUsers(users.map(user => user.id === userId ? { ...user, isFriend: true } : user));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-[#3B5998] mb-4">User Directory</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users by name or school..."
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3B5998]"
        />
      </div>

      <div className="space-y-4">
        {users.filter(user =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.school.toLowerCase().includes(searchQuery.toLowerCase())
        ).map(user => (
          <div key={user.id} className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
            <div className="w-12 h-12 relative rounded-full bg-gray-200 overflow-hidden">
              <Image src={user.avatar} alt={user.name} layout="fill" objectFit="cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#3B5998]">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.school}</p>
            </div>
            {!user.isFriend ? (
              <button
                onClick={() => handleAddFriend(user.id)}
                className="bg-[#3B5998] text-white px-4 py-2 rounded-md hover:bg-[#365899] transition-colors"
              >
                Add Friend
              </button>
            ) : (
              <span className="text-sm text-gray-500">Friend</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}