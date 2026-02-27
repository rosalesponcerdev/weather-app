import { GeolocationService, WeatherService } from '@core/application/service';
import type { RequestWeather } from '@core/domain/model';

export abstract class WeatherFacade {
  static getWeather(requestWeather: RequestWeather) {
    return WeatherService.getWeather(requestWeather);
  }

  static getGeolocation(name: string) {
    return GeolocationService.getGeolocation(name);
  }
}
