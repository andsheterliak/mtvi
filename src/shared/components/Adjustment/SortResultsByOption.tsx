import { Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import { memo } from 'react';
import { VisuallyHidden } from '~/shared/components/VisuallyHidden';
import { OptionContainer } from './OptionContainer';
import { OptionTitle } from './OptionTitle';
import { SortByEvent, SortByOptions, SortByValue } from './types';

type Props = {
  sortByOptions: SortByOptions;
  sortBy: SortByValue;
  sortByHandler(event: SortByEvent): void;
};

export const SortResultsByOptionComponent = ({ sortByOptions, sortBy, sortByHandler }: Props) => {
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

      <VisuallyHidden>
        <InputLabel htmlFor="sort-results-by" id="sort-results-by-label">
          Sort Results By
        </InputLabel>
      </VisuallyHidden>

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
