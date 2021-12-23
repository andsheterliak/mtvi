import { makeStyles } from '@material-ui/core/styles';
import { Pagination as MUIPagination, Skeleton } from '@material-ui/lab';
import classNames from 'classnames';
import { TotalPages } from '~/api/tmdb';
import { IsLoading, IsSpacing } from '~/shared/types';
import { ChangePageHandler, PaginationPage } from './types';

export * from './types';
export * from './usePagination';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },

  pagination: {
    display: 'inline-block',
  },

  spacing: {
    marginTop: '35px',
  },
});

type Props = {
  page: PaginationPage | undefined;
  totalPages: TotalPages | undefined;
  isLoading: IsLoading;
  isDisabled: boolean;
  changePageHandler: ChangePageHandler;
  isSpacing?: IsSpacing;
};

export const Pagination = ({
  page,
  totalPages,
  isLoading,
  isDisabled,
  changePageHandler,
  isSpacing = true,
}: Props) => {
  const classes = useStyles();

  if (!isLoading && (!totalPages || totalPages < 2)) return null;

  const rootClasses = classNames(classes.root, {
    [classes.spacing]: isSpacing,
  });

  if (isLoading) {
    return (
      <div className={rootClasses}>
        <Skeleton className={classes.pagination} width={270} height={32} />
      </div>
    );
  }

  return (
    <div className={rootClasses}>
      <MUIPagination
        className={classes.pagination}
        page={page}
        count={typeof totalPages !== 'undefined' && totalPages > 500 ? 500 : totalPages}
        siblingCount={0}
        disabled={isDisabled}
        onChange={changePageHandler}
        size="medium"
        color="primary"
      />
    </div>
  );
};
