import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';

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
    fontSize: '8rem',
    fontWeight: '600',

    [theme.breakpoints.up('sm')]: {
      fontSize: '10rem',
    },

    [theme.breakpoints.up('md')]: {
      fontSize: '14rem',
    },
  },

  btn: {
    marginTop: '10px',
  },
}));

const Page404 = ({ homePath }) => {
  const classes = useStyles();

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
            404
          </Typography>

          <Typography color="textSecondary" component="p" variant="body1">
            The resource you requested could not be found :(
          </Typography>

          <Button
            variant="text"
            size="large"
            component={Link}
            to={homePath}
            className={classes.btn}
            startIcon={<HomeIcon />}
          >
            Go Home
          </Button>
        </MainContainer>
      </div>
    </>
  );
};

export default Page404;
