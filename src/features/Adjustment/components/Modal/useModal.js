import { useState } from 'react';

const useModal = (isOpened) => {
  const [isModalOpened, setIsModalOpened] = useState(isOpened);

  return { isModalOpened, setIsModalOpened };
};

export default useModal;
