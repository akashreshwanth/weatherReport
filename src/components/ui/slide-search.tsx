// slide-search.tsx placeholder file
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SlideSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export const SlideSearch: React.FC<SlideSearchProps> = ({ 
  onSearch, 
  placeholder = "Search city...",
  className 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    if (!query) {
      setIsExpanded(false);
    }
  };

  return (
    <div className={cn("relative flex justify-center w-full max-w-sm mx-auto", className)}>
      <form onSubmit={handleSubmit} className="relative w-full">
        <div 
          className={cn(
            "search-slide glass-card flex items-center rounded-full transition-all duration-500 ease-out",
            "h-14 bg-card/80 backdrop-blur-md border border-border",
            "hover:border-neon-cyan/50 focus-within:border-neon-cyan focus-within:shadow-lg focus-within:shadow-neon-cyan/20",
            isExpanded ? "w-full sm:max-w-sm" : "w-14"
          )}
        >
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 hover:bg-accent/30 active:scale-95"
          >
            <Search className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
          </button>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={cn(
              "flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground",
              "transition-all duration-500 font-medium",
              isExpanded ? "opacity-100 w-full px-4" : "opacity-0 w-0 px-0"
            )}
          />
        </div>
      </form>
    </div>
  );
};