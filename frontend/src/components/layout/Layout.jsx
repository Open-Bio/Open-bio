// components/layout/Layout.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/tools', label: 'Tools', icon: '🛠' },
    { path: '/workflows', label: 'Workflows', icon: '🔄' },
    { path: '/files', label: 'Files', icon: '📁' }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 bg-blue-600">
          <h1 className="text-white text-xl font-bold">Open-Bio</h1>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 ${
                location.pathname === item.path ? 'bg-blue-50 border-r-4 border-blue-600' : ''
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {menuItems.find(item => item.path === location.pathname)?.label || 'Open-Bio'}
            </h2>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-800">
                <span className="mr-2">👤</span>Profile
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                <span className="mr-2">⚙️</span>Settings
              </button>
            </div>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;