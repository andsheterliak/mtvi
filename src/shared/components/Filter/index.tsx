import { Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { IsLoading } from '~/shared/types';
import { FilterByHandler, FilterConfig, FilterValue } from './types';

export * from './useFilter';
export * from './utils';
export * from './types';

type Props = {
  isLoading: IsLoading;
  config: FilterConfig;
  filterBy: FilterValue;
  filterByHandler: FilterByHandler;
};

export const Filter = ({ config, filterByHandler, filterBy, isLoading }: Props) => {
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
      <InputLabel htmlFor="filter-results-by" id="filter-results-by-label"></InputLabel>

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
