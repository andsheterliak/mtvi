import { useState } from 'react';

const useSearchIn = ({ value }) => {
  const [menuFilterAnchorEl, setMenuFilterAnchorEl] = useState(null);
  const [isMenuFilterOpened, setIsMenuFilterOpened] = useState(false);
  const [searchInValue, setFilterValue] = useState(value);

  const openMenuFilterHandler = (event) => {
    setMenuFilterAnchorEl(event.currentTarget);
    setIsMenuFilterOpened(true);
  };

  const selectMenuFilterItemHandler = (event, selected) => {
    setFilterValue(selected);
    setMenuFilterAnchorEl(null);
    setIsMenuFilterOpened(false);
  };

  const closeMenuFilterHandler = () => {
    setIsMenuFilterOpened(false);
    setMenuFilterAnchorEl(null);
  };

  return {
    menuFilterAnchorEl,
    isMenuFilterOpened,
    searchInValue,
    openMenuFilterHandler,
    selectMenuFilterItemHandler,
    closeMenuFilterHandler,
  };
};

export default useSearchIn;
