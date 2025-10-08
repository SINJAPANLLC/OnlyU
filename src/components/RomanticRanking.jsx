import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Crown, Star, Users, MessageCircle, Share2, Video, Image as ImageIcon, Bookmark } from 'lucide-react';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import { useUserInteractions } from '../hooks/useUserInteractions';
import { useUserStats } from '../context/UserStatsContext';

const Ranking = () => {
    const navigate = useNavigate();
    const { likedPosts, savedPosts, toggleLike, toggleSave, isLiked, isSaved } = useUserInteractions();
    const { updateLikedCount, updateSavedCount } = useUserStats();
    const [localLikedPosts, setLocalLikedPosts] = useState(new Set());
    const [localSavedPosts, setLocalSavedPosts] = useState(new Set());

    // クリック機能
    const handleVideoClick = (post) => {
        navigate(`/video/${post.id}`);
    };

    const handleAccountClick = (post) => {
        navigate(`/profile/${post.user.id}`);
    };

    const handleLikeClick = (postId, e) => {
        e.stopPropagation();
        console.log('いいねがクリックされました:', postId);
        const wasLiked = localLikedPosts.has(postId);
        
        setLocalLikedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
                console.log('ローカル状態からいいねを削除しました');
                updateLikedCount(-1); // 統計を減らす
            } else {
                newSet.add(postId);
                console.log('ローカル状態にいいねを追加しました');
                updateLikedCount(1); // 統計を増やす
            }
            return newSet;
        });
        
        // 非同期でFirebaseにも保存
        toggleLike(postId).catch(error => {
            console.error('いいねの切り替えでエラーが発生しました:', error);
            // エラーの場合は統計を元に戻す
            updateLikedCount(wasLiked ? 1 : -1);
        });
    };

    const handleSaveClick = (postId, e) => {
        e.stopPropagation();
        console.log('保存がクリックされました:', postId);
        const wasSaved = localSavedPosts.has(postId);
        
        setLocalSavedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
                console.log('ローカル状態から保存を削除しました');
                updateSavedCount(-1); // 統計を減らす
            } else {
                newSet.add(postId);
                console.log('ローカル状態に保存を追加しました');
                updateSavedCount(1); // 統計を増やす
            }
            return newSet;
        });
        
        // 非同期でFirebaseにも保存
        toggleSave(postId).catch(error => {
            console.error('保存の切り替えでエラーが発生しました:', error);
            // エラーの場合は統計を元に戻す
            updateSavedCount(wasSaved ? 1 : -1);
        });
    };

    const posts = [
        {
            id: 1,
            title: "Special Offer",
            subtitle: "Limited Time Only",
            price: "¥6,000",
            duration: "3:03",
            likes: 177,
            bookmarks: 135,
            user: {
                name: "Sakura",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616c933448c?w=150&h=150&fit=crop&crop=face"
            },
            thumbnail: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=400&h=600&fit=crop",
            badge: "NEW",
            category: "premium"
        },
        {
            id: 2,
            title: "Sweet Dreams",
            subtitle: "Giveaway Event",
            duration: "2:38:50",
            likes: 308,
            bookmarks: 293,
            user: {
                name: "Yuki",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
            },
            thumbnail: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop",
            badge: "HOT",
            category: "popular"
        },
        {
            id: 3,
            title: "Private Moment",
            subtitle: "Exclusive Content",
            duration: "3:30:56",
            likes: 477,
            bookmarks: 402,
            user: {
                name: "Airi",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
            },
            thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop",
            badge: "VIP",
            category: "premium"
        },
        {
            id: 4,
            title: "Live Stream",
            subtitle: "Active Now",
            duration: "45:56",
            likes: 405,
            bookmarks: 375,
            user: {
                name: "Miu",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
            },
            thumbnail: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop",
            badge: "LIVE",
            category: "live"
        },
        {
            id: 5,
            title: "Live Stream",
            subtitle: "Active Now",
            duration: "45:56",
            likes: 405,
            bookmarks: 375,
            user: {
                name: "Miu",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
            },
            thumbnail: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop",
            badge: "LIVE",
            category: "live"
        },
        {
            id: 6,
            title: "Live Stream",
            subtitle: "Active Now",
            duration: "45:56",
            likes: 405,
            bookmarks: 375,
            user: {
                name: "Miu",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
            },
            thumbnail: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop",
            badge: "LIVE",
            category: "live"
        },
        {
            id: 7,
            title: "Live Stream",
            subtitle: "Active Now",
            duration: "45:56",
            likes: 405,
            bookmarks: 375,
            user: {
                name: "Miu",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
            },
            thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
            badge: "LIVE",
            category: "live"
        },
        {
            id: 8,
            title: "Live Stream",
            subtitle: "Active Now",
            duration: "45:56",
            likes: 405,
            bookmarks: 375,
            user: {
                name: "Miu",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
            },
            thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            badge: "LIVE",
            category: "live"
        },

    ];

    // すべての投稿を表示
    const filteredPosts = posts;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="bg-gradient-to-br from-pink-50 via-white to-rose-50">
            {/* Header */}
            <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-pink-100 shadow-sm"
            >
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-3">
                        {/* <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                            Ranking
                        </h1> */}
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                            <Crown className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-pink-500" />
                            総合ランキング
                        </h2>
                    </div>
                </div>
            </motion.header>

            {/* Filter Tabs */}

            {/* Posts Grid */}
            <div className="max-w-6xl mx-auto px-4 pb-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key="all"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-2 gap-2 px-1"
                    >
                        {filteredPosts.map((post, index) => (
                            <div key={post.id} className="flex flex-col">
                                {/* 画像部分 - 正方形のカード */}
                                <motion.div
                                    variants={itemVariants}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow aspect-square flex items-center justify-center relative"
                                    style={{
                                        background: post.type === 'video' 
                                            ? 'linear-gradient(135deg, #ec4899, #8b5cf6)' 
                                            : 'linear-gradient(135deg, #3b82f6, #6366f1)'
                                    }}
                                    onClick={() => handleVideoClick(post)}
                                >
                                    {/* OnlyU Logo - 中央配置 */}
                                    <div className="text-white text-center">
                                        <div className="flex flex-col items-center justify-center h-full">
                                            {/* ハートアイコン */}
                                            <div className="relative mb-3">
                                                <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
                                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                                </div>
                                                <div className="absolute -right-2 w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
                                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                                </div>
                                            </div>
                                            {/* OnlyU テキスト */}
                                            <div className="text-white">
                                                <span className="text-3xl font-bold">OnlyU</span>
                                            </div>
                                            {/* 動画/画像の種類表示 */}
                                            <div className="text-sm mt-2 opacity-90">
                                                {post.type === 'video' ? '動画' : '画像'}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* ランキングバッジ */}
                                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        {index + 1}位
                                    </div>
                                    
                                    {/* 新着バッジ */}
                                    <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        新着
                                    </div>
                                    
                                    {/* 動画時間表示 */}
                                    {post.type === 'video' && (
                                        <div className="absolute bottom-3 right-3 text-white text-sm bg-black/50 px-2 py-1 rounded">
                                            {post.duration || '2:00:00'}
                                        </div>
                                    )}
                                </motion.div>

                                {/* カードの下のコンテンツ */}
                                <div className="mt-3 space-y-2">
                                    {/* タイトル */}
                                    <h3 className="text-sm font-medium line-clamp-2 leading-tight text-gray-800">
                                        {post.title}
                                    </h3>

                                    {/* クリエイター情報 - クリックでアカウントに遷移 */}
                                    <div 
                                        className="flex items-center cursor-pointer"
                                        onClick={() => handleAccountClick(post)}
                                    >
                                        <img
                                            src={post.user.avatar}
                                            alt={post.user.name}
                                            className="w-5 h-5 rounded-full mr-2"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-600 truncate">{post.user.name}</span>
                                            <span className="text-xs text-gray-400">
                                                {post.createdAt ? 
                                                    new Date(post.createdAt).toLocaleDateString('ja-JP', { 
                                                        month: 'short', 
                                                        day: 'numeric' 
                                                    }) + '前' 
                                                    : '1日前'
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    {/* 統計情報 */}
                                    <div className="flex items-center space-x-4">
                                        <div 
                                            className="flex items-center space-x-1 cursor-pointer hover:bg-gray-100 p-1 rounded"
                                            onClick={(e) => handleLikeClick(post.id, e)}
                                        >
                                            <Heart 
                                                size={16} 
                                                className={`${localLikedPosts.has(post.id) ? 'text-red-500 fill-current' : 'text-pink-500'}`} 
                                            />
                                            <span className="text-sm text-gray-600">{post.likes}</span>
                                        </div>
                                        <div 
                                            className="flex items-center space-x-1 cursor-pointer hover:bg-gray-100 p-1 rounded"
                                            onClick={(e) => handleSaveClick(post.id, e)}
                                        >
                                            <Bookmark 
                                                size={16} 
                                                className={`${localSavedPosts.has(post.id) ? 'text-blue-500 fill-current' : 'text-pink-500'}`} 
                                            />
                                            <span className="text-sm text-gray-600">{post.bookmarks}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <MessageCircle size={16} className="text-pink-500" />
                                            <span className="text-sm text-gray-600">{post.comments || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {filteredPosts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-12"
                    >
                        <div className="text-6xl mb-4">💕</div>
                        <p className="text-gray-500 text-lg">コンテンツがありません</p>
                    </motion.div>
                )}
            </div>

        </div>
    );
};

export default Ranking;
