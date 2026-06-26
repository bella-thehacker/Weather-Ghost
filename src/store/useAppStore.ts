import { create } from 'zustand';
import type { AppSettings, PinnedCity, Notification, Ghost } from '../types';

interface AppState {
  settings: AppSettings;
  currentCity: string;
  pinnedCities: PinnedCity[];
  notifications: Notification[];
  ghosts: Ghost[];
  activeTab: string;
  sidebarOpen: boolean;
  isLoading: boolean;

  setSettings: (settings: Partial<AppSettings>) => void;
  setCurrentCity: (city: string) => void;
  addPinnedCity: (city: PinnedCity) => void;
  removePinnedCity: (id: string) => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  unlockGhost: (id: string) => void;
  setActiveTab: (tab: string) => void;
  setSidebarOpen: (open: boolean) => void;
  setIsLoading: (loading: boolean) => void;
}

const defaultSettings: AppSettings = {
  theme: 'pastel',
  temperatureUnit: 'celsius',
  windUnit: 'kmh',
  timeFormat: '12h',
  animations: true,
  reducedMotion: false,
  soundEnabled: false,
  ghostFrequency: 'medium',
  notifications: true,
};

const initialGhosts: Ghost[] = [
  {
    id: 'normal',
    name: 'casper',
    displayName: 'Casper',
    image: '/ghosts/Normal-ghost.png',
    silhouette: '/ghosts/Normal-ghost.png',
    rarity: 'common',
    isUnlocked: true,
    unlockCondition: 'Default companion',
    biography: 'Your first ghost friend. Casper is cheerful, optimistic, and always ready to interpret the weather with a smile.',
    favoriteWeather: 'Partly Cloudy',
    timesEncountered: 42,
    funFact: 'Casper once tried to haunt a cloud and ended up making it rain rainbow sprinkles.',
    favoriteQuote: "Every cloud has a silver lining, but I prefer the pink ones!",
  },
  {
    id: 'crying',
    name: 'drizzle',
    displayName: 'Drizzle',
    image: '/ghosts/crying-ghost.png',
    silhouette: '/ghosts/crying-ghost.png',
    rarity: 'common',
    isUnlocked: true,
    unlockCondition: 'Encounter rain',
    biography: 'A sensitive soul who feels every raindrop deeply. Drizzle believes the sky cries so the earth can smile.',
    favoriteWeather: 'Rain',
    timesEncountered: 18,
    funFact: 'Drizzle collects tears in tiny bottles and uses them to water houseplants.',
    favoriteQuote: "The sky has been crying again. I brought tissues.",
  },
  {
    id: 'rainbow',
    name: 'prism',
    displayName: 'Prism',
    image: '/ghosts/rainbow-ghost.png',
    silhouette: '/ghosts/rainbow-ghost.png',
    rarity: 'uncommon',
    isUnlocked: true,
    unlockCondition: 'See a rainbow day',
    biography: 'Born from light and water, Prism is the most colorful ghost in the collection. They appear after rain to spread joy.',
    favoriteWeather: 'Rainbow',
    timesEncountered: 7,
    funFact: 'Prism can refract sunlight into seven different flavors of ice cream.',
    favoriteQuote: "I am literally a rainbow. Watch me glow!",
  },
  {
    id: 'vacation',
    name: 'sunny',
    displayName: 'Sunny',
    image: '/ghosts/vacation-ghost.png',
    silhouette: '/ghosts/vacation-ghost.png',
    rarity: 'uncommon',
    isUnlocked: false,
    unlockCondition: 'Check weather on a sunny day',
    biography: 'Sunny is always on vacation, even when it rains. They wear sunglasses indoors and believe every day is beach day.',
    favoriteWeather: 'Sunny',
    timesEncountered: 0,
    funFact: 'Sunny has a collection of 47 virtual beach towels, all pixelated.',
    favoriteQuote: "Too bright for mortals, just right for ghosts.",
  },
  {
    id: 'storm',
    name: 'volt',
    displayName: 'Volt',
    image: '/ghosts/storm-ghost.png',
    silhouette: '/ghosts/storm-ghost.png',
    rarity: 'rare',
    isUnlocked: false,
    unlockCondition: 'Experience a thunderstorm',
    biography: 'An electrifying presence with a booming personality. Volt loves dramatic entrances and crackling conversations.',
    favoriteWeather: 'Thunderstorm',
    timesEncountered: 0,
    funFact: 'Volt static-zaps pillows to make them extra fluffy.',
    favoriteQuote: "Getting some serious haunting vibes tonight.",
  },
  {
    id: 'sleepy',
    name: 'dozer',
    displayName: 'Dozer',
    image: '/ghosts/sleepy-ghost.png',
    silhouette: '/ghosts/sleepy-ghost.png',
    rarity: 'common',
    isUnlocked: false,
    unlockCondition: 'Check weather after midnight',
    biography: 'Dozer is perpetually half-asleep, floating through dreams and clouds alike. The coziest ghost you will ever meet.',
    favoriteWeather: 'Fog',
    timesEncountered: 0,
    funFact: 'Dozer once slept through an entire hurricane and woke up thinking it was just a loud lullaby.',
    favoriteQuote: "Ghosting all my social plans today.",
  },
  {
    id: 'melting',
    name: 'drip',
    displayName: 'Drip',
    image: '/ghosts/melting-ghost.png',
    silhouette: '/ghosts/melting-ghost.png',
    rarity: 'rare',
    isUnlocked: false,
    unlockCondition: 'Check weather above 35°C',
    biography: 'Drip is what happens when ghosts experience extreme heat. They are surprisingly chill about literally melting.',
    favoriteWeather: 'Hot',
    timesEncountered: 0,
    funFact: 'Drip collects their own drips and makes them into ghost tea.',
    favoriteQuote: "So hot the sidewalk pixels were literally vibrating.",
  },
];

const initialPinnedCities: PinnedCity[] = [
  { id: '1', name: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522 },
  { id: '2', name: 'Seoul', country: 'South Korea', lat: 37.5665, lon: 126.978 },
  { id: '3', name: 'Reykjavik', country: 'Iceland', lat: 64.1466, lon: -21.9426 },
  { id: '4', name: 'Cape Town', country: 'South Africa', lat: -33.9249, lon: 18.4241 },
];

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'ghost',
    title: 'New Ghost Unlocked!',
    message: 'Drizzle has joined your collection.',
    timestamp: new Date(Date.now() - 3600000),
    read: false,
  },
  {
    id: '2',
    type: 'weather',
    title: 'Rain Expected',
    message: 'Bring an umbrella tomorrow, the sky looks emotional.',
    timestamp: new Date(Date.now() - 7200000),
    read: false,
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Weather Watcher',
    message: 'You checked the weather 7 days in a row!',
    timestamp: new Date(Date.now() - 86400000),
    read: true,
  },
];

export const useAppStore = create<AppState>((set) => ({
  settings: defaultSettings,
  currentCity: 'London',
  pinnedCities: initialPinnedCities,
  notifications: initialNotifications,
  ghosts: initialGhosts,
  activeTab: 'dashboard',
  sidebarOpen: true,
  isLoading: false,

  setSettings: (newSettings) =>
    set((state) => ({ settings: { ...state.settings, ...newSettings } })),
  setCurrentCity: (city) => set({ currentCity: city }),
  addPinnedCity: (city) =>
    set((state) => ({ pinnedCities: [...state.pinnedCities, city] })),
  removePinnedCity: (id) =>
    set((state) => ({ pinnedCities: state.pinnedCities.filter((c) => c.id !== id) })),
  addNotification: (notification) =>
    set((state) => ({ notifications: [notification, ...state.notifications] })),
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  clearNotifications: () => set({ notifications: [] }),
  unlockGhost: (id) =>
    set((state) => ({
      ghosts: state.ghosts.map((g) =>
        g.id === id ? { ...g, isUnlocked: true, timesEncountered: g.timesEncountered + 1 } : g
      ),
    })),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
