import React, { useState } from "react";
import { Menu, LogOut, User } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Topbar({ setSidebarOpen, onLogout }) {
    const {t}= useTranslation();
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <header className="sticky top-0 z-30 bg-white border-b shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 md:px-6">
                {/* Mobile menu button */}
                <button
                    className="md:hidden text-gray-600 hover:text-gray-900"
                    onClick={() => setSidebarOpen(true)}
                >
                    <Menu className="w-6 h-6" />
                </button>

                <h1 className="text-lg font-semibold text-gray-800">{t('AdminPage.topTitle')}</h1>

                {/* User menu */}
                <div className="relative">
                    <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                    >
                        <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                            <User className="w-5 h-5 text-pink-600" />
                        </div>
                        <span className="hidden md:block text-sm font-medium">管理者</span>
                    </button>

                    {/* Dropdown menu */}
                    {showUserMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                            <button
                                onClick={() => {
                                    onLogout();
                                    setShowUserMenu(false);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                                <LogOut className="w-4 h-4 mr-3" />
                                ログアウト
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
