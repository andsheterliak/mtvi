import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  btn: {
    marginTop: '20px',
  },
}));

const LoadMoreBtn = () => {
  const classes = useStyles();

  return (
    <Button size="large" fullWidth className={classes.btn}>
      Load More
    </Button>
  );
};

export default LoadMoreBtn;
