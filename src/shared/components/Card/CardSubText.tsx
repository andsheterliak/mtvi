import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { ReactNode } from 'react';
import { IsLoading } from '~/shared/types';

const useStyles = makeStyles({
  subText: {
    alignSelf: 'end',
  },
});

type Props = Partial<{
  children: ReactNode;
  isLoading: IsLoading;
}>;

export const CardSubText = ({ children, isLoading }: Props) => {
  const classes = useStyles();

  return (
    <Typography variant="caption" color="textSecondary" component="p" className={classes.subText}>
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
