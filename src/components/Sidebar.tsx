import React, { useContext, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Search, 
  Heart, 
  MessageCircle, 
  User, 
  Users, 
  Settings, 
  Shield, 
  Palette,
  Bell,
  Star,
  Crown
} from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import Logo from '../assets/logo.png';

const Sidebar = () => {
  const authContext = useContext(AuthContext);
  const location = useLocation();
  const { t } = useLanguage();

  if (!authContext) return null;

  const { user, isManager } = authContext;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const menuItems = useMemo(() => {
    const items = [
      { path: '/fan/home', icon: Home, label: 'Home' },
      { path: '/fan/search', icon: Search, label: 'Discover' },
      { path: '/fan/notifications', icon: Bell, label: 'Notifications' },
      { path: '/fan/messages', icon: MessageCircle, label: 'Messages' },
      { path: '/fan/favorites', icon: Heart, label: 'Favorites' },
      { path: '/fan/community', icon: Users, label: 'Community' },
      { path: `/fan/profile/${user?.username}`, icon: User, label: 'My Profile' },
      { path: '/fan/settings', icon: Settings, label: 'Settings' },
    ];

    // Add admin menu item for managers
    if (isManager) {
      items.push({ path: '/fan/admin', icon: Shield, label: 'Admin Panel' });
    }

    // Add creator menu item for creators
    if (user?.role === 'creator') {
      items.push({ path: '/creator', icon: Crown, label: 'Creator Mode' });
    }

    return items;
  }, [user, isManager]);

  return (
    <motion.nav
      initial={{ x: -64 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-30 hidden lg:flex flex-col"
    >
      <div className="p-6 flex-1 flex flex-col">
        {/* Logo */}
        <Link to="/fan/home" className="flex items-center space-x-2 mb-8">
          <img src={Logo} alt="logo" className="h-8 w-auto" />
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

        {/* Fan Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl border border-pink-100"
        >
          <div className="flex items-center space-x-3 mb-2">
            <img
              src={user?.avatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'}
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
                {user?.followers?.toLocaleString() || '0'}
              </div>
              <div className="text-xs">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">
                {user?.following?.toLocaleString() || '0'}
              </div>
              <div className="text-xs">Following</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Sidebar;