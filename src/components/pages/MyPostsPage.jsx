import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Edit3, Trash2, Eye, Heart, MessageCircle, Share2, MoreHorizontal, Search, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../BottomNavigation';

const MyPostsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const posts = [
    {
      id: 1,
      title: '大人気 絶頂動画を...',
      description: '【全員にプレゼント付き🎁】参加は一回限り💖特別...',
      thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop',
      type: 'video',
      status: 'published',
      views: 25000,
      likes: 1200,
      comments: 85,
      shares: 45,
      earnings: 125000,
      createdAt: '2024-01-20',
      publishedAt: '2024-01-20T10:30:00Z'
    },
    {
      id: 2,
      title: 'Sweet Dreams Video',
      description: 'Giveaway Event - 限定コンテンツ',
      thumbnail: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop',
      type: 'video',
      status: 'published',
      views: 18000,
      likes: 890,
      comments: 62,
      shares: 32,
      earnings: 95000,
      createdAt: '2024-01-18',
      publishedAt: '2024-01-18T14:15:00Z'
    },
    {
      id: 3,
      title: 'Private Moment',
      description: 'Exclusive Content - 特別な瞬間',
      thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop',
      type: 'image',
      status: 'draft',
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      earnings: 0,
      createdAt: '2024-01-22',
      publishedAt: null
    },
    {
      id: 4,
      title: 'Live Stream',
      description: 'Active Now - ライブ配信中',
      thumbnail: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop',
      type: 'video',
      status: 'scheduled',
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      earnings: 0,
      createdAt: '2024-01-23',
      publishedAt: '2024-01-25T20:00:00Z'
    },
    {
      id: 5,
      title: 'Behind the Scenes',
      description: '撮影の裏側をお見せします',
      thumbnail: 'https://images.unsplash.com/photo-1494790108755-2616c933448c?w=400&h=600&fit=crop',
      type: 'image',
      status: 'published',
      views: 8500,
      likes: 420,
      comments: 28,
      shares: 15,
      earnings: 42000,
      createdAt: '2024-01-15',
      publishedAt: '2024-01-15T16:45:00Z'
    }
  ];

  const statusOptions = [
    { id: 'all', name: 'すべて' },
    { id: 'published', name: '公開中' },
    { id: 'draft', name: '下書き' },
    { id: 'scheduled', name: '予約投稿' }
  ];

  const sortOptions = [
    { id: 'newest', name: '新しい順' },
    { id: 'oldest', name: '古い順' },
    { id: 'popular', name: '人気順' },
    { id: 'earnings', name: '収益順' }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'popular':
        return b.views - a.views;
      case 'earnings':
        return b.earnings - a.earnings;
      default:
        return 0;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'published':
        return '公開中';
      case 'draft':
        return '下書き';
      case 'scheduled':
        return '予約投稿';
      default:
        return '不明';
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const totalViews = posts.filter(p => p.status === 'published').reduce((sum, post) => sum + post.views, 0);
  const totalEarnings = posts.filter(p => p.status === 'published').reduce((sum, post) => sum + post.earnings, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">戻る</span>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">あなたの投稿</h1>
          <button
            onClick={() => navigate('/create-post')}
            className="bg-pink-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors"
          >
            <Plus className="w-4 h-4 inline mr-1" />
            新規投稿
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 shadow-sm"
          >
            <div className="text-center">
              <p className="text-sm text-gray-600">総投稿数</p>
              <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm"
          >
            <div className="text-center">
              <p className="text-sm text-gray-600">総視聴数</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(totalViews)}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-4 shadow-sm"
          >
            <div className="text-center">
              <p className="text-sm text-gray-600">総収益</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalEarnings)}</p>
            </div>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="投稿を検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">ステータス</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {statusOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">並び順</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {sortedPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
            >
              <div className="flex space-x-4">
                {/* Thumbnail */}
                <div className="flex-shrink-0">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 truncate">{post.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{post.description}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                        {getStatusText(post.status)}
                      </span>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{formatNumber(post.views)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{formatNumber(post.likes)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Share2 className="w-4 h-4" />
                      <span>{post.shares}</span>
                    </div>
                  </div>

                  {/* Earnings and Date */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {post.publishedAt ? 
                        `公開: ${new Date(post.publishedAt).toLocaleDateString('ja-JP')}` :
                        `作成: ${new Date(post.createdAt).toLocaleDateString('ja-JP')}`
                      }
                    </div>
                    {post.earnings > 0 && (
                      <div className="text-sm font-semibold text-green-600">
                        {formatCurrency(post.earnings)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => navigate(`/edit-post/${post.id}`)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate(`/post-analytics/${post.id}`)}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('この投稿を削除しますか？')) {
                        // 削除処理
                      }
                    }}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {sortedPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Plus className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">投稿がありません</h3>
            <p className="text-gray-600 mb-4">最初の投稿を作成してみましょう</p>
            <button
              onClick={() => navigate('/create-post')}
              className="bg-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
            >
              投稿を作成
            </button>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default MyPostsPage;
