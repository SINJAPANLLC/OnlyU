import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, CreditCard, Info, AlertCircle, CheckCircle, Gift, Star, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
// import BottomNavigation from '../BottomNavigation';
import BottomNavigation from '../components/BottomNavigation';

const NotificationPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('administration');
    const { t } = useTranslation();

    const tabs = [
        { key: 'administration', label: t('notificationPage.tabs.administration') },
        { key: 'notices', label: t('notificationPage.tabs.notices') },
        { key: 'purchases', label: t('notificationPage.tabs.purchases') },
    ];

    // 通知データの状態管理（初期値は空配列）
    const [notifications, setNotifications] = useState([]);

    // アイコンマッピング
    const iconMap = {
        AlertCircle,
        CreditCard,
        Info,
        Gift,
        CheckCircle,
        Star,
        Bell
    };

    // ローカルストレージから通知を読み込む
    useEffect(() => {
        const savedNotifications = localStorage.getItem('notifications');
        if (savedNotifications) {
            setNotifications(JSON.parse(savedNotifications));
        } else {
            // 初回アクセス時はサンプルデータを設定
            const sampleNotifications = [
                {
                    id: 1,
                    title: '【重要】購入手数料改定のお知らせ',
                    content: '2024年7月2日より、購入手数料が変更となります。詳細はこちらをご確認ください。',
                    date: '07/02',
                    time: '20:30',
                    unread: true,
                    type: 'administration',
                    iconType: 'AlertCircle',
                    priority: 'high'
                },
                {
                    id: 2,
                    title: 'クレジットカード決済使用時に遷移する決済システム画面について',
                    content: '決済画面の仕様変更に関するお知らせです。',
                    date: '05/30',
                    time: '14:30',
                    unread: false,
                    type: 'notices',
                    iconType: 'CreditCard',
                    priority: 'medium'
                },
                {
                    id: 3,
                    title: '利用通知の価格表記について',
                    content: '価格表示の仕様変更についてお知らせします。',
                    date: '05/30',
                    time: '14:30',
                    unread: true,
                    type: 'notices',
                    iconType: 'Info',
                    priority: 'medium'
                },
                {
                    id: 4,
                    title: 'プランのお支払い方法に「atone」がご利用いただけるようになりました',
                    content: '新しい決済方法「atone」が追加されました。',
                    date: '05/27',
                    time: '09:30',
                    unread: true,
                    type: 'purchases',
                    iconType: 'Gift',
                    priority: 'low'
                },
                {
                    id: 5,
                    title: '利用規約改定のお知らせ',
                    content: '利用規約が更新されました。最新版をご確認ください。',
                    date: '05/28',
                    time: '14:30',
                    unread: false,
                    type: 'notices',
                    iconType: 'CheckCircle',
                    priority: 'medium'
                },
                {
                    id: 6,
                    title: '【4/22更新】VISA・Mastercardのご利用再開のお知らせ',
                    content: 'クレジットカード決済が再開されました。',
                    date: '04/17',
                    time: '13:30',
                    unread: true,
                    type: 'purchases',
                    iconType: 'CreditCard',
                    priority: 'high'
                },
                {
                    id: 7,
                    title: '【4/22更新】Bitcashの導入とクレジットカードの一時停止のご案内',
                    content: 'Bitcash決済が導入されました。',
                    date: '04/16',
                    time: '08:45',
                    unread: true,
                    type: 'purchases',
                    iconType: 'CreditCard',
                    priority: 'medium'
                },
                {
                    id: 8,
                    title: '2025年3月に発生したサイト内での不正行為及び規約違反への対応について',
                    content: '不正行為への対応状況について報告いたします。',
                    date: '04/02',
                    time: '14:30',
                    unread: true,
                    type: 'administration',
                    iconType: 'AlertCircle',
                    priority: 'high'
                },
                {
                    id: 9,
                    title: '2025年2月に発生したサイト内での不正行為及び規約違反への対応について',
                    content: '前回の報告に続き、追加の対応状況をお知らせします。',
                    date: '03/04',
                    time: '11:30',
                    unread: true,
                    type: 'administration',
                    iconType: 'AlertCircle',
                    priority: 'medium'
                },
                {
                    id: 10,
                    title: '【重要】プラン更新再開のお知らせ ※3月18日追記',
                    content: 'プラン更新機能が再開されました。',
                    date: '03/18',
                    time: '11:30',
                    unread: false,
                    type: 'purchases',
                    iconType: 'Star',
                    priority: 'high'
                }
            ];
            setNotifications(sampleNotifications);
            localStorage.setItem('notifications', JSON.stringify(sampleNotifications));
        }
    }, []);

    // 通知をローカルストレージに保存
    const saveNotifications = (updatedNotifications) => {
        setNotifications(updatedNotifications);
        localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    };

    const handleNavigation = (path) => {
        if (path === 'home') navigate('/');
        else if (path === 'feed') navigate('/feed');
        else if (path === 'messages') navigate('/messages');
        else if (path === 'ranking') navigate('/rankingpage');
        else if (path === 'account') navigate('/account');
        else navigate('/');
    };

    // 通知をクリックした時の処理（既読にする）
    const handleNotificationClick = (notification) => {
        if (notification.unread) {
            const updatedNotifications = notifications.map(notif => 
                notif.id === notification.id 
                    ? { ...notif, unread: false }
                    : notif
            );
            saveNotifications(updatedNotifications);
        }
        
        // 通知の詳細を表示（モーダルや詳細ページに遷移）
        console.log('Notification clicked:', notification);
        // ここで詳細ページやモーダルを表示する処理を追加できます
    };

    // 通知を削除する処理
    const handleDeleteNotification = (notificationId, e) => {
        e.stopPropagation(); // 親要素のクリックイベントを防ぐ
        const updatedNotifications = notifications.filter(notif => notif.id !== notificationId);
        saveNotifications(updatedNotifications);
    };

    // すべての通知を既読にする
    const markAllAsRead = () => {
        const updatedNotifications = notifications.map(notif => ({ ...notif, unread: false }));
        saveNotifications(updatedNotifications);
    };

    // すべての通知を削除する
    const deleteAllNotifications = () => {
        if (window.confirm('すべての通知を削除しますか？')) {
            saveNotifications([]);
        }
    };

    // タブ別に通知をフィルタリング
    const getFilteredNotifications = () => {
        if (activeTab === 'administration') {
            return notifications.filter(notif => notif.type === 'administration');
        } else if (activeTab === 'notices') {
            return notifications.filter(notif => notif.type === 'notices');
        } else if (activeTab === 'purchases') {
            return notifications.filter(notif => notif.type === 'purchases');
        }
        return notifications;
    };

    // 未読通知の数を取得
    const getUnreadCount = (type = null) => {
        if (type) {
            return notifications.filter(notif => notif.type === type && notif.unread).length;
        }
        return notifications.filter(notif => notif.unread).length;
    };

    return (
        <>
            <div className="min-h-screen bg-white pb-20">
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-white sticky top-0 z-10 border-b border-gray-200">
                    <button onClick={() => navigate(-1)} className="p-2">
                        <ArrowLeft size={20} className="text-gray-700" />
                    </button>
                    <div className="flex items-center gap-2">
                        <h1 className="text-base font-semibold">{t('notificationPage.title')}</h1>
                        {getUnreadCount() > 0 && (
                            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                                {getUnreadCount()}
                            </span>
                        )}
                    </div>
                    <button 
                        onClick={deleteAllNotifications}
                        className="p-2"
                        title="すべて削除"
                    >
                        <Trash2 size={20} className="text-gray-700" />
                    </button>
                </div>

                {/* Tab Pills */}
                <div className="px-4 py-4">
                    <div className="flex bg-gray-100 rounded-full p-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex-1 py-2 px-3 rounded-full text-xs font-medium transition-all duration-200 relative ${activeTab === tab.key
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab.label}
                                {getUnreadCount(tab.key) > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                        {getUnreadCount(tab.key)}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* アクションボタン */}
                <div className="px-4 pb-2">
                    <div className="flex justify-between items-center">
                        <button
                            onClick={markAllAsRead}
                            disabled={getUnreadCount() === 0}
                            className="text-sm text-blue-600 disabled:text-gray-400 disabled:cursor-not-allowed"
                        >
                            すべて既読にする
                        </button>
                        <span className="text-sm text-gray-500">
                            {getFilteredNotifications().length}件の通知
                        </span>
                    </div>
                </div>

                {/* Notifications List */}
                <div className="px-4">
                    {getFilteredNotifications().length === 0 ? (
                        <div className="text-center py-12">
                            <Bell size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-500 text-sm">
                                {activeTab === 'administration' && '事務局からの通知はありません'}
                                {activeTab === 'notices' && 'お知らせはありません'}
                                {activeTab === 'purchases' && '購入・売上に関する通知はありません'}
                            </p>
                        </div>
                    ) : (
                        getFilteredNotifications().map((notification) => {
                            const IconComponent = iconMap[notification.iconType] || Bell;
                            return (
                                <div
                                    key={notification.id}
                                    onClick={() => handleNotificationClick(notification)}
                                    className={`flex items-start py-4 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${
                                        notification.unread ? 'bg-blue-50' : ''
                                    }`}
                                >
                                    {/* Icon with priority indicator */}
                                    <div className="relative flex-shrink-0 mr-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                            notification.priority === 'high' ? 'bg-red-100' :
                                            notification.priority === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                                        }`}>
                                            <IconComponent size={20} className={
                                                notification.priority === 'high' ? 'text-red-600' :
                                                notification.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                                            } />
                                        </div>
                                        {notification.unread && (
                                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <p className={`text-sm leading-relaxed pr-2 font-medium ${
                                                    notification.unread ? 'text-gray-900' : 'text-gray-700'
                                                }`}>
                                                    {notification.title}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                                    {notification.content}
                                                </p>
                                            </div>
                                            <button
                                                onClick={(e) => handleDeleteNotification(notification.id, e)}
                                                className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                                                title="削除"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Date & Time */}
                                    <div className="flex flex-col items-end ml-2 flex-shrink-0">
                                        <span className="text-xs text-gray-500 mb-1">
                                            {notification.date}
                                        </span>
                                        <span className="text-xs text-gray-500 mb-2">
                                            {notification.time}
                                        </span>
                                        {notification.unread && (
                                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            <BottomNavigation activeTab="Messages" handleNavigation={handleNavigation} />
        </>
    );
};

export default NotificationPage;
