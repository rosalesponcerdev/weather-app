import type { CurrentWeather } from './current-weather.model';
import type { DailyWeather } from './daily-weather.model';
import type { HourlyWeather } from './hourly-weather.model';

export interface WeatherConsolidate {
  current: CurrentWeather;
  daily: DailyWeather[];
  hourly: HourlyWeather[];
}
