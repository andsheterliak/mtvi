import { useEffect, useCallback } from 'react';

type Props = {
  effect(): void;
  deps: unknown[];
  delay: number;
};

export const useDebounceEffect = ({ effect, deps, delay = 250 }: Props) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);

    return () => clearTimeout(timeout);
  }, [callback, delay]);
};
