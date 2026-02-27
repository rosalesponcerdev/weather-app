import type { CurrentWeather, Geolocation } from '@core/domain/model';
import { formatIsoDate } from '@core/util';
import { DynamicWeatherIcon } from '../icon/DynamicWeatherIcon';
import Background from './background';

interface Props {
  loading: boolean;
  current?: CurrentWeather;
  geolocation?: Geolocation;
}

function MainToday({ current, geolocation, loading }: Props) {
  return loading ? (
    <div className='h-65 flex justify-center items-center text-base rounded-xl bg-neutral-800'>
      <div>
        <div className='flex justify-center gap-2'>
          <div className='h-2 rounded-4xl aspect-square bg-neutral-0 animate-[bounce_1s_ease-in-out_alternate_infinite]'></div>
          <div className='h-2 rounded-4xl aspect-square bg-neutral-0 animate-[bounce_1s_ease-in-out_.3s_alternate_infinite]'></div>
          <div className='h-2 rounded-4xl aspect-square bg-neutral-0 animate-[bounce_1s_ease-in-out_.6s_alternate_infinite]'></div>
        </div>

        <span className='block mt-2'>Loading...</span>
      </div>
    </div>
  ) : (
    <div className='relative'>
      <Background />

      <div className='absolute left-0 top-0 w-full h-full gap-4 px-6 not-lg:py-12 lg:flex lg:justify-between lg:items-center'>
        <div className='flex-1 text-center lg:text-left'>
          <h2 className='w-full text-3xl lg:text-xl xl:text-3xl font-bold'>
            {geolocation?.city
              ? `${geolocation.city}, ${geolocation.country}`
              : geolocation?.country}
          </h2>

          <h3 className='mt-2 w-full lg:text-sm xl:text-xl text-neutral-200'>
            {current?.time ? formatIsoDate(current.time) : '_'}
          </h3>
        </div>

        <div className='flex-1 not-lg:w-full flex items-center justify-center gap-4 not-lg:my-2'>
          {current?.weatherCode ? (
            <DynamicWeatherIcon
              weatherCode={current.weatherCode}
              className='flex-1 max-w-32 lg:max-w-25 xl:max-w-50'
            />
          ) : null}

          <h2 className='flex-1 font-bricolage text-center font-semibold italic text-main-today-small lg:text-main-today-large'>
            {current?.temperature ? current.temperature : '_'}º
          </h2>
        </div>
      </div>
    </div>
  );
}

export default MainToday;
