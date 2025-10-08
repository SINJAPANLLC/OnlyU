import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Copy, 
  Check,
  Gift,
  Percent,
  Calendar,
  Clock,
  Star,
  Tag,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../BottomNavigation';

const CouponListPage = () => {
  const navigate = useNavigate();
  const [copiedCoupon, setCopiedCoupon] = useState(null);

  const [coupons] = useState([
    {
      id: 1,
      code: 'WELCOME20',
      title: '新規会員20%OFF',
      description: '初回購入時に20%割引',
      discount: 20,
      type: 'percentage',
      minAmount: 1000,
      maxDiscount: 2000,
      validUntil: '2024-03-31',
      status: 'active',
      category: '新規会員',
      usageCount: 0,
      maxUsage: 1
    },
    {
      id: 2,
      code: 'SAVE500',
      title: '500円OFFクーポン',
      description: '5,000円以上の購入で500円割引',
      discount: 500,
      type: 'fixed',
      minAmount: 5000,
      maxDiscount: 500,
      validUntil: '2024-02-29',
      status: 'active',
      category: '一般',
      usageCount: 0,
      maxUsage: 3
    },
    {
      id: 3,
      code: 'PREMIUM50',
      title: 'プレミアムプラン50%OFF',
      description: '初月50%割引',
      discount: 50,
      type: 'percentage',
      minAmount: 0,
      maxDiscount: 2990,
      validUntil: '2024-02-15',
      status: 'active',
      category: 'プラン',
      usageCount: 0,
      maxUsage: 1
    },
    {
      id: 4,
      code: 'VIP1000',
      title: 'VIPプラン1,000円OFF',
      description: 'VIPプラン初月1,000円割引',
      discount: 1000,
      type: 'fixed',
      minAmount: 0,
      maxDiscount: 1000,
      validUntil: '2024-01-31',
      status: 'expired',
      category: 'プラン',
      usageCount: 1,
      maxUsage: 1
    },
    {
      id: 5,
      code: 'BIRTHDAY30',
      title: '誕生日30%OFF',
      description: '誕生日月限定30%割引',
      discount: 30,
      type: 'percentage',
      minAmount: 2000,
      maxDiscount: 3000,
      validUntil: '2024-12-31',
      status: 'active',
      category: '特別',
      usageCount: 0,
      maxUsage: 1
    }
  ]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilExpiry = (dateString) => {
    const today = new Date();
    const expiry = new Date(dateString);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'used':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return '利用可能';
      case 'expired':
        return '期限切れ';
      case 'used':
        return '使用済み';
      default:
        return '不明';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case '新規会員':
        return 'bg-blue-100 text-blue-800';
      case 'プラン':
        return 'bg-purple-100 text-purple-800';
      case '特別':
        return 'bg-pink-100 text-pink-800';
      case '一般':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2000);
  };

  const activeCoupons = coupons.filter(coupon => coupon.status === 'active');
  const expiredCoupons = coupons.filter(coupon => coupon.status === 'expired');

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
          <h1 className="text-lg font-semibold text-gray-900">クーポン一覧</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Summary */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2">利用可能なクーポン</h2>
              <p className="text-2xl font-bold">{activeCoupons.length}枚</p>
            </div>
            <Gift className="w-12 h-12 text-pink-200" />
          </div>
        </div>

        {/* Active Coupons */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Check className="w-5 h-5 text-green-500" />
            <span>利用可能なクーポン</span>
          </h3>
          
          {activeCoupons.map((coupon, index) => (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{coupon.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(coupon.category)}`}>
                      {coupon.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(coupon.status)}`}>
                      {getStatusText(coupon.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{coupon.description}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>期限: {formatDate(coupon.validUntil)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>残り{getDaysUntilExpiry(coupon.validUntil)}日</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-pink-600">
                    {coupon.type === 'percentage' ? `${coupon.discount}%` : `¥${coupon.discount}`}
                  </div>
                  <div className="text-xs text-gray-500">OFF</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span className="font-mono text-sm font-medium text-gray-900">{coupon.code}</span>
                </div>
                <button
                  onClick={() => handleCopyCode(coupon.code)}
                  className="flex items-center space-x-1 px-3 py-1 bg-pink-100 text-pink-600 rounded-lg text-sm font-medium hover:bg-pink-200 transition-colors"
                >
                  {copiedCoupon === coupon.code ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>コピー済み</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>コピー</span>
                    </>
                  )}
                </button>
              </div>

              {coupon.minAmount > 0 && (
                <div className="mt-2 text-xs text-gray-500">
                  最低購入金額: ¥{coupon.minAmount.toLocaleString()}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Expired Coupons */}
        {expiredCoupons.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span>期限切れクーポン</span>
            </h3>
            
            {expiredCoupons.map((coupon, index) => (
              <motion.div
                key={coupon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (activeCoupons.length + index) * 0.1 }}
                className="bg-gray-50 rounded-xl p-4 border border-gray-200 opacity-60"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-gray-700">{coupon.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(coupon.status)}`}>
                        {getStatusText(coupon.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{coupon.description}</p>
                    <div className="text-xs text-gray-400">
                      期限: {formatDate(coupon.validUntil)}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-500">
                      {coupon.type === 'percentage' ? `${coupon.discount}%` : `¥${coupon.discount}`}
                    </div>
                    <div className="text-xs text-gray-400">OFF</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <span className="font-mono text-sm font-medium text-gray-500">{coupon.code}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* How to Use */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">クーポンの使い方</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-pink-600">1</span>
              </div>
              <p className="text-sm text-gray-700">クーポンコードをコピーします</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-pink-600">2</span>
              </div>
              <p className="text-sm text-gray-700">購入画面でクーポンコードを入力します</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-pink-600">3</span>
              </div>
              <p className="text-sm text-gray-700">割引が適用されて購入完了です</p>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-900 mb-1">ご利用上の注意</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• クーポンは他の割引と併用できません</li>
                <li>• 一度使用したクーポンは再度利用できません</li>
                <li>• クーポンの有効期限は変更できません</li>
                <li>• 返品・交換時はクーポンは復元されません</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default CouponListPage;
