import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';

import classNames from 'classnames';

const useStyles = makeStyles(() => {
  return {
    spacing: {
      marginBottom: '20px',
    },
  };
});

export const Description = ({ description, isSpacing = true, isLoading }) => {
  const classes = useStyles();

  const rootClasses = classNames({
    [classes.spacing]: isSpacing,
  });

  return (
    <Typography
      color="textPrimary"
      component="p"
      variant="body1"
      className={rootClasses}
    >
      {isLoading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton width="80%" />
        </>
      ) : (
        description
      )}
    </Typography>
  );
};
