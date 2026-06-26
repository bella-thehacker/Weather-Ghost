import { motion } from 'framer-motion';
import { Sparkles, Lock, Star, Quote, Cloud, Hash } from 'lucide-react';
import GhostWindow from '../components/GhostWindow';
import { useAppStore } from '../store/useAppStore';

const rarityConfig = {
  common: { color: 'text-slate-500', bg: 'bg-slate-100', border: 'border-slate-300' },
  uncommon: { color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'border-emerald-300' },
  rare: { color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-300' },
  legendary: { color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-300' },
  secret: { color: 'text-rose-600', bg: 'bg-rose-100', border: 'border-rose-300' },
};

export default function GhostCollection() {
  const { ghosts, unlockGhost } = useAppStore();
  const unlockedCount = ghosts.filter((g) => g.isUnlocked).length;

  return (
    <div className="space-y-lg">
      {/* Header */}
      <div className="notebook-bg rounded-xl ghost-window p-lg">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h2 className="font-pixel text-display-lg text-primary">Sticker Book</h2>
            <p className="font-fredoka text-body-lg text-on-surface-variant mt-1">
              A collection of every phantom seen in Weather Ghost v1.0.
            </p>
          </div>
          <div className="bg-secondary-container px-lg py-sm rounded-full border-2 border-secondary text-on-secondary-container font-nunito text-label-lg flex items-center gap-sm">
            <Star className="w-4 h-4" />
            <span>
              {unlockedCount} / {ghosts.length} Collected
            </span>
          </div>
        </motion.div>
      </div>

      {/* Ghost Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-md">
        {ghosts.map((ghost, index) => (
          <motion.div
            key={ghost.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 }}
          >
            {ghost.isUnlocked ? (
              <GhostWindow title={ghost.name} className="h-full">
                <div className="p-md flex flex-col items-center text-center h-full">
                  {/* Ghost Image */}
                  <motion.div
                    className="w-24 h-24 mb-sm relative"
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 2.5 + index * 0.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <img
                      src={ghost.image}
                      alt={ghost.displayName}
                      className="w-full h-full object-contain"
                      style={{ imageRendering: 'pixelated' }}
                    />
                    {ghost.rarity === 'legendary' && (
                      <motion.div
                        className="absolute -top-1 -right-1"
                        animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="w-5 h-5 text-yellow-500" />
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Name */}
                  <h3 className="font-pixel text-headline-sm text-secondary mb-1">
                    {ghost.displayName}
                  </h3>

                  {/* Rarity */}
                  <span
                    className={`font-nunito text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                      rarityConfig[ghost.rarity].bg
                    } ${rarityConfig[ghost.rarity].color} ${rarityConfig[ghost.rarity].border}`}
                  >
                    {ghost.rarity}
                  </span>

                  {/* Stats */}
                  <div className="mt-auto pt-md w-full space-y-2">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <Cloud className="w-3 h-3" />
                      <span className="font-nunito text-label-sm">{ghost.favoriteWeather}</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <Hash className="w-3 h-3" />
                      <span className="font-nunito text-label-sm">
                        {ghost.timesEncountered} encounters
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <Quote className="w-3 h-3" />
                      <span className="font-nunito text-[10px] italic leading-tight">
                        "{ghost.favoriteQuote}"
                      </span>
                    </div>
                  </div>
                </div>
              </GhostWindow>
            ) : (
              /* Locked Ghost */
              <motion.div
                className="ghost-window bg-surface-container-high h-full flex flex-col items-center justify-center p-md sticker-slot rounded-xl"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-20 h-20 mb-sm opacity-30 grayscale relative">
                  <img
                    src={ghost.image}
                    alt="Locked"
                    className="w-full h-full object-contain"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-on-surface-variant" />
                  </div>
                </div>
                <p className="font-pixel text-label-lg text-on-surface-variant mb-2">LOCKED</p>
                <p className="font-nunito text-[10px] text-on-surface-variant/60 text-center">
                  {ghost.unlockCondition}
                </p>
                <motion.button
                  className="mt-3 px-3 py-1 bg-primary-container text-on-primary-container rounded-full font-nunito text-[10px] font-bold uppercase"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => unlockGhost(ghost.id)}
                >
                  Unlock
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Seasonal Pack Promo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        <motion.div
          className="md:col-span-2 bg-lavender/30 rounded-xl p-lg ghost-window relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="absolute  -right-0 bg-butter-yellow text-charcoal px-3 py-1 rounded-lg font-nunito text-label-sm font-bold shadow-md"
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            NEW STICKERS!
          </motion.div>
          <h3 className="font-pixel text-headline-md text-secondary mb-2">
            Seasonal Pack: Autumn
          </h3>
          <p className="font-fredoka text-body-md text-on-surface-variant mb-md">
            Catch the Leaf Ghost before winter arrives!
          </p>
          <motion.button
            className="px-6 py-3 bg-surface text-on-surface rounded-full font-pixel text-label-lg border-2 border-outline-variant hover:border-primary hover:text-primary transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Seasons
          </motion.button>
        </motion.div>

        <motion.div
          className="bg-primary-container rounded-xl p-lg ghost-window flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Star className="w-8 h-8 text-primary mb-2" />
          <h3 className="font-pixel text-headline-sm text-on-primary-container mb-1">
            Legendary Encounter
          </h3>
          <p className="font-fredoka text-body-md text-on-primary-container/70">
            Found during the great Eclipse of 04.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
