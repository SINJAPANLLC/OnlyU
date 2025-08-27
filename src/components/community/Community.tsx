import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Crown, Zap, Heart } from 'lucide-react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('参加中');

  const tabs = ['参加中', '発見', 'おすすめ'];

  const communities = [
    {
      id: '1',
      name: 'フォトグラファー',
      description: '写真好きが集まるコミュニティ',
      members: 15420,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      isJoined: true,
      isPremium: false
    },
    {
      id: '2',
      name: 'ファッション愛好者',
      description: 'ファッションを楽しむ人たちのコミュニティ',
      members: 8932,
      image: 'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=400',
      isJoined: true,
      isPremium: true
    },
    {
      id: '3',
      name: 'アートクリエイター',
      description: 'アート作品を共有する場所',
      members: 12567,
      image: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=400',
      isJoined: false,
      isPremium: false
    },
    {
      id: '4',
      name: 'ライフスタイル',
      description: '日常の素敵な瞬間をシェア',
      members: 23456,
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
      isJoined: false,
      isPremium: true
    }
  ];

  const recentActivities = [
    {
      id: '1',
      user: {
        name: 'ユキ',
        avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
      },
      community: 'フォトグラファー',
      action: '新しい写真を投稿しました',
      timestamp: '15分前'
    },
    {
      id: '2',
      user: {
        name: 'あい',
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
      },
      community: 'ファッション愛好者',
      action: '今日のコーディネートをシェアしました',
      timestamp: '30分前'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto px-4 py-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">コミュニティ</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full font-medium hover:from-pink-600 hover:to-purple-700 transition-all flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>コミュニティ作成</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="flex space-x-1 p-2 bg-gray-50">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
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

          {/* Communities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communities
              .filter(community => 
                activeTab === '参加中' ? community.isJoined : 
                activeTab === '発見' ? !community.isJoined : true
              )
              .map((community, index) => (
                <motion.div
                  key={community.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="relative h-32">
                    <img
                      src={community.image}
                      alt={community.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {community.isPremium && (
                      <div className="absolute top-3 left-3 bg-purple-600 text-white px-2 py-1 rounded-full flex items-center space-x-1 text-xs">
                        <Crown className="w-3 h-3" />
                        <span>プレミアム</span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{community.members.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2">{community.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{community.description}</p>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-2 rounded-lg font-medium transition-all ${
                        community.isJoined
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700'
                      }`}
                    >
                      {community.isJoined ? '参加中' : '参加する'}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="w-5 h-5 text-pink-600" />
              <h3 className="text-lg font-bold text-gray-900">最新の活動</h3>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex items-start space-x-3"
                >
                  <img
                    src={activity.user.avatar}
                    alt={activity.user.name}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user.name}</span> が
                      <span className="text-pink-600"> {activity.community}</span> で
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Popular Topics */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-5 h-5 text-pink-600" />
              <h3 className="text-lg font-bold text-gray-900">人気のトピック</h3>
            </div>
            
            <div className="space-y-3">
              {['#桜の季節', '#新生活', '#春コーデ', '#お花見', '#写真好き'].map((topic, index) => (
                <motion.div
                  key={topic}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <p className="font-medium text-gray-900">{topic}</p>
                  <p className="text-sm text-gray-600">{Math.floor(Math.random() * 1000) + 100} 投稿</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Community;