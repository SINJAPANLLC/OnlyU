import React, { useContext, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Bell,
  MessageSquare,
  BarChart3,
  Users,
  Megaphone,
  ListChecks,
  Settings,
  Plus,
} from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';
import LogoCreator from '../../assets/logo.png';

const CreatorSidebar: React.FC = () => {
  const authContext = useContext(AuthContext);
  const location = useLocation();

  if (!authContext) return null;
  const { user } = authContext;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const menuItems = useMemo(() => {
    return [
      { path: '/creator/feed', icon: Home, label: 'My Feed' },
      { path: '/creator/notifications', icon: Bell, label: 'Notifications' },
      { path: '/creator/messages', icon: MessageSquare, label: 'Messages' },
      { path: '/creator/statistics', icon: BarChart3, label: 'Statistics' },
      { path: '/creator/fans', icon: Users, label: 'My Fans' },
      { path: '/creator/marketing', icon: Megaphone, label: 'Marketing' },
      { path: '/creator/queue', icon: ListChecks, label: 'Queue' },
      { path: '/creator/settings', icon: Settings, label: 'Settings' },
    ];
  }, []);

  return (
    <motion.nav
      initial={{ x: -64 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-30 hidden lg:flex flex-col"
    >
      <div className="p-6 flex-1 flex flex-col">
        {/* Logo */}
        <Link to="/creator" className="flex items-center space-x-2 mb-8">
          <img src={LogoCreator} alt="logo" className="h-8 w-auto" />
        </Link>

        {/* Menu */}
        <div className="space-y-2 flex-1">
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
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? 'text-white' : 'group-hover:text-pink-600'
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* New Post Button */}
        <Link to="/creator/post/new">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 shadow-md"
          >
            <Plus className="w-5 h-5" />
            <span>New Post</span>
          </motion.button>
        </Link>

        {/* Creator Info Box */}
        {user?.role === 'creator' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl border border-pink-100"
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
              <div className="text-center">
                <div className="font-semibold text-gray-900">
                  {user?.followers.toLocaleString()}
                </div>
                <div className="text-xs">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900">
                  {user?.following.toLocaleString()}
                </div>
                <div className="text-xs">Following</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default CreatorSidebar;
