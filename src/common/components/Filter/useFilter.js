import { useState } from 'react';

const useFilter = ({ initialValue }) => {
  const [filterBy, setFilterBy] = useState(initialValue);

  const filterByHandler = (e) => {
    setFilterBy(e.target.value);
  };

  return { filterBy, filterByHandler };
};

export default useFilter;
