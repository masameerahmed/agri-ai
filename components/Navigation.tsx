
import React from 'react';
import { AppTab } from '../types';

interface NavigationProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: AppTab.DASHBOARD, label: 'Home', icon: '🏠' },
    { id: AppTab.CROP_ADVISORY, label: 'Crops', icon: '🩺' },
    { id: AppTab.WEATHER, label: 'Weather', icon: '☁️' },
    { id: AppTab.MARKET, label: 'Mandi', icon: '📈' },
    { id: AppTab.SCHEMES, label: 'Schemes', icon: '📜' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center p-2 z-50 pb-safe">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center flex-1 py-1 transition-colors ${
            activeTab === tab.id ? 'text-emerald-700' : 'text-slate-500'
          }`}
        >
          <span className="text-xl">{tab.icon}</span>
          <span className="text-[10px] font-medium mt-1 uppercase tracking-wider">{tab.label}</span>
          {activeTab === tab.id && (
            <div className="w-1 h-1 bg-emerald-700 rounded-full mt-0.5"></div>
          )}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
