import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StaticDot {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

const bootMessages = [
  'Weather Ghost OS v1.0',
  'Loading ghost...',
  'Connecting to sky...',
  'Scanning clouds...',
  'Fetching forecast...',
  'Summoning spirits...',
  'Forecast ready.',
];

export default function OpeningAnimation() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<'scanlines' | 'static' | 'glow' | 'exit'>('scanlines');
  const [staticDots, setStaticDots] = useState<StaticDot[]>([]);
  const [bootIndex, setBootIndex] = useState(0);

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('weatherghost-opening-played');
    if (!hasPlayed) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;

    const timers = [
      setTimeout(() => setPhase('static'), 600),
      setTimeout(() => setPhase('glow'), 1400),
      setTimeout(() => setPhase('exit'), 2800),
      setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem('weatherghost-opening-played', 'true');
      }, 3800),
    ];

    return () => timers.forEach(clearTimeout);
  }, [visible]);

  useEffect(() => {
    if (phase !== 'static') {
      setStaticDots([]);
      return;
    }

    const interval = setInterval(() => {
      const dots: StaticDot[] = Array.from(
        { length: 3 + Math.floor(Math.random() * 3) },
        (_, i) => ({
          id: Date.now() + i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          width: 2 + Math.random() * 4,
          height: 2 + Math.random() * 4,
        })
      );
      setStaticDots(dots);
    }, 80);

    const clearTimer = setTimeout(() => setStaticDots([]), 700);

    return () => {
      clearInterval(interval);
      clearTimeout(clearTimer);
    };
  }, [phase]);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setBootIndex((prev) => {
        if (prev >= bootMessages.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        style={{ backgroundColor: '#0a0a0a' }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        {/* Phase 1: Scanlines fade in */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase !== 'scanlines' ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {Array.from({ length: 150 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute left-0 right-0"
              style={{
                top: `${(i / 150) * 100}%`,
                height: '2px',
                backgroundColor: 'rgba(200, 160, 74, 0.03)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.003, duration: 0.1 }}
            />
          ))}
        </motion.div>

        {/* Phase 2: Static flicker */}
        {staticDots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute bg-white"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${dot.width}px`,
              height: `${dot.height}px`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 0.1 }}
          />
        ))}

        {/* Phase 3: Warm glow emergence */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at center, rgba(255, 146, 191, 0.2) 0%, rgba(200, 160, 74, 0.1) 30%, transparent 70%)',
          }}
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{
            scale: phase === 'glow' || phase === 'exit' ? 1.5 : 0.3,
            opacity: phase === 'glow' || phase === 'exit' ? 1 : 0,
          }}
          transition={{ duration: 1.3, ease: 'easeOut' }}
        />

        {/* Boot sequence text */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          <motion.div
            className="w-24 h-24 mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <img
              src="/ghosts/Normal-ghost.png"
              alt="Weather Ghost"
              className="w-full h-full object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
          </motion.div>

          <motion.h1
            className="font-pixel text-3xl text-bubblegum-pink tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Weather Ghost
          </motion.h1>

          <motion.div
            className="font-pixel text-sm text-cream/70 min-h-[1.5em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {bootMessages[bootIndex]}
          </motion.div>

          <motion.div
            className="w-48 h-2 bg-white/10 rounded-full overflow-hidden mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-bubblegum-pink to-butter-yellow rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${((bootIndex + 1) / bootMessages.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
