import iconDrizzle from '@/assets/images/icon-drizzle.webp';
import iconFog from '@/assets/images/icon-fog.webp';
import iconOvercast from '@/assets/images/icon-overcast.webp';
import iconPartlyCloudy from '@/assets/images/icon-partly-cloudy.webp';
import iconRain from '@/assets/images/icon-rain.webp';
import iconSnow from '@/assets/images/icon-snow.webp';
import iconStorm from '@/assets/images/icon-storm.webp';
import iconSunny from '@/assets/images/icon-sunny.webp';

const getImageByCode = (weatherCode: number): { src: string; alt: string } => {
  if (weatherCode === 0)
    return {
      src: iconSunny,
      alt: 'icon-sunny',
    };

  if ([1, 2].includes(weatherCode)) {
    return {
      src: iconPartlyCloudy,
      alt: 'icon-partly-cloudy',
    };
  }

  if (weatherCode === 3) {
    return { src: iconOvercast, alt: 'icon-overcast' };
  }

  if ([45, 48].includes(weatherCode)) {
    return { src: iconFog, alt: 'icon-fog' };
  }

  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67].includes(weatherCode)) {
    return { src: iconDrizzle, alt: 'icon-drizzle' };
  }

  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return { src: iconSnow, alt: 'icon-snow' };
  }

  if ([80, 81, 82].includes(weatherCode)) {
    return { src: iconRain, alt: 'icon-rain' };
  }

  if (95 >= weatherCode) {
    return { src: iconStorm, alt: 'icon-storm' };
  }

  return { src: iconOvercast, alt: 'icon-overcast' };
};

export const DynamicWeatherIcon = ({
  weatherCode,
  className,
}: {
  weatherCode: number;
  className: string;
}) => {
  return <img {...getImageByCode(weatherCode)} className={className} />;
};
