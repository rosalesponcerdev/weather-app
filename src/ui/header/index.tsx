import logo from '@/assets/images/logo.svg';
import type { Config } from '@core/domain/model';
import { UnitsDropdown } from '@ui/units-dropdown';
import { useWeather } from '../hooks';

function Header() {
  const {
    config: { precipitation, temperature, windSpeed },
    loading,
    setConfig,
  } = useWeather();

  const selectHandler = (config: Config) => {
    setConfig({
      ...config,
    });
  };

  return (
    <header className='flex justify-between'>
      <img src={logo} alt='Logo Weather Now' className='max-w-38' />

      <UnitsDropdown
        loading={loading}
        initialConfig={{
          temperature,
          windSpeed,
          precipitation,
        }}
        selectHandlerProp={selectHandler}
      />
    </header>
  );
}

export default Header;
