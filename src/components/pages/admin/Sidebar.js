import React from "react";
import { NavLink } from "react-router-dom";
import { Users, UserPlus, FileText, BarChart3, DollarSign, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Sidebar({ open, setOpen }) {
  const { t } = useTranslation();

  const navItems = [
    { name: t('AdminPage.dashboardPage.title'), path: "/admin", icon: BarChart3 },
    { name: t('AdminPage.userPage.title'), path: "/admin/users", icon: Users },
    { name: t('AdminPage.creatorPage.title'), path: "/admin/creators", icon: UserPlus },
    { name: t('AdminPage.reportsPage.title'), path: "/admin/reports", icon: FileText },
    { name: t('AdminPage.postsPage.title'), path: "/admin/posts", icon: FileText },
    { name: t('AdminPage.salesPage.title'), path: "/admin/sales", icon: DollarSign },
    { name: t('AdminPage.verificationPage.title'), path: "/admin/verification", icon: Shield },
  ];

  return (
    <>
      {/* Overlay on mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed z-50 inset-y-0 left-0 w-64 bg-white border-r shadow-md transform md:translate-x-0 transition-transform duration-200 ease-in-out 
        ${open ? "translate-x-0" : "-translate-x-full"} md:relative`}
      >
        <div className="flex flex-col h-full">
          <div className="px-4 py-6 text-xl font-bold border-b">{t('AdminPage.title')}</div>

          <nav className="flex-1 px-2 py-4 space-y-2">
            {navItems.map(({ name, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${isActive
                    ? "bg-pink-100 text-pink-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <Icon className="w-5 h-5 mr-3" />
                {name}
              </NavLink>
            ))}
          </nav>

          {/* Bottom Logo */}
          <div className="p-4 border-t text-center">
            <img
              src="/logo192.png"
              alt="Logo"
              className="w-12 h-12 mx-auto mb-2"
            />
            <p className="text-xs text-gray-500">© 2025 Lord tech</p>
          </div>
        </div>
      </aside>
    </>
  );
}
