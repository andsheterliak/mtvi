import { Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import { memo } from 'react';
import { OptionContainer } from './OptionContainer';
import { OptionTitle } from './OptionTitle';

export const SortResultsByOptionComponent = ({
  sortByOptions,
  sortBy,
  sortByHandler,
}) => {
  const menuItems = Object.values(sortByOptions).map((item) => {
    return (
      <MenuItem key={item.apiName} value={item.apiName}>
        {item.name}
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
        value={sortBy}
        input={<Input />}
        onChange={sortByHandler}
      >
        {menuItems}
      </Select>
    </OptionContainer>
  );
};

export const SortResultsByOption = memo(SortResultsByOptionComponent);
