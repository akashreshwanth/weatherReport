import React from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { ForecastData } from '@/hooks/useWeather';
import { cn } from '@/lib/utils';

interface ForecastCardProps {
  forecast: ForecastData;
  className?: string;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, className }) => {
  // Group forecast data by day
  const dailyForecast = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as Record<string, typeof forecast.list>);

  // Get daily summary (one entry per day)
  const dailySummary = Object.entries(dailyForecast).slice(0, 5).map(([date, items]) => {
    const temps = items.map(item => item.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    
    // Get the most common weather condition for the day
    const weatherCounts = items.reduce((acc, item) => {
      const weather = item.weather[0];
      const key = weather.main;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const mostCommonWeather = Object.entries(weatherCounts)
      .sort(([,a], [,b]) => b - a)[0][0];
    
    const weatherItem = items.find(item => item.weather[0].main === mostCommonWeather);
    
    return {
      date: new Date(date),
      minTemp: Math.round(minTemp),
      maxTemp: Math.round(maxTemp),
      weather: weatherItem?.weather[0] || items[0].weather[0],
      humidity: Math.round(items.reduce((sum, item) => sum + item.main.humidity, 0) / items.length),
      windSpeed: items.reduce((sum, item) => sum + item.wind.speed, 0) / items.length
    };
  });

  const formatDay = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getWeatherIcon = (icon: string) => 
    `https://openweathermap.org/img/wn/${icon}.png`;

  return (
    <GlassCard className={cn("animate-fade-in", className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-display font-semibold text-foreground">
          5-Day Forecast
        </h3>
        <div className="text-sm text-muted-foreground">
          {forecast.city.name}, {forecast.city.country}
        </div>
      </div>

      <div className="space-y-4">
        {dailySummary.map((day, index) => (
          <div 
            key={day.date.toISOString()}
            className={cn(
              "glass rounded-lg p-4 transition-all duration-300 hover:bg-accent/10",
              "animate-fade-in"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-16 text-sm font-medium text-foreground">
                  {formatDay(day.date)}
                </div>
                
                <div className="flex items-center gap-3">
                  <img 
                    src={getWeatherIcon(day.weather.icon)}
                    alt={day.weather.description}
                    className="w-8 h-8"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground capitalize">
                      {day.weather.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Humidity: {day.humidity}%
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">{day.minTemp}°</span>
                <div className="w-16 h-1 bg-accent rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-neon-blue to-neon-cyan rounded-full"
                    style={{ 
                      width: `${((day.maxTemp - day.minTemp) / 20) * 100}%`,
                      marginLeft: `${((day.minTemp + 10) / 40) * 100}%`
                    }}
                  />
                </div>
                <span className="text-foreground font-medium">{day.maxTemp}°</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};