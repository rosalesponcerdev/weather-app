import { useEffect, useState } from 'react';

import { WeatherFacade } from '@core/application/facade';
import type { Geolocation } from '@core/domain/model';
import type { Item } from '@core/interface';
import { useDebounce } from './useDebounce';
import { useWeather } from './useWeather';

interface State {
  inputValue: string | null;
  maskInput: string;
  options: Item<Geolocation>[] | null;
  loading: boolean;

  show: boolean;
}

export const useGeolocation = () => {
  const { geolocation, setGeolocation } = useWeather();
  const [{ maskInput, inputValue, options, loading, show }, setState] =
    useState<State>({
      inputValue: null,
      options: null,
      loading: false,
      maskInput: '',
      show: false,
    });
  const debounceValue = useDebounce(inputValue);

  useEffect(() => {
    if (!debounceValue) return;

    setState((state) => {
      return { ...state, loading: true };
    });

    WeatherFacade.getGeolocation(debounceValue)
      .then((res) => {
        setState((state) => {
          return { ...state, options: res, loading: false, show: true };
        });
      })
      .catch(() => {
        setState((state) => {
          return { ...state, loading: false };
        });
      });
  }, [debounceValue]);

  const setInputValue = (value: string | null) => {
    setState((state) => {
      return { ...state, inputValue: value, maskInput: value ?? '' };
    });
  };

  const setSelectOption = (selectedOption: Geolocation, maskInput: string) => {
    setState((state) => {
      return { ...state, maskInput, selectedOption, show: false };
    });

    setGeolocation(selectedOption);
  };

  return {
    loading,
    maskInput,
    options,
    show,
    geolocation,
    setSelectOption,
    setInputValue,
  };
};
