import { makeStyles } from '@material-ui/core/styles';
import { ReactNode } from 'react';

const useStyles = makeStyles({
  list: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
});

export const InfoListContainer = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();

  return <ul className={classes.list}>{children}</ul>;
};
