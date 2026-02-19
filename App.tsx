
import React, { useState } from 'react';
import { AppTab } from './types';
import Dashboard from './components/Dashboard';
import CropAdvisory from './components/CropAdvisory';
import WeatherAlerts from './components/WeatherAlerts';
import MarketInsights from './components/MarketInsights';
import SchemeGuidance from './components/SchemeGuidance';
import Navigation from './components/Navigation';
import Header from './components/Header';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [initialQuery, setInitialQuery] = useState<string>('');

  const handleRoute = (tab: AppTab, query: string = '') => {
    setInitialQuery(query);
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return <Dashboard onNavigate={handleRoute} />;
      case AppTab.CROP_ADVISORY:
        return <CropAdvisory initialQuery={initialQuery} />;
      case AppTab.WEATHER:
        return <WeatherAlerts />;
      case AppTab.MARKET:
        return <MarketInsights initialQuery={initialQuery} />;
      case AppTab.SCHEMES:
        return <SchemeGuidance initialQuery={initialQuery} />;
      default:
        return <Dashboard onNavigate={handleRoute} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 pb-20">
      <Header />
      <main className="flex-1 w-full max-w-2xl mx-auto p-4 md:p-6">
        {renderContent()}
      </main>
      <Navigation activeTab={activeTab} setActiveTab={(tab) => handleRoute(tab, '')} />
    </div>
  );
};

export default App;
