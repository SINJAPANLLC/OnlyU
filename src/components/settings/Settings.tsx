import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Bell, Shield, Palette, Globe, HelpCircle, LogOut } from 'lucide-react';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const sections = [
    { id: 'profile', label: 'プロフィール', icon: User },
    { id: 'privacy', label: 'プライバシー', icon: Lock },
    { id: 'notifications', label: '通知設定', icon: Bell },
    { id: 'security', label: 'セキュリティ', icon: Shield },
    { id: 'appearance', label: '外観', icon: Palette },
    { id: 'language', label: '言語', icon: Globe },
    { id: 'help', label: 'ヘルプ', icon: HelpCircle },
    { id: 'logout', label: 'ログアウト', icon: LogOut }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">プロフィール設定</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">プロフィール画像</label>
                <div className="flex items-center space-x-4">
                  <img
                    src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2"
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors">
                    画像を変更
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">表示名</label>
                <input
                  type="text"
                  defaultValue="桜子"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ユーザー名</label>
                <input
                  type="text"
                  defaultValue="sakura_chan"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">プロフィール</label>
                <textarea
                  defaultValue="クリエイター｜毎日投稿中✨"
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
            <h2 className="text-xl font-bold text-gray-900">プライバシー設定</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">プライベートアカウント</h3>
                  <p className="text-sm text-gray-600">フォロワーのみがあなたの投稿を見ることができます</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">DMを受信</h3>
                  <p className="text-sm text-gray-600">フォロワー以外からのメッセージを受信</p>
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
            <h2 className="text-xl font-bold text-gray-900">通知設定</h2>
            <div className="space-y-4">
              {[
                { label: 'いいね', description: '投稿にいいねがついたとき' },
                { label: 'コメント', description: '投稿にコメントがついたとき' },
                { label: 'フォロー', description: '新しいフォロワーがついたとき' },
                { label: 'メッセージ', description: '新しいメッセージを受信したとき' }
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
            <h2 className="text-xl font-bold text-gray-900">外観設定</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">テーマ</h3>
                <div className="space-y-2">
                  {['ライト', 'ダーク', 'システム'].map((theme, index) => (
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

      default:
        return (
          <div className="text-center text-gray-500">
            <p>設定項目を選択してください</p>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-6">設定</h1>
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
                  キャンセル
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-all"
                >
                  保存
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