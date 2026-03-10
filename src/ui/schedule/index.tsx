import type { DailyWeather, HourlyWeather } from '@core/domain/model';
import { useEffect, useMemo, useState } from 'react';
import { useWeather } from '../hooks';
import { DynamicWeatherIcon } from '../icon/DynamicWeatherIcon';
import DayDropdown from './DayDropdown';

function Schedule() {
  const { weather, loading } = useWeather();
  const [currentDay, setCurrentDay] = useState<DailyWeather>();

  const hourList = useMemo(() => {
    if (!weather || !currentDay) return [];

    return filterBySelectedHour(currentDay ?? weather.daily[0], weather.hourly);
  }, [weather, currentDay]);

  useEffect(() => {
    if (!weather) return;

    setCurrentDay(weather.daily[0]);
  }, [weather]);

  function filterBySelectedHour(
    selectedHour: DailyWeather,
    hourList: HourlyWeather[],
  ) {
    const selectDayId = selectedHour.time.split('T')[0];

    return hourList.filter(({ time }) => {
      const entryDayId = time.split('T')[0];
      return entryDayId === selectDayId;
    });
  }

  return weather && currentDay ? (
    <section className='not-lg:mt-7 lg:min-w-96 rounded-lg bg-neutral-800'>
      <div className='pt-4 px-4 flex items-center justify-between'>
        <h3 className='text-xl'>Hourly forecast</h3>

        <DayDropdown selected={currentDay} changeDay={setCurrentDay} />
      </div>

      <ul className='custom-scroll px-4 mt-4 lg:overflow-y-auto lg:max-h-[79dvh] lg:mb-4'>
        {hourList.map(({ temperature, formatDate, time, weatherCode }) => (
          <li
            key={`${temperature}-${formatDate}-${time}-${weatherCode}`}
            className={`text-xl flex items-center my-4 p-4 first:mt-0 last:mb-0 ${loading ? 'py-8' : ''} shadow-2xs bg-neutral-700 rounded-md border border-neutral-600`}
          >
            {!loading ? (
              <>
                <DynamicWeatherIcon
                  weatherCode={weatherCode}
                  className={'aspect-square w-10'}
                />

                <p>{formatDate}</p>
                <p className='ml-auto'>{temperature}º</p>
              </>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  ) : null;
}

export default Schedule;
