import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Crown, Star, UserPlus, Award, Sparkles, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CreatorPage = () => {
    const [followingCreators, setFollowingCreators] = useState(new Set());

    const navigate = useNavigate();
    const { t } = useTranslation();
    const creators = [
        {
            id: 1,
            name: "Jukiya",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616c933448c?w=150&h=150&fit=crop&crop=face",
            likes: "33K",
            followers: "25.3K",
            badge: "crown",
            isVerified: true,
            gradient: "from-pink-400 to-rose-500"
        },
        {
            id: 2,
            name: "The daily life of a secret account boy",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            likes: "64.6K",
            followers: "101.6K",
            badge: "star",
            isVerified: true,
            gradient: "from-blue-400 to-indigo-500"
        },
        {
            id: 3,
            name: "Male -YUU- NTR with a boyfriend, a married...",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            likes: "56.0K",
            followers: "106.3K",
            badge: "award",
            isVerified: true,
            gradient: "from-amber-400 to-orange-500"
        },
        {
            id: 4,
            name: "👑👑Secret Account Japan👑👑",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
            likes: "254.4K",
            followers: "379.2K",
            badge: "crown",
            isVerified: true,
            gradient: "from-purple-400 to-pink-500"
        },
        {
            id: 5,
            name: "SNAPTOKYO",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            likes: "186.8K",
            followers: "229.1K",
            badge: "star",
            isVerified: true,
            gradient: "from-emerald-400 to-teal-500"
        },
        {
            id: 6,
            name: "Squirting Rurutan🧊",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
            likes: "16.7K",
            followers: "118.5K",
            badge: "sparkles",
            isVerified: true,
            gradient: "from-cyan-400 to-blue-500"
        }
    ];

    const toggleFollow = (creatorId) => {
        setFollowingCreators(prev => {
            const newSet = new Set(prev);
            if (newSet.has(creatorId)) {
                newSet.delete(creatorId);
            } else {
                newSet.add(creatorId);
            }
            return newSet;
        });
    };

    const getBadgeIcon = (badge) => {
        switch (badge) {
            case 'crown': return Crown;
            case 'star': return Star;
            case 'award': return Award;
            case 'sparkles': return Sparkles;
            default: return Crown;
        }
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

            {/* Creator List */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto px-4 py-6"
            >
                <div className="space-y-4">
                    {creators.map((creator, index) => {
                        const BadgeIcon = getBadgeIcon(creator.badge);
                        const isFollowing = followingCreators.has(creator.id);

                        return (
                            <motion.div
                                key={creator.id}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, y: -2 }}
                                className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-pink-100 hover:border-rose-200 transition-all duration-300 hover:shadow-xl"
                            >
                                <div className="flex items-center gap-4">
                                    {/* Ranking Badge */}
                                    <div className="relative">
                                        <motion.div
                                            whileHover={{ rotate: 12, scale: 1.1 }}
                                            className={`w-10 h-10 rounded-xl bg-gradient-to-r ${creator.gradient} flex items-center justify-center shadow-lg`}
                                        >
                                            <BadgeIcon size={20} className="text-white" />
                                        </motion.div>
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                opacity: [0.5, 1, 0.5]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: index * 0.2
                                            }}
                                            className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                                        />
                                    </div>

                                    {/* Avatar with romantic border */}
                                    <div className="relative">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="relative"
                                        >
                                            <img
                                                src={creator.avatar}
                                                alt={creator.name}
                                                className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-3 border-gradient-to-r from-pink-300 to-rose-300 shadow-lg"
                                            />
                                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-200/20 to-rose-200/20" />
                                        </motion.div>

                                        {/* Verification Badge */}
                                        {creator.isVerified && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: index * 0.1 + 0.5 }}
                                                className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg"
                                            >
                                                <span className="text-white text-xs">✓</span>
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Creator Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-800 text-sm md:text-base truncate mb-1">
                                            {creator.name}
                                        </h3>

                                        <div className="flex items-center gap-4 text-xs md:text-sm">
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                className="flex items-center gap-1 text-rose-500"
                                            >
                                                <Heart size={14} className="fill-current" />
                                                <span className="font-medium">{creator.likes}</span>
                                            </motion.div>

                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                className="flex items-center gap-1 text-pink-500"
                                            >
                                                <Eye size={14} />
                                                <span className="font-medium">{creator.followers}</span>
                                                <span className="text-gray-500">{t('creatorPage.followers')}</span>
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Follow Button */}
                                    <motion.button
                                        onClick={() => toggleFollow(creator.id)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`relative overflow-hidden px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 shadow-lg ${isFollowing
                                            ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
                                            : 'bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:shadow-xl'
                                            }`}
                                    >
                                        <motion.div
                                            className="flex items-center gap-2"
                                            initial={false}
                                            animate={{
                                                scale: isFollowing ? [1, 1.1, 1] : 1
                                            }}
                                        >
                                            <UserPlus size={16} />
                                            <span className="hidden sm:inline">
                                                {isFollowing ? t('creatorPage.following') : t('creatorPage.follow')}
                                            </span>
                                        </motion.div>

                                        {!isFollowing && (
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-500 opacity-0"
                                                whileHover={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </motion.button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* See More Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8"
                >
                    <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/rankingpage')}
                        className="w-full py-4 bg-gradient-to-r from-rose-100 to-pink-100 hover:from-rose-200 hover:to-pink-200 text-rose-600 font-semibold rounded-2xl border-2 border-dashed border-rose-300 transition-all duration-300 hover:border-rose-400 shadow-lg hover:shadow-xl"
                    >
                        <div className="flex items-center justify-center gap-2">
                            <span>{t('creatorPage.seeMore')}</span>
                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="text-rose-500"
                            >
                                →
                            </motion.div>
                        </div>
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default CreatorPage;