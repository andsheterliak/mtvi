import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ReactNode } from 'react';

const useStyles = makeStyles(({ breakpoints }) => {
  return createStyles({
    items: {
      display: 'grid',
      gap: '15px',
      gridAutoFlow: 'column',
      gridAutoColumns: '220px',

      [breakpoints.up('sm')]: {
        gridAutoColumns: '320px',
      },

      [breakpoints.up('md')]: {
        gridAutoColumns: '420px',
      },

      [breakpoints.up('lg')]: {
        gridAutoColumns: '540px',
      },
    },
  });
});

export const VideosGridRow = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();

  return <div className={classes.items}>{children}</div>;
};
