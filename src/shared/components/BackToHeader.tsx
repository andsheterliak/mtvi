import { Button, Paper, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Skeleton } from '@material-ui/lab';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Name } from '~/api/tmdb';
import { LAZY_IMG_CLASS_NAME } from '../constants';
import { IsLoading, Path } from '../types';
import { CustomImagePath } from '../utils';
import { AspectRatio } from './AspectRatio';
import { MainContainer } from './MainContainer';

const useStyles = makeStyles(({ breakpoints, spacing, typography }) => {
  return createStyles({
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
  });
});

type Props = {
  isLoading: IsLoading;
  linkName: string;
  path: Path;
  title: Name | undefined;
  imgShape?: 'tall' | 'wide';
  imgPath: CustomImagePath;
};

export const BackToHeader = ({
  title,
  imgPath,
  imgShape = 'tall',
  path,
  linkName,
  isLoading,
}: Props) => {
  const classes = useStyles();

  const imgWrapperClassNames = classNames(classes.imgWrapper, classes[imgShape]);

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
              <img className={LAZY_IMG_CLASS_NAME} alt={title} src={imgPath} />
            )}
          </AspectRatio>

          <div className={classes.body}>
            <Typography component="h1" color="textPrimary" className={classes.title}>
              {isLoading ? <Skeleton width={300} /> : title}
            </Typography>

            {isLoading ? (
              <Typography variant="subtitle1">
                <Skeleton width={170} />
              </Typography>
            ) : (
              <Button
                className={classes.link}
                role="link"
                component={Link}
                to={path}
                variant="text"
                size="small"
                startIcon={<ArrowBackIcon color="primary" fontSize="small" />}
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
