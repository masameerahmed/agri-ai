
import React, { useState, useEffect, useRef } from 'react';
import { getMarketInsights } from '../geminiService';

interface Props {
  initialQuery?: string;
}

const MarketInsights: React.FC<Props> = ({ initialQuery }) => {
  const [insights, setInsights] = useState<{ text: string, sources: string[] } | null>(null);
  const [commodity, setCommodity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const initialized = useRef(false);

  const fetchInsights = async (searchQuery?: string) => {
    setIsLoading(true);
    try {
      const result = await getMarketInsights(searchQuery);
      setInsights(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery && !initialized.current) {
      initialized.current = true;
      setCommodity(initialQuery);
      fetchInsights(initialQuery);
    } else if (!initialized.current) {
      fetchInsights();
      initialized.current = true;
    }
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchInsights(commodity);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span>📈</span> Mandi Live Insights
        </h2>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
            placeholder="e.g., Onion, Wheat, Rice..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-orange-600 hover:bg-orange-700 text-white px-5 rounded-2xl text-sm font-bold transition-colors disabled:opacity-50 shadow-sm"
          >
            {isLoading ? '...' : 'Check'}
          </button>
        </form>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center py-20 gap-3">
          <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
          <p className="text-sm text-slate-500 font-medium">Scanning mandi data...</p>
        </div>
      ) : insights && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              Live Strategy Analysis
            </h3>
            <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
              {insights.text}
            </div>
          </div>

          {insights.sources.length > 0 && (
            <div className="p-4 bg-slate-100 rounded-2xl">
              <p className="text-[10px] font-bold text-slate-500 uppercase mb-3">Verification Sources:</p>
              <div className="flex flex-wrap gap-2">
                {insights.sources.map((url, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-emerald-700 hover:text-emerald-800 hover:border-emerald-200 transition-all truncate max-w-[200px]"
                  >
                    🔗 {new URL(url).hostname}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MarketInsights;
