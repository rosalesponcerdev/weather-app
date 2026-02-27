import { PRECIPITATION_ICON, WIND_SPEED_ICON } from '../const';
import { useWeather } from '../hooks';
import MainToday from './MainToday';
import TodayArticle from './TodayArticle';

function Today() {
  const { weather, config, geolocation, loading } = useWeather();

  return (
    <>
      {weather || loading ? (
        <section className='not-lg:mt-9'>
          <MainToday
            loading={loading}
            current={weather?.current}
            geolocation={geolocation}
          />

          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4'>
            <TodayArticle
              title='Feels Like'
              loading={loading}
              value={`${weather?.current.feelsLike}º`}
            />
            <TodayArticle
              title='Humidity'
              loading={loading}
              value={`${weather?.current.humidity}%`}
            />
            <TodayArticle
              title='Wind'
              loading={loading}
              value={`${weather?.current.windSpeed} ${WIND_SPEED_ICON.get(config.windSpeed)}`}
            />
            <TodayArticle
              title='Precipitation'
              loading={loading}
              value={`${weather?.current.precipitation} ${PRECIPITATION_ICON.get(config.precipitation)}`}
            />
          </div>
        </section>
      ) : null}
    </>
  );
}

export default Today;
