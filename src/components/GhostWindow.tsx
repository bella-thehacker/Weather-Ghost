import { motion } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';

interface GhostWindowProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  titleBarColor?: 'pink' | 'blue' | 'gray';
  noPadding?: boolean;
  onClose?: () => void;
}

const titleBarColors = {
  pink: 'bg-gradient-to-r from-primary to-bubblegum-pink',
  blue: 'bg-gradient-to-r from-secondary to-baby-blue',
  gray: 'bg-surface-container',
};

export default function GhostWindow({
  title,
  icon,
  children,
  className = '',
  titleBarColor = 'gray',
  noPadding = false,
  onClose,
}: GhostWindowProps) {
  return (
    <motion.div
      className={`ghost-window overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ boxShadow: '6px 6px 0px 0px rgba(93, 87, 84, 0.15)' }}
    >
      {/* Title Bar */}
      <div
        className={`window-titlebar h-10 flex items-center justify-between px-md ${titleBarColors[titleBarColor]}`}
      >
        <div className="flex items-center gap-sm">
          {icon && <span className="text-on-surface">{icon}</span>}
          <span
            className={`font-pixel text-label-sm ${
              titleBarColor === 'gray' ? 'text-on-surface-variant' : 'text-white'
            }`}
          >
            {title}
          </span>
        </div>
        <div className="flex gap-xs">
          <button className="w-4 h-4 rounded-sm border border-white/40 bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
            <Minus className="w-3 h-3 text-white" />
          </button>
          <button className="w-4 h-4 rounded-sm border border-white/40 bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
            <Square className="w-2.5 h-2.5 text-white" />
          </button>
          <button
            onClick={onClose}
            className="w-4 h-4 rounded-sm border border-white/40 bg-primary-container flex items-center justify-center hover:bg-bubblegum-pink transition-colors"
          >
            <X className="w-3 h-3 text-on-primary-container" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={noPadding ? '' : 'p-md'}>{children}</div>
    </motion.div>
  );
}
