import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Plus, 
  CreditCard,
  Trash2,
  Edit3,
  Check,
  AlertCircle,
  Shield,
  Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../BottomNavigation';

const PaymentMethodsPage = () => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiryMonth: '12',
      expiryYear: '2025',
      isDefault: true,
      holderName: '田中 太郎'
    },
    {
      id: 2,
      type: 'card',
      last4: '5555',
      brand: 'Mastercard',
      expiryMonth: '08',
      expiryYear: '2026',
      isDefault: false,
      holderName: '田中 太郎'
    }
  ]);

  const getCardIcon = (brand) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      case 'amex':
        return '💳';
      default:
        return '💳';
    }
  };

  const handleSetDefault = (id) => {
    setPaymentMethods(prev => 
      prev.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const handleDeleteMethod = (id) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
    setShowDeleteModal(null);
  };

  const handleAddMethod = () => {
    // 新しい支払い方法を追加する処理
    console.log('新しい支払い方法を追加');
    setShowAddModal(false);
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
          <h1 className="text-lg font-semibold text-gray-900">支払い方法</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900">セキュリティ</h3>
              <p className="text-sm text-blue-700 mt-1">
                お客様の支払い情報は暗号化され、安全に保存されています。
              </p>
            </div>
          </div>
        </div>

        {/* Payment Methods List */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">登録済みの支払い方法</h2>
          {paymentMethods.map((method) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {getCardIcon(method.brand)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">
                        {method.brand} •••• {method.last4}
                      </span>
                      {method.isDefault && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          デフォルト
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {method.holderName} • {method.expiryMonth}/{method.expiryYear}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {!method.isDefault && (
                    <button
                      onClick={() => handleSetDefault(method.id)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setShowDeleteModal(method.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Payment Method */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddModal(true)}
          className="w-full bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 flex items-center justify-center space-x-3 hover:border-pink-500 hover:bg-pink-50 transition-colors"
        >
          <Plus className="w-6 h-6 text-gray-400" />
          <span className="font-medium text-gray-600">新しい支払い方法を追加</span>
        </motion.button>

        {/* Payment Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">支払い情報</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">次回請求日</span>
              <span className="font-medium">2024年2月15日</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">請求金額</span>
              <span className="font-medium">¥5,980</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">支払い方法</span>
              <span className="font-medium">Visa •••• 4242</span>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">セキュリティ機能</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-700">SSL暗号化通信</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-700">PCI DSS準拠</span>
            </div>
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-700">不正利用監視</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Payment Method Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">支払い方法を追加</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  カード番号
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    有効期限
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  カード名義人
                </label>
                <input
                  type="text"
                  placeholder="TARO TANAKA"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleAddMethod}
                className="flex-1 bg-pink-500 text-white py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
              >
                追加
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-sm"
          >
            <div className="text-center mb-6">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">支払い方法を削除しますか？</h3>
              <p className="text-gray-600 text-sm">
                この操作は取り消せません。
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={() => handleDeleteMethod(showDeleteModal)}
                className="flex-1 bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                削除
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};

export default PaymentMethodsPage;
