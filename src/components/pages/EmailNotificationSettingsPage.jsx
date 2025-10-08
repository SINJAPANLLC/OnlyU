import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  ToggleLeft, 
  ToggleRight,
  Bell,
  UserPlus,
  Star,
  Shield,
  Settings,
  Clock,
  Info,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../BottomNavigation';

const EmailNotificationSettingsPage = () => {
  const navigate = useNavigate();
  
  // 通知設定状態
  const [notifications, setNotifications] = useState({
    newMessages: true,
    newFollowers: true,
    newLikes: false,
    newComments: true,
    newPosts: true,
    systemUpdates: true,
    marketingEmails: false,
    weeklyDigest: true,
    securityAlerts: true
  });

  const [saveStatus, setSaveStatus] = useState('');

  const notificationItems = [
    {
      id: 'newMessages',
      title: '新しいメッセージ',
      description: '新しいメッセージを受信した時',
      icon: Bell
    },
    {
      id: 'newFollowers',
      title: '新しいフォロワー',
      description: '誰かがあなたをフォローした時',
      icon: UserPlus
    },
    {
      id: 'newLikes',
      title: 'いいね通知',
      description: 'あなたの投稿にいいねがついた時',
      icon: Star
    },
    {
      id: 'newComments',
      title: '新しいコメント',
      description: 'あなたの投稿にコメントがついた時',
      icon: Bell
    },
    {
      id: 'newPosts',
      title: '新しい投稿',
      description: 'フォロー中のユーザーの新しい投稿',
      icon: Star
    },
    {
      id: 'systemUpdates',
      title: 'システム更新',
      description: 'アプリの更新やメンテナンス情報',
      icon: Settings
    },
    {
      id: 'marketingEmails',
      title: 'マーケティングメール',
      description: 'プロモーションやおすすめ情報',
      icon: Mail
    },
    {
      id: 'weeklyDigest',
      title: '週間ダイジェスト',
      description: '週間の活動サマリー',
      icon: Clock
    },
    {
      id: 'securityAlerts',
      title: 'セキュリティアラート',
      description: 'アカウントのセキュリティに関する重要な通知',
      icon: Shield
    }
  ];

  const toggleNotification = (id) => {
    setNotifications(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    
    try {
      // シミュレーション: 実際のAPIコール
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Email notification settings saved:', notifications);
      setSaveStatus('success');
      
      setTimeout(() => {
        setSaveStatus('');
      }, 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => {
        setSaveStatus('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="text-pink-600 mr-4"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center flex-1">
          <Mail className="w-6 h-6 text-gray-700 mr-2" />
          <h1 className="text-lg font-semibold text-gray-900">メール通知設定</h1>
        </div>
      </div>

      <div className="p-4">
        {/* 設定概要 */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">通知設定の概要</h2>
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">
                {Object.values(notifications).filter(Boolean).length} / {Object.keys(notifications).length} 有効
              </span>
            </div>
          </div>
        </div>

        {/* 通知項目リスト */}
        <div className="space-y-4">
          {notificationItems.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => toggleNotification(item.id)}
                  className="focus:outline-none transition-colors"
                >
                  {notifications[item.id] ? (
                    <ToggleRight className="w-6 h-6 text-pink-600" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 保存ボタン */}
        <div className="mt-6">
          <button
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="w-full bg-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            {saveStatus === 'saving' ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>保存中...</span>
              </>
            ) : saveStatus === 'success' ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>保存完了</span>
              </>
            ) : saveStatus === 'error' ? (
              <>
                <AlertTriangle className="w-5 h-5" />
                <span>保存に失敗しました</span>
              </>
            ) : (
              <>
                <span>設定を保存</span>
              </>
            )}
          </button>

          {/* ヘルプ情報 */}
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">メール通知について</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 通知設定は即座に反映されます</li>
                  <li>• 重要なセキュリティ通知は常に送信されます</li>
                  <li>• 通知の配信には数分かかる場合があります</li>
                  <li>• 設定はすべてのデバイスで同期されます</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default EmailNotificationSettingsPage;