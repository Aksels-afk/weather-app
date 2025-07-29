import React from 'react';
import styled from 'styled-components';
import { Card, Text, Heading } from '../styles/styledComponents';
import type { CurrentWeather, Location } from '../types/weather';

const WeatherIcon = styled.div`
  font-size: 4rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const WeatherDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #E5E7EB;
`;

const DetailItem = styled.div`
  text-align: center;
`;

const DetailLabel = styled(Text)`
  display: block;
  font-size: 0.75rem;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
`;

const DetailValue = styled(Text)`
  display: block;
  font-weight: 600;
  font-size: 1.125rem;
`;

interface CurrentWeatherProps {
  weather: CurrentWeather;
  location: Location;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather, location }) => {
  const formatTemperature = (temp: number) => `${Math.round(temp)}°C`;
  const formatWindSpeed = (speed: number) => `${Math.round(speed)} km/h`;
  const formatHumidity = (humidity: number) => `${humidity}%`;
  const formatPressure = (pressure: number) => `${Math.round(pressure)} hPa`;
  const formatVisibility = (visibility: number) => `${Math.round(visibility / 1000)} km`;

  return (
    <Card $elevation="lg" style={{ 
      textAlign: 'center',
      width: '100%'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Location */}
        <Text $size="lg" $color="#6B7280" style={{ marginBottom: '0.5rem' }}>
          {location.name}
        </Text>
        
        {/* Main Weather Display */}
        <WeatherIcon>{weather.icon}</WeatherIcon>
        <Heading $level={1} style={{ marginBottom: '0.5rem' }}>
          {formatTemperature(weather.temperature)}
        </Heading>
        <Text $size="lg" $color="#6B7280" style={{ marginBottom: '1rem' }}>
          {weather.description}
        </Text>
        <Text $size="sm" $color="#9CA3AF">
          Feels like {formatTemperature(weather.feels_like)}
        </Text>

        {/* Weather Details Grid */}
        <WeatherDetails>
          <DetailItem>
            <DetailLabel>Humidity</DetailLabel>
            <DetailValue>{formatHumidity(weather.humidity)}</DetailValue>
          </DetailItem>
          
          <DetailItem>
            <DetailLabel>Wind Speed</DetailLabel>
            <DetailValue>{formatWindSpeed(weather.wind_speed)}</DetailValue>
          </DetailItem>
          
          <DetailItem>
            <DetailLabel>Pressure</DetailLabel>
            <DetailValue>{formatPressure(weather.pressure)}</DetailValue>
          </DetailItem>
          
          <DetailItem>
            <DetailLabel>Visibility</DetailLabel>
            <DetailValue>{formatVisibility(weather.visibility)}</DetailValue>
          </DetailItem>
          
          <DetailItem>
            <DetailLabel>UV Index</DetailLabel>
            <DetailValue>{weather.uv_index}</DetailValue>
          </DetailItem>
        </WeatherDetails>
      </div>
    </Card>
  );
};

export default CurrentWeather; 