import { Pagination as MUIPagination, PaginationItem } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';
import classNames from 'classnames';

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
  path,
  totalPages,
  isLoading,
  changePageHandler,
  isSpacing = true,
}) => {
  const classes = useStyles();

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
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`${path}${item.page === 1 ? '' : `?page=${item.page}`}`}
            {...item}
          />
        )}
      />
    </div>
  );
};

export default Pagination;
