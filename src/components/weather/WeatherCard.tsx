import React from 'react';
import { Heart, MapPin, Wind, Eye, Droplets, Gauge } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
          {/* Wind */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="glass rounded-lg p-3 flex items-center gap-3 hover:bg-accent/20 transition-all duration-200 cursor-pointer w-full text-left">
                <Wind className="w-5 h-5 text-neon-cyan" />
                <div>
                  <p className="text-xs text-muted-foreground">Wind</p>
                  <p className="text-sm font-medium">{weather.wind.speed} m/s</p>
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Wind className="w-5 h-5 text-neon-cyan" />
                  <h3 className="font-semibold">Wind Details</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Speed:</span>
                    <span className="font-medium">{weather.wind.speed} m/s</span>
                  </div>
                  {weather.wind.deg && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Direction:</span>
                      <span className="font-medium">{weather.wind.deg}°</span>
                    </div>
                  )}
                  {(weather.wind as any).gust && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gust:</span>
                      <span className="font-medium">{(weather.wind as any).gust} m/s</span>
                    </div>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Humidity */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="glass rounded-lg p-3 flex items-center gap-3 hover:bg-accent/20 transition-all duration-200 cursor-pointer w-full text-left">
                <Droplets className="w-5 h-5 text-neon-blue" />
                <div>
                  <p className="text-xs text-muted-foreground">Humidity</p>
                  <p className="text-sm font-medium">{weather.main.humidity}%</p>
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-neon-blue" />
                  <h3 className="font-semibold">Humidity Details</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current:</span>
                    <span className="font-medium">{weather.main.humidity}%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {weather.main.humidity > 80 ? "Very humid conditions" :
                     weather.main.humidity > 60 ? "Moderately humid" :
                     weather.main.humidity > 40 ? "Comfortable humidity" :
                     "Low humidity levels"}
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Pressure */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="glass rounded-lg p-3 flex items-center gap-3 hover:bg-accent/20 transition-all duration-200 cursor-pointer w-full text-left">
                <Gauge className="w-5 h-5 text-neon-purple" />
                <div>
                  <p className="text-xs text-muted-foreground">Pressure</p>
                  <p className="text-sm font-medium">{weather.main.pressure} hPa</p>
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-neon-purple" />
                  <h3 className="font-semibold">Pressure Details</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current:</span>
                    <span className="font-medium">{weather.main.pressure} hPa</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sea Level:</span>
                    <span className="font-medium">{(weather.main as any).sea_level || weather.main.pressure} hPa</span>
                  </div>
                  {(weather.main as any).grnd_level && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ground Level:</span>
                      <span className="font-medium">{(weather.main as any).grnd_level} hPa</span>
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {weather.main.pressure > 1020 ? "High pressure system" :
                     weather.main.pressure > 1000 ? "Normal pressure" :
                     "Low pressure system"}
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Visibility */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="glass rounded-lg p-3 flex items-center gap-3 hover:bg-accent/20 transition-all duration-200 cursor-pointer w-full text-left">
                <Eye className="w-5 h-5 text-neon-cyan" />
                <div>
                  <p className="text-xs text-muted-foreground">Visibility</p>
                  <p className="text-sm font-medium">{(weather.visibility / 1000).toFixed(1)} km</p>
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-neon-cyan" />
                  <h3 className="font-semibold">Visibility Details</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Distance:</span>
                    <span className="font-medium">{(weather.visibility / 1000).toFixed(1)} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Meters:</span>
                    <span className="font-medium">{weather.visibility} m</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {weather.visibility >= 10000 ? "Excellent visibility" :
                     weather.visibility >= 5000 ? "Good visibility" :
                     weather.visibility >= 1000 ? "Moderate visibility" :
                     "Poor visibility"}
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </GlassCard>
  );
};