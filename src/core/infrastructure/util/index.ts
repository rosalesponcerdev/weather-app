export const normalizeWeatherDate = (dateString: string): string => {
  const hasTimezone = dateString.includes('Z') || dateString.includes('+');
  const normalizedString = hasTimezone ? dateString : `${dateString}Z`;

  return new Date(normalizedString).toISOString();
};
