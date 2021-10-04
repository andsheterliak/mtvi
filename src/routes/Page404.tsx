import { Button, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
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
      fontSize: '8rem',
      fontWeight: 600,

      [breakpoints.up('sm')]: {
        fontSize: '10rem',
      },

      [breakpoints.up('md')]: {
        fontSize: '14rem',
      },
    },

    btn: {
      marginTop: '10px',
    },
  });
});

export type Page404Props = {
  homePath: string;
};

export const Page404 = ({ homePath }: Page404Props) => {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>MTvI | 404</title>
        <meta name="keywords" content="404, page not found" />
      </Helmet>

      <Spacer />

      <div className={classes.root}>
        <MainContainer>
          <Typography color="textPrimary" className={classes.title} component="h1" variant="h1">
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
