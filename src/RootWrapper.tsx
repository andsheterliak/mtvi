import { makeStyles } from '@material-ui/core/styles';
import { ReactNode } from 'react';

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    '-webkit-tap-highlight-color': 'transparent', // Disable blue highlight on chrome (mobile)

    '& > :last-child': {
      marginTop: 'auto',
    },
  },
});

type Props = {
  children: ReactNode;
};

export const RootWrapper = ({ children }: Props) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};
