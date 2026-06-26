import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Volume2, VolumeX, Eye, EyeOff, Gauge, Bell, BellOff } from 'lucide-react';
import GhostWindow from '../components/GhostWindow';
import { useAppStore } from '../store/useAppStore';

const themes = [
  { id: 'pastel', name: 'Pastel', color: 'bg-bubblegum-pink' },
  { id: 'night', name: 'Night', color: 'bg-slate-700' },
  { id: 'autumn', name: 'Autumn', color: 'bg-orange-400' },
  { id: 'winter', name: 'Winter', color: 'bg-cyan-300' },
  { id: 'cherry', name: 'Cherry Blossom', color: 'bg-pink-300' },
  { id: 'halloween', name: 'Halloween', color: 'bg-purple-600' },
];

export default function Settings() {
  const { settings, setSettings } = useAppStore();

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings({ [key]: !settings[key] } as Partial<typeof settings>);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-lg">
      {/* Header */}
      <GhostWindow
        title="system_settings.exe"
        icon={<SettingsIcon className="w-4 h-4 text-primary" />}
        titleBarColor="gray"
      >
        <div className="p-lg">
          <motion.h2
            className="font-pixel text-display-lg text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            System Settings
          </motion.h2>
          <p className="font-fredoka text-body-lg text-on-surface-variant mt-1">
            Customize your Weather Ghost experience.
          </p>
        </div>
      </GhostWindow>

      {/* Theme */}
      <GhostWindow title="theme.exe">
        <div className="p-md">
          <h3 className="font-pixel text-headline-sm text-secondary mb-md">Theme</h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-sm">
            {themes.map((theme) => (
              <motion.button
                key={theme.id}
                onClick={() => setSettings({ theme: theme.id as typeof settings.theme })}
                className={`flex flex-col items-center gap-2 p-2 rounded-xl border-2 transition-colors ${
                  settings.theme === theme.id
                    ? 'border-primary bg-primary-container'
                    : 'border-outline-variant hover:border-primary/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`w-8 h-8 rounded-full ${theme.color}`} />
                <span className="font-nunito text-[10px] text-on-surface-variant">
                  {theme.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </GhostWindow>

      {/* Units */}
      <GhostWindow title="units.exe">
        <div className="p-md space-y-md">
          <div>
            <h3 className="font-pixel text-headline-sm text-secondary mb-sm">Temperature Unit</h3>
            <div className="flex gap-sm">
              {(['celsius', 'fahrenheit'] as const).map((unit) => (
                <motion.button
                  key={unit}
                  onClick={() => setSettings({ temperatureUnit: unit })}
                  className={`px-4 py-2 rounded-full border-2 font-nunito text-label-lg capitalize transition-colors ${
                    settings.temperatureUnit === unit
                      ? 'border-primary bg-primary-container text-on-primary-container'
                      : 'border-outline-variant text-on-surface-variant hover:border-primary/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {unit === 'celsius' ? '°C' : '°F'}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-pixel text-headline-sm text-secondary mb-sm">Wind Unit</h3>
            <div className="flex gap-sm">
              {(['kmh', 'mph'] as const).map((unit) => (
                <motion.button
                  key={unit}
                  onClick={() => setSettings({ windUnit: unit })}
                  className={`px-4 py-2 rounded-full border-2 font-nunito text-label-lg transition-colors ${
                    settings.windUnit === unit
                      ? 'border-primary bg-primary-container text-on-primary-container'
                      : 'border-outline-variant text-on-surface-variant hover:border-primary/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {unit === 'kmh' ? 'km/h' : 'mph'}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-pixel text-headline-sm text-secondary mb-sm">Time Format</h3>
            <div className="flex gap-sm">
              {(['12h', '24h'] as const).map((format) => (
                <motion.button
                  key={format}
                  onClick={() => setSettings({ timeFormat: format })}
                  className={`px-4 py-2 rounded-full border-2 font-nunito text-label-lg transition-colors ${
                    settings.timeFormat === format
                      ? 'border-primary bg-primary-container text-on-primary-container'
                      : 'border-outline-variant text-on-surface-variant hover:border-primary/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {format}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </GhostWindow>

      {/* Toggles */}
      <GhostWindow title="preferences.exe">
        <div className="p-md space-y-md">
          {[
            {
              key: 'soundEnabled' as const,
              label: 'Sound Effects',
              description: 'Enable cute notification sounds',
              iconOn: <Volume2 className="w-5 h-5" />,
              iconOff: <VolumeX className="w-5 h-5" />,
            },
            {
              key: 'animations' as const,
              label: 'Animations',
              description: 'Enable ghost floating and sparkles',
              iconOn: <Eye className="w-5 h-5" />,
              iconOff: <EyeOff className="w-5 h-5" />,
            },
            {
              key: 'reducedMotion' as const,
              label: 'Reduced Motion',
              description: 'Minimize animations for accessibility',
              iconOn: <Gauge className="w-5 h-5" />,
              iconOff: <Gauge className="w-5 h-5" />,
            },
            {
              key: 'notifications' as const,
              label: 'Notifications',
              description: 'Get weather and ghost alerts',
              iconOn: <Bell className="w-5 h-5" />,
              iconOff: <BellOff className="w-5 h-5" />,
            },
          ].map((toggle) => (
            <motion.div
              key={toggle.key}
              className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-container-low transition-colors"
              whileHover={{ x: 2 }}
            >
              <div className="flex items-center gap-sm">
                <span className="text-primary">
                  {settings[toggle.key] ? toggle.iconOn : toggle.iconOff}
                </span>
                <div>
                  <p className="font-nunito text-label-lg text-on-surface">{toggle.label}</p>
                  <p className="font-fredoka text-body-md text-on-surface-variant">
                    {toggle.description}
                  </p>
                </div>
              </div>
              <motion.button
                onClick={() => toggleSetting(toggle.key)}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  settings[toggle.key] ? 'bg-primary' : 'bg-outline-variant'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-5 h-5 bg-white rounded-full absolute top-0.5"
                  animate={{ left: settings[toggle.key] ? '26px' : '2px' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </GhostWindow>

      {/* Ghost Frequency */}
      <GhostWindow title="ghost_frequency.exe">
        <div className="p-md">
          <h3 className="font-pixel text-headline-sm text-secondary mb-md">Ghost Frequency</h3>
          <p className="font-fredoka text-body-md text-on-surface-variant mb-md">
            How often should your ghost companion appear and comment on the weather?
          </p>
          <div className="flex gap-sm">
            {(['low', 'medium', 'high'] as const).map((freq) => (
              <motion.button
                key={freq}
                onClick={() => setSettings({ ghostFrequency: freq })}
                className={`flex-1 px-4 py-3 rounded-xl border-2 font-nunito text-label-lg capitalize transition-colors ${
                  settings.ghostFrequency === freq
                    ? 'border-primary bg-primary-container text-on-primary-container'
                    : 'border-outline-variant text-on-surface-variant hover:border-primary/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {freq}
              </motion.button>
            ))}
          </div>
        </div>
      </GhostWindow>

      {/* About */}
      <div className="text-center py-md">
        <p className="font-nunito text-label-sm text-on-surface-variant">
          Weather Ghost v1.0 — Made with love and pixel dust
        </p>
        <p className="font-fredoka text-body-md text-on-surface-variant/60 mt-1">
          Your personal weather companion from 2003
        </p>
      </div>
    </div>
  );
}
