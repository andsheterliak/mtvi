import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  spacing: {
    marginTop: '20px',
  },
}));

const LoadMoreBtn = ({
  loadMoreHandler,
  isMoreData,
  isLoading,
  infiniteScrollRef,
  isSpacing = true,
}) => {
  const classes = useStyles();
  const classNames = [];

  if (isSpacing) classNames.push(classes.spacing);

  return (
    <Button
      ref={infiniteScrollRef}
      size="large"
      fullWidth
      disabled={!isMoreData || isLoading}
      className={classNames.join(' ')}
      onClick={loadMoreHandler}
    >
      Load More
    </Button>
  );
};

export default LoadMoreBtn;
