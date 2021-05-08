import { exact, objectOf, string } from 'prop-types';
import { Input, InputLabel, MenuItem, Select } from '@material-ui/core';

import types from '~common/types';

const Filter = ({ config, filterByHandler, filterBy }) => {
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

Filter.propTypes = {
  config: objectOf(
    exact({
      label: string.isRequired,
      value: string.isRequired,
    })
  ).isRequired,

  filterByHandler: types.generic.handler.isRequired,
  filterBy: string.isRequired,
};

export default Filter;
