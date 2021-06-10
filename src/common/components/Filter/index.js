import { Input, InputLabel, MenuItem, Select } from '@material-ui/core';

export { default as useFilter } from './useFilter';

const Filter = ({ config, filterByHandler, searchIn }) => {
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
        value={searchIn}
        input={<Input />}
        onChange={filterByHandler}
      >
        {menus}
      </Select>
    </div>
  );
};

export default Filter;
