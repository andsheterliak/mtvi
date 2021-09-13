import { useState } from 'react';
import { Selected } from './types';

export const useSelectionBar = (defaultValue: Selected) => {
  const [selected, setSelected] = useState(defaultValue);

  return { selected, setSelected };
};
