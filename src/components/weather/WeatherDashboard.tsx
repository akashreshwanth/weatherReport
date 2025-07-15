import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Navigation, LogOut, User, LogIn } from 'lucide-react';
import { SlideSearch } from '@/components/ui/slide-search';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { GlassCard } from '@/components/ui/glass-card';
import { WeatherCard } from './WeatherCard';
import { ForecastCard } from './ForecastCard';
import { FavoritesCard } from './FavoritesCard';
import { AuthModal } from '@/components/auth/AuthModal';
import { useWeather } from '@/hooks/useWeather';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
export const WeatherDashboard: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const {
    currentWeather,
    forecast,
    loading,
    error,
    fetchWeather,
    fetchWeatherByCoords
  } = useWeather();
  const {
    user,
    isAuthenticated,
    signOut
  } = useAuth();
  const {
    toast
  } = useToast();

  // Get user's location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
      }, () => {
        // Fallback to a default city
        fetchWeather('London');
      });
    } else {
      fetchWeather('London');
    }
  }, [fetchWeather, fetchWeatherByCoords]);
  const handleSearch = async (city: string) => {
    await fetchWeather(city);
    if (error) {
      toast({
        title: "City not found",
        description: "Please check the city name and try again.",
        variant: "destructive"
      });
    }
  };
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        toast({
          title: "Location updated",
          description: "Weather data updated for your current location."
        });
      }, error => {
        toast({
          title: "Location access denied",
          description: "Please enable location access or search for a city manually.",
          variant: "destructive"
        });
      });
    } else {
      toast({
        title: "Location not supported",
        description: "Your browser doesn't support location services.",
        variant: "destructive"
      });
    }
  };
  const handleSignOut = () => {
    signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out."
    });
  };
  return <div className="min-h-screen bg-paths relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-neon-cyan/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl animate-pulse" style={{
        animationDelay: '1s'
      }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/3 rounded-full blur-3xl animate-pulse" style={{
        animationDelay: '2s'
      }} />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 bg-zinc-600">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo and title */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 rounded-xl flex items-center justify-center">
                  <Cloud className="w-6 h-6 text-neon-cyan" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 rounded-xl blur opacity-50 animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold text-slate-200">
                  WeatherScope
                </h1>
                <p className="text-sm text-muted-foreground">
                  Futuristic Weather Intelligence
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="w-full sm:flex-1 max-w-md mx-8">
              <SlideSearch onSearch={handleSearch} placeholder="Search any city..." />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <InteractiveHoverButton onClick={handleGetLocation} className="px-4 py-2">
                <Navigation className="w-4 h-4" />
                Location
              </InteractiveHoverButton>

              <ThemeToggle />

              {isAuthenticated ? <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card/20 border border-border/50">
                    <img src={user?.avatar} alt={user?.name} className="w-6 h-6 rounded-full" />
                    <span className="text-sm text-foreground">{user?.name}</span>
                  </div>
                  <InteractiveHoverButton onClick={handleSignOut} className="px-4 py-2">
                    <LogOut className="w-4 h-4" />
                  </InteractiveHoverButton>
                </div> : <InteractiveHoverButton onClick={() => setAuthModalOpen(true)} className="px-4 py-2">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </InteractiveHoverButton>}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 p-6 bg-zinc-600">
        <div className="max-w-7xl mx-auto">
          {loading && <GlassCard className="text-center py-12 mb-8">
              <div className="inline-flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
                <span className="text-foreground">Loading weather data...</span>
              </div>
            </GlassCard>}

          {error && <GlassCard variant="bordered" className="text-center py-12 mb-8 border-destructive/50">
              <CloudRain className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-destructive mb-2">
                Unable to load weather data
              </h3>
              <p className="text-muted-foreground">
                {error}
              </p>
            </GlassCard>}

          {currentWeather && !loading && <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Current weather - spans 2 columns on large screens */}
              <div className="lg:col-span-2 space-y-8">
                <WeatherCard weather={currentWeather} />
                
                {forecast && <ForecastCard forecast={forecast} />}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {isAuthenticated && <FavoritesCard onCitySelect={handleSearch} />}

                {!isAuthenticated && <GlassCard className="text-center py-8">
                    <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                      Save Your Favorites
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Sign in to save your favorite cities and access them quickly
                    </p>
                    <InteractiveHoverButton onClick={() => setAuthModalOpen(true)} className="mx-auto">
                      <LogIn className="w-4 h-4" />
                      Get Started
                    </InteractiveHoverButton>
                  </GlassCard>}

                {/* Quick weather stats */}
                {currentWeather && <GlassCard>
                    <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                      Quick Stats
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">High</span>
                        <span className="text-foreground font-medium">
                          {Math.round(currentWeather.main.temp_max)}°C
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Low</span>
                        <span className="text-foreground font-medium">
                          {Math.round(currentWeather.main.temp_min)}°C
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Clouds</span>
                        <span className="text-foreground font-medium">
                          {currentWeather.clouds.all}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Wind Direction</span>
                        <span className="text-foreground font-medium">
                          {currentWeather.wind.deg}°
                        </span>
                      </div>
                    </div>
                  </GlassCard>}
              </div>
            </div>}

          {!currentWeather && !loading && !error && <GlassCard className="text-center py-16">
              <Sun className="w-16 h-16 text-neon-cyan mx-auto mb-6" />
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                Welcome to WeatherScope
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Get started by searching for a city or allowing location access to see your local weather
              </p>
              <div className="flex gap-4 justify-center">
                <InteractiveHoverButton onClick={handleGetLocation}>
                  <Navigation className="w-4 h-4" />
                  Use My Location
                </InteractiveHoverButton>
              </div>
            </GlassCard>}
        </div>
      </main>

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>;
};
