import React from 'react';
import { Outlet } from 'react-router-dom';
import CreatorNavbar from '../creator/CreatorNavbar';
import CreatorSidebar from '../creator/CreatorSidebar';

const CreatorLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="flex">
        <CreatorSidebar />
        <div className="flex-1 ml-0 lg:ml-64">
          <CreatorNavbar />
          <main className="pt-16 pb-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default CreatorLayout;


