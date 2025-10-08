import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Send, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Filter,
  Search,
  Calendar,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Smartphone,
  Globe,
  Target
} from 'lucide-react';

const PushNotificationManagement = () => {
  const [notifications, setNotifications] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetail, setShowDetail] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlatform, setFilterPlatform] = useState('all');

  // 通知作成フォーム
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    body: '',
    type: 'general',
    platform: 'all',
    targetAudience: 'all',
    scheduledAt: '',
    imageUrl: '',
    actionUrl: '',
    priority: 'normal'
  });

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    // モックデータ
    const mockNotifications = [
      {
        id: '1',
        title: '新機能リリース！',
        body: 'OnlyUに新しい機能が追加されました。今すぐチェックしてみてください！',
        type: 'feature',
        platform: 'all',
        targetAudience: 'all',
        status: 'sent',
        priority: 'high',
        sentAt: new Date('2024-01-25T10:00:00'),
        recipients: 5000,
        delivered: 4850,
        opened: 3200,
        clicked: 800,
        imageUrl: 'https://example.com/feature-image.jpg',
        actionUrl: '/features'
      },
      {
        id: '2',
        title: 'クリエイター向けお知らせ',
        body: '収益化機能のアップデートがあります。詳細はこちらから確認してください。',
        type: 'creator',
        platform: 'mobile',
        targetAudience: 'creators',
        status: 'scheduled',
        priority: 'normal',
        scheduledAt: new Date('2024-02-01T14:00:00'),
        recipients: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        imageUrl: '',
        actionUrl: '/creator-dashboard'
      },
      {
        id: '3',
        title: 'メンテナンス通知',
        body: 'システムメンテナンスのため、一時的にサービスが停止します。',
        type: 'maintenance',
        platform: 'all',
        targetAudience: 'all',
        status: 'draft',
        priority: 'high',
        scheduledAt: null,
        recipients: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        imageUrl: '',
        actionUrl: '/maintenance'
      },
      {
        id: '4',
        title: '限定コンテンツ公開！',
        body: '人気クリエイターの限定コンテンツが公開されました。',
        type: 'content',
        platform: 'mobile',
        targetAudience: 'subscribers',
        status: 'sent',
        priority: 'normal',
        sentAt: new Date('2024-01-20T16:30:00'),
        recipients: 2500,
        delivered: 2400,
        opened: 1800,
        clicked: 450,
        imageUrl: 'https://example.com/content-preview.jpg',
        actionUrl: '/content/limited'
      }
    ];
    setNotifications(mockNotifications);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'feature': return 'bg-blue-100 text-blue-800';
      case 'creator': return 'bg-purple-100 text-purple-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'content': return 'bg-green-100 text-green-800';
      case 'marketing': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'normal': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'web': return <Globe className="w-4 h-4" />;
      case 'all': return <Target className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const createNotification = () => {
    const newNotification = {
      id: Date.now().toString(),
      ...notificationForm,
      status: 'draft',
      createdAt: new Date(),
      recipients: 0,
      delivered: 0,
      opened: 0,
      clicked: 0
    };
    setNotifications(prev => [newNotification, ...prev]);
    setNotificationForm({
      title: '',
      body: '',
      type: 'general',
      platform: 'all',
      targetAudience: 'all',
      scheduledAt: '',
      imageUrl: '',
      actionUrl: '',
      priority: 'normal'
    });
    setShowCreateModal(false);
  };

  const sendNotification = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? {
              ...notification,
              status: 'sent',
              sentAt: new Date(),
              recipients: Math.floor(Math.random() * 5000) + 1000,
              delivered: Math.floor(Math.random() * 4500) + 900,
              opened: Math.floor(Math.random() * 3000) + 500,
              clicked: Math.floor(Math.random() * 800) + 100
            }
          : notification
      )
    );
    alert('プッシュ通知が送信されました！');
  };

  const scheduleNotification = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? {
              ...notification,
              status: 'scheduled',
              scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24時間後
            }
          : notification
      )
    );
    alert('プッシュ通知がスケジュールされました！');
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.body.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesStatus = filterStatus === 'all' || notification.status === filterStatus;
    const matchesPlatform = filterPlatform === 'all' || notification.platform === filterPlatform;
    return matchesSearch && matchesType && matchesStatus && matchesPlatform;
  });

  const calculateOpenRate = (opened, delivered) => {
    if (delivered === 0) return 0;
    return ((opened / delivered) * 100).toFixed(1);
  };

  const calculateClickRate = (clicked, opened) => {
    if (opened === 0) return 0;
    return ((clicked / opened) * 100).toFixed(1);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">プッシュ通知管理</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>通知作成</span>
        </button>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Bell className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">総通知数</p>
              <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Send className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">送信済み</p>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.filter(n => n.status === 'sent').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">予定済み</p>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.filter(n => n.status === 'scheduled').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">総送信数</p>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.reduce((sum, n) => sum + n.recipients, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* フィルターと検索 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">すべてのタイプ</option>
              <option value="feature">機能</option>
              <option value="creator">クリエイター</option>
              <option value="maintenance">メンテナンス</option>
              <option value="content">コンテンツ</option>
              <option value="marketing">マーケティング</option>
            </select>
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">すべてのステータス</option>
              <option value="sent">送信済み</option>
              <option value="scheduled">予定済み</option>
              <option value="draft">下書き</option>
              <option value="failed">失敗</option>
            </select>
          </div>
          <div>
            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">すべてのプラットフォーム</option>
              <option value="mobile">モバイル</option>
              <option value="web">ウェブ</option>
              <option value="all">すべて</option>
            </select>
          </div>
          <div>
            <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center justify-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>フィルター</span>
            </button>
          </div>
        </div>
      </div>

      {/* 通知一覧 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200" style={{minWidth: '1000px'}}>
            <thead className="bg-gray-50">
              <tr>
                <th className="w-40 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  通知
                </th>
                <th className="w-16 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  タイプ
                </th>
                <th className="w-20 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  プラットフォーム
                </th>
                <th className="w-20 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  対象
                </th>
                <th className="w-16 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ステータス
                </th>
                <th className="w-14 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  優先度
                </th>
                <th className="w-16 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  送信数
                </th>
                <th className="w-16 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  開封率
                </th>
                <th className="w-16 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  クリック率
                </th>
                <th className="w-24 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  日時
                </th>
                <th className="w-20 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  アクション
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <tr key={notification.id} className="hover:bg-gray-50">
                  <td className="px-3 py-4 max-w-40">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        {notification.imageUrl ? (
                          <img
                            className="h-8 w-8 rounded-lg object-cover"
                            src={notification.imageUrl}
                            alt=""
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-lg bg-gray-200 flex items-center justify-center">
                            <Bell className="w-4 h-4 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-2 min-w-0 flex-1">
                        <div className="text-xs font-medium text-gray-900 truncate" title={notification.title}>
                          {notification.title}
                        </div>
                        <div className="text-xs text-gray-500 truncate" title={notification.body}>
                          {notification.body}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(notification.type)}`}>
                      {notification.type}
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      {getPlatformIcon(notification.platform)}
                      <span className="text-xs text-gray-900">{notification.platform}</span>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-900 max-w-20">
                    <div className="truncate" title={notification.targetAudience}>
                      {notification.targetAudience}
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span className={`px-1 py-1 text-xs font-medium rounded-full ${getStatusColor(notification.status)}`}>
                      {notification.status}
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span className={`px-1 py-1 text-xs font-medium rounded-full ${getPriorityColor(notification.priority)}`}>
                      {notification.priority}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-900 max-w-16">
                    <div className="truncate">
                      {notification.recipients.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-900 max-w-16">
                    <div className="truncate">
                      {notification.status === 'sent' ? 
                        `${calculateOpenRate(notification.opened, notification.delivered)}%` : 
                        '-'
                      }
                    </div>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-900 max-w-16">
                    <div className="truncate">
                      {notification.status === 'sent' ? 
                        `${calculateClickRate(notification.clicked, notification.opened)}%` : 
                        '-'
                      }
                    </div>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 max-w-24">
                    <div className="truncate" title={notification.sentAt ? 
                      notification.sentAt.toLocaleString() : 
                      notification.scheduledAt ? 
                        notification.scheduledAt.toLocaleString() : 
                        '-'
                    }>
                      {notification.sentAt ? 
                        notification.sentAt.toLocaleDateString() : 
                        notification.scheduledAt ? 
                          notification.scheduledAt.toLocaleDateString() : 
                          '-'
                      }
                    </div>
                  </td>
                  <td className="px-3 py-4 text-sm font-medium max-w-20">
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setShowDetail(notification)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {notification.status === 'draft' && (
                        <>
                          <button
                            onClick={() => sendNotification(notification.id)}
                            className="text-green-600 hover:text-green-800"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => scheduleNotification(notification.id)}
                            className="text-yellow-600 hover:text-yellow-800"
                          >
                            <Calendar className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 通知作成モーダル */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">プッシュ通知作成</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">タイトル</label>
                <input
                  type="text"
                  value={notificationForm.title}
                  onChange={(e) => setNotificationForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="通知のタイトルを入力"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">本文</label>
                <textarea
                  value={notificationForm.body}
                  onChange={(e) => setNotificationForm(prev => ({ ...prev, body: e.target.value }))}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="通知の本文を入力"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">タイプ</label>
                  <select
                    value={notificationForm.type}
                    onChange={(e) => setNotificationForm(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="general">一般</option>
                    <option value="feature">機能</option>
                    <option value="creator">クリエイター</option>
                    <option value="maintenance">メンテナンス</option>
                    <option value="content">コンテンツ</option>
                    <option value="marketing">マーケティング</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">プラットフォーム</label>
                  <select
                    value={notificationForm.platform}
                    onChange={(e) => setNotificationForm(prev => ({ ...prev, platform: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="all">すべて</option>
                    <option value="mobile">モバイル</option>
                    <option value="web">ウェブ</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">対象</label>
                  <select
                    value={notificationForm.targetAudience}
                    onChange={(e) => setNotificationForm(prev => ({ ...prev, targetAudience: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="all">すべてのユーザー</option>
                    <option value="creators">クリエイター</option>
                    <option value="subscribers">購読者</option>
                    <option value="premium">プレミアムユーザー</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">優先度</label>
                  <select
                    value={notificationForm.priority}
                    onChange={(e) => setNotificationForm(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="low">低</option>
                    <option value="normal">通常</option>
                    <option value="high">高</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">画像URL（任意）</label>
                <input
                  type="url"
                  value={notificationForm.imageUrl}
                  onChange={(e) => setNotificationForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">アクションURL（任意）</label>
                <input
                  type="url"
                  value={notificationForm.actionUrl}
                  onChange={(e) => setNotificationForm(prev => ({ ...prev, actionUrl: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="/path/to/page"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">スケジュール（任意）</label>
                <input
                  type="datetime-local"
                  value={notificationForm.scheduledAt}
                  onChange={(e) => setNotificationForm(prev => ({ ...prev, scheduledAt: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  キャンセル
                </button>
                <button
                  onClick={createNotification}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                >
                  作成
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 通知詳細モーダル */}
      {showDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">通知詳細</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">タイトル</label>
                <p className="text-sm text-gray-600">{showDetail.title}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">本文</label>
                <p className="text-sm text-gray-600">{showDetail.body}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">タイプ</label>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(showDetail.type)}`}>
                    {showDetail.type}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">プラットフォーム</label>
                  <div className="flex items-center space-x-1">
                    {getPlatformIcon(showDetail.platform)}
                    <span className="text-sm text-gray-600">{showDetail.platform}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">対象</label>
                  <p className="text-sm text-gray-600">{showDetail.targetAudience}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">優先度</label>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(showDetail.priority)}`}>
                    {showDetail.priority}
                  </span>
                </div>
              </div>
              {showDetail.imageUrl && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">画像</label>
                  <img
                    src={showDetail.imageUrl}
                    alt="通知画像"
                    className="w-32 h-20 object-cover rounded-lg"
                  />
                </div>
              )}
              {showDetail.actionUrl && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">アクションURL</label>
                  <p className="text-sm text-gray-600">{showDetail.actionUrl}</p>
                </div>
              )}
              {showDetail.status === 'sent' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">送信数</label>
                    <p className="text-sm text-gray-600">{showDetail.recipients.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">配信数</label>
                    <p className="text-sm text-gray-600">{showDetail.delivered.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">開封数</label>
                    <p className="text-sm text-gray-600">{showDetail.opened.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">クリック数</label>
                    <p className="text-sm text-gray-600">{showDetail.clicked.toLocaleString()}</p>
                  </div>
                </div>
              )}
              <div className="flex justify-end">
                <button
                  onClick={() => setShowDetail(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PushNotificationManagement;
