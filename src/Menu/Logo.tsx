import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  logo: {
    fontWeight: 500,
  },
});

export const Logo = () => {
  const classes = useStyles();

  return (
    <Typography color="textPrimary" component="span" variant="h4" className={classes.logo}>
      MTvI.
    </Typography>
  );
};
