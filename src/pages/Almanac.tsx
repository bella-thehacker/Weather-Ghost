import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Star, Pin, X, MapPin, Cloud, Heart } from 'lucide-react';
import GhostWindow from '../components/GhostWindow';
import WeatherChip from '../components/WeatherChip';
import { useAppStore } from '../store/useAppStore';

const mockEntries = [
  {
    id: '1',
    date: 'Oct 31, 2023',
    title: 'The Great Fogening',
    city: 'Limuru',
    country: 'Kiambu',
    weather: 'Fog',
    temperature: 12,
    story: 'The mist was so thick I accidentally tried to haunt a mailbox. Visually stunning, structurally confusing. 10/10 specter density.',
    moodTags: ['Spooky', 'High Humidity', 'Mysterious'],
    ghostImage: '/ghosts/sleepy-ghost.png',
    isPinned: true,
    isFavorite: true,
  },
  {
    id: '2',
    date: 'July 15, 2024',
    title: 'The Melting Point',
    city: 'Karen',
    country: 'Nairobi',
    weather: 'Extreme Heat',
    temperature: 39,
    story: 'So hot the sidewalk pixels were literally vibrating. I had to hide inside an iced matcha latte for three hours. Refreshing yet sticky.',
    moodTags: ['Extreme UV', 'Hot', 'Melting'],
    ghostImage: '/ghosts/melting-ghost.png',
    isPinned: true,
    isFavorite: false,
  },
  {
    id: '3',
    date: 'Jan 02, 2024',
    title: 'Frosty Floaties',
    city: 'Kikuyu',
    country: 'Kiambu',
    weather: 'Blizzard',
    temperature: -18,
    story: 'Frozen ghost-breath turns into tiny pixel ice cubes. Very dangerous to float around sharp edges today. My tail is a popsicle.',
    moodTags: ['Blizzard', 'Chilly', 'Frozen'],
    ghostImage: '/ghosts/crying-ghost.png',
    isPinned: false,
    isFavorite: true,
  },
  {
    id: '4',
    date: 'Apr 12, 2024',
    title: 'Rainbow Surprise',
    city: 'Kiambu',
    country: 'Kiambu',
    weather: 'Rainbow',
    temperature: 8,
    story: 'Double rainbow all the way across the sky! Prism was so excited they split into seven different colors and refused to recombine for an hour.',
    moodTags: ['Rainbow', 'Magical', 'Colorful'],
    ghostImage: '/ghosts/rainbow-ghost.png',
    isPinned: false,
    isFavorite: true,
  },
  {
    id: '5',
    date: 'Jun 21, 2024',
    title: 'Midnight Sun Madness',
    city: 'CBD',
    country: 'Nairobi',
    weather: 'Clear',
    temperature: 15,
    story: 'The sun never set. Sunny refused to go to bed and partied until 4 AM. I have never seen a ghost with such stamina.',
    moodTags: ['Midnight Sun', 'Energetic', 'Clear'],
    ghostImage: '/ghosts/vacation-ghost.png',
    isPinned: false,
    isFavorite: false,
  },
];

export default function Almanac() {
  const { pinnedCities, dismissedEntries, dismissEntry } = useAppStore();

  const visibleEntries = mockEntries.filter((entry) => !dismissedEntries.includes(entry.id));

  return (
    <div className="space-y-lg">
      {/* Header */}
      <GhostWindow
        title="almanac.exe"
        icon={<BookOpen className="w-4 h-4 text-primary" />}
        titleBarColor="blue"
      >
        <div className="p-lg">
          <motion.h2
            className="font-pixel text-display-lg text-primary mb-xs"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Memorable Skies
          </motion.h2>
          <p className="font-fredoka text-body-lg text-on-surface-variant">
            A scrapbook of the most remarkable weather moments. Each entry holds a story, a mood,
            and a tiny piece of sky.
          </p>
        </div>
      </GhostWindow>

      {/* Entries Grid Canvas layout with close handles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-lg">
        <AnimatePresence>
          {visibleEntries.map((entry, index) => (
            <motion.div
              key={entry.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', stiffness: 500, damping: 35, delay: index * 0.05 }}
            >
              <GhostWindow
                title={entry.date}
                titleBarColor={entry.isPinned ? 'pink' : 'gray'}
                onClose={() => dismissEntry(entry.id)}
              >
                <div className="p-md">
                  {/* Header */}
                  <div className="flex items-start gap-md mb-md">
                    <motion.img
                      src={entry.ghostImage}
                      alt=""
                      className="w-16 h-16 object-contain flex-shrink-0 select-none"
                      style={{ imageRendering: 'pixelated' }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <div>
                      <h3 className="font-pixel text-headline-md text-secondary">{entry.title}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-on-surface-variant" />
                        <span className="font-nunito text-label-sm text-on-surface-variant">
                          {entry.city}, {entry.country}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Cloud className="w-3 h-3 text-on-surface-variant" />
                        <span className="font-nunito text-label-sm text-on-surface-variant">
                          {entry.weather}, {entry.temperature}°C
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Story */}
                  <div className="pixel-border-dashed p-md rounded-lg bg-surface mb-md">
                    <p className="font-fredoka text-body-md text-on-surface italic leading-relaxed">
                      "{entry.story}"
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-xs">
                    {entry.moodTags.map((tag) => (
                      <WeatherChip
                        key={tag}
                        label={tag}
                        color={
                          tag.includes('Hot') || tag.includes('UV')
                            ? 'orange'
                            : tag.includes('Cold') || tag.includes('Blizzard')
                            ? 'cyan'
                            : tag.includes('Spooky') || tag.includes('Mysterious')
                            ? 'lavender'
                            : tag.includes('Rainbow') || tag.includes('Magical')
                            ? 'pink'
                            : 'mint'
                        }
                      />
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-sm mt-md pt-md border-t border-outline-variant/50">
                    <button className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
                      <Pin className={`w-4 h-4 ${entry.isPinned ? 'text-primary' : ''}`} />
                      <span className="font-nunito text-label-sm">
                        {entry.isPinned ? 'Pinned' : 'Pin'}
                      </span>
                    </button>
                    <button className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
                      <Heart
                        className={`w-4 h-4 ${entry.isFavorite ? 'text-primary fill-primary' : ''}`}
                      />
                      <span className="font-nunito text-label-sm">
                        {entry.isFavorite ? 'Loved' : 'Love'}
                      </span>
                    </button>
                  </div>
                </div>
              </GhostWindow>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Starry Sites - Pinned Cities */}
      <GhostWindow
        title="starry_sites.exe"
        icon={<Star className="w-4 h-4 text-yellow-500" />}
        titleBarColor="blue"
      >
        <div className="p-lg">
          <h3 className="font-pixel text-headline-md text-primary mb-md">Starry Sites</h3>
          <div className="flex flex-wrap gap-md mb-lg">
            {pinnedCities.map((city) => (
              <motion.div
                key={city.id}
                className="flex items-center gap-sm bg-surface-container px-md py-sm rounded-full border-2 border-outline-variant"
                whileHover={{ scale: 1.05 }}
              >
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-nunito text-label-lg">
                  {city.name}, {city.country}
                </span>
                <button className="hover:text-primary transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
            <motion.button
              className="flex items-center gap-sm px-md py-sm rounded-full border-2 border-dashed border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <span className="font-nunito text-label-lg">+ Pin a New Site</span>
            </motion.button>
          </div>

          {/* Active Site Preview Panel Frame */}
          <div className="bg-gradient-to-br from-baby-blue/30 to-lavender/30 rounded-xl p-md border border-outline-variant">
            <p className="font-nunito text-label-sm text-on-surface-variant mb-1">ACTIVE SITE</p>
            <h4 className="font-pixel text-headline-md text-secondary">
              {pinnedCities[0]?.name}, {pinnedCities[0]?.country}
            </h4>
            <div className="flex items-center gap-sm mt-2">
              <Cloud className="w-4 h-4 text-on-surface-variant" />
              <span className="font-fredoka text-body-md text-on-surface-variant">
                Overcast, 14°C
              </span>
            </div>
          </div>
        </div>
      </GhostWindow>
    </div>
  );
}