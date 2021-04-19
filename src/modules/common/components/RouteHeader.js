import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  spacing: {
    margin: '20px 0 20px 20px',

    [theme.breakpoints.up('md')]: {
      margin: '40px 0 40px 20px',
    },
  },
}));

const RouteHeader = ({ titleName, isSpacing = true }) => {
  const classes = useStyles();
  const classNames = [];

  if (isSpacing) classNames.push(classes.spacing);

  return (
    <Typography
      color="textPrimary"
      variant="h4"
      component="h1"
      className={classNames.join(' ')}
    >
      {titleName}
    </Typography>
  );
};

export default RouteHeader;
