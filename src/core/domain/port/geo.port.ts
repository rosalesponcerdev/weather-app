import type { Geolocation, Item } from '@core/domain/model';

export interface GeolocationPort {
  search(name: string): Promise<Item<Geolocation>[]>;
}
