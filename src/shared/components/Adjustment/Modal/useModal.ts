import { useState } from 'react';
import { IsOpened } from './types';

export const useModal = (isOpened: IsOpened) => {
  const [isModalOpened, setIsModalOpened] = useState(isOpened);

  return { isModalOpened, setIsModalOpened };
};
