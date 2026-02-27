import { useContext } from 'react';

import { WeatherContext } from '../provider';

export const useWeather = () => {
  const context = useContext(WeatherContext);

  if (!context)
    throw new Error('useWeather debe usarse dentro de un WeatherProvider');

  return context;
};
