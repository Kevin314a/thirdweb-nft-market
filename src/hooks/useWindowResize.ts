import {useState, useEffect} from 'react';

export const useWindowResize = () => {
  const [viewMode, setViewMode] = useState<"swiper" | "card">("card");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setViewMode("swiper");
      } else {
        setViewMode("card");
      }
    };

    window.addEventListener('resize', handleResize); // Update on resize
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    viewMode
  };
}