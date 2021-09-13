import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ReactNode } from 'react';

const useStyles = makeStyles(({ spacing, breakpoints }) => {
  return createStyles({
    layout: {
      display: 'grid',
      gridTemplateColumns: '100%',
      gap: `${spacing(4)}px`,
      alignItems: 'start',

      [breakpoints.up('sm')]: {
        gap: `${spacing(5)}px`,
      },
    },
  });
});

export const Layout = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();

  return <div className={classes.layout}>{children}</div>;
};
