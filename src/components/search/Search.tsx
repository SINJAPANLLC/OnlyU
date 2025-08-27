import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, TrendingUp, Hash } from 'lucide-react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('すべて');

  const tabs = ['すべて', 'ユーザー', 'タグ', 'トレンド'];

  const trendingTopics = [
    { tag: '#桜の季節', posts: 15420 },
    { tag: '#新生活', posts: 8932 },
    { tag: '#春コーデ', posts: 12567 },
    { tag: '#お花見', posts: 6789 },
    { tag: '#写真好きと繋がりたい', posts: 25431 }
  ];

  const suggestedUsers = [
    {
      id: '1',
      username: 'yuki_model',
      displayName: 'ユキ',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      followers: 25600,
      isVerified: true
    },
    {
      id: '2',
      username: 'ai_creator',
      displayName: 'あい',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      followers: 18200,
      isVerified: true
    },
    {
      id: '3',
      username: 'miku_photo',
      displayName: 'みく',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      followers: 32100,
      isVerified: false
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 py-6"
    >
      {/* Search Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="relative mb-6">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="検索してください..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Search Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-full p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeTab === tab
                  ? 'bg-white text-pink-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {searchQuery ? (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  "{searchQuery}" の検索結果
                </h2>
                <p className="text-gray-600">検索結果が見つかりませんでした。</p>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">おすすめユーザー</h2>
                <div className="space-y-4">
                  {suggestedUsers.map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={user.avatar}
                          alt={user.displayName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{user.displayName}</h3>
                            {user.isVerified && (
                              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm">@{user.username}</p>
                          <p className="text-gray-500 text-sm">{user.followers.toLocaleString()} フォロワー</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full font-medium hover:from-pink-600 hover:to-purple-700 transition-all"
                      >
                        フォロー
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-pink-600" />
              <h3 className="text-lg font-bold text-gray-900">トレンド</h3>
            </div>
            <div className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <motion.div
                  key={topic.tag}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Hash className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{topic.tag}</p>
                      <p className="text-sm text-gray-600">{topic.posts.toLocaleString()} 投稿</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Popular Categories */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">人気カテゴリー</h3>
            <div className="space-y-2">
              {['フォト', 'ファッション', 'ライフスタイル', 'アート', 'フィットネス'].map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 hover:text-pink-600"
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Search;