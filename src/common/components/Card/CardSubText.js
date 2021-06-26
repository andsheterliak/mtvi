import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
  subText: {
    alignSelf: 'end',
  },
}));

const CardSubText = ({ children, isLoading }) => {
  const classes = useStyles();

  return (
    <Typography
      variant="caption"
      color="textSecondary"
      component="p"
      className={classes.subText}
    >
      {isLoading ? (
        <>
          <Skeleton />
          <Skeleton width="80%" />
        </>
      ) : (
        children
      )}
    </Typography>
  );
};

export default CardSubText;
