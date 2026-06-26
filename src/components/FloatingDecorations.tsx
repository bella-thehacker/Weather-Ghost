import { motion } from 'framer-motion';

export function FloatingCloud({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute pointer-events-none opacity-20 ${className}`}
      animate={{
        x: ['-10%', '110%'],
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        delay,
        ease: 'linear',
      }}
    >
      <svg width="60" height="30" viewBox="0 0 60 30" fill="none" className="text-outline-variant">
        <ellipse cx="20" cy="20" rx="15" ry="8" fill="currentColor" />
        <ellipse cx="35" cy="15" rx="18" ry="10" fill="currentColor" />
        <ellipse cx="45" cy="20" rx="12" ry="7" fill="currentColor" />
      </svg>
    </motion.div>
  );
}

export function FloatingStar({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{
        opacity: [0.3, 1, 0.3],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"
          fill="#ffd9e5"
        />
      </svg>
    </motion.div>
  );
}

export default function FloatingDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <FloatingCloud className="top-[10%]" delay={0} />
      <FloatingCloud className="top-[25%] scale-75" delay={8} />
      <FloatingCloud className="top-[60%] scale-50" delay={15} />
      <FloatingCloud className="top-[80%] scale-90" delay={5} />

      <FloatingStar className="top-[15%] left-[10%]" delay={0} />
      <FloatingStar className="top-[30%] right-[15%]" delay={1} />
      <FloatingStar className="top-[50%] left-[5%]" delay={2} />
      <FloatingStar className="top-[70%] right-[10%]" delay={0.5} />
      <FloatingStar className="top-[85%] left-[20%]" delay={1.5} />
    </div>
  );
}
