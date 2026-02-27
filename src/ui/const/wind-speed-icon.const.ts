import { KMH, MPH } from '@core/domain/const';
import type { WindSpeed } from '@core/domain/model';

export const WIND_SPEED_ICON = new Map<WindSpeed, string>([
  [KMH, 'hm/h'],
  [MPH, 'mph'],
]);
