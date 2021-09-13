import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ReactNode } from 'react';

const useStyles = makeStyles(({ breakpoints }) => {
  return createStyles({
    grid: {
      display: 'grid',
      gap: '20px',

      [breakpoints.up('sm')]: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '25px',
      },
    },
  });
});

export const CreditsGrid = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();

  return <div className={classes.grid}>{children}</div>;
};
