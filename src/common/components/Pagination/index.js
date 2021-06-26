import { Pagination as MUIPagination, Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

export { default as usePagination } from './usePagination';

const useStyles = makeStyles(() => ({
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
}));

const Pagination = ({
  page,
  totalPages,
  isLoading,
  isDisabled,
  changePageHandler,
  isSpacing = true,
}) => {
  const classes = useStyles();

  if (!isLoading && totalPages < 2) return null;

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
        count={totalPages}
        siblingCount={0}
        disabled={isDisabled}
        onChange={changePageHandler}
        size="medium"
      />
    </div>
  );
};

export default Pagination;
