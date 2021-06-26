import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';

import classNames from 'classnames';

const useStyles = makeStyles((theme) => {
  return {
    title: {
      textAlign: 'center',
      ...theme.typography.h5,

      [theme.breakpoints.up('sm')]: {
        ...theme.typography.h4,
      },

      [theme.breakpoints.up('md')]: {
        textAlign: 'left',
        ...theme.typography.h3,
      },
    },

    spacing: {
      margin: `${theme.spacing(2)}px 0`,
    },

    skeleton: {
      display: 'inline-block',
    },
  };
});

const HeaderTitle = ({ title, isSpacing = true, isLoading }) => {
  const classes = useStyles();

  const rootClasses = classNames(classes.title, {
    [classes.spacing]: isSpacing,
  });

  return (
    <Typography color="textPrimary" component="h1" className={rootClasses}>
      {isLoading ? (
        <Skeleton className={classes.skeleton} width="80%" />
      ) : (
        title
      )}
    </Typography>
  );
};

export default HeaderTitle;
