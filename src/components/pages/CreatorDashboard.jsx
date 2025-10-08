import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Heart, 
  Eye, 
  DollarSign, 
  TrendingUp, 
  Video,
  Settings,
  ArrowLeft,
  Download,
  Share2,
  Target,
  Plus,
  Edit3,
  Trash2,
  MessageCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BottomNavigation from '../BottomNavigation';

const CreatorDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [activeTab, setActiveTab] = useState('analytics');
  const [analyticsTab, setAnalyticsTab] = useState('posts');
  const [stats, setStats] = useState({
    totalViews: 99900,
    totalLikes: 6100,
    totalFollowers: 4800,
    totalEarnings: 14828,
    postsCount: 111,
    engagementRate: 14.0
  });
  const [marketingCampaigns, setMarketingCampaigns] = useState([
    {
      id: 1,
      name: '新作動画プロモーション',
      status: 'active',
      budget: 50000,
      spent: 32000,
      reach: 15000,
      engagement: 850,
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      targetAudience: '18-35歳女性',
      platform: 'Instagram'
    },
    {
      id: 2,
      name: 'バレンタインキャンペーン',
      status: 'paused',
      budget: 30000,
      spent: 15000,
      reach: 8000,
      engagement: 420,
      startDate: '2024-02-01',
      endDate: '2024-02-14',
      targetAudience: '20-40歳男性',
      platform: 'TikTok'
    }
  ]);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);

  // 投稿分析データ
  const [postsData, setPostsData] = useState([
    {
      id: 1,
      title: '新作動画 - バレンタイン特集',
      type: 'video',
      views: 12500,
      likes: 890,
      comments: 45,
      shares: 23,
      engagementRate: 7.2,
      publishDate: '2024-01-15',
      thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=300&h=200&fit=crop',
      revenue: 1250
    },
    {
      id: 2,
      title: '写真投稿 - コスプレ',
      type: 'image',
      views: 8900,
      likes: 670,
      comments: 28,
      shares: 15,
      engagementRate: 8.1,
      publishDate: '2024-01-14',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
      revenue: 890
    },
    {
      id: 3,
      title: 'ライブ配信 - 質問コーナー',
      type: 'live',
      views: 21000,
      likes: 1560,
      comments: 89,
      shares: 34,
      engagementRate: 8.0,
      publishDate: '2024-01-13',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop',
      revenue: 2100
    }
  ]);

  // プラン分析データ
  const [plansData, setPlansData] = useState([
    {
      id: 1,
      name: 'ベーシックプラン',
      price: 2980,
      subscribers: 120,
      revenue: 357600,
      conversionRate: 2.5,
      churnRate: 5.2,
      avgLifetime: 19.2
    },
    {
      id: 2,
      name: 'プレミアムプラン',
      price: 5980,
      subscribers: 85,
      revenue: 508300,
      conversionRate: 1.8,
      churnRate: 3.1,
      avgLifetime: 32.3
    },
    {
      id: 3,
      name: 'VIPプラン',
      price: 9980,
      subscribers: 45,
      revenue: 449100,
      conversionRate: 0.9,
      churnRate: 2.1,
      avgLifetime: 47.6
    }
  ]);

  // プロフィール分析データ
  const [profileData, setProfileData] = useState({
    totalFollowers: 4800,
    newFollowers: 120,
    unfollowers: 45,
    followerGrowth: 1.6,
    demographics: {
      age: {
        '18-24': 35,
        '25-34': 40,
        '35-44': 20,
        '45+': 5
      },
      gender: {
        female: 65,
        male: 35
      },
      location: {
        '東京': 30,
        '大阪': 15,
        '名古屋': 10,
        'その他': 45
      }
    },
    engagement: {
      avgLikes: 156,
      avgComments: 12,
      avgShares: 8,
      responseTime: 2.3
    }
  });

  // マーケティング方法データ
  const [marketingMethods, setMarketingMethods] = useState([
    {
      id: 1,
      name: 'Instagram広告',
      platform: 'Instagram',
      cost: 50000,
      reach: 15000,
      engagement: 850,
      conversion: 45,
      roi: 180,
      description: 'ストーリーズとフィード広告を組み合わせた戦略',
      bestPractices: ['高品質なビジュアル', '適切なハッシュタグ', 'ターゲット設定の最適化']
    },
    {
      id: 2,
      name: 'TikTokプロモーション',
      platform: 'TikTok',
      cost: 30000,
      reach: 25000,
      engagement: 1200,
      conversion: 35,
      roi: 220,
      description: 'トレンドを活用したショート動画プロモーション',
      bestPractices: ['トレンド音源の活用', '短時間でのインパクト', 'ハッシュタグチャレンジ']
    },
    {
      id: 3,
      name: 'YouTube広告',
      platform: 'YouTube',
      cost: 80000,
      reach: 35000,
      engagement: 2100,
      conversion: 80,
      roi: 150,
      description: 'TrueView広告とバナー広告の組み合わせ',
      bestPractices: ['最初の5秒で興味を引く', '明確なCTA', 'ターゲットオーディエンスの設定']
    }
  ]);

  // 期間に応じたデータ更新
  useEffect(() => {
    const generateStats = () => {
      const baseStats = {
        totalViews: 99900,
        totalLikes: 6100,
        totalFollowers: 4800,
        totalEarnings: 14828,
        postsCount: 111,
        engagementRate: 14.0
      };
      
      // 期間に応じてデータを調整
      if (selectedPeriod === 'month') {
        baseStats.totalViews *= 4;
        baseStats.totalLikes *= 4;
        baseStats.totalFollowers += 200;
        baseStats.totalEarnings *= 4;
        baseStats.postsCount *= 4;
      } else if (selectedPeriod === 'year') {
        baseStats.totalViews *= 52;
        baseStats.totalLikes *= 52;
        baseStats.totalFollowers += 1000;
        baseStats.totalEarnings *= 52;
        baseStats.postsCount *= 52;
      }
      
      setStats(baseStats);
    };

    generateStats();
  }, [selectedPeriod]);

  // リアルタイムデータ更新（シミュレーション）
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => ({
        ...prevStats,
        totalViews: prevStats.totalViews + Math.floor(Math.random() * 10),
        totalLikes: prevStats.totalLikes + Math.floor(Math.random() * 3),
        totalFollowers: prevStats.totalFollowers + (Math.random() > 0.9 ? 1 : 0),
        totalEarnings: prevStats.totalEarnings + Math.floor(Math.random() * 5),
        engagementRate: Math.max(0, prevStats.engagementRate + (Math.random() - 0.5) * 0.1)
      }));
    }, 5000); // 5秒ごとに更新

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const analyticsData = [
    { label: '月', views: 1200, likes: 80 },
    { label: '火', views: 1500, likes: 95 },
    { label: '水', views: 1800, likes: 110 },
    { label: '木', views: 1600, likes: 100 },
    { label: '金', views: 2200, likes: 140 },
    { label: '土', views: 2500, likes: 160 },
    { label: '日', views: 2000, likes: 130 }
  ];

  const maxViews = analyticsData.length > 0 ? Math.max(...analyticsData.map(d => d.views)) : 1;
  const maxLikes = analyticsData.length > 0 ? Math.max(...analyticsData.map(d => d.likes)) : 1;

  // マーケティング機能のハンドラー
  const handleCreateCampaign = () => {
    setEditingCampaign(null);
    setShowCampaignModal(true);
  };

  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign);
    setShowCampaignModal(true);
  };

  const handleDeleteCampaign = (campaignId) => {
    setMarketingCampaigns(prev => prev.filter(c => c.id !== campaignId));
  };

  const handleToggleCampaign = (campaignId) => {
    setMarketingCampaigns(prev => prev.map(c => 
      c.id === campaignId 
        ? { ...c, status: c.status === 'active' ? 'paused' : 'active' }
        : c
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return '実行中';
      case 'paused': return '一時停止';
      case 'completed': return '完了';
      default: return '不明';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header - モバイル最適化 */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">クリエイターダッシュボード</h1>
          </div>
          <div className="flex items-center space-x-1">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Download className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Settings className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-4">
        {/* Tab Navigation */}
        <div className="bg-white rounded-xl p-1 shadow-sm">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-pink-500 text-white'
                  : 'bg-transparent text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              分析
            </button>
            <button
              onClick={() => setActiveTab('marketing')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'marketing'
                  ? 'bg-pink-500 text-white'
                  : 'bg-transparent text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Target className="w-4 h-4 inline mr-2" />
              マーケティング
            </button>
          </div>
        </div>

        {/* Period Selector - モバイル最適化 */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex space-x-1">
              {['week', 'month', 'year'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                    selectedPeriod === period
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {period === 'week' ? '週' : period === 'month' ? '月' : '年'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Content */}
        {activeTab === 'analytics' && (
          <>
            {/* Analytics Sub-tabs */}
            <div className="bg-white rounded-xl p-1 shadow-sm">
              <div className="flex space-x-1">
                <button
                  onClick={() => setAnalyticsTab('posts')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    analyticsTab === 'posts'
                      ? 'bg-pink-500 text-white'
                      : 'bg-transparent text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  投稿分析
                </button>
                <button
                  onClick={() => setAnalyticsTab('plans')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    analyticsTab === 'plans'
                      ? 'bg-pink-500 text-white'
                      : 'bg-transparent text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  プラン分析
                </button>
                <button
                  onClick={() => setAnalyticsTab('profile')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    analyticsTab === 'profile'
                      ? 'bg-pink-500 text-white'
                      : 'bg-transparent text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  プロフィール分析
                </button>
              </div>
            </div>

            {/* Stats Cards - モバイル最適化 */}
            <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">総視聴回数</p>
                <p className="text-xl font-bold text-gray-900">{formatNumber(stats.totalViews)}</p>
              </div>
              <Eye className="w-6 h-6 text-blue-500 flex-shrink-0" />
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-xs text-green-500 font-medium">+12.5%</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">総いいね数</p>
                <p className="text-xl font-bold text-gray-900">{formatNumber(stats.totalLikes)}</p>
              </div>
              <Heart className="w-6 h-6 text-red-500 flex-shrink-0" />
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-xs text-green-500 font-medium">+8.3%</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">フォロワー数</p>
                <p className="text-xl font-bold text-gray-900">{formatNumber(stats.totalFollowers)}</p>
              </div>
              <Users className="w-6 h-6 text-green-500 flex-shrink-0" />
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-xs text-green-500 font-medium">+15.2%</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">総収益</p>
                <p className="text-lg font-bold text-gray-900">{formatCurrency(stats.totalEarnings)}</p>
              </div>
              <DollarSign className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-xs text-green-500 font-medium">+22.1%</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">投稿数</p>
                <p className="text-xl font-bold text-gray-900">{stats.postsCount}</p>
              </div>
              <Video className="w-6 h-6 text-purple-500 flex-shrink-0" />
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-xs text-green-500 font-medium">+5.7%</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">エンゲージメント率</p>
                <p className="text-xl font-bold text-gray-900">{stats.engagementRate.toFixed(0)}%</p>
              </div>
              <BarChart3 className="w-6 h-6 text-indigo-500 flex-shrink-0" />
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-xs text-green-500 font-medium">+3.2%</span>
            </div>
          </motion.div>
        </div>

        {/* Analytics Chart - モバイル最適化 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">週間パフォーマンス</h3>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-gray-600">視聴回数</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-xs text-gray-600">いいね数</span>
              </div>
            </div>
          </div>
          
          <div className="h-36 flex items-end space-x-1">
            {analyticsData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center space-y-1">
                <div className="w-full flex flex-col space-y-0.5 relative">
                  <div
                    className="bg-blue-500 rounded-t w-full"
                    style={{ height: `${Math.max((data.views / maxViews) * 100, 2)}px` }}
                  ></div>
                  <div
                    className="bg-red-500 rounded-t w-full"
                    style={{ height: `${Math.max((data.likes / maxLikes) * 100, 2)}px` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{data.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

            {/* Detailed Analytics Content */}
            {analyticsTab === 'posts' && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">投稿パフォーマンス</h3>
                  <div className="space-y-3">
                    {postsData.map((post) => (
                      <div key={post.id} className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg">
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">{post.title}</h4>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-500">{formatNumber(post.views)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-500">{formatNumber(post.likes)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-500">{post.comments}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-400">{post.publishDate}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-green-600 font-medium">
                                エンゲージメント率: {post.engagementRate}%
                              </span>
                              <span className="text-xs text-blue-600 font-medium">
                                収益: {formatCurrency(post.revenue)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {analyticsTab === 'plans' && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">プラン分析</h3>
                  <div className="space-y-4">
                    {plansData.map((plan) => (
                      <div key={plan.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                          <span className="text-lg font-bold text-pink-600">{formatCurrency(plan.price)}/月</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-gray-500">購読者数</p>
                            <p className="text-sm font-semibold text-gray-900">{plan.subscribers}人</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">月間収益</p>
                            <p className="text-sm font-semibold text-gray-900">{formatCurrency(plan.revenue)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">コンバージョン率</p>
                            <p className="text-sm font-semibold text-gray-900">{plan.conversionRate}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">チャーン率</p>
                            <p className="text-sm font-semibold text-gray-900">{plan.churnRate}%</p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          平均利用期間: {plan.avgLifetime}ヶ月
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {analyticsTab === 'profile' && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">プロフィール分析</h3>
                  
                  {/* フォロワー統計 */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{formatNumber(profileData.totalFollowers)}</p>
                      <p className="text-sm text-gray-500">総フォロワー数</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">+{profileData.newFollowers}</p>
                      <p className="text-sm text-gray-500">新規フォロワー</p>
                    </div>
                  </div>

                  {/* デモグラフィック */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">年齢分布</h4>
                      <div className="space-y-2">
                        {profileData.demographics && profileData.demographics.age && Object.entries(profileData.demographics.age).map(([age, percentage]) => (
                          <div key={age} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{age}歳</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-pink-500 h-2 rounded-full"
                                  style={{ width: `${Math.max(percentage || 0, 0)}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-gray-900">{percentage || 0}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">性別分布</h4>
                      <div className="flex space-x-4">
                        <div className="text-center">
                          <p className="text-lg font-bold text-pink-600">{profileData.demographics?.gender?.female || 0}%</p>
                          <p className="text-xs text-gray-500">女性</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-blue-600">{profileData.demographics?.gender?.male || 0}%</p>
                          <p className="text-xs text-gray-500">男性</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">エンゲージメント</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">平均いいね数</p>
                          <p className="text-sm font-semibold text-gray-900">{profileData.engagement?.avgLikes || 0}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">平均コメント数</p>
                          <p className="text-sm font-semibold text-gray-900">{profileData.engagement?.avgComments || 0}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">平均シェア数</p>
                          <p className="text-sm font-semibold text-gray-900">{profileData.engagement?.avgShares || 0}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">平均返信時間</p>
                          <p className="text-sm font-semibold text-gray-900">{profileData.engagement?.responseTime || 0}時間</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Marketing Content */}
        {activeTab === 'marketing' && (
          <div className="space-y-4">
            {/* Marketing Header */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">マーケティングキャンペーン</h3>
                <button
                  onClick={handleCreateCampaign}
                  className="bg-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 hover:bg-pink-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>新規作成</span>
                </button>
              </div>
              
              {/* Marketing Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{marketingCampaigns.length}</p>
                  <p className="text-sm text-gray-500">総キャンペーン数</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {marketingCampaigns.filter(c => c.status === 'active').length}
                  </p>
                  <p className="text-sm text-gray-500">実行中</p>
                </div>
              </div>
            </div>

            {/* Marketing Methods */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">マーケティング方法</h3>
              <div className="space-y-4">
                {marketingMethods.map((method) => (
                  <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{method.name}</h4>
                        <p className="text-sm text-gray-500">{method.platform}</p>
                        <p className="text-xs text-gray-600 mt-1">{method.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">ROI: {method.roi}%</p>
                        <p className="text-xs text-gray-500">投資対効果</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">コスト</p>
                        <p className="text-sm font-semibold text-gray-900">{formatCurrency(method.cost)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">リーチ</p>
                        <p className="text-sm font-semibold text-gray-900">{formatNumber(method.reach)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">エンゲージメント</p>
                        <p className="text-sm font-semibold text-gray-900">{formatNumber(method.engagement)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">コンバージョン</p>
                        <p className="text-sm font-semibold text-gray-900">{method.conversion}人</p>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-2">ベストプラクティス</h5>
                      <div className="flex flex-wrap gap-1">
                        {(method.bestPractices || []).map((practice, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded-full"
                          >
                            {practice}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaign List */}
            <div className="space-y-3">
              {marketingCampaigns.map((campaign) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{campaign.name}</h4>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                          {getStatusText(campaign.status)}
                        </span>
                        <span className="text-xs text-gray-500">{campaign.platform}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleEditCampaign(campaign)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit3 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteCampaign(campaign.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>

                  {/* Campaign Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">予算</p>
                      <p className="text-sm font-semibold text-gray-900">{formatCurrency(campaign.budget)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">使用済み</p>
                      <p className="text-sm font-semibold text-gray-900">{formatCurrency(campaign.spent)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">リーチ</p>
                      <p className="text-sm font-semibold text-gray-900">{formatNumber(campaign.reach)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">エンゲージメント</p>
                      <p className="text-sm font-semibold text-gray-900">{formatNumber(campaign.engagement)}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>進捗</span>
                      <span>{Math.round((campaign.spent / campaign.budget) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {campaign.startDate} - {campaign.endDate}
                    </div>
                    <button
                      onClick={() => handleToggleCampaign(campaign.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                        campaign.status === 'active'
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      {campaign.status === 'active' ? '一時停止' : '開始'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNavigation active="account" />
    </div>
  );
};

export default CreatorDashboard;
