import { Button, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { useEffect } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { useHistory } from 'react-router-dom';
import { MainContainer, Spacer } from '~/shared/components';

const useStyles = makeStyles(({ breakpoints }) => {
  return createStyles({
    root: {
      display: 'grid',
      placeContent: 'center',
      flexGrow: 1,
      textAlign: 'center',
    },

    title: {
      fontSize: '3rem',
      fontWeight: 600,
      marginBottom: '15px',
      textTransform: 'uppercase',

      [breakpoints.up('sm')]: {
        fontSize: '6rem',
      },

      [breakpoints.up('md')]: {
        fontSize: '10rem',
      },
    },

    btn: {
      marginTop: '10px',
    },
  });
});

export const ErrorFallback = ({ resetErrorBoundary, error }: FallbackProps) => {
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
          <Typography color="textPrimary" className={classes.title} component="h1" variant="h1">
            Error :{'('}
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
