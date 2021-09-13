import { useState } from 'react';
import { FilterByHandler, FilterValue } from './types';

export const useFilter = (initialValue: FilterValue) => {
  const [filterBy, setFilterBy] = useState(initialValue);

  const filterByHandler: FilterByHandler = (event) => {
    setFilterBy(event.target.value as FilterValue);
  };

  return { filterBy, filterByHandler };
};
