
import React, { useState } from 'react';
import { AppTab } from '../types';

interface DashboardProps {
  onNavigate: (tab: AppTab, query?: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSmartSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();
    
    // Agentic Routing Logic (Requirement FR3)
    if (query.includes('weather') || query.includes('rain') || query.includes('temperature') || query.includes('forecast')) {
      onNavigate(AppTab.WEATHER, searchQuery);
    } else if (query.includes('price') || query.includes('mandi') || query.includes('market') || query.includes('sell') || query.includes('buy')) {
      onNavigate(AppTab.MARKET, searchQuery);
    } else if (query.includes('scheme') || query.includes('yojana') || query.includes('paisa') || query.includes('money') || query.includes('kisan')) {
      onNavigate(AppTab.SCHEMES, searchQuery);
    } else {
      // Default to Crop Advisory for general agricultural health queries
      onNavigate(AppTab.CROP_ADVISORY, searchQuery);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800">Namaste, Farmer! 🙏</h2>
        <p className="text-slate-500 mt-1 mb-6">Ask anything about your farm...</p>
        
        <form onSubmit={handleSmartSearch} className="relative group">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search weather, prices, or crop issues..."
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-inner"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
          </div>
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors"
          >
            Ask AI
          </button>
        </form>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => onNavigate(AppTab.CROP_ADVISORY)}
          className="group flex flex-col items-center gap-3 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm hover:border-emerald-200 hover:bg-emerald-50/30 transition-all text-center"
        >
          <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
            🩺
          </div>
          <h3 className="font-bold text-slate-800 text-sm">Crop Advisory</h3>
        </button>

        <button 
          onClick={() => onNavigate(AppTab.WEATHER)}
          className="group flex flex-col items-center gap-3 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm hover:border-blue-200 hover:bg-blue-50/30 transition-all text-center"
        >
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
            ☁️
          </div>
          <h3 className="font-bold text-slate-800 text-sm">Weather</h3>
        </button>

        <button 
          onClick={() => onNavigate(AppTab.MARKET)}
          className="group flex flex-col items-center gap-3 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm hover:border-orange-200 hover:bg-orange-50/30 transition-all text-center"
        >
          <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
            📈
          </div>
          <h3 className="font-bold text-slate-800 text-sm">Mandi Live</h3>
        </button>

        <button 
          onClick={() => onNavigate(AppTab.SCHEMES)}
          className="group flex flex-col items-center gap-3 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm hover:border-purple-200 hover:bg-purple-50/30 transition-all text-center"
        >
          <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
            📜
          </div>
          <h3 className="font-bold text-slate-800 text-sm">Govt. Schemes</h3>
        </button>
      </div>

      <div className="bg-emerald-800 rounded-3xl p-6 text-white shadow-lg overflow-hidden relative">
        <div className="relative z-10">
          <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
            <span>✨</span> Farmer Tip
          </h4>
          <p className="text-emerald-50 opacity-90 text-sm leading-relaxed">
            Applying <strong>neem cake</strong> to your soil not only provides nutrients but also acts as a natural pesticide against soil-borne pathogens.
          </p>
        </div>
        <div className="absolute -right-6 -bottom-6 opacity-10">
          <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
