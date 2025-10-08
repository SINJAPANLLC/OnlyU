import React, { useState, useEffect } from 'react';
import { 
  Target, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Users,
  DollarSign,
  Eye,
  MessageSquare,
  Heart,
  Calendar,
  Filter,
  Search,
  Download,
  RefreshCw,
  Plus,
  Edit3,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Clock,
  Star,
  Zap,
  ArrowUp,
  ArrowDown,
  Minus,
  Percent,
  Award,
  Trophy
} from 'lucide-react';

const KPIDashboard = () => {
  const [kpis, setKpis] = useState([]);
  const [goals, setGoals] = useState([]);
  const [filteredKpis, setFilteredKpis] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedKpi, setSelectedKpi] = useState(null);
  const [stats, setStats] = useState({
    totalKpis: 0,
    achieved: 0,
    onTrack: 0,
    atRisk: 0,
    avgProgress: 0
  });

  // カテゴリオプション
  const categoryOptions = [
    { value: 'all', label: 'すべて' },
    { value: 'revenue', label: '収益' },
    { value: 'users', label: 'ユーザー' },
    { value: 'engagement', label: 'エンゲージメント' },
    { value: 'conversion', label: 'コンバージョン' },
    { value: 'retention', label: 'リテンション' },
    { value: 'satisfaction', label: '満足度' }
  ];

  // データを読み込み
  useEffect(() => {
    loadKPIs();
    loadGoals();
  }, []);

  // フィルタリング
  useEffect(() => {
    let filtered = [...kpis];

    if (searchTerm) {
      filtered = filtered.filter(kpi =>
        kpi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kpi.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(kpi => kpi.category === filterCategory);
    }

    setFilteredKpis(filtered);
  }, [kpis, searchTerm, filterCategory]);

  // 統計を更新
  useEffect(() => {
    const totalKpis = kpis.length;
    const achieved = kpis.filter(k => k.progress >= 100).length;
    const onTrack = kpis.filter(k => k.progress >= 70 && k.progress < 100).length;
    const atRisk = kpis.filter(k => k.progress < 70).length;
    const avgProgress = kpis.length > 0 ? kpis.reduce((sum, k) => sum + k.progress, 0) / kpis.length : 0;

    setStats({ totalKpis, achieved, onTrack, atRisk, avgProgress });
  }, [kpis]);

  // モックKPIデータ
  const loadKPIs = () => {
    const mockKpis = [
      {
        id: 'KPI_001',
        name: '月間収益',
        description: '月間総収益の目標達成',
        category: 'revenue',
        currentValue: 12500000,
        targetValue: 15000000,
        unit: '円',
        period: 'monthly',
        progress: 83.3,
        trend: 'up',
        trendValue: 12.5,
        status: 'on_track',
        priority: 'high',
        owner: '田中太郎',
        lastUpdated: new Date('2025-01-10T10:00:00'),
        history: [
          { date: '2024-10-01', value: 10000000 },
          { date: '2024-11-01', value: 11000000 },
          { date: '2024-12-01', value: 12000000 },
          { date: '2025-01-01', value: 12500000 }
        ]
      },
      {
        id: 'KPI_002',
        name: 'アクティブユーザー数',
        description: '月間アクティブユーザー数の目標達成',
        category: 'users',
        currentValue: 45000,
        targetValue: 50000,
        unit: '人',
        period: 'monthly',
        progress: 90.0,
        trend: 'up',
        trendValue: 8.3,
        status: 'on_track',
        priority: 'high',
        owner: '佐藤花子',
        lastUpdated: new Date('2025-01-10T09:30:00'),
        history: [
          { date: '2024-10-01', value: 35000 },
          { date: '2024-11-01', value: 38000 },
          { date: '2024-12-01', value: 42000 },
          { date: '2025-01-01', value: 45000 }
        ]
      },
      {
        id: 'KPI_003',
        name: 'コンバージョン率',
        description: 'サイト全体のコンバージョン率向上',
        category: 'conversion',
        currentValue: 3.2,
        targetValue: 4.0,
        unit: '%',
        period: 'monthly',
        progress: 80.0,
        trend: 'up',
        trendValue: 5.2,
        status: 'on_track',
        priority: 'medium',
        owner: '山田次郎',
        lastUpdated: new Date('2025-01-10T09:00:00'),
        history: [
          { date: '2024-10-01', value: 2.8 },
          { date: '2024-11-01', value: 2.9 },
          { date: '2024-12-01', value: 3.0 },
          { date: '2025-01-01', value: 3.2 }
        ]
      },
      {
        id: 'KPI_004',
        name: 'ユーザー満足度',
        description: 'ユーザー満足度スコアの向上',
        category: 'satisfaction',
        currentValue: 4.1,
        targetValue: 4.5,
        unit: '点',
        period: 'monthly',
        progress: 91.1,
        trend: 'up',
        trendValue: 2.5,
        status: 'on_track',
        priority: 'high',
        owner: '鈴木あい',
        lastUpdated: new Date('2025-01-09T16:00:00'),
        history: [
          { date: '2024-10-01', value: 3.8 },
          { date: '2024-11-01', value: 3.9 },
          { date: '2024-12-01', value: 4.0 },
          { date: '2025-01-01', value: 4.1 }
        ]
      },
      {
        id: 'KPI_005',
        name: 'リテンション率',
        description: '30日リテンション率の向上',
        category: 'retention',
        currentValue: 65,
        targetValue: 75,
        unit: '%',
        period: 'monthly',
        progress: 86.7,
        trend: 'up',
        trendValue: 3.2,
        status: 'on_track',
        priority: 'medium',
        owner: '高橋健一',
        lastUpdated: new Date('2025-01-09T15:30:00'),
        history: [
          { date: '2024-10-01', value: 58 },
          { date: '2024-11-01', value: 60 },
          { date: '2024-12-01', value: 62 },
          { date: '2025-01-01', value: 65 }
        ]
      },
      {
        id: 'KPI_006',
        name: 'エンゲージメント率',
        description: 'ユーザーエンゲージメント率の向上',
        category: 'engagement',
        currentValue: 45,
        targetValue: 60,
        unit: '%',
        period: 'monthly',
        progress: 75.0,
        trend: 'down',
        trendValue: -2.1,
        status: 'at_risk',
        priority: 'medium',
        owner: '山田美咲',
        lastUpdated: new Date('2025-01-09T14:00:00'),
        history: [
          { date: '2024-10-01', value: 48 },
          { date: '2024-11-01', value: 47 },
          { date: '2024-12-01', value: 46 },
          { date: '2025-01-01', value: 45 }
        ]
      }
    ];
    setKpis(mockKpis);
  };

  // モック目標データ
  const loadGoals = () => {
    const mockGoals = [
      {
        id: 'GOAL_001',
        name: 'Q1収益目標',
        description: '2025年Q1の収益目標達成',
        targetValue: 45000000,
        currentValue: 37500000,
        unit: '円',
        deadline: new Date('2025-03-31'),
        status: 'on_track',
        progress: 83.3,
        owner: '田中太郎',
        kpis: ['KPI_001']
      },
      {
        id: 'GOAL_002',
        name: 'ユーザー成長目標',
        description: '2025年上半期のユーザー成長目標',
        targetValue: 100000,
        currentValue: 45000,
        unit: '人',
        deadline: new Date('2025-06-30'),
        status: 'on_track',
        progress: 45.0,
        owner: '佐藤花子',
        kpis: ['KPI_002']
      }
    ];
    setGoals(mockGoals);
  };

  // KPIを作成
  const createKPI = (kpiData) => {
    const newKPI = {
      id: `KPI_${Date.now()}`,
      ...kpiData,
      progress: 0,
      trend: 'stable',
      trendValue: 0,
      status: 'at_risk',
      lastUpdated: new Date(),
      history: []
    };
    setKpis(prev => [newKPI, ...prev]);
    setShowCreateModal(false);
  };

  // ステータスの色を取得
  const getStatusColor = (status) => {
    switch (status) {
      case 'achieved': return 'text-green-600 bg-green-100';
      case 'on_track': return 'text-blue-600 bg-blue-100';
      case 'at_risk': return 'text-yellow-600 bg-yellow-100';
      case 'behind': return 'text-red-600 bg-red-100';
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

  // トレンドのアイコンを取得
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  // カテゴリのアイコンを取得
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'revenue': return <DollarSign className="w-5 h-5 text-green-500" />;
      case 'users': return <Users className="w-5 h-5 text-blue-500" />;
      case 'engagement': return <Heart className="w-5 h-5 text-red-500" />;
      case 'conversion': return <Target className="w-5 h-5 text-purple-500" />;
      case 'retention': return <Clock className="w-5 h-5 text-orange-500" />;
      case 'satisfaction': return <Star className="w-5 h-5 text-yellow-500" />;
      default: return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  // 進捗率の色を取得
  const getProgressColor = (progress) => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 70) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">KPIダッシュボード</h1>
          <p className="text-gray-600">重要業績評価指標と目標管理</p>
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
            <span>新規KPI</span>
          </button>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Target className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">総KPI数</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalKpis}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">達成済み</p>
              <p className="text-2xl font-bold text-gray-900">{stats.achieved}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">順調</p>
              <p className="text-2xl font-bold text-gray-900">{stats.onTrack}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">リスク</p>
              <p className="text-2xl font-bold text-gray-900">{stats.atRisk}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Activity className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">平均進捗</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgProgress.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* 目標サマリー */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">目標サマリー</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map(goal => (
            <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{goal.name}</h4>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(goal.status)}`}>
                  {goal.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">進捗</span>
                <span className="text-sm font-medium">{goal.progress.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full ${getProgressColor(goal.progress)}`}
                  style={{ width: `${Math.min(goal.progress, 100)}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{goal.currentValue.toLocaleString()} / {goal.targetValue.toLocaleString()} {goal.unit}</span>
                <span>期限: {goal.deadline.toLocaleDateString()}</span>
              </div>
            </div>
          ))}
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
                placeholder="KPIを検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {categoryOptions.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
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

      {/* KPI一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredKpis.map(kpi => (
          <div key={kpi.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                {getCategoryIcon(kpi.category)}
                <h3 className="text-lg font-semibold text-gray-900">{kpi.name}</h3>
              </div>
              <div className="flex items-center space-x-1">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(kpi.status)}`}>
                  {kpi.status}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(kpi.priority)}`}>
                  {kpi.priority}
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{kpi.description}</p>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">現在値</span>
                <span className="text-lg font-bold text-gray-900">
                  {kpi.currentValue.toLocaleString()} {kpi.unit}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">目標値</span>
                <span className="text-sm text-gray-600">
                  {kpi.targetValue.toLocaleString()} {kpi.unit}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full ${getProgressColor(kpi.progress)}`}
                  style={{ width: `${Math.min(kpi.progress, 100)}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">進捗</span>
                <span className="text-sm font-medium">{kpi.progress.toFixed(1)}%</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-1">
                {getTrendIcon(kpi.trend)}
                <span className="text-sm text-gray-600">
                  {kpi.trendValue > 0 ? '+' : ''}{kpi.trendValue.toFixed(1)}%
                </span>
              </div>
              <div className="text-sm text-gray-500">
                更新: {kpi.lastUpdated.toLocaleDateString()}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                担当: {kpi.owner}
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-900">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-green-600 hover:text-green-900">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 新規KPI作成モーダル */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">新規KPI作成</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  KPI名
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="KPIの名前を入力"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  説明
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  rows="3"
                  placeholder="KPIの説明を入力"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    カテゴリ
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                    {categoryOptions.slice(1).map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    現在値
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    目標値
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="100"
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
                  onClick={() => createKPI({ name: '新規KPI', description: '説明', category: 'revenue', priority: 'medium' })}
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

export default KPIDashboard;
