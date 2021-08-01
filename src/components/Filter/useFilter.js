import { useState } from 'react';

export const useFilter = ({ initialValue }) => {
  const [filterBy, setFilterBy] = useState(initialValue);

  const filterByHandler = (e) => {
    setFilterBy(e.target.value);
  };

  return { filterBy, filterByHandler };
};
