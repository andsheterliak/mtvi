import { useState } from 'react';
import { useHistory } from 'react-router';

const useSearch = ({ isVisible = false, searchBasePath } = {}) => {
  const history = useHistory();
  const [value, setValue] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(isVisible);

  const toggleSearchHandler = () => {
    setIsSearchVisible((prevIsSearchVisible) => !prevIsSearchVisible);
  };

  const inputSearchHandler = (e) => {
    setValue(e.target.value);
  };

  const submitSearchHandler = (e) => {
    e.preventDefault();
    if (!value.trim()) return;

    const searchParams = new URLSearchParams(`query=${value}`);

    history.push(`${searchBasePath}?${searchParams}`);
    toggleSearchHandler();
  };

  const clearSearchHandler = () => {
    setValue('');
  };

  return {
    isSearchVisible,
    toggleSearchHandler,
    inputSearchHandler,
    submitSearchHandler,
    clearSearchHandler,
    searchValue: value,
  };
};

export default useSearch;
