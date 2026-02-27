import type { Geolocation, Item } from '@core/domain/model';
import type { GeolocationPort } from '@core/domain/port';
import { OpenGeoAdapter } from './open-geo.adapter';
import type { GeolocationDto } from './open-geo.dto';

export class OpenGeoRepository implements GeolocationPort {
  readonly #BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search';

  async search(name: string): Promise<Item<Geolocation>[]> {
    const { params } = OpenGeoAdapter.toApi({ name });

    const url = `${this.#BASE_URL}?${params}`;

    const res = await fetch(url);
    const data = (await res.json()) as GeolocationDto;

    return OpenGeoAdapter.fromApi(data);
  }
}
