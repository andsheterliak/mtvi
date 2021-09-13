import { makeStyles } from '@material-ui/core/styles';
import { ReactNode } from 'react';

const useStyles = makeStyles({
  section: {
    width: '100%',
  },
});

export const Section = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();

  return <section className={classes.section}>{children}</section>;
};
