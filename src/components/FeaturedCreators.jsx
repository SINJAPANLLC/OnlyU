import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { featuredCreators } from '../data/constants';

const FeaturedCreators = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % featuredCreators.length);
        }, 4000);

        return () => clearInterval(timer);
    }, []); // <-- Remove featuredCreators.length

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % featuredCreators.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + featuredCreators.length) % featuredCreators.length);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 sm:mb-12 mt-8 sm:mt-12"
        >
            {/* Desktop View */}
            <div className="hidden md:grid md:grid-cols-3 gap-6">
                {featuredCreators.map((creator, index) => (
                    <motion.div
                        key={creator.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        className="relative group cursor-pointer"
                    >
                        <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                            <div className="w-full h-full bg-gradient-to-br from-pink-200 to-purple-300 flex items-center justify-center">
                                <img 
                                    src="/logo.webp" 
                                    alt="OnlyU Logo" 
                                    className="w-24 h-24 object-contain"
                                />
                            </div>



                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Mobile Slider */}
            <div className="relative md:hidden">
                <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 300 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -300 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                        >
                            <div className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                                <div className="w-full h-full bg-gradient-to-br from-pink-200 to-purple-300 flex items-center justify-center">
                                    <img 
                                        src="/logo.webp" 
                                        alt="OnlyU Logo" 
                                        className="w-24 h-24 object-contain"
                                    />
                                </div>


                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 z-30"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 z-30"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-5 h-5 text-white" />
                </button>

                {/* Slider Dots */}
                <div className="flex justify-center mt-4 space-x-2">
                    {featuredCreators.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-pink-500 w-6' : 'bg-gray-300'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default FeaturedCreators;