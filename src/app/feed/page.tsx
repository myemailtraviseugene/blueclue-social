'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useState } from 'react';
import ErrorBoundary from '../ErrorBoundary';

function extractYouTubeId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function FeedPageContent() {
  const { userId } = useAuth();
  const { user } = useUser();
  const [postText, setPostText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [posts, setPosts] = useState<{
    text: string;
    image?: string;
    createdAt: Date;
    likes: number;
    liked: boolean;
    comments: { user: string; text: string; createdAt: Date }[];
    userId: string;
    name: string;
    imageUrl: string;
  }[]>([]);
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({});

  const getLocalUsername = () =>
    typeof window !== 'undefined' ? localStorage.getItem('profile_username') || '' : '';

  if (!userId) {
    return <div className="text-center text-red-500">Error: User not authenticated.</div>;
  }

  const handlePost = () => {
    if (!postText && !image) return;

    const imageUrl = image ? URL.createObjectURL(image) : '';
    const localUsername = getLocalUsername();

    setPosts([
      {
        text: postText,
        image: imageUrl,
        createdAt: new Date(),
        likes: 0,
        liked: false,
        comments: [],
        userId: userId!,
        name: localUsername || (user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.username || 'User'),
        imageUrl: user?.imageUrl || '/file.svg',
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

  const handleLike = (idx: number) => {
    setPosts(posts =>
      posts.map((post, i) =>
        i === idx
          ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked }
          : post
      )
    );
  };

  const handleCommentChange = (idx: number, value: string) => {
    setCommentInputs(inputs => ({ ...inputs, [idx]: value }));
  };

  const handleAddComment = (idx: number) => {
    const commentText = commentInputs[idx]?.trim();
    if (!commentText) return;

    setPosts(posts =>
      posts.map((post, i) =>
        i === idx
          ? {
              ...post,
              comments: [
                ...post.comments,
                { user: 'You', text: commentText, createdAt: new Date() },
              ],
            }
          : post
      )
    );

    setCommentInputs(inputs => ({ ...inputs, [idx]: '' }));
  };

  const handleDelete = (idx: number) => {
    setPosts(posts => posts.filter((_, i) => i !== idx));
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
        {posts.map((post, idx) => {
          const ytId = extractYouTubeId(post.text);
          const isOwner = post.userId === userId;
          return (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 relative rounded-full bg-gray-200 overflow-hidden">
                  <Image 
                    src={post.imageUrl}
                    alt={post.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div>
                  <span className="font-semibold text-[#3B5998]">{post.name}</span>
                  <p className="text-sm text-gray-500">{post.createdAt.toLocaleString()}</p>
                </div>
                {isOwner && (
                  <button
                    className="ml-4 text-red-500 hover:underline text-sm"
                    onClick={() => handleDelete(idx)}
                  >
                    Delete
                  </button>
                )}
              </div>
              <p className="text-gray-800 mb-4">{post.text}</p>
              {ytId && (
                <div className="mb-4">
                  <iframe
                    width="400"
                    height="225"
                    src={`https://www.youtube.com/embed/${ytId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded"
                  ></iframe>
                </div>
              )}
              {post.image && (
                <div className="mb-4">
                  <Image src={post.image} alt="Post image" width={400} height={300} className="rounded" />
                </div>
              )}
              {/* Like and comment actions */}
              <div className="flex items-center gap-6 pt-4 border-t mt-4">
                <button
                  className={`flex items-center gap-2 text-gray-600 hover:text-[#3B5998] ${post.liked ? 'font-bold text-[#3B5998]' : ''}`}
                  onClick={() => handleLike(idx)}
                >
                  <span role="img" aria-label="Like">👍</span> Like ({post.likes})
                </button>
                <div className="flex-1">
                  <input
                    type="text"
                    value={commentInputs[idx] || ''}
                    onChange={e => handleCommentChange(idx, e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full p-2 border rounded text-sm"
                  />
                </div>
                <button
                  className="text-[#3B5998] font-semibold px-3 py-1 rounded hover:bg-[#EDEFF4]"
                  onClick={() => handleAddComment(idx)}
                >
                  Comment
                </button>
              </div>
              {/* Comments list */}
              {post.comments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {post.comments.map((comment, cidx) => (
                    <div key={cidx} className="flex items-start gap-2 text-sm">
                      <span className="font-bold text-[#3B5998]">{comment.user}:</span>
                      <span>{comment.text}</span>
                      <span className="text-gray-400 ml-2">{comment.createdAt.toLocaleTimeString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
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
