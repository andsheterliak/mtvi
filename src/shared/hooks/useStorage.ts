import { useCallback, useState } from 'react';
import { StorageName } from '~/shared/types';

type UseStorageProps<DefaultValue> = {
  name: StorageName;
  defaultValue: DefaultValue;
};

export const useStorage = <Value, DefaultValue = Value>({
  name,
  defaultValue,
}: UseStorageProps<DefaultValue>) => {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(name);

    return item ? (JSON.parse(item) as Value) : defaultValue; // 'parse' method always returns 'any'.
  });

  const setItem = useCallback(
    (item: Value | DefaultValue) => {
      setValue(item);
      localStorage.setItem(name, JSON.stringify(item));
    },

    [name]
  );

  const removeItem = useCallback(() => {
    localStorage.removeItem(name);
  }, [name]);

  return [value, setItem, removeItem] as const;
};
