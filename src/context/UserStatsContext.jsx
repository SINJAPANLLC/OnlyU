import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getUserInteractions } from '../utils/userInteractions';

const UserStatsContext = createContext();

export const useUserStats = () => {
  const context = useContext(UserStatsContext);
  if (!context) {
    throw new Error('useUserStats must be used within a UserStatsProvider');
  }
  return context;
};

export const UserStatsProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    purchased: 0,
    saved: 0,
    liked: 0,
    viewingHistory: 0
  });
  const [loading, setLoading] = useState(true);

  // ユーザーの統計データを読み込み
  const loadUserStats = async () => {
    if (!currentUser) {
      setStats({
        purchased: 0,
        saved: 0,
        liked: 0,
        viewingHistory: 0
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const interactions = await getUserInteractions(currentUser.uid);
      
      setStats({
        purchased: 0, // 購入済みは別途管理が必要
        saved: interactions.savedPosts.size,
        liked: interactions.likedPosts.size,
        viewingHistory: 0 // 視聴履歴は別途管理が必要
      });
    } catch (error) {
      console.error('Error loading user stats:', error);
      setStats({
        purchased: 0,
        saved: 0,
        liked: 0,
        viewingHistory: 0
      });
    } finally {
      setLoading(false);
    }
  };

  // いいね数を更新
  const updateLikedCount = (increment) => {
    setStats(prev => ({
      ...prev,
      liked: Math.max(0, prev.liked + increment)
    }));
  };

  // 保存数を更新
  const updateSavedCount = (increment) => {
    setStats(prev => ({
      ...prev,
      saved: Math.max(0, prev.saved + increment)
    }));
  };

  // 購入数を更新
  const updatePurchasedCount = (increment) => {
    setStats(prev => ({
      ...prev,
      purchased: Math.max(0, prev.purchased + increment)
    }));
  };

  // 視聴履歴数を更新
  const updateViewingHistoryCount = (increment) => {
    setStats(prev => ({
      ...prev,
      viewingHistory: Math.max(0, prev.viewingHistory + increment)
    }));
  };

  // 統計データを再読み込み
  const refreshStats = () => {
    loadUserStats();
  };

  useEffect(() => {
    loadUserStats();
  }, [currentUser]);

  const value = {
    stats,
    loading,
    updateLikedCount,
    updateSavedCount,
    updatePurchasedCount,
    updateViewingHistoryCount,
    refreshStats
  };

  return (
    <UserStatsContext.Provider value={value}>
      {children}
    </UserStatsContext.Provider>
  );
};
