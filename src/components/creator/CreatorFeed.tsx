import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, MessageCircle, TrendingUp, Calendar, Filter } from 'lucide-react';
import { Post } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

const CreatorFeed = () => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'scheduled'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'likes' | 'comments'>('date');

  useEffect(() => {
    // Mock data for creator's posts
    const mockPosts: Post[] = [
      {
        id: '1',
        authorId: 'creator1',
        author: {  
          id: 'creator1',
          username: 'sakura_chan',
          displayName: '桜子',
          email: 'sakura@example.com',
          avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
          followers: 15420,
          following: 892,
          isVerified: true,
          joinedDate: '2023-01-15',
          role: 'creator',
          status: 'active',
          createdAt: '2023-01-15'
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
        isPremium: false,
        status: 'public',
        type: 'image'
      },
      {
        id: '2',
        authorId: 'creator1',
        author: {
          id: 'creator1',
          username: 'sakura_chan',
          displayName: '桜子',
          email: 'sakura@example.com',
          avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
          followers: 15420,
          following: 892,
          isVerified: true,
          joinedDate: '2023-01-15',
          role: 'creator',
          status: 'active',
          createdAt: '2023-01-15'
        },
        content: 'プレミアム会員限定コンテンツです🔒 特別な写真をお届けします！',
        images: [
          'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=600'
        ],
        timestamp: '2024-01-14T12:15:00Z',
        likes: 892,
        comments: 156,
        isLiked: false,
        isPremium: true,
        status: 'public',
        type: 'image'
      }
    ];
    setPosts(mockPosts);
  }, []);

  const getPostStats = (post: Post) => ({
    views: Math.floor(post.likes * 8.5), // Mock view count
    likes: post.likes,
    comments: post.comments,
    engagement: ((post.likes + post.comments) / Math.floor(post.likes * 8.5) * 100).toFixed(1)
  });

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('creator.feed.title')}</h1>
            <p className="text-gray-600">{t('creator.feed.subtitle')}</p>
          </div>
        </div>

        {/* Filters and Stats */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all' 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('creator.feed.allPosts')}
              </button>
              <button
                onClick={() => setFilter('published')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'published' 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('creator.feed.published')}
              </button>
              <button
                onClick={() => setFilter('draft')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'draft' 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('creator.feed.draft')}
              </button>
              <button
                onClick={() => setFilter('scheduled')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'scheduled' 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('creator.feed.scheduled')}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="date">{t('creator.feed.sortByDate')}</option>
                <option value="views">{t('creator.feed.sortByViews')}</option>
                <option value="likes">{t('creator.feed.sortByLikes')}</option>
                <option value="comments">{t('creator.feed.sortByComments')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6">
          {posts.map((post, index) => {
            const stats = getPostStats(post);
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.displayName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{post.author.displayName}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(post.timestamp).toLocaleDateString('ja-JP')}
                      </p>
                    </div>
                  </div>
                  {post.isPremium && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                      Premium
                    </span>
                  )}
                </div>

                <p className="text-gray-700 mb-4">{post.content}</p>

                {post.images && post.images.length > 0 && (
                  <div className="mb-4">
                    <img
                      src={post.images[0]}
                      alt="Post content"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-gray-600">
                      <Eye className="w-4 h-4" />
                      <span className="font-medium">{stats.views.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-500">{t('creator.feed.views')}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-gray-600">
                      <Heart className="w-4 h-4" />
                      <span className="font-medium">{stats.likes.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-500">{t('creator.feed.likes')}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-gray-600">
                      <MessageCircle className="w-4 h-4" />
                      <span className="font-medium">{stats.comments.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-500">{t('creator.feed.comments')}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-gray-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-medium">{stats.engagement}%</span>
                    </div>
                    <p className="text-xs text-gray-500">{t('creator.statistics.engagementRate')}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
                  <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    {t('creator.feed.edit')}
                  </button>
                  <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    {t('creator.statistics.overview')}
                  </button>
                  <button className="px-4 py-2 text-sm text-red-600 hover:text-red-700 transition-colors">
                    {t('creator.feed.delete')}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default CreatorFeed;
