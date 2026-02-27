import type { RequestWeather, WeatherConsolidate } from '@core/domain/model';
import type { WeatherPort } from '@core/domain/port';
import { OpenMeteoAdapter } from './open-meteo.adapter';
import type { OpenMeteoWeatherDto } from './open-meteo.dto';

export class OpenMeteoRepository implements WeatherPort {
  readonly #BASE_URL = 'https://api.open-meteo.com/v1/forecast';

  async getCurrentWeather(
    requestWeather: RequestWeather,
  ): Promise<WeatherConsolidate> {
    const { params } = OpenMeteoAdapter.toApi(requestWeather);

    const url = `${this.#BASE_URL}?${params}`;

    const res = await fetch(url);
    const data = (await res.json()) as OpenMeteoWeatherDto;

    return OpenMeteoAdapter.fromApi(data);
  }
}
