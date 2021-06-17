import { useEffect, useState } from 'react';

const useToggleSearch = ({ isVisible = false } = {}) => {
  const [isSearchVisible, setIsSearchVisible] = useState(isVisible);

  const toggleSearchHandler = () => {
    setIsSearchVisible((prevIsSearchVisible) => !prevIsSearchVisible);
  };

  useEffect(() => {
    const widthWithoutScrollbar = document.body.clientWidth;

    document.body.style.overflow = isSearchVisible ? 'hidden' : 'auto';
    document.body.style.width = isSearchVisible
      ? `${widthWithoutScrollbar}px`
      : 'auto';
  }, [isSearchVisible]);

  return { isSearchVisible, toggleSearchHandler };
};

export default useToggleSearch;
