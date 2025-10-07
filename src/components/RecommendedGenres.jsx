import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star } from 'lucide-react';
import { genreData } from '../data/constants';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const RecommendedGenres = ({ likedItems, toggleLike }) => {
    const navigate = useNavigate();
    const handleGenreClick = (genreName) => {
        navigate(`/genre/${encodeURIComponent(genreName)}`);
    };
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-12"
        >
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-pink-500" />
                {t('genres.title')}
            </h2>

            {/* Responsive 2-column square grid for all screen sizes */}
            <div className="grid grid-cols-2 gap-3">
                {genreData.map((genre, index) => (
                    <motion.div
                        key={genre.name}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.8 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleGenreClick(genre.name)}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all group aspect-square flex flex-col"
                    >
                        {/* Thumbnail */}
                        <div className="relative flex-1 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                            <img 
                                src="/logo.webp" 
                                alt="OnlyU Logo" 
                                className="w-16 h-16 object-contain"
                            />
                        </div>
                        
                        {/* Content */}
                        <div className="p-3 flex-shrink-0">
                            <h3 className="font-semibold text-gray-800 text-sm text-center mb-1">
                                {t(`genres.${genre.nameKey}`)}
                            </h3>
                            <p className="text-xs text-gray-500 text-center">
                                {genre.count.toLocaleString()} Videos
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/GenreNavigationSystem')}
                className="w-full mt-6 border border-pink-500 text-pink-600 rounded-full py-3 font-medium hover:bg-pink-50 transition-all shadow-sm text-sm sm:text-base flex items-center justify-center gap-2"
            >
                {t('genres.SeeMore')} <ChevronRight className="w-4 h-4" />
            </motion.button>
        </motion.div>
    );
};

export default RecommendedGenres;
