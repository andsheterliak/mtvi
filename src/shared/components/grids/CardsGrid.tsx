import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ReactNode } from 'react';

const useStyles = makeStyles(({ breakpoints }) => {
  return createStyles({
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',

      [breakpoints.up('sm')]: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '20px',
      },
    },
  });
});

export const CardsGrid = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();

  return <div className={classes.grid}>{children}</div>;
};
