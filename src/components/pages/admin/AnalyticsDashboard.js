import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  Heart, 
  MessageCircle, 
  DollarSign,
  Calendar,
  Download,
  RefreshCw,
  Filter,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState({
    overview: {
      totalUsers: 0,
      activeUsers: 0,
      totalRevenue: 0,
      totalViews: 0,
      totalPosts: 0,
      totalLikes: 0,
      totalComments: 0
    },
    trends: {
      userGrowth: [],
      revenueGrowth: [],
      viewGrowth: [],
      engagementGrowth: []
    },
    rankings: {
      topCreators: [],
      topPosts: [],
      topGenres: [],
      topCountries: []
    },
    demographics: {
      ageGroups: [],
      genderDistribution: [],
      deviceTypes: [],
      locations: []
    }
  });

  const timeRanges = [
    { value: '1d', label: '1日' },
    { value: '7d', label: '7日' },
    { value: '30d', label: '30日' },
    { value: '90d', label: '90日' },
    { value: '1y', label: '1年' }
  ];

  // データを読み込み
  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    setLoading(true);
    
    // モックデータ
    const mockData = {
      overview: {
        totalUsers: 125430,
        activeUsers: 8940,
        totalRevenue: 12500000,
        totalViews: 2500000,
        totalPosts: 15680,
        totalLikes: 890000,
        totalComments: 125000
      },
      trends: {
        userGrowth: [
          { date: '2025-01-01', value: 120000 },
          { date: '2025-01-02', value: 121500 },
          { date: '2025-01-03', value: 123000 },
          { date: '2025-01-04', value: 124200 },
          { date: '2025-01-05', value: 125430 }
        ],
        revenueGrowth: [
          { date: '2025-01-01', value: 1000000 },
          { date: '2025-01-02', value: 1200000 },
          { date: '2025-01-03', value: 1100000 },
          { date: '2025-01-04', value: 1300000 },
          { date: '2025-01-05', value: 1250000 }
        ],
        viewGrowth: [
          { date: '2025-01-01', value: 200000 },
          { date: '2025-01-02', value: 220000 },
          { date: '2025-01-03', value: 210000 },
          { date: '2025-01-04', value: 240000 },
          { date: '2025-01-05', value: 250000 }
        ],
        engagementGrowth: [
          { date: '2025-01-01', value: 15000 },
          { date: '2025-01-02', value: 18000 },
          { date: '2025-01-03', value: 16000 },
          { date: '2025-01-04', value: 20000 },
          { date: '2025-01-05', value: 22000 }
        ]
      },
      rankings: {
        topCreators: [
          { id: '1', name: '田中花子', username: 'hanako_tanaka', followers: 125000, revenue: 2500000, posts: 156, engagement: 8.5 },
          { id: '2', name: '佐藤美咲', username: 'misaki_sato', followers: 98000, revenue: 1800000, posts: 134, engagement: 7.8 },
          { id: '3', name: '鈴木あい', username: 'ai_suzuki', followers: 87000, revenue: 1650000, posts: 98, engagement: 9.2 },
          { id: '4', name: '高橋ゆき', username: 'yuki_takahashi', followers: 76000, revenue: 1400000, posts: 112, engagement: 7.5 },
          { id: '5', name: '山田みく', username: 'miku_yamada', followers: 65000, revenue: 1200000, posts: 89, engagement: 8.1 }
        ],
        topPosts: [
          { id: '1', title: '特別な動画', creator: '田中花子', views: 125000, likes: 8900, comments: 450, revenue: 125000 },
          { id: '2', title: '限定コンテンツ', creator: '佐藤美咲', views: 98000, likes: 7200, comments: 320, revenue: 98000 },
          { id: '3', title: '新作動画', creator: '鈴木あい', views: 87000, likes: 6500, comments: 280, revenue: 87000 },
          { id: '4', title: 'コラボ動画', creator: '高橋ゆき', views: 76000, likes: 5800, comments: 210, revenue: 76000 },
          { id: '5', title: 'ライブ配信', creator: '山田みく', views: 65000, likes: 4900, comments: 180, revenue: 65000 }
        ],
        topGenres: [
          { name: 'ロマンス', posts: 4560, views: 890000, revenue: 2500000 },
          { name: 'コスプレ', posts: 3240, views: 650000, revenue: 1800000 },
          { name: 'ダンス', posts: 2890, views: 580000, revenue: 1650000 },
          { name: '音楽', posts: 2340, views: 470000, revenue: 1400000 },
          { name: 'アート', posts: 1980, views: 390000, revenue: 1200000 }
        ],
        topCountries: [
          { name: '日本', users: 85000, revenue: 8500000, percentage: 68 },
          { name: '韓国', users: 15000, revenue: 1500000, percentage: 12 },
          { name: '台湾', users: 12000, revenue: 1200000, percentage: 10 },
          { name: 'シンガポール', users: 8000, revenue: 800000, percentage: 6 },
          { name: 'その他', users: 5430, revenue: 500000, percentage: 4 }
        ]
      },
      demographics: {
        ageGroups: [
          { range: '18-24', count: 45000, percentage: 36 },
          { range: '25-34', count: 38000, percentage: 30 },
          { range: '35-44', count: 25000, percentage: 20 },
          { range: '45-54', count: 12000, percentage: 10 },
          { range: '55+', count: 5430, percentage: 4 }
        ],
        genderDistribution: [
          { gender: '女性', count: 75000, percentage: 60 },
          { gender: '男性', count: 45000, percentage: 36 },
          { gender: 'その他', count: 5430, percentage: 4 }
        ],
        deviceTypes: [
          { device: 'スマートフォン', count: 95000, percentage: 76 },
          { device: 'タブレット', count: 20000, percentage: 16 },
          { device: 'PC', count: 10430, percentage: 8 }
        ],
        locations: [
          { location: '東京', count: 35000, percentage: 28 },
          { location: '大阪', count: 18000, percentage: 14 },
          { location: '名古屋', count: 12000, percentage: 10 },
          { location: '福岡', count: 8000, percentage: 6 },
          { location: 'その他', count: 52430, percentage: 42 }
        ]
      }
    };

    setTimeout(() => {
      setAnalytics(mockData);
      setLoading(false);
    }, 1000);
  };

  // 変化率を計算
  const calculateChangeRate = (current, previous) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  // 変化率のアイコンを取得
  const getChangeIcon = (rate) => {
    if (rate > 0) return <ArrowUp className="w-4 h-4 text-green-500" />;
    if (rate < 0) return <ArrowDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  // 数値をフォーマット
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  // 通貨をフォーマット
  const formatCurrency = (num) => {
    return '¥' + num.toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">統計・分析ダッシュボード</h1>
          <p className="text-gray-600">プラットフォームの統計データとランキングを表示します</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <button
            onClick={loadAnalytics}
            disabled={loading}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            <span>更新</span>
          </button>
          <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>エクスポート</span>
          </button>
        </div>
      </div>

      {/* 概要カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">総ユーザー数</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.overview.totalUsers)}</p>
              <div className="flex items-center text-sm text-green-600">
                {getChangeIcon(5.2)}
                <span className="ml-1">+5.2%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Eye className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">総再生数</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.overview.totalViews)}</p>
              <div className="flex items-center text-sm text-green-600">
                {getChangeIcon(12.5)}
                <span className="ml-1">+12.5%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">総収益</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(analytics.overview.totalRevenue)}</p>
              <div className="flex items-center text-sm text-green-600">
                {getChangeIcon(8.3)}
                <span className="ml-1">+8.3%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Heart className="w-8 h-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">総いいね数</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.overview.totalLikes)}</p>
              <div className="flex items-center text-sm text-green-600">
                {getChangeIcon(15.7)}
                <span className="ml-1">+15.7%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ランキングセクション */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* トップクリエイター */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">トップクリエイター</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analytics.rankings.topCreators.map((creator, index) => (
                <div key={creator.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-pink-600">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{creator.name}</p>
                      <p className="text-xs text-gray-500">@{creator.username}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{formatNumber(creator.followers)}</p>
                    <p className="text-xs text-gray-500">フォロワー</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* トップ投稿 */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">トップ投稿</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analytics.rankings.topPosts.map((post, index) => (
                <div key={post.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{post.title}</p>
                      <p className="text-xs text-gray-500">by {post.creator}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{formatNumber(post.views)}</p>
                    <p className="text-xs text-gray-500">再生数</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ジャンル・地域分析 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 人気ジャンル */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">人気ジャンル</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analytics.rankings.topGenres.map((genre, index) => (
                <div key={genre.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-purple-600">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{genre.name}</p>
                      <p className="text-xs text-gray-500">{formatNumber(genre.posts)} 投稿</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(genre.revenue)}</p>
                    <p className="text-xs text-gray-500">収益</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 地域別ユーザー */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">地域別ユーザー</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analytics.rankings.topCountries.map((country, index) => (
                <div key={country.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-green-600">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{country.name}</p>
                      <p className="text-xs text-gray-500">{formatNumber(country.users)} ユーザー</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{country.percentage}%</p>
                    <p className="text-xs text-gray-500">シェア</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* デモグラフィック分析 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 年齢層分布 */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">年齢層分布</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analytics.demographics.ageGroups.map((group, index) => (
                <div key={group.range} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-pink-500 rounded"></div>
                    <span className="text-sm font-medium text-gray-900">{group.range}歳</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-pink-500 h-2 rounded-full" 
                        style={{ width: `${group.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{group.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* デバイス別利用 */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">デバイス別利用</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analytics.demographics.deviceTypes.map((device, index) => (
                <div key={device.device} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm font-medium text-gray-900">{device.device}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{device.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
