import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Eye, 
  Heart, 
  DollarSign, 
  TrendingUp,
  Plus,
  FileText,
  Image,
  Video,
  Star,
  Settings
} from 'lucide-react';
import { CreatorStats, CreatorPost } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

const CreatorDashboard = () => {
  const { language, t } = useLanguage();
  
  // Debug: Log when language changes
  useEffect(() => {
    console.log('CreatorDashboard language changed to:', language);
  }, [language]);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<CreatorStats>({
    totalPosts: 0,
    totalFollowers: 0,
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0,
    totalEarnings: 0,
    monthlyGrowth: 0,
    topPosts: [],
    recentActivity: []
  });

  useEffect(() => {
    const mockStats: CreatorStats = {
      totalPosts: 24,
      totalFollowers: 15420,
      totalViews: 125000,
      totalLikes: 8900,
      totalComments: 1200,
      totalEarnings: 1250.50,
      monthlyGrowth: 12.5,
      topPosts: [],
      recentActivity: []
    };
    setStats(mockStats);
  }, []);

  const tabs = [
    { id: 'overview', label: t('creator.overview'), icon: BarChart3 },
    { id: 'posts', label: t('creator.posts'), icon: FileText },
    { id: 'analytics', label: t('creator.analytics'), icon: TrendingUp },
    { id: 'fans', label: t('creator.fans'), icon: Users },
    { id: 'subscriptions', label: t('creator.subscriptions'), icon: Star },
    { id: 'settings', label: t('creator.settings'), icon: Settings }
  ];

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('creator.dashboard.title')}</h1>
            <p className="text-gray-600">{t('creator.dashboard.subtitle')}</p>
          </div>
          <Link to="/creator/post/new">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>{t('creator.newPost')}</span>
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t('creator.followers')}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalFollowers.toLocaleString()}</p>
                <p className="text-sm text-green-600 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +{stats.monthlyGrowth}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t('creator.totalViews')}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t('creator.totalLikes')}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalLikes.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t('creator.totalEarnings')}</p>
                <p className="text-2xl font-bold text-gray-900">¥{stats.totalEarnings.toLocaleString()}</p>
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
            {activeTab === 'posts' && (
              <motion.div
                key="posts"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('creator.postManagement')}</h3>
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">{t('creator.postManagementDesc')}</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('creator.analytics')}</h3>
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">{t('creator.analyticsDesc')}</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'fans' && (
              <motion.div
                key="fans"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('creator.fanManagement')}</h3>
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">{t('creator.fanManagementDesc')}</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'subscriptions' && (
              <motion.div
                key="subscriptions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('creator.subscriptions')}</h3>
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">{t('creator.subscriptionsDesc')}</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('creator.settings')}</h3>
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">{t('creator.settingsDesc')}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
