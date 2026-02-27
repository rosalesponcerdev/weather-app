import { type InputEvent } from 'react';

import type { Geolocation } from '@core/domain/model';
import { IconLoader, IconSearch } from '@ui/icon';
import { useGeolocation, useWeather } from '../hooks';

function Search() {
  const {
    show,
    maskInput,
    geolocation,
    options,
    setInputValue,
    setSelectOption,
  } = useGeolocation();

  const { updateWeather, loading } = useWeather();

  const inputHandler = (event: InputEvent<HTMLInputElement>) => {
    event.stopPropagation();

    setInputValue((event.target as HTMLInputElement).value);
  };

  const selectOptionHandler = (
    selectedOption: Geolocation,
    maskInput: string,
  ) => {
    setSelectOption(selectedOption, maskInput);
  };

  const searchHandler = (ev: React.MouseEvent) => {
    ev.stopPropagation();

    updateWeather();
  };

  return (
    <section className='mt-15'>
      <h1 className='font-bricolage text-center font-semibold text-[62px] line-height'>
        How's the sky looking today?
      </h1>

      <div className='mt-15 lg:flex lg:items-center lg:gap-4 lg:max-w-2xl lg:mx-auto'>
        <div className='relative lg:flex-1'>
          <label
            className={`flex items-center gap-2 py-4 px-6 rounded-xl bg-neutral-800 ${loading ? 'opacity-75' : ''}`}
          >
            <IconSearch />

            <input
              disabled={loading}
              type='search'
              placeholder='Search for a place...'
              className='w-full outline-0'
              value={maskInput}
              onInput={inputHandler}
            />
          </label>

          {show ? (
            <div className='z-10 absolute top-[calc(100%+var(--spacing)*2)] w-full bg-neutral-800 rounded-md py-1 px-2'>
              <ul className='w-full'>
                {loading ? (
                  <li className='w-full'>
                    <button className='flex gap-4 items-center text-left text-sm w-full my-1 py-2 px-4 rounded-sm cursor-pointer bg-neutral-700'>
                      <IconLoader /> Search in progress
                    </button>
                  </li>
                ) : (
                  options?.map(({ id, label }) => (
                    <li
                      className='w-full'
                      key={`${id.latitude},${id.longitude}`}
                    >
                      <button
                        className='text-left text-sm w-full my-1 py-2 px-4 rounded-sm cursor-pointer bg-neutral-700'
                        onClick={() => selectOptionHandler(id, label)}
                      >
                        {label}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          ) : null}
        </div>

        <button
          disabled={!geolocation || loading}
          className='py-4 px-6 not-lg:w-full not-lg:mt-4 rounded-xl bg-blue-500 not-disabled:cursor-pointer text-xl disabled:opacity-75'
          onClick={(ev) => searchHandler(ev)}
        >
          Search
        </button>
      </div>
    </section>
  );
}

export default Search;
