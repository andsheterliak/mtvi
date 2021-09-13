import { makeStyles } from '@material-ui/core/styles';
import { ReactNode } from 'react';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gap: '15px',
  },
});

export const SeasonsGrid = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};
