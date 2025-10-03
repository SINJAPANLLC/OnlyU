import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Star, UserPlus } from "lucide-react";
import BottomNavigation from "../components/BottomNavigation"; // ✅ import
import { t } from "i18next";

const CleanCreatorPage = () => {
    const [followingCreators, setFollowingCreators] = useState(new Set());

    const creators = [
        {
            id: 1,
            name: "Yoga teacher",
            emoji: "🧘‍♀️❤️",
            suffix: "lbu",
            followers: "1.4K",
            likes: "1.4K",
            avatar:
                "https://images.unsplash.com/photo-1494790108755-2616c933448c?w=100&h=100&fit=crop&crop=face",
            isVerified: true,
        },
        {
            id: 2,
            name: "Married Woman Mature Woman Hamezo",
            followers: "56",
            likes: "54",
            avatar:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
            isVerified: true,
        },
        {
            id: 3,
            name: "jay, the guy who produces a lot of sperm",
            followers: "16.6K",
            likes: "13.0K",
            avatar:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            isVerified: true,
        },
        {
            id: 4,
            name: "Yurika's Secret Room",
            followers: "878",
            likes: "1.5K",
            avatar:
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
            isVerified: true,
        },
        {
            id: 5,
            name: "sea",
            followers: "1.9K",
            likes: "1.0K",
            avatar:
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
            isVerified: true,
        },
        {
            id: 6,
            name: "Big Breasts Academy/The Garden of Big Breasts and...",
            followers: "42",
            likes: "13",
            avatar:
                "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop&crop=face",
            isVerified: true,
        },
    ];

    const toggleFollow = (creatorId) => {
        setFollowingCreators((prev) => {
            const newSet = new Set(prev);
            newSet.has(creatorId) ? newSet.delete(creatorId) : newSet.add(creatorId);
            return newSet;
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-6">
                {/* Creator Section */}
                <section className="mb-8">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-pink-500" />
                        {t('creatorFollow.title')}
                    </h2>

                    <div className="space-y-3">
                        {creators.map((creator) => (
                            <motion.div
                                key={creator.id}
                                whileHover={{ scale: 1.01 }}
                                className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-sm transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={creator.avatar}
                                        alt={creator.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-medium text-gray-800 text-sm truncate">
                                                {creator.name}
                                            </h3>
                                            {creator.emoji && (
                                                <span className="text-sm">{creator.emoji}</span>
                                            )}
                                            {creator.suffix && (
                                                <span className="text-xs text-gray-500">
                                                    {creator.suffix}
                                                </span>
                                            )}
                                            {creator.isVerified && (
                                                <div className="w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center">
                                                    <span className="text-white text-xs">✓</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-4 text-xs text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Heart
                                                    size={12}
                                                    className="text-pink-500 fill-current"
                                                />
                                                <span>{creator.likes}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span>{creator.followers} {t('profile.followers')}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => toggleFollow(creator.id)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${followingCreators.has(creator.id)
                                            ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            : "bg-pink-500 text-white hover:bg-pink-600"
                                            }`}
                                    >
                                        <div className="flex items-center gap-1">
                                            <UserPlus size={16} />
                                            <span className="hidden sm:inline">
                                                {followingCreators.has(creator.id)
                                                    ? t('profile.following')
                                                    : t('profile.follow')}
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Recruit Banner */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                >
                    <img
                        src="/images/RECRUIT.png"
                        alt="Recruit Banner"
                        className="w-full h-auto object-cover"
                    />
                </motion.div>
            </div>

            {/* ✅ Reusable Bottom Navigation */}
            <BottomNavigation active="Account" />
        </div>
    );
};

export default CleanCreatorPage;
