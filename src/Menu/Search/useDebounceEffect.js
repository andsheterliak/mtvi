import { useEffect, useCallback } from 'react';

export const useDebounceEffect = ({ effect, deps, delay = 250 }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);

    return () => clearTimeout(timeout);
  }, [callback, delay]);
};
