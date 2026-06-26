import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface PixelButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export default function PixelButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  icon,
  fullWidth = false,
}: PixelButtonProps) {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80',
    ghost: 'bg-transparent text-on-surface-variant hover:bg-surface-container',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-label-sm',
    md: 'px-4 py-2.5 text-label-lg',
    lg: 'px-6 py-4 text-headline-sm',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        pixel-btn rounded-full font-pixel inline-flex items-center justify-center gap-2
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.97, y: 2 }}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
}
