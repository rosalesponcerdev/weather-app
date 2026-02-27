import type { RequestWeather } from '@core/domain/model';
import { GetWeatherUseCase } from '@core/domain/use-case';
import { OpenMeteoRepository } from '@core/infrastructure/open-meteo';

export abstract class WeatherService {
  static #getWeatherUseCaseInstance: GetWeatherUseCase;

  static getWeather(requestWeather: RequestWeather) {
    return this.#getWeatherUseCaseImpl().execute(requestWeather);
  }

  static #getWeatherUseCaseImpl() {
    if (!this.#getWeatherUseCaseInstance)
      this.#getWeatherUseCaseInstance = new GetWeatherUseCase(
        new OpenMeteoRepository(),
      );

    return this.#getWeatherUseCaseInstance;
  }
}
