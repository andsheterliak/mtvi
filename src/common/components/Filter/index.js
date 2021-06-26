import { Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export { default as useFilter } from './useFilter';

const Filter = ({ config, filterByHandler, filterBy, isLoading }) => {
  if (isLoading) return <Skeleton width={70} height={32} />;

  const menus = Object.values(config).map((item) => {
    return (
      <MenuItem key={item.label} value={item.value}>
        {item.label}
      </MenuItem>
    );
  });

  return (
    <div>
      <InputLabel
        htmlFor="filter-results-by"
        id="filter-results-by-label"
      ></InputLabel>

      <Select
        disableUnderline
        labelId="filter-results-by-label"
        id="filter-results-by"
        value={filterBy}
        input={<Input />}
        onChange={filterByHandler}
      >
        {menus}
      </Select>
    </div>
  );
};

export default Filter;
