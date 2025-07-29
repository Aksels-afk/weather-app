import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../styles/styledComponents';
import type { DailyForecast } from '../types/weather';

const ForecastCard = styled.div`
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background: #F3F4F6;
    transform: translateY(-2px);
  }
`;

const DayName = styled(Text)`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const DayDate = styled(Text)`
  font-size: 0.875rem;
  color: #6B7280;
  margin-bottom: 1rem;
`;

const WeatherIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const TemperatureRange = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const MaxTemp = styled(Text)`
  font-weight: 600;
  font-size: 1.125rem;
`;

const MinTemp = styled(Text)`
  font-size: 1rem;
  color: #6B7280;
`;

const WeatherDescription = styled(Text)`
  font-size: 0.875rem;
  color: #6B7280;
  margin-bottom: 0.75rem;
`;

const ForecastDetails = styled.div`
  font-size: 0.75rem;
  color: #9CA3AF;
  line-height: 1.4;
`;

const SunriseSunset = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #6B7280;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #E5E7EB;
`;

interface ForecastProps {
  dailyData: DailyForecast[];
}

const Forecast: React.FC<ForecastProps> = ({ dailyData }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDayName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const formatTemperature = (temp: number) => `${Math.round(temp)}°`;
  const formatPrecipitation = (prob: number) => `${Math.round(prob)}%`;
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center',
      width: '100%'
    }}>
      <Grid $columns={7} $gap="1rem" style={{ 
        maxWidth: '100%', 
        overflowX: 'auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '1rem'
      }}>
        {dailyData.map((day, index) => (
          <ForecastCard key={index}>
            <DayName>{formatDayName(day.date)}</DayName>
            <DayDate>{formatDate(day.date)}</DayDate>
            
            <WeatherIcon>{day.icon}</WeatherIcon>
            
            <TemperatureRange>
              <MaxTemp>{formatTemperature(day.max_temp)}</MaxTemp>
              <Text>/</Text>
              <MinTemp>{formatTemperature(day.min_temp)}</MinTemp>
            </TemperatureRange>
            
            <WeatherDescription>{day.description}</WeatherDescription>
            
            <ForecastDetails>
              <div>Rain: {formatPrecipitation(day.precipitation_probability)}</div>
            </ForecastDetails>
            
            <SunriseSunset>
              <div>
                <div>🌅 {formatTime(day.sunrise)}</div>
              </div>
              <div>
                <div>🌇 {formatTime(day.sunset)}</div>
              </div>
            </SunriseSunset>
          </ForecastCard>
        ))}
      </Grid>
    </div>
  );
};

export default Forecast; 