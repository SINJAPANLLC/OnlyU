import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Edit3, Trash2, Users, DollarSign, Calendar, Settings, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../BottomNavigation';

const ActivePlansPage = () => {
  const navigate = useNavigate();
  const [showInactive, setShowInactive] = useState(false);

  const plans = [
    {
      id: 1,
      name: 'ベーシックプラン',
      price: 1980,
      subscribers: 1250,
      revenue: 2475000,
      status: 'active',
      description: '基本的なコンテンツを提供するプラン',
      features: ['月5本の動画投稿', 'DM機能', '基本サポート'],
      createdAt: '2024-01-15',
      lastUpdated: '2024-01-20'
    },
    {
      id: 2,
      name: 'プレミアムプラン',
      price: 3980,
      subscribers: 850,
      revenue: 3383000,
      status: 'active',
      description: '高品質なコンテンツと特別な特典',
      features: ['月10本の動画投稿', 'DM機能', '優先サポート', '限定コンテンツ'],
      createdAt: '2024-01-10',
      lastUpdated: '2024-01-18'
    },
    {
      id: 3,
      name: 'VIPプラン',
      price: 5980,
      subscribers: 420,
      revenue: 2511600,
      status: 'active',
      description: '最高級のコンテンツと専用サービス',
      features: ['無制限動画投稿', 'DM機能', '24時間サポート', '限定コンテンツ', '個別相談'],
      createdAt: '2024-01-05',
      lastUpdated: '2024-01-22'
    },
    {
      id: 4,
      name: 'テストプラン',
      price: 500,
      subscribers: 0,
      revenue: 0,
      status: 'inactive',
      description: 'テスト用のプラン',
      features: ['テスト機能'],
      createdAt: '2024-01-25',
      lastUpdated: '2024-01-25'
    }
  ];

  const activePlans = plans.filter(plan => plan.status === 'active');
  const inactivePlans = plans.filter(plan => plan.status === 'inactive');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'アクティブ';
      case 'inactive':
        return '非アクティブ';
      case 'paused':
        return '一時停止';
      default:
        return '不明';
    }
  };

  const totalRevenue = activePlans.reduce((sum, plan) => sum + plan.revenue, 0);
  const totalSubscribers = activePlans.reduce((sum, plan) => sum + plan.subscribers, 0);

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
          <h1 className="text-lg font-semibold text-gray-900">運営中のプラン</h1>
          <button
            onClick={() => navigate('/create-plan')}
            className="bg-pink-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors"
          >
            <Plus className="w-4 h-4 inline mr-1" />
            新規作成
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">総売上</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">総加入者数</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(totalSubscribers)}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </motion.div>
        </div>

        {/* Filter Toggle */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">プラン一覧</h3>
            <button
              onClick={() => setShowInactive(!showInactive)}
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800"
            >
              {showInactive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showInactive ? '非アクティブを非表示' : '非アクティブを表示'}</span>
            </button>
          </div>
        </div>

        {/* Active Plans */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">アクティブプラン</h3>
          {activePlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-xl font-bold text-gray-900">{plan.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                      {getStatusText(plan.status)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{plan.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">価格</p>
                      <p className="text-lg font-semibold text-gray-900">{formatCurrency(plan.price)}/月</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">加入者数</p>
                      <p className="text-lg font-semibold text-gray-900">{formatNumber(plan.subscribers)}人</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">月間売上</p>
                      <p className="text-lg font-semibold text-green-600">{formatCurrency(plan.revenue)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">最終更新</p>
                      <p className="text-sm text-gray-600">{plan.lastUpdated}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => navigate(`/edit-plan/${plan.id}`)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate(`/plan-analytics/${plan.id}`)}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">プラン特典</h5>
                <div className="flex flex-wrap gap-2">
                  {plan.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Inactive Plans */}
        {showInactive && inactivePlans.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">非アクティブプラン</h3>
            {inactivePlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 opacity-75"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-xl font-bold text-gray-900">{plan.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                        {getStatusText(plan.status)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{plan.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">価格</p>
                        <p className="text-lg font-semibold text-gray-900">{formatCurrency(plan.price)}/月</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">加入者数</p>
                        <p className="text-lg font-semibold text-gray-900">{formatNumber(plan.subscribers)}人</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => navigate(`/edit-plan/${plan.id}`)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('このプランを削除しますか？')) {
                          // 削除処理
                        }
                      }}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ActivePlansPage;
