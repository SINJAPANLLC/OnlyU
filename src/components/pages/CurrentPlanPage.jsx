import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Check, 
  Star, 
  Calendar,
  CreditCard,
  Settings,
  AlertCircle,
  Crown,
  Zap,
  Download,
  Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../BottomNavigation';

const CurrentPlanPage = () => {
  const navigate = useNavigate();
  
  // 手数料計算関数
  const calculateServiceFee = (basePrice) => {
    const serviceFeeRate = 0.10; // サービス手数料率（10%税別）
    const taxRate = 0.10; // 消費税率（10%）
    
    const serviceFeeExcludingTax = Math.floor(basePrice * serviceFeeRate);
    const serviceFeeTax = Math.floor(serviceFeeExcludingTax * taxRate);
    const serviceFeeIncludingTax = serviceFeeExcludingTax + serviceFeeTax;
    
    return {
      basePrice,
      serviceFeeExcludingTax,
      serviceFeeTax,
      serviceFeeIncludingTax,
      totalAmount: basePrice + serviceFeeIncludingTax
    };
  };
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [subscribedCreators] = useState([
    {
      id: 1,
      name: 'あやか',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      planName: 'プレミアムプラン',
      price: 2980,
      billingCycle: '月額',
      nextBillingDate: '2024-02-15',
      status: 'active',
      features: [
        '高画質動画視聴',
        '広告なし視聴',
        '限定コンテンツアクセス',
        'DM機能'
      ],
      usage: {
        videosWatched: 23,
        messagesSent: 5,
        lastActivity: '2024-01-20'
      }
    },
    {
      id: 2,
      name: 'みく',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      planName: 'VIPプラン',
      price: 5980,
      billingCycle: '月額',
      nextBillingDate: '2024-02-20',
      status: 'active',
      features: [
        '高画質動画視聴',
        '広告なし視聴',
        '限定コンテンツアクセス',
        'DM機能',
        '早期アクセス',
        '専用コミュニティ'
      ],
      usage: {
        videosWatched: 67,
        messagesSent: 12,
        lastActivity: '2024-01-19'
      }
    },
    {
      id: 3,
      name: 'さくら',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      planName: 'ベーシックプラン',
      price: 1980,
      billingCycle: '月額',
      nextBillingDate: '2024-02-10',
      status: 'active',
      features: [
        '高画質動画視聴',
        '広告なし視聴',
        '限定コンテンツアクセス'
      ],
      usage: {
        videosWatched: 15,
        messagesSent: 2,
        lastActivity: '2024-01-18'
      }
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

  const handleCancelPlan = () => {
    // プランキャンセル処理
    console.log('プランをキャンセルしました');
    setShowCancelModal(false);
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
          <h1 className="text-lg font-semibold text-gray-900">加入中のプラン</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">加入中のサブスク</h2>
              <p className="text-pink-100">{subscribedCreators.length}人のクリエイター</p>
            </div>
            <div className="text-right">
              {(() => {
                const totalBasePrice = subscribedCreators.reduce((sum, creator) => sum + creator.price, 0);
                const totalServiceFee = subscribedCreators.reduce((sum, creator) => {
                  const feeCalculation = calculateServiceFee(creator.price);
                  return sum + feeCalculation.serviceFeeIncludingTax;
                }, 0);
                const totalAmount = totalBasePrice + totalServiceFee;
                return (
                  <div>
                    <p className="text-2xl font-bold">
                      {formatCurrency(totalAmount)}
                    </p>
                    <p className="text-pink-100">/月合計</p>
                    <p className="text-xs text-pink-200">
                      基本: {formatCurrency(totalBasePrice)} + 手数料: {formatCurrency(totalServiceFee)}
                    </p>
                  </div>
                );
              })()}
            </div>
          </div>
          
          <div className="bg-white/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">次回請求日</span>
              <span className="font-medium">
                {formatDate(subscribedCreators[0]?.nextBillingDate || '2024-02-15')}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Subscribed Creators */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">加入中のクリエイター</h3>
          {subscribedCreators.map((creator, index) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{creator.name}</h4>
                    <div className="text-right">
                      {(() => {
                        const feeCalculation = calculateServiceFee(creator.price);
                        return (
                          <div>
                            <span className="text-lg font-bold text-pink-600">
                              {formatCurrency(feeCalculation.totalAmount)}/{creator.billingCycle}
                            </span>
                            <div className="text-xs text-gray-400">
                              基本: {formatCurrency(feeCalculation.basePrice)} + 手数料: {formatCurrency(feeCalculation.serviceFeeIncludingTax)}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{creator.planName}</p>
                  
                  <div className="space-y-2 mb-3">
                    {creator.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>視聴動画: {creator.usage.videosWatched}本</span>
                      <span>DM: {creator.usage.messagesSent}回</span>
                    </div>
                    <span>次回請求: {formatDate(creator.nextBillingDate)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Usage Statistics */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">利用状況</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {subscribedCreators.reduce((sum, creator) => sum + creator.usage.videosWatched, 0)}
              </p>
              <p className="text-xs text-gray-500">総視聴動画数</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {subscribedCreators.reduce((sum, creator) => sum + creator.usage.messagesSent, 0)}
              </p>
              <p className="text-xs text-gray-500">総DM数</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{subscribedCreators.length}</p>
              <p className="text-xs text-gray-500">加入クリエイター数</p>
            </div>
          </div>
        </div>

        {/* Plan Management */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/payment-methods')}
            className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">支払い方法を変更</span>
            </div>
            <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
          </button>

          <button
            onClick={() => navigate('/purchase-history')}
            className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">購入履歴を確認</span>
            </div>
            <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
          </button>

          <button
            onClick={() => setShowCancelModal(true)}
            className="w-full bg-white border border-red-200 rounded-xl p-4 flex items-center justify-between hover:bg-red-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="font-medium text-red-600">プランをキャンセル</span>
            </div>
            <ArrowLeft className="w-4 h-4 text-red-400 rotate-180" />
          </button>
        </div>

        {/* Billing Information */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">請求情報</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">加入クリエイター数</span>
              <span className="font-medium">{subscribedCreators.length}人</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">月額合計料金</span>
              <span className="font-medium">
                {formatCurrency(subscribedCreators.reduce((sum, creator) => sum + creator.price, 0))}/月
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">次回請求日</span>
              <span className="font-medium">
                {formatDate(subscribedCreators[0]?.nextBillingDate || '2024-02-15')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ステータス</span>
              <span className="text-green-600 font-medium">アクティブ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-sm"
          >
            <div className="text-center mb-6">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">プランをキャンセルしますか？</h3>
              <p className="text-gray-600 text-sm">
                キャンセル後も現在の請求期間終了までプランを利用できます。
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handleCancelPlan}
                className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                キャンセルする
              </button>
              <button
                onClick={() => setShowCancelModal(false)}
                className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                キャンセルしない
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};

export default CurrentPlanPage;
