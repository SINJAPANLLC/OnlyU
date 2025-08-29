import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Eye, 
  Heart, 
  DollarSign, 
  TrendingUp,
  Plus,
  FileText,
  Star,
  Settings,
  Bell,
  MessageSquare,
  Megaphone,
  Clock,
  ArrowRight,
  Calendar,
  Target
} from 'lucide-react';
import { CreatorStats } from '../../types';
// import { useLanguage } from '../../contexts/LanguageContext';

const CreatorDashboard = () => {
  // const { language, t } = useLanguage();
  
  const [stats, setStats] = useState<CreatorStats>({
    totalPosts: 0,
    totalFollowers: 0,
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0,
    totalEarnings: 0,
    monthlyGrowth: 0,
    topPosts: [],
    recentActivity: []
  });

  useEffect(() => {
    const mockStats: CreatorStats = {
      totalPosts: 24,
      totalFollowers: 15420,
      totalViews: 125000,
      totalLikes: 8900,
      totalComments: 1200,
      totalEarnings: 1250.50,
      monthlyGrowth: 12.5,
      topPosts: [],
      recentActivity: []
    };
    setStats(mockStats);
  }, []);

  const quickActions = [
    {
      id: 'feed',
      title: 'My Feed',
      description: 'Manage and track your content performance',
      icon: FileText,
      path: '/creator/feed',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Stay updated with your fan interactions',
      icon: Bell,
      path: '/creator/notifications',
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      id: 'messages',
      title: 'Messages',
      description: 'Connect with your fans directly',
      icon: MessageSquare,
      path: '/creator/messages',
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      id: 'statistics',
      title: 'Statistics',
      description: 'Track your performance and growth',
      icon: BarChart3,
      path: '/creator/statistics',
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      id: 'fans',
      title: 'My Fans',
      description: 'Manage and interact with your fan community',
      icon: Users,
      path: '/creator/fans',
      color: 'bg-pink-500',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600'
    },
    {
      id: 'marketing',
      title: 'Marketing',
      description: 'Promote your content and grow your audience',
      icon: Megaphone,
      path: '/creator/marketing',
      color: 'bg-indigo-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    },
    {
      id: 'queue',
      title: 'Content Queue',
      description: 'Manage your scheduled and draft posts',
      icon: Clock,
      path: '/creator/queue',
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Customize your creator experience',
      icon: Settings,
      path: '/creator/settings',
      color: 'bg-gray-500',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-600'
    }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'new_follower',
      message: 'yuki_fan started following you',
      time: '2 hours ago',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
    },
    {
      id: '2',
      type: 'new_like',
      message: 'Your post received 15 new likes',
      time: '4 hours ago',
      avatar: null
    },
    {
      id: '3',
      type: 'new_comment',
      message: 'miku_fan commented on your post',
      time: '6 hours ago',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
    },
    {
      id: '4',
      type: 'new_earnings',
      message: 'You earned ¥500 from tips',
      time: '1 day ago',
      avatar: null
    }
  ];

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Creator Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your content.</p>
          </div>
          <Link to="/creator/post/new">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>New Post</span>
            </motion.button>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Followers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalFollowers.toLocaleString()}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +{stats.monthlyGrowth}%
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">This month</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Likes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalLikes.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">This month</p>
              </div>
              <div className="p-3 bg-pink-100 rounded-lg">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">¥{stats.totalEarnings.toLocaleString()}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +8.2%
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link key={action.id} to={action.path}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 ${action.bgColor} rounded-lg`}>
                      <action.icon className={`w-6 h-6 ${action.textColor}`} />
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity & Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              <Link to="/creator/notifications" className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  {activity.avatar ? (
                    <img
                      src={activity.avatar}
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <Bell className="w-5 h-5 text-gray-500" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
              <Link to="/creator/queue" className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Behind the Scenes Post</p>
                  <p className="text-xs text-gray-500">Scheduled for tomorrow at 10:00 AM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-100">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Fan Q&A Session</p>
                  <p className="text-xs text-gray-500">Scheduled for Friday at 3:00 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50 border border-purple-100">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Star className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Premium Content Release</p>
                  <p className="text-xs text-gray-500">Scheduled for Sunday at 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="mt-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Performance Summary</h2>
            <Link to="/creator/statistics" className="text-white/80 hover:text-white text-sm font-medium">
              View detailed analytics →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold">{stats.totalPosts}</p>
              <p className="text-white/80">Total Posts</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{stats.totalComments}</p>
              <p className="text-white/80">Total Comments</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{(stats.totalLikes / stats.totalViews * 100).toFixed(1)}%</p>
              <p className="text-white/80">Engagement Rate</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreatorDashboard;
