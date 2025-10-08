import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Play, 
  CheckCircle, 
  RotateCcw,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Calendar,
  Users,
  DollarSign,
  Eye,
  MessageSquare,
  AlertTriangle,
  CheckSquare,
  Clock,
  Edit3,
  Trash2,
  Plus,
  Filter,
  Search,
  Download,
  Upload,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  Star,
  Flag,
  Zap
} from 'lucide-react';

const PDCAManagement = () => {
  const [cycles, setCycles] = useState([]);
  const [filteredCycles, setFilteredCycles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    completed: 0,
    successRate: 0,
    avgCycleTime: 0
  });

  // PDCAステータス
  const statusOptions = [
    { value: 'all', label: 'すべて' },
    { value: 'planning', label: '計画中' },
    { value: 'doing', label: '実行中' },
    { value: 'checking', label: '評価中' },
    { value: 'acting', label: '改善中' },
    { value: 'completed', label: '完了' },
    { value: 'paused', label: '一時停止' }
  ];

  // データを読み込み
  useEffect(() => {
    loadPDCACycles();
  }, []);

  // フィルタリング
  useEffect(() => {
    let filtered = [...cycles];

    if (searchTerm) {
      filtered = filtered.filter(cycle =>
        cycle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cycle.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cycle.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(cycle => cycle.status === filterStatus);
    }

    setFilteredCycles(filtered);
  }, [cycles, searchTerm, filterStatus]);

  // 統計を更新
  useEffect(() => {
    const total = cycles.length;
    const active = cycles.filter(c => ['planning', 'doing', 'checking', 'acting'].includes(c.status)).length;
    const completed = cycles.filter(c => c.status === 'completed').length;
    const successRate = completed > 0 ? (cycles.filter(c => c.status === 'completed' && c.success).length / completed) * 100 : 0;
    const avgCycleTime = cycles.length > 0 ? cycles.reduce((sum, c) => sum + c.duration, 0) / cycles.length : 0;

    setStats({ total, active, completed, successRate, avgCycleTime });
  }, [cycles]);

  // モックPDCAサイクルデータ
  const loadPDCACycles = () => {
    const mockCycles = [
      {
        id: 'PDCA_001',
        title: 'ユーザーエンゲージメント向上',
        description: 'ユーザーの滞在時間とアクティビティを向上させる',
        category: 'ユーザー体験',
        status: 'doing',
        phase: 'Do',
        priority: 'high',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-31'),
        duration: 30,
        owner: '田中太郎',
        team: ['佐藤花子', '山田次郎'],
        kpis: [
          { name: 'セッション時間', target: 300, current: 250, unit: '秒' },
          { name: 'ページビュー', target: 5, current: 4.2, unit: 'PV/セッション' },
          { name: 'リピート率', target: 60, current: 45, unit: '%' }
        ],
        actions: [
          { id: '1', title: 'UI改善', status: 'completed', assignee: '佐藤花子', dueDate: new Date('2025-01-15') },
          { id: '2', title: 'コンテンツ最適化', status: 'doing', assignee: '山田次郎', dueDate: new Date('2025-01-25') },
          { id: '3', title: 'パフォーマンス改善', status: 'pending', assignee: '田中太郎', dueDate: new Date('2025-01-30') }
        ],
        results: [],
        lessons: [],
        nextActions: [],
        success: null,
        createdAt: new Date('2024-12-15'),
        updatedAt: new Date('2025-01-10')
      },
      {
        id: 'PDCA_002',
        title: '収益最適化',
        description: 'クリエイターの収益を最大化する施策の検証',
        category: '収益',
        status: 'checking',
        phase: 'Check',
        priority: 'high',
        startDate: new Date('2024-12-01'),
        endDate: new Date('2025-01-15'),
        duration: 45,
        owner: '鈴木あい',
        team: ['高橋健一', '山田美咲'],
        kpis: [
          { name: 'ARPU', target: 5000, current: 4200, unit: '円' },
          { name: 'コンバージョン率', target: 8, current: 6.5, unit: '%' },
          { name: 'LTV', target: 50000, current: 38000, unit: '円' }
        ],
        actions: [
          { id: '1', title: '価格戦略見直し', status: 'completed', assignee: '鈴木あい', dueDate: new Date('2024-12-20') },
          { id: '2', title: 'プラン最適化', status: 'completed', assignee: '高橋健一', dueDate: new Date('2024-12-30') },
          { id: '3', title: '効果測定', status: 'doing', assignee: '山田美咲', dueDate: new Date('2025-01-15') }
        ],
        results: [
          { metric: 'ARPU', before: 3500, after: 4200, improvement: 20 },
          { metric: 'コンバージョン率', before: 5.2, after: 6.5, improvement: 25 }
        ],
        lessons: ['価格の段階的設定が効果的', 'ユーザー教育が重要'],
        nextActions: ['長期効果の測定', '他プラットフォームとの比較'],
        success: true,
        createdAt: new Date('2024-11-20'),
        updatedAt: new Date('2025-01-08')
      },
      {
        id: 'PDCA_003',
        title: 'コンテンツ品質向上',
        description: 'ユーザーが求めるコンテンツの特定と品質向上',
        category: 'コンテンツ',
        status: 'acting',
        phase: 'Act',
        priority: 'medium',
        startDate: new Date('2024-11-01'),
        endDate: new Date('2025-02-01'),
        duration: 90,
        owner: '佐藤次郎',
        team: ['田中花子', '鈴木美咲'],
        kpis: [
          { name: 'コンテンツ満足度', target: 4.5, current: 4.1, unit: '点' },
          { name: 'シェア率', target: 15, current: 12, unit: '%' },
          { name: 'コメント率', target: 8, current: 6, unit: '%' }
        ],
        actions: [
          { id: '1', title: 'ユーザー調査', status: 'completed', assignee: '田中花子', dueDate: new Date('2024-11-30') },
          { id: '2', title: 'コンテンツガイドライン策定', status: 'completed', assignee: '佐藤次郎', dueDate: new Date('2024-12-15') },
          { id: '3', title: 'クリエイター教育', status: 'doing', assignee: '鈴木美咲', dueDate: new Date('2025-01-31') }
        ],
        results: [
          { metric: 'コンテンツ満足度', before: 3.8, after: 4.1, improvement: 7.9 },
          { metric: 'シェア率', before: 10, after: 12, improvement: 20 }
        ],
        lessons: ['ユーザーフィードバックが重要', 'クリエイター教育の効果'],
        nextActions: ['継続的な品質監視', '新機能の検討'],
        success: null,
        createdAt: new Date('2024-10-15'),
        updatedAt: new Date('2025-01-05')
      }
    ];
    setCycles(mockCycles);
  };

  // PDCAサイクルを作成
  const createCycle = (cycleData) => {
    const newCycle = {
      id: `PDCA_${Date.now()}`,
      ...cycleData,
      status: 'planning',
      phase: 'Plan',
      duration: 0,
      kpis: [],
      actions: [],
      results: [],
      lessons: [],
      nextActions: [],
      success: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setCycles(prev => [newCycle, ...prev]);
    setShowCreateModal(false);
  };

  // ステータスを更新
  const updateStatus = (cycleId, newStatus, newPhase) => {
    setCycles(prev =>
      prev.map(cycle =>
        cycle.id === cycleId
          ? { 
              ...cycle, 
              status: newStatus,
              phase: newPhase,
              updatedAt: new Date()
            }
          : cycle
      )
    );
  };

  // アクションを追加
  const addAction = (cycleId, action) => {
    setCycles(prev =>
      prev.map(cycle =>
        cycle.id === cycleId
          ? {
              ...cycle,
              actions: [...cycle.actions, {
                id: Date.now().toString(),
                ...action,
                status: 'pending',
                createdAt: new Date(),
                updatedAt: new Date()
              }]
            }
          : cycle
      )
    );
  };

  // アクションを更新
  const updateAction = (cycleId, actionId, updates) => {
    setCycles(prev =>
      prev.map(cycle =>
        cycle.id === cycleId
          ? {
              ...cycle,
              actions: cycle.actions.map(action =>
                action.id === actionId
                  ? { ...action, ...updates, updatedAt: new Date() }
                  : action
              )
            }
          : cycle
      )
    );
  };

  // アクションを削除
  const deleteAction = (cycleId, actionId) => {
    setCycles(prev =>
      prev.map(cycle =>
        cycle.id === cycleId
          ? {
              ...cycle,
              actions: cycle.actions.filter(action => action.id !== actionId)
            }
          : cycle
      )
    );
  };

  // アクションのステータスを更新
  const updateActionStatus = (cycleId, actionId, newStatus) => {
    updateAction(cycleId, actionId, { status: newStatus });
  };

  // 結果を追加
  const addResult = (cycleId, result) => {
    setCycles(prev =>
      prev.map(cycle =>
        cycle.id === cycleId
          ? {
              ...cycle,
              results: [...cycle.results, result]
            }
          : cycle
      )
    );
  };

  // ステータスの色を取得
  const getStatusColor = (status) => {
    switch (status) {
      case 'planning': return 'text-blue-600 bg-blue-100';
      case 'doing': return 'text-yellow-600 bg-yellow-100';
      case 'checking': return 'text-orange-600 bg-orange-100';
      case 'acting': return 'text-purple-600 bg-purple-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // 優先度の色を取得
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // 進捗率を計算
  const calculateProgress = (cycle) => {
    const totalActions = cycle.actions.length;
    const completedActions = cycle.actions.filter(a => a.status === 'completed').length;
    return totalActions > 0 ? (completedActions / totalActions) * 100 : 0;
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">PDCA管理</h1>
          <p className="text-gray-600">継続的改善のためのPDCAサイクル管理</p>
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
            <span>新規PDCA</span>
          </button>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Target className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">総サイクル数</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Play className="w-8 h-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">実行中</p>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">完了</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">成功率</p>
              <p className="text-2xl font-bold text-gray-900">{stats.successRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">平均期間</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgCycleTime.toFixed(0)}日</p>
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
                placeholder="PDCAサイクルを検索..."
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

      {/* PDCAサイクル一覧 */}
      <div className="space-y-4">
        {filteredCycles.map(cycle => (
          <div key={cycle.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{cycle.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(cycle.status)}`}>
                    {cycle.status}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(cycle.priority)}`}>
                    {cycle.priority}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-600">
                    {cycle.phase}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{cycle.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">カテゴリ</p>
                    <p className="font-medium">{cycle.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">オーナー</p>
                    <p className="font-medium">{cycle.owner}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">期間</p>
                    <p className="font-medium">{cycle.duration}日</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">進捗</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-pink-500 h-2 rounded-full" 
                          style={{ width: `${calculateProgress(cycle)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{calculateProgress(cycle).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>

                {/* KPI表示 */}
                {cycle.kpis.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">KPI</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {cycle.kpis.map((kpi, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">{kpi.name}</span>
                            <span className="text-sm text-gray-500">{kpi.unit}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-900">{kpi.current}</span>
                            <span className="text-sm text-gray-500">/ {kpi.target}</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-1">
                              <div 
                                className="bg-pink-500 h-1 rounded-full" 
                                style={{ width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* アクション一覧 */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-700">アクション</h4>
                    <button
                      onClick={() => {
                        const newAction = {
                          title: '新しいアクション',
                          assignee: '未割当',
                          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                          description: ''
                        };
                        addAction(cycle.id, newAction);
                      }}
                      className="text-xs bg-pink-500 text-white px-2 py-1 rounded hover:bg-pink-600"
                    >
                      + 追加
                    </button>
                  </div>
                  <div className="space-y-2">
                    {cycle.actions.map(action => (
                      <div key={action.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3 flex-1">
                          <div className={`w-3 h-3 rounded-full ${
                            action.status === 'completed' ? 'bg-green-500' :
                            action.status === 'doing' ? 'bg-yellow-500' : 
                            action.status === 'cancelled' ? 'bg-red-500' : 'bg-gray-300'
                          }`}></div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">{action.title}</span>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                action.status === 'completed' ? 'bg-green-100 text-green-800' :
                                action.status === 'doing' ? 'bg-yellow-100 text-yellow-800' :
                                action.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {action.status === 'completed' ? '完了' :
                                 action.status === 'doing' ? '実行中' :
                                 action.status === 'cancelled' ? 'キャンセル' : '未開始'}
                              </span>
                            </div>
                            {action.description && (
                              <p className="text-xs text-gray-600 mt-1">{action.description}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{action.assignee}</span>
                          <span className="text-xs text-gray-500">{action.dueDate.toLocaleDateString()}</span>
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => updateActionStatus(cycle.id, action.id, 'doing')}
                              className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                              disabled={action.status === 'completed'}
                            >
                              開始
                            </button>
                            <button
                              onClick={() => updateActionStatus(cycle.id, action.id, 'completed')}
                              className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                              disabled={action.status === 'completed'}
                            >
                              完了
                            </button>
                            <button
                              onClick={() => deleteAction(cycle.id, action.id)}
                              className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            >
                              削除
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {cycle.actions.length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">アクションがありません</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => setSelectedCycle(cycle)}
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

      {/* 新規PDCA作成モーダル */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">新規PDCAサイクル作成</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  タイトル
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="PDCAサイクルのタイトルを入力"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  説明
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  rows="3"
                  placeholder="PDCAサイクルの説明を入力"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    カテゴリ
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                    <option value="">カテゴリを選択</option>
                    <option value="ユーザー体験">ユーザー体験</option>
                    <option value="収益">収益</option>
                    <option value="コンテンツ">コンテンツ</option>
                    <option value="技術">技術</option>
                    <option value="マーケティング">マーケティング</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    優先度
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                    <option value="high">高</option>
                    <option value="medium">中</option>
                    <option value="low">低</option>
                  </select>
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
                  onClick={() => createCycle({ title: '新規PDCA', description: '説明', category: 'その他', priority: 'medium' })}
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

export default PDCAManagement;
