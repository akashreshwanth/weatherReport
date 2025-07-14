import { useState, useEffect } from 'react';

export interface FavoriteCity {
  id: number;
  name: string;
  country: string;
  temp?: number;
  icon?: string;
  description?: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('weather-favorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('weather-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (city: FavoriteCity) => {
    setFavorites(prev => {
      // Check if city already exists
      if (prev.some(fav => fav.id === city.id)) {
        return prev;
      }
      return [...prev, city];
    });
  };

  const removeFavorite = (cityId: number) => {
    setFavorites(prev => prev.filter(fav => fav.id !== cityId));
  };

  const isFavorite = (cityId: number) => {
    return favorites.some(fav => fav.id === cityId);
  };

  const toggleFavorite = (city: FavoriteCity) => {
    if (isFavorite(city.id)) {
      removeFavorite(city.id);
    } else {
      addFavorite(city);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite
  };
};