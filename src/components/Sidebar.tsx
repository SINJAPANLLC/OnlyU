import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, Heart, MessageCircle, User, Users, Settings } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';

const Sidebar = () => {
  const authContext = useContext(AuthContext);
  const location = useLocation();

  if (!authContext) return null;

  const { user } = authContext;

  const menuItems = [
    { path: '/', icon: Home, label: 'ホーム', count: null },
    { path: '/search', icon: Search, label: '検索', count: null },
    { path: '/notifications', icon: Heart, label: '通知', count: 3 },
    { path: '/messages', icon: MessageCircle, label: 'メッセージ', count: 2 },
    { path: `/profile/${user?.username}`, icon: User, label: 'プロフィール', count: null },
    { path: '/community', icon: Users, label: 'コミュニティ', count: null },
    { path: '/settings', icon: Settings, label: '設定', count: null },
  ];

  return (
    <motion.nav
      initial={{ x: -64 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-30 hidden lg:block"
    >
      <div className="p-6">
        <Link to="/" className="flex items-center space-x-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            MyFans
          </span>
        </Link>

        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-pink-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'group-hover:text-pink-600'}`} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.count && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-pink-100 text-pink-600'
                  }`}>
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl border border-pink-100"
        >
          <div className="flex items-center space-x-3 mb-2">
            <img
              src={user?.avatar}
              alt={user?.displayName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-gray-900">{user?.displayName}</p>
              <p className="text-sm text-gray-600">@{user?.username}</p>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>{user?.followers.toLocaleString()} フォロワー</span>
            <span>{user?.following.toLocaleString()} フォロー中</span>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Sidebar;