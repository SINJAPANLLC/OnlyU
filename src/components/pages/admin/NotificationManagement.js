import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Mail, 
  Send, 
  Filter, 
  Search, 
  Eye, 
  EyeOff, 
  Trash2, 
  Edit3, 
  Plus,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  MessageSquare
} from 'lucide-react';

const NotificationManagement = () => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [notificationType, setNotificationType] = useState('allUsers');
  const [messageTitle, setMessageTitle] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [targetUserId, setTargetUserId] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    sent: 0,
    pending: 0,
    failed: 0
  });

  // 通知タイプ
  const notificationTypes = [
    { value: 'all', label: 'すべて', icon: Bell },
    { value: 'system', label: 'システム', icon: AlertTriangle },
    { value: 'payment', label: '支払い', icon: CheckCircle },
    { value: 'creator', label: 'クリエイター', icon: Users },
    { value: 'follow', label: 'フォロー', icon: Users },
    { value: 'message', label: 'メッセージ', icon: MessageSquare },
    { value: 'marketing', label: 'マーケティング', icon: Send }
  ];

  // 通知ステータス
  const notificationStatuses = [
    { value: 'all', label: 'すべて' },
    { value: 'sent', label: '送信済み' },
    { value: 'pending', label: '送信待ち' },
    { value: 'failed', label: '送信失敗' }
  ];

  // 通知データを読み込み
  useEffect(() => {
    loadNotifications();
  }, []);

  // フィルタリング
  useEffect(() => {
    let filtered = [...notifications];

    // 検索フィルタ
    if (searchTerm) {
      filtered = filtered.filter(notification =>
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // タイプフィルタ
    if (filterType !== 'all') {
      filtered = filtered.filter(notification => notification.type === filterType);
    }

    // ステータスフィルタ
    if (filterStatus !== 'all') {
      filtered = filtered.filter(notification => notification.status === filterStatus);
    }

    setFilteredNotifications(filtered);
  }, [notifications, searchTerm, filterType, filterStatus]);

  // 統計を更新
  useEffect(() => {
    const newStats = {
      total: notifications.length,
      sent: notifications.filter(n => n.status === 'sent').length,
      pending: notifications.filter(n => n.status === 'pending').length,
      failed: notifications.filter(n => n.status === 'failed').length
    };
    setStats(newStats);
  }, [notifications]);

  // 通知データを読み込み（モックデータ）
  const loadNotifications = () => {
    const mockNotifications = [
      {
        id: '1',
        type: 'system',
        title: 'システムメンテナンスのお知らせ',
        message: '2025年1月15日 2:00-4:00にシステムメンテナンスを実施します',
        status: 'sent',
        priority: 'high',
        createdAt: new Date('2025-01-10T10:00:00'),
        sentAt: new Date('2025-01-10T10:05:00'),
        recipients: 1250,
        readCount: 890
      },
      {
        id: '2',
        type: 'payment',
        title: '支払い完了通知',
        message: '¥12,500の支払いが完了しました',
        status: 'sent',
        priority: 'high',
        createdAt: new Date('2025-01-10T09:30:00'),
        sentAt: new Date('2025-01-10T09:32:00'),
        recipients: 1,
        readCount: 1
      },
      {
        id: '3',
        type: 'marketing',
        title: '新機能リリースのお知らせ',
        message: '新しい投稿機能がリリースされました！',
        status: 'pending',
        priority: 'medium',
        createdAt: new Date('2025-01-10T08:00:00'),
        sentAt: null,
        recipients: 5000,
        readCount: 0
      },
      {
        id: '4',
        type: 'creator',
        title: 'クリエイター申請の承認',
        message: 'クリエイター申請が承認されました',
        status: 'sent',
        priority: 'high',
        createdAt: new Date('2025-01-09T15:20:00'),
        sentAt: new Date('2025-01-09T15:25:00'),
        recipients: 1,
        readCount: 1
      },
      {
        id: '5',
        type: 'follow',
        title: '新しいフォロワー',
        message: '新しいフォロワーが増えました',
        status: 'failed',
        priority: 'low',
        createdAt: new Date('2025-01-09T14:00:00'),
        sentAt: null,
        recipients: 1,
        readCount: 0
      }
    ];
    setNotifications(mockNotifications);
  };

  // 通知を送信
  const sendNotification = async (notificationData) => {
    const newNotification = {
      id: Date.now().toString(),
      ...notificationData,
      status: 'pending',
      createdAt: new Date(),
      sentAt: null,
      recipients: notificationData.recipients || 0,
      readCount: 0
    };

    setNotifications(prev => [newNotification, ...prev]);
    
    // 実際の送信処理（APIコール）
    try {
      // モック送信処理
      console.log('通知送信中:', notificationData);
      
      // 送信成功をシミュレート
      setTimeout(() => {
        setNotifications(prev =>
          prev.map(n =>
            n.id === newNotification.id
              ? { 
                  ...n, 
                  status: 'sent', 
                  sentAt: new Date(),
                  recipients: notificationData.type === 'allUsers' ? 1000 : 1,
                  readCount: 0
                }
              : n
          )
        );
        
        // 成功通知を表示
        alert('通知が正常に送信されました！');
      }, 2000);
    } catch (error) {
      setNotifications(prev =>
        prev.map(n =>
          n.id === newNotification.id
            ? { ...n, status: 'failed' }
            : n
        )
      );
      alert('通知の送信に失敗しました。');
    }
  };

  // 通知送信フォームの送信処理
  const handleSendNotification = async (e) => {
    e.preventDefault();
    
    if (!notificationType) {
      alert('通知タイプを選択してください。');
      return;
    }
    if (!messageTitle) {
      alert('タイトルを入力してください。');
      return;
    }
    if (!messageBody) {
      alert('本文を入力してください。');
      return;
    }
    if ((notificationType === 'specificUser' || notificationType === 'creator') && !targetUserId) {
      alert('対象ユーザーIDを入力してください。');
      return;
    }

    const notificationData = {
      type: notificationType,
      title: messageTitle,
      message: messageBody,
      target: notificationType === 'allUsers' ? 'all' : targetUserId,
      priority: 'high',
      category: 'admin'
    };

    await sendNotification(notificationData);
    
    // フォームをリセット
    setMessageTitle('');
    setMessageBody('');
    setTargetUserId('');
    setNotificationType('allUsers');
    setShowCreateModal(false);
  };

  // 通知を削除
  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // 複数選択
  const toggleSelection = (id) => {
    setSelectedNotifications(prev =>
      prev.includes(id)
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  // 全選択
  const selectAll = () => {
    setSelectedNotifications(filteredNotifications.map(n => n.id));
  };

  // 選択解除
  const deselectAll = () => {
    setSelectedNotifications([]);
  };

  // 一括削除
  const deleteSelected = () => {
    setNotifications(prev =>
      prev.filter(n => !selectedNotifications.includes(n.id))
    );
    setSelectedNotifications([]);
  };

  // 優先度の色を取得
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // ステータスの色を取得
  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">通知管理</h1>
          <p className="text-gray-600">プッシュ通知とメール通知を管理します</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>通知作成</span>
        </button>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Bell className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">総通知数</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">送信済み</p>
              <p className="text-2xl font-bold text-gray-900">{stats.sent}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">送信待ち</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">送信失敗</p>
              <p className="text-2xl font-bold text-gray-900">{stats.failed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* フィルターと検索 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4">
          {/* 検索 */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="通知を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* タイプフィルター */}
          <div className="md:w-48">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {notificationTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* ステータスフィルター */}
          <div className="md:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {notificationStatuses.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 通知一覧 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">通知一覧</h2>
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
              {selectedNotifications.length > 0 && (
                <>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={deleteSelected}
                    className="text-sm text-red-600 hover:text-red-700 flex items-center space-x-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>削除 ({selectedNotifications.length})</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredNotifications.map(notification => (
            <div key={notification.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  checked={selectedNotifications.includes(notification.id)}
                  onChange={() => toggleSelection(notification.id)}
                  className="mt-1 h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {notification.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(notification.priority)}`}>
                        {notification.priority}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(notification.status)}`}>
                        {notification.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="mt-2 text-gray-600">{notification.message}</p>
                  
                  <div className="mt-3 flex items-center space-x-6 text-sm text-gray-500">
                    <span>受信者: {notification.recipients.toLocaleString()}</span>
                    <span>既読: {notification.readCount.toLocaleString()}</span>
                    <span>作成: {notification.createdAt.toLocaleDateString()}</span>
                    {notification.sentAt && (
                      <span>送信: {notification.sentAt.toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 通知作成モーダル（簡易版） */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">通知作成</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  タイトル
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="通知タイトルを入力"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  メッセージ
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  rows="3"
                  placeholder="通知メッセージを入力"
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
                  onClick={() => setShowCreateModal(false)}
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

export default NotificationManagement;
