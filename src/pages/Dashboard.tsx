import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Thermometer,
  Droplets,
  Wind,
  CloudRain,
  Eye,
  Sun,
  Gauge,
  Moon,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import GhostWindow from '@/components/GhostWindow';
import WeatherStatCard from '@/components/WeatherStatCard';
import WeatherChip from '@/components/WeatherChip';
import { useAppStore } from '@/store/useAppStore';
import { fetchCurrentWeather, getGhostMood } from '@/services/weatherService';
import type { WeatherData, GhostMood } from '@/types';

export default function Dashboard() {
  const { currentCity } = useAppStore();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [ghostMood, setGhostMood] = useState<GhostMood | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchCurrentWeather(currentCity);
      setWeather(data);
      setGhostMood(getGhostMood(data.condition));
      setLoading(false);
    }
    load();
  }, [currentCity]);

  if (loading || !weather || !ghostMood) {
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
          <p className="font-pixel text-headline-sm text-primary">Loading forecast...</p>
        </motion.div>
      </div>
    );
  }

  const sadnessColor =
    ghostMood.sadnessLevel < 20
      ? 'mint'
      : ghostMood.sadnessLevel < 40
      ? 'yellow'
      : ghostMood.sadnessLevel < 60
      ? 'blue'
      : ghostMood.sadnessLevel < 80
      ? 'lavender'
      : 'pink';

  return (
    <div className="space-y-lg">
      {/* Hero Weather Window */}
      <GhostWindow title={`${weather.city}_Weather.exe`} titleBarColor="pink">
        <div className="p-md lg:p-lg">
          <div className="flex flex-col lg:flex-row gap-lg items-start">
            {/* Left: Main Weather */}
            <div className="flex-1">
              <div className="flex items-center gap-sm mb-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-nunito text-label-lg text-on-surface-variant">
                  {weather.city}, {weather.country}
                </span>
              </div>

              <motion.h2
                className="font-pixel text-display-lg text-primary mb-xs"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                {Math.round(weather.temperature)}°
                <span className="text-headline-lg text-secondary ml-2">
                  {weather.condition}
                </span>
              </motion.h2>

              {/* Ghost Quote */}
              <motion.div
                className="pixel-border-dashed p-md rounded-lg bg-surface-container-low max-w-lg mb-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="font-fredoka text-body-lg text-on-surface italic">
                  "{ghostMood.quote}"
                </p>
              </motion.div>

              {/* Mood & Sadness */}
              <div className="flex flex-wrap gap-sm items-center">
                <WeatherChip label={`Mood: ${ghostMood.mood}`} color="pink" />
                <WeatherChip
                  label={`Sky Sadness: ${ghostMood.sadnessLevel}%`}
                  color={sadnessColor as 'pink' | 'blue' | 'mint' | 'yellow' | 'lavender'}
                />
                <WeatherChip label={ghostMood.sadnessLabel} color="lavender" />
              </div>
            </div>

            {/* Right: Weather Icon & Ghost */}
            <motion.div
              className="flex flex-col items-center gap-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="relative">
                <img
                  src="/icons/cloud.png"
                  alt={weather.condition}
                  className="w-32 h-32 object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
                <motion.img
                  src="/ghosts/Normal-ghost.png"
                  alt="Ghost"
                  className="w-16 h-16 absolute -bottom-2 -right-2"
                  style={{ imageRendering: 'pixelated' }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          </div>

          {/* Sky Sadness Meter */}
          <div className="mt-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-nunito text-label-sm text-on-surface-variant">
                Sky Sadness Meter
              </span>
              <span className="font-pixel text-label-lg text-primary">
                {ghostMood.sadnessLevel}%
              </span>
            </div>
            <div className="w-full h-4 bg-surface-container-high rounded-full overflow-hidden border border-outline-variant">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    ghostMood.sadnessLevel < 30
                      ? 'linear-gradient(to right, #D4F8E8, #FFF4CC)'
                      : ghostMood.sadnessLevel < 60
                      ? 'linear-gradient(to right, #D9F2FF, #E8DDFF)'
                      : 'linear-gradient(to right, #E8DDFF, #FF92BF)',
                }}
                initial={{ width: 0 }}
                animate={{ width: `${ghostMood.sadnessLevel}%` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="font-nunito text-[10px] text-mint font-bold">THRIVING</span>
              <span className="font-nunito text-[10px] text-primary font-bold">COLLAPSE</span>
            </div>
          </div>
        </div>
      </GhostWindow>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
        <WeatherStatCard
          label="Temperature"
          value={`${Math.round(weather.temperature)}°`}
          unit={`Feels ${Math.round(weather.feelsLike)}°`}
          icon={<Thermometer className="w-5 h-5" />}
          color="pink"
          delay={0}
        />
        <WeatherStatCard
          label="Humidity"
          value={`${weather.humidity}%`}
          icon={<Droplets className="w-5 h-5" />}
          color="blue"
          delay={0.1}
        />
        <WeatherStatCard
          label="Wind"
          value={weather.wind}
          unit="km/h"
          icon={<Wind className="w-5 h-5" />}
          color="mint"
          delay={0.2}
        />
        <WeatherStatCard
          label="Rain Chance"
          value={`${weather.rainChance}%`}
          icon={<CloudRain className="w-5 h-5" />}
          color="blue"
          delay={0.3}
        />
        <WeatherStatCard
          label="Visibility"
          value={`${weather.visibility}km`}
          icon={<Eye className="w-5 h-5" />}
          color="lavender"
          delay={0.4}
        />
        <WeatherStatCard
          label="UV Index"
          value={weather.uv}
          icon={<Sun className="w-5 h-5" />}
          color="yellow"
          delay={0.5}
        />
        <WeatherStatCard
          label="Pressure"
          value={weather.pressure}
          unit="hPa"
          icon={<Gauge className="w-5 h-5" />}
          color="pink"
          delay={0.6}
        />
        <WeatherStatCard
          label="Cloud Cover"
          value={`${weather.cloudCover}%`}
          icon={<TrendingUp className="w-5 h-5" />}
          color="blue"
          delay={0.7}
        />
        <WeatherStatCard
          label="Moon Phase"
          value={weather.moonPhase}
          icon={<Moon className="w-5 h-5" />}
          color="lavender"
          delay={0.8}
        />
      </div>

      {/* Sunrise/Sunset */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
        <GhostWindow title="sunrise.exe" icon={<Sun className="w-4 h-4 text-yellow-500" />}>
          <div className="p-md flex items-center justify-between">
            <div>
              <p className="font-nunito text-label-sm text-on-surface-variant">Sunrise</p>
              <p className="font-pixel text-headline-lg text-yellow-600">{weather.sunrise}</p>
            </div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <img
                src="/icons/sun.png"
                alt="Sun"
                className="w-16 h-16"
                style={{ imageRendering: 'pixelated' }}
              />
            </motion.div>
          </div>
        </GhostWindow>

        <GhostWindow title="sunset.exe" icon={<Moon className="w-4 h-4 text-lavender" />}>
          <div className="p-md flex items-center justify-between">
            <div>
              <p className="font-nunito text-label-sm text-on-surface-variant">Sunset</p>
              <p className="font-pixel text-headline-lg text-purple-600">{weather.sunset}</p>
            </div>
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <img
                src="/icons/moon.png"
                alt="Moon"
                className="w-16 h-16"
                style={{ imageRendering: 'pixelated' }}
              />
            </motion.div>
          </div>
        </GhostWindow>
      </div>
    </div>
  );
}
