import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CreatePost from './CreatePost';
import PostCard from './PostCard';
import { Post, User } from '../../types';

const mockPosts: Post[] = [
  {
    id: '1',
    authorId: '2',
    author: {
      id: '2',
      username: 'yuki_model',
      displayName: 'ユキ',
      email: 'yuki@example.com',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      followers: 25600,
      following: 450,
      isVerified: true,
      joinedDate: '2022-08-20'
    },
    content: '今日の撮影お疲れ様でした！✨ 新しいコンテンツをお楽しみに💕',
    images: [
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    timestamp: '2024-01-15T14:30:00Z',
    likes: 1247,
    comments: 89,
    isLiked: true,
    isPremium: false
  },
  {
    id: '2',
    authorId: '3',
    author: {
      id: '3',
      username: 'ai_creator',
      displayName: 'あい',
      email: 'ai@example.com',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      followers: 18200,
      following: 320,
      isVerified: true,
      joinedDate: '2023-02-10'
    },
    content: 'プレミアム会員限定コンテンツです🔒 特別な写真をお届けします！',
    images: [
      'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    timestamp: '2024-01-15T12:15:00Z',
    likes: 892,
    comments: 156,
    isLiked: false,
    isPremium: true
  }
];

const Feed = () => {
  const [posts, setPosts] = useState(mockPosts);

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto px-4 py-6"
    >
      <CreatePost />
      
      <div className="space-y-6 mt-6">
        {posts.map((post, index) => (
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
        <p className="text-gray-500">すべての投稿を表示しました</p>
      </div>
    </motion.div>
  );
};

export default Feed;