import { useState } from 'react';

const ifIsTabOrShiftKey = (event) => {
  if (
    event.type === 'keydown' &&
    (event.key === 'Tab' || event.key === 'Shift')
  ) {
    return true;
  }

  return false;
};

const useDrawer = () => {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

  const openDrawerHandler = () => {
    setIsDrawerOpened(true);
  };

  const closeDrawerHandler = (event) => {
    if (ifIsTabOrShiftKey(event)) return;
    setIsDrawerOpened(false);
  };

  return { isDrawerOpened, openDrawerHandler, closeDrawerHandler };
};

export default useDrawer;
