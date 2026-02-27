import type { BaseWeather } from './base-weather.model';

export interface CurrentWeather extends BaseWeather {
  windSpeed: number;
  precipitation: number;
  humidity: number;
  feelsLike: number;
  temperature: number;
}
