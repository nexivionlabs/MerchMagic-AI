
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <i className="fas fa-magic text-white text-xl"></i>
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">MerchMagic <span className="text-indigo-600">AI</span></h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Templates</a>
          <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Pricing</a>
          <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Help</a>
        </nav>
        <div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full font-medium transition-all shadow-sm hover:shadow-md">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
