import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, Calendar, Download, Filter, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../BottomNavigation';

const SalesManagementPage = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedChart, setSelectedChart] = useState('bar');

  const periods = [
    { id: 'daily', name: '日間' },
    { id: 'weekly', name: '週間' },
    { id: 'monthly', name: '月間' },
    { id: 'yearly', name: '年間' }
  ];

  const chartTypes = [
    { id: 'bar', name: '棒グラフ', icon: BarChart }
  ];

  const salesData = [
    {
      id: 1,
      source: 'ベーシックプラン',
      amount: 2475000,
      subscribers: 1250,
      change: 12.5,
      trend: 'up'
    },
    {
      id: 2,
      source: 'プレミアムプラン',
      amount: 3383000,
      subscribers: 850,
      change: 8.3,
      trend: 'up'
    },
    {
      id: 3,
      source: 'VIPプラン',
      amount: 2511600,
      subscribers: 420,
      change: -2.1,
      trend: 'down'
    },
    {
      id: 4,
      source: 'チップ・投げ銭',
      amount: 450000,
      subscribers: 0,
      change: 25.7,
      trend: 'up'
    },
    {
      id: 5,
      source: 'グッズ販売',
      amount: 180000,
      subscribers: 0,
      change: 5.2,
      trend: 'up'
    }
  ];

  const monthlyData = [
    { month: '1月', amount: 6500000 },
    { month: '2月', amount: 7200000 },
    { month: '3月', amount: 6800000 },
    { month: '4月', amount: 7500000 },
    { month: '5月', amount: 8200000 },
    { month: '6月', amount: 8900000 }
  ];

  const totalRevenue = salesData.reduce((sum, item) => sum + item.amount, 0);
  const totalSubscribers = salesData.reduce((sum, item) => sum + item.subscribers, 0);
  const averageChange = salesData.reduce((sum, item) => sum + item.change, 0) / salesData.length;
  
  // 手数料計算
  const creatorFeeRate = 0.15; // クリエイター売上手数料率（15%税別）
  const customerFeeRate = 0.10; // お客様購入手数料率（10%税別）
  const creatorFee = Math.floor(totalRevenue * creatorFeeRate); // クリエイター手数料
  const netRevenue = totalRevenue - creatorFee; // 手数料差し引き後の収益

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

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 
      <TrendingUp className="w-4 h-4 text-green-500" /> : 
      <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
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
          <h1 className="text-lg font-semibold text-gray-900">売上管理</h1>
          <button
            onClick={() => navigate('/sales-export')}
            className="bg-pink-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors"
          >
            <Download className="w-4 h-4 inline mr-1" />
            エクスポート
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
                <p className={`text-sm flex items-center ${getTrendColor(averageChange > 0 ? 'up' : 'down')}`}>
                  {getTrendIcon(averageChange > 0 ? 'up' : 'down')}
                  <span className="ml-1">{Math.abs(averageChange).toFixed(1)}%</span>
                </p>
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
                <p className="text-sm text-gray-600">手数料差し引き後</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(netRevenue)}</p>
                <p className="text-sm text-gray-500">実際の受取金額</p>
              </div>
              <BarChart className="w-8 h-8 text-blue-500" />
            </div>
          </motion.div>
        </div>

        {/* Fee Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">手数料情報</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">クリエイター売上手数料</h4>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(creatorFee)}</p>
              <p className="text-sm text-gray-600">15%税別（差し引き済み）</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">お客様購入手数料</h4>
              <p className="text-2xl font-bold text-orange-600">{formatCurrency(Math.floor(totalRevenue * customerFeeRate))}</p>
              <p className="text-sm text-gray-600">10%税別（購入時に上乗せ）</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">手数料率</h4>
              <p className="text-2xl font-bold text-blue-600">{(creatorFeeRate * 100).toFixed(0)}%</p>
              <p className="text-sm text-gray-600">クリエイター手数料率</p>
            </div>
          </div>
        </motion.div>

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

        {/* Chart Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">売上推移</h3>
            <div className="flex space-x-2">
              {chartTypes.map((chart) => {
                const IconComponent = chart.icon;
                return (
                  <button
                    key={chart.id}
                    onClick={() => setSelectedChart(chart.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      selectedChart === chart.id
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Simple Chart Visualization */}
          <div className="h-64 flex items-end justify-between space-x-2">
            {monthlyData.map((data, index) => {
              const maxAmount = Math.max(...monthlyData.map(d => d.amount));
              const height = (data.amount / maxAmount) * 200;
              return (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="bg-gradient-to-t from-pink-500 to-pink-300 rounded-t-lg w-8 transition-all duration-500"
                    style={{ height: `${height}px` }}
                  />
                  <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                  <span className="text-xs text-gray-500">{formatCurrency(data.amount)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">収益内訳</h3>
          <div className="space-y-4">
            {salesData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{item.source}</h4>
                  {item.subscribers > 0 && (
                    <p className="text-sm text-gray-600">{formatNumber(item.subscribers)}人の加入者</p>
                  )}
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(item.amount)}</p>
                  <div className={`flex items-center justify-end space-x-1 text-sm ${getTrendColor(item.trend)}`}>
                    {getTrendIcon(item.trend)}
                    <span>{Math.abs(item.change).toFixed(1)}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/transfer-request')}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:border-pink-300 transition-colors"
          >
            <div className="text-center">
              <DollarSign className="w-8 h-8 text-pink-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">振込申請</h3>
              <p className="text-sm text-gray-600">売上を振込申請</p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/sales-analytics')}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:border-pink-300 transition-colors"
          >
            <div className="text-center">
              <BarChart className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">詳細分析</h3>
              <p className="text-sm text-gray-600">より詳細な分析を見る</p>
            </div>
          </motion.button>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">最近の取引</h3>
          <div className="space-y-3">
            {[
              { date: '2024-01-22', description: 'ベーシックプラン売上', amount: 2475000, type: 'income' },
              { date: '2024-01-21', description: 'プレミアムプラン売上', amount: 3383000, type: 'income' },
              { date: '2024-01-20', description: 'チップ収入', amount: 450000, type: 'income' },
              { date: '2024-01-19', description: 'プラットフォーム手数料', amount: -500000, type: 'expense' }
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <p className={`font-semibold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : ''}{formatCurrency(transaction.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default SalesManagementPage;
