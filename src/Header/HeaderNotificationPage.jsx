import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sliders } from 'lucide-react';
import { useTranslation } from 'react-i18next';
// import BottomNavigation from '../BottomNavigation';
import BottomNavigation from '../components/BottomNavigation';

const NotificationPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Administration office');
    const { t } = useTranslation();

    // const tabs = [
    //     'Administration office',
    //     'Notices',
    //     'Purchases and Sales'
    // ];
    const tabs = [
        { key: 'administration', label: t('notificationPage.tabs.administration') },
        { key: 'notices', label: t('notificationPage.tabs.notices') },
        { key: 'purchases', label: t('notificationPage.tabs.purchases') },
    ];


    const notificationsData = [
        {
            id: 1,
            title: '【重要】購入手数料改定のお知らせ',
            date: '07/02',
            time: '20:30',
            unread: true
        },
        {
            id: 2,
            title: 'クレジットカード決済使用時に遷移する決済システム画面について',
            date: '05/30',
            time: '14:30',
            unread: false
        },
        {
            id: 3,
            title: '利用通知の価格表記について',
            date: '05/30',
            time: '14:30',
            unread: true
        },
        {
            id: 4,
            title: 'プランのお支払い方法に「atone」がご利用いただけるようになりました',
            date: '05/27',
            time: '09:30',
            unread: true
        },
        {
            id: 5,
            title: '利用規約改定のお知らせ',
            date: '05/28',
            time: '14:30',
            unread: false
        },
        {
            id: 6,
            title: '【4/22更新】VISA・Mastercardのご利用再開のお知らせ',
            date: '04/17',
            time: '13:30',
            unread: true
        },
        {
            id: 7,
            title: '【4/22更新】Bitcashの導入とクレジットカードの一時停止のご案内',
            date: '04/16',
            time: '08:45',
            unread: true
        },
        {
            id: 8,
            title: '2025年3月に発生したサイト内での不正行為及び規約違反への対応について',
            date: '04/02',
            time: '14:30',
            unread: true
        },
        {
            id: 9,
            title: '2025年2月に発生したサイト内での不正行為及び規約違反への対応について',
            date: '03/04',
            time: '11:30',
            unread: true
        },
        {
            id: 10,
            title: '【重要】プラン更新再開のお知らせ ※3月18日追記',
            date: '03/18',
            time: '11:30',
            unread: false
        }
    ];

    const handleNavigation = (path) => {
        if (path === 'home') navigate('/');
        else if (path === 'feed') navigate('/feed');
        else if (path === 'messages') navigate('/messages');
        else if (path === 'ranking') navigate('/rankingpage');
        else if (path === 'account') navigate('/account');
        else navigate('/');
    };

    const handleNotificationClick = (notification) => {
        // Handle notification click - mark as read or navigate to details
        console.log('Notification clicked:', notification);
    };

    const getFilteredNotifications = () => {
        // Filter notifications based on active tab
        // For now, showing all notifications regardless of tab
        return notificationsData;
    };

    return (
        <>
            <div className="min-h-screen bg-white pb-20">
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-white sticky top-0 z-10 border-b border-gray-200">
                    <button onClick={() => navigate(-1)} className="p-2">
                        <ArrowLeft size={20} className="text-gray-700" />
                    </button>
                    <h1 className="text-base font-semibold">{t('notificationPage.title')}</h1>
                    <button className="p-2">
                        <Sliders size={20} className="text-gray-700" />
                    </button>
                </div>

                {/* Tab Pills */}
                <div className="px-4 py-4">
                    <div className="flex bg-gray-100 rounded-full p-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex-1 py-2 px-3 rounded-full text-xs font-medium transition-all duration-200 ${activeTab === tab.key
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Notifications List */}
                <div className="px-4">
                    {getFilteredNotifications().map((notification) => (
                        <div
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification)}
                            className="flex items-start py-4 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                        >
                            {/* Avatar with Pink Dot */}
                            <div className="relative flex-shrink-0 mr-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                    <div className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">!</span>
                                    </div>
                                </div>
                                {notification.unread && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-900 leading-relaxed pr-2">
                                    {notification.title}
                                </p>
                            </div>

                            {/* Date & Time with Red Dot */}
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
                    ))}
                </div>
            </div>

            <BottomNavigation activeTab="Messages" handleNavigation={handleNavigation} />
        </>
    );
};

export default NotificationPage;
