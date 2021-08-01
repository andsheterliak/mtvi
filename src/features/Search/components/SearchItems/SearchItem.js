import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { AspectRatio } from '~/components';
import { getHyphenOrData } from '~/utils';

const useStyles = makeStyles(({ spacing, aspectRatios }) => {
  const padding = spacing(1.5);

  return {
    root: {
      borderRadius: 0,
    },

    action: {
      display: 'flex',
      alignItems: 'center',
    },

    mediaWrapper: {
      flexShrink: 0,
      width: '75px',
      padding: `${padding}px 0 ${padding}px ${padding}px`,
    },

    media: {
      height: 0,
      paddingTop: aspectRatios['2:3'],
    },

    content: {
      flexGrow: 1,
      display: 'grid',
      gap: '8px',

      // Override default padding
      padding: `${padding}px !important`,
    },
  };
});

export const SearchItem = ({
  name,
  path,
  subInfo,
  imgPath,
  clickHandler,
  isLoading,
}) => {
  const classes = useStyles();

  const content = (
    <>
      <CardContent className={classes.mediaWrapper}>
        <AspectRatio aspectRatio="2:3">
          {isLoading ? (
            <Skeleton variant="rect" />
          ) : (
            <img alt={name} data-src={imgPath} />
          )}
        </AspectRatio>
      </CardContent>

      <CardContent className={classes.content}>
        <Typography color="textPrimary" variant="body2" component="h2">
          {isLoading ? <Skeleton width={245} /> : getHyphenOrData(name)}
        </Typography>

        <Typography variant="caption" color="textSecondary" component="p">
          {isLoading ? <Skeleton width={225} /> : getHyphenOrData(subInfo)}
        </Typography>
      </CardContent>
    </>
  );

  return (
    <Card elevation={0} className={classes.root}>
      {isLoading ? (
        <div className={classes.action}>{content}</div>
      ) : (
        <CardActionArea
          component={Link}
          to={path}
          className={classes.action}
          onClick={clickHandler}
        >
          {content}
        </CardActionArea>
      )}
    </Card>
  );
};
