import React, { useState } from 'react';
import { Bell, Search, Users } from 'lucide-react';
import GenderSelectionModal from './GenderModal';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t, i18n } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGender, setSelectedGender] = useState('General Adult');
    const navigate = useNavigate();

    const handleGenderSelect = (gender) => setSelectedGender(gender.label);
    const handleConfirm = (gender) => console.log('Selected gender preference:', gender);

    // Languages you want to allow quick switching
    const languageOptions = [
        { code: 'en', label: 'EN' },
        { code: 'ja', label: '日本語' },
    ];


    return (
        <>
            <header className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center">
                        <img
                            src="logo.webp"
                            alt="Fans Hub Logo"
                            className="h-6 w-auto object-contain sm:h-14"
                        />
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {/* ✅ Language Switcher */}
                        <div className="flex items-center bg-gray-100 rounded-full p-1">
                            {languageOptions.map(({ code, label }) => (
                                <button
                                    key={code}
                                    onClick={() => {
                                        i18n.changeLanguage(code).then(() => {
                                            window.location.reload(); //reload after language change
                                        });
                                    }}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${i18n.language === code
                                        ? 'bg-pink-500 text-white shadow-sm'
                                        : 'text-gray-600 hover:text-pink-500'
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        {/* Gender Selection Button */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:shadow-lg transform transition-all hover:scale-105 text-sm font-medium"
                        >
                            <Users className="w-4 h-4" />
                        </button>

                        <button
                            className="p-2 hover:bg-pink-50 rounded-full transition-colors relative"
                            onClick={() => navigate('/notifications')}
                        >
                            <Bell className="w-5 h-5 text-gray-600" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                        </button>

                        <button
                            className="p-2 hover:bg-pink-50 rounded-full transition-colors"
                            onClick={() => navigate('/search')}
                        >
                            <Search className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Gender Selection Modal */}
            <GenderSelectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedGender={selectedGender}
                onGenderSelect={handleGenderSelect}
                onConfirm={handleConfirm}
            />
        </>
    );
};

export default Header;
