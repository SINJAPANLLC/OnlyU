import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, FileText, MoreHorizontal, ChevronRight, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigationWithCreator from '../BottomNavigationWithCreator';
import { t } from 'i18next';

const AccountPage = () => {
    const navigate = useNavigate();

    const [showModal, setShowModal] = React.useState(false);

    const handleCancel = () => {
        setShowModal(true);
    }
    const handleRegisterModal = () => {
        setShowModal(true);
    }
    const handleNavigation = (path) => {
        if (path === 'home') {
            navigate('/');
        } else if (path === 'feed') {
            navigate('/feed');
        } else if (path === 'messages') {
            navigate('/messages');
        } else if (path === 'ranking') {
            navigate('/rankingpage');
        } else if (path === 'account') {
            navigate('/account');
        } else {
            navigate('/');
        }
    };

    const handleCreatePost = () => {
        navigate('/create-post');
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="min-h-screen bg-gray-50 pb-20"
            >
                {/* Blue notification banners */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white text-xs">i</span>
                            </div>
                            <p className="text-sm text-blue-800">
                                {t('AccountPage.paymenttitle')}
                            </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-blue-400" />
                    </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white text-xs">i</span>
                            </div>
                            <p className="text-sm text-blue-800">{t('AccountPage.noticeterm')}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-blue-400" />
                    </div>
                </div>

                <div className="px-4 space-y-8">
                    {/* Settings Section */}
                    <div>
                        <div className="flex items-center mb-4">
                            <Settings className="w-5 h-5 mr-2 text-gray-700" />
                            <h2 className="text-lg font-bold text-gray-900">{t('AccountPage.settings')}</h2>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200">
                            <button
                                className="w-full px-4 py-4 flex justify-between items-center text-gray-800 hover:bg-gray-50"
                                onClick={() => navigate('/settings')}
                            >
                                <span className="font-medium">設定</span>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                    </div>

                    {/* Account Management Section */}
                    <div>
                        <div className="flex items-center mb-4">
                            <Users className="w-5 h-5 mr-2 text-gray-700" />
                            <h2 className="text-lg font-bold text-gray-900">アカウント管理</h2>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200">
                            <button
                                className="w-full px-4 py-4 flex justify-between items-center text-gray-800 hover:bg-gray-50"
                                onClick={() => navigate('/switch-account')}
                            >
                                <span className="font-medium">アカウントを切り替える</span>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                    </div>

                    {/* About myfans Section */}
                    <div>
                        <div className="flex items-center mb-4">
                            <FileText className="w-5 h-5 mr-2 text-gray-700" />
                            <h2 className="text-lg font-bold text-gray-900">{t('AccountPage.aboutonlyu')}</h2>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
                            <button
                                className="w-full px-4 py-4 flex justify-between items-center text-gray-800 hover:bg-gray-50"
                                onClick={() => navigate('/terms')}
                            >
                                <span className="font-medium">Terms of Use</span>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </button>
                            <button
                                className="w-full px-4 py-4 flex justify-between items-center text-gray-800 hover:bg-gray-50"
                                onClick={() => navigate('/privacy')}
                            >
                                <span className="font-medium">Privacy Policy</span>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </button>
                            <button
                                className="w-full px-4 py-4 flex justify-between items-center text-gray-800 hover:bg-gray-50"
                                onClick={() => navigate('/legal')}
                            >
                                <span className="font-medium">Legal Notice</span>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </button>
                            <button
                                className="w-full px-4 py-4 flex justify-between items-center text-gray-800 hover:bg-gray-50"
                                onClick={() => navigate('/guidelines')}
                            >
                                <span className="font-medium">Content Guidelines</span>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </button>
                            <button
                                className="w-full px-4 py-4 flex justify-between items-center text-gray-800 hover:bg-gray-50"
                                onClick={() => navigate('/settings/help')}
                            >
                                <span className="font-medium">Help</span>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                    </div>

                    {/* Other reasons Section */}
                    <div>
                        <div className="flex items-center mb-4">
                            <MoreHorizontal className="w-5 h-5 mr-2 text-gray-700" />
                            <h2 className="text-lg font-bold text-gray-900">Other reasons</h2>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200">
                            <button
                                className="w-full px-4 py-4 flex justify-between items-center text-gray-800 hover:bg-gray-50"
                                onClick={() => navigate('/login')}
                            >
                                <span className="font-medium">Log in</span>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Floating Create Button - Only show when user is logged in */}
            <button
                // onClick={handleCreatePost}
                onClick={handleCancel}
                className="fixed bottom-20 right-6 bg-pink-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg z-50 hover:bg-pink-700 transition-all duration-200 hover:scale-105"
                aria-label="Create new post"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                </svg>
            </button>
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className="absolute top-1/2 left-1 transform -translate-x-1/2 bg-white rounded-3xl max-w-xs w-full p-6 m-3 shadow-lg"
                    >
                        <p className="text-gray-900 font-semibold mb-6">
                            <strong>You need to register as a creator to publish a post</strong>
                        </p>
                        <button
                            onClick={handleRegisterModal}
                            className="bg-pink-600 text-white py-2 rounded-full w-full font-semibold"
                        >
                            Registor as a creator
                        </button>
                        <button
                            onClick={handleCreatePost}
                            className="bg-gray-600 text-white py-2 rounded-full w-full font-semibold mt-3"
                        >
                            Skip for now
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <BottomNavigationWithCreator activeTab="Account" handleNavigation={handleNavigation} />
        </>
    );
};

export default AccountPage;
