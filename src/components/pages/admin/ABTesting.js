import React, { useState, useEffect } from 'react';
import { 
  FlaskConical, 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users,
  Target,
  Play,
  Pause,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Filter,
  Search,
  Download,
  RefreshCw,
  Eye,
  Edit3,
  Trash2,
  Plus,
  Calendar,
  Percent,
  Zap,
  Activity,
  PieChart,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

const ABTesting = () => {
  const [tests, setTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    running: 0,
    completed: 0,
    successRate: 0,
    avgImprovement: 0
  });

  // テストステータス
  const statusOptions = [
    { value: 'all', label: 'すべて' },
    { value: 'draft', label: '下書き' },
    { value: 'running', label: '実行中' },
    { value: 'paused', label: '一時停止' },
    { value: 'completed', label: '完了' },
    { value: 'cancelled', label: 'キャンセル' }
  ];

  // データを読み込み
  useEffect(() => {
    loadABTests();
  }, []);

  // フィルタリング
  useEffect(() => {
    let filtered = [...tests];

    if (searchTerm) {
      filtered = filtered.filter(test =>
        test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.hypothesis.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(test => test.status === filterStatus);
    }

    setFilteredTests(filtered);
  }, [tests, searchTerm, filterStatus]);

  // 統計を更新
  useEffect(() => {
    const total = tests.length;
    const running = tests.filter(t => t.status === 'running').length;
    const completed = tests.filter(t => t.status === 'completed').length;
    const successRate = completed > 0 ? (tests.filter(t => t.status === 'completed' && t.winner).length / completed) * 100 : 0;
    const avgImprovement = completed > 0 ? tests.filter(t => t.status === 'completed').reduce((sum, t) => sum + (t.improvement || 0), 0) / completed : 0;

    setStats({ total, running, completed, successRate, avgImprovement });
  }, [tests]);

  // モックA/Bテストデータ
  const loadABTests = () => {
    const mockTests = [
      {
        id: 'AB_001',
        name: 'ランディングページCTAボタン色テスト',
        description: 'CTAボタンの色を変更してコンバージョン率を向上させる',
        hypothesis: 'ピンク色のCTAボタンは青色よりもクリック率が高い',
        status: 'running',
        type: 'conversion',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-31'),
        trafficSplit: 50,
        variants: [
          {
            id: 'A',
            name: 'コントロール（青）',
            description: '現在の青色のCTAボタン',
            traffic: 50,
            conversions: 1250,
            visitors: 10000,
            conversionRate: 12.5,
            revenue: 125000
          },
          {
            id: 'B',
            name: 'テスト（ピンク）',
            description: 'ピンク色のCTAボタン',
            traffic: 50,
            conversions: 1400,
            visitors: 10000,
            conversionRate: 14.0,
            revenue: 140000
          }
        ],
        metrics: [
          { name: 'コンバージョン率', primary: true },
          { name: 'クリック率', primary: false },
          { name: '収益', primary: false }
        ],
        significance: 95,
        confidence: 98.5,
        winner: 'B',
        improvement: 12.0,
        createdAt: new Date('2024-12-15'),
        updatedAt: new Date('2025-01-10')
      },
      {
        id: 'AB_002',
        name: 'メール件名テスト',
        description: 'メールマーケティングの件名を最適化',
        hypothesis: '個人的な件名は一般的な件名よりも開封率が高い',
        status: 'completed',
        type: 'email',
        startDate: new Date('2024-12-01'),
        endDate: new Date('2024-12-15'),
        trafficSplit: 50,
        variants: [
          {
            id: 'A',
            name: 'コントロール',
            description: '「お得な情報をお届けします」',
            traffic: 50,
            conversions: 850,
            visitors: 5000,
            conversionRate: 17.0,
            revenue: 85000
          },
          {
            id: 'B',
            name: 'テスト',
            description: '「田中さん、特別なご案内です」',
            traffic: 50,
            conversions: 1200,
            visitors: 5000,
            conversionRate: 24.0,
            revenue: 120000
          }
        ],
        metrics: [
          { name: '開封率', primary: true },
          { name: 'クリック率', primary: false },
          { name: 'コンバージョン率', primary: false }
        ],
        significance: 99,
        confidence: 99.8,
        winner: 'B',
        improvement: 41.2,
        createdAt: new Date('2024-11-20'),
        updatedAt: new Date('2024-12-15')
      },
      {
        id: 'AB_003',
        name: '動画プレイヤーUIテスト',
        description: '動画プレイヤーのUIを改善してエンゲージメントを向上',
        hypothesis: '大きな再生ボタンは小さなボタンよりもクリック率が高い',
        status: 'draft',
        type: 'ui',
        startDate: new Date('2025-02-01'),
        endDate: new Date('2025-02-28'),
        trafficSplit: 50,
        variants: [
          {
            id: 'A',
            name: 'コントロール',
            description: '現在の小さな再生ボタン',
            traffic: 50,
            conversions: 0,
            visitors: 0,
            conversionRate: 0,
            revenue: 0
          },
          {
            id: 'B',
            name: 'テスト',
            description: '大きな再生ボタン',
            traffic: 50,
            conversions: 0,
            visitors: 0,
            conversionRate: 0,
            revenue: 0
          }
        ],
        metrics: [
          { name: 'クリック率', primary: true },
          { name: '視聴完了率', primary: false },
          { name: 'エンゲージメント', primary: false }
        ],
        significance: 95,
        confidence: 0,
        winner: null,
        improvement: 0,
        createdAt: new Date('2025-01-05'),
        updatedAt: new Date('2025-01-05')
      }
    ];
    setTests(mockTests);
  };

  // A/Bテストを作成
  const createTest = (testData) => {
    const newTest = {
      id: `AB_${Date.now()}`,
      ...testData,
      status: 'draft',
      variants: [
        { id: 'A', name: 'コントロール', description: '', traffic: 50, conversions: 0, visitors: 0, conversionRate: 0, revenue: 0 },
        { id: 'B', name: 'テスト', description: '', traffic: 50, conversions: 0, visitors: 0, conversionRate: 0, revenue: 0 }
      ],
      metrics: [{ name: 'コンバージョン率', primary: true }],
      significance: 95,
      confidence: 0,
      winner: null,
      improvement: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setTests(prev => [newTest, ...prev]);
    setShowCreateModal(false);
  };

  // テストを開始
  const startTest = (testId) => {
    setTests(prev =>
      prev.map(test =>
        test.id === testId
          ? { ...test, status: 'running', startDate: new Date() }
          : test
      )
    );
  };

  // テストを停止
  const stopTest = (testId) => {
    setTests(prev =>
      prev.map(test =>
        test.id === testId
          ? { ...test, status: 'completed', endDate: new Date() }
          : test
      )
    );
  };

  // 統計的有意性を計算
  const calculateSignificance = (variantA, variantB) => {
    // 簡易的な統計的有意性計算（実際の実装ではより複雑な計算が必要）
    const diff = Math.abs(variantA.conversionRate - variantB.conversionRate);
    const avgRate = (variantA.conversionRate + variantB.conversionRate) / 2;
    const significance = Math.min(99.9, (diff / avgRate) * 100);
    return significance;
  };

  // 信頼度を計算
  const calculateConfidence = (variantA, variantB) => {
    const significance = calculateSignificance(variantA, variantB);
    return Math.min(99.9, significance * 0.8);
  };

  // 勝者を決定
  const determineWinner = (variants) => {
    if (variants.length < 2) return null;
    const variantA = variants[0];
    const variantB = variants[1];
    const confidence = calculateConfidence(variantA, variantB);
    
    if (confidence < 95) return null;
    
    return variantA.conversionRate > variantB.conversionRate ? 'A' : 'B';
  };

  // 改善率を計算
  const calculateImprovement = (variantA, variantB, winner) => {
    if (!winner) return 0;
    const control = winner === 'A' ? variantA : variantB;
    const test = winner === 'A' ? variantB : variantA;
    return ((test.conversionRate - control.conversionRate) / control.conversionRate) * 100;
  };

  // ステータスの色を取得
  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'text-gray-600 bg-gray-100';
      case 'running': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // タイプの色を取得
  const getTypeColor = (type) => {
    switch (type) {
      case 'conversion': return 'text-purple-600 bg-purple-100';
      case 'email': return 'text-blue-600 bg-blue-100';
      case 'ui': return 'text-green-600 bg-green-100';
      case 'content': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // 改善率のアイコンを取得
  const getImprovementIcon = (improvement) => {
    if (improvement > 0) return <ArrowUp className="w-4 h-4 text-green-500" />;
    if (improvement < 0) return <ArrowDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">A/Bテスト管理</h1>
          <p className="text-gray-600">データドリブンな意思決定のためのA/Bテスト管理</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>エクスポート</span>
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>新規テスト</span>
          </button>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FlaskConical className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">総テスト数</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Play className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">実行中</p>
              <p className="text-2xl font-bold text-gray-900">{stats.running}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">完了</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Target className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">成功率</p>
              <p className="text-2xl font-bold text-gray-900">{stats.successRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">平均改善率</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgImprovement.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* フィルターと検索 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="A/Bテストを検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>
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
          <div>
            <button className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>詳細フィルター</span>
            </button>
          </div>
        </div>
      </div>

      {/* A/Bテスト一覧 */}
      <div className="space-y-4">
        {filteredTests.map(test => (
          <div key={test.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{test.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(test.status)}`}>
                    {test.status}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(test.type)}`}>
                    {test.type}
                  </span>
                  {test.winner && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                      勝者: {test.winner}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4">{test.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">仮説</h4>
                  <p className="text-sm text-gray-600 italic">"{test.hypothesis}"</p>
                </div>

                {/* バリアント結果 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {test.variants.map(variant => (
                    <div key={variant.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900">{variant.name}</h5>
                        {test.winner === variant.id && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{variant.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">訪問者:</span>
                          <span className="font-medium ml-1">{variant.visitors.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">コンバージョン:</span>
                          <span className="font-medium ml-1">{variant.conversions.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">コンバージョン率:</span>
                          <span className="font-medium ml-1">{variant.conversionRate.toFixed(2)}%</span>
                        </div>
                        <div>
                          <span className="text-gray-500">収益:</span>
                          <span className="font-medium ml-1">¥{variant.revenue.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 統計情報 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">信頼度</p>
                    <p className="text-lg font-bold text-gray-900">{test.confidence.toFixed(1)}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">統計的有意性</p>
                    <p className="text-lg font-bold text-gray-900">{test.significance}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">改善率</p>
                    <div className="flex items-center justify-center space-x-1">
                      {getImprovementIcon(test.improvement)}
                      <span className="text-lg font-bold text-gray-900">{test.improvement.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">期間</p>
                    <p className="text-lg font-bold text-gray-900">
                      {test.startDate && test.endDate ? 
                        Math.ceil((test.endDate - test.startDate) / (1000 * 60 * 60 * 24)) : 0}日
                    </p>
                  </div>
                </div>

                {/* アクションボタン */}
                <div className="flex items-center space-x-2">
                  {test.status === 'draft' && (
                    <button
                      onClick={() => startTest(test.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-1"
                    >
                      <Play className="w-4 h-4" />
                      <span>開始</span>
                    </button>
                  )}
                  {test.status === 'running' && (
                    <button
                      onClick={() => stopTest(test.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-1"
                    >
                      <Pause className="w-4 h-4" />
                      <span>停止</span>
                    </button>
                  )}
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-1">
                    <BarChart3 className="w-4 h-4" />
                    <span>詳細</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => setSelectedTest(test)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button className="text-green-600 hover:text-green-900">
                  <Edit3 className="w-5 h-5" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 新規A/Bテスト作成モーダル */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">新規A/Bテスト作成</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  テスト名
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="A/Bテストの名前を入力"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  説明
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  rows="3"
                  placeholder="テストの説明を入力"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  仮説
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  rows="2"
                  placeholder="テストの仮説を入力"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    タイプ
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                    <option value="conversion">コンバージョン</option>
                    <option value="email">メール</option>
                    <option value="ui">UI</option>
                    <option value="content">コンテンツ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    期間（日）
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="30"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  キャンセル
                </button>
                <button
                  onClick={() => createTest({ name: '新規A/Bテスト', description: '説明', hypothesis: '仮説', type: 'conversion' })}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                >
                  作成
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ABTesting;
