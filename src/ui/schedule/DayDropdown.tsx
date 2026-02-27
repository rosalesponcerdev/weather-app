import { useMemo, useState } from 'react';

import type { DailyWeather } from '@core/domain/model';
import type { Item } from '@core/interface';
import { formatIsoDate } from '@core/util';
import { useWeather } from '../hooks';
import { IconCheckmark, IconDropdown } from '../icon';

interface Props {
  selected: DailyWeather;
  changeDay?: (day: DailyWeather) => void;
}

function DayDropdown({ selected, changeDay }: Props) {
  const { weather, loading } = useWeather();

  const options = useMemo<Item<DailyWeather>[]>(() => {
    return (
      weather?.daily.map((d) => {
        return {
          id: d,
          label: formatIsoDate(d.time.replaceAll('-', '/'), {
            weekday: 'short',
          }),
        };
      }) ?? []
    );
  }, [weather]);

  const [{ show }, setState] = useState({
    show: false,
  });

  const selectOptionHandler = (id: DailyWeather) => {
    setState((state) => ({ ...state, show: false }));
    changeDay?.(id);
  };

  return (
    <div className='relative'>
      <button
        disabled={loading}
        className='flex items-center gap-2 py-2 px-4 bg-neutral-600 rounded-xl not-disabled:cursor-pointer disabled:opacity-75'
        onClick={() => setState((state) => ({ ...state, show: !state.show }))}
      >
        <p>
          {loading
            ? '-'
            : (options.find((o) => o.id.time === selected.time)?.label ?? null)}
        </p>
        <IconDropdown />
      </button>

      <ul
        className={`absolute z-10 w-full min-w-48 top-[calc(100%+var(--spacing)*2)] right-0 bg-neutral-800 py-1 px-2 rounded-sm border border-neutral-600 ${show ? '' : 'hidden'}`}
      >
        <li className='w-full'>
          {options.map(({ id, label }) => (
            <button
              key={id.time}
              className={`flex items-center justify-between w-full text-left text-sm my-1 py-1 px-2 rounded-sm cursor-pointer ${
                id.time === selected.time ? 'bg-neutral-700' : null
              }`}
              onClick={() => selectOptionHandler(id)}
            >
              {label}

              {id.time === selected.time ? <IconCheckmark /> : null}
            </button>
          ))}
        </li>
      </ul>
    </div>
  );
}

export default DayDropdown;
