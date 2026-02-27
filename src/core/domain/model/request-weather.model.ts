import type { Config } from './config.model';

export interface RequestWeather extends Config {
  latitude: number;
  longitude: number;
}
