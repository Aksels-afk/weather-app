import { useState, useCallback } from 'react';
import type { WeatherData, Location, WeatherError } from '../types/weather';
import { fetchWeatherData, searchLocation } from '../services/weatherApi';

interface UseWeatherReturn {
  weatherData: WeatherData | null;
  loading: boolean;
  error: WeatherError | null;
  fetchWeather: (latitude: number, longitude: number) => Promise<void>;
  searchLocations: (query: string) => Promise<Location[]>;
  clearError: () => void;
}

export const useWeather = (): UseWeatherReturn => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<WeatherError | null>(null);

  const fetchWeather = useCallback(async (latitude: number, longitude: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherData(latitude, longitude);
      setWeatherData(data);
    } catch (err) {
      const weatherError = err as WeatherError;
      setError(weatherError);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchLocations = useCallback(async (query: string): Promise<Location[]> => {
    try {
      return await searchLocation(query);
    } catch (err) {
      const weatherError = err as WeatherError;
      setError(weatherError);
      return [];
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    weatherData,
    loading,
    error,
    fetchWeather,
    searchLocations,
    clearError,
  };
}; 