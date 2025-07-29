import { useState, useEffect, useCallback } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  loading: boolean;
  error: string | null;
  permission: 'granted' | 'denied' | 'prompt' | null;
}

interface UseGeolocationReturn extends GeolocationState {
  requestPermission: () => Promise<void>;
  getCurrentPosition: () => Promise<void>;
}

export const useGeolocation = (): UseGeolocationReturn => {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    loading: false,
    error: null,
    permission: null,
  });

  // Check if geolocation is supported
  const isGeolocationSupported = () => {
    return 'geolocation' in navigator;
  };

  // Check permission status
  const checkPermission = useCallback(async () => {
    if (!isGeolocationSupported()) {
      setState(prev => ({ ...prev, error: 'Geolocation is not supported' }));
      return;
    }

    try {
      // Note: navigator.permissions is not available in all browsers
      if ('permissions' in navigator) {
        const permission = await navigator.permissions.query({ name: 'geolocation' });
        setState(prev => ({ ...prev, permission: permission.state }));
      } else {
        // Fallback for browsers that don't support permissions API
        setState(prev => ({ ...prev, permission: 'prompt' }));
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Could not check geolocation permission',
        permission: 'prompt' 
      }));
    }
  }, []);

  // Request permission and get current position
  const requestPermission = useCallback(async () => {
    if (!isGeolocationSupported()) {
      setState(prev => ({ ...prev, error: 'Geolocation is not supported' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000, // 1 minute
        });
      });

      setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        loading: false,
        error: null,
        permission: 'granted',
      });
    } catch (error) {
      const errorMessage = error instanceof GeolocationPositionError 
        ? getGeolocationErrorMessage(error.code)
        : 'Failed to get location';
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
        permission: 'denied',
      }));
    }
  }, []);

  // Get current position without requesting permission
  const getCurrentPosition = useCallback(async () => {
    if (!isGeolocationSupported()) {
      setState(prev => ({ ...prev, error: 'Geolocation is not supported' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        });
      });

      setState(prev => ({
        ...prev,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        loading: false,
        error: null,
      }));
    } catch (error) {
      const errorMessage = error instanceof GeolocationPositionError 
        ? getGeolocationErrorMessage(error.code)
        : 'Failed to get location';
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  }, []);

  // Helper function to get user-friendly error messages
  const getGeolocationErrorMessage = (code: number): string => {
    switch (code) {
      case GeolocationPositionError.PERMISSION_DENIED:
        return 'Location permission denied. Please enable location access.';
      case GeolocationPositionError.POSITION_UNAVAILABLE:
        return 'Location information is unavailable.';
      case GeolocationPositionError.TIMEOUT:
        return 'Location request timed out.';
      default:
        return 'An unknown error occurred while getting location.';
    }
  };

  // Check permission on mount
  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  return {
    ...state,
    requestPermission,
    getCurrentPosition,
  };
}; 