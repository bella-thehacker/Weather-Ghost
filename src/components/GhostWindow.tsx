import { motion } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';
import { cn } from '../lib/utils';

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
      className={cn(
        "bg-surface border-2 border-outline-variant shadow-[4px_4px_0px_0px_rgba(93,87,84,1)] rounded-xl overflow-hidden",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ boxShadow: '6px 6px 0px 0px rgba(93, 87, 84, 0.25)' }}
    >
      {/* OS Title Bar Window Header */}
      <div
        className={cn(
          "h-10 flex items-center justify-between px-md border-b-2 border-outline-variant select-none",
          titleBarColors[titleBarColor]
        )}
      >
        <div className="flex items-center gap-sm">
          {icon && (
            <span className={titleBarColor === 'gray' ? 'text-on-surface-variant' : 'text-white'}>
              {icon}
            </span>
          )}
          <span
            className={cn(
              "font-pixel text-[11px] tracking-wide mt-0.5",
              titleBarColor === 'gray' ? 'text-on-surface-variant' : 'text-white'
            )}
          >
            {title}
          </span>
        </div>
        
        {/* Retro Window Controller Action Links */}
        <div className="flex gap-xs">
          <button className="w-4 h-4 rounded-sm border border-white/40 bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
            <Minus className="w-2.5 h-2.5 text-white" />
          </button>
          <button className="w-4 h-4 rounded-sm border border-white/40 bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
            <Square className="w-2 h-2 text-white" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-4 h-4 rounded-sm border border-outline-variant bg-primary-container flex items-center justify-center hover:bg-bubblegum-pink group transition-colors"
          >
            <X className="w-2.5 h-2.5 text-on-primary-container group-hover:text-white" />
          </button>
        </div>
      </div>

      {/* Main Content Body Wrapper */}
      <div className={noPadding ? 'p-0' : 'p-md'}>{children}</div>
    </motion.div>
  );
}