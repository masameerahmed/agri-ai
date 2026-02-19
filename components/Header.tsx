
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-emerald-700 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 20h10" />
            <path d="M10 20l2-16" />
            <path d="M6 13c1.5-2 3.5-3 6-3s4.5 1 6 3" />
            <path d="M8 10V8a4 4 0 0 1 8 0v2" />
          </svg>
          <h1 className="text-xl font-bold tracking-tight">AgriSmart AI</h1>
        </div>
        <div className="text-xs bg-emerald-600 px-2 py-1 rounded-full uppercase font-semibold">
          Hackathon Edition
        </div>
      </div>
    </header>
  );
};

export default Header;
