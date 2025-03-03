'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Post {
  id: number;
  user: {
    name: string;
    image: string;
  };
  content: string;
  workout?: {
    name: string;
    duration: number;
  };
  likes: number;
  comments: number;
  timestamp: string;
  isLiked: boolean;
}

const initialPosts: Post[] = [
  {
    id: 1,
    user: {
      name: 'Sarah Johnson',
      image: '👩',
    },
    content: 'Just completed my first HIIT workout! Feeling amazing 💪',
    workout: {
      name: 'HIIT Cardio Blast',
      duration: 30,
    },
    likes: 24,
    comments: 5,
    timestamp: '2024-03-01T10:30:00Z',
    isLiked: false,
  },
  {
    id: 2,
    user: {
      name: 'Mike Chen',
      image: '👨',
    },
    content: 'Hit a new personal record on squats today! Consistency is key 🎯',
    likes: 18,
    comments: 3,
    timestamp: '2024-03-01T09:15:00Z',
    isLiked: true,
  },
  {
    id: 3,
    user: {
      name: 'Emma Wilson',
      image: '👩‍🦰',
    },
    content: 'Morning yoga session to start the day right ✨',
    workout: {
      name: 'Flexibility Flow',
      duration: 25,
    },
    likes: 32,
    comments: 7,
    timestamp: '2024-03-01T08:00:00Z',
    isLiked: false,
  },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState('');

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked,
        };
      }
      return post;
    }));
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post: Post = {
      id: posts.length + 1,
      user: {
        name: 'You',
        image: '👤',
      },
      content: newPost,
      likes: 0,
      comments: 0,
      timestamp: new Date().toISOString(),
      isLiked: false,
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <div className="py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Community</h1>
        <p className="mt-2 text-gray-600">Share your fitness journey and connect with others.</p>

        {/* Create Post */}
        <div className="mt-6">
          <form onSubmit={handleSubmitPost} className="bg-white rounded-lg shadow p-6">
            <textarea
              rows={3}
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your fitness journey..."
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                disabled={!newPost.trim()}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-300"
              >
                Post
              </button>
            </div>
          </form>
        </div>

        {/* Posts Feed */}
        <div className="mt-8 space-y-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center">
                <span className="text-2xl">{post.user.image}</span>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{post.user.name}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(post.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">{post.content}</p>
              {post.workout && (
                <div className="mt-3 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600">
                  🏋️ {post.workout.name} • {post.workout.duration} min
                </div>
              )}
              <div className="mt-4 flex items-center space-x-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-1 text-sm ${
                    post.isLiked ? 'text-indigo-600' : 'text-gray-500'
                  }`}
                >
                  <span>{post.isLiked ? '❤️' : '🤍'}</span>
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-sm text-gray-500">
                  <span>💬</span>
                  <span>{post.comments}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 