
import React, { useState, useEffect, useRef } from 'react';
import { getSchemeGuidance } from '../geminiService';

interface Props {
  initialQuery?: string;
}

const SchemeGuidance: React.FC<Props> = ({ initialQuery }) => {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const initialized = useRef(false);

  const fetchScheme = async (q: string) => {
    if (!q.trim()) return;
    setIsLoading(true);
    try {
      const res = await getSchemeGuidance(q);
      setAnswer(res || 'No details found.');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery && !initialized.current) {
      initialized.current = true;
      setQuery(initialQuery);
      fetchScheme(initialQuery);
    }
  }, [initialQuery]);

  const handleQuery = (e: React.FormEvent) => {
    e.preventDefault();
    fetchScheme(query);
  };

  const commonSchemes = [
    "PM-KISAN registration process",
    "How to get Crop Insurance (PMFBY)?",
    "Soil Health Card benefits",
    "Subsidy for tractors"
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
          <span>📜</span> Scheme Guidance
        </h2>
        <p className="text-sm text-slate-500 mb-6">Simplifying complex government benefits for you.</p>
        
        <form onSubmit={handleQuery} className="space-y-3">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., How do I apply for Krishi Sinchai Yojana?"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm min-h-[120px] resize-none"
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-bold transition-all shadow-md disabled:opacity-50 active:scale-95"
          >
            {isLoading ? 'Consulting Records...' : 'Find Scheme Details'}
          </button>
        </form>
      </div>

      {!answer && !isLoading && (
        <div className="space-y-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Quick Assistance</p>
          <div className="grid grid-cols-1 gap-2">
            {commonSchemes.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setQuery(s);
                  fetchScheme(s);
                }}
                className="text-left p-4 bg-white border border-slate-100 rounded-2xl text-xs text-slate-600 hover:border-purple-200 hover:bg-purple-50/20 transition-all shadow-sm flex items-center justify-between group"
              >
                <span>{s}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">➡️</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {answer && (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">📜</span>
            <h3 className="font-bold text-slate-800">Expert Guidance</h3>
          </div>
          <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap border-l-4 border-purple-100 pl-4 py-1">
            {answer}
          </div>
          <button 
            onClick={() => { setAnswer(''); setQuery(''); }}
            className="mt-8 flex items-center gap-2 text-[10px] font-bold text-purple-600 uppercase tracking-widest hover:text-purple-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            New Search
          </button>
        </div>
      )}
    </div>
  );
};

export default SchemeGuidance;
