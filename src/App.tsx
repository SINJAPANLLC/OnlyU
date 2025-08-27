import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Feed from './components/feed/Feed';
import Profile from './components/profile/Profile';
import Search from './components/search/Search';
import Messages from './components/messages/Messages';
import Notifications from './components/notifications/Notifications';
import Settings from './components/settings/Settings';
import Community from './components/community/Community';
import Terms from './components/static/Terms';
import Privacy from './components/static/Privacy';
import { User, AuthContextType } from './types';
import { AuthContext } from './contexts/AuthContext';

const mockUser: User = {
  id: '1',
  username: 'sakura_chan',
  displayName: '桜子',
  email: 'sakura@example.com',
  avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
  bio: 'クリエイター｜毎日投稿中✨',
  followers: 15420,
  following: 892,
  isVerified: true,
  joinedDate: '2023-01-15'
};

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

  const authContextValue: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

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

  return (
    <AuthContext.Provider value={authContextValue}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
          {user ? (
            <div className="flex">
              <Sidebar />
              <div className="flex-1 ml-0 lg:ml-64">
                <Navbar />
                <main className="pt-16 pb-6">
                  <AnimatePresence mode="wait">
                    <Routes>
                      <Route path="/" element={<Feed />} />
                      <Route path="/profile/:username" element={<Profile />} />
                      <Route path="/search" element={<Search />} />
                      <Route path="/messages" element={<Messages />} />
                      <Route path="/notifications" element={<Notifications />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/login" element={<Navigate to="/" replace />} />
                      <Route path="/register" element={<Navigate to="/" replace />} />
                    </Routes>
                  </AnimatePresence>
                </main>
              </div>
            </div>
          ) : (
            <Routes>
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
  );
}

export default App;