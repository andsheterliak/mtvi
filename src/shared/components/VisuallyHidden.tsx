import { makeStyles } from '@material-ui/core/styles';
import { ReactNode } from 'react';

const useStyles = makeStyles({
  root: {
    border: '0px solid',
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: '-8px',
    overflow: 'hidden',
    padding: '0px',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px',
  },
});

export const VisuallyHidden = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};
