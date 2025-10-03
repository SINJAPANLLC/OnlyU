import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Heart, Users, MessageCircle, Plus, Eye, Star, Gamepad2, Music, Home, Dumbbell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';

const Creator = ({ activeTimeFilter }) => {
    // Creator ranking categories with top creators

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/GenreNavigationSystem');
    };
    const creatorCategories = [
        {
            id: 'overall',
            title: 'Overall Ranking',
            icon: Crown,
            topCreator: {
                id: 1,
                name: "美咲ちゃん",
                avatar: "https://via.placeholder.com/120x120/ff69b4/ffffff?text=美咲",
                backgroundImage: "https://via.placeholder.com/400x200/ffd700/ffffff?text=Golden+Background",
                followers: "15.3K",
                likes: "12.4K",
                description: "毎日楽しい配信をお届けします♪",
                isVerified: true,
                plan: "見放題プラン",
                planPrice: "¥6,980",
                posts: "45",
                recommendation: "💙 見放題プラン 💙"
            },
            otherCreators: [
                {
                    id: 2,
                    name: "とうま【痩イキ オイルマッサージ】",
                    avatar: "https://via.placeholder.com/50x50/87ceeb/ffffff?text=とう",
                    followers: "24.1K",
                    likes: "27.1K",
                    isVerified: false
                },
                {
                    id: 3,
                    name: "完全サロンの秘密_ALL単品",
                    avatar: "https://via.placeholder.com/50x50/ffb6c1/ffffff?text=完全",
                    followers: "10.3K",
                    likes: "7.2K",
                    isVerified: true
                },
                {
                    id: 4,
                    name: "美魚spasm 🌸",
                    avatar: "https://via.placeholder.com/50x50/dda0dd/ffffff?text=美魚",
                    followers: "23.7K",
                    likes: "18.0K",
                    isVerified: true
                },
                {
                    id: 5,
                    name: "SNAPTOKYO【スナップトーキョー】",
                    avatar: "https://via.placeholder.com/50x50/98fb98/ffffff?text=SNAP",
                    followers: "18.1K",
                    likes: "25.4K",
                    isVerified: false
                }
            ]
        },
        {
            id: 'massage',
            title: 'Massage Ranking',
            icon: Users,
            topCreator: {
                id: 2,
                name: "とうま",
                avatar: "https://via.placeholder.com/120x120/20b2aa/ffffff?text=とうま",
                backgroundImage: "https://via.placeholder.com/400x200/20b2aa/ffffff?text=Massage+Background",
                followers: "24.1K",
                likes: "27.1K",
                description: "痩イキ オイルマッサージの専門家",
                isVerified: false,
                plan: "マッサージプラン",
                planPrice: "¥8,980",
                posts: "67",
                recommendation: "💆 マッサージプラン 💆"
            },
            otherCreators: [
                {
                    id: 6,
                    name: "癒しのゆりか",
                    avatar: "https://via.placeholder.com/50x50/48d1cc/ffffff?text=ゆり",
                    followers: "18.3K",
                    likes: "22.5K",
                    isVerified: true
                },
                {
                    id: 7,
                    name: "リラックス★みお",
                    avatar: "https://via.placeholder.com/50x50/40e0d0/ffffff?text=みお",
                    followers: "15.7K",
                    likes: "19.2K",
                    isVerified: false
                }
            ]
        },
        {
            id: 'adult_services',
            title: 'Adult Services Ranking',
            icon: Heart,
            topCreator: {
                id: 3,
                name: "さくら姫",
                avatar: "https://via.placeholder.com/120x120/ff1493/ffffff?text=さくら",
                backgroundImage: "https://via.placeholder.com/400x200/ff1493/ffffff?text=Adult+Background",
                followers: "12.4K",
                likes: "38.7K",
                description: "大人の魅力をお届けします",
                isVerified: true,
                plan: "プレミアムプラン",
                planPrice: "¥9,980",
                posts: "89",
                recommendation: "🌸 プレミアムプラン 🌸"
            },
            otherCreators: [
                {
                    id: 8,
                    name: "大人の時間★あい",
                    avatar: "https://via.placeholder.com/50x50/ff69b4/ffffff?text=あい",
                    followers: "16.8K",
                    likes: "31.2K",
                    isVerified: true
                },
                {
                    id: 9,
                    name: "セクシー★りん",
                    avatar: "https://via.placeholder.com/50x50/dc143c/ffffff?text=りん",
                    followers: "11.5K",
                    likes: "25.7K",
                    isVerified: false
                }
            ]
        },
        {
            id: 'cosplay',
            title: 'Spa Ranking',
            icon: Star,
            topCreator: {
                id: 4,
                name: "みお★コス",
                avatar: "https://via.placeholder.com/120x120/9370db/ffffff?text=みお",
                backgroundImage: "https://via.placeholder.com/400x200/9370db/ffffff?text=Cosplay+Background",
                followers: "18.2K",
                likes: "56.3K",
                description: "可愛いコスプレ配信♪",
                isVerified: true,
                plan: "コスプレプラン",
                planPrice: "¥5,980",
                posts: "123",
                recommendation: "👗 コスプレプラン 👗"
            },
            otherCreators: [
                {
                    id: 10,
                    name: "アニメ★かな",
                    avatar: "https://via.placeholder.com/50x50/ba55d3/ffffff?text=かな",
                    followers: "14.6K",
                    likes: "42.1K",
                    isVerified: true
                },
                {
                    id: 11,
                    name: "キャラ★ゆい",
                    avatar: "https://via.placeholder.com/50x50/dda0dd/ffffff?text=ゆい",
                    followers: "12.9K",
                    likes: "38.4K",
                    isVerified: false
                }
            ]
        },
        {
            id: 'chat',
            title: 'Virgin Ranking',
            icon: MessageCircle,
            topCreator: {
                id: 5,
                name: "あいちゃん",
                avatar: "https://via.placeholder.com/120x120/ffd700/ffffff?text=あい",
                backgroundImage: "https://via.placeholder.com/400x200/ffd700/ffffff?text=Chat+Background",
                followers: "22.1K",
                likes: "67.8K",
                description: "楽しいチャット配信中！",
                isVerified: true,
                plan: "チャットプラン",
                planPrice: "¥3,980",
                posts: "234",
                recommendation: "💬 チャットプラン 💬"
            },
            otherCreators: [
                {
                    id: 12,
                    name: "おしゃべり★なな",
                    avatar: "https://via.placeholder.com/50x50/ffeb3b/ffffff?text=なな",
                    followers: "19.3K",
                    likes: "54.7K",
                    isVerified: true
                },
                {
                    id: 13,
                    name: "雑談★まり",
                    avatar: "https://via.placeholder.com/50x50/fff8dc/ffffff?text=まり",
                    followers: "16.2K",
                    likes: "43.8K",
                    isVerified: false
                }
            ]
        },
        {
            id: 'dance',
            title: 'Bunny Girl Ranking',
            icon: Users,
            topCreator: {
                id: 6,
                name: "ダンス★りな",
                avatar: "https://via.placeholder.com/120x120/ff7f50/ffffff?text=りな",
                backgroundImage: "https://via.placeholder.com/400x200/ff7f50/ffffff?text=Dance+Background",
                followers: "14.7K",
                likes: "41.2K",
                description: "ダンスで魅せます♪",
                isVerified: false,
                plan: "ダンスプラン",
                planPrice: "¥4,480",
                posts: "78",
                recommendation: "💃 ダンスプラン 💃"
            },
            otherCreators: [
                {
                    id: 14,
                    name: "踊り子★さや",
                    avatar: "https://via.placeholder.com/50x50/ff6347/ffffff?text=さや",
                    followers: "13.4K",
                    likes: "37.9K",
                    isVerified: true
                },
                {
                    id: 15,
                    name: "リズム★えり",
                    avatar: "https://via.placeholder.com/50x50/fa8072/ffffff?text=えり",
                    followers: "11.8K",
                    likes: "32.6K",
                    isVerified: false
                }
            ]
        },
        {
            id: 'gaming',
            title: 'Pervert Ranking',
            icon: Gamepad2,
            topCreator: {
                id: 7,
                name: "ゲーマー★かな",
                avatar: "https://via.placeholder.com/120x120/32cd32/ffffff?text=かな",
                backgroundImage: "https://via.placeholder.com/400x200/32cd32/ffffff?text=Gaming+Background",
                followers: "19.5K",
                likes: "58.9K",
                description: "ゲーム実況配信中！",
                isVerified: true,
                plan: "ゲーミングプラン",
                planPrice: "¥5,480",
                posts: "156",
                recommendation: "🎮 ゲーミングプラン 🎮"
            },
            otherCreators: [
                {
                    id: 16,
                    name: "プロゲーマー★たく",
                    avatar: "https://via.placeholder.com/50x50/228b22/ffffff?text=たく",
                    followers: "17.2K",
                    likes: "51.3K",
                    isVerified: true
                },
                {
                    id: 17,
                    name: "ゲーム好き★ひな",
                    avatar: "https://via.placeholder.com/50x50/90ee90/ffffff?text=ひな",
                    followers: "14.9K",
                    likes: "44.7K",
                    isVerified: false
                }
            ]
        },
        {
            id: 'music',
            title: 'Softcore Ranking',
            icon: Music,
            topCreator: {
                id: 8,
                name: "歌姫★まみ",
                avatar: "https://via.placeholder.com/120x120/ff1493/ffffff?text=まみ",
                backgroundImage: "https://via.placeholder.com/400x200/ff1493/ffffff?text=Music+Background",
                followers: "11.3K",
                likes: "35.7K",
                description: "心に響く歌声をお届け",
                isVerified: true,
                plan: "ミュージックプラン",
                planPrice: "¥4,680",
                posts: "92",
                recommendation: "🎵 ミュージックプラン 🎵"
            },
            otherCreators: [
                {
                    id: 18,
                    name: "シンガー★あや",
                    avatar: "https://via.placeholder.com/50x50/c71585/ffffff?text=あや",
                    followers: "9.7K",
                    likes: "28.4K",
                    isVerified: true
                },
                {
                    id: 19,
                    name: "弾き語り★けい",
                    avatar: "https://via.placeholder.com/50x50/da70d6/ffffff?text=けい",
                    followers: "8.5K",
                    likes: "24.1K",
                    isVerified: false
                }
            ]
        },
        {
            id: 'lifestyle',
            title: 'Lifestyle Ranking',
            icon: Home,
            topCreator: {
                id: 9,
                name: "ライフ★なな",
                avatar: "https://via.placeholder.com/120x120/ffa500/ffffff?text=なな",
                backgroundImage: "https://via.placeholder.com/400x200/ffa500/ffffff?text=Lifestyle+Background",
                followers: "9.8K",
                likes: "28.4K",
                description: "日常生活を楽しく配信",
                isVerified: false,
                plan: "ライフスタイルプラン",
                planPrice: "¥3,680",
                posts: "167",
                recommendation: "🏠 ライフスタイルプラン 🏠"
            },
            otherCreators: [
                {
                    id: 20,
                    name: "日常★みく",
                    avatar: "https://via.placeholder.com/50x50/ff8c00/ffffff?text=みく",
                    followers: "7.9K",
                    likes: "21.3K",
                    isVerified: false
                },
                {
                    id: 21,
                    name: "暮らし★さき",
                    avatar: "https://via.placeholder.com/50x50/ffd700/ffffff?text=さき",
                    followers: "6.4K",
                    likes: "18.7K",
                    isVerified: true
                }
            ]
        },
        {
            id: 'fitness',
            title: 'Fitness Ranking',
            icon: Dumbbell,
            topCreator: {
                id: 10,
                name: "フィット★あや",
                avatar: "https://via.placeholder.com/120x120/32cd32/ffffff?text=あや",
                backgroundImage: "https://via.placeholder.com/400x200/32cd32/ffffff?text=Fitness+Background",
                followers: "13.2K",
                likes: "39.6K",
                description: "一緒に健康的な体作り！",
                isVerified: true,
                plan: "フィットネスプラン",
                planPrice: "¥4,280",
                posts: "89",
                recommendation: "💪 フィットネスプラン 💪"
            },
            otherCreators: [
                {
                    id: 22,
                    name: "筋トレ★けん",
                    avatar: "https://via.placeholder.com/50x50/228b22/ffffff?text=けん",
                    followers: "11.7K",
                    likes: "34.2K",
                    isVerified: true
                },
                {
                    id: 23,
                    name: "ヨガ★みき",
                    avatar: "https://via.placeholder.com/50x50/90ee90/ffffff?text=みき",
                    followers: "10.3K",
                    likes: "29.8K",
                    isVerified: false
                }
            ]
        }
    ];

    const TopCreatorCard = ({ creator, categoryTitle }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 mb-4"
        >
            {/* Background Image Header */}
            <div
                className="relative h-32 sm:h-40 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${creator.backgroundImage})`,
                    backgroundColor: '#ffd700'
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>

                {/* Profile Image */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                    <div className="relative">
                        <img
                            src={creator.avatar}
                            alt={creator.name}
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        {creator.isVerified && (
                            <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-1">
                                <Crown className="w-3 h-3 sm:w-4 sm:h-4" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="pt-12 sm:pt-14 pb-4 px-4 text-center">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
                    {creator.name}
                </h3>

                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-2">
                    <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span>{creator.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span>{creator.followers} {t('creatorPage.followers')}</span>
                    </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 px-2">
                    {creator.description}
                </p>

                {/* Recommendation Box */}
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-3 mb-4 mx-2">
                    <div className="text-sm text-pink-800 font-medium mb-1">
                        {t('creatorPage.recommend')}
                    </div>
                    <div className="text-sm text-pink-600 mb-1">
                        {creator.recommendation}
                    </div>
                    <div className="text-lg font-bold text-pink-600 mb-1">
                        {creator.planPrice}
                        <span className="text-sm font-normal text-gray-500">/{t('creatorPage.month')}</span>
                    </div>
                    <div className="text-xs text-pink-600">{t('creatorPage.posts')}: {creator.posts}</div>
                </div>

                {/* Subscribe Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-pink-500 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-pink-600 transition-colors flex items-center justify-center space-x-2"
                >
                    <Plus className="w-4 h-4" />
                    <span>{t('creatorpage.subscribe')}</span>
                </motion.button>
            </div>
        </motion.div>
    );

    const CreatorListItem = ({ creator, rank }) => (
        <motion.div
            whileHover={{ scale: 1.01 }}
            className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm mb-2"
        >
            <div className="flex-shrink-0 text-gray-400 font-semibold text-sm w-6">
                {rank}
            </div>

            <div className="relative flex-shrink-0">
                <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-12 h-12 rounded-full object-cover"
                />
                {creator.isVerified && (
                    <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-0.5">
                        <Crown className="w-2.5 h-2.5" />
                    </div>
                )}
            </div>

            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-800 truncate">
                    {creator.name}
                </h4>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3 text-red-500" />
                        <span>{creator.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3 text-blue-500" />
                        <span>{creator.followers}</span>
                    </div>
                </div>
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0 bg-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-pink-600 transition-colors flex items-center space-x-1"
            >
                <Plus className="w-3 h-3" />
                <span>{t('creatorPage.follow')}</span>
            </motion.button>
        </motion.div>
    );

    const CategorySection = ({ category, index }) => (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="mb-8 sm:mb-12"
        >
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-6 sticky top-26 z-60">
                <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="bg-pink-100 p-2 rounded-lg">
                        <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                        {category.title}
                    </h2>
                </div>
            </div>

            {/* Top Creator Profile */}
            <TopCreatorCard creator={category.topCreator} categoryTitle={category.title} />

            {/* Other Creators List */}
            {category.otherCreators && (
                <div className="space-y-2 mb-4">
                    {category.otherCreators.map((creator, idx) => (
                        <CreatorListItem
                            key={creator.id}
                            creator={creator}
                            rank={idx + 2}
                        />
                    ))}
                </div>
            )}

            {/* View More Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                className="w-full py-3 text-pink-500 border border-pink-200 rounded-lg font-medium hover:bg-pink-50 transition-colors flex items-center justify-center space-x-1"
            >
                <span>{t('creatorPage.viewmore')}</span>
                <Eye className="w-4 h-4" />
            </motion.button>
        </motion.div>
    );

    return (
        <div className="max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                {creatorCategories.map((category, index) => (
                    <CategorySection key={category.id} category={category} index={index} />
                ))}

                {/* All Creators Button */}
                <div className="text-center mt-8 sm:mt-12">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClick}
                        className="bg-pink-500 text-white px-8 py-3 sm:px-10 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:bg-pink-600 transition-colors shadow-lg"
                    >
                        {t('creatorPage.allcreatorhere')}
                    </motion.button>
                </div>
            </motion.div>

            <style jsx>{`
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default Creator;