import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Target, TrendingUp, Share2, Gift, Calendar, BarChart3 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const CreatorMarketing = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'campaigns' | 'promotions' | 'analytics'>('campaigns');

  const marketingTools = [
    {
      id: '1',
      title: 'Promotional Posts',
      description: 'Create special promotional content for your fans',
      icon: Megaphone,
      status: 'active',
      usage: '3/5 used this month'
    },
    {
      id: '2',
      title: 'Fan Engagement Campaigns',
      description: 'Run targeted campaigns to increase fan interaction',
      icon: Target,
      status: 'available',
      usage: '2/3 campaigns active'
    },
    {
      id: '3',
      title: 'Premium Content Promotions',
      description: 'Promote your premium content to attract subscribers',
      icon: Gift,
      status: 'active',
      usage: '1/2 promotions active'
    }
  ];

  const campaigns = [
    {
      id: '1',
      name: 'New Year Special',
      type: 'Premium Promotion',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      reach: 8500,
      conversions: 45,
      revenue: 2250
    },
    {
      id: '2',
      name: 'Fan Appreciation Week',
      type: 'Engagement Campaign',
      status: 'scheduled',
      startDate: '2024-02-01',
      endDate: '2024-02-07',
      reach: 0,
      conversions: 0,
      revenue: 0
    }
  ];

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketing Tools</h1>
            <p className="text-gray-600">Promote your content and grow your audience</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'campaigns' 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Campaigns
            </button>
            <button
              onClick={() => setActiveTab('promotions')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'promotions' 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Promotions
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'analytics' 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Analytics
            </button>
          </div>
        </div>

        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            {/* Marketing Tools */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {marketingTools.map((tool) => (
                <div key={tool.id} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-pink-100 rounded-lg">
                      <tool.icon className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{tool.title}</h3>
                      <p className="text-sm text-gray-500">{tool.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      tool.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {tool.status}
                    </span>
                    <span className="text-xs text-gray-500">{tool.usage}</span>
                  </div>
                  <button className="w-full mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                    Use Tool
                  </button>
                </div>
              ))}
            </div>

            {/* Active Campaigns */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Active Campaigns</h2>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-pink-100 rounded-lg">
                        <Calendar className="w-5 h-5 text-pink-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                        <p className="text-sm text-gray-500">{campaign.type}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{campaign.reach.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Reach</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{campaign.conversions}</p>
                          <p className="text-xs text-gray-500">Conversions</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">¥{campaign.revenue.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Revenue</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
                        campaign.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'promotions' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Promotional Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Share2 className="w-6 h-6 text-blue-600" />
                  <h3 className="font-medium text-gray-900">Social Media Promotion</h3>
                </div>
                <p className="text-gray-600 mb-4">Share your content across social media platforms to reach more fans.</p>
                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Create Promotion
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Gift className="w-6 h-6 text-purple-600" />
                  <h3 className="font-medium text-gray-900">Special Offers</h3>
                </div>
                <p className="text-gray-600 mb-4">Create limited-time offers and discounts for your premium content.</p>
                <button className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                  Create Offer
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Marketing Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-gray-900">12.5%</h3>
                <p className="text-gray-600">Growth Rate</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-gray-900">8,500</h3>
                <p className="text-gray-600">Total Reach</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Target className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-gray-900">45</h3>
                <p className="text-gray-600">Conversions</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CreatorMarketing;
