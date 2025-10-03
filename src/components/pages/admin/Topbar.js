import React from "react";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Topbar({ setSidebarOpen }) {
    const {t}= useTranslation();
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

                {/* Placeholder for future user menu */}
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src="/logo.svg" alt="U Logo" className="w-6 h-6" />
                </div>
            </div>
        </header>
    );
}
