import React from 'react';
import { motion } from 'framer-motion';
import { Settings, FileText, MoreHorizontal, CreditCard, UserCheck, Lock, BarChart, PenTool, Video } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../BottomNavigation';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';


const LoggedInAccountPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = React.useState(false);


    // You can replace these with actual user data
    const user = {
        name: currentUser?.displayName || 'User Name',
        profileUrl: '/profile/dumm',
        avatar: '/logo.webp',
        subscriptionStatus: t('account.purchaseSave.notSubscribed'),
    };

    const handleNavigation = (path) => {
        if (path === 'home') navigate('/');
        else if (path === 'feed') navigate('/feed');
        else if (path === 'messages') navigate('/messages');
        else if (path === 'ranking') navigate('/rankingpage');
        else if (path === 'account') navigate('/account');
        else if (path === '/logout') {/* Implement logout logic here */ navigate('/login'); }
        else if (path === '/register-creator') navigate('/register-creator');
        else if (path === '/creator-dashboard') navigate('/creator-dashboard');
        else if (path) navigate(path);
        else if (path === 'languages') navigate('/settings/language');
        else if (path === 'switch-account') navigate('/login');
        else navigate('/');
    };

    const handleCreatePost = () => {
        navigate('/create-post');
    };

    const [showModal] = React.useState(false);

    // const handleCancel = () => {
    //     setShowModal(true);
    // };

    const handleRegisterModal = () => {
        navigate('/register-creator');
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('ageVerified');
            console.log("User logged out successfully");
            navigate('/login');
        } catch (error) {
            console.error("Logout error:", error.message);
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="min-h-screen bg-white pb-20"
            >
                {/* User profile section */}
                <div className="flex items-center p-4 space-x-4">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full bg-gray-300"
                    />
                    <div>
                        <p className="font-semibold">{user.name}</p>
                        <button
                            className="text-sm text-blue-600 underline"
                            onClick={() => navigate('/profile/dumm')}
                        >
                            {t('account.viewProfile')}
                        </button>
                    </div>
                </div>

                {/* Creator Dashboard Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg shadow-md p-4 mx-4 mb-6 flex items-center justify-between"
                >
                    <div className="flex items-center space-x-3">
                        <h2 className="text-white text-lg font-semibold">{t('account.creatorDashboard.title')}</h2>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 hover:bg-opacity-30 transition-all"
                        onClick={() => handleNavigation('/creator-dashboard')}
                    >
                        <BarChart className="w-4 h-4" />
                        <span>{t('account.creatorDashboard.analysis')}</span>
                    </motion.button>
                </motion.div>

                {/* Purchase/Save Section */}
                <div className="px-4">
                    <h2 className="flex items-center font-bold text-lg mb-3">
                        <CreditCard className="mr-2" /> {t('account.purchaseSave.title')}
                    </h2>
                    <div className="border rounded-lg divide-y divide-gray-200">
                        <button className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 w-full text-gray-800" onClick={() => handleNavigation('/high-quality-plan')}
                        >
                            <span>高画質プラン</span>
                            <span className="text-pink-600">未加入</span>
                        </button>
                        <button className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 w-full text-gray-800" onClick={() => handleNavigation('/current-plan')}>加入中のプラン</button>
                        <button className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 w-full text-gray-800" onClick={() => handleNavigation('/payment-methods')}>支払い方法</button>
                        <button className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 w-full text-gray-800" onClick={() => handleNavigation('/purchase-history')}>購入履歴</button>
                        <button className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 w-full text-gray-800" onClick={() => handleNavigation('/coupons')}>クーポン一覧</button>
                    </div>
                </div>

                {/* Posts/Operations/Sales Section */}
                <div className="px-4 mt-8">
                    <h2 className="flex items-center font-bold text-lg mb-1">
                        <UserCheck className="mr-2" /> {t('account.postsOperations.title')}
                    </h2>
                    <p className="text-gray-500 text-sm mb-3">
                        {t('account.postsOperations.description')}
                    </p>
                    <button className="block w-full text-left px-4 py-3 border border-gray-200 rounded hover:bg-gray-50 text-gray-800" onClick={() => handleNavigation('/register-creator')}>{t('account.postsOperations.registerCreator')}</button>
                    
                    {/* Creator Management Features */}
                    <div className="mt-4 space-y-2">
                        <button 
                            className="block w-full text-left px-4 py-3 border border-gray-200 rounded hover:bg-gray-50 text-gray-800" 
                            onClick={() => handleNavigation('/exclusive-creator-registration')}
                        >
                            Only-U独占クリエイター登録
                        </button>
                        <button 
                            className="block w-full text-left px-4 py-3 border border-gray-200 rounded hover:bg-gray-50 text-gray-800" 
                            onClick={() => handleNavigation('/creator-ranking')}
                        >
                            クリエイターランキング
                        </button>
                        <button 
                            className="block w-full text-left px-4 py-3 border border-gray-200 rounded hover:bg-gray-50 text-gray-800" 
                            onClick={() => handleNavigation('/active-plans')}
                        >
                            運営中のプラン
                        </button>
                        <button 
                            className="block w-full text-left px-4 py-3 border border-gray-200 rounded hover:bg-gray-50 text-gray-800" 
                            onClick={() => handleNavigation('/my-posts')}
                        >
                            あなたの投稿
                        </button>
                        <button 
                            className="block w-full text-left px-4 py-3 border border-gray-200 rounded hover:bg-gray-50 text-gray-800" 
                            onClick={() => handleNavigation('/post-comments')}
                        >
                            投稿へのコメント
                        </button>
                        <button 
                            className="block w-full text-left px-4 py-3 border border-gray-200 rounded hover:bg-gray-50 text-gray-800" 
                            onClick={() => handleNavigation('/sales-management')}
                        >
                            売上管理
                        </button>
                        <button 
                            className="block w-full text-left px-4 py-3 border border-gray-200 rounded hover:bg-gray-50 text-gray-800" 
                            onClick={() => handleNavigation('/bank-account-registration')}
                        >
                            振込先口座の登録
                        </button>
                        <button 
                            className="block w-full text-left px-4 py-3 border border-gray-200 rounded hover:bg-gray-50 text-gray-800" 
                            onClick={() => handleNavigation('/transfer-request')}
                        >
                            振込申請
                        </button>
                        <button 
                            className="block w-full text-left px-4 py-3 border border-gray-200 rounded hover:bg-gray-50 text-gray-800" 
                            onClick={() => handleNavigation('/coupon-management')}
                        >
                            クーポン管理
                        </button>
                    </div>
                </div>

                {/* Settings Section */}
                <div className="px-4 mt-8">
                    <h2 className="flex items-center font-bold text-lg mb-3">
                        <Settings className="mr-2" /> {t('account.settings.title')}
                    </h2>

                    <div className="border rounded-lg divide-y divide-gray-200">
                        <button className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 w-full text-gray-800" onClick={() => handleNavigation('/settings/languages')}>{t('account.settings.language')}</button>
                        <div className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 w-full text-gray-800">
                            <span>{t('account.settings.rejectMessage')}</span>
                            <label className="inline-flex relative items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-pink-600"></div>
                                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
                            </label>
                            <span className="ml-2 cursor-help text-gray-400" title="Toggle to reject incoming messages.">?</span>
                        </div>
                        <button className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 w-full text-gray-800" onClick={() => handleNavigation('/settings/email-notifications')}>{t('account.settings.emailNotifications')}</button>
                        <button className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 w-full text-gray-800" onClick={() => handleNavigation('/settings/follow-list')}>{t('account.settings.following')}</button>
                        <button className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 w-full text-gray-800" onClick={() => handleNavigation('/settings/blocked-users')}>{t('account.settings.blockedUsers')}</button>
                        <button className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 w-full text-gray-800" onClick={() => handleNavigation('/settings/personal-info')}>{t('account.settings.personalInfo')}</button>
                        <button className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 w-full text-gray-800" onClick={() => handleNavigation('/settings/phone-verification')}>{t('account.settings.phoneVerification')}</button>
                        <button className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 w-full text-gray-800" onClick={() => handleNavigation('/settings/email-verification')}>{t('account.settings.emailVerification')}</button>
                        <button className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 w-full text-gray-800" onClick={() => navigate('/settings/notifications')}>{t('account.settings.notices')}</button>
                    </div>
                </div>

                {/* About myfans Section */}
                <div className="px-4 mt-8">
                    <h2 className="flex items-center font-bold text-lg mb-3">
                        <FileText className="mr-2" /> {t('account.about.title')}
                    </h2>

                    <div className="border rounded-lg divide-y divide-gray-200">
                        <button className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 w-full text-gray-800" onClick={() => handleNavigation('/terms')}>{t('account.about.terms')}</button>
                        <button className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 w-full text-gray-800" onClick={() => handleNavigation('/privacy')}>{t('account.about.privacy')}</button>
                        <button className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 w-full text-gray-800" onClick={() => handleNavigation('/legal')}>{t('account.about.legal')}</button>
                        <button className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 w-full text-gray-800" onClick={() => handleNavigation('/guidelines')}>{t('account.about.guidelines')}</button>
                        <button className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 w-full text-gray-800" onClick={() => handleNavigation('/settings/help')}>{t('account.about.help')}</button>
                    </div>
                </div>

                {/* Other reasons Section */}
                <div className="px-4 mt-8">
                    <h2 className="flex items-center font-bold text-lg mb-3">
                        <MoreHorizontal className="mr-2" /> {t('account.other.title')}
                    </h2>
                    <div className="border rounded-lg divide-y divide-gray-200">
                        <button className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 w-full text-gray-800" onClick={() => handleNavigation('/switch-account')}>{t('account.other.switchAccount')}</button>
                        <button className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 w-full text-gray-800"
                            onClick={() => setShowLogoutModal(true)}
                        >{t('account.other.logout')}</button>
                    </div>
                </div>
            </motion.div>

            {/* Floating Create Button - visible only when logged in */}
            <button
                onClick={handleCreatePost}
                className="fixed bottom-20 right-6 bg-pink-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg z-50 hover:bg-pink-700 transition-all duration-200 hover:scale-105"
                aria-label="Create new post"
            >
                <Video className="w-6 h-6" />
            </button>

            <AnimatePresence>
                {showLogoutModal && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    >
                        <div className="bg-white rounded-2xl p-6 w-80 shadow-xl">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                {t('account.other.logoutConfirmTitle') || 'Log out?'}
                            </h2>
                            <p className="text-sm text-gray-600 mb-6">
                                {t('account.other.logoutConfirmText') || 'Are you sure you want to log out?'}
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowLogoutModal(false)}
                                    className="px-4 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-100"
                                >
                                    {t('account.other.cancel') || 'Cancel'}
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm rounded-lg bg-pink-600 text-white hover:bg-pink-700"
                                >
                                    {t('account.other.confirm') || 'Log out'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
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
                            Register as a creator
                        </button>
                        <button
                            onClick={handleCreatePost}
                            className="bg-gray-600 text-white py-2 rounded-full w-full font-semibold mt-3"
                        >
                            Skip for now
                        </button>
                    </motion.div>
                )}
                <BottomNavigation onNavigate={handleNavigation} active="account" />
            </AnimatePresence>

        </>
    );

};

export default LoggedInAccountPage;
