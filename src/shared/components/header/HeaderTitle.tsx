import { Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import classNames from 'classnames';
import { Name } from '~/api/tmdb';
import { IsLoading, IsSpacing } from '~/shared/types';

const useStyles = makeStyles(({ typography, breakpoints, spacing }) => {
  return createStyles({
    title: {
      textAlign: 'center',
      ...typography.h5,

      [breakpoints.up('sm')]: {
        ...typography.h4,
      },

      [breakpoints.up('md')]: {
        textAlign: 'left',
        ...typography.h3,
      },
    },

    spacing: {
      margin: `${spacing(2)}px 0`,
    },

    skeleton: {
      display: 'inline-block',
    },
  });
});

type Props = {
  isLoading: IsLoading;
  isSpacing?: IsSpacing;
  title: Name | undefined;
};

export const HeaderTitle = ({ title, isSpacing = true, isLoading }: Props) => {
  const classes = useStyles();

  const rootClasses = classNames(classes.title, {
    [classes.spacing]: isSpacing,
  });

  return (
    <Typography color="textPrimary" component="h1" className={rootClasses}>
      {isLoading ? <Skeleton className={classes.skeleton} width="80%" /> : title}
    </Typography>
  );
};
