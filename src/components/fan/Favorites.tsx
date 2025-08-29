import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  User, 
  Image, 
  Video, 
  FileText, 
  Filter,
  Search,
  Grid,
  List,
  Star,
  Calendar,
  Eye
} from 'lucide-react';

const Favorites = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const [favorites, setFavorites] = useState([
    {
      id: '1',
      type: 'creator',
      title: 'Yuki Creator',
      username: 'yuki_creator',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      description: 'Fashion and lifestyle content creator',
      followers: 15420,
      isFollowing: true,
      lastPost: '2 hours ago'
    },
    {
      id: '2',
      type: 'post',
      title: 'Behind the Scenes',
      creator: 'Miku Creator',
      creatorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      content: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      contentType: 'image',
      likes: 1250,
      comments: 89,
      date: '1 day ago'
    },
    {
      id: '3',
      type: 'post',
      title: 'Daily Routine',
      creator: 'Sakura Creator',
      creatorAvatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      content: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      contentType: 'video',
      likes: 890,
      comments: 45,
      date: '3 days ago'
    },
    {
      id: '4',
      type: 'creator',
      title: 'Tech Guru',
      username: 'tech_guru',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      description: 'Technology reviews and tutorials',
      followers: 8900,
      isFollowing: true,
      lastPost: '5 hours ago'
    }
  ]);

  const tabs = [
    { id: 'all', label: 'All Favorites', count: favorites.length },
    { id: 'creators', label: 'Creators', count: favorites.filter(f => f.type === 'creator').length },
    { id: 'posts', label: 'Posts', count: favorites.filter(f => f.type === 'post').length }
  ];

  const filteredFavorites = favorites.filter(favorite => {
    const matchesTab = activeTab === 'all' || favorite.type === activeTab;
    const matchesSearch = favorite.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (favorite.type === 'creator' && favorite.username?.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Favorites</h1>
            <p className="text-gray-600">Your saved creators and content</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-pink-100 text-pink-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-pink-100 text-pink-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search favorites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent w-full"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-pink-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>{tab.label}</span>
              <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {filteredFavorites.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
            <p className="text-gray-600">Start following creators and liking posts to see them here</p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}
          >
            {filteredFavorites.map((favorite) => (
              <motion.div
                key={favorite.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {favorite.type === 'creator' ? (
                  <div className={`p-6 ${viewMode === 'list' ? 'flex items-center space-x-4 flex-1' : ''}`}>
                    <div className="flex items-center space-x-4">
                      <img
                        src={favorite.avatar}
                        alt={favorite.title}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{favorite.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">@{favorite.username}</p>
                        <p className="text-sm text-gray-500 mb-3">{favorite.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{favorite.followers?.toLocaleString() || '0'} followers</span>
                            <span>•</span>
                            <span>{favorite.lastPost}</span>
                          </div>
                          <button className="px-4 py-1.5 bg-pink-100 text-pink-600 rounded-lg text-sm font-medium hover:bg-pink-200 transition-colors">
                            Following
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`${viewMode === 'list' ? 'flex' : ''}`}>
                    <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                      <img
                        src={favorite.content}
                        alt={favorite.title}
                        className={`w-full object-cover ${
                          viewMode === 'list' ? 'h-32' : 'h-48'
                        }`}
                      />
                    </div>
                    <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <img
                          src={favorite.creatorAvatar}
                          alt={favorite.creator}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium text-gray-900">{favorite.creator}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{favorite.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{favorite.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{favorite.comments}</span>
                        </div>
                        <span>{favorite.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-1 px-3 py-1.5 bg-pink-100 text-pink-600 rounded-lg text-sm font-medium hover:bg-pink-200 transition-colors">
                          <Heart className="w-4 h-4" />
                          <span>Liked</span>
                        </button>
                        <button className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Favorites;
