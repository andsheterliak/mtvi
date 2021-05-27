import { useState } from 'react';

const useSelectionBar = (defaultValue) => {
  const [selected, setSelected] = useState(defaultValue);

  return { selected, setSelected };
};

export default useSelectionBar;
