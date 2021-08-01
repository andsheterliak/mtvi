import { useEffect, useState } from 'react';
import { getLS, setLS } from '~/shared/utils';

export const useOptions = ({ storageOptionsName, defaultOptions }) => {
  const [options, setOptions] = useState(
    () => getLS(storageOptionsName) || defaultOptions
  );

  useEffect(() => {
    setLS(storageOptionsName, options);
  }, [options, storageOptionsName]);

  return { options, setOptions };
};
