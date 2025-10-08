import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 認証状態をチェック
    const checkAuth = () => {
      const adminAuth = localStorage.getItem('adminAuth');
      const loginTime = localStorage.getItem('adminLoginTime');
      
      if (adminAuth === 'true' && loginTime) {
        // ログイン時間から24時間以内かチェック
        const loginDate = new Date(loginTime);
        const now = new Date();
        const diffInHours = (now - loginDate) / (1000 * 60 * 60);
        
        if (diffInHours < 24) {
          setIsAuthenticated(true);
        } else {
          // 24時間経過した場合は認証を無効化
          localStorage.removeItem('adminAuth');
          localStorage.removeItem('adminLoginTime');
          navigate('/admin/login');
        }
      } else {
        navigate('/admin/login');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  // ログアウト機能
  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminLoginTime');
    navigate('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-100 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">認証中...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // リダイレクト中
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} onLogout={handleLogout} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Topbar setSidebarOpen={setSidebarOpen} onLogout={handleLogout} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
