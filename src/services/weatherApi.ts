import type { WeatherData, Location, OpenMeteoResponse, WeatherError } from '../types/weather';

// Weather code mapping for descriptions and icons
const WEATHER_CODES: Record<number, { description: string; icon: string }> = {
  0: { description: 'Clear sky', icon: '☀️' },
  1: { description: 'Mainly clear', icon: '🌤️' },
  2: { description: 'Partly cloudy', icon: '⛅' },
  3: { description: 'Overcast', icon: '☁️' },
  45: { description: 'Foggy', icon: '🌫️' },
  48: { description: 'Depositing rime fog', icon: '🌫️' },
  51: { description: 'Light drizzle', icon: '🌦️' },
  53: { description: 'Moderate drizzle', icon: '🌦️' },
  55: { description: 'Dense drizzle', icon: '🌧️' },
  61: { description: 'Slight rain', icon: '🌧️' },
  63: { description: 'Moderate rain', icon: '🌧️' },
  65: { description: 'Heavy rain', icon: '🌧️' },
  71: { description: 'Slight snow', icon: '🌨️' },
  73: { description: 'Moderate snow', icon: '🌨️' },
  75: { description: 'Heavy snow', icon: '🌨️' },
  95: { description: 'Thunderstorm', icon: '⛈️' },
};

const BASE_URL = 'https://api.open-meteo.com/v1';

// Helper function to get weather description and icon
const getWeatherInfo = (code: number) => {
  return WEATHER_CODES[code] || { description: 'Unknown', icon: '❓' };
};

// Transform API response to our domain model
const transformWeatherData = (
  apiData: OpenMeteoResponse,
  location: Location
): WeatherData => {
  const current = apiData.current;
  const currentWeatherInfo = getWeatherInfo(current.weather_code);

  return {
    current: {
      temperature: current.temperature_2m,
      feels_like: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
      wind_speed: current.wind_speed_10m,
      wind_direction: current.wind_direction_10m,
      pressure: current.pressure_msl,
      visibility: current.visibility,
      uv_index: current.uv_index,
      description: currentWeatherInfo.description,
      icon: currentWeatherInfo.icon,
    },
    daily: apiData.daily.time.map((date, index) => {
      const weatherInfo = getWeatherInfo(apiData.daily.weather_code[index]);
      return {
        date,
        max_temp: apiData.daily.temperature_2m_max[index],
        min_temp: apiData.daily.temperature_2m_min[index],
        precipitation_probability: apiData.daily.precipitation_probability_max[index],
        description: weatherInfo.description,
        icon: weatherInfo.icon,
        sunrise: apiData.daily.sunrise[index],
        sunset: apiData.daily.sunset[index],
      };
    }),
    hourly: apiData.hourly.time.slice(0, 12).map((time, index) => {
      const weatherInfo = getWeatherInfo(apiData.hourly.weather_code[index]);
      return {
        time,
        temperature: apiData.hourly.temperature_2m[index],
        description: weatherInfo.description,
        icon: weatherInfo.icon,
        precipitation_probability: apiData.hourly.precipitation_probability[index],
        humidity: apiData.hourly.relative_humidity_2m[index],
        wind_speed: apiData.hourly.wind_speed_10m[index],
      };
    }),
    location,
  };
};

// Fetch weather data from Open-Meteo API
export const fetchWeatherData = async (
  latitude: number,
  longitude: number
): Promise<WeatherData> => {
  try {
    const url = `${BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,pressure_msl,visibility,uv_index,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&hourly=weather_code,temperature_2m,precipitation_probability,relative_humidity_2m,wind_speed_10m&timezone=auto`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: OpenMeteoResponse = await response.json();
    
    // For now, we'll use coordinates as location name
    // Later we can add reverse geocoding
    const location: Location = {
      name: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`,
      latitude,
      longitude,
      country: 'Unknown',
      timezone: 'auto',
    };

    return transformWeatherData(data, location);
  } catch (error) {
    const weatherError: WeatherError = {
      message: error instanceof Error ? error.message : 'Failed to fetch weather data',
      code: 'FETCH_ERROR',
    };
    throw weatherError;
  }
};

// Search for location by name (using Open-Meteo Geocoding API)
export const searchLocation = async (query: string): Promise<Location[]> => {
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.results) {
      return [];
    }

    return data.results.map((result: any) => ({
      name: result.name,
      latitude: result.latitude,
      longitude: result.longitude,
      country: result.country,
      timezone: result.timezone,
    }));
  } catch (error) {
    const weatherError: WeatherError = {
      message: error instanceof Error ? error.message : 'Failed to search location',
      code: 'SEARCH_ERROR',
    };
    throw weatherError;
  }
}; 