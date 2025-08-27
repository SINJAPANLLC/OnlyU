import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Link as LinkIcon, Settings, MessageCircle } from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';

const Profile = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) return null;

  const { user } = authContext;

  const stats = [
    { label: '投稿', count: 1247 },
    { label: 'フォロワー', count: user?.followers || 0 },
    { label: 'フォロー中', count: user?.following || 0 },
    { label: 'いいね', count: 24567 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 py-6"
    >
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 relative">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute -bottom-12 left-6"
          >
            <img
              src={user?.avatar}
              alt={user?.displayName}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </motion.div>
        </div>

        {/* Profile Info */}
        <div className="pt-16 px-6 pb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{user?.displayName}</h1>
                {user?.isVerified && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                )}
              </div>
              <p className="text-gray-600">@{user?.username}</p>
            </div>
            
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full font-medium hover:from-pink-600 hover:to-purple-700 transition-all flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>メッセージ</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-full font-medium hover:bg-gray-50 transition-all flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>編集</span>
              </motion.button>
            </div>
          </div>

          <p className="text-gray-900 mb-4">{user?.bio}</p>

          <div className="flex items-center space-x-6 text-gray-600 text-sm mb-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>2023年1月から参加</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>東京, 日本</span>
            </div>
            <div className="flex items-center space-x-1">
              <LinkIcon className="w-4 h-4" />
              <a href="#" className="text-pink-600 hover:underline">website.com</a>
            </div>
          </div>

          <div className="flex space-x-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="text-center"
              >
                <p className="text-xl font-bold text-gray-900">{stat.count.toLocaleString()}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['投稿', 'メディア', 'いいね', 'プレミアム'].map((tab, index) => (
              <button
                key={tab}
                className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                  index === 0
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="aspect-square bg-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all cursor-pointer group"
              >
                <img
                  src={`https://images.pexels.com/photos/${1239291 + index * 100}/pexels-photo-${1239291 + index * 100}.jpeg?auto=compress&cs=tinysrgb&w=400`}
                  alt={`Post ${item}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;