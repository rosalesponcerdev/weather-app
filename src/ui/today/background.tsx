import useWindowDimensions from '../hooks/useWindowDimensions';
import { IconBgTodayLarge, IconBgTodaySmall } from '../icon';

function Background() {
  const { width } = useWindowDimensions();

  return width > 490 ? <IconBgTodayLarge /> : <IconBgTodaySmall />;
}
export default Background;
