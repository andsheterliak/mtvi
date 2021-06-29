import { useEffect, useState } from 'react';

const useToggleSearch = ({ isVisible = false } = {}) => {
  const [isSearchVisible, setIsSearchVisible] = useState(isVisible);

  const toggleSearchHandler = () => {
    setIsSearchVisible((prevIsSearchVisible) => !prevIsSearchVisible);
  };

  const closeSearchHandler = (event) => {
    if (event.type === 'keydown') {
      if (event.key === 'Escape') setIsSearchVisible(false);
      return;
    }

    setIsSearchVisible(false);
  };

  useEffect(() => {
    const windowResizeHandler = () => {
      const widthWithoutScrollbar = document.documentElement.clientWidth;

      document.body.style.width = isSearchVisible
        ? `${widthWithoutScrollbar}px`
        : 'auto';
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

export default useToggleSearch;
