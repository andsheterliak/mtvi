import { Pagination as MUIPagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { bool, number } from 'prop-types';

import types from '~common/types';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
  },

  pagination: {
    display: 'inline-block',
  },

  spacing: {
    marginTop: '25px',
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
  const classNames = [classes.root];

  if (isSpacing) classNames.push(classes.spacing);

  return (
    <div className={classNames.join(' ')}>
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

Pagination.propTypes = {
  page: number.isRequired,
  totalPages: number.isRequired,
  isLoading: bool.isRequired,
  changePageHandler: types.handler,
  isSpacing: types.isSpacing,
};

export default Pagination;
