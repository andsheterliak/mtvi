import { useState } from 'react';

const useFilter = ({ initialValue }) => {
  const [searchIn, setFilterBy] = useState(initialValue);

  const filterByHandler = (e) => {
    setFilterBy(e.target.value);
  };

  return { searchIn, filterByHandler };
};

export default useFilter;
