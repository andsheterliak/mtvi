import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  btn: {
    marginTop: '20px',
  },
}));

const LoadMoreBtn = ({
  loadMoreHandler,
  isMoreData,
  isLoading,
  infiniteScrollRef,
}) => {
  const classes = useStyles();

  return (
    <Button
      ref={infiniteScrollRef}
      size="large"
      fullWidth
      disabled={!isMoreData || isLoading}
      className={classes.btn}
      onClick={loadMoreHandler}
    >
      Load More
    </Button>
  );
};

export default LoadMoreBtn;
