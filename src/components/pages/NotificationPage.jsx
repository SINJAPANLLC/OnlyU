import React, { useState } from 'react';
import {
    ArrowLeft,
    ChevronRight,
    Info,
    Settings,
    Bell,
    CreditCard,
    Shield,
    AlertCircle,
    CheckCircle,
    Clock,
    Gift,
    Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../BottomNavigation';

const NotificationPage = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);

    // Different notification content for each page
    const notificationPages = [
        {
            id: 'security-update',
            title: 'Security & Privacy Update',
            notices: [
                {
                    id: 1,
                    title: "セキュリティ機能強化のお知らせ",
                    icon: Shield
                },
                {
                    id: 2,
                    title: "プライバシーポリシー更新について",
                    icon: AlertCircle
                }
            ],
            content: {
                greeting: "セキュリティ強化に関する重要なお知らせです。",
                mainContent: [
                    "アカウントのセキュリティをさらに強化するため、新機能を追加いたしました。",
                    "二段階認証の設定を強く推奨いたします。設定方法については、設定画面からご確認ください。",
                    "不正アクセスを防ぐため、定期的なパスワード変更をお願いいたします。",
                    "プライバシーポリシーを一部改定いたしました。主な変更点は以下の通りです：",
                    "・個人情報の取り扱いに関する記載を明確化",
                    "・第三者提供に関する規定を追加",
                    "・データ保存期間を明記",
                    "改定されたプライバシーポリシーは、サービス継続利用により同意したものとみなされます。",
                    "ご不明な点がございましたら、サポートまでお問い合わせください。",
                    "今後ともサービスをよろしくお願いいたします。"
                ],
                footer: "OnlyU運営チーム"
            }
        },
        {
            id: 'new-features',
            title: 'New Features & Updates',
            notices: [
                {
                    id: 1,
                    title: "新機能リリースのお知らせ",
                    icon: Star
                },
                {
                    id: 2,
                    title: "アプリバージョンアップ情報",
                    icon: Settings
                }
            ],
            content: {
                greeting: "新機能のリリースをお知らせいたします。",
                mainContent: [
                    "この度、ユーザーの皆様により良いサービスをご提供するため、以下の新機能を追加いたしました：",
                    "",
                    "【新機能】",
                    "・ダークモード対応",
                    "・通知設定の細分化",
                    "・プロフィール画像の複数枚アップロード",
                    "・投稿の下書き保存機能",
                    "・検索機能の強化",
                    "",
                    "【改善点】",
                    "・アプリの動作速度を向上",
                    "・バッテリー消費量を最適化",
                    "・UI/UXの改善",
                    "",
                    "これらの機能により、より快適にサービスをご利用いただけます。",
                    "アプリストアから最新版へのアップデートをお願いいたします。"
                ],
                footer: "OnlyU開発チーム"
            }
        },
        {
            id: 'system-maintenance',
            title: 'System Maintenance',
            notices: [
                {
                    id: 1,
                    title: "定期メンテナンスのお知らせ",
                    icon: Settings
                },
                {
                    id: 2,
                    title: "サーバー移行作業について",
                    icon: AlertCircle
                }
            ],
            content: {
                greeting: "システムメンテナンスの実施についてお知らせいたします。",
                mainContent: [
                    "サービス品質向上のため、以下の日程でメンテナンスを実施いたします。",
                    "",
                    "【メンテナンス日程】",
                    "日時: 2024年2月15日（木） 2:00 - 6:00",
                    "対象: 全サービス",
                    "",
                    "【影響範囲】",
                    "・アプリの利用が一時的にできなくなります",
                    "・メッセージの送受信ができなくなります",
                    "・投稿の閲覧・作成ができなくなります",
                    "",
                    "【注意事項】",
                    "・メンテナンス中はアプリにアクセスできません",
                    "・作業完了後、自動的にサービスが再開されます",
                    "・作業時間は前後する可能性があります",
                    "",
                    "ご不便をおかけいたしますが、ご理解のほどよろしくお願いいたします。"
                ],
                footer: "OnlyUシステム管理チーム"
            }
        }
    ];

    const currentNotification = notificationPages[currentPage];

    const nextPage = () => {
        if (currentPage < notificationPages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
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
                    <Bell className="w-6 h-6 text-gray-700 mr-2" />
                    <h1 className="text-lg font-semibold text-gray-900">お知らせ</h1>
                </div>
                <div className="text-sm text-gray-500">
                    {currentPage + 1} / {notificationPages.length}
                </div>
            </div>

            <div className="p-4">
                {/* お知らせ一覧 */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">お知らせ一覧</h2>
                    <div className="space-y-3">
                        {notificationPages.map((page, index) => (
                            <div
                                key={page.id}
                                onClick={() => setCurrentPage(index)}
                                className={`p-4 border rounded-xl cursor-pointer transition-colors ${
                                    currentPage === index 
                                        ? 'border-pink-500 bg-pink-50' 
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                            {React.createElement(page.notices[0].icon, { className: "w-5 h-5 text-gray-600" })}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{page.title}</h3>
                                            <p className="text-sm text-gray-500">
                                                {page.notices.length}件のお知らせ
                                            </p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 現在のお知らせ詳細 */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            {currentNotification.title}
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {currentNotification.notices.map((notice) => (
                                <div key={notice.id} className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-full">
                                    {React.createElement(notice.icon, { className: "w-4 h-4 text-gray-600" })}
                                    <span className="text-sm text-gray-700">{notice.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="prose prose-sm max-w-none">
                        <p className="text-gray-700 mb-4 font-medium">
                            {currentNotification.content.greeting}
                        </p>
                        
                        <div className="space-y-2">
                            {currentNotification.content.mainContent.map((line, index) => (
                                <p key={index} className={`text-gray-700 ${
                                    line.startsWith('【') || line.startsWith('・') 
                                        ? 'font-semibold text-gray-900' 
                                        : line === '' 
                                            ? 'h-4' 
                                            : ''
                                }`}>
                                    {line}
                                </p>
                            ))}
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-500 text-right">
                                {currentNotification.content.footer}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ページネーション */}
                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 0}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        前へ
                    </button>
                    
                    <div className="flex space-x-2">
                        {notificationPages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${
                                    currentPage === index ? 'bg-pink-500' : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                    
                    <button
                        onClick={nextPage}
                        disabled={currentPage === notificationPages.length - 1}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        次へ
                    </button>
                </div>
            </div>

            <BottomNavigation />
        </div>
    );
};

export default NotificationPage;