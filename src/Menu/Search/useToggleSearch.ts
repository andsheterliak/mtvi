import { useEffect, useState } from 'react';
import { CloseSearchEvent } from './search-types';

export const useToggleSearch = (isVisible = false) => {
  const [isSearchVisible, setIsSearchVisible] = useState(isVisible);

  const toggleSearchHandler = () => {
    setIsSearchVisible((prevIsSearchVisible) => !prevIsSearchVisible);
  };

  const closeSearchHandler = (event: CloseSearchEvent) => {
    if (event.type === 'keydown') {
      if ('code' in event && event.code === 'Escape') setIsSearchVisible(false);

      return;
    }

    setIsSearchVisible(false);
  };

  useEffect(() => {
    const windowResizeHandler = () => {
      const widthWithoutScrollbar = document.documentElement.clientWidth;

      document.body.style.width = isSearchVisible ? `${widthWithoutScrollbar}px` : 'auto';
    };

    window.addEventListener('resize', windowResizeHandler);

    windowResizeHandler();
    document.body.style.overflow = isSearchVisible ? 'hidden' : 'auto';

    return () => {
      window.removeEventListener('resize', windowResizeHandler);
    };
  }, [isSearchVisible]);

  return {
    isSearchVisible,
    toggleSearchHandler,
    closeSearchHandler,
  };
};
