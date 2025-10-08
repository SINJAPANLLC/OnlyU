import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Check, 
  Star, 
  Zap, 
  Shield, 
  Download,
  Play,
  Crown,
  CreditCard,
  Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../BottomNavigation';

const HighQualityPlanPage = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [selectedQuality, setSelectedQuality] = useState('4k');
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  
  // 手数料計算
  const basePrice = 980; // 月額料金
  const serviceFeeRate = 0.10; // サービス手数料率（10%税別）
  const taxRate = 0.10; // 消費税率（10%）
  
  // サービス手数料の計算
  const serviceFeeExcludingTax = Math.floor(basePrice * serviceFeeRate);
  const serviceFeeTax = Math.floor(serviceFeeExcludingTax * taxRate);
  const serviceFeeIncludingTax = serviceFeeExcludingTax + serviceFeeTax;
  
  // 合計金額
  const totalAmount = basePrice + serviceFeeIncludingTax;

  const plans = [
    {
      id: 'monthly',
      name: '月額プラン',
      price: 980,
      originalPrice: null,
      discount: null,
      features: [
        '4K画質動画視聴',
        '広告なし視聴',
        'オフライン視聴',
        '優先サポート',
        '限定コンテンツアクセス'
      ],
      popular: true
    }
  ];

  const qualityOptions = [
    {
      id: 'standard',
      name: '標準画質',
      description: '720p - 基本画質',
      resolution: '720p',
      icon: '📱'
    },
    {
      id: 'hd',
      name: 'HD画質',
      description: '1080p - 高画質',
      resolution: '1080p',
      icon: '💻'
    },
    {
      id: '4k',
      name: '4K画質',
      description: '4K - 最高画質（プラン加入者限定）',
      resolution: '4K',
      icon: '📺',
      premium: true
    }
  ];

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
          <h1 className="text-lg font-semibold text-gray-900">高画質プラン</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Hero Section */}
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">高画質プラン</h2>
          <p className="text-gray-600">最高品質の動画を広告なしでお楽しみください</p>
        </div>

        {/* Quality Comparison Visual */}
        <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl p-6 text-white relative overflow-hidden">
          {/* Decorative dots */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="absolute top-8 right-8 w-1 h-1 bg-white/20 rounded-full"></div>
          <div className="absolute top-12 right-12 w-1.5 h-1.5 bg-white/25 rounded-full"></div>
          <div className="absolute bottom-6 right-6 w-2 h-2 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-1 h-1 bg-white/30 rounded-full"></div>
          
          {/* Comparison Images */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Standard Quality */}
            <div className="relative">
              <div className="bg-gray-200 rounded-lg p-2 mb-2">
                <span className="text-xs text-gray-600 font-medium">標準画質</span>
              </div>
              <div className="aspect-video bg-gray-300 rounded-lg overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616c933448c?w=400&h=600&fit=crop&crop=face&blur=3&q=50"
                  alt="Standard Quality"
                  className="w-full h-full object-cover filter blur-md brightness-70 contrast-75"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="bg-red-600/90 text-white text-xs px-2 py-1 rounded text-center font-medium">
                    720p - ぼやけて見える
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    ×
                  </div>
                </div>
              </div>
            </div>
            
            {/* 4K Quality */}
            <div className="relative">
              <div className="bg-gray-200 rounded-lg p-2 mb-2 flex items-center space-x-1">
                <span className="text-xs">👑</span>
                <span className="text-xs text-gray-600 font-medium">最高4K対応</span>
              </div>
              <div className="aspect-video bg-gray-300 rounded-lg overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616c933448c?w=800&h=1200&fit=crop&crop=face&q=100"
                  alt="4K Quality"
                  className="w-full h-full object-cover brightness-110 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="bg-green-600/90 text-white text-xs px-2 py-1 rounded text-center font-medium">
                    4K - 鮮明で美しい
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    ✓
                  </div>
                </div>
                <div className="absolute top-2 left-2">
                  <div className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                    HD
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Comparison Text */}
          <div className="text-center">
            <p className="text-white/90 text-sm mb-2">標準画質では伝わりきらない</p>
            <p className="text-white text-lg font-bold">
              今すぐ<span className="text-2xl">「高画質」</span>にアップグレード!
            </p>
          </div>
        </div>


        {/* Benefits */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">プランの特典</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Play className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">4K画質動画視聴</p>
                <p className="text-sm text-gray-500">4K・HDR対応の最高品質動画</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">広告なし視聴</p>
                <p className="text-sm text-gray-500">中断なしでコンテンツをお楽しみ</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Download className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">オフライン視聴</p>
                <p className="text-sm text-gray-500">外出先でもお気に入り動画を視聴</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">優先サポート</p>
                <p className="text-sm text-gray-500">24時間以内の専用サポート</p>
              </div>
            </div>
          </div>
        </div>

        {/* Plan Details */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-pink-600 mb-2">高画質プラン</h3>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {formatCurrency(totalAmount)}/月
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <span className="line-through">{formatCurrency(basePrice)}</span>
              <span className="ml-2">+ サービス手数料 {formatCurrency(serviceFeeIncludingTax)}（税込）</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              通常は標準画質の動画コンテンツを、高画質で視聴することができます。<br />
              高画質に対応していないコンテンツもございます。
            </p>
          </div>
        </div>

        {/* Payment Details Toggle */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <button
            onClick={() => setShowPaymentDetails(!showPaymentDetails)}
            className="w-full flex items-center justify-between text-gray-700 hover:text-gray-900"
          >
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5" />
              <span className="font-medium">料金詳細を見る</span>
            </div>
            <motion.div
              animate={{ rotate: showPaymentDetails ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Info className="w-5 h-5" />
            </motion.div>
          </button>
          
          {showPaymentDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">月額料金</span>
                  <span className="font-semibold">{formatCurrency(basePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">サービス手数料（10%税別）</span>
                  <span className="font-semibold text-orange-600">+{formatCurrency(serviceFeeIncludingTax)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-semibold text-gray-900">合計金額</span>
                  <span className="font-bold text-pink-600">{formatCurrency(totalAmount)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  ※ サービス手数料には消費税が含まれています
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            // 決済処理を実装
            console.log('Payment processing:', {
              basePrice,
              serviceFee: serviceFeeIncludingTax,
              totalAmount
            });
            alert(`決済処理を開始します\n合計金額: ${formatCurrency(totalAmount)}`);
          }}
          className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:from-pink-600 hover:to-pink-700 transition-all"
        >
          加入する（{formatCurrency(totalAmount)}/月）
        </motion.button>

        {/* Terms */}
        <div className="text-center text-xs text-gray-500 space-y-1">
          <p>加入により、利用規約とプライバシーポリシーに同意したものとみなされます。</p>
          <p>いつでもキャンセル可能です。</p>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default HighQualityPlanPage;
