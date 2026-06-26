import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface WeatherStatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: ReactNode;
  color?: 'pink' | 'blue' | 'mint' | 'yellow' | 'lavender' | 'peach' | 'slate';
  detail?: ReactNode;
  delay?: number;
}

const colorMap = {
  pink: 'text-primary',
  blue: 'text-secondary',
  mint: 'text-emerald-600',
  yellow: 'text-amber-600',
  lavender: 'text-purple-600',
  peach: 'text-orange-500',
  slate: 'text-slate-500',
};

export default function WeatherStatCard({
  label,
  value,
  unit,
  icon,
  color = 'pink',
  detail,
  delay = 0,
}: WeatherStatCardProps) {
  return (
    <motion.div
      className="ghost-window bg-surface rounded-xl p-md flex flex-col gap-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <div className={`flex items-center gap-sm ${colorMap[color]}`}>
        <span className="text-lg">{icon}</span>
        <span className="font-nunito text-label-lg text-on-surface-variant">{label}</span>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-1">
          <span className="font-pixel text-display-lg text-secondary leading-none">
            {value}
          </span>
          {unit && (
            <span className="font-nunito text-label-sm text-on-surface-variant">{unit}</span>
          )}
        </div>
        {detail && <div>{detail}</div>}
      </div>
    </motion.div>
  );
}
