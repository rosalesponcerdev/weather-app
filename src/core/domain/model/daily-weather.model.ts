import type { BaseWeather } from './base-weather.model';

export interface DailyWeather extends BaseWeather {
  temperatureMin: number;
  temperatureMax: number;
}
