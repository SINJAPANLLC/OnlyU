import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Crown, Star, Users, MessageCircle, Share2 } from 'lucide-react';
import { t } from 'i18next';

const Ranking = () => {
    const [activeFilter, setActiveFilter] = useState('all');

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

    const filters = [
        { id: 'all', label: t('ranking.filters.all'), icon: Star },
        { id: 'popular', label: t('ranking.filters.popular'), icon: Heart },
        { id: 'premium', label: t('ranking.filters.premium'), icon: Crown },
        { id: 'live', label: t('ranking.filters.live'), icon: Users }
    ];

    const filteredPosts = activeFilter === 'all'
        ? posts
        : posts.filter(post => post.category === activeFilter);

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
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-pink-500" />
                            {t('ranking.title')}
                        </h2>
                    </div>
                </div>
            </motion.header>

            {/* Filter Tabs */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="max-w-6xl mx-auto px-4 py-6"
            >
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {filters.map((filter) => {
                        const Icon = filter.icon;
                        return (
                            <motion.button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all whitespace-nowrap ${activeFilter === filter.id
                                    ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg'
                                    : 'bg-white text-gray-600 hover:bg-rose-50 border border-rose-100'
                                    }`}
                            >
                                <Icon size={16} />
                                {filter.label}
                            </motion.button>
                        );
                    })}
                </div>
            </motion.div>

            {/* Posts Grid */}
            <div className="max-w-6xl mx-auto px-4 pb-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeFilter}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6"
                    >
                        {filteredPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                variants={itemVariants}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-pink-100"
                            >
                                <div className="relative">
                                    <img
                                        src={post.thumbnail}
                                        alt={post.title}
                                        className="w-full h-36 sm:h-48 md:h-64 lg:h-80 object-cover"
                                    />

                                    {/* Badge */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: index * 0.1 + 0.3 }}
                                        className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold ${post.badge === 'NEW' ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white' :
                                            post.badge === 'HOT' ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white' :
                                                post.badge === 'VIP' ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white' :
                                                    'bg-gradient-to-r from-red-400 to-rose-500 text-white'
                                            }`}
                                    >
                                        {post.badge}
                                    </motion.div>

                                    {/* Duration */}
                                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                                        {post.duration}
                                    </div>

                                    {/* Price (if applicable) */}
                                    {post.price && (
                                        <div className="absolute top-2 right-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                                            {post.price}
                                        </div>
                                    )}
                                </div>

                                <div className="p-3 md:p-6">
                                    {/* Title and Subtitle */}
                                    <div className="mb-3 md:mb-4">
                                        <h3 className="text-sm md:text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                                            {post.title}
                                        </h3>
                                        <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
                                            {post.subtitle}
                                        </p>
                                    </div>

                                    {/* User Info */}
                                    <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                                        <img
                                            src={post.user.avatar}
                                            alt={post.user.name}
                                            className="w-6 h-6 md:w-10 md:h-10 rounded-full object-cover border-2 border-pink-200"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-800 text-xs md:text-sm truncate">{post.user.name}</p>
                                            <p className="text-xs text-gray-500 hidden md:block">3 days ago</p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 md:gap-4">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="flex items-center gap-1 text-rose-500 hover:text-rose-600"
                                            >
                                                <Heart size={14} className="md:w-[18px] md:h-[18px]" />
                                                <span className="text-xs md:text-sm font-medium">{post.likes}</span>
                                            </motion.button>

                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="flex items-center gap-1 text-pink-500 hover:text-pink-600"
                                            >
                                                <MessageCircle size={14} className="md:w-[18px] md:h-[18px]" />
                                                <span className="text-xs md:text-sm font-medium">{post.bookmarks}</span>
                                            </motion.button>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.1, rotate: 15 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-1.5 md:p-2 rounded-full bg-gradient-to-r from-rose-50 to-pink-50 text-rose-500 hover:from-rose-100 hover:to-pink-100"
                                        >
                                            <Share2 size={12} className="md:w-4 md:h-4" />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
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
                        <p className="text-gray-500 text-lg">No posts found in this category</p>
                    </motion.div>
                )}
            </div>

        </div>
    );
};

export default Ranking;