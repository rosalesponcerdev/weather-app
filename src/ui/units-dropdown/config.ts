import type {
  Item,
  Precipitation,
  Temperature,
  WindSpeed,
} from '@core/domain/model';
import {
  CELSIUS,
  FAHRENHEIT,
  INCH,
  KMH,
  MM,
  MPH,
} from '../../core/domain/const';

export const CONFIG: {
  temperature: Item<Temperature>[];
  windSpeed: Item<WindSpeed>[];
  precipitation: Item<Precipitation>[];
} = {
  temperature: [
    {
      id: CELSIUS,
      label: 'Celsius (ºC)',
    },
    {
      id: FAHRENHEIT,
      label: 'Fahrenheit (ºF)',
    },
  ],
  windSpeed: [
    {
      id: KMH,
      label: 'km/h',
    },
    {
      id: MPH,
      label: 'mph',
    },
  ],
  precipitation: [
    {
      id: MM,
      label: 'Millimeters (mm)',
    },
    {
      id: INCH,
      label: 'Inches (in)',
    },
  ],
};
