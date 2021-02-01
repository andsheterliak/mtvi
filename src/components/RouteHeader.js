import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  header: {
    margin: '20px 0 20px 20px',
  },
});

const RouteHeader = ({ routeName }) => {
  const styles = useStyles();

  return (
    <Typography variant="h4" component="h1" className={styles.header}>
      {routeName}
    </Typography>
  );
};

export default RouteHeader;
