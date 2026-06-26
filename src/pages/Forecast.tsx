import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, MapPin } from 'lucide-react';
import GhostWindow from '../components/GhostWindow';
import WeatherChip from '../components/WeatherChip';
import { useAppStore } from '../store/useAppStore';
import { fetchForecast } from '../services/weatherService';
import type { ForecastDay } from '../types';

const tagColors: Record<string, 'yellow' | 'blue' | 'mint' | 'pink' | 'lavender' | 'peach' | 'orange' | 'cyan' | 'slate'> = {
  'Sunny': 'yellow',
  'Clear': 'yellow',
  'Rain': 'blue',
  'Cloudy': 'slate',
  'Partly Cloudy': 'mint',
  'Thunderstorm': 'lavender',
  'Snow': 'cyan',
  'Hot': 'orange',
  'Cold': 'cyan',
  'Rainbow': 'pink',
  'Magic': 'orange',
  'Drizzle': 'blue',
  'Mist': 'slate',
  'Stormy': 'lavender',
  'Static': 'yellow',
};

export default function Forecast() {
  const { currentCity } = useAppStore();
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchForecast(currentCity);
      setForecast(data);
      setLoading(false);
    }
    load();
  }, [currentCity]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <motion.div
          className="text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <img
            src="/ghosts/Normal-ghost.png"
            alt="Loading"
            className="w-16 h-16 mx-auto mb-4 animate-float"
            style={{ imageRendering: 'pixelated' }}
          />
          <p className="font-pixel text-headline-sm text-primary">Summoning forecast...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-lg">
      {/* Hero Header Window */}
      <GhostWindow
        title="weekly_outlook.exe"
        icon={<CalendarDays className="w-4 h-4 text-primary" />}
      >
        <div className="p-lg flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="font-pixel text-display-lg text-primary mb-xs">
              Spook-tacular Forecast
            </h2>
            <p className="font-fredoka text-body-lg text-on-surface-variant max-w-xl">
              A week of spectral phenomena and emotional weather events. Remember: if it rains,
              it is just the sky ghosts getting misty-eyed.
            </p>
          </motion.div>
          <motion.div
            className="flex items-center gap-md"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-secondary-container px-lg py-sm rounded-full border-2 border-secondary text-on-secondary-container font-nunito text-label-lg flex items-center gap-sm">
              <MapPin className="w-4 h-4" />
              <span>{currentCity}</span>
            </div>
          </motion.div>
        </div>
      </GhostWindow>

      {/* Forecast Scroll Area */}
      <div className="custom-scrollbar overflow-x-auto pb-lg">
        <div className="flex gap-lg min-w-max pb-md">
          {forecast.map((day, index) => (
            <motion.article
              key={day.date}
              className="ghost-window bg-surface-container-low w-72 flex-shrink-0 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              {/* Day Header */}
              <div
                className={`p-sm text-center border-b-2 border-outline-variant ${
                  index === 0
                    ? 'bg-gradient-to-r from-primary to-bubblegum-pink'
                    : 'bg-secondary-container'
                }`}
              >
                <span
                  className={`font-pixel text-label-lg ${
                    index === 0 ? 'text-white' : 'text-on-secondary-container'
                  }`}
                >
                  {day.dayName.toUpperCase()}
                </span>
              </div>

              {/* Day Content */}
              <div className="p-md flex flex-col items-center gap-md">
                {/* Ghost Image */}
                <motion.div
                  className="w-32 h-32 relative"
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 2.5 + index * 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <img
                    src={day.ghostImage}
                    alt={day.ghostMood}
                    className="w-full h-full object-contain"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>

                {/* Temperature */}
                <div className="text-center">
                  <div className="font-pixel text-display-lg text-secondary leading-tight">
                    {day.temperature}°
                  </div>
                  <div className="flex flex-wrap justify-center gap-xs mt-sm">
                    {day.tags.map((tag) => (
                      <WeatherChip
                        key={tag}
                        label={tag}
                        color={tagColors[tag] || 'blue'}
                      />
                    ))}
                  </div>
                </div>

                {/* Weather Details */}
                <div className="flex gap-md text-center w-full">
                  <div className="flex-1 bg-surface rounded-lg p-sm">
                    <p className="font-nunito text-[10px] text-on-surface-variant uppercase">Rain</p>
                    <p className="font-pixel text-label-lg text-primary">{day.rainChance}%</p>
                  </div>
                  <div className="flex-1 bg-surface rounded-lg p-sm">
                    <p className="font-nunito text-[10px] text-on-surface-variant uppercase">Wind</p>
                    <p className="font-pixel text-label-lg text-secondary">{day.wind}km/h</p>
                  </div>
                  <div className="flex-1 bg-surface rounded-lg p-sm">
                    <p className="font-nunito text-[10px] text-on-surface-variant uppercase">UV</p>
                    <p className="font-pixel text-label-lg text-yellow-600">{day.uv}</p>
                  </div>
                </div>

                {/* Ghost Quote */}
                <div className="pixel-border-dashed p-md rounded-lg bg-surface w-full">
                  <p className="font-nunito text-primary mb-1 uppercase text-[10px] opacity-70">
                    Mood: {day.ghostMood}
                  </p>
                  <p className="font-fredoka text-body-md text-on-surface italic">
                    "{day.ghostQuote}"
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        <GhostWindow title="humidity_sensor.exe">
          <div className="p-md">
            <div className="flex items-center gap-sm text-primary mb-2">
              <img src="/icons/rain-drops.png" alt="" className="w-5 h-5" style={{ imageRendering: 'pixelated' }} />
              <span className="font-nunito text-label-lg">Humidity Sensor</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="font-pixel text-display-lg text-secondary">
                {forecast[0]?.humidity || 62}%
              </span>
              <div className="flex gap-1 h-8 items-end">
                {[0.25, 0.5, 0.75, 0.33].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-3 bg-tertiary-container rounded-t-sm"
                    style={{ height: `${h * 100}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${h * 100}%` }}
                    transition={{ delay: i * 0.1 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </GhostWindow>

        <GhostWindow title="wind_sensor.exe">
          <div className="p-md">
            <div className="flex items-center gap-sm text-primary mb-2">
              <img src="/icons/wind.png" alt="" className="w-5 h-5" style={{ imageRendering: 'pixelated' }} />
              <span className="font-nunito text-label-lg">Ethereal Wind</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="font-pixel text-display-lg text-secondary">
                {forecast[0]?.wind || 12}{' '}
                <span className="text-label-lg">km/h</span>
              </span>
              <motion.div
                className="w-12 h-12 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <img src="/icons/wind.png" alt="" className="w-10 h-10 opacity-50" style={{ imageRendering: 'pixelated' }} />
              </motion.div>
            </div>
          </div>
        </GhostWindow>

        <GhostWindow title="temperature.exe">
          <div className="p-md">
            <div className="flex items-center gap-sm text-primary mb-2">
              <img src="/icons/temperature.png" alt="" className="w-5 h-5" style={{ imageRendering: 'pixelated' }} />
              <span className="font-nunito text-label-lg">Temperature Range</span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-pixel text-headline-lg text-secondary">
                    {forecast[0]?.minTemp || 14}°
                  </span>
                  <span className="font-nunito text-label-sm text-on-surface-variant">low</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-pixel text-headline-lg text-primary">
                    {forecast[0]?.maxTemp || 24}°
                  </span>
                  <span className="font-nunito text-label-sm text-on-surface-variant">high</span>
                </div>
              </div>
              <img
                src="/icons/pink-temperature.png"
                alt=""
                className="w-12 h-12"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          </div>
        </GhostWindow>
      </div>
    </div>
  );
}
