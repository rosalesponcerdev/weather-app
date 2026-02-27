import type { DailyWeather } from '@core/domain/model';
import { formatIsoDate } from '@core/util';
import { DynamicWeatherIcon } from '../icon/DynamicWeatherIcon';

interface Props {
  day: DailyWeather;
  loading: boolean;
}

function Day({
  day: { time, temperatureMax, temperatureMin, weatherCode },
  loading,
}: Props) {
  const formatDay = (date: string) => {
    return formatIsoDate(date.replaceAll('-', '/'), {
      weekday: 'short',
    });
  };

  return (
    <article
      className={`text-base ${loading ? 'py-20' : 'py-4'}  px-2 rounded-xl bg-neutral-800 text-center`}
    >
      {loading ? null : (
        <>
          <p>{formatDay(time)}</p>

          <DynamicWeatherIcon
            weatherCode={weatherCode}
            className='w-20 aspect-square m-auto p-2'
          />

          <div className='flex justify-between'>
            <p>{temperatureMax}º</p>
            <p>{temperatureMin}º</p>
          </div>
        </>
      )}
    </article>
  );
}

export default Day;
