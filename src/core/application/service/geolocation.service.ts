import { GetGeolocationUseCase } from '@core/domain/use-case';
import { OpenGeoRepository } from '@core/infrastructure/open-geo';

export abstract class GeolocationService {
  static #getGeolocationUseCaseInstance: GetGeolocationUseCase;

  static getGeolocation(name: string) {
    return this.#getWeatherUseCaseImpl().execute(name);
  }

  static #getWeatherUseCaseImpl() {
    if (!this.#getGeolocationUseCaseInstance)
      this.#getGeolocationUseCaseInstance = new GetGeolocationUseCase(
        new OpenGeoRepository(),
      );

    return this.#getGeolocationUseCaseInstance;
  }
}
