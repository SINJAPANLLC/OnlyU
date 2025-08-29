import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Heart, MessageCircle, UserPlus, DollarSign, Settings, Star, Gift } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'tip' | 'subscription' | 'system' | 'earnings';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  avatar?: string;
  amount?: number;
  postId?: string;
}

const CreatorNotifications = () => {
  const { t } = useLanguage();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'interactions' | 'earnings'>('all');

  useEffect(() => {
    // Mock notifications data
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'follow',
        title: t('creator.notifications.newFollower'),
        message: `yuki_fan ${t('creator.activity.newFollower')}`,
        timestamp: '2024-01-15T14:30:00Z',
        isRead: false,
        avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
      },
      {
        id: '2',
        type: 'like',
        title: t('creator.notifications.newLike'),
        message: `ai_creator ${t('creator.activity.newLikes')}`,
        timestamp: '2024-01-15T13:45:00Z',
        isRead: false,
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
        postId: 'post1'
      },
      {
        id: '3',
        type: 'comment',
        title: t('creator.notifications.newComment'),
        message: `miku_fan ${t('creator.activity.newComment')}`,
        timestamp: '2024-01-15T12:20:00Z',
        isRead: true,
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
        postId: 'post1'
      },
      {
        id: '4',
        type: 'tip',
        title: t('creator.notifications.newTip'),
        message: t('creator.activity.newEarnings'),
        timestamp: '2024-01-15T11:15:00Z',
        isRead: false,
        avatar: 'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
        amount: 500
      },
      {
        id: '5',
        type: 'subscription',
        title: t('creator.notifications.newSubscription'),
        message: t('creator.notifications.subscriptionMessage'),
        timestamp: '2024-01-15T10:30:00Z',
        isRead: false,
        avatar: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
        amount: 1500
      },
      {
        id: '6',
        type: 'earnings',
        title: t('creator.notifications.earningsUpdate'),
        message: t('creator.notifications.earningsMessage'),
        timestamp: '2024-01-15T09:00:00Z',
        isRead: true
      },
      {
        id: '7',
        type: 'system',
        title: t('creator.notifications.systemUpdate'),
        message: t('creator.notifications.systemMessage'),
        timestamp: '2024-01-15T08:00:00Z',
        isRead: true
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'follow':
        return <UserPlus className="w-5 h-5 text-green-500" />;
      case 'tip':
        return <Gift className="w-5 h-5 text-purple-500" />;
      case 'subscription':
        return <Star className="w-5 h-5 text-yellow-500" />;
      case 'earnings':
        return <DollarSign className="w-5 h-5 text-green-600" />;
      case 'system':
        return <Settings className="w-5 h-5 text-gray-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return 'bg-red-50 border-red-200';
      case 'comment':
        return 'bg-blue-50 border-blue-200';
      case 'follow':
        return 'bg-green-50 border-green-200';
      case 'tip':
        return 'bg-purple-50 border-purple-200';
      case 'subscription':
        return 'bg-yellow-50 border-yellow-200';
      case 'earnings':
        return 'bg-green-50 border-green-200';
      case 'system':
        return 'bg-gray-50 border-gray-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'interactions') return ['like', 'comment', 'follow'].includes(notification.type);
    if (filter === 'earnings') return ['tip', 'subscription', 'earnings'].includes(notification.type);
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('creator.notifications.title')}</h1>
            <p className="text-gray-600">{t('creator.notifications.subtitle')}</p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              {t('creator.notifications.markAllRead')}
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
                          >
                {t('creator.notifications.all')} ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'unread' 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('creator.notifications.unread')} ({unreadCount})
              </button>
              <button
                onClick={() => setFilter('interactions')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'interactions' 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('creator.notifications.interactions')}
              </button>
              <button
                onClick={() => setFilter('earnings')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'earnings' 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('creator.notifications.earnings')}
              </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl border p-4 hover:shadow-md transition-all cursor-pointer ${
                !notification.isRead ? 'ring-2 ring-pink-200' : ''
              } ${getNotificationColor(notification.type)}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {notification.avatar ? (
                    <img
                      src={notification.avatar}
                      alt="User avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      {getNotificationIcon(notification.type)}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {notification.amount && (
                        <span className="text-sm font-medium text-green-600">
                          ¥{notification.amount.toLocaleString()}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        {new Date(notification.timestamp).toLocaleDateString('ja-JP')}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.message}
                  </p>
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('creator.notifications.noNotifications')}</h3>
            <p className="text-gray-500">{t('creator.notifications.allCaughtUp')}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CreatorNotifications;
