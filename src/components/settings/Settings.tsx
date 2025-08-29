import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Bell, Shield, Palette, Globe, HelpCircle, LogOut } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [showLanguageSuccess, setShowLanguageSuccess] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  
  // Debug: Log when language changes
  useEffect(() => {
    console.log('Settings language changed to:', language);
  }, [language]);
  
  const handleLanguageChange = (newLanguage: 'en' | 'ja') => {
    setLanguage(newLanguage);
    setShowLanguageSuccess(true);
    setTimeout(() => setShowLanguageSuccess(false), 3000);
  };

  const sections = [
    { id: 'profile', label: t('settings.profile'), icon: User },
    { id: 'privacy', label: t('settings.privacy'), icon: Lock },
    { id: 'notifications', label: t('settings.notifications'), icon: Bell },
    { id: 'security', label: t('settings.security'), icon: Shield },
    { id: 'appearance', label: t('settings.appearance'), icon: Palette },
    { id: 'language', label: t('settings.language'), icon: Globe },
    { id: 'help', label: t('settings.help'), icon: HelpCircle },
    { id: 'logout', label: t('settings.logout'), icon: LogOut }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">{t('settings.profileSettings')}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.profileImage')}</label>
                <div className="flex items-center space-x-4">
                  <img
                    src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2"
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors">
                    {t('settings.changeImage')}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.displayName')}</label>
                <input
                  type="text"
                  defaultValue={t('settings.defaultDisplayName')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.username')}</label>
                <input
                  type="text"
                  defaultValue={t('settings.defaultUsername')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.bio')}</label>
                <textarea
                  defaultValue={t('settings.defaultBio')}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">{t('settings.privacySettings')}</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{t('settings.privateAccount')}</h3>
                  <p className="text-sm text-gray-600">{t('settings.privateAccountDesc')}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{t('settings.receiveDMs')}</h3>
                  <p className="text-sm text-gray-600">{t('settings.receiveDMsDesc')}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                </label>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">{t('settings.notificationSettings')}</h2>
            <div className="space-y-4">
              {[
                { 
                                    label: t('settings.notificationLikes'),
                  description: t('settings.notificationLikesDesc') 
                },
                { 
                                    label: t('settings.notificationComments'),
                  description: t('settings.notificationCommentsDesc') 
                },
                { 
                                    label: t('settings.notificationFollows'),
                  description: t('settings.notificationFollowsDesc') 
                },
                { 
                                    label: t('settings.notificationMessages'),
                  description: t('settings.notificationMessagesDesc') 
                }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.label}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">{t('settings.appearanceSettings')}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">{t('settings.theme')}</h3>
                <div className="space-y-2">
                                      {[
                      t('settings.themeLight'),
                      t('settings.themeDark'),
                      t('settings.themeSystem')
                    ].map((theme, index) => (
                    <label key={index} className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                      <input
                        type="radio"
                        name="theme"
                        defaultChecked={index === 0}
                        className="text-pink-600 focus:ring-pink-500"
                      />
                      <span className="ml-3 text-gray-900">{theme}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'language':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">{t('settings.language.title')}</h2>
            <p className="text-gray-600">{t('settings.language.description')}</p>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">{t('settings.language.current')}: {t('settings.language.currentValue')}</span>
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
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center space-x-2 text-green-800">
                    <div className="text-green-600">✓</div>
                    <span className="font-medium">{t('messages.languageChanged')}</span>
                  </div>
                </motion.div>
              )}
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="text-blue-600 mt-0.5">ℹ️</div>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">{t('info.title')}</p>
                    <p>{t('info.languageChange')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-500">
            <p>{t('messages.selectOption')}</p>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto px-4 py-6"
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex">
        {/* Settings Menu */}
        <div className="w-1/3 border-r border-gray-200">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">{t('settings.title')}</h1>
            <nav className="space-y-1">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeSection === section.id
                        ? 'bg-pink-50 text-pink-600 border-r-2 border-pink-500'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </motion.button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 p-6">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
          
          {activeSection !== 'logout' && activeSection !== 'help' && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-end space-x-3">
                <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                  {t('settings.cancel')}
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-all"
                >
                  {t('settings.save')}
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;