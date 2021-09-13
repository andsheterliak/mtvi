import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ReactNode } from 'react';

const useStyles = makeStyles(({ breakpoints }) => {
  return createStyles({
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '15px',

      [breakpoints.up('sm')]: {
        gap: '20px',
      },
    },
  });
});

export const EpisodesGrid = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();

  return <div className={classes.grid}>{children}</div>;
};
