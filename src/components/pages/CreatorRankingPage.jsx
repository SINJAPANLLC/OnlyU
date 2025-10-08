import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Crown, Trophy, Medal, Star, TrendingUp, Users, Heart, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../BottomNavigation';

const CreatorRankingPage = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const periods = [
    { id: 'daily', name: '日間' },
    { id: 'weekly', name: '週間' },
    { id: 'monthly', name: '月間' },
    { id: 'yearly', name: '年間' }
  ];

  const rankings = [
    {
      rank: 1,
      name: 'あやか',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c933448c?w=100&h=100&fit=crop&crop=face',
      followers: 125000,
      likes: 2500000,
      views: 5000000,
      earnings: 850000,
      isVerified: true,
      trend: 'up'
    },
    {
      rank: 2,
      name: 'みく',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      followers: 98000,
      likes: 1800000,
      views: 4200000,
      earnings: 720000,
      isVerified: true,
      trend: 'up'
    },
    {
      rank: 3,
      name: 'さくら',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      followers: 85000,
      likes: 1500000,
      views: 3800000,
      earnings: 650000,
      isVerified: false,
      trend: 'down'
    },
    {
      rank: 4,
      name: 'ゆい',
      avatar: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&h=100&fit=crop&crop=face',
      followers: 72000,
      likes: 1200000,
      views: 3200000,
      earnings: 580000,
      isVerified: true,
      trend: 'up'
    },
    {
      rank: 5,
      name: 'なな',
      avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop&crop=face',
      followers: 68000,
      likes: 1100000,
      views: 2900000,
      earnings: 520000,
      isVerified: false,
      trend: 'stable'
    }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Trophy className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-500" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">戻る</span>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">クリエイターランキング</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Period Selection */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">期間選択</h3>
          <div className="flex space-x-2">
            {periods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === period.id
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period.name}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">トップ3</h3>
          <div className="flex items-end justify-center space-x-4">
            {/* 2nd Place */}
            {rankings[1] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="relative mb-2">
                  <img
                    src={rankings[1].avatar}
                    alt={rankings[1].name}
                    className="w-16 h-16 rounded-full mx-auto border-2 border-gray-300"
                  />
                  <div className="absolute -top-1 -right-1">
                    <Trophy className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900">{rankings[1].name}</h4>
                <p className="text-sm text-gray-600">{formatNumber(rankings[1].followers)}フォロワー</p>
                <div className="mt-2 bg-gray-100 rounded-lg p-2">
                  <p className="text-xs text-gray-600">2位</p>
                </div>
              </motion.div>
            )}

            {/* 1st Place */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="relative mb-2">
                <img
                  src={rankings[0].avatar}
                  alt={rankings[0].name}
                  className="w-20 h-20 rounded-full mx-auto border-2 border-yellow-400"
                />
                <div className="absolute -top-1 -right-1">
                  <Crown className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
              <h4 className="font-semibold text-gray-900">{rankings[0].name}</h4>
              <p className="text-sm text-gray-600">{formatNumber(rankings[0].followers)}フォロワー</p>
              <div className="mt-2 bg-yellow-100 rounded-lg p-2">
                <p className="text-xs text-yellow-800 font-bold">1位</p>
              </div>
            </motion.div>

            {/* 3rd Place */}
            {rankings[2] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="relative mb-2">
                  <img
                    src={rankings[2].avatar}
                    alt={rankings[2].name}
                    className="w-16 h-16 rounded-full mx-auto border-2 border-orange-300"
                  />
                  <div className="absolute -top-1 -right-1">
                    <Medal className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900">{rankings[2].name}</h4>
                <p className="text-sm text-gray-600">{formatNumber(rankings[2].followers)}フォロワー</p>
                <div className="mt-2 bg-orange-100 rounded-lg p-2">
                  <p className="text-xs text-orange-800">3位</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Full Rankings */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">全体ランキング</h3>
          <div className="space-y-3">
            {rankings.map((creator, index) => (
              <motion.div
                key={creator.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0">
                  {getRankIcon(creator.rank)}
                </div>
                
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-12 h-12 rounded-full"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-900 truncate">{creator.name}</h4>
                    {creator.isVerified && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{formatNumber(creator.followers)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{formatNumber(creator.likes)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{formatNumber(creator.views)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    {getTrendIcon(creator.trend)}
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(creator.earnings)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">売上</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default CreatorRankingPage;
