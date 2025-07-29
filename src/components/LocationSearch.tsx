import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Text } from '../styles/styledComponents';
import type { Location } from '../types/weather';

const SearchContainer = styled.div`
  position: relative;
  min-width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #E5E7EB;
  border-radius: 0.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease-in-out;
  
  &:focus {
    border-color: #3B82F6;
  }
  
  &::placeholder {
    color: #9CA3AF;
  }
`;

const SearchResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: 0.25rem;
`;

const SearchResult = styled.div`
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  
  &:hover {
    background-color: #F9FAFB;
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid #F3F4F6;
  }
`;

const LocationName = styled(Text)`
  font-weight: 600;
  display: block;
  margin-bottom: 0.25rem;
`;

const LocationDetails = styled(Text)`
  font-size: 0.875rem;
  color: #6B7280;
`;

const LoadingText = styled(Text)`
  padding: 0.75rem 1rem;
  color: #6B7280;
  text-align: center;
`;

const NoResultsText = styled(Text)`
  padding: 0.75rem 1rem;
  color: #6B7280;
  text-align: center;
`;

interface LocationSearchProps {
  onLocationSelect: (latitude: number, longitude: number) => void;
  searchLocations: (query: string) => Promise<Location[]>;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect, searchLocations }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchTimeoutRef = useRef<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.trim().length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setLoading(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const searchResults = await searchLocations(query);
        setResults(searchResults);
        setShowResults(true);
      } catch (error) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query, searchLocations]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLocationSelect = (location: Location) => {
    onLocationSelect(location.latitude, location.longitude);
    setQuery(location.name);
    setShowResults(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleInputFocus = () => {
    if (results.length > 0) {
      setShowResults(true);
    }
  };

  return (
    <SearchContainer ref={containerRef}>
      <SearchInput
        type="text"
        placeholder="Search for a location..."
        value={query}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
      />
      
      {showResults && (
        <SearchResults>
          {loading ? (
            <LoadingText>Searching...</LoadingText>
          ) : results.length === 0 ? (
            <NoResultsText>No locations found</NoResultsText>
          ) : (
            results.map((location, index) => (
              <SearchResult
                key={index}
                onClick={() => handleLocationSelect(location)}
              >
                <LocationName>{location.name}</LocationName>
                <LocationDetails>{location.country}</LocationDetails>
              </SearchResult>
            ))
          )}
        </SearchResults>
      )}
    </SearchContainer>
  );
};

export default LocationSearch; 