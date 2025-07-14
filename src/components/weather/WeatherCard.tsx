import React from 'react';
import { Heart, MapPin, Wind, Eye, Droplets, Gauge } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { WeatherData } from '@/hooks/useWeather';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/lib/utils';

interface WeatherCardProps {
  weather: WeatherData;
  className?: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, className }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isLiked = isFavorite(weather.id);

  const handleToggleFavorite = () => {
    toggleFavorite({
      id: weather.id,
      name: weather.name,
      country: weather.sys.country,
      temp: Math.round(weather.main.temp),
      icon: weather.weather[0].icon,
      description: weather.weather[0].description
    });
  };

  const formatTemp = (temp: number) => Math.round(temp);
  const getWeatherIcon = (icon: string) => 
    `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <GlassCard className={cn("relative overflow-hidden animate-scale-in", className)}>
      {/* Background gradient based on weather */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-neon-blue/5 rounded-xl" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-neon-cyan" />
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground">
                {weather.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {weather.sys.country}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleToggleFavorite}
            className={cn(
              "heart-animate p-2 rounded-full transition-all duration-300",
              "hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50",
              isLiked && "favorited"
            )}
          >
            <Heart 
              className={cn(
                "w-6 h-6 transition-all duration-300",
                isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"
              )} 
            />
          </button>
        </div>

        {/* Main weather display */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl font-display font-bold text-foreground">
                {formatTemp(weather.main.temp)}
              </span>
              <span className="text-2xl text-muted-foreground">°C</span>
            </div>
            <p className="text-lg text-muted-foreground capitalize">
              {weather.weather[0].description}
            </p>
            <p className="text-sm text-muted-foreground">
              Feels like {formatTemp(weather.main.feels_like)}°C
            </p>
          </div>
          
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-accent/20">
            <img 
              src={getWeatherIcon(weather.weather[0].icon)}
              alt={weather.weather[0].description}
              className="w-16 h-16"
            />
          </div>
        </div>

        {/* Weather details grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass rounded-lg p-3 flex items-center gap-3">
            <Wind className="w-5 h-5 text-neon-cyan" />
            <div>
              <p className="text-xs text-muted-foreground">Wind</p>
              <p className="text-sm font-medium">{weather.wind.speed} m/s</p>
            </div>
          </div>
          
          <div className="glass rounded-lg p-3 flex items-center gap-3">
            <Droplets className="w-5 h-5 text-neon-blue" />
            <div>
              <p className="text-xs text-muted-foreground">Humidity</p>
              <p className="text-sm font-medium">{weather.main.humidity}%</p>
            </div>
          </div>
          
          <div className="glass rounded-lg p-3 flex items-center gap-3">
            <Gauge className="w-5 h-5 text-neon-purple" />
            <div>
              <p className="text-xs text-muted-foreground">Pressure</p>
              <p className="text-sm font-medium">{weather.main.pressure} hPa</p>
            </div>
          </div>
          
          <div className="glass rounded-lg p-3 flex items-center gap-3">
            <Eye className="w-5 h-5 text-neon-cyan" />
            <div>
              <p className="text-xs text-muted-foreground">Visibility</p>
              <p className="text-sm font-medium">{(weather.visibility / 1000).toFixed(1)} km</p>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};