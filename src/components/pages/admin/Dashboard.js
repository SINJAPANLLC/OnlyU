import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  UserPlus, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Heart,
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  RefreshCw,
  Download,
  Settings,
  Bell,
  Mail,
  Shield,
  Star
} from 'lucide-react';

export default function Dashboard() {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalUsers: 12543,
    totalCreators: 892,
    totalPosts: 4567,
    totalRevenue: 125430,
    activeUsers: 8934,
    newUsersToday: 45,
    pendingReports: 12,
    verifiedCreators: 756,
    totalViews: 234567,
    totalLikes: 45678,
    totalComments: 12345
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'user_registration', user: '田中太郎', time: '2分前', status: 'success' },
    { id: 2, type: 'creator_verification', user: '山田花子', time: '5分前', status: 'pending' },
    { id: 3, type: 'report_submitted', user: '佐藤次郎', time: '10分前', status: 'warning' },
    { id: 4, type: 'post_created', user: '鈴木一郎', time: '15分前', status: 'success' },
    { id: 5, type: 'payment_received', user: '高橋美咲', time: '20分前', status: 'success' }
  ]);

  const [quickActions, setQuickActions] = useState([
    { id: 1, title: '新規ユーザー承認', icon: UserPlus, count: 23, color: 'blue' },
    { id: 2, title: '通報処理', icon: AlertTriangle, count: 12, color: 'red' },
    { id: 3, title: 'クリエイター認証', icon: Shield, count: 8, color: 'green' },
    { id: 4, title: '売上レポート', icon: DollarSign, count: 0, color: 'purple' }
  ]);

  const handleQuickAction = (action) => {
    console.log('Quick action clicked:', action.title);
    // 実際のアクション処理をここに実装
  };

  const handleRefresh = () => {
    console.log('Refreshing dashboard data...');
    // データの再読み込み処理
  };

  const handleExport = () => {
    console.log('Exporting dashboard data...');
    // データエクスポート処理
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_registration': return <UserPlus className="w-4 h-4 text-green-500" />;
      case 'creator_verification': return <Shield className="w-4 h-4 text-blue-500" />;
      case 'report_submitted': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'post_created': return <FileText className="w-4 h-4 text-purple-500" />;
      case 'payment_received': return <DollarSign className="w-4 h-4 text-green-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActivityText = (activity) => {
    switch (activity.type) {
      case 'user_registration': return `${activity.user}が新規登録しました`;
      case 'creator_verification': return `${activity.user}のクリエイター認証が申請されました`;
      case 'report_submitted': return `${activity.user}が通報を提出しました`;
      case 'post_created': return `${activity.user}が新しい投稿を作成しました`;
      case 'payment_received': return `${activity.user}から支払いを受け取りました`;
      default: return 'アクティビティが発生しました';
    }
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleRefresh}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            更新
          </button>
          <button
            onClick={handleExport}
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            エクスポート
          </button>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">総ユーザー数</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalUsers.toLocaleString()}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <span className="text-green-600 font-medium">+{stats.newUsersToday}</span>
              <span className="text-gray-500"> 今日の新規登録</span>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Star className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">クリエイター数</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalCreators.toLocaleString()}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <span className="text-blue-600 font-medium">{stats.verifiedCreators}</span>
              <span className="text-gray-500"> 認証済み</span>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">総投稿数</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalPosts.toLocaleString()}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <span className="text-purple-600 font-medium">{stats.totalViews.toLocaleString()}</span>
              <span className="text-gray-500"> 総閲覧数</span>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">総売上</dt>
                  <dd className="text-lg font-medium text-gray-900">¥{stats.totalRevenue.toLocaleString()}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <span className="text-green-600 font-medium">+12.5%</span>
              <span className="text-gray-500"> 前月比</span>
            </div>
          </div>
        </div>
      </div>

      {/* クイックアクション */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">クイックアクション</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleQuickAction(action)}
                className={`relative p-4 rounded-lg border-2 border-dashed hover:border-solid transition-all duration-200 ${
                  action.color === 'blue' ? 'border-blue-300 hover:border-blue-500 hover:bg-blue-50' :
                  action.color === 'red' ? 'border-red-300 hover:border-red-500 hover:bg-red-50' :
                  action.color === 'green' ? 'border-green-300 hover:border-green-500 hover:bg-green-50' :
                  'border-purple-300 hover:border-purple-500 hover:bg-purple-50'
                }`}
              >
                <div className="flex items-center">
                  <action.icon className={`h-6 w-6 ${
                    action.color === 'blue' ? 'text-blue-500' :
                    action.color === 'red' ? 'text-red-500' :
                    action.color === 'green' ? 'text-green-500' :
                    'text-purple-500'
                  }`} />
                  <div className="ml-3 text-left">
                    <p className="text-sm font-medium text-gray-900">{action.title}</p>
                    {action.count > 0 && (
                      <p className="text-xs text-gray-500">{action.count}件の未処理</p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 最近のアクティビティ */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">最近のアクティビティ</h3>
          <div className="flow-root">
            <ul className="-mb-8">
              {recentActivity.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== recentActivity.length - 1 ? (
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                          activity.status === 'success' ? 'bg-green-100' :
                          activity.status === 'warning' ? 'bg-yellow-100' :
                          'bg-gray-100'
                        }`}>
                          {getActivityIcon(activity.type)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">{getActivityText(activity)}</p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
