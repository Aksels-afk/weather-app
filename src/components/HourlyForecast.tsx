import React from 'react';
import styled from 'styled-components';
import { Text } from '../styles/styledComponents';
import type { HourlyForecast as HourlyForecastType } from '../types/weather';

const HourlyContainer = styled.div`
  overflow-x: auto;
  padding: 0.5rem 0;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #F3F4F6;
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #D1D5DB;
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #9CA3AF;
  }
`;

const HourlyGrid = styled.div`
  display: flex;
  gap: 1rem;
  min-width: max-content;
`;

const HourlyCard = styled.div`
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1rem;
  min-width: 100px;
  text-align: center;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background: #F3F4F6;
    transform: translateY(-2px);
  }
`;

const HourlyIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const HourlyTime = styled(Text)`
  font-size: 0.875rem;
  color: #6B7280;
  margin-bottom: 0.5rem;
`;

const HourlyTemp = styled(Text)`
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 0.25rem;
`;

const HourlyDescription = styled(Text)`
  font-size: 0.75rem;
  color: #6B7280;
  margin-bottom: 0.5rem;
`;

const HourlyDetails = styled.div`
  font-size: 0.75rem;
  color: #9CA3AF;
`;

interface HourlyForecastProps {
  hourlyData: HourlyForecastType[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyData }) => {
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: true 
    });
  };

  const formatTemperature = (temp: number) => `${Math.round(temp)}°`;
  const formatPrecipitation = (prob: number) => `${Math.round(prob)}%`;
  const formatHumidity = (humidity: number) => `${humidity}%`;
  const formatWindSpeed = (speed: number) => `${Math.round(speed)} km/h`;

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center',
      width: '100%'
    }}>
      <HourlyContainer>
        <HourlyGrid>
          {hourlyData.map((hour, index) => (
            <HourlyCard key={index}>
              <HourlyTime>{formatTime(hour.time)}</HourlyTime>
              <HourlyIcon>{hour.icon}</HourlyIcon>
              <HourlyTemp>{formatTemperature(hour.temperature)}</HourlyTemp>
              <HourlyDescription>{hour.description}</HourlyDescription>
              <HourlyDetails>
                <div>Rain: {formatPrecipitation(hour.precipitation_probability)}</div>
                <div>Humidity: {formatHumidity(hour.humidity)}</div>
                <div>Wind: {formatWindSpeed(hour.wind_speed)}</div>
              </HourlyDetails>
            </HourlyCard>
          ))}
        </HourlyGrid>
      </HourlyContainer>
    </div>
  );
};

export default HourlyForecast; 