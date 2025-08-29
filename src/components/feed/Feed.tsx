import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Filter, 
  TrendingUp, 
  Clock, 
  Star,
  Crown,
  Sparkles,
  Users,
  Calendar
} from 'lucide-react';
import CreatePost from './CreatePost';
import PostCard from './PostCard';
import { Post } from '../../types';

const mockPosts: Post[] = [
  {
    id: '1',
    authorId: '2',
    author: {
      id: '2',
      username: 'yuki_creator',
      displayName: 'Yuki Creator',
      email: 'yuki@example.com',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      followers: 25600,
      following: 450,
      isVerified: true,
      joinedDate: '2022-08-20',
      role: 'creator',
      status: 'active',
      createdAt: '2022-08-20'
    },
    content: 'Behind the scenes from today\'s photoshoot! ✨ New content coming soon 💕 #fashion #lifestyle',
    images: [
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    timestamp: '2024-01-15T14:30:00Z',
    likes: 1247,
    comments: 89,
    isLiked: true,
    isPremium: false,
    status: 'public',
    type: 'image'
  },
  {
    id: '2',
    authorId: '3',
    author: {
      id: '3',
      username: 'miku_creator',
      displayName: 'Miku Creator',
      email: 'miku@example.com',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      followers: 18200,
      following: 320,
      isVerified: true,
      joinedDate: '2023-02-10',
      role: 'creator',
      status: 'active',
      createdAt: '2023-02-10'
    },
    content: 'Premium member exclusive content 🔒 Special photos just for you!',
    images: [
      'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    timestamp: '2024-01-15T12:15:00Z',
    likes: 892,
    comments: 156,
    isLiked: false,
    isPremium: true,
    status: 'public',
    type: 'image'
  },
  {
    id: '3',
    authorId: '4',
    author: {
      id: '4',
      username: 'sakura_creator',
      displayName: 'Sakura Creator',
      email: 'sakura@example.com',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      followers: 15420,
      following: 280,
      isVerified: true,
      joinedDate: '2023-05-15',
      role: 'creator',
      status: 'active',
      createdAt: '2023-05-15'
    },
    content: 'Daily routine check! What\'s your morning ritual? ☀️ #morning #routine #lifestyle',
    images: [
      'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    timestamp: '2024-01-15T10:45:00Z',
    likes: 567,
    comments: 34,
    isLiked: true,
    isPremium: false,
    status: 'public',
    type: 'image'
  }
];

const trendingCreators = [
  {
    id: '1',
    username: 'yuki_creator',
    displayName: 'Yuki Creator',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    followers: 25600,
    isVerified: true,
    isFollowing: true
  },
  {
    id: '2',
    username: 'miku_creator',
    displayName: 'Miku Creator',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    followers: 18200,
    isVerified: true,
    isFollowing: false
  },
  {
    id: '3',
    username: 'sakura_creator',
    displayName: 'Sakura Creator',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    followers: 15420,
    isVerified: true,
    isFollowing: true
  }
];

const Feed = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const filteredPosts = posts.filter(post => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'premium') return post.isPremium;
    if (activeFilter === 'free') return !post.isPremium;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Home Feed</h1>
                <p className="text-gray-600">Discover amazing content from your favorite creators</p>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="latest">Latest</option>
                  <option value="trending">Trending</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
              {[
                { id: 'all', label: 'All Posts', count: posts.length },
                { id: 'premium', label: 'Premium', count: posts.filter(p => p.isPremium).length },
                { id: 'free', label: 'Free', count: posts.filter(p => !p.isPremium).length }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeFilter === filter.id
                      ? 'bg-white text-pink-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span>{filter.label}</span>
                  <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>

            <CreatePost />
            
            <div className="space-y-6 mt-6">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <PostCard post={post} onLike={handleLike} />
                </motion.div>
              ))}
            </div>

            <div className="text-center py-8">
              <p className="text-gray-500">You're all caught up! 🎉</p>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Trending Creators */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-pink-600" />
                <h3 className="font-semibold text-gray-900">Trending Creators</h3>
              </div>
              <div className="space-y-4">
                {trendingCreators.map((creator) => (
                  <div key={creator.id} className="flex items-center space-x-3">
                    <img
                      src={creator.avatar}
                      alt={creator.displayName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1">
                        <p className="font-medium text-gray-900 truncate">{creator.displayName}</p>
                        {creator.isVerified && (
                          <Star className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{creator.followers.toLocaleString()} followers</p>
                    </div>
                    <button className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      creator.isFollowing
                        ? 'bg-pink-100 text-pink-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-600'
                    }`}>
                      {creator.isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-6 text-white"
            >
              <h3 className="font-semibold mb-4">Your Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Posts Liked</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Creators Following</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Premium Content</span>
                  <span className="font-semibold">8</span>
                </div>
              </div>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-5 h-5 text-pink-600" />
                <h3 className="font-semibold text-gray-900">Upcoming Events</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">Live Q&A Session</p>
                  <p className="text-xs text-gray-500">Tomorrow at 8:00 PM</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">New Content Release</p>
                  <p className="text-xs text-gray-500">Friday at 6:00 PM</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;