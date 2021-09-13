import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ReactNode } from 'react';

const useStyles = makeStyles(({ breakpoints }) => {
  return createStyles({
    grid: {
      display: 'grid',
      gap: '40px',
      alignItems: 'start',

      [breakpoints.up('md')]: {
        gridTemplateColumns: '260px 1fr',
      },
    },
  });
});

export const PageGrid = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();

  return <div className={classes.grid}>{children}</div>;
};
