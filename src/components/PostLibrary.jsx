import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Bookmark, Heart, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const PostLibrary = ({ likedItems }) => {
    const navigate = useNavigate();

    const { t } = useTranslation();
    const postStats = [
        {
            icon: ShoppingCart,
            label: t("postLibrary.purchased"),
            count: 0,
            key: 'purchased'
        },
        {
            icon: Bookmark,
            label: t("postLibrary.saved"),
            count: 0,
            key: 'saved'
        },
        {
            icon: Heart,
            label: t("postLibrary.liked"),
            count: likedItems.size,
            key: 'liked'
        },
        {
            icon: Eye,
            label: t("postLibrary.viewingHistory"),
            count: 0,
            key: 'viewingHistory'
        }
    ];

    const handleNavigation = (key, label) => {
        // Pass both key and label in state
        navigate('/added-content', {
            state: {
                activeTab: key,
                buttonName: label
            }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 sm:mb-12"
        >
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-pink-500" />
                {t('postLibrary.title')}
            </h2>

            {/* Mobile View - Single Row */}
            <div className="grid grid-cols-4 gap-3 sm:gap-6 md:hidden">
                {postStats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.6 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center border border-gray-200/50 hover:bg-white transition-all shadow-sm hover:shadow-md group cursor-pointer"
                            onClick={() => handleNavigation(stat.key, stat.label)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleNavigation(stat.key);
                                }
                            }}
                        >
                            <motion.div
                                whileHover={{ rotate: 15 }}
                                className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${stat.label === 'Liked'
                                    ? 'bg-pink-100 text-pink-600'
                                    : 'bg-gray-100 text-gray-600'
                                    } group-hover:scale-110 transition-transform`}
                            >
                                <IconComponent className="w-4 h-4" />
                            </motion.div>
                            <p className="text-xs font-medium text-gray-800 mb-1">{stat.label}</p>
                            <p className={`text-lg font-bold ${stat.label === 'Liked' && stat.count > 0
                                ? 'text-pink-600'
                                : 'text-gray-400'
                                }`}>
                                {stat.count}
                            </p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Desktop View - Grid */}
            <div className="hidden md:grid md:grid-cols-4 gap-6">
                {postStats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.6 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-200/50 hover:bg-white transition-all shadow-sm hover:shadow-md group cursor-pointer"
                            onClick={() => handleNavigation(stat.key)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleNavigation(stat.key);
                                }
                            }}
                        >
                            <motion.div
                                whileHover={{ rotate: 15 }}
                                className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${stat.label === 'Liked'
                                    ? 'bg-pink-100 text-pink-600'
                                    : 'bg-gray-100 text-gray-600'
                                    } group-hover:scale-110 transition-transform`}
                            >
                                <IconComponent className="w-6 h-6" />
                            </motion.div>
                            <p className="text-sm font-medium text-gray-800 mb-1">{stat.label}</p>
                            <p className={`text-2xl font-bold ${stat.label === 'Liked' && stat.count > 0
                                ? 'text-pink-600'
                                : 'text-gray-400'
                                }`}>
                                {stat.count}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default PostLibrary;
