import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Crown, Star, Heart } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface Fan {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  isPremium: boolean;
  totalSpent: number;
  interactionCount: number;
  status: 'active' | 'inactive';
}

const CreatorFans = () => {
  const { t } = useLanguage();
  const [fans, setFans] = useState<Fan[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const mockFans: Fan[] = [
      {
        id: '1',
        username: 'yuki_fan',
        displayName: 'Yuki Tanaka',
        avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
        isPremium: true,
        totalSpent: 2500,
        interactionCount: 45,
        status: 'active'
      },
      {
        id: '2',
        username: 'miku_fan',
        displayName: 'Miku Suzuki',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
        isPremium: false,
        totalSpent: 800,
        interactionCount: 23,
        status: 'active'
      }
    ];
    setFans(mockFans);
  }, []);

  const filteredFans = fans.filter(fan =>
    fan.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fan.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('creator.fans.title')}</h1>
            <p className="text-gray-600">{t('creator.fans.subtitle')}</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{fans.length}</h3>
                <p className="text-gray-600">{t('creator.fans.totalFans')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Crown className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {fans.filter(fan => fan.isPremium).length}
                </h3>
                <p className="text-gray-600">{t('creator.fans.premiumFans')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  ¥{fans.reduce((sum, fan) => sum + fan.totalSpent, 0).toLocaleString()}
                </h3>
                <p className="text-gray-600">{t('creator.fans.totalRevenue')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder={t('creator.fans.searchFans')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Fans List */}
        <div className="grid gap-4">
          {filteredFans.map((fan) => (
            <div key={fan.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={fan.avatar}
                      alt={fan.displayName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {fan.isPremium && (
                      <div className="absolute -top-1 -right-1">
                        <Crown className="w-4 h-4 text-yellow-500" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{fan.displayName}</h3>
                    <p className="text-sm text-gray-500">@{fan.username}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">¥{fan.totalSpent.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{fan.interactionCount} {t('creator.fans.interactions')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFans.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('creator.fans.noFansFound')}</h3>
            <p className="text-gray-500">{t('creator.fans.tryAdjustingSearch')}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CreatorFans;
