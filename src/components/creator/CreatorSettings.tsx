import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Bell, 
  Shield, 
  Palette, 
  DollarSign, 
  Users, 
  Camera,
  Save,
  Edit,
  BarChart3,
  Globe,
  CheckCircle
} from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const CreatorSettings = () => {
  const authContext = useContext(AuthContext);
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showLanguageSuccess, setShowLanguageSuccess] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  // Debug: Log when language changes
  useEffect(() => {
    console.log('Creator Settings language changed to:', language);
  }, [language]);

  const handleLanguageChange = (newLanguage: 'en' | 'ja') => {
    setLanguage(newLanguage);
    setShowLanguageSuccess(true);
    setTimeout(() => setShowLanguageSuccess(false), 3000);
  };

  if (!authContext) return null;
  const { user } = authContext;

  const sections = [
    { id: 'profile', label: t('settings.profile'), icon: Users },
    { id: 'content', label: t('creator.settings.contentSettings'), icon: Palette },
    { id: 'notifications', label: t('settings.notifications'), icon: Bell },
    { id: 'privacy', label: t('settings.privacy'), icon: Shield },
    { id: 'monetization', label: t('creator.settings.monetization'), icon: DollarSign },
    { id: 'language', label: t('settings.language'), icon: Globe },
    { id: 'analytics', label: t('creator.statistics.overview'), icon: BarChart3 }
  ];

  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || '',
    username: user?.username || '',
    bio: 'Fashion and lifestyle content creator. Sharing daily inspiration and behind-the-scenes moments.',
    website: 'https://yuki-creator.com',
    location: 'Tokyo, Japan',
    category: 'Fashion & Lifestyle'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    newFollowers: true,
    newLikes: true,
    newComments: true,
    newTips: true,
    marketingEmails: false,
    weeklyReports: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showOnlineStatus: true,
    allowDirectMessages: true,
    allowComments: true,
    showFollowerCount: true
  });

  const [monetizationSettings, setMonetizationSettings] = useState({
    enableTips: true,
    enableSubscriptions: true,
    subscriptionPrice: 9.99,
    tipMinimum: 1.00,
    autoApproveTips: true
  });

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('creator.settings.title')}</h1>
            <p className="text-gray-600">{t('creator.settings.subtitle')}</p>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-xl border border-gray-200 p-4">
            <div className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-pink-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6">
            <AnimatePresence mode="wait">
              {activeSection === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">{t('creator.settings.profileSettings')}</h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center space-x-2 px-4 py-2 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span>{isEditing ? t('settings.cancel') : t('creator.settings.edit')}</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={user?.avatar || 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'}
                          alt="Profile"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                        {isEditing && (
                          <button className="absolute -bottom-1 -right-1 p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors">
                            <Camera className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{t('creator.settings.profilePicture')}</h3>
                        <p className="text-sm text-gray-600">{t('creator.settings.uploadNewPicture')}</p>
                      </div>
                    </div>

                    {/* Profile Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('creator.profile.displayName')}</label>
                        <input
                          type="text"
                          value={profileData.displayName}
                          onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('creator.profile.username')}</label>
                        <input
                          type="text"
                          value={profileData.username}
                          onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-50"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('creator.profile.bio')}</label>
                        <textarea
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                          disabled={!isEditing}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('creator.profile.website')}</label>
                        <input
                          type="url"
                          value={profileData.website}
                          onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('creator.profile.location')}</label>
                        <input
                          type="text"
                          value={profileData.location}
                          onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-50"
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          {t('settings.cancel')}
                        </button>
                        <button
                          onClick={() => {
                            setIsSaving(true);
                            setTimeout(() => {
                              setIsSaving(false);
                              setIsEditing(false);
                            }, 1000);
                          }}
                          className="flex items-center space-x-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeSection === 'notifications' && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold text-gray-900">Notification Settings</h2>
                  <div className="space-y-4">
                    {Object.entries(notificationSettings).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {key === 'newFollowers' && 'Get notified when someone follows you'}
                            {key === 'newLikes' && 'Get notified when someone likes your content'}
                            {key === 'newComments' && 'Get notified when someone comments on your posts'}
                            {key === 'newTips' && 'Get notified when you receive tips'}
                            {key === 'marketingEmails' && 'Receive marketing and promotional emails'}
                            {key === 'weeklyReports' && 'Receive weekly performance reports'}
                          </p>
                        </div>
                        <button
                          onClick={() => setNotificationSettings({
                            ...notificationSettings,
                            [key]: !value
                          })}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            value ? 'bg-pink-500' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeSection === 'privacy' && (
                <motion.div
                  key="privacy"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold text-gray-900">Privacy & Security</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
                      <select
                        value={privacySettings.profileVisibility}
                        onChange={(e) => setPrivacySettings({
                          ...privacySettings,
                          profileVisibility: e.target.value
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="followers">Followers Only</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      {Object.entries(privacySettings).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h3 className="font-medium text-gray-900 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {key === 'showOnlineStatus' && 'Show when you are online'}
                              {key === 'allowDirectMessages' && 'Allow fans to send you direct messages'}
                              {key === 'allowComments' && 'Allow fans to comment on your posts'}
                              {key === 'showFollowerCount' && 'Show your follower count publicly'}
                            </p>
                          </div>
                          <button
                            onClick={() => setPrivacySettings({
                              ...privacySettings,
                              [key]: !value
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              value ? 'bg-pink-500' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                value ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === 'monetization' && (
                <motion.div
                  key="monetization"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold text-gray-900">Monetization Settings</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subscription Price (¥)</label>
                        <input
                          type="number"
                          value={monetizationSettings.subscriptionPrice}
                          onChange={(e) => setMonetizationSettings({
                            ...monetizationSettings,
                            subscriptionPrice: parseFloat(e.target.value)
                          })}
                          min="0"
                          step="0.01"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Tip Amount (¥)</label>
                        <input
                          type="number"
                          value={monetizationSettings.tipMinimum}
                          onChange={(e) => setMonetizationSettings({
                            ...monetizationSettings,
                            tipMinimum: parseFloat(e.target.value)
                          })}
                          min="0"
                          step="0.01"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      {Object.entries(monetizationSettings).filter(([key]) => !['subscriptionPrice', 'tipMinimum'].includes(key)).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h3 className="font-medium text-gray-900 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {key === 'enableTips' && 'Allow fans to send you tips'}
                              {key === 'enableSubscriptions' && 'Allow fans to subscribe to your content'}
                              {key === 'autoApproveTips' && 'Automatically approve tips without manual review'}
                            </p>
                          </div>
                          <button
                            onClick={() => setMonetizationSettings({
                              ...monetizationSettings,
                              [key]: !value
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              value ? 'bg-pink-500' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                value ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === 'language' && (
                <motion.div
                  key="language"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold text-gray-900">{t('settings.language.title')}</h2>
                  <p className="text-gray-600">{t('settings.language.description')}</p>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Globe className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-800">{t('settings.language.current')}: {language === 'ja' ? '日本語' : 'English'}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => handleLanguageChange('ja')}
                        className={`p-6 rounded-xl border-2 transition-all ${
                          language === 'ja'
                            ? 'border-pink-500 bg-pink-50 text-pink-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">🇯🇵</div>
                          <div className="font-medium">{t('settings.language.japanese')}</div>
                          <div className="text-sm opacity-80">日本語</div>
                        </div>
                      </button>
                      
                      <button
                        onClick={() => handleLanguageChange('en')}
                        className={`p-6 rounded-xl border-2 transition-all ${
                          language === 'en'
                            ? 'border-pink-500 bg-pink-50 text-pink-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">🇺🇸</div>
                          <div className="font-medium">{t('settings.language.english')}</div>
                          <div className="text-sm opacity-80">English</div>
                        </div>
                      </button>
                    </div>
                    
                    {showLanguageSuccess && (
                      <div className="flex items-center p-3 bg-green-100 text-green-800 rounded-lg">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span>{t('settings.language.success')}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeSection === 'analytics' && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold text-gray-900">Analytics Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm opacity-90">Total Followers</p>
                          <p className="text-2xl font-bold">15,420</p>
                        </div>
                        <Users className="w-8 h-8 opacity-80" />
                      </div>
                    </div>
                    <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm opacity-90">Monthly Earnings</p>
                          <p className="text-2xl font-bold">¥125,000</p>
                        </div>
                        <DollarSign className="w-8 h-8 opacity-80" />
                      </div>
                    </div>
                    <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm opacity-90">Engagement Rate</p>
                          <p className="text-2xl font-bold">8.5%</p>
                        </div>
                        <BarChart3 className="w-8 h-8 opacity-80" />
                      </div>
                    </div>
                  </div>
                  <div className="text-center py-8">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Detailed analytics and insights are available in the Analytics section</p>
                  </div>
                </motion.div>
              )}

              {activeSection === 'content' && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold text-gray-900">Content Settings</h2>
                  <div className="text-center py-12">
                    <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Content Management</h3>
                    <p className="text-gray-600">Manage your content preferences and posting settings</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreatorSettings;