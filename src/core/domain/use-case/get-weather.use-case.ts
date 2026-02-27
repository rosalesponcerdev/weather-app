import type { RequestWeather, WeatherConsolidate } from '@core/domain/model';
import type { WeatherPort } from '@core/domain/port';

export class GetWeatherUseCase {
  readonly #weatherPort: WeatherPort;

  constructor(weatherPort: WeatherPort) {
    this.#weatherPort = weatherPort;
  }

  execute(requestWeather: RequestWeather): Promise<WeatherConsolidate> {
    if (
      requestWeather.latitude === null ||
      requestWeather.latitude === undefined
    )
      throw new Error(`Error latitude: ${requestWeather.latitude}`);

    if (
      requestWeather.longitude === null ||
      requestWeather.longitude === undefined
    )
      throw new Error(`Error longitude: ${requestWeather.longitude}`);

    if (!requestWeather.precipitation) requestWeather.precipitation = 'mm';
    if (!requestWeather.temperature) requestWeather.temperature = 'celsius';
    if (!requestWeather.windSpeed) requestWeather.windSpeed = 'kmh';

    return this.#weatherPort.getCurrentWeather(requestWeather);
  }
}
