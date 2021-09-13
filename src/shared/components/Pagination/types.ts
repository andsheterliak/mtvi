import { UsePaginationProps } from '@material-ui/lab';

export type ChangePageHandler = Exclude<UsePaginationProps['onChange'], undefined>;
export type PaginationPage = Parameters<ChangePageHandler>[1];
