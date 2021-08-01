import { useState } from 'react';

export const useModal = (isOpened) => {
  const [isModalOpened, setIsModalOpened] = useState(isOpened);

  return { isModalOpened, setIsModalOpened };
};
