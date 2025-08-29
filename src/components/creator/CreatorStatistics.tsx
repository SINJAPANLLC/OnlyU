import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, Eye, Heart, MessageCircle, DollarSign, Calendar, BarChart3 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface StatData {
  period: string;
  followers: number;
  views: number;
  likes: number;
  comments: number;
  earnings: number;
  engagement: number;
}

const CreatorStatistics = () => {
  const { t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [stats, setStats] = useState<StatData[]>([]);

  useEffect(() => {
    // Mock statistics data
    const mockStats: StatData[] = [
      {
        period: '2024-01-15',
        followers: 15420,
        views: 125000,
        likes: 8900,
        comments: 1200,
        earnings: 1250.50,
        engagement: 8.1
      },
      {
        period: '2024-01-14',
        followers: 15380,
        views: 118000,
        likes: 8200,
        comments: 1100,
        earnings: 1150.00,
        engagement: 7.9
      },
      {
        period: '2024-01-13',
        followers: 15340,
        views: 112000,
        likes: 7800,
        comments: 1050,
        earnings: 1080.00,
        engagement: 7.8
      }
    ];
    setStats(mockStats);
  }, []);

  const currentStats = stats[0] || {
    followers: 15420,
    views: 125000,
    likes: 8900,
    comments: 1200,
    earnings: 1250.50,
    engagement: 8.1
  };

  const previousStats = stats[1] || {
    followers: 15380,
    views: 118000,
    likes: 8200,
    comments: 1100,
    earnings: 1150.00,
    engagement: 7.9
  };

  const calculateGrowth = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const getGrowthIcon = (growth: string) => {
    const value = parseFloat(growth);
    return value >= 0 ? (
      <TrendingUp className="w-4 h-4 text-green-500" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-500" />
    );
  };

  const getGrowthColor = (growth: string) => {
    const value = parseFloat(growth);
    return value >= 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('creator.statistics.title')}</h1>
            <p className="text-gray-600">{t('creator.statistics.subtitle')}</p>
          </div>
          
          <div className="flex gap-2">
            {(['7d', '30d', '90d', '1y'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex items-center space-x-1">
                {getGrowthIcon(calculateGrowth(currentStats.followers, previousStats.followers))}
                <span className={`text-sm font-medium ${getGrowthColor(calculateGrowth(currentStats.followers, previousStats.followers))}`}>
                  {calculateGrowth(currentStats.followers, previousStats.followers)}%
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {currentStats.followers.toLocaleString()}
            </h3>
            <p className="text-gray-600">{t('creator.statistics.followers')}</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex items-center space-x-1">
                {getGrowthIcon(calculateGrowth(currentStats.views, previousStats.views))}
                <span className={`text-sm font-medium ${getGrowthColor(calculateGrowth(currentStats.views, previousStats.views))}`}>
                  {calculateGrowth(currentStats.views, previousStats.views)}%
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {currentStats.views.toLocaleString()}
            </h3>
            <p className="text-gray-600">{t('creator.statistics.views')}</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex items-center space-x-1">
                {getGrowthIcon(calculateGrowth(currentStats.likes, previousStats.likes))}
                <span className={`text-sm font-medium ${getGrowthColor(calculateGrowth(currentStats.likes, previousStats.likes))}`}>
                  {calculateGrowth(currentStats.likes, previousStats.likes)}%
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {currentStats.likes.toLocaleString()}
            </h3>
            <p className="text-gray-600">{t('creator.statistics.likes')}</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex items-center space-x-1">
                {getGrowthIcon(calculateGrowth(currentStats.earnings, previousStats.earnings))}
                <span className={`text-sm font-medium ${getGrowthColor(calculateGrowth(currentStats.earnings, previousStats.earnings))}`}>
                  {calculateGrowth(currentStats.earnings, previousStats.earnings)}%
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              ¥{currentStats.earnings.toLocaleString()}
            </h3>
            <p className="text-gray-600">{t('creator.statistics.earnings')}</p>
          </div>
        </div>

        {/* Engagement Rate */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">{t('creator.statistics.engagementRate')}</h2>
            <div className="flex items-center space-x-1">
              {getGrowthIcon(calculateGrowth(currentStats.engagement, previousStats.engagement))}
              <span className={`text-sm font-medium ${getGrowthColor(calculateGrowth(currentStats.engagement, previousStats.engagement))}`}>
                {calculateGrowth(currentStats.engagement, previousStats.engagement)}%
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-3xl font-bold text-gray-900">
              {currentStats.engagement}%
            </div>
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full"
                  style={{ width: `${Math.min(currentStats.engagement, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {t('creator.statistics.averageEngagementRate')} {selectedPeriod}
          </p>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{t('creator.statistics.recentActivity')}</h2>
          <div className="space-y-4">
            {stats.slice(0, 5).map((stat, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-pink-100 rounded-lg">
                    <Calendar className="w-4 h-4 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {new Date(stat.period).toLocaleDateString('ja-JP')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {stat.views.toLocaleString()} {t('creator.statistics.views')} • {stat.likes.toLocaleString()} {t('creator.statistics.likes')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">¥{stat.earnings.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{stat.engagement}% {t('creator.statistics.engagement')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreatorStatistics;
