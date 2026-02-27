import type { Geolocation, Item } from '@core/domain/model';
import type { GeolocationPort } from '@core/domain/port';

export class GetGeolocationUseCase {
  readonly #geolocationPort: GeolocationPort;

  constructor(geolocationPort: GeolocationPort) {
    this.#geolocationPort = geolocationPort;
  }

  execute(name: string): Promise<Item<Geolocation>[]> {
    if (!name) throw new Error('No name');

    return this.#geolocationPort.search(name);
  }
}
