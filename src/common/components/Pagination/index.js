import { Pagination as MUIPagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

export { default as usePagination } from './usePagination';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
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
  changePageHandler,
  isSpacing = true,
}) => {
  const classes = useStyles();

  if (totalPages < 2) return null;

  const rootClasses = classNames(classes.root, {
    [classes.spacing]: isSpacing,
  });

  return (
    <div className={rootClasses}>
      <MUIPagination
        className={classes.pagination}
        page={page}
        count={totalPages}
        siblingCount={0}
        disabled={isLoading}
        onChange={changePageHandler}
        size="medium"
      />
    </div>
  );
};

export default Pagination;
