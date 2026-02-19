
import React, { useState, useRef, useEffect } from 'react';
import { getCropAdvisory } from '../geminiService';
import { ChatMessage } from '../types';

interface Props {
  initialQuery?: string;
}

const CropAdvisory: React.FC<Props> = ({ initialQuery }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle auto-trigger from Smart Search
  useEffect(() => {
    if (initialQuery && !initialized.current) {
      initialized.current = true;
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await getCropAdvisory(text);
      const modelMsg: ChatMessage = {
        role: 'model',
        text: response || 'Sorry, I couldn\'t diagnose that. Try being more specific.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        role: 'model',
        text: 'Connection error. Please check your internet and try again.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[75vh] bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-in slide-in-from-right duration-300">
      <div className="p-4 bg-emerald-50 border-b border-emerald-100">
        <h2 className="font-bold text-emerald-900 flex items-center gap-2">
          <span>🩺</span> Crop Advisory Agent
        </h2>
        <p className="text-[10px] text-emerald-700 uppercase font-bold tracking-tight">AI Pest & Disease Diagnosis</p>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.length === 0 && !isLoading && (
          <div className="text-center py-10 px-6">
            <div className="text-4xl mb-4">🩺</div>
            <h3 className="font-bold text-slate-800">What's wrong with your crop?</h3>
            <p className="text-slate-500 text-sm mt-2">Example: "My tomato leaves are turning yellow with brown spots."</p>
          </div>
        )}
        
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] rounded-2xl px-4 py-3 shadow-sm ${
              m.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-br-none' 
                : 'bg-slate-50 text-slate-800 rounded-bl-none border border-slate-100'
            }`}>
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {m.text}
              </div>
              <div className={`text-[10px] mt-1 opacity-60 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 rounded-bl-none">
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-slate-100 bg-white flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type crop problem..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white w-10 h-10 rounded-2xl flex items-center justify-center transition-colors shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default CropAdvisory;
