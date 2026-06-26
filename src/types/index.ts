export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  wind: number;
  windDirection: string;
  cloudCover: number;
  rainChance: number;
  pressure: number;
  uv: number;
  visibility: number;
  condition: string;
  conditionIcon: string;
  sunrise: string;
  sunset: string;
  moonPhase: string;
  lat: number;
  lon: number;
}

export interface ForecastDay {
  date: string;
  dayName: string;
  temperature: number;
  minTemp: number;
  maxTemp: number;
  condition: string;
  conditionIcon: string;
  rainChance: number;
  humidity: number;
  wind: number;
  uv: number;
  ghostMood: string;
  ghostQuote: string;
  ghostImage: string;
  tags: string[];
}

export interface AlmanacEntry {
  id: string;
  date: string;
  title: string;
  city: string;
  country: string;
  weather: string;
  temperature: number;
  story: string;
  moodTags: string[];
  ghostImage: string;
  isPinned: boolean;
  isFavorite: boolean;
}

export interface Ghost {
  id: string;
  name: string;
  displayName: string;
  image: string;
  silhouette: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'secret';
  isUnlocked: boolean;
  unlockCondition: string;
  biography: string;
  favoriteWeather: string;
  timesEncountered: number;
  funFact: string;
  favoriteQuote: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ghost';
  content: string;
  timestamp: Date;
}

export interface Notification {
  id: string;
  type: 'ghost' | 'weather' | 'achievement' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface PinnedCity {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface AppSettings {
  theme: 'pastel' | 'night' | 'autumn' | 'winter' | 'cherry' | 'halloween';
  temperatureUnit: 'celsius' | 'fahrenheit';
  windUnit: 'kmh' | 'mph';
  timeFormat: '12h' | '24h';
  animations: boolean;
  reducedMotion: boolean;
  soundEnabled: boolean;
  ghostFrequency: 'low' | 'medium' | 'high';
  notifications: boolean;
}

export interface GhostMood {
  condition: string;
  mood: string;
  quote: string;
  ghostId: string;
  sadnessLevel: number;
  sadnessLabel: string;
}
