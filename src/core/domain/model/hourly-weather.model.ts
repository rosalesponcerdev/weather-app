import type { BaseWeather } from './base-weather.model';

export interface HourlyWeather extends BaseWeather {
  temperature: number;
  formatDate: string;
  dt: Date;
}
