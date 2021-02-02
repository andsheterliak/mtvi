import { useState } from 'react';

import AppBar from './components/AppBar';
import Drawer from './components/Drawer';

const Menu = () => {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const [isSearchOpened, setIsSearchOpened] = useState(false);

  const toggleDrawerHandler = (isOpened) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsDrawerOpened(isOpened);
  };

  const toggleSearchHandler = () => {
    setIsSearchOpened((prevState) => !prevState);
  };

  return (
    <>
      <AppBar
        isSearchOpened={isSearchOpened}
        toggleSearchHandler={toggleSearchHandler}
        toggleDrawerHandler={toggleDrawerHandler}
      />

      <Drawer
        isDrawerOpened={isDrawerOpened}
        toggleDrawerHandler={toggleDrawerHandler}
      />
    </>
  );
};

export default Menu;
