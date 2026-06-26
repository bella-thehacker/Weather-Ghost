import { type ReactNode } from 'react';

interface WeatherChipProps {
  label: string;
  color?: 'yellow' | 'blue' | 'mint' | 'pink' | 'lavender' | 'peach' | 'orange' | 'cyan' | 'slate';
  icon?: ReactNode;
  className?: string;
}

const colorMap = {
  yellow: 'bg-butter-yellow text-charcoal border-yellow-300',
  blue: 'bg-baby-blue text-charcoal border-blue-300',
  mint: 'bg-mint text-charcoal border-emerald-300',
  pink: 'bg-primary-fixed text-on-primary-fixed border-pink-300',
  lavender: 'bg-lavender text-charcoal border-purple-300',
  peach: 'bg-peach text-charcoal border-orange-300',
  orange: 'bg-orange-100 text-orange-800 border-orange-300',
  cyan: 'bg-cyan-100 text-cyan-800 border-cyan-300',
  slate: 'bg-slate-200 text-slate-800 border-slate-400',
};

export default function WeatherChip({ label, color = 'blue', icon, className = '' }: WeatherChipProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full
        border text-[10px] font-nunito font-bold uppercase tracking-wider
        ${colorMap[color]}
        ${className}
      `}
    >
      {icon && <span className="text-[10px]">{icon}</span>}
      {label}
    </span>
  );
}
