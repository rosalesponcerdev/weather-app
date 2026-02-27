import type { Geolocation, Item } from '@core/domain/model';
import type { GeolocationDto } from './open-geo.dto';

export class OpenGeoAdapter {
  static toApi({ name }: { name: string }): { params: URLSearchParams } {
    const params = new URLSearchParams({
      name,
    });

    return { params };
  }

  static fromApi({ results }: GeolocationDto): Item<Geolocation>[] {
    if (!results) return [];

    return results.map(({ country, admin1, latitude, longitude }) => {
      return {
        id: {
          city: admin1,
          country,
          location,
          longitude,
          latitude,
        },
        label: admin1 ? `${admin1}, ${country}` : country,
      };
    });
  }
}
