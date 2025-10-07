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


const GenreSubcategoryPage = ({ selectedGenre, onBack, onSubcategorySelect }) => {
    // Information notices at the top
    const { t } = useTranslation();

    const notices = [
        { id: 1, title: t('notices.creditCard'), icon: Info },
        { id: 2, title: t('notices.termsUpdate'), icon: Info }
    ];


    // Genre data with subcategories
    const genreData = {
        appearance: {
            title: t('GenreCategory.appearance.title'),
            icon: User,
            subcategories: [
                { name: 'Large Breasts', posts: '97,902 posts' },
                { name: 'Beautiful Woman', posts: '66,327 posts' },
                { name: 'Beautiful Breasts', posts: '60,570 posts' },
                { name: 'Nipples', posts: '24,470 posts' },
                { name: 'Butt', posts: '23,472 posts' },
                { name: 'Small Breasts', posts: '18,726 posts' },
                { name: 'Chubby', posts: '17,467 posts' },
                { name: 'Slender', posts: '16,680 posts' },
                { name: 'Shaved', posts: '13,701 posts' },
                { name: 'Cute', posts: '11,804 posts' },
                { name: 'Pregnant', posts: '5,576 posts' },
                { name: 'Petite', posts: '4,676 posts' },
                { name: 'Muscles', posts: '3,770 posts' },
                { name: 'Virgin', posts: '2,227 posts' }
            ]
        },
        play: {
            title: 'Play',
            icon: Play,
            subcategories: [
                { name: 'Interactive Play', posts: '45,832 posts' },
                { name: 'Solo Performance', posts: '38,921 posts' },
                { name: 'Couple Activities', posts: '29,456 posts' },
                { name: 'Group Sessions', posts: '21,387 posts' },
                { name: 'Fetish Content', posts: '18,654 posts' },
                { name: 'Roleplay', posts: '16,789 posts' },
                { name: 'BDSM', posts: '14,235 posts' },
                { name: 'Vanilla Content', posts: '12,678 posts' },
                { name: 'Toys & Props', posts: '11,543 posts' },
                { name: 'Oil Massage', posts: '9,876 posts' },
                { name: 'Teasing', posts: '8,432 posts' },
                { name: 'Domination', posts: '7,654 posts' }
            ]
        },
        type: {
            title: 'Type',
            icon: Heart,
            subcategories: [
                { name: 'Amateur', posts: '52,143 posts' },
                { name: 'Professional', posts: '41,876 posts' },
                { name: 'Student', posts: '34,592 posts' },
                { name: 'Office Worker', posts: '28,743 posts' },
                { name: 'Housewife', posts: '25,689 posts' },
                { name: 'Model', posts: '22,154 posts' },
                { name: 'Teacher', posts: '18,432 posts' },
                { name: 'Nurse', posts: '16,789 posts' },
                { name: 'Maid', posts: '14,567 posts' },
                { name: 'Secretary', posts: '12,345 posts' },
                { name: 'Celebrity', posts: '9,876 posts' },
                { name: 'Influencer', posts: '8,432 posts' }
            ]
        },
        situation: {
            title: 'Situation',
            icon: MapPin,
            subcategories: [
                { name: 'Bedroom', posts: '48,932 posts' },
                { name: 'Bathroom', posts: '32,154 posts' },
                { name: 'Office', posts: '28,576 posts' },
                { name: 'Hotel Room', posts: '24,891 posts' },
                { name: 'Outdoor', posts: '21,437 posts' },
                { name: 'Kitchen', posts: '18,692 posts' },
                { name: 'Living Room', posts: '16,543 posts' },
                { name: 'Car', posts: '14,287 posts' },
                { name: 'Spa/Salon', posts: '12,156 posts' },
                { name: 'Pool', posts: '9,843 posts' },
                { name: 'Beach', posts: '8,576 posts' },
                { name: 'Public Place', posts: '6,432 posts' }
            ]
        },
        costume: {
            title: 'Costume',
            icon: Shirt,
            subcategories: [
                { name: 'School Uniform', posts: '42,765 posts' },
                { name: 'Lingerie', posts: '38,921 posts' },
                { name: 'Swimwear', posts: '31,456 posts' },
                { name: 'Nurse Outfit', posts: '26,789 posts' },
                { name: 'Maid Costume', posts: '23,654 posts' },
                { name: 'Business Suit', posts: '19,432 posts' },
                { name: 'Cosplay', posts: '17,891 posts' },
                { name: 'Casual Wear', posts: '15,678 posts' },
                { name: 'Sportswear', posts: '13,245 posts' },
                { name: 'Traditional Dress', posts: '11,567 posts' },
                { name: 'Wedding Dress', posts: '8,934 posts' },
                { name: 'Leather Outfit', posts: '7,432 posts' }
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
            onClick={() => onSubcategorySelect && onSubcategorySelect(subcategory)}
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
                        Load More Categories
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
            title: t('GenreCategory.appearance.title'),
            description: t('GenreCategory.appearance.description'),
            icon: User,
            color: 'text-pink-500'
        },
        {
            id: 'play',
            title: t('GenreCategory.play.title'),
            description: t('GenreCategory.play.description'),
            icon: Play,
            color: 'text-purple-500'
        },
        {
            id: 'type',
            title: t('GenreCategory.type.title'),
            description: t('GenreCategory.type.description'),
            icon: Heart,
            color: 'text-red-500'
        },
        {
            id: 'situation',
            title: t('GenreCategory.situation.title'),
            description: t('GenreCategory.situation.description'),
            icon: MapPin,
            color: 'text-blue-500'
        },
        {
            id: 'costume',
            title: t('GenreCategory.costume.title'),
            description: t('GenreCategory.costume.description'),
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
                                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-all aspect-square flex flex-col justify-center items-center text-center relative overflow-hidden"
                            >
                                {/* Background Logo */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                                    <img 
                                        src="/logo.webp" 
                                        alt="OnlyU Logo" 
                                        className="w-32 h-32 object-contain"
                                    />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        {category.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-tight">
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