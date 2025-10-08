import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BottomNavigation from '../../BottomNavigation';
import {
    ArrowLeft,
    ChevronRight,
    Info,
    User,
    Play,
    Heart,
    MapPin,
    Shirt
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';


const GenreSubcategoryPage = ({ selectedGenre, onBack, onSubcategorySelect }) => {
    // Information notices at the top
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleSubcategoryClick = (genreName) => {
        navigate(`/genre/${encodeURIComponent(genreName)}`);
    };

    const notices = [
        { id: 1, title: t('notices.creditCard'), icon: Info },
        { id: 2, title: t('notices.termsUpdate'), icon: Info }
    ];


    // Genre data with subcategories
    const genreData = {
        appearance: {
            title: 'ビジュアル',
            icon: User,
            subcategories: [
                { name: 'ロリ顔', posts: '97,902 posts' },
                { name: '地味顔', posts: '66,327 posts' },
                { name: 'ギャル', posts: '60,570 posts' },
                { name: 'お姉さん', posts: '24,470 posts' },
                { name: '熟女', posts: '23,472 posts' },
                { name: 'デカ尻', posts: '18,726 posts' },
                { name: '巨乳', posts: '17,467 posts' },
                { name: '貧乳', posts: '16,680 posts' },
                { name: '入れ墨', posts: '13,701 posts' }
            ]
        },
        play: {
            title: 'プレイ',
            icon: Play,
            subcategories: [
                { name: '正常位', posts: '11,804 posts' },
                { name: '騎乗位', posts: '5,576 posts' },
                { name: 'バック', posts: '4,676 posts' },
                { name: '種付けプレス', posts: '3,770 posts' },
                { name: 'フェラチオ', posts: '2,227 posts' },
                { name: 'パイずり', posts: '1,500 posts' },
                { name: '中だし', posts: '1,200 posts' },
                { name: '顔射', posts: '1,000 posts' },
                { name: '言葉責め', posts: '900 posts' },
                { name: 'クンニ', posts: '800 posts' },
                { name: '玩具', posts: '700 posts' },
                { name: '潮吹き（女）', posts: '600 posts' },
                { name: 'アナル', posts: '500 posts' },
                { name: '企画', posts: '400 posts' }
            ]
        },
        situation: {
            title: 'シチュエーション',
            icon: MapPin,
            subcategories: [
                { name: '複数プレイ', posts: '350 posts' },
                { name: '女性優位', posts: '300 posts' },
                { name: '寝取られ', posts: '280 posts' },
                { name: '野外・露出', posts: '250 posts' },
                { name: 'オナニー', posts: '220 posts' },
                { name: 'ハメ撮り', posts: '200 posts' },
                { name: 'コスプレ', posts: '180 posts' },
                { name: '主観', posts: '160 posts' },
                { name: '盗撮', posts: '140 posts' },
                { name: 'レイプ', posts: '120 posts' },
                { name: 'ＧＬ', posts: '100 posts' },
                { name: 'ＢＬ', posts: '90 posts' }
            ]
        },
        abnormal: {
            title: 'アブノーマル',
            icon: Heart,
            subcategories: [
                { name: '緊縛', posts: '80 posts' },
                { name: '浣腸', posts: '70 posts' },
                { name: '調教', posts: '60 posts' },
                { name: '拡張', posts: '50 posts' },
                { name: '殴打', posts: '40 posts' },
                { name: '女装・男の娘', posts: '35 posts' },
                { name: '潮吹き（男）', posts: '30 posts' },
                { name: '尿道', posts: '25 posts' },
                { name: 'その他フェチ', posts: '20 posts' }
            ]
        },
        other: {
            title: 'その他',
            icon: Shirt,
            subcategories: [
                { name: '会いに行ける', posts: '15 posts' },
                { name: 'イベント', posts: '12 posts' },
                { name: 'HowTo', posts: '10 posts' },
                { name: 'ASMR', posts: '8 posts' }
            ]
        }
    };

    // Get current genre data or default
    const currentGenre = genreData[selectedGenre] || genreData.appearance;

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

    const SubcategoryItem = ({ subcategory }) => (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSubcategoryClick(subcategory.name)}
            className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all duration-200 hover:border-pink-200"
        >
            <div className="flex-1">
                <h3 className="text-base font-medium text-pink-600 mb-1">
                    {subcategory.name}
                </h3>
                <p className="text-sm text-gray-600">
                    {subcategory.posts}
                </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
        </motion.div>
    );

    return (
        <div className="max-w-4xl mx-auto bg-gray-50 min-h-screen">
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
                            <currentGenre.icon className="w-5 h-5 text-pink-500" />
                            <h1 className="text-lg font-semibold text-gray-800">
                                {currentGenre.title}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 py-6">

                {/* Subcategories Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mb-6">
                    {currentGenre.subcategories.map((subcategory, index) => (
                        <motion.div
                            key={subcategory.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            <SubcategoryItem subcategory={subcategory} />
                        </motion.div>
                    ))}
                </div>

                {/* Load More Button */}
                <div className="text-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-pink-500 text-white px-8 py-3 rounded-full font-medium hover:bg-pink-600 transition-colors shadow-lg"
                    >
                        さらにカテゴリを読み込む
                    </motion.button>
                </div>
            </div>

            {/* Bottom Navigation Placeholder */}
            <div className="h-20"></div>
        </div>
    );
};

// Main component that handles navigation between genre list and subcategory pages
const GenreNavigationSystem = () => {
    const [currentPage, setCurrentPage] = useState('list'); // 'list' or 'subcategory'
    const [selectedGenre, setSelectedGenre] = useState('appearance');

    const { t } = useTranslation();
    // Genre categories for the main list
    const genreCategories = [
        {
            id: 'appearance',
            title: 'ビジュアル',
            description: 'ロリ顔、地味顔、ギャルなど出演者の属性に応じたジャンル',
            icon: User,
            color: 'text-pink-500'
        },
        {
            id: 'play',
            title: 'プレイ',
            description: '騎乗位、フェラチオなどプレイ内容に応じたジャンル',
            icon: Play,
            color: 'text-purple-500'
        },
        {
            id: 'situation',
            title: 'シチュエーション',
            description: '複数プレイ、野外・露出など撮影状況に応じたジャンル',
            icon: MapPin,
            color: 'text-blue-500'
        },
        {
            id: 'abnormal',
            title: 'アブノーマル',
            description: '緊縛、調教など特殊なプレイに応じたジャンル',
            icon: Heart,
            color: 'text-red-500'
        },
        {
            id: 'other',
            title: 'その他',
            description: '会いに行ける、イベントなどその他のジャンル',
            icon: Shirt,
            color: 'text-green-500'
        }
    ];


    const handleGenreSelect = (genreId) => {
        setSelectedGenre(genreId);
        setCurrentPage('subcategory');
    };

    const handleBackToList = () => {
        setCurrentPage('list');
    };

    const handleSubcategorySelect = (subcategory) => {
        console.log('Selected subcategory:', subcategory);
        // Handle subcategory selection here
    };

    if (currentPage === 'subcategory') {
        return (
            <GenreSubcategoryPage
                selectedGenre={selectedGenre}
                onBack={handleBackToList}
                onSubcategorySelect={handleSubcategorySelect}
            />
        );
    }

    // Genre List Page
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


    return (
        <div className="max-w-2xl mx-auto bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => window.history.back()}
                            className="p-2 hover:bg-gray-100 rounded-full"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </motion.button>
                        <h1 className="text-lg font-semibold text-gray-800">
                            {t('GenreCategory.listTitle')}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 py-6">

                {/* Categories */}
                <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            {t('GenreCategory.browseByCategory')}
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {genreCategories.map((category) => (
                            <motion.div
                                key={category.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleGenreSelect(category.id)}
                                className="relative rounded-lg p-4 shadow-lg cursor-pointer hover:shadow-xl transition-all aspect-square flex flex-col justify-center items-center text-center overflow-hidden"
                                style={{
                                    backgroundImage: `linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(236, 72, 153, 0.9)), url('/logo.webp')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundBlendMode: 'multiply'
                                }}
                            >
                                {/* 浮き出し効果のためのテキストシャドウ */}
                                <div className="relative z-10">
                                    <h3 
                                        className="text-xl font-bold mb-2 text-white"
                                        style={{
                                            textShadow: '2px 2px 4px rgba(0,0,0,0.5), -1px -1px 2px rgba(255,255,255,0.3)',
                                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                                        }}
                                    >
                                        {category.title}
                                    </h3>
                                    <p 
                                        className="text-sm leading-tight text-white"
                                        style={{
                                            textShadow: '1px 1px 3px rgba(0,0,0,0.5), -1px -1px 1px rgba(255,255,255,0.2)',
                                            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
                                        }}
                                    >
                                        {category.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Navigation Placeholder */}
            <BottomNavigation active="Ranking" />
            <div className="h-20"></div>
        </div>
    );
};

export default GenreNavigationSystem;