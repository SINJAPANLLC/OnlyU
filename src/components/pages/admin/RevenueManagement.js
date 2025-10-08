import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Search, 
  Filter, 
  Download, 
  Upload,
  RefreshCw,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Calendar,
  CreditCard,
  Banknote,
  Receipt,
  FileText,
  Eye,
  Edit3,
  Trash2,
  Send,
  User,
  Calendar as CalendarIcon
} from 'lucide-react';
import { calculateTotalFees, calculateTransferFee, calculatePaymentSchedule } from '../../../utils/revenueCalculation';
import { PaymentSchedule, PaymentHistory, generatePaymentReport } from '../../../utils/paymentSystem';

const RevenueManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterDateRange, setFilterDateRange] = useState('30d');
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [showTransactionDetail, setShowTransactionDetail] = useState(null);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalFees: 0,
    netRevenue: 0,
    pendingAmount: 0,
    paidAmount: 0,
    transactionCount: 0
  });

  // フィルターオプション
  const statusOptions = [
    { value: 'all', label: 'すべて' },
    { value: 'pending', label: '処理中' },
    { value: 'completed', label: '完了' },
    { value: 'failed', label: '失敗' },
    { value: 'cancelled', label: 'キャンセル' }
  ];

  const typeOptions = [
    { value: 'all', label: 'すべて' },
    { value: 'subscription', label: 'サブスクリプション' },
    { value: 'purchase', label: '単品購入' },
    { value: 'tip', label: 'チップ' },
    { value: 'donation', label: '寄付' },
    { value: 'refund', label: '返金' }
  ];

  const dateRangeOptions = [
    { value: '7d', label: '7日' },
    { value: '30d', label: '30日' },
    { value: '90d', label: '90日' },
    { value: '1y', label: '1年' },
    { value: 'all', label: 'すべて' }
  ];

  // データを読み込み
  useEffect(() => {
    loadTransactions();
  }, []);

  // フィルタリング
  useEffect(() => {
    let filtered = [...transactions];

    // 検索フィルタ
    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.creatorName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // ステータスフィルタ
    if (filterStatus !== 'all') {
      filtered = filtered.filter(transaction => transaction.status === filterStatus);
    }

    // タイプフィルタ
    if (filterType !== 'all') {
      filtered = filtered.filter(transaction => transaction.type === filterType);
    }

    // 日付フィルタ
    if (filterDateRange !== 'all') {
      const now = new Date();
      let startDate;
      
      switch (filterDateRange) {
        case '7d':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case '30d':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case '90d':
          startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        case '1y':
          startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
          break;
        default:
          startDate = new Date(0);
      }
      
      filtered = filtered.filter(transaction => transaction.createdAt >= startDate);
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, filterStatus, filterType, filterDateRange]);

  // 統計を更新
  useEffect(() => {
    const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);
    const totalFees = transactions.reduce((sum, t) => sum + (t.fees?.totalFees || 0), 0);
    const netRevenue = totalRevenue - totalFees;
    const pendingAmount = transactions
      .filter(t => t.status === 'pending')
      .reduce((sum, t) => sum + t.amount, 0);
    const paidAmount = transactions
      .filter(t => t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);

    setStats({
      totalRevenue,
      totalFees,
      netRevenue,
      pendingAmount,
      paidAmount,
      transactionCount: transactions.length
    });
  }, [transactions]);

  // モック取引データ
  const loadTransactions = () => {
    const mockTransactions = [
      {
        id: 'TXN_001',
        type: 'subscription',
        amount: 980,
        fees: calculateTotalFees(980, 0, false),
        netAmount: 980 - calculateTotalFees(980, 0, false).totalFees,
        status: 'completed',
        userName: '田中太郎',
        creatorName: '佐藤花子',
        createdAt: new Date('2025-01-10T10:00:00'),
        completedAt: new Date('2025-01-10T10:05:00'),
        paymentMethod: 'credit_card',
        description: '高画質プラン月額料金',
        metadata: {
          planId: 'high_quality_monthly',
          period: '2025-01-01 to 2025-01-31'
        }
      },
      {
        id: 'TXN_002',
        type: 'purchase',
        amount: 2500,
        fees: calculateTotalFees(2500, 0, false),
        netAmount: 2500 - calculateTotalFees(2500, 0, false).totalFees,
        status: 'completed',
        userName: '山田次郎',
        creatorName: '鈴木あい',
        createdAt: new Date('2025-01-09T15:30:00'),
        completedAt: new Date('2025-01-09T15:32:00'),
        paymentMethod: 'credit_card',
        description: '限定動画コンテンツ購入',
        metadata: {
          contentId: 'content_123',
          contentType: 'video'
        }
      },
      {
        id: 'TXN_003',
        type: 'tip',
        amount: 500,
        fees: calculateTotalFees(500, 0, false),
        netAmount: 500 - calculateTotalFees(500, 0, false).totalFees,
        status: 'pending',
        userName: '高橋健一',
        creatorName: '田中花子',
        createdAt: new Date('2025-01-09T14:20:00'),
        completedAt: null,
        paymentMethod: 'credit_card',
        description: 'チップ送金',
        metadata: {
          message: '素晴らしい動画でした！'
        }
      },
      {
        id: 'TXN_004',
        type: 'subscription',
        amount: 1980,
        fees: calculateTotalFees(1980, 0, false),
        netAmount: 1980 - calculateTotalFees(1980, 0, false).totalFees,
        status: 'completed',
        userName: '佐藤美咲',
        creatorName: '山田みく',
        createdAt: new Date('2025-01-08T11:15:00'),
        completedAt: new Date('2025-01-08T11:18:00'),
        paymentMethod: 'bank_transfer',
        description: 'プレミアムプラン月額料金',
        metadata: {
          planId: 'premium_monthly',
          period: '2025-01-01 to 2025-01-31'
        }
      },
      {
        id: 'TXN_005',
        type: 'refund',
        amount: -980,
        fees: { totalFees: 0 },
        netAmount: -980,
        status: 'completed',
        userName: '鈴木太郎',
        creatorName: '高橋ゆき',
        createdAt: new Date('2025-01-07T16:45:00'),
        completedAt: new Date('2025-01-07T16:50:00'),
        paymentMethod: 'credit_card',
        description: '返金処理',
        metadata: {
          originalTransactionId: 'TXN_001',
          reason: 'ユーザーリクエスト'
        }
      }
    ];
    setTransactions(mockTransactions);
  };

  // 取引のステータスを変更
  const changeTransactionStatus = (transactionId, newStatus) => {
    setTransactions(prev =>
      prev.map(transaction =>
        transaction.id === transactionId
          ? { 
              ...transaction, 
              status: newStatus,
              completedAt: newStatus === 'completed' ? new Date() : transaction.completedAt
            }
          : transaction
      )
    );
  };

  // 出金申請を処理
  const processTransferRequest = (transactionId) => {
    // 出金申請処理のロジック
    console.log('出金申請を処理:', transactionId);
    setShowTransferModal(false);
  };

  // 複数選択
  const toggleSelection = (id) => {
    setSelectedTransactions(prev =>
      prev.includes(id)
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  // 全選択
  const selectAll = () => {
    setSelectedTransactions(filteredTransactions.map(t => t.id));
  };

  // 選択解除
  const deselectAll = () => {
    setSelectedTransactions([]);
  };

  // 一括操作
  const bulkAction = (action) => {
    selectedTransactions.forEach(transactionId => {
      switch (action) {
        case 'approve':
          changeTransactionStatus(transactionId, 'completed');
          break;
        case 'reject':
          changeTransactionStatus(transactionId, 'failed');
          break;
        case 'refund':
          // 返金処理
          break;
      }
    });
    setSelectedTransactions([]);
  };

  // ステータスの色を取得
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'cancelled': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // タイプのアイコンを取得
  const getTypeIcon = (type) => {
    switch (type) {
      case 'subscription': return <CreditCard className="w-5 h-5 text-blue-500" />;
      case 'purchase': return <Banknote className="w-5 h-5 text-green-500" />;
      case 'tip': return <DollarSign className="w-5 h-5 text-yellow-500" />;
      case 'donation': return <Receipt className="w-5 h-5 text-purple-500" />;
      case 'refund': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <DollarSign className="w-5 h-5 text-gray-500" />;
    }
  };

  // 数値をフォーマット
  const formatCurrency = (num) => {
    return '¥' + num.toLocaleString();
  };

  // 日付をフォーマット
  const formatDate = (date) => {
    return date.toLocaleDateString('ja-JP');
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">売上管理</h1>
          <p className="text-gray-600">課金履歴、手数料控除、収益分配、出金申請を管理します</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>エクスポート</span>
          </button>
          <button 
            onClick={() => setShowTransferModal(true)}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Send className="w-5 h-5" />
            <span>出金申請</span>
          </button>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">総売上</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <TrendingDown className="w-8 h-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">総手数料</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalFees)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">純利益</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.netRevenue)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">処理中</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.pendingAmount)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">支払い済み</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.paidAmount)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <BarChart3 className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">取引数</p>
              <p className="text-2xl font-bold text-gray-900">{stats.transactionCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* フィルターと検索 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* 検索 */}
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="取引を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* ステータスフィルター */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {statusOptions.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          {/* タイプフィルター */}
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {typeOptions.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* 日付フィルター */}
          <div>
            <select
              value={filterDateRange}
              onChange={(e) => setFilterDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {dateRangeOptions.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 取引一覧 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">取引一覧</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={selectAll}
                className="text-sm text-pink-600 hover:text-pink-700"
              >
                全選択
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={deselectAll}
                className="text-sm text-gray-600 hover:text-gray-700"
              >
                選択解除
              </button>
              {selectedTransactions.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300">|</span>
                  <select
                    onChange={(e) => bulkAction(e.target.value)}
                    className="text-sm border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="">一括操作</option>
                    <option value="approve">承認</option>
                    <option value="reject">拒否</option>
                    <option value="refund">返金</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  取引ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  タイプ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  金額
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  手数料
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  純利益
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ステータス
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ユーザー
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  作成日
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map(transaction => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedTransactions.includes(transaction.id)}
                      onChange={() => toggleSelection(transaction.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(transaction.type)}
                      <span className="text-sm text-gray-900">{transaction.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(transaction.fees?.totalFees || 0)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(transaction.netAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div>{transaction.userName}</div>
                      <div className="text-xs text-gray-500">→ {transaction.creatorName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(transaction.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setShowTransactionDetail(transaction)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {transaction.status === 'pending' && (
                        <button
                          onClick={() => changeTransactionStatus(transaction.id, 'completed')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      {transaction.status === 'pending' && (
                        <button
                          onClick={() => changeTransactionStatus(transaction.id, 'failed')}
                          className="text-red-600 hover:text-red-900"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 出金申請モーダル */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">出金申請</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  出金額
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="出金額を入力"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  銀行口座
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                  <option value="">口座を選択</option>
                  <option value="bank1">三菱UFJ銀行 1234567</option>
                  <option value="bank2">三井住友銀行 7654321</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowTransferModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  キャンセル
                </button>
                <button
                  onClick={() => processTransferRequest('TXN_001')}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                >
                  申請
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevenueManagement;
