import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// Layout-level components are now imported via layouts
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Feed from './components/feed/Feed';
import Profile from './components/profile/Profile';
import Search from './components/search/Search';
import Messages from './components/messages/Messages';
import Notifications from './components/notifications/Notifications';
import Settings from './components/settings/Settings';
import Community from './components/community/Community';
import Favorites from './components/fan/Favorites';
import Terms from './components/static/Terms';
import Privacy from './components/static/Privacy';
import AdminDashboard from './components/admin/AdminDashboard';
import CreatorDashboard from './components/creator/CreatorDashboard';
import CreatorProfile from './components/creator/CreatorProfile';
import CreatorPostEditor from './components/creator/CreatorPostEditor';
import CreatorFeed from './components/creator/CreatorFeed';
import CreatorNotifications from './components/creator/CreatorNotifications';
import CreatorMessages from './components/creator/CreatorMessages';
import CreatorStatistics from './components/creator/CreatorStatistics';
import CreatorFans from './components/creator/CreatorFans';
import CreatorMarketing from './components/creator/CreatorMarketing';
import CreatorQueue from './components/creator/CreatorQueue';
import CreatorSettings from './components/creator/CreatorSettings';
import { User, AuthContextType } from './types';
import { AuthContext } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import FanLayout from './components/layouts/FanLayout';
import CreatorLayout from './components/layouts/CreatorLayout';

// mockUser removed; real user is loaded from localStorage

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    const timer = setTimeout(() => {
      const savedUser = localStorage.getItem('myfans_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('myfans_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('myfans_user');
  };

  const authContextValue: AuthContextType = useMemo(() => ({
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isManager: user?.role === 'manager'
  }), [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">読み込み中...</p>
        </motion.div>
      </div>
    );
  }

  const defaultRoute = user?.role === 'creator' ? '/creator' : '/fan';

  return (
    <LanguageProvider>
      <AuthContext.Provider value={authContextValue}>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
            {user ? (
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Navigate to={defaultRoute} replace />} />

                  <Route path="/fan" element={<FanLayout />}>
                    <Route index element={<Feed />} />
                    <Route path="profile/:username" element={<Profile />} />
                    <Route path="search" element={<Search />} />
                    <Route path="messages" element={<Messages />} />
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="favorites" element={<Favorites />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="community" element={<Community />} />
                    <Route path="/fan/terms" element={<Terms />} />
                    <Route path="/fan/privacy" element={<Privacy />} />
                  </Route>

                  <Route path="/creator" element={<CreatorLayout />}>
                    <Route index element={<CreatorDashboard />} />
                    <Route path="feed" element={<CreatorFeed />} />
                    <Route path="notifications" element={<CreatorNotifications />} />
                    <Route path="messages" element={<CreatorMessages />} />
                    <Route path="statistics" element={<CreatorStatistics />} />
                    <Route path="fans" element={<CreatorFans />} />
                    <Route path="marketing" element={<CreatorMarketing />} />
                    <Route path="queue" element={<CreatorQueue />} />
                    <Route path="settings" element={<CreatorSettings />} />
                    <Route path="post/new" element={<CreatorPostEditor />} />
                    <Route path=":username" element={<CreatorProfile />} />
                  </Route>

                  <Route path="/admin" element={<AdminDashboard />} />

                  <Route path="/login" element={<Navigate to={defaultRoute} replace />} />
                  <Route path="/register" element={<Navigate to={defaultRoute} replace />} />

                  <Route path="*" element={<Navigate to={defaultRoute} replace />} />
                </Routes>
              </AnimatePresence>
            ) : (
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            )}
          </div>
        </Router>
        </AuthContext.Provider>
      </LanguageProvider>
  );
}

export default App;