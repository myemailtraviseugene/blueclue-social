"use client";
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useState } from 'react';
import ErrorBoundary from '../ErrorBoundary';

export default function ProfilePage() {
  return (
    <ErrorBoundary>
      <ProfilePageContent />
    </ErrorBoundary>
  );
}

function ProfilePageContent() {
  const { user } = useUser();
  const [username, setUsername] = useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem('profile_username') || '' : ''
  );
  const [profileDetails, setProfileDetails] = useState({
    location: '',
    occupation: '',
    bio: '',
    music: '',
    hobbies: '',
    movies: '',
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);

  console.log('ProfilePage rendered with user:', user);

  if (!user) {
    return <div className="text-center text-red-500">Error: User not authenticated.</div>;
  }

  const handleSave = async () => {
    // Save username locally (not with Clerk)
    if (typeof window !== 'undefined') {
      localStorage.setItem('profile_username', username);
    }
    // Logic to save profile details and image (e.g., save to database)
    console.log('Profile saved:', profileDetails, profileImage, username);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="w-32 h-32 relative rounded-full bg-gray-200 overflow-hidden">
            <Image
              src={profileImage ? URL.createObjectURL(profileImage) : user?.imageUrl || '/file.svg'}
              alt="Profile"
              layout="fill"
              objectFit="cover"
            />
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-[#3B5998] mb-2">{user?.firstName} {user?.lastName}</h1>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Set your username"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3B5998]"
              />
              <p className="text-gray-600 mt-1">@{username || 'username'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* About Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#3B5998] mb-4">About Me</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
              <input
                type="text"
                value={profileDetails.location}
                onChange={(e) => setProfileDetails({ ...profileDetails, location: e.target.value })}
                placeholder="Where are you from?"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3B5998]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Occupation</label>
              <input
                type="text"
                value={profileDetails.occupation}
                onChange={(e) => setProfileDetails({ ...profileDetails, occupation: e.target.value })}
                placeholder="What do you do?"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3B5998]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Bio</label>
              <textarea
                value={profileDetails.bio}
                onChange={(e) => setProfileDetails({ ...profileDetails, bio: e.target.value })}
                placeholder="Tell us about yourself..."
                rows={4}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3B5998]"
              />
            </div>
          </div>
        </div>

        {/* Interests Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#3B5998] mb-4">Interests</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Favorite Music</label>
              <input
                type="text"
                value={profileDetails.music}
                onChange={(e) => setProfileDetails({ ...profileDetails, music: e.target.value })}
                placeholder="What music do you like?"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3B5998]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Hobbies</label>
              <input
                type="text"
                value={profileDetails.hobbies}
                onChange={(e) => setProfileDetails({ ...profileDetails, hobbies: e.target.value })}
                placeholder="What do you enjoy doing?"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3B5998]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Movies & TV Shows</label>
              <input
                type="text"
                value={profileDetails.movies}
                onChange={(e) => setProfileDetails({ ...profileDetails, movies: e.target.value })}
                placeholder="What do you like to watch?"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3B5998]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-right">
        <button 
          onClick={handleSave}
          className="bg-[#3B5998] text-white px-6 py-2 rounded-md hover:bg-[#365899] transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
