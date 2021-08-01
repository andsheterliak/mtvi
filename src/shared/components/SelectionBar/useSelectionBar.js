import { useState } from 'react';

export const useSelectionBar = (defaultValue) => {
  const [selected, setSelected] = useState(defaultValue);

  return { selected, setSelected };
};
