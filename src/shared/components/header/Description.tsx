import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import classNames from 'classnames';
import { Overview } from '~/api/tmdb';
import { IsLoading, IsSpacing } from '~/shared/types';

const useStyles = makeStyles({
  spacing: {
    marginBottom: '20px',
  },
});

type Props = {
  isLoading: IsLoading;
  isSpacing?: IsSpacing;
  description: Overview | null | undefined;
};

export const Description = ({ description, isSpacing = true, isLoading }: Props) => {
  const classes = useStyles();

  const rootClasses = classNames({
    [classes.spacing]: isSpacing,
  });

  return (
    <Typography color="textPrimary" component="p" variant="body1" className={rootClasses}>
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
