import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  FileText, 
  Flag, 
  Shield, 
  Ban, 
  Trash2, 
  CheckCircle, 
  TrendingUp,
  UserCheck,
  UserX
} from 'lucide-react';
import { User, AdminStats } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

const AdminDashboard = () => {
  const { language, t } = useLanguage();
  
  // Debug: Log when language changes
  useEffect(() => {
    console.log('AdminDashboard language changed to:', language);
  }, [language]);
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalPosts: 0,
    totalReports: 0,
    bannedUsers: 0,
    removedPosts: 0
  });

  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: '1',
        username: 'sakura_chan',
        displayName: '桜子',
        email: 'sakura@example.com',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
        bio: 'クリエイター｜毎日投稿中✨',
        followers: 15420,
        following: 892,
        isVerified: true,
        joinedDate: '2023-01-15',
        role: 'creator',
        status: 'active',
        createdAt: '2023-01-15'
      },
      {
        id: '2',
        username: 'admin_manager',
        displayName: 'Admin Manager',
        email: 'admin@myfans.com',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
        bio: 'Platform Manager',
        followers: 0,
        following: 0,
        isVerified: true,
        joinedDate: '2023-01-01',
        role: 'manager',
        status: 'active',
        createdAt: '2023-01-01'
      }
    ];

    setUsers(mockUsers);
    setStats({
      totalUsers: mockUsers.length,
      totalPosts: 2,
      totalReports: 1,
      bannedUsers: 0,
      removedPosts: 0
    });
  }, []);

  const handleBanUser = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: 'banned' as const } : user
    ));
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      manager: { color: 'bg-purple-100 text-purple-800', icon: Shield },
      creator: { color: 'bg-blue-100 text-blue-800', icon: UserCheck },
      fan: { color: 'bg-green-100 text-green-800', icon: Users }
    };
    const config = roleConfig[role as keyof typeof roleConfig];
    const Icon = config.icon;
    
    const roleLabels = {
      manager: t('admin.manager'),
      creator: t('admin.creator'),
      fan: t('admin.fan')
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {roleLabels[role as keyof typeof roleLabels]}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <CheckCircle className="w-3 h-3 mr-1" />
        {t('admin.active')}
      </span>;
    }
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
      <Ban className="w-3 h-3 mr-1" />
              {t('admin.banned')}
    </span>;
  };

  const tabs = [
    { id: 'overview', label: t('admin.overview'), icon: TrendingUp },
    { id: 'users', label: t('admin.users'), icon: Users },
    { id: 'posts', label: t('admin.posts'), icon: FileText },
    { id: 'reports', label: t('admin.reports'), icon: Flag }
  ];

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('admin.dashboard.title')}</h1>
        <p className="text-gray-600">{t('admin.dashboard.subtitle')}</p>
      </motion.div>

      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
        >
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t('admin.totalUsers')}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t('admin.totalPosts')}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPosts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Flag className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t('admin.totalReports')}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalReports}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <UserX className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t('admin.bannedUsers')}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.bannedUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Trash2 className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t('admin.removedPosts')}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.removedPosts}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    isActive
                      ? 'border-pink-500 text-pink-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'users' && (
              <motion.div
                key="users"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{t('admin.users')}</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('admin.user')}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('admin.role')}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('admin.status')}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('admin.joined')}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('admin.action')}</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img className="h-10 w-10 rounded-full object-cover" src={user.avatar} alt={user.displayName} />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.displayName}</div>
                                <div className="text-sm text-gray-500">@{user.username}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getRoleBadge(user.role)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(user.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.joinedDate).toLocaleDateString(language === 'ja' ? 'ja-JP' : 'en-US')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {user.status === 'active' ? (
                              <button
                                onClick={() => handleBanUser(user.id)}
                                className="text-red-600 hover:text-red-900 flex items-center"
                              >
                                <Ban className="w-4 h-4 mr-1" />
                                {t('admin.ban')}
                              </button>
                            ) : (
                              <button
                                onClick={() => handleBanUser(user.id)}
                                className="text-green-600 hover:text-green-900 flex items-center"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                {t('admin.unban')}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
