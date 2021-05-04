import { Link } from 'react-router-dom';
import { Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { string } from 'prop-types';

import types from '~common/types';

import MainContainer from '~components/MainContainer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: `${theme.spacing(2)}px 0`,
  },

  img: {
    height: '130px',
    marginRight: `${theme.spacing(3)}px`,
    display: 'none',

    [theme.breakpoints.up('sm')]: {
      display: 'inline-block',
    },
  },

  body: {
    display: 'grid',
    gap: `${theme.spacing(1)}px`,
    alignItems: 'center',
    alignContent: 'center',
  },

  link: {
    justifySelf: 'start',
  },

  title: {
    ...theme.typography.h6,

    [theme.breakpoints.up('md')]: {
      ...theme.typography.h5,
    },

    [theme.breakpoints.up('lg')]: {
      ...theme.typography.h4,
    },
  },
}));

const BackToHeader = ({ title, imgPath, path, linkName }) => {
  const classes = useStyles();

  return (
    <Paper square>
      <MainContainer>
        <div className={classes.root}>
          <img className={classes.img} src={imgPath} alt="" />

          <div className={classes.body}>
            <Typography
              component="h1"
              color="textPrimary"
              className={classes.title}
            >
              {title}
            </Typography>

            <Button
              className={classes.link}
              component={Link}
              to={path}
              variant="text"
              size="small"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              {linkName}
            </Button>
          </div>
        </div>
      </MainContainer>
    </Paper>
  );
};

BackToHeader.propTypes = {
  title: types.title,
  imgPath: types.imgPath,
  path: types.path,
  linkName: string.isRequired,
};

export default BackToHeader;
