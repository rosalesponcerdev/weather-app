import { INCH, MM } from '@core/domain/const';
import type { Precipitation } from '@core/domain/model';

export const PRECIPITATION_ICON = new Map<Precipitation, string>([
  [INCH, 'in'],
  [MM, 'in'],
]);
