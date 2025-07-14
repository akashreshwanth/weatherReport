// theme-toggle.tsx placeholder file
import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative w-16 h-8 rounded-full transition-all duration-300",
        "bg-gradient-to-r from-accent to-secondary border border-border/50",
        "hover:border-neon-cyan/50 hover:shadow-lg hover:shadow-neon-cyan/20",
        "focus:outline-none focus:ring-2 focus:ring-neon-cyan/50"
      )}
    >
      <div
        className={cn(
          "absolute top-1 w-6 h-6 rounded-full transition-all duration-300",
          "bg-gradient-to-br from-primary to-accent shadow-md",
          "flex items-center justify-center",
          isDark ? "left-1 bg-slate-800" : "left-9 bg-yellow-400"
        )}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-blue-200" />
        ) : (
          <Sun className="w-3 h-3 text-orange-600" />
        )}
      </div>
    </button>
  );
};