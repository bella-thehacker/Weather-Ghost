import { useState, useCallback } from 'react';

export interface SparkleInstance {
  id: number;
  x: number;
  y: number;
  size: 'sm' | 'md' | 'lg';
}

export function useSparkles() {
  const [sparkles, setSparkles] = useState<SparkleInstance[]>([]);

  const summonSparkles = useCallback(() => {
    const sizes: ('sm' | 'md' | 'lg')[] = ['sm', 'md', 'lg'];
    
    // Generate 12 random floating particle coordination points across the screen coordinates
    const freshSparkles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: 15 + Math.random() * 70, // Keep padding clear of absolute viewport edge walls
      y: 15 + Math.random() * 70,
      size: sizes[Math.floor(Math.random() * sizes.length)],
    }));

    setSparkles(freshSparkles);
    
    // Clear out calculation tracking objects automatically to clean layout memory trees
    setTimeout(() => setSparkles([]), 1200);
  }, []);

  return { sparkles, summonSparkles };
}