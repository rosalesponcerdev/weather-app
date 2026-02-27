import { useWeather } from '../hooks';
import Day from './Day';

function Week() {
  const { weather, loading } = useWeather();

  return weather ? (
    <section className='mt-6'>
      <h3 className='text-xl'>Daily forecast</h3>

      <div className='mt-4 grid grid-cols-3 gap-4 lg:grid-cols-[repeat(auto-fit,minmax(120px,1fr))]'>
        {weather.daily.map((day) => (
          <Day key={day.time} day={day} loading={loading} />
        ))}
      </div>
    </section>
  ) : null;
}

export default Week;
