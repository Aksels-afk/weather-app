// Weather data interfaces based on Open-Meteo API
export interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast[];
  hourly: HourlyForecast[];
  location: Location;
}

export interface CurrentWeather {
  temperature: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  wind_direction: number;
  description: string;
  icon: string;
  pressure: number;
  visibility: number;
  uv_index: number;
}

export interface DailyForecast {
  date: string;
  max_temp: number;
  min_temp: number;
  precipitation_probability: number;
  description: string;
  icon: string;
  sunrise: string;
  sunset: string;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  description: string;
  icon: string;
  precipitation_probability: number;
  humidity: number;
  wind_speed: number;
}

export interface Location {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  timezone: string;
}

export interface WeatherError {
  message: string;
  code?: string;
}

// API response interfaces
export interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    pressure_msl: number;
    visibility: number;
    uv_index: number;
    weather_code: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    weather_code: number[];
    sunrise: string[];
    sunset: string[];
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
    precipitation_probability: number[];
    relative_humidity_2m: number[];
    wind_speed_10m: number[];
  };
} 