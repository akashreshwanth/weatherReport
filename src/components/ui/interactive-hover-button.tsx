// interactive-hover-button.tsx placeholder file
import React from 'react';
import { cn } from '@/lib/utils';

interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  className?: string;
  children?: React.ReactNode;
}

export const InteractiveHoverButton: React.FC<InteractiveHoverButtonProps> = ({ 
  text = "Button", 
  className,
  children,
  ...props 
}) => {
  return (
    <button
      className={cn(
        "btn-interactive relative group overflow-hidden text-foreground",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-neon-cyan/20 before:to-neon-blue/20",
        "before:translate-x-[-100%] before:transition-transform before:duration-500",
        "hover:before:translate-x-0",
        "after:absolute after:inset-[1px] after:bg-card/50 after:rounded-[inherit]",
        "after:transition-all after:duration-300",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children || text}
      </span>
    </button>
  );
};