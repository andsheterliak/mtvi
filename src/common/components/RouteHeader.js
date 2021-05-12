import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

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

  const rootClasses = classNames({
    [classes.spacing]: isSpacing,
  });

  return (
    <Typography
      color="textPrimary"
      variant="h4"
      component="h1"
      className={rootClasses}
    >
      {titleName}
    </Typography>
  );
};

export default RouteHeader;
