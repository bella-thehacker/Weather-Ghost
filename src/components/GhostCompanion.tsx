import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';

interface GhostCompanionProps {
  quote?: string;
  showSpeech?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
};

export default function GhostCompanion({ quote, showSpeech = true, size = 'md' }: GhostCompanionProps) {
  const { ghosts } = useAppStore();
  const activeGhost = ghosts.find((g) => g.id === 'normal') || ghosts[0];

  return (
    <div className="relative flex flex-col items-center">
      {/* Speech bubble */}
      {showSpeech && quote && (
        <motion.div
          className="speech-bubble absolute -top-16 left-1/2 -translate-x-1/2 p-3 min-w-[180px] max-w-[220px] z-10"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-nunito text-label-sm text-on-surface-variant leading-tight text-center">
            {quote}
          </p>
        </motion.div>
      )}

      {/* Ghost image */}
      <motion.div
        className={`${sizeMap[size]} relative`}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.img
          src={activeGhost?.image || '/ghosts/Normal-ghost.png'}
          alt={activeGhost?.displayName || 'Ghost'}
          className="w-full h-full object-contain"
          style={{ imageRendering: 'pixelated' }}
          animate={{
            scaleY: [1, 0.97, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Blinking eyes overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: [1, 1, 0, 1, 1] }}
          transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.95, 0.98, 1] }}
        >
          <div className="w-8 h-1 bg-surface/80 rounded-full mt-[-8px]" />
        </motion.div>
      </motion.div>

      {/* Ghost name */}
      {showSpeech && (
        <motion.div
          className="mt-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-pixel text-headline-sm text-secondary">
            {activeGhost?.displayName || 'Casper'}
          </h3>
          <p className="font-nunito text-label-sm text-on-surface-variant mt-1">
            Mood: Spectral & Sunny
          </p>
        </motion.div>
      )}
    </div>
  );
}
