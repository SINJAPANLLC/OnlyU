import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Creator from './Ranking/Creators';
import RankingPosts from './Ranking/Posts';
import BottomNavigation from '../BottomNavigation';
import { useTranslation } from 'react-i18next';

const RankingPage = () => {
    const [activeTab, setActiveTab] = useState('Post');
    const [activeTimeFilter, setActiveTimeFilter] = useState('Daily');
    const { t } = useTranslation();

    const tabs = [
        { id: 'Post', label: t('rankingPage.tabs.post') },
        { id: 'Creator', label: t('rankingPage.tabs.creator') },
    ];
    const timeFilters = [
        { id: 'Daily', label: t('rankingPage.time.daily') },
        { id: 'Weekly', label: t('rankingPage.time.weekly') },
        { id: 'Monthly', label: t('rankingPage.time.monthly') },
        { id: 'AllTime', label: t('rankingPage.time.allTime') },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* ---------------- Header Tabs ---------------- */}
            <div className="bg-white border-gray-200 sticky top-0 z-50 h-12 flex items-center justify-center">
                <div className="max-w-6xl w-full flex items-center justify-center space-x-6 sm:space-x-8 px-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative text-base sm:text-lg font-medium transition-colors ${activeTab === tab.id ? 'text-pink-500' : 'text-gray-600'
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* ---------------- Time Filter Tabs ---------------- */}
            <div className="bg-white border-b border-gray-200 sticky top-12 z-40 h-10 flex items-center justify-center overflow-x-auto">
                <div className="max-w-6xl w-full flex items-center justify-center space-x-1 px-2">
                    {timeFilters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveTimeFilter(filter.id)}
                            className={`flex-shrink-0 px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-all ${activeTimeFilter === filter.id
                                ? 'bg-pink-100 text-pink-600 border border-pink-200'
                                : 'text-gray-600 hover:text-pink-500 hover:bg-gray-50'
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ---------------- Tab Content ---------------- */}
            <div className="pt-0">
                {activeTab === 'Post' && (
                    <div className="max-w-6xl mx-auto px-2 sm:px-4 pt-4">
                        <RankingPosts activeTimeFilter={activeTimeFilter} />
                    </div>
                )}
                {activeTab === 'Creator' && (
                    <div className="max-w-6xl mx-auto px-2 sm:px-4 pt-4">
                        <Creator activeTimeFilter={activeTimeFilter} />
                    </div>
                )}
            </div>

            {/* ---------------- Bottom Navigation ---------------- */}
            <BottomNavigation active="Ranking" />
        </div>
    );
};

export default RankingPage;
