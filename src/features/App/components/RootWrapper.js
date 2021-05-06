import { makeStyles } from '@material-ui/core/styles';

import types from '~common/types';

const useStyles = makeStyles(() => {
  return {
    root: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      '-webkit-tap-highlight-color': 'transparent', // Disable blue highlight on chrome (mobile)

      '& > :last-child': {
        marginTop: 'auto',
      },
    },
  };
});

const RootWrapper = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

RootWrapper.propTypes = {
  children: types.containerChildren,
};

export default RootWrapper;
