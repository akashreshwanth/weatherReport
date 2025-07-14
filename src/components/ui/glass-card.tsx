// glass-card.tsx placeholder file
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'bordered' | 'glow';
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className, 
  variant = 'default',
  ...props 
}) => {
  return (
    <div
      className={cn(
        "glass-card rounded-xl p-6 transition-all duration-300",
        {
          'border border-border/50': variant === 'bordered',
          'neon-border animate-glow-pulse': variant === 'glow',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};