import { Input, InputLabel, MenuItem, Select } from '@material-ui/core';

import OptionContainer from './OptionContainer';
import OptionTitle from './OptionTitle';

const SortResultsByOption = ({ defaultOptions, sortByOptions }) => {
  const menuItems = sortByOptions.map((item) => {
    return (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    );
  });

  return (
    <OptionContainer>
      <OptionTitle>Sort Results By</OptionTitle>

      <InputLabel
        htmlFor="sort-results-by"
        id="sort-results-by-label"
      ></InputLabel>

      <Select
        fullWidth
        labelId="sort-results-by-label"
        id="sort-results-by"
        value={defaultOptions.sortByOptions}
        input={<Input />}
      >
        {menuItems}
      </Select>
    </OptionContainer>
  );
};

export default SortResultsByOption;
