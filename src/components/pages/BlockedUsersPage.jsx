import React, { useState } from 'react';
import { 
  ArrowLeft, 
  UserX, 
  Search,
  UserCheck,
  Shield,
  AlertTriangle,
  Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../BottomNavigation';

const BlockedUsersPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // サンプルブロックユーザーデータ
  const [blockedUsers, setBlockedUsers] = useState([
    {
      id: 1,
      name: 'スパムユーザー1',
      username: '@spam_user1',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      blockedAt: '2024-01-20',
      reason: 'スパム行為',
      lastActivity: '1週間前',
      reportCount: 5
    },
    {
      id: 2,
      name: '不適切なユーザー',
      username: '@inappropriate_user',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      blockedAt: '2024-01-15',
      reason: '不適切なコンテンツ',
      lastActivity: '3日前',
      reportCount: 3
    },
    {
      id: 3,
      name: '迷惑ユーザー',
      username: '@annoying_user',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      blockedAt: '2024-01-10',
      reason: '迷惑行為',
      lastActivity: '2週間前',
      reportCount: 2
    }
  ]);

  const handleUnblock = (userId) => {
    setBlockedUsers(prev => prev.filter(user => user.id !== userId));
    console.log('Unblock user:', userId);
    alert('ブロックを解除しました');
  };

  const handleRemoveFromList = (userId) => {
    setBlockedUsers(prev => prev.filter(user => user.id !== userId));
    console.log('Remove user from list:', userId);
    alert('リストから削除しました');
  };

  const getReasonColor = (reason) => {
    switch (reason) {
      case 'スパム行為':
        return 'text-red-600 bg-red-100';
      case '不適切なコンテンツ':
        return 'text-orange-600 bg-orange-100';
      case '迷惑行為':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredUsers = blockedUsers.filter(user => 
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
          <UserX className="w-6 h-6 text-gray-700 mr-2" />
          <h1 className="text-lg font-semibold text-gray-900">ブロックしたユーザー</h1>
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

        {/* ブロックユーザーリスト */}
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.username}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 text-xs rounded-full ${getReasonColor(user.reason)}`}>
                        {user.reason}
                      </span>
                      <span className="text-xs text-gray-400">
                        報告数: {user.reportCount}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      ブロック日: {user.blockedAt} | 最終活動: {user.lastActivity}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUnblock(user.id)}
                    className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center space-x-1"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>解除</span>
                  </button>
                  <button
                    onClick={() => handleRemoveFromList(user.id)}
                    className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center space-x-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>削除</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">ブロックしたユーザーがいません</h3>
            <p className="text-gray-500">ブロックしたユーザーがここに表示されます</p>
          </div>
        )}

        {/* ヘルプ情報 */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">ブロック機能について</h4>
              <p className="text-sm text-blue-700 mb-2">
                ブロックしたユーザーは以下の制限を受けます：
              </p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• あなたのプロフィールや投稿を見ることができません</li>
                <li>• あなたにメッセージを送ることができません</li>
                <li>• あなたのコンテンツにいいねやコメントをすることができません</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default BlockedUsersPage;