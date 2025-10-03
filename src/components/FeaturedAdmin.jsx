import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Bookmark, Share2, Play, Clock, Award, Crown } from 'lucide-react';
import { t } from 'i18next';

const FeaturedAdminPage = () => {
    const [likedPosts, setLikedPosts] = useState(new Set());
    const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());

    const featuredPosts = [
        {
            id: 1,
            title: "Boing boing",
            duration: "00:06",
            thumbnail: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=400&h=600&fit=crop",
            user: {
                name: "Sakura",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616c933448c?w=100&h=100&fit=crop&crop=face",
                timeAgo: "3 days ago"
            },
            likes: 32,
            bookmarks: 19,
            badge: "NEW",
            badgeColor: "from-emerald-400 to-teal-500",
            category: "trending"
        },
        {
            id: 2,
            title: "After groping her I-cup breasts with their lewdly huge areolas and interviewing her...",
            duration: "49:30",
            thumbnail: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop",
            user: {
                name: "Big Breasts Academy",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
                timeAgo: "1 day ago"
            },
            likes: 11,
            bookmarks: 11,
            badge: "HOT",
            badgeColor: "from-orange-400 to-red-500",
            category: "premium"
        },
        {
            id: 3,
            title: "Obon Limited!! Giveaway!! [Please read carefully to the end] Special price.",
            duration: "Limited",
            thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop",
            user: {
                name: "Yoga Teacher",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
                timeAgo: "2 days ago"
            },
            likes: 57,
            bookmarks: 50,
            badge: "SPECIAL",
            badgeColor: "from-purple-400 to-pink-500",
            category: "event"
        },
        {
            id: 4,
            title: "A short elementary school teacher with big tits came to the room, so I hugged he...",
            duration: "26:31",
            thumbnail: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop",
            user: {
                name: "Kei",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                timeAgo: "1 month ago"
            },
            likes: 111,
            bookmarks: 111,
            badge: "EXCLUSIVE",
            badgeColor: "from-indigo-400 to-purple-500",
            category: "premium"
        }
    ];

    const toggleLike = (postId) => {
        setLikedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
            } else {
                newSet.add(postId);
            }
            return newSet;
        });
    };

    const toggleBookmark = (postId) => {
        setBookmarkedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
            } else {
                newSet.add(postId);
            }
            return newSet;
        });
    };

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
        hidden: { y: 30, opacity: 0, scale: 0.9 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
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
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-pink-500" />
                            {t('featuredAdmin.header')}
                        </h2>
                    </div>
                </div>
            </motion.header>

            {/* Post Section */}
            <div className="max-w-6xl mx-auto px-4 py-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 mb-6"
                >
                    <Award className="text-rose-500" size={20} />
                    <h2 className="text-lg font-semibold text-gray-800">{t('featuredAdmin.postSection')}</h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-rose-200 to-transparent" />
                </motion.div>

                {/* Posts Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6"
                >
                    {featuredPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            variants={itemVariants}
                            whileHover={{ y: -8, scale: 1.03 }}
                            className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-pink-100 hover:border-rose-200 group"
                        >
                            {/* Thumbnail Container */}
                            <div className="relative overflow-hidden">
                                <motion.img
                                    src={post.thumbnail}
                                    alt={post.title}
                                    className="w-full h-36 sm:h-48 md:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                                    whileHover={{ scale: 1.1 }}
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Play Button */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileHover={{ scale: 1 }}
                                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                                        <Play size={20} className="text-rose-500 ml-1" />
                                    </div>
                                </motion.div>

                                {/* Badge */}
                                <motion.div
                                    initial={{ scale: 0, rotate: -15 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: index * 0.1 + 0.3 }}
                                    className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${post.badgeColor} text-white shadow-lg`}
                                >
                                    {post.badge}
                                </motion.div>

                                {/* Duration */}
                                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 backdrop-blur-sm">
                                    <Clock size={12} />
                                    {post.duration}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-3 md:p-4">
                                {/* Title */}
                                <h3 className="font-semibold text-gray-800 text-sm md:text-base mb-2 line-clamp-2 group-hover:text-rose-600 transition-colors">
                                    {post.title}
                                </h3>

                                {/* User Info */}
                                <div className="flex items-center gap-2 mb-3">
                                    <motion.img
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        src={post.user.avatar}
                                        alt={post.user.name}
                                        className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover border-2 border-pink-200"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-700 text-xs md:text-sm truncate">
                                            {post.user.name}
                                        </p>
                                        <p className="text-xs text-gray-500 hidden md:block">
                                            {post.user.timeAgo}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <motion.button
                                            onClick={() => toggleLike(post.id)}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className={`flex items-center gap-1 transition-colors ${likedPosts.has(post.id)
                                                ? 'text-rose-500'
                                                : 'text-gray-400 hover:text-rose-500'
                                                }`}
                                        >
                                            <motion.div
                                                animate={likedPosts.has(post.id) ? { scale: [1, 1.3, 1] } : {}}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Heart
                                                    size={16}
                                                    className={likedPosts.has(post.id) ? 'fill-current' : ''}
                                                />
                                            </motion.div>
                                            <span className="text-xs md:text-sm font-medium">
                                                {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                                            </span>
                                        </motion.button>

                                        <motion.button
                                            onClick={() => toggleBookmark(post.id)}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className={`flex items-center gap-1 transition-colors ${bookmarkedPosts.has(post.id)
                                                ? 'text-pink-500'
                                                : 'text-gray-400 hover:text-pink-500'
                                                }`}
                                        >
                                            <motion.div
                                                animate={bookmarkedPosts.has(post.id) ? { scale: [1, 1.3, 1] } : {}}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Bookmark
                                                    size={16}
                                                    className={bookmarkedPosts.has(post.id) ? 'fill-current' : ''}
                                                />
                                            </motion.div>
                                            <span className="text-xs md:text-sm font-medium">
                                                {post.bookmarks + (bookmarkedPosts.has(post.id) ? 1 : 0)}
                                            </span>
                                        </motion.button>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.1, rotate: 15 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="p-2 rounded-full bg-gradient-to-r from-rose-50 to-pink-50 text-rose-500 hover:from-rose-100 hover:to-pink-100 transition-all"
                                    >
                                        <Share2 size={14} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Premium Banner */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="max-w-6xl mx-auto px-4 py-8"
            >
                <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-3xl p-6 text-white relative overflow-hidden">
                    <motion.div
                        animate={{
                            rotate: 360,
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full"
                    />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            <Crown size={24} className="text-yellow-300" />
                            <h3 className="text-xl font-bold">{t('featuredAdmin.premiumBanner.title')}</h3>
                        </div>
                        <p className="text-white/90 mb-4">
                            {t('featuredAdmin.premiumBanner.description')}
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg"
                        >
                            {t('featuredAdmin.premiumBanner.button')}
                        </motion.button>
                    </div>
                </div>
            </motion.div>

        </div>
    );
};

export default FeaturedAdminPage;