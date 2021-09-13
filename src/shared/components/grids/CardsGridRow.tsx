import { makeStyles } from '@material-ui/core/styles';
import { ReactNode } from 'react';

const useStyles = makeStyles({
  items: {
    display: 'grid',
    gap: '15px',
    gridAutoFlow: 'column',
    gridAutoColumns: '180px',
  },
});

export const CardsGridRow = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();

  return <div className={classes.items}>{children}</div>;
};
