import { Link } from 'react-router-dom';
import { Button, CardMedia, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import classNames from 'classnames';
import { Skeleton } from '@material-ui/lab';
import MainContainer from '~components/MainContainer';
import AspectRatio from './AspectRatio';

const useStyles = makeStyles(({ breakpoints, spacing, typography }) => ({
  root: {
    display: 'flex',
    padding: `${spacing(2)}px 0`,
  },

  imgWrapper: {
    marginRight: `${spacing(3)}px`,
    display: 'none',

    [breakpoints.up('sm')]: {
      display: 'inline-block',
    },
  },

  tall: {
    width: '100px',
  },

  wide: {
    width: '200px',
  },

  body: {
    display: 'grid',
    gap: `${spacing(1)}px`,
    alignItems: 'center',
    alignContent: 'center',
  },

  link: {
    justifySelf: 'start',
  },

  title: {
    ...typography.h6,

    [breakpoints.up('md')]: {
      ...typography.h5,
    },

    [breakpoints.up('lg')]: {
      ...typography.h4,
    },
  },
}));

const BackToHeader = ({
  title,
  imgPath,
  imgShape = 'tall',
  path,
  linkName,
  isLoading,
}) => {
  const classes = useStyles();
  const imgWrapperClassNames = classNames(
    classes.imgWrapper,
    classes[imgShape]
  );

  return (
    <Paper square>
      <MainContainer>
        <div className={classes.root}>
          <AspectRatio
            aspectRatio={imgShape === 'tall' ? '2:3' : '16:9'}
            rootClasses={imgWrapperClassNames}
          >
            {isLoading ? (
              <Skeleton variant="rect" />
            ) : (
              <CardMedia image={imgPath} />
            )}
          </AspectRatio>

          <div className={classes.body}>
            <Typography
              component="h1"
              color="textPrimary"
              className={classes.title}
            >
              {isLoading ? <Skeleton width={300} /> : title}
            </Typography>

            {isLoading ? (
              <Typography variant="subtitle1">
                <Skeleton width={170} />
              </Typography>
            ) : (
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
            )}
          </div>
        </div>
      </MainContainer>
    </Paper>
  );
};

export default BackToHeader;
