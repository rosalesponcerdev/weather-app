export interface OpenMeteoWeatherDto {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnitsDto;
  current: CurrentDto;
  hourly_units: HourlyUnitsDto;
  hourly: HourlyDto;
  daily_units: DailyUnitsDto;
  daily: DailyDto;
}

export interface CurrentDto {
  time: string;
  interval: number;
  wind_speed_10m: number;
  precipitation: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  weather_code: number;
}

export interface CurrentUnitsDto {
  time: string;
  interval: string;
  wind_speed_10m: string;
  precipitation: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  apparent_temperature: string;
  weather_code: string;
}

export interface DailyDto {
  time: string[];
  temperature_2m_min: number[];
  temperature_2m_max: number[];
  weather_code: number[];
}

export interface DailyUnitsDto {
  time: string;
  temperature_2m_min: string;
  temperature_2m_max: string;
  weather_code: string;
}

export interface HourlyDto {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
}

export interface HourlyUnitsDto {
  time: string;
  temperature_2m: string;
  weather_code: string;
}
