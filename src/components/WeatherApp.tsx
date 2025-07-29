import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { Card, Button, Heading, Text, Spinner, ErrorMessage } from '../styles/styledComponents';
import { useWeather } from '../hooks/useWeather';
import { useGeolocation } from '../hooks/useGeolocation';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import HourlyForecast from './HourlyForecast';
import LocationSearch from './LocationSearch';

const WeatherApp: React.FC = () => {
  const { 
    weatherData, 
    loading: weatherLoading, 
    error: weatherError, 
    fetchWeather, 
    searchLocations,
    clearError 
  } = useWeather();
  
  const { 
    latitude, 
    longitude, 
    loading: locationLoading, 
    error: locationError, 
    permission, 
    requestPermission 
  } = useGeolocation();

  // Fetch weather when location is available
  useEffect(() => {
    if (latitude && longitude && !weatherLoading && !weatherData) {
      fetchWeather(latitude, longitude);
    }
  }, [latitude, longitude, fetchWeather, weatherLoading, weatherData]);

  const handleLocationSelect = (lat: number, lon: number) => {
    fetchWeather(lat, lon);
  };

  const handleRetry = () => {
    clearError();
    if (latitude && longitude) {
      fetchWeather(latitude, longitude);
    } else {
      requestPermission();
    }
  };

  if (locationLoading || weatherLoading) {
    return (
      <ThemeProvider theme={theme}>
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <Spinner $size="3rem" />
            <Text $size="lg" $color="#6B7280" style={{ marginTop: '1rem', display: 'block' }}>
              {locationLoading ? 'Getting your location...' : 'Loading weather data...'}
            </Text>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (locationError) {
    return (
      <ThemeProvider theme={theme}>
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '400px' }}>
            <ErrorMessage>
              <Text $weight="semibold">Location Error</Text>
              <Text $size="sm" style={{ marginTop: '0.5rem' }}>{locationError}</Text>
            </ErrorMessage>
            <Button $variant="primary" $size="md" onClick={requestPermission} style={{ marginTop: '1rem' }}>
              Try Again
            </Button>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (weatherError) {
    return (
      <ThemeProvider theme={theme}>
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '400px' }}>
            <ErrorMessage>
              <Text $weight="semibold">Weather Error</Text>
              <Text $size="sm" style={{ marginTop: '0.5rem' }}>{weatherError.message}</Text>
            </ErrorMessage>
            <Button $variant="primary" $size="md" onClick={handleRetry} style={{ marginTop: '1rem' }}>
              Try Again
            </Button>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (!weatherData) {
    return (
      <ThemeProvider theme={theme}>
        <div style={{ 
          minHeight: '100vh',
          padding: '2rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
                  maxWidth: '1200px',
        margin: '0 auto'
        }}>
          <div style={{ 
            background: '#FFFFFF',
            borderRadius: '1rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            padding: '1.5rem',
            textAlign: 'center', 
            maxWidth: '400px',
            width: '100%'
          }}>
            <h2 style={{ 
              margin: '0 0 1rem 0',
              fontSize: '1.875rem',
              fontWeight: '700',
              color: '#1F2937',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            }}>
              Weather App
            </h2>
            <p style={{ 
              fontSize: '1.125rem',
              color: '#6B7280',
              margin: '0 0 2rem 0',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            }}>
              Get current weather and forecasts for your location
            </p>
            {permission === 'denied' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ 
                  fontSize: '0.875rem',
                  color: '#EF4444',
                  margin: '0',
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                }}>
                  Location permission denied. Please enable location access in your browser settings.
                </p>
                <Button $variant="outline" $size="md" onClick={requestPermission}>
                  Request Permission
                </Button>
              </div>
            ) : (
              <Button $variant="primary" $size="lg" onClick={requestPermission}>
                Get My Location
              </Button>
            )}
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ 
        minHeight: '100vh',
        padding: '2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{ 
          width: '100%', 
          maxWidth: '800px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{ 
            margin: '0',
            fontSize: '2.25rem',
            fontWeight: '700',
            color: '#1F2937',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          }}>
            Weather App
          </h1>
          <LocationSearch onLocationSelect={handleLocationSelect} searchLocations={searchLocations} />
        </div>

        {/* Current Location Display */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          width: '100%',
          maxWidth: '800px'
        }}>
          <p style={{ 
            fontSize: '1.125rem',
            color: '#6B7280',
            fontWeight: '500',
            margin: '0',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          }}>
            📍 {weatherData.location.name}
          </p>
        </div>

        {/* Current Weather */}
        <div style={{ width: '100%', maxWidth: '800px', marginBottom: '2rem' }}>
          <CurrentWeather weather={weatherData.current} location={weatherData.location} />
        </div>

        {/* Hourly Forecast */}
        <div style={{ width: '100%', maxWidth: '800px', marginBottom: '2rem' }}>
          <div style={{ 
            background: '#FFFFFF',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            padding: '1.5rem'
          }}>
            <h3 style={{ 
              margin: '0 0 1rem 0',
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1F2937',
              textAlign: 'center',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            }}>
              Next 12 Hours
            </h3>
            <HourlyForecast hourlyData={weatherData.hourly} />
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div style={{ width: '100%', maxWidth: '800px' }}>
          <div style={{ 
            background: '#FFFFFF',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            padding: '1.5rem'
          }}>
            <h3 style={{ 
              margin: '0 0 1rem 0',
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1F2937',
              textAlign: 'center',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            }}>
              7-Day Forecast
            </h3>
            <Forecast dailyData={weatherData.daily} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default WeatherApp; 