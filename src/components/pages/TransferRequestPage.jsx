import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, DollarSign, CreditCard, Clock, CheckCircle, AlertCircle, Calendar, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../BottomNavigation';

const TransferRequestPage = () => {
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEarlyPayment, setIsEarlyPayment] = useState(false);

  const accounts = [
    {
      id: 1,
      bankName: '三菱UFJ銀行',
      branchName: '新宿支店',
      accountNumber: '1234567',
      accountHolderName: '田中 太郎',
      isDefault: true,
      isVerified: true
    },
    {
      id: 2,
      bankName: '三井住友銀行',
      branchName: '渋谷支店',
      accountNumber: '7654321',
      accountHolderName: '田中 太郎',
      isDefault: false,
      isVerified: true
    }
  ];

  const availableBalance = 2500000; // 利用可能残高
  const minTransferAmount = 10000; // 最小振込金額
  const maxTransferAmount = 1000000; // 最大振込金額
  const transferFee = 330; // 振込手数料（税込）
  const earlyPaymentFeeRate = 0.08; // 早払い手数料率（8%税別）
  const creatorFeeRate = 0.15; // クリエイター売上手数料率（15%税別）
  const customerFeeRate = 0.10; // お客様購入手数料率（10%税別）

  const transferHistory = [
    {
      id: 1,
      amount: 500000,
      account: '三菱UFJ銀行 新宿支店',
      status: 'completed',
      requestedAt: '2024-01-20T10:30:00Z',
      completedAt: '2024-01-22T14:15:00Z'
    },
    {
      id: 2,
      amount: 300000,
      account: '三井住友銀行 渋谷支店',
      status: 'processing',
      requestedAt: '2024-01-22T15:45:00Z',
      completedAt: null
    },
    {
      id: 3,
      amount: 750000,
      account: '三菱UFJ銀行 新宿支店',
      status: 'completed',
      requestedAt: '2024-01-15T09:20:00Z',
      completedAt: '2024-01-17T11:30:00Z'
    }
  ];

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
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return '完了';
      case 'processing':
        return '処理中';
      case 'pending':
        return '保留中';
      case 'failed':
        return '失敗';
      default:
        return '不明';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'processing':
        return <Clock className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedAccount || !amount) {
      alert('口座と金額を選択してください');
      return;
    }

    const transferAmount = parseInt(amount);
    if (transferAmount < minTransferAmount) {
      alert(`最小振込金額は${formatCurrency(minTransferAmount)}です`);
      return;
    }

    if (transferAmount > maxTransferAmount) {
      alert(`最大振込金額は${formatCurrency(maxTransferAmount)}です`);
      return;
    }

    if (transferAmount > availableBalance) {
      alert('利用可能残高を超えています');
      return;
    }

    setIsSubmitting(true);
    
    // 実際の振込申請処理
    setTimeout(() => {
      alert('振込申請が完了しました。処理には1-3営業日かかります。');
      setIsSubmitting(false);
      setAmount('');
    }, 2000);
  };

  // 手数料計算
  const transferAmount = amount ? parseInt(amount) : 0;
  const taxRate = 0.10; // 消費税率10%
  
  // 売上手数料の計算（振込金額の15%税別）
  const salesFeeExcludingTax = transferAmount ? Math.floor(transferAmount * creatorFeeRate) : 0;
  const salesFeeTax = Math.floor(salesFeeExcludingTax * taxRate);
  const salesFeeIncludingTax = salesFeeExcludingTax + salesFeeTax;
  
  // 早払い手数料の計算（8%税別）
  const earlyPaymentFeeExcludingTax = transferAmount && isEarlyPayment ? Math.floor(transferAmount * earlyPaymentFeeRate) : 0;
  const earlyPaymentFeeTax = Math.floor(earlyPaymentFeeExcludingTax * taxRate);
  const earlyPaymentFeeIncludingTax = earlyPaymentFeeExcludingTax + earlyPaymentFeeTax;
  
  // 実際の受取金額の計算（売上手数料も差し引き）
  const netAmount = transferAmount ? transferAmount - salesFeeIncludingTax - transferFee - earlyPaymentFeeIncludingTax : 0;

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
          <h1 className="text-lg font-semibold text-gray-900">振込申請</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">利用可能残高</h2>
              <p className="text-pink-100">振込可能な金額</p>
            </div>
            <DollarSign className="w-8 h-8 text-pink-200" />
          </div>
          <div className="text-3xl font-bold">{formatCurrency(availableBalance)}</div>
        </motion.div>

        {/* Transfer Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">振込申請</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Account Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">振込先口座</label>
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
              >
                <option value="">口座を選択してください</option>
                {accounts.filter(account => account.isVerified).map(account => (
                  <option key={account.id} value={account.id}>
                    {account.bankName} {account.branchName} ({account.accountNumber})
                  </option>
                ))}
              </select>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">振込金額</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">¥</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="10000"
                  min={minTransferAmount}
                  max={maxTransferAmount}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>最小: {formatCurrency(minTransferAmount)}</span>
                <span>最大: {formatCurrency(maxTransferAmount)}</span>
              </div>
            </div>

            {/* Early Payment Option */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="earlyPayment"
                  checked={isEarlyPayment}
                  onChange={(e) => setIsEarlyPayment(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                />
                <div className="flex-1">
                  <label htmlFor="earlyPayment" className="block text-sm font-medium text-blue-900 cursor-pointer">
                    早払いオプション（3営業日以内振込）
                  </label>
                  <p className="text-xs text-blue-700 mt-1">
                    通常は月末締め翌々5日払いですが、早払いを選択すると3営業日以内に振込されます。
                  </p>
                  {isEarlyPayment && amount && (
                    <p className="text-sm text-blue-800 font-semibold mt-2">
                      早払い手数料: {formatCurrency(earlyPaymentFeeIncludingTax)}（8%税込）
                    </p>
                  )}
                  <p className="text-xs text-blue-600 mt-2">
                    ※ 手数料は振込金額に応じて自動計算されます
                  </p>
                </div>
              </div>
            </div>

            {/* Transfer Details */}
            {amount && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-gray-50 rounded-lg p-4 space-y-2"
              >
                <div className="flex justify-between">
                  <span className="text-gray-600">振込金額</span>
                  <span className="font-semibold">{formatCurrency(transferAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">売上手数料</span>
                  <span className="font-semibold text-red-600">-{formatCurrency(salesFeeIncludingTax)}（15%税込）</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">振込手数料</span>
                  <span className="font-semibold text-orange-600">-{formatCurrency(transferFee)}（税込）</span>
                </div>
                {isEarlyPayment && earlyPaymentFeeIncludingTax > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">早払い手数料</span>
                    <span className="font-semibold text-blue-600">-{formatCurrency(earlyPaymentFeeIncludingTax)}（8%税込）</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-semibold text-gray-900">実際の受取金額</span>
                  <span className="font-bold text-green-600">{formatCurrency(netAmount)}</span>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !selectedAccount || !amount}
              className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '申請中...' : '振込申請する'}
            </button>
          </form>
        </motion.div>

        {/* Transfer Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-4"
        >
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">振込について</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 通常: 月末締め翌々5日払い</li>
                <li>• 早払い: 申請から3営業日以内（手数料8%税込）</li>
                <li>• 振込手数料: {formatCurrency(transferFee)}（税込）</li>
                <li>• 土日祝日は処理されません</li>
                <li>• 最小振込金額: {formatCurrency(minTransferAmount)}</li>
                <li>• クリエイター売上手数料: 15%税込（差し引き済み）</li>
                <li>• 消費税率: 10%（税別手数料に自動加算）</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Transfer History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">振込履歴</h3>
          
          <div className="space-y-3">
            {transferHistory.map((transfer, index) => (
              <motion.div
                key={transfer.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-gray-900">{formatCurrency(transfer.amount)}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(transfer.status)}`}>
                      {getStatusIcon(transfer.status)}
                      <span>{getStatusText(transfer.status)}</span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{transfer.account}</p>
                  <p className="text-xs text-gray-500">
                    申請日: {formatDate(transfer.requestedAt)}
                    {transfer.completedAt && (
                      <span> | 完了日: {formatDate(transfer.completedAt)}</span>
                    )}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default TransferRequestPage;
