export interface GeolocationDto {
  results?: ResultDto[];
  generationtime_ms: number;
}

export interface ResultDto {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  timezone: string;
  population?: number;
  country_id: number;
  country: string;
  admin1_id?: number;
  admin2_id?: number;
  postcodes?: string[];
  admin1?: string;
  admin2?: string;
  admin3_id?: number;
  admin3?: string;
}
