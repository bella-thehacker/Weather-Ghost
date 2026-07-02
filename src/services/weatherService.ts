import type { WeatherData, ForecastDay, GhostMood } from '../types';

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

// Maps Open-Meteo WMO Weather Interpretation Codes to your GhostMood structures
function getWMOCondition(code: number): { text: string; moodKey: string } {
  if (code === 0) return { text: 'Clear', moodKey: 'Clear' };
  if (code === 1 || code === 2) return { text: 'Partly cloudy', moodKey: 'Partly cloudy' };
  if (code === 3) return { text: 'Overcast', moodKey: 'Overcast' };
  if (code >= 45 && code <= 48) return { text: 'Fog', moodKey: 'Fog' };
  if (code === 51 || code === 53 || code === 55) return { text: 'Light drizzle', moodKey: 'Light drizzle' };
  if (code === 61 || code === 63) return { text: 'Light rain', moodKey: 'Light rain' };
  if (code === 65) return { text: 'Heavy rain', moodKey: 'Heavy rain' };
  if (code === 71 || code === 73 || code === 75) return { text: 'Light snow', moodKey: 'Light snow' };
  if (code === 80 || code === 81 || code === 82) return { text: 'Light rain shower', moodKey: 'Light rain shower' };
  if (code >= 95) return { text: 'Heavy rain with thunder', moodKey: 'Moderate or heavy rain with thunder' };
  
  return { text: 'Partly cloudy', moodKey: 'Partly cloudy' };
}

const conditionToGhost: Record<string, GhostMood> = {
  'Sunny': { condition: 'Sunny', mood: 'Radiant', quote: "The sun woke up confident today. So should you.", ghostId: 'vacation', sadnessLevel: 5, sadnessLabel: 'The sky is thriving.' },
  'Clear': { condition: 'Clear', mood: 'Peaceful', quote: "Not a cloud in sight. The sky is showing off.", ghostId: 'normal', sadnessLevel: 3, sadnessLabel: "The sky couldn't be happier." },
  'Partly cloudy': { condition: 'Partly Cloudy', mood: 'Chill', quote: "The clouds are socially distancing. Respect.", ghostId: 'normal', sadnessLevel: 15, sadnessLabel: 'Minor atmospheric awkwardness.' },
  'Cloudy': { condition: 'Cloudy', mood: 'Pensive', quote: "The clouds look emotionally unavailable today.", ghostId: 'sleepy', sadnessLevel: 35, sadnessLabel: 'Slight emotional turbulence.' },
  'Overcast': { condition: 'Overcast', mood: 'Melancholy', quote: "The sky put on a gray sweater and is not taking it off.", ghostId: 'sleepy', sadnessLevel: 55, sadnessLabel: 'The sky is having a moment.' },
  'Fog': { condition: 'Fog', mood: 'Dreamy', quote: "The world is wrapped in a cloud blanket. Very cozy.", ghostId: 'sleepy', sadnessLevel: 30, sadnessLabel: 'Atmospheric hug.' },
  'Light drizzle': { condition: 'Light Drizzle', mood: 'Tender', quote: "The sky is barely crying. Just a few tears.", ghostId: 'crying', sadnessLevel: 28, sadnessLabel: 'Gentle sky tears.' },
  'Light rain': { condition: 'Light Rain', mood: 'Blue', quote: "Soft rain, soft moods. The sky needed this.", ghostId: 'crying', sadnessLevel: 48, sadnessLabel: 'Tender melancholy.' },
  'Heavy rain': { condition: 'Heavy Rain', mood: 'Devastated', quote: "Everything is damp and I cannot even dry off.", ghostId: 'crying', sadnessLevel: 85, sadnessLabel: 'Complete emotional collapse.' },
  'Light snow': { condition: 'Light Snow', mood: 'Gentle', quote: "Soft snow falling like powdered sugar from heaven.", ghostId: 'normal', sadnessLevel: 22, sadnessLabel: 'Gentle sky dusting.' },
  'Light rain shower': { condition: 'Light Rain Shower', mood: 'Brief', quote: "Quick rain shower. The sky just needed a moment.", ghostId: 'crying', sadnessLevel: 38, sadnessLabel: 'Brief emotional release.' },
  'Moderate or heavy rain with thunder': { condition: 'Heavy Rain with Thunder', mood: 'Ferocious', quote: "The sky is ANGRY. Best to stay inside and hide.", ghostId: 'storm', sadnessLevel: 88, sadnessLabel: 'Sky rage.' },
};

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const ghostImages: Record<string, string> = {
  'normal': '/ghosts/Normal-ghost.png',
  'crying': '/ghosts/crying-ghost.png',
  'rainbow': '/ghosts/rainbow-ghost.png',
  'vacation': '/ghosts/vacation-ghost.png',
  'storm': '/ghosts/storm-ghost.png',
  'sleepy': '/ghosts/sleepy-ghost.png',
  'melting': '/ghosts/melting-ghost.png',
};

export function getGhostMood(condition: string): GhostMood {
  return conditionToGhost[condition] || {
    condition,
    mood: 'Curious',
    quote: "The weather is being mysterious today. Intriguing!",
    ghostId: 'normal',
    sadnessLevel: 30,
    sadnessLabel: 'Pleasantly puzzled.',
  };
}

// Maps atmospheric states to retro icon public paths
export function getWeatherIconAsset(condition: string): string {
  const normal = condition.toLowerCase();
  if (normal.includes('sunny') || normal.includes('clear')) return '/icons/sun.png';
  if (normal.includes('thunder') || normal.includes('storm')) return '/icons/thunder-storm.png';
  if (normal.includes('rain') || normal.includes('drizzle')) return '/icons/rain-drops.png';
  if (normal.includes('snow') || normal.includes('blizzard')) return '/icons/ice-pellets.png';
  if (normal.includes('fog') || normal.includes('mist')) return '/icons/fog-cloud.png';
  return '/icons/cloud.png';
}

// Helper to fetch coordinates from Open-Meteo Geocoding API
async function getCoordinates(city: string): Promise<{ lat: number; lon: number; name: string; country: string }> {
  const response = await fetch(`${GEO_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
  if (!response.ok) throw new Error('Geocoding API Error');
  const data = await response.json();
  
  if (!data.results || data.results.length === 0) {
    throw new Error('City not found');
  }
  
  const result = data.results[0];
  return {
    lat: result.latitude,
    lon: result.longitude,
    name: result.name,
    country: result.country || 'Unknown',
  };
}

export async function fetchCurrentWeather(city: string): Promise<WeatherData> {
  try {
    const geo = await getCoordinates(city);
    const response = await fetch(
      `${WEATHER_URL}?latitude=${geo.lat}&longitude=${geo.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,visibility&daily=uv_index_max,sunrise,sunset&timezone=auto`
    );
    if (!response.ok) throw new Error('Weather API Error');
    const data = await response.json();

    const conditionDetails = getWMOCondition(data.current.weather_code);

    return {
      city: geo.name,
      country: geo.country,
      temperature: Math.round(data.current.temperature_2m),
      feelsLike: Math.round(data.current.apparent_temperature),
      humidity: data.current.relative_humidity_2m,
      wind: Math.round(data.current.wind_speed_10m),
      windDirection: `${data.current.wind_direction_10m}°`,
      cloudCover: data.current.cloud_cover,
      rainChance: data.current.precipitation > 0 ? 100 : 0, 
      pressure: Math.round(data.current.pressure_msl),
      uv: Math.round(data.daily.uv_index_max[0] || 0),
      visibility: Math.round(data.current.visibility / 1000), // convert m to km
      condition: conditionDetails.text,
      conditionIcon: getWeatherIconAsset(conditionDetails.text), 
      sunrise: data.daily.sunrise[0]?.split('T')[1] || '06:30',
      sunset: data.daily.sunset[0]?.split('T')[1] || '19:45',
      moonPhase: 'Waxing Crescent',
      lat: geo.lat,
      lon: geo.lon,
    };
  } catch (error) {
    console.error("Failed to fetch fresh weather, hitting fallback:", error);
    return getMockWeather(city);
  }
}

export async function fetchForecast(city: string): Promise<ForecastDay[]> {
  try {
    const geo = await getCoordinates(city);
    // REMOVED 'relative_humidity_2m_max' parameter to prevent Open-Meteo 400 Bad Request errors.
    const response = await fetch(
      `${WEATHER_URL}?latitude=${geo.lat}&longitude=${geo.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,uv_index_max&timezone=auto`
    );
    if (!response.ok) throw new Error('Weather API Error');
    const data = await response.json();

    return data.daily.time.map((dateStr: string, index: number) => {
      const date = new Date(dateStr);
      const conditionDetails = getWMOCondition(data.daily.weather_code[index]);
      const ghostMood = getGhostMood(conditionDetails.moodKey);

      return {
        date: dateStr,
        // Uses getUTCDay to prevent local offset shifts causing day name mismatching
        dayName: index === 0 ? 'Today' : dayNames[date.getUTCDay()],
        temperature: Math.round((data.daily.temperature_2m_max[index] + data.daily.temperature_2m_min[index]) / 2),
        minTemp: Math.round(data.daily.temperature_2m_min[index]),
        maxTemp: Math.round(data.daily.temperature_2m_max[index]),
        condition: conditionDetails.text,
        conditionIcon: getWeatherIconAsset(conditionDetails.text),
        rainChance: data.daily.precipitation_probability_max[index] || 0,
        humidity: 60, // Default estimate as Open-Meteo does not supply daily humidity arrays
        wind: Math.round(data.daily.wind_speed_10m_max[index] || 10),
        uv: Math.round(data.daily.uv_index_max[index] || 0),
        ghostMood: ghostMood.mood,
        ghostQuote: ghostMood.quote,
        ghostImage: ghostImages[ghostMood.ghostId] || ghostImages['normal'],
        tags: [conditionDetails.text, ghostMood.mood],
      };
    });
  } catch (error) {
    console.error("Failed to fetch fresh forecast, hitting fallback:", error);
    return getMockForecast(city);
  }
}

function getMockWeather(city: string): WeatherData {
  return {
    city: city || 'Nairobi',
    country: 'Kenya',
    temperature: 18,
    feelsLike: 16,
    humidity: 65,
    wind: 12,
    windDirection: 'SW',
    cloudCover: 45,
    rainChance: 20,
    pressure: 1013,
    uv: 4,
    visibility: 10,
    condition: 'Partly cloudy',
    conditionIcon: '/icons/cloud.png',
    sunrise: '06:30',
    sunset: '19:45',
    moonPhase: 'Waxing Crescent',
    lat: -1.2921,
    lon: 36.8219,
  };
}

function getMockForecast(_city: string): ForecastDay[] {
  const conditions = [
    { condition: 'Sunny', temp: 24, ghost: 'vacation', mood: 'Radiant', quote: "The sun woke up confident today. So should you." },
    { condition: 'Light rain', temp: 19, ghost: 'crying', mood: 'Blue', quote: "The sky has been crying. I brought tissues." },
    { condition: 'Partly cloudy', temp: 22, ghost: 'rainbow', mood: 'Vibrant', quote: "I am literally a rainbow. Watch me glow!" },
    { condition: 'Heavy rain', temp: 16, ghost: 'crying', mood: 'Devastated', quote: "Everything is damp and I cannot even dry off." },
    { condition: 'Thunderstorm', temp: 18, ghost: 'storm', mood: 'Electric', quote: "Getting some serious haunting vibes tonight." },
    { condition: 'Partly cloudy', temp: 21, ghost: 'normal', mood: 'Chill', quote: "50% Cloud, 50% Ghost, 100% Weekend." },
    { condition: 'Clear', temp: 20, ghost: 'sleepy', mood: 'Sleepy', quote: "Ghosting all my social plans today." },
  ];

  const today = new Date();
  return conditions.map((c, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    return {
      date: date.toISOString().split('T')[0],
      dayName: i === 0 ? 'Today' : dayNames[date.getDay()],
      temperature: c.temp,
      minTemp: c.temp - 4,
      maxTemp: c.temp + 3,
      condition: c.condition,
      conditionIcon: '/icons/cloud.png',
      rainChance: c.condition.includes('rain') ? 80 : c.condition.includes('cloud') ? 30 : 10,
      humidity: 55 + Math.floor(Math.random() * 20),
      wind: 8 + Math.floor(Math.random() * 15),
      uv: c.condition === 'Sunny' ? 8 : 3,
      ghostMood: c.mood,
      ghostQuote: c.quote,
      ghostImage: ghostImages[c.ghost] || ghostImages['normal'],
      tags: [c.condition, c.mood],
    };
  });
}