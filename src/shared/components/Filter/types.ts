import { SelectProps } from '@material-ui/core';

export type FilterValue = string;
export type FilterConfig = Record<string, { label: string; value: FilterValue }>;
export type FilterByHandler = Exclude<SelectProps['onChange'], undefined>;
