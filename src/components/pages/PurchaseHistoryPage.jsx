import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Download, 
  Eye,
  Calendar,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../BottomNavigation';

const PurchaseHistoryPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [purchases] = useState([
    {
      id: 'PUR-2024-001',
      date: '2024-01-15',
      type: 'subscription',
      title: 'プレミアムプラン',
      description: '月額サブスクリプション',
      amount: 5980,
      status: 'completed',
      paymentMethod: 'Visa •••• 4242',
      nextBilling: '2024-02-15'
    },
    {
      id: 'PUR-2024-002',
      date: '2024-01-10',
      type: 'one-time',
      title: '特別動画パック',
      description: '限定コンテンツ 5本セット',
      amount: 2980,
      status: 'completed',
      paymentMethod: 'Visa •••• 4242'
    },
    {
      id: 'PUR-2024-003',
      date: '2024-01-05',
      type: 'subscription',
      title: 'ベーシックプラン',
      description: '月額サブスクリプション',
      amount: 2980,
      status: 'cancelled',
      paymentMethod: 'Mastercard •••• 5555'
    },
    {
      id: 'PUR-2024-004',
      date: '2024-01-01',
      type: 'one-time',
      title: '新年特別コンテンツ',
      description: '2024年新年限定動画',
      amount: 1980,
      status: 'completed',
      paymentMethod: 'Visa •••• 4242'
    },
    {
      id: 'PUR-2023-120',
      date: '2023-12-25',
      type: 'subscription',
      title: 'VIPプラン',
      description: '月額サブスクリプション',
      amount: 9980,
      status: 'completed',
      paymentMethod: 'Visa •••• 4242'
    }
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return '完了';
      case 'cancelled':
        return 'キャンセル済み';
      case 'pending':
        return '処理中';
      default:
        return '不明';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredPurchases = purchases.filter(purchase => {
    const matchesFilter = filter === 'all' || purchase.type === filter;
    const matchesSearch = purchase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         purchase.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalSpent = purchases
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

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
          <h1 className="text-lg font-semibold text-gray-900">購入履歴</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Summary Card */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-6 text-white">
          <h2 className="text-lg font-semibold mb-2">購入統計</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{formatCurrency(totalSpent)}</p>
              <p className="text-pink-100">総購入額</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{purchases.filter(p => p.status === 'completed').length}</p>
              <p className="text-pink-100">購入回数</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="購入履歴を検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-pink-500 text-white'
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              すべて
            </button>
            <button
              onClick={() => setFilter('subscription')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'subscription'
                  ? 'bg-pink-500 text-white'
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              サブスク
            </button>
            <button
              onClick={() => setFilter('one-time')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'one-time'
                  ? 'bg-pink-500 text-white'
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              単発購入
            </button>
          </div>
        </div>

        {/* Purchase List */}
        <div className="space-y-3">
          {filteredPurchases.map((purchase, index) => (
            <motion.div
              key={purchase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{purchase.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(purchase.status)}`}>
                      {getStatusText(purchase.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{purchase.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(purchase.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CreditCard className="w-3 h-3" />
                      <span>{purchase.paymentMethod}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(purchase.amount)}</p>
                  {purchase.nextBilling && (
                    <p className="text-xs text-gray-500">次回: {formatDate(purchase.nextBilling)}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(purchase.status)}
                  <span className="text-sm text-gray-600">注文番号: {purchase.id}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  {purchase.status === 'completed' && (
                    <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPurchases.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">購入履歴がありません</h3>
            <p className="text-gray-600">検索条件を変更してお試しください。</p>
          </div>
        )}

        {/* Export Options */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">データエクスポート</h3>
          <div className="space-y-3">
            <button className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Download className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">CSV形式でダウンロード</span>
              </div>
              <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
            </button>
            <button className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Download className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">PDF形式でダウンロード</span>
              </div>
              <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
            </button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default PurchaseHistoryPage;
