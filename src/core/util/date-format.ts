export const formatIsoDate = (
  isoString: string,
  options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  },
): string => {
  const date = new Date(isoString);

  if (isNaN(date.getTime())) return 'Invalid Date';

  return new Intl.DateTimeFormat(navigator.language, options).format(date);
};
