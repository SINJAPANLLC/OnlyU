import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LanguageSettings = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const handleLanguageChange = (e) => {
        i18n.changeLanguage(e.target.value);
    };

    const languageOptions = {
        en: 'English',
        ja: '日本語 (Japanese)',
        zh: '中文 (Chinese)',
        ko: '한국어 (Korean)',
        fr: 'Français (French)',
        de: 'Deutsch (German)',
        // Add more languages as needed
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header with back button */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center">
                <button onClick={() => navigate(-1)} className="text-pink-600 mr-4">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-lg font-semibold">{t('languageSettings')}</h1>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="p-4 max-w-lg mx-auto"
            >
                {/* Notification banners */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-2 rounded">
                    <p className="text-blue-600 text-sm">{t('notification1')}</p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded">
                    <p className="text-blue-600 text-sm">{t('notification2')}</p>
                </div>

                {/* Language selector dropdown */}
                <select
                    value={i18n.language}
                    onChange={handleLanguageChange}
                    className="w-full border border-gray-300 rounded p-2 mb-6"
                >
                    {Object.entries(languageOptions).map(([code, name]) => (
                        <option key={code} value={code}>
                            {name}
                        </option>
                    ))}
                </select>
            </motion.div>
        </div>
    );
};

export default LanguageSettings;
