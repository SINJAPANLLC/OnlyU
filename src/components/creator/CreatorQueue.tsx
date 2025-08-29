import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Edit, Trash2, Eye, Play, Pause } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface QueuedPost {
  id: string;
  title: string;
  content: string;
  type: 'draft' | 'scheduled' | 'published';
  scheduledDate?: string;
  status: 'pending' | 'published' | 'cancelled';
  preview?: string;
}

const CreatorQueue = () => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<QueuedPost[]>([]);
  const [filter, setFilter] = useState<'all' | 'draft' | 'scheduled' | 'published'>('all');

  useEffect(() => {
    const mockPosts: QueuedPost[] = [
      {
        id: '1',
        title: t('creator.queue.behindScenesPhotoShoot'),
        content: '今日の撮影の裏側をお見せします！✨',
        type: 'scheduled',
        scheduledDate: '2024-01-16T10:00:00Z',
        status: 'pending',
        preview: 'Behind the scenes content from today\'s photo shoot...'
      },
      {
        id: '2',
        title: t('creator.queue.weekendUpdate'),
        content: '週末の予定についてお話しします',
        type: 'draft',
        status: 'pending',
        preview: 'Sharing my weekend plans and upcoming content...'
      },
      {
        id: '3',
        title: t('creator.queue.premiumContentPreview'),
        content: 'プレミアム会員限定コンテンツの予告',
        type: 'scheduled',
        scheduledDate: '2024-01-17T15:30:00Z',
        status: 'pending',
        preview: 'Preview of upcoming premium content for subscribers...'
      },
      {
        id: '4',
        title: t('creator.queue.fanQASession'),
        content: 'ファンの皆さんからの質問に答えます',
        type: 'published',
        status: 'published',
        preview: 'Answering questions from fans in this Q&A session...'
      }
    ];
    setPosts(mockPosts);
  }, []);

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    return post.type === filter;
  });

  const getStatusColor = (status: QueuedPost['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: QueuedPost['type']) => {
    switch (type) {
      case 'draft':
        return <Edit className="w-4 h-4" />;
      case 'scheduled':
        return <Clock className="w-4 h-4" />;
      case 'published':
        return <Eye className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const handlePublish = (postId: string) => {
    setPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { ...post, status: 'published', type: 'published' as const }
          : post
      )
    );
  };

  const handleDelete = (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('creator.queue.title')}</h1>
            <p className="text-gray-600">{t('creator.queue.subtitle')}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
                          >
                {t('creator.queue.all')} ({posts.length})
              </button>
              <button
                onClick={() => setFilter('draft')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'draft' 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('creator.queue.drafts')} ({posts.filter(p => p.type === 'draft').length})
              </button>
              <button
                onClick={() => setFilter('scheduled')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'scheduled' 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('creator.queue.scheduled')} ({posts.filter(p => p.type === 'scheduled').length})
              </button>
              <button
                onClick={() => setFilter('published')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'published' 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('creator.queue.published')} ({posts.filter(p => p.type === 'published').length})
              </button>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-1 bg-gray-100 rounded">
                      {getTypeIcon(post.type)}
                    </div>
                    <h3 className="font-medium text-gray-900">{post.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{post.preview}</p>
                  
                  {post.scheduledDate && (
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {t('creator.queue.scheduledFor')} {new Date(post.scheduledDate).toLocaleString('ja-JP')}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  {post.status === 'pending' && post.type === 'scheduled' && (
                    <button
                      onClick={() => handlePublish(post.id)}
                      className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                      title={t('creator.queue.publishNow')}
                    >
                      <Play className="w-4 h-4" />
                    </button>
                  )}
                  
                  {post.status === 'pending' && (
                    <button
                      className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      title={t('creator.queue.edit')}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    title={t('creator.queue.delete')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('creator.queue.noPostsFound')}</h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? t('creator.queue.startCreatingContent') 
                : `${t('creator.queue.no')} ${filter} ${t('creator.queue.postsAvailable')}`
              }
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CreatorQueue;
