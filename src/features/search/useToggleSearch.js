import { useEffect, useState } from 'react';

const useToggleSearch = ({ isVisible = false } = {}) => {
  const [isSearchVisible, setIsSearchVisible] = useState(isVisible);

  const toggleSearchHandler = () => {
    setIsSearchVisible((prevIsSearchVisible) => !prevIsSearchVisible);
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

  return { isSearchVisible, toggleSearchHandler };
};

export default useToggleSearch;
