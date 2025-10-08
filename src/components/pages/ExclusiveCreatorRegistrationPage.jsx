import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Crown, Star, CheckCircle, Users, DollarSign, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../BottomNavigation';

const ExclusiveCreatorRegistrationPage = () => {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);

  const benefits = [
    {
      icon: <Crown className="w-6 h-6 text-yellow-500" />,
      title: "独占配信権",
      description: "Only-Uでしか見られない特別なコンテンツを配信"
    },
    {
      icon: <Star className="w-6 h-6 text-pink-500" />,
      title: "優先表示",
      description: "検索結果やおすすめで上位表示される"
    },
    {
      icon: <DollarSign className="w-6 h-6 text-green-500" />,
      title: "高収益率",
      description: "通常より高い収益率で収入を最大化"
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-500" />,
      title: "専用サポート",
      description: "24時間専用サポートで安心して活動"
    }
  ];

  const handleRegister = () => {
    setIsRegistered(true);
    // 実際の登録処理をここに実装
    setTimeout(() => {
      alert('Only-U独占クリエイター登録が完了しました！');
    }, 1000);
  };

  if (isRegistered) {
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
            <h1 className="text-lg font-semibold text-gray-900">登録完了</h1>
            <div className="w-16"></div>
          </div>
        </div>

        <div className="p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 text-center shadow-sm"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">登録完了！</h2>
            <p className="text-gray-600 mb-6">
              Only-U独占クリエイターとして登録されました。<br />
              専用のダッシュボードで活動を開始できます。
            </p>
            <button
              onClick={() => navigate('/creator-dashboard')}
              className="bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
            >
                ダッシュボードへ
            </button>
          </motion.div>
        </div>

        <BottomNavigation />
      </div>
    );
  }

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
          <h1 className="text-lg font-semibold text-gray-900">Only-U独占クリエイター登録</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl p-6 text-white text-center"
        >
          <Crown className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
          <h2 className="text-2xl font-bold mb-2">Only-U独占クリエイター</h2>
          <p className="text-pink-100">
            特別な特典とサポートで、あなたのクリエイター活動をサポートします
          </p>
        </motion.div>

        {/* Benefits */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">独占クリエイターの特典</h3>
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <div className="flex-shrink-0 mt-1">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">登録条件</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-sm text-gray-700">18歳以上であること</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-sm text-gray-700">身分証明書の提出</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-sm text-gray-700">月1回以上の投稿</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-sm text-gray-700">利用規約への同意</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleRegister}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all"
        >
          独占クリエイターとして登録する
        </motion.button>

        {/* Terms */}
        <div className="text-center text-xs text-gray-500 space-y-1">
          <p>登録により、利用規約とプライバシーポリシーに同意したものとみなされます。</p>
          <p>審査には1-3営業日かかる場合があります。</p>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ExclusiveCreatorRegistrationPage;
