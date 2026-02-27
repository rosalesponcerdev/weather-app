import type {
  CurrentWeather,
  DailyWeather,
  HourlyWeather,
  RequestWeather,
  WeatherConsolidate,
} from '@core/domain/model';
import { formatIsoDate } from '@core/util';
import type {
  CurrentDto,
  DailyDto,
  HourlyDto,
  OpenMeteoWeatherDto,
} from './open-meteo.dto';

export class OpenMeteoAdapter {
  static toApi({
    latitude,
    longitude,
    precipitation,
    temperature,
    windSpeed,
  }: RequestWeather): { params: URLSearchParams } {
    const params = new URLSearchParams({
      latitude: `${latitude}`,
      longitude: `${longitude}`,
      precipitation_unit: precipitation,
      temperature_unit: temperature,
      wind_speed_unit: windSpeed,
      daily: 'temperature_2m_min,temperature_2m_max,weather_code',
      hourly: 'temperature_2m,weather_code',
      current:
        'wind_speed_10m,precipitation,temperature_2m,relative_humidity_2m,apparent_temperature,weather_code',
      timezone: 'America/New_York',
    });

    return { params };
  }

  static fromApi(openMeteoWeather: OpenMeteoWeatherDto): WeatherConsolidate {
    const { current, daily, hourly } = openMeteoWeather;

    return {
      current: OpenMeteoAdapter.fromApiCurrent(current),
      daily: OpenMeteoAdapter.fromApiDaily(daily),
      hourly: OpenMeteoAdapter.fromApiHourly(hourly),
    };
  }

  static fromApiCurrent(current: CurrentDto): CurrentWeather {
    return {
      feelsLike: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
      precipitation: current.precipitation,
      temperature: current.temperature_2m,
      time: current.time,
      weatherCode: current.weather_code,
      windSpeed: current.wind_speed_10m,
    };
  }

  static fromApiDaily(daily: DailyDto): DailyWeather[] {
    return daily.time.map((time, index) => {
      return {
        time: time,
        temperatureMax: daily.temperature_2m_max[index],
        temperatureMin: daily.temperature_2m_min[index],
        weatherCode: daily.weather_code[index],
      };
    });
  }

  static fromApiHourly(hourly: HourlyDto): HourlyWeather[] {
    return hourly.time.map((time, index) => {
      return {
        time: time,
        formatDate: formatIsoDate(time, {
          hour: 'numeric',
          hour12: true,
        }),
        dt: new Date(time),
        temperature: hourly.temperature_2m[index],
        weatherCode: hourly.weather_code[index],
      };
    });
  }
}
