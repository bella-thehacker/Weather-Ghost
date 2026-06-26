import type { WeatherData, ForecastDay, GhostMood } from '../types';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'demo_key';
const BASE_URL = 'https://api.weatherapi.com/v1';

const conditionToGhost: Record<string, GhostMood> = {
  'Sunny': {
    condition: 'Sunny',
    mood: 'Radiant',
    quote: "The sun woke up confident today. So should you.",
    ghostId: 'vacation',
    sadnessLevel: 5,
    sadnessLabel: 'The sky is thriving.',
  },
  'Clear': {
    condition: 'Clear',
    mood: 'Peaceful',
    quote: "Not a cloud in sight. The sky is showing off.",
    ghostId: 'normal',
    sadnessLevel: 3,
    sadnessLabel: "The sky couldn't be happier.",
  },
  'Partly cloudy': {
    condition: 'Partly Cloudy',
    mood: 'Chill',
    quote: "The clouds are socially distancing. Respect.",
    ghostId: 'normal',
    sadnessLevel: 15,
    sadnessLabel: 'Minor atmospheric awkwardness.',
  },
  'Cloudy': {
    condition: 'Cloudy',
    mood: 'Pensive',
    quote: "The clouds look emotionally unavailable today.",
    ghostId: 'sleepy',
    sadnessLevel: 35,
    sadnessLabel: 'Slight emotional turbulence.',
  },
  'Overcast': {
    condition: 'Overcast',
    mood: 'Melancholy',
    quote: "The sky put on a gray sweater and is not taking it off.",
    ghostId: 'sleepy',
    sadnessLevel: 55,
    sadnessLabel: 'The sky is having a moment.',
  },
  'Mist': {
    condition: 'Mist',
    mood: 'Mysterious',
    quote: "Everything is soft focus today. Very cinematic.",
    ghostId: 'sleepy',
    sadnessLevel: 40,
    sadnessLabel: 'Atmospheric confusion.',
  },
  'Patchy rain possible': {
    condition: 'Patchy Rain',
    mood: 'Uncertain',
    quote: "The sky is thinking about crying but hasn't committed yet.",
    ghostId: 'crying',
    sadnessLevel: 45,
    sadnessLabel: 'Emotional hesitation.',
  },
  'Patchy snow possible': {
    condition: 'Patchy Snow',
    mood: 'Whimsical',
    quote: "Snowflakes! Tiny sky ghosts falling gently.",
    ghostId: 'normal',
    sadnessLevel: 20,
    sadnessLabel: 'Light atmospheric whimsy.',
  },
  'Patchy sleet possible': {
    condition: 'Patchy Sleet',
    mood: 'Confused',
    quote: "The sky cannot decide between rain and snow. Indecisive much?",
    ghostId: 'crying',
    sadnessLevel: 50,
    sadnessLabel: 'Meteorological identity crisis.',
  },
  'Patchy freezing drizzle possible': {
    condition: 'Freezing Drizzle',
    mood: 'Numb',
    quote: "It is raining ice. The sky is serving frozen cocktails.",
    ghostId: 'melting',
    sadnessLevel: 60,
    sadnessLabel: 'Cryogenic drizzle.',
  },
  'Thundery outbreaks possible': {
    condition: 'Thundery Outbreaks',
    mood: 'Dramatic',
    quote: "The sky is doing its best gothic novel impression.",
    ghostId: 'storm',
    sadnessLevel: 70,
    sadnessLabel: 'Atmospheric drama.',
  },
  'Blowing snow': {
    condition: 'Blowing Snow',
    mood: 'Fierce',
    quote: "Snow is going sideways. Physics has opinions.",
    ghostId: 'storm',
    sadnessLevel: 75,
    sadnessLabel: 'Wind-blown despair.',
  },
  'Blizzard': {
    condition: 'Blizzard',
    mood: 'Intense',
    quote: "The sky is throwing a tantrum. Stay inside and have cocoa.",
    ghostId: 'storm',
    sadnessLevel: 88,
    sadnessLabel: 'Complete emotional whiteout.',
  },
  'Fog': {
    condition: 'Fog',
    mood: 'Dreamy',
    quote: "The world is wrapped in a cloud blanket. Very cozy.",
    ghostId: 'sleepy',
    sadnessLevel: 30,
    sadnessLabel: 'Atmospheric hug.',
  },
  'Freezing fog': {
    condition: 'Freezing Fog',
    mood: 'Eerie',
    quote: "Fog with a chill. The sky is ghosting you literally.",
    ghostId: 'storm',
    sadnessLevel: 65,
    sadnessLabel: 'Supernatural fog.',
  },
  'Patchy light drizzle': {
    condition: 'Light Drizzle',
    mood: 'Gentle',
    quote: "Just a little sky sweat. Nothing serious.",
    ghostId: 'crying',
    sadnessLevel: 25,
    sadnessLabel: 'Atmospheric misting.',
  },
  'Light drizzle': {
    condition: 'Light Drizzle',
    mood: 'Tender',
    quote: "The sky is barely crying. Just a few tears.",
    ghostId: 'crying',
    sadnessLevel: 28,
    sadnessLabel: 'Gentle sky tears.',
  },
  'Freezing drizzle': {
    condition: 'Freezing Drizzle',
    mood: 'Cold',
    quote: "Liquid ice falling from the sky. Nature is wild.",
    ghostId: 'melting',
    sadnessLevel: 62,
    sadnessLabel: 'Frozen tears.',
  },
  'Heavy freezing drizzle': {
    condition: 'Heavy Freezing Drizzle',
    mood: 'Suffering',
    quote: "The sky is crying ice cubes. Very uncomfortable.",
    ghostId: 'melting',
    sadnessLevel: 78,
    sadnessLabel: 'Severe cryogenic sadness.',
  },
  'Patchy light rain': {
    condition: 'Patchy Light Rain',
    mood: 'Somber',
    quote: "The sky is having a light cry. Give it space.",
    ghostId: 'crying',
    sadnessLevel: 42,
    sadnessLabel: 'Light emotional rainfall.',
  },
  'Light rain': {
    condition: 'Light Rain',
    mood: 'Blue',
    quote: "Soft rain, soft moods. The sky needed this.",
    ghostId: 'crying',
    sadnessLevel: 48,
    sadnessLabel: 'Tender melancholy.',
  },
  'Moderate rain at times': {
    condition: 'Moderate Rain',
    mood: 'Sad',
    quote: "The sky has been crying. I brought tissues.",
    ghostId: 'crying',
    sadnessLevel: 58,
    sadnessLabel: 'Moderate emotional rainfall.',
  },
  'Moderate rain': {
    condition: 'Moderate Rain',
    mood: 'Weepy',
    quote: "Steady rain means steady feelings. The sky is processing.",
    ghostId: 'crying',
    sadnessLevel: 62,
    sadnessLabel: 'Existential drizzle.',
  },
  'Heavy rain at times': {
    condition: 'Heavy Rain',
    mood: 'Distressed',
    quote: "The sky is SOBBING. Someone give it a blanket.",
    ghostId: 'crying',
    sadnessLevel: 78,
    sadnessLabel: 'Intense atmospheric grief.',
  },
  'Heavy rain': {
    condition: 'Heavy Rain',
    mood: 'Devastated',
    quote: "Everything is damp and I cannot even dry off.",
    ghostId: 'crying',
    sadnessLevel: 85,
    sadnessLabel: 'Complete emotional collapse.',
  },
  'Light freezing rain': {
    condition: 'Light Freezing Rain',
    mood: 'Icy',
    quote: "Rain that freezes on contact. The sky is being passive-aggressive.",
    ghostId: 'melting',
    sadnessLevel: 68,
    sadnessLabel: 'Passive-aggressive precipitation.',
  },
  'Moderate or heavy freezing rain': {
    condition: 'Heavy Freezing Rain',
    mood: 'Frigid',
    quote: "The sky is throwing ice daggers. Very rude.",
    ghostId: 'melting',
    sadnessLevel: 82,
    sadnessLabel: 'Hostile atmospheric conditions.',
  },
  'Light sleet': {
    condition: 'Light Sleet',
    mood: 'Uncertain',
    quote: "Is it rain? Is it snow? It is both and neither.",
    ghostId: 'crying',
    sadnessLevel: 52,
    sadnessLabel: 'Meteorological confusion.',
  },
  'Moderate or heavy sleet': {
    condition: 'Heavy Sleet',
    mood: 'Chaotic',
    quote: "The weather is having an identity crisis. Pick a lane!",
    ghostId: 'storm',
    sadnessLevel: 72,
    sadnessLabel: 'Severe identity crisis.',
  },
  'Patchy light snow': {
    condition: 'Patchy Light Snow',
    mood: 'Delicate',
    quote: "Tiny snowflakes! The sky is sending love letters.",
    ghostId: 'normal',
    sadnessLevel: 18,
    sadnessLabel: 'Whimsical flurries.',
  },
  'Light snow': {
    condition: 'Light Snow',
    mood: 'Gentle',
    quote: "Soft snow falling like powdered sugar from heaven.",
    ghostId: 'normal',
    sadnessLevel: 22,
    sadnessLabel: 'Gentle sky dusting.',
  },
  'Patchy moderate snow': {
    condition: 'Patchy Moderate Snow',
    mood: 'Playful',
    quote: "The sky is making it snow! Time for hot chocolate!",
    ghostId: 'normal',
    sadnessLevel: 20,
    sadnessLabel: 'Playful precipitation.',
  },
  'Moderate snow': {
    condition: 'Moderate Snow',
    mood: 'Festive',
    quote: "It is snowing properly now. Winter wonderland activated!",
    ghostId: 'normal',
    sadnessLevel: 16,
    sadnessLabel: 'Festive flurries.',
  },
  'Patchy heavy snow': {
    condition: 'Patchy Heavy Snow',
    mood: 'Intense',
    quote: "Serious snowfall. The sky is redecorating the world in white.",
    ghostId: 'storm',
    sadnessLevel: 45,
    sadnessLabel: 'Aggressive redecoration.',
  },
  'Heavy snow': {
    condition: 'Heavy Snow',
    mood: 'Overwhelming',
    quote: "So much snow! The sky is really committed to this winter thing.",
    ghostId: 'storm',
    sadnessLevel: 55,
    sadnessLabel: 'Winter domination.',
  },
  'Ice pellets': {
    condition: 'Ice Pellets',
    mood: 'Sharp',
    quote: "The sky is throwing tiny ice balls. Not cool, sky.",
    ghostId: 'melting',
    sadnessLevel: 74,
    sadnessLabel: 'Atmospheric aggression.',
  },
  'Light rain shower': {
    condition: 'Light Rain Shower',
    mood: 'Brief',
    quote: "Quick rain shower. The sky just needed a moment.",
    ghostId: 'crying',
    sadnessLevel: 38,
    sadnessLabel: 'Brief emotional release.',
  },
  'Moderate or heavy rain shower': {
    condition: 'Rain Shower',
    mood: 'Sudden',
    quote: "Sudden downpour! The sky has FEELINGS about this.",
    ghostId: 'crying',
    sadnessLevel: 65,
    sadnessLabel: 'Sudden emotional outburst.',
  },
  'Torrential rain shower': {
    condition: 'Torrential Rain',
    mood: 'Chaotic',
    quote: "The sky opened up and said EVERYTHING at once.",
    ghostId: 'crying',
    sadnessLevel: 92,
    sadnessLabel: 'Catastrophic venting.',
  },
  'Light sleet showers': {
    condition: 'Light Sleet Showers',
    mood: 'Indecisive',
    quote: "Rain, snow, or both? The sky cannot choose.",
    ghostId: 'crying',
    sadnessLevel: 48,
    sadnessLabel: 'Indecisive precipitation.',
  },
  'Moderate or heavy sleet showers': {
    condition: 'Heavy Sleet Showers',
    mood: 'Frustrated',
    quote: "The weather app itself is confused. Sleet? Really?",
    ghostId: 'storm',
    sadnessLevel: 66,
    sadnessLabel: 'Frustrating conditions.',
  },
  'Light snow showers': {
    condition: 'Light Snow Showers',
    mood: 'Whimsical',
    quote: "Brief snow! The sky is sending little fluffy surprises.",
    ghostId: 'normal',
    sadnessLevel: 14,
    sadnessLabel: 'Fluffy surprises.',
  },
  'Moderate or heavy snow showers': {
    condition: 'Heavy Snow Showers',
    mood: 'Intense',
    quote: "Snow squall! The sky is being very generous with the white stuff.",
    ghostId: 'storm',
    sadnessLevel: 50,
    sadnessLabel: 'Generous snowfall.',
  },
  'Light showers of ice pellets': {
    condition: 'Light Ice Pellets',
    mood: 'Stinging',
    quote: "Tiny ice balls from above. The sky is grumpy.",
    ghostId: 'melting',
    sadnessLevel: 70,
    sadnessLabel: 'Grumpy sky.',
  },
  'Moderate or heavy showers of ice pellets': {
    condition: 'Heavy Ice Pellets',
    mood: 'Aggressive',
    quote: "The sky is throwing ice rocks. Seek shelter immediately!",
    ghostId: 'storm',
    sadnessLevel: 80,
    sadnessLabel: 'Hostile ice attack.',
  },
  'Patchy light rain with thunder': {
    condition: 'Rain with Thunder',
    mood: 'Dramatic',
    quote: "Thunder AND rain? The sky is performing Shakespeare.",
    ghostId: 'storm',
    sadnessLevel: 72,
    sadnessLabel: 'Theatrical weather.',
  },
  'Moderate or heavy rain with thunder': {
    condition: 'Heavy Rain with Thunder',
    mood: 'Ferocious',
    quote: "The sky is ANGRY. Best to stay inside and hide.",
    ghostId: 'storm',
    sadnessLevel: 88,
    sadnessLabel: 'Sky rage.',
  },
  'Patchy light snow with thunder': {
    condition: 'Snow with Thunder',
    mood: 'Apocalyptic',
    quote: "Thundersnow?! The sky is having an EXTREME moment.",
    ghostId: 'storm',
    sadnessLevel: 85,
    sadnessLabel: 'Atmospheric breakdown.',
  },
  'Moderate or heavy snow with thunder': {
    condition: 'Heavy Snow with Thunder',
    mood: 'Cataclysmic',
    quote: "The end times are snowy and loud. Incredible.",
    ghostId: 'storm',
    sadnessLevel: 95,
    sadnessLabel: 'Total atmospheric collapse.',
  },
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

function getGhostMood(condition: string): GhostMood {
  return conditionToGhost[condition] || {
    condition,
    mood: 'Curious',
    quote: "The weather is being mysterious today. Intriguing!",
    ghostId: 'normal',
    sadnessLevel: 30,
    sadnessLabel: 'Pleasantly puzzled.',
  };
}

function getMoonPhase(): string {
  const phases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous',
    'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
  return phases[Math.floor(Math.random() * phases.length)];
}

export async function fetchCurrentWeather(city: string): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=yes`
    );
    if (!response.ok) throw new Error('API Error');
    const data = await response.json();

    return {
      city: data.location.name,
      country: data.location.country,
      temperature: data.current.temp_c,
      feelsLike: data.current.feelslike_c,
      humidity: data.current.humidity,
      wind: data.current.wind_kph,
      windDirection: data.current.wind_dir,
      cloudCover: data.current.cloud,
      rainChance: data.current.precip_mm > 0 ? Math.min(100, Math.round(data.current.precip_mm * 10)) : 0,
      pressure: data.current.pressure_mb,
      uv: data.current.uv,
      visibility: data.current.vis_km,
      condition: data.current.condition.text,
      conditionIcon: `https:${data.current.condition.icon}`,
      sunrise: data.current.is_day ? '06:30' : '06:45',
      sunset: data.current.is_day ? '19:45' : '19:30',
      moonPhase: getMoonPhase(),
      lat: data.location.lat,
      lon: data.location.lon,
    };
  } catch {
    return getMockWeather(city);
  }
}

export async function fetchForecast(city: string): Promise<ForecastDay[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=7&aqi=no`
    );
    if (!response.ok) throw new Error('API Error');
    const data = await response.json();

    return data.forecast.forecastday.map((day: Record<string, unknown>, index: number) => {
      const date = new Date(day.date as string);
      const condition = (day.day as Record<string, unknown>).condition as Record<string, unknown>;
      const ghostMood = getGhostMood(condition.text as string);

      return {
        date: day.date as string,
        dayName: index === 0 ? 'Today' : dayNames[date.getDay()],
        temperature: Math.round((day.day as Record<string, unknown>).avgtemp_c as number),
        minTemp: Math.round((day.day as Record<string, unknown>).mintemp_c as number),
        maxTemp: Math.round((day.day as Record<string, unknown>).maxtemp_c as number),
        condition: condition.text as string,
        conditionIcon: `https:${condition.icon}`,
        rainChance: Math.round((day.day as Record<string, unknown>).daily_chance_of_rain as number),
        humidity: Math.round((day.day as Record<string, unknown>).avghumidity as number),
        wind: Math.round((day.day as Record<string, unknown>).maxwind_kph as number),
        uv: (day.day as Record<string, unknown>).uv as number,
        ghostMood: ghostMood.mood,
        ghostQuote: ghostMood.quote,
        ghostImage: ghostImages[ghostMood.ghostId] || ghostImages['normal'],
        tags: [(condition.text as string).split(' ').slice(0, 2).join(' '), ghostMood.mood],
      };
    });
  } catch {
    return getMockForecast(city);
  }
}

function getMockWeather(city: string): WeatherData {
  return {
    city: city || 'London',
    country: 'United Kingdom',
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
    lat: 51.5074,
    lon: -0.1278,
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

export { getGhostMood };
