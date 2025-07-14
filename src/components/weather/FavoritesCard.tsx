import React from 'react';
import { Heart, Trash2, MapPin } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { useFavorites, FavoriteCity } from '@/hooks/useFavorites';
import { cn } from '@/lib/utils';

interface FavoritesCardProps {
  onCitySelect: (cityName: string) => void;
  className?: string;
}

export const FavoritesCard: React.FC<FavoritesCardProps> = ({ onCitySelect, className }) => {
  const { favorites, removeFavorite } = useFavorites();

  const handleRemove = (e: React.MouseEvent, cityId: number) => {
    e.stopPropagation();
    removeFavorite(cityId);
  };

  const handleCityClick = (city: FavoriteCity) => {
    onCitySelect(city.name);
  };

  const getWeatherIcon = (icon?: string) => 
    icon ? `https://openweathermap.org/img/wn/${icon}.png` : null;

  if (favorites.length === 0) {
    return (
      <GlassCard className={cn("text-center py-8", className)}>
        <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-display font-semibold text-foreground mb-2">
          No Favorites Yet
        </h3>
        <p className="text-muted-foreground">
          Add cities to your favorites by clicking the heart icon
        </p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className={cn("animate-fade-in", className)}>
      <div className="flex items-center gap-3 mb-6">
        <Heart className="w-6 h-6 text-red-500" />
        <h3 className="text-xl font-display font-semibold text-foreground">
          Favorite Cities
        </h3>
        <span className="text-sm text-muted-foreground">
          ({favorites.length})
        </span>
      </div>

      <div className="space-y-3">
        {favorites.map((city, index) => (
          <div
            key={city.id}
            onClick={() => handleCityClick(city)}
            className={cn(
              "glass rounded-lg p-4 cursor-pointer transition-all duration-300",
              "hover:bg-accent/20 hover:scale-[1.02] group",
              "animate-fade-in"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <MapPin className="w-4 h-4 text-neon-cyan flex-shrink-0" />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {city.name}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {city.country}
                    </span>
                  </div>
                  {city.description && (
                    <p className="text-xs text-muted-foreground capitalize truncate">
                      {city.description}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center gap-2 flex-shrink-0">
                  {city.icon && (
                    <img 
                      src={getWeatherIcon(city.icon)!}
                      alt={city.description}
                      className="w-6 h-6"
                    />
                  )}
                  {city.temp !== undefined && (
                    <span className="text-sm font-medium text-foreground">
                      {city.temp}°C
                    </span>
                  )}
                </div>
              </div>
              
              <button
                onClick={(e) => handleRemove(e, city.id)}
                className={cn(
                  "ml-3 p-1.5 rounded-full transition-all duration-300",
                  "text-muted-foreground hover:text-destructive hover:bg-destructive/10",
                  "opacity-0 group-hover:opacity-100"
                )}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};