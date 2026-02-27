import type { Precipitation } from './precipitation.model';
import type { Temperature } from './temperature.model';
import type { WindSpeed } from './wind-speed.model';

export interface Config {
  temperature: Temperature;
  precipitation: Precipitation;
  windSpeed: WindSpeed;
}
