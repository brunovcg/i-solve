import { useEffect, useState } from 'react';
import { configs } from '../../configs';

const { mobileBreakpoint } = configs.resolutions;

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(() => getWindowDimensions());

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { width, height } = windowDimensions;

  const formatCssUnitToNumber = (value: string) => Number(value.substring(0, mobileBreakpoint.length - 2));

  const isMobileViewport = width <= formatCssUnitToNumber(mobileBreakpoint);

  return { width, height, isMobileViewport };
}
