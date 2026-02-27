import { useState } from 'react';

import { CELSIUS, FAHRENHEIT, INCH, KMH, MM, MPH } from '@core/domain/const';
import type { Config, RequestWeather } from '@core/domain/model';
import { IconCheckmark, IconDropdown, IconUnits } from '@ui/icon';
import { CONFIG } from './config';

interface Props {
  initialConfig: Omit<RequestWeather, 'latitude' | 'longitude'>;
  initialShow?: boolean;
  loading: boolean;
  selectHandlerProp: (config: Config) => void;
}

export const UnitsDropdown = ({
  initialConfig: { precipitation, temperature, windSpeed },
  initialConfig,
  initialShow,
  loading,
  selectHandlerProp,
}: Props) => {
  const [show, setShow] = useState(initialShow ?? false);
  const [isImperial, setIsImperial] = useState<boolean>(false);

  const selectOptionHandler = (config: Partial<Config>) => {
    const newConfig = { ...initialConfig, ...config };

    setShow(false);
    selectHandlerProp(newConfig);
  };

  const switchUnits = () => {
    selectHandlerProp(
      isImperial
        ? {
            temperature: CELSIUS,
            precipitation: MM,
            windSpeed: KMH,
          }
        : {
            precipitation: INCH,
            temperature: FAHRENHEIT,
            windSpeed: MPH,
          },
    );

    setIsImperial(!isImperial);
  };

  return (
    <div className='relative'>
      <button
        disabled={loading}
        className='flex items-center gap-2 py-1 px-2 bg-neutral-800 rounded-md cursor-pointer disabled:opacity-75 not-disabled:cursor-pointer'
        onClick={() => setShow((state) => !state)}
      >
        <IconUnits />
        <p>Units</p>
        <IconDropdown />
      </button>

      <ul
        className={`absolute z-10 w-full min-w-48 top-[calc(100%+var(--spacing)*2)] right-0 bg-neutral-800 py-1 px-2 rounded-sm border border-neutral-600 ${show ? '' : 'hidden'}`}
      >
        <li>
          <button
            className='w-full text-left text-sm my-1 py-1 px-2 rounded-sm cursor-pointer hover:bg-neutral-700'
            onClick={() => switchUnits()}
          >
            Switch to {isImperial ? 'Metric' : 'Imperial'}
          </button>
        </li>

        <ul>
          <label className='font-bricolage text-xs text-neutral-300'>
            Temperature
          </label>

          {CONFIG.temperature.map(({ id, label }) => (
            <li className='w-full' key={id}>
              <button
                className={`flex items-center justify-between w-full text-left text-sm my-1 py-1 px-2 rounded-sm cursor-pointer ${
                  id === temperature ? 'bg-neutral-700' : null
                }`}
                onClick={() => selectOptionHandler({ temperature: id })}
              >
                {label}

                {id === temperature ? <IconCheckmark /> : null}
              </button>
            </li>
          ))}
        </ul>

        <ul>
          <label className='font-bricolage text-xs text-neutral-300'>
            Wind Speed
          </label>

          {CONFIG.windSpeed.map(({ id, label }) => (
            <li className='w-full' key={id}>
              <button
                className={`flex items-center justify-between w-full text-left text-sm my-1 py-1 px-2 rounded-sm cursor-pointer ${
                  id === windSpeed ? 'bg-neutral-700' : null
                }`}
                onClick={() => selectOptionHandler({ windSpeed: id })}
              >
                {label}

                {id === windSpeed ? <IconCheckmark /> : null}
              </button>
            </li>
          ))}
        </ul>

        <ul>
          <label className='font-bricolage text-xs text-neutral-300'>
            Precipitation
          </label>

          {CONFIG.precipitation.map(({ id, label }) => (
            <li className='w-full' key={id}>
              <button
                className={`flex items-center justify-between w-full text-left text-sm my-1 py-1 px-2 rounded-sm cursor-pointer ${
                  id === precipitation ? 'bg-neutral-700' : null
                }`}
                onClick={() => selectOptionHandler({ precipitation: id })}
              >
                {label}

                {id === precipitation ? <IconCheckmark /> : null}
              </button>
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
