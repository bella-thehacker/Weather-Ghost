import { motion } from 'framer-motion';

interface SparkleDecorationProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export default function SparkleDecoration({ className = '', size = 'sm', color = '#ffd9e5' }: SparkleDecorationProps) {
  const sizeMap = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };

  return (
    <motion.div
      className={`pointer-events-none absolute ${sizeMap[size]} ${className}`}
      style={{
        background: color,
        clipPath:
          'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
      }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.6, 1, 0.6],
        rotate: [0, 15, -15, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}
