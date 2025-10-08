import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Users, 
  Search,
  Plus,
  User,
  Mail,
  Crown,
  CheckCircle,
  AlertCircle,
  Settings,
  Trash2,
  Edit3,
  Eye,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../BottomNavigation';

const SwitchAccountPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddAccount, setShowAddAccount] = useState(false);

  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: '田中 太郎',
      email: 'tanaka@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      isActive: true,
      lastLogin: '2024-01-20T10:30:00Z',
      accountType: 'creator',
      followers: 12500,
      isVerified: true,
      status: 'online'
    },
    {
      id: 2,
      name: '佐藤 花子',
      email: 'sato@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      isActive: false,
      lastLogin: '2024-01-18T15:45:00Z',
      accountType: 'fan',
      followers: 0,
      isVerified: false,
      status: 'offline'
    },
    {
      id: 3,
      name: '山田 次郎',
      email: 'yamada@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isActive: false,
      lastLogin: '2024-01-15T09:20:00Z',
      accountType: 'creator',
      followers: 8900,
      isVerified: true,
      status: 'away'
    }
  ]);

  const filteredAccounts = accounts.filter(account => 
    account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSwitchAccount = (accountId) => {
    // アカウント切り替え処理
    setAccounts(prev => prev.map(account => ({
      ...account,
      isActive: account.id === accountId
    })));
    
    // 実際のアプリでは、ここで認証状態を更新
    console.log('Switching to account:', accountId);
    alert(`アカウントを切り替えました: ${accounts.find(acc => acc.id === accountId)?.name}`);
  };

  const handleAddAccount = () => {
    setShowAddAccount(true);
    // 実際のアプリでは、ログイン画面に遷移
    navigate('/login');
  };

  const handleRemoveAccount = (accountId) => {
    if (window.confirm('このアカウントを削除しますか？')) {
      setAccounts(prev => prev.filter(account => account.id !== accountId));
    }
  };

  const formatLastLogin = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return '1時間以内';
    if (diffInHours < 24) return `${diffInHours}時間前`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}日前`;
    return date.toLocaleDateString('ja-JP');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getAccountTypeIcon = (type) => {
    switch (type) {
      case 'creator': return Crown;
      case 'fan': return User;
      default: return User;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
          <h1 className="text-lg font-semibold text-gray-900">アカウントを切り替える</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Search */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="アカウントを検索..."
              className="flex-1 outline-none text-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Add Account Button */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <button
            onClick={handleAddAccount}
            className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-pink-500 hover:bg-pink-50 transition-colors"
          >
            <Plus className="w-6 h-6 text-gray-400" />
            <span className="font-medium text-gray-700">新しいアカウントを追加</span>
          </button>
        </div>

        {/* Accounts List */}
        <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100">
          {filteredAccounts.length > 0 ? (
            filteredAccounts.map(account => {
              const AccountTypeIcon = getAccountTypeIcon(account.accountType);
              
              return (
                <div key={account.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="relative">
                      <img 
                        src={account.avatar} 
                        alt={account.name} 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(account.status)}`} />
                    </div>

                    {/* Account Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">{account.name}</h3>
                        {account.isVerified && <Crown className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                        {account.isActive && (
                          <div className="flex items-center space-x-1 bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full text-xs font-medium">
                            <CheckCircle className="w-3 h-3" />
                            <span>現在のアカウント</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <AccountTypeIcon className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500">
                          {account.accountType === 'creator' ? 'クリエイター' : 'ファン'}
                        </span>
                        {account.followers > 0 && (
                          <span className="text-sm text-gray-500">
                            • {account.followers.toLocaleString()}フォロワー
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span className="truncate">{account.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatLastLogin(account.lastLogin)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      {!account.isActive && (
                        <button
                          onClick={() => handleSwitchAccount(account.id)}
                          className="px-4 py-2 bg-pink-500 text-white rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors"
                        >
                          切り替え
                        </button>
                      )}
                      
                      <div className="relative group">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Settings className="w-4 h-4" />
                        </button>
                        
                        {/* Dropdown Menu */}
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                          <div className="py-1">
                            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                              <Edit3 className="w-4 h-4" />
                              <span>アカウント情報を編集</span>
                            </button>
                            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                              <Eye className="w-4 h-4" />
                              <span>プロフィールを表示</span>
                            </button>
                            <div className="border-t border-gray-100 my-1" />
                            <button 
                              onClick={() => handleRemoveAccount(account.id)}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>アカウントを削除</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>アカウントが見つかりませんでした。</p>
              <p className="text-sm mt-1">検索キーワードを変更してお試しください。</p>
            </div>
          )}
        </div>

        {/* Help Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">アカウント切り替えについて</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 複数のアカウントを管理できます</li>
                <li>• アカウントを切り替えると、そのアカウントの設定が適用されます</li>
                <li>• 各アカウントのデータは独立して保存されます</li>
                <li>• 不要なアカウントは削除できます</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default SwitchAccountPage;
