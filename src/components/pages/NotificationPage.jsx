import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const NotificationSystem = ({ onBack }) => {
    const [currentPage, setCurrentPage] = useState(0);

    // Different notification content for each page
    const notificationPages = [
        {
            id: 'payment-info',
            title: 'Payment System Information',
            notices: [
                {
                    id: 1,
                    title: "クレジットカード決済使用時に遷移する決済システム画面について",
                    icon: Info
                },
                {
                    id: 2,
                    title: "利用規約改定のお知らせ",
                    icon: Info
                }
            ],
            content: {
                greeting: "いつもmyfansをご利用いただきありがとうございます。",
                mainContent: [
                    "クレジットカード決済をご利用の場合、海外の決済システム画面に遷移する場合がございます。",
                    "中国語表記となっておりご不安を感じられたかとは存じますが、正式に弊社と業務提携している決済サービスであるためご安心ください。",
                    "「同意」を選択すると決済画面へ移動しますので、カード番号等の入力を行ってください。",
                    "決済システム側でもSMS認証が必要であるため、お手数ですが電話番号を入力の上、認証コードを入力してください。",
                    "単品購入の場合は「領収書タイプ」という項目がございますが、こちらはデフォルトの値で問題ございません。",
                    "「不同意」を選択すると決済処理は行われず、myfansへ戻ります。",
                    "myfans画面へ戻った際、「決済処理中」と表示されたままになる場合がございますが、一度タブを閉じる等で離脱していただいて結構です。",
                    "引き続きどうぞよろしくお願いいたします。"
                ]
            }
        },
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
                ]
            }
        },
        {
            id: 'feature-updates',
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
                    icon: CheckCircle
                }
            ],
            content: {
                greeting: "新機能の追加についてお知らせいたします。",
                mainContent: [
                    "この度、ユーザー体験向上のため複数の新機能をリリースいたします。",
                    "【新機能1】高画質ストリーミング機能を追加しました。設定から画質を選択できます。",
                    "【新機能2】お気に入りクリエイター通知機能を追加。好きなクリエイターの配信開始を見逃しません。",
                    "【新機能3】ギフト機能を拡充しました。より多くの種類のギフトが利用可能になります。",
                    "【改善点】検索機能を改善し、より正確な検索結果を表示するようになりました。",
                    "【バグ修正】一部環境で発生していた動画再生の問題を修正しました。",
                    "アプリをご利用の方は、最新版へのアップデートをお願いいたします。",
                    "新機能の詳細な使い方については、ヘルプページをご確認ください。",
                    "皆様により良いサービスを提供できるよう、今後も改善を続けてまいります。"
                ]
            }
        },
        {
            id: 'campaign-info',
            title: 'Special Campaigns & Events',
            notices: [
                {
                    id: 1,
                    title: "春の特別キャンペーン開催中",
                    icon: Gift
                },
                {
                    id: 2,
                    title: "限定イベント参加者募集",
                    icon: Clock
                }
            ],
            content: {
                greeting: "お得なキャンペーン情報をお届けします。",
                mainContent: [
                    "春の特別キャンペーンを開催中です！期間限定でお得にサービスをご利用いただけます。",
                    "【キャンペーン期間】2024年3月1日〜4月30日まで",
                    "【特典1】初回購入で30%オフクーポンプレゼント",
                    "【特典2】月額プラン加入で初月無料",
                    "【特典3】友達紹介で双方にボーナスポイント付与",
                    "さらに、4月中旬には限定ライブイベントを開催予定です。",
                    "イベント詳細：人気クリエイター10名による特別コラボレーション配信",
                    "参加方法については、後日改めてお知らせいたします。",
                    "この機会にぜひサービスをお試しください。キャンペーンの詳細は特設ページでご確認いただけます。",
                    "皆様のご参加をお待ちしております。"
                ]
            }
        }
    ];

    const currentNotification = notificationPages[currentPage];

    const NoticeItem = ({ notice }) => (
        <motion.div
            whileHover={{ scale: 1.01 }}
            className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-lg mb-3"
        >
            <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                    <notice.icon className="w-4 h-4 text-blue-500" />
                </div>
                <span className="text-sm text-blue-800 font-medium">
                    {notice.title}
                </span>
            </div>
            <ChevronRight className="w-5 h-5 text-blue-400" />
        </motion.div>
    );

    const ContentParagraph = ({ text, index }) => (
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="text-sm text-gray-700 mb-4 leading-relaxed"
        >
            {text}
        </motion.p>
    );

    const NavigationButton = ({ direction, onClick, disabled }) => (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            onClick={onClick}
            disabled={disabled}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${disabled
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-pink-500 text-white hover:bg-pink-600 shadow-md hover:shadow-lg'
                }`}
        >
            {direction === 'prev' ? '← Previous' : 'Next →'}
        </motion.button>
    );

    const PageIndicator = () => (
        <div className="flex justify-center space-x-2 mb-4">
            {notificationPages.map((_, index) => (
                <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentPage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentPage
                        ? 'bg-pink-500 scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                />
            ))}
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onBack}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </motion.button>
                        <div className="flex items-center space-x-2">
                            <Bell className="w-5 h-5 text-pink-500" />
                            <h1 className="text-lg font-semibold text-gray-800">
                                Notification
                            </h1>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <Settings className="w-5 h-5 text-gray-600" />
                    </motion.button>
                </div>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 py-6"
                >
                    {/* Notice Section */}
                    <div className="mb-6">
                        {currentNotification.notices.map((notice) => (
                            <NoticeItem key={notice.id} notice={notice} />
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
                        <motion.h2
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-lg font-semibold text-gray-800 mb-4"
                        >
                            {currentNotification.title}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-base text-gray-800 mb-6 font-medium"
                        >
                            {currentNotification.content.greeting}
                        </motion.p>

                        <div className="space-y-4">
                            {currentNotification.content.mainContent.map((paragraph, index) => (
                                <ContentParagraph
                                    key={index}
                                    text={paragraph}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Page Indicator */}
                    <PageIndicator />

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center">
                        <NavigationButton
                            direction="prev"
                            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                            disabled={currentPage === 0}
                        />

                        <div className="text-sm text-gray-500">
                            Page {currentPage + 1} of {notificationPages.length}
                        </div>

                        <NavigationButton
                            direction="next"
                            onClick={() => setCurrentPage(Math.min(notificationPages.length - 1, currentPage + 1))}
                            disabled={currentPage === notificationPages.length - 1}
                        />
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Bottom Navigation Placeholder */}
            <ButtonNavigation active='notifications' />
            <div className="h-20"></div>
        </div>
    );
};

export default NotificationSystem;