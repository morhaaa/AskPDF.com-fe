import { useEffect, useState } from 'react';

const useWindowWidth = (ref?: React.RefObject<HTMLElement>) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const handleResize = () => {
    if (ref && ref.current) {
      setWindowWidth(ref.current.offsetWidth);
    } else {
      setWindowWidth(window.innerWidth);
    }
  };

  useEffect(() => {
    handleResize(); 

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref]);
  
  return windowWidth;
};

export default useWindowWidth;
