import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

const FanLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-0 lg:ml-64">
          <Navbar />
          <main className="pt-16 pb-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default FanLayout;


