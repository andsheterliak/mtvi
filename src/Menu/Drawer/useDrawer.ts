import { useState } from 'react';
import { DrawerEvent } from './drawer-types';

const ifIsTabOrShiftKey = (event: DrawerEvent) => {
  if (event instanceof KeyboardEvent && (event.code === 'Tab' || event.code === '"ShiftLeft"')) {
    return true;
  }

  return false;
};

export const useDrawer = () => {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

  const openDrawerHandler = () => {
    setIsDrawerOpened(true);
  };

  const closeDrawerHandler = (event: DrawerEvent) => {
    if (ifIsTabOrShiftKey(event)) return;
    setIsDrawerOpened(false);
  };

  return { isDrawerOpened, openDrawerHandler, closeDrawerHandler };
};
