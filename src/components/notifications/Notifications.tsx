import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, UserPlus, Bell } from 'lucide-react';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('すべて');

  const tabs = ['すべて', 'いいね', 'コメント', 'フォロー'];

  const notifications = [
    {
      id: '1',
      type: 'like',
      user: {
        name: 'ユキ',
        username: 'yuki_model',
        avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
      },
      content: 'あなたの投稿にいいねしました',
      timestamp: '2分前',
      isRead: false,
      postImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: '2',
      type: 'comment',
      user: {
        name: 'あい',
        username: 'ai_creator',
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
      },
      content: 'あなたの投稿にコメントしました: "素敵な写真ですね！"',
      timestamp: '15分前',
      isRead: false,
      postImage: 'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: '3',
      type: 'follow',
      user: {
        name: 'みく',
        username: 'miku_photo',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
      },
      content: 'あなたをフォローしました',
      timestamp: '1時間前',
      isRead: true
    },
    {
      id: '4',
      type: 'like',
      user: {
        name: 'さくら',
        username: 'sakura_model',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
      },
      content: 'あなたの投稿にいいねしました',
      timestamp: '2時間前',
      isRead: true,
      postImage: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'follow':
        return <UserPlus className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto px-4 py-6"
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">通知</h1>
          
          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-full p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
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

        {/* Notifications List */}
        <div className="divide-y divide-gray-100">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                !notification.isRead ? 'bg-pink-50 border-l-4 border-pink-500' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <img
                    src={notification.user.avatar}
                    alt={notification.user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                    {getIcon(notification.type)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-gray-900">
                        <span className="font-semibold">{notification.user.name}</span>{' '}
                        <span className="text-gray-600">{notification.content}</span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{notification.timestamp}</p>
                    </div>
                    
                    {notification.postImage && (
                      <img
                        src={notification.postImage}
                        alt="Post"
                        className="w-12 h-12 rounded-lg object-cover ml-4 flex-shrink-0"
                      />
                    )}
                  </div>
                  
                  {notification.type === 'follow' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full font-medium hover:from-pink-600 hover:to-purple-700 transition-all text-sm"
                    >
                      フォローバック
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="p-6 text-center">
          <button className="text-pink-600 hover:text-pink-700 font-medium">
            すべての通知を見る
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Notifications;