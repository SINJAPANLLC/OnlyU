import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Users, 
  Search,
  UserMinus,
  Crown,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../BottomNavigation';

const FollowListPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // サンプルフォローリストデータ
  const [followList] = useState([
    {
      id: 1,
      name: 'あやか',
      username: '@ayaka_creator',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      followers: 12500,
      isVerified: true,
      isFollowing: true,
      followedAt: '2024-01-15',
      lastActive: '2時間前',
      bio: '毎日楽しい配信をお届けします♪',
      tags: ['コスプレ', 'ゲーム', 'アニメ']
    },
    {
      id: 2,
      name: 'みく',
      username: '@miku_chan',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      followers: 8900,
      isVerified: false,
      isFollowing: true,
      followedAt: '2024-01-10',
      lastActive: '1日前',
      bio: 'アートと音楽が好きです',
      tags: ['アート', '音楽', 'ライブ']
    },
    {
      id: 3,
      name: 'さくら',
      username: '@sakura_official',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      followers: 25600,
      isVerified: true,
      isFollowing: true,
      followedAt: '2024-01-05',
      lastActive: '30分前',
      bio: 'ファッションと美容の情報を発信中',
      tags: ['ファッション', '美容', 'ライフスタイル']
    }
  ]);

  const handleUnfollow = (userId) => {
    console.log('Unfollow user:', userId);
    alert('フォローを解除しました');
  };

  const filteredList = followList.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="text-pink-600 mr-4"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center">
          <Users className="w-6 h-6 text-gray-700 mr-2" />
          <h1 className="text-lg font-semibold text-gray-900">フォロー中</h1>
        </div>
      </div>

      <div className="p-4">
        {/* 検索バー */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="ユーザーを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* フォローリスト */}
        <div className="space-y-4">
          {filteredList.map((user) => (
            <div key={user.id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      {user.isVerified && (
                        <Crown className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{user.username}</p>
                    <p className="text-sm text-gray-600">{user.followers.toLocaleString()}フォロワー</p>
                    <p className="text-xs text-gray-400">最終活動: {user.lastActive}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => handleUnfollow(user.id)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
                >
                  <UserMinus className="w-4 h-4" />
                  <span>フォロー解除</span>
                </button>
              </div>
              
              {user.bio && (
                <p className="mt-3 text-sm text-gray-600">{user.bio}</p>
              )}
              
              {user.tags && user.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {user.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredList.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">フォロー中のユーザーがいません</h3>
            <p className="text-gray-500">興味のあるユーザーをフォローしてみましょう</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default FollowListPage;