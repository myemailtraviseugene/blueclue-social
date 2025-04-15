'use client';

import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import { useState } from 'react';
import ErrorBoundary from '../ErrorBoundary';

function FeedPageContent() {
  const { userId } = useAuth();
  const [postText, setPostText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [posts, setPosts] = useState<{ text: string; image?: string; createdAt: Date }[]>([]);

  if (!userId) {
    return <div className="text-center text-red-500">Error: User not authenticated.</div>;
  }

  const handlePost = () => {
    if (!postText && !image) return;

    const imageUrl = image ? URL.createObjectURL(image) : '';

    setPosts([
      {
        text: postText,
        image: imageUrl,
        createdAt: new Date(),
      },
      ...posts,
    ]);

    setPostText('');
    setImage(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="px-4 py-8">
      {/* Create Post Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 relative rounded-full bg-gray-200 overflow-hidden">
            <Image 
              src="/file.svg"
              alt="Profile"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex-1">
            <textarea 
              placeholder="What&apos;s on your mind?"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="w-full p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#3B5998]"
              rows={3}
            />
            <div className="mt-3 flex items-center gap-4">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="text-sm text-gray-600"
              />
              <button 
                onClick={handlePost}
                className="bg-[#3B5998] text-white px-6 py-2 rounded-md hover:bg-[#365899] transition-colors"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* User Posts */}
      <div className="space-y-6">
        {posts.length === 0 && (
          <div className="text-center text-gray-500">No posts yet. Share something!</div>
        )}
        {posts.map((post, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 relative rounded-full bg-gray-200 overflow-hidden">
                <Image 
                  src="/file.svg"
                  alt="User"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div>
                <span className="font-semibold text-[#3B5998]">You</span>
                <p className="text-sm text-gray-500">{post.createdAt.toLocaleString()}</p>
              </div>
            </div>
            <p className="text-gray-800 mb-4">{post.text}</p>
            {post.image && (
              <div className="mb-4">
                <Image src={post.image} alt="Post image" width={400} height={300} className="rounded" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FeedPage() {
  return (
    <ErrorBoundary>
      <FeedPageContent />
    </ErrorBoundary>
  );
}
