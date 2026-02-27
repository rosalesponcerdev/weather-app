import './App.css';

import Header from './ui/header';
import { WeatherProvider } from './ui/provider';
import Schedule from './ui/schedule';
import Search from './ui/search';
import Today from './ui/today';
import Week from './ui/week';

function App() {
  return (
    <>
      <WeatherProvider>
        <Header />
        <Search />

        <div className='mt-8 lg:flex lg:gap-8'>
          <div className='lg:flex-1'>
            <Today />
            <Week />
          </div>
          <Schedule />
        </div>
      </WeatherProvider>
    </>
  );
}

export default App;
