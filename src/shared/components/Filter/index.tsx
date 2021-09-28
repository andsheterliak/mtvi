import { Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { VisuallyHidden } from '~/shared/components/VisuallyHidden';
import { IsLoading } from '~/shared/types';
import { FilterByHandler, FilterConfig, FilterValue } from './types';

export * from './types';
export * from './useFilter';
export * from './utils';

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
      <VisuallyHidden>
        <InputLabel id="filter-results-by-label">Filter</InputLabel>
      </VisuallyHidden>

      <Select
        disableUnderline
        labelId="filter-results-by-label"
        value={filterBy}
        input={<Input />}
        onChange={filterByHandler}
      >
        {menus}
      </Select>
    </div>
  );
};
