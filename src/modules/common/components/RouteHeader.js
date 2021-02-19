import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    margin: '20px 0 20px 20px',

    [theme.breakpoints.up('md')]: {
      margin: '40px 0 40px 20px',
    },
  },
}));

const RouteHeader = ({ routeName }) => {
  const classes = useStyles();

  return (
    <Typography variant="h4" component="h1" className={classes.header}>
      {routeName}
    </Typography>
  );
};

export default RouteHeader;
