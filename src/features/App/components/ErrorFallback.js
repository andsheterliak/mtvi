import { useEffect } from 'react';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

import MainContainer from '~components/MainContainer';
import Spacer from '~components/Spacer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    placeContent: 'center',
    flexGrow: 1,
    textAlign: 'center',
  },

  title: {
    fontSize: '3rem',
    fontWeight: '600',
    marginBottom: '15px',
    textTransform: 'uppercase',

    [theme.breakpoints.up('sm')]: {
      fontSize: '6rem',
    },

    [theme.breakpoints.up('md')]: {
      fontSize: '10rem',
    },
  },

  btn: {
    marginTop: '10px',
  },
}));

const ErrorFallback = ({ resetErrorBoundary, error }) => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      resetErrorBoundary();
    });

    return () => {
      unlisten();
    };
  }, [history, resetErrorBoundary]);

  return (
    <>
      <Spacer />

      <div className={classes.root}>
        <MainContainer>
          <Typography
            color="textPrimary"
            className={classes.title}
            component="h1"
            variant="h1"
          >
            Error :(
          </Typography>

          <Typography color="textSecondary" component="p" variant="body1">
            {error.message}
          </Typography>

          <Button
            onClick={resetErrorBoundary}
            variant="text"
            size="large"
            className={classes.btn}
            startIcon={<RotateLeftIcon />}
          >
            Try again
          </Button>
        </MainContainer>
      </div>
    </>
  );
};

export default ErrorFallback;
