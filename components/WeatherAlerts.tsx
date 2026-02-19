
import React, { useState, useEffect } from 'react';
import { getWeatherRecommendation } from '../geminiService';

const WeatherAlerts: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [aiAdvice, setAiAdvice] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        // Using a public open weather proxy or direct fetch for Demo
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&timezone=auto`);
        const data = await res.json();
        setWeatherData(data);
        
        const advice = await getWeatherRecommendation(lat, lon, JSON.stringify(data.current));
        setAiAdvice(advice);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
          fetchWeather(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          // Default to a central farming location if permission denied
          const defaultLoc = { lat: 28.6139, lon: 77.2090 }; // Delhi
          setLocation(defaultLoc);
          fetchWeather(defaultLoc.lat, defaultLoc.lon);
        }
      );
    }
  }, []);

  const getWeatherDescription = (code: number) => {
    // Basic WMO Code mapping
    if (code === 0) return 'Clear Sky';
    if (code < 3) return 'Partly Cloudy';
    if (code < 50) return 'Foggy';
    if (code < 70) return 'Rainy';
    if (code < 80) return 'Snowy';
    return 'Stormy';
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
        <p className="text-slate-500 animate-pulse">Fetching local conditions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-600 to-blue-400 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold">{weatherData?.current.temperature_2m}°C</h2>
            <p className="text-blue-50 font-medium">{getWeatherDescription(weatherData?.current.weather_code)}</p>
            <p className="text-xs text-blue-100 opacity-80 mt-1">Locating your farm...</p>
          </div>
          <div className="text-5xl">
             {weatherData?.current.weather_code === 0 ? '☀️' : '☁️'}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6 border-t border-white/20 pt-4">
          <div className="flex items-center gap-2">
            <span className="opacity-70 text-sm">Humidity</span>
            <span className="font-bold">{weatherData?.current.relative_humidity_2m}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="opacity-70 text-sm">Wind</span>
            <span className="font-bold">{weatherData?.current.wind_speed_10m} km/h</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xl">
            💡
          </div>
          <h3 className="font-bold text-slate-800">Farming Logic Alert</h3>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-emerald-500">
          <p className="text-slate-700 leading-relaxed italic">
            "{aiAdvice}"
          </p>
        </div>
        <p className="text-[10px] text-slate-400 mt-4 uppercase font-bold tracking-widest text-center">
          Powered by Gemini AI Real-time Analysis
        </p>
      </div>
    </div>
  );
};

export default WeatherAlerts;
