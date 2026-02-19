
export enum AppTab {
  DASHBOARD = 'dashboard',
  CROP_ADVISORY = 'crop_advisory',
  WEATHER = 'weather',
  MARKET = 'market',
  SCHEMES = 'schemes'
}

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  location: string;
  recommendation: string;
}

export interface MandiPrice {
  commodity: string;
  market: string;
  price: string;
  trend: 'up' | 'down' | 'stable';
}

export interface Scheme {
  title: string;
  description: string;
  benefits: string[];
  link: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
