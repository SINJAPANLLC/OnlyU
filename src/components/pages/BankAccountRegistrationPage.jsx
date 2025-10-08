import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, CheckCircle, AlertCircle, Plus, Edit3, Trash2, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../BottomNavigation';

const BankAccountRegistrationPage = () => {
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    bankName: '',
    branchName: '',
    accountType: '普通',
    accountNumber: '',
    accountHolderName: '',
    isDefault: false
  });

  const [accounts, setAccounts] = useState([
    {
      id: 1,
      bankName: '三菱UFJ銀行',
      branchName: '新宿支店',
      accountType: '普通',
      accountNumber: '1234567',
      accountHolderName: '田中 太郎',
      isDefault: true,
      isVerified: true,
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      bankName: '三井住友銀行',
      branchName: '渋谷支店',
      accountType: '当座',
      accountNumber: '7654321',
      accountHolderName: '田中 太郎',
      isDefault: false,
      isVerified: true,
      createdAt: '2024-01-20'
    }
  ]);

  const accountTypes = ['普通', '当座', '貯蓄'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // 編集処理
      setAccounts(prev => prev.map(account => 
        account.id === editingId 
          ? { ...account, ...formData, id: editingId }
          : account
      ));
      setEditingId(null);
    } else {
      // 新規追加処理
      const newAccount = {
        ...formData,
        id: Date.now(),
        isVerified: false,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setAccounts(prev => [...prev, newAccount]);
    }
    
    setIsAdding(false);
    setFormData({
      bankName: '',
      branchName: '',
      accountType: '普通',
      accountNumber: '',
      accountHolderName: '',
      isDefault: false
    });
  };

  const handleEdit = (account) => {
    setFormData({
      bankName: account.bankName,
      branchName: account.branchName,
      accountType: account.accountType,
      accountNumber: account.accountNumber,
      accountHolderName: account.accountHolderName,
      isDefault: account.isDefault
    });
    setEditingId(account.id);
    setIsAdding(true);
  };

  const handleDelete = (accountId) => {
    if (window.confirm('この口座情報を削除しますか？')) {
      setAccounts(prev => prev.filter(account => account.id !== accountId));
    }
  };

  const handleSetDefault = (accountId) => {
    setAccounts(prev => prev.map(account => ({
      ...account,
      isDefault: account.id === accountId
    })));
  };

  const maskAccountNumber = (accountNumber) => {
    if (accountNumber.length <= 4) return accountNumber;
    return '*'.repeat(accountNumber.length - 4) + accountNumber.slice(-4);
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
          <h1 className="text-lg font-semibold text-gray-900">振込先口座の登録</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-4"
        >
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">セキュリティについて</h3>
              <p className="text-sm text-blue-800">
                口座情報は暗号化されて保存され、振込処理以外では使用されません。
                不正利用の心配はありません。
              </p>
            </div>
          </div>
        </motion.div>

        {/* Add Account Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setIsAdding(true);
            setEditingId(null);
            setFormData({
              bankName: '',
              branchName: '',
              accountType: '普通',
              accountNumber: '',
              accountHolderName: '',
              isDefault: false
            });
          }}
          className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-pink-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>新しい口座を追加</span>
        </motion.button>

        {/* Add/Edit Form */}
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingId ? '口座情報を編集' : '新しい口座を追加'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">銀行名</label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  placeholder="例: 三菱UFJ銀行"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">支店名</label>
                <input
                  type="text"
                  name="branchName"
                  value={formData.branchName}
                  onChange={handleInputChange}
                  placeholder="例: 新宿支店"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">口座種別</label>
                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  {accountTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">口座番号</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  placeholder="例: 1234567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">口座名義</label>
                <input
                  type="text"
                  name="accountHolderName"
                  value={formData.accountHolderName}
                  onChange={handleInputChange}
                  placeholder="例: 田中 太郎"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                />
                <label className="ml-2 text-sm text-gray-700">デフォルト口座として設定</label>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                >
                  {editingId ? '更新' : '追加'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Registered Accounts */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">登録済み口座</h3>
          
          {accounts.map((account, index) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{account.bankName}</h4>
                    {account.isVerified ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                    )}
                    {account.isDefault && (
                      <span className="px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded-full font-medium">
                        デフォルト
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{account.branchName} {account.accountType}</p>
                  <p className="text-sm text-gray-600">口座番号: {maskAccountNumber(account.accountNumber)}</p>
                  <p className="text-sm text-gray-600">名義: {account.accountHolderName}</p>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(account)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(account.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex space-x-3">
                  {!account.isDefault && (
                    <button
                      onClick={() => handleSetDefault(account.id)}
                      className="text-sm text-pink-600 hover:text-pink-700 font-medium"
                    >
                      デフォルトに設定
                    </button>
                  )}
                  {!account.isVerified && (
                    <button
                      onClick={() => navigate('/verify-account')}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      認証する
                    </button>
                  )}
                </div>
                <span className="text-xs text-gray-500">登録日: {account.createdAt}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {accounts.length === 0 && !isAdding && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <CreditCard className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">登録済み口座がありません</h3>
            <p className="text-gray-600 mb-4">振込先口座を登録して売上を受け取りましょう</p>
            <button
              onClick={() => setIsAdding(true)}
              className="bg-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
            >
              口座を追加
            </button>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default BankAccountRegistrationPage;
