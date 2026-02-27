import { createContext, useEffect, useState, type ReactNode } from 'react';

import { WeatherFacade } from '@core/application/facade';
import { CELSIUS, KMH, MM } from '@core/domain/const';
import type {
  Config,
  Geolocation,
  WeatherConsolidate,
} from '@core/domain/model';

export interface WeatherContextType {
  weather: WeatherConsolidate | undefined;
  loading: boolean;
  config: Config;
  geolocation: Geolocation | undefined;

  updateWeather: () => void;
  setGeolocation: (geolocation: Geolocation) => void;
  setConfig: (config: Config) => void;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(
  undefined,
);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [{ loading, weather, config, geolocation }, setState] = useState<{
    weather: WeatherConsolidate | undefined;
    loading: boolean;
    config: Config;
    geolocation: Geolocation | undefined;
  }>({
    loading: false,
    weather: undefined,
    config: {
      precipitation: MM,
      temperature: CELSIUS,
      windSpeed: KMH,
    },
    geolocation: undefined,
  });

  useEffect(() => {
    updateWeather();
  }, [config]);

  const setGeolocation = (geolocation: Geolocation) => {
    setState((state) => {
      return {
        ...state,
        geolocation,
      };
    });
  };

  const setConfig = (config: Config) => {
    setState((state) => {
      return {
        ...state,
        config,
      };
    });
  };

  const updateWeather = async () => {
    try {
      if (!geolocation) return;

      setState((state) => {
        return { ...state, loading: true };
      });

      const weather = await WeatherFacade.getWeather({
        ...config,
        latitude: geolocation?.latitude,
        longitude: geolocation?.longitude,
      });

      setState((state) => {
        return {
          ...state,
          weather,
          loading: false,
        };
      });
    } catch (error) {
      setState((state) => {
        return { ...state, weather: undefined, loading: false };
      });
      console.error(error);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        loading,
        weather,
        config,
        geolocation,
        updateWeather,
        setGeolocation,
        setConfig,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
