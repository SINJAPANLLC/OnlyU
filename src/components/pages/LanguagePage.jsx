import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BottomNavigation from '../BottomNavigation';

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
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center z-10">
                <button 
                    onClick={() => navigate(-1)} 
                    className="text-pink-600 mr-4"
                >
                    <ArrowLeft size={24} />
                </button>
                <div className="flex items-center">
                    <Globe className="w-6 h-6 text-gray-700 mr-2" />
                    <h1 className="text-lg font-semibold text-gray-900">言語設定</h1>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Language Selection */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl p-6 shadow-sm"
                >
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Globe className="w-5 h-5 mr-2" />
                        表示言語の選択
                    </h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                現在の言語
                            </label>
                            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span className="font-medium text-gray-900">
                                    {languageOptions[i18n.language]}
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                言語を変更
                            </label>
                            <select
                                value={i18n.language}
                                onChange={handleLanguageChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
                            >
                                {Object.entries(languageOptions).map(([code, name]) => (
                                    <option key={code} value={code}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </motion.div>

                {/* Language Information */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-sm"
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">対応言語について</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(languageOptions).map(([code, name]) => (
                            <div key={code} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                                    <Globe className="w-4 h-4 text-pink-600" />
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">{name}</div>
                                    <div className="text-sm text-gray-500">コード: {code.toUpperCase()}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Help Information */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-blue-50 border border-blue-200 rounded-xl p-4"
                >
                    <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-blue-900 mb-1">言語設定について</h4>
                            <p className="text-sm text-blue-700 mb-2">
                                選択した言語でアプリ全体の表示が変更されます。
                            </p>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li>• メニューやボタンのテキスト</li>
                                <li>• エラーメッセージ</li>
                                <li>• 通知メッセージ</li>
                                <li>• 設定項目の説明</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>

            <BottomNavigation />
        </div>
    );
};

export default LanguageSettings;
