import type { RequestWeather, WeatherConsolidate } from '@core/domain/model';

export interface WeatherPort {
  getCurrentWeather(
    requestWeather: RequestWeather,
  ): Promise<WeatherConsolidate>;
}
