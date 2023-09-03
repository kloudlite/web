import { useEffect, useState } from 'react';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  function onResize(event: { target: any }) {
    setScreenSize({
      width: event.target.innerWidth,
      height: event.target.innerHeight,
    });
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (screenSize.width === 0 && screenSize.height === 0) {
        onResize({ target: window });
      }
      window.addEventListener('resize', onResize, true);
      return () => {
        window.removeEventListener('resize', onResize);
      };
    }
    return () => {};
  }, []);

  return screenSize;
};

export default useScreenSize;
