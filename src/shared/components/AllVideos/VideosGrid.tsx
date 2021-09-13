import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ReactNode } from 'react';

const useStyles = makeStyles(({ breakpoints }) => {
  return createStyles({
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '15px',

      [breakpoints.up('sm')]: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '20px',
      },
    },
  });
});

export const VideosGrid = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();

  return <div className={classes.grid}>{children}</div>;
};
