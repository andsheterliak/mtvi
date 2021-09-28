import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { Name } from '~/api/tmdb';
import { AspectRatio } from '~/shared/components';
import { FALLBACK_VALUE, LAZY_IMG_CLASS_NAME } from '~/shared/constants';
import { useRovingTabindex } from '~/shared/hooks';
import { IsLoading, Path } from '~/shared/types';
import { CloseSearchHandler, CloseSearchEvent } from '../search-types';

const useStyles = makeStyles(({ spacing, aspectRatios }) => {
  const padding = spacing(1.5);

  return createStyles({
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
  });
});

type Props = Partial<{
  name: Name;
  path: Path;
  subInfo: string;
  imgPath: string;
  clickHandler: CloseSearchHandler;
  isLoading: IsLoading;
}>;

export const SearchItem = ({ name, path, subInfo, imgPath, clickHandler, isLoading }: Props) => {
  const classes = useStyles();
  const rovingTabindex = useRovingTabindex<HTMLAnchorElement>();

  const content = (
    <>
      <CardContent className={classes.mediaWrapper}>
        <AspectRatio aspectRatio="2:3">
          {isLoading ? (
            <Skeleton variant="rect" />
          ) : (
            <img className={LAZY_IMG_CLASS_NAME} alt={name} data-src={imgPath} />
          )}
        </AspectRatio>
      </CardContent>

      <CardContent className={classes.content}>
        <Typography color="textPrimary" variant="body2" component="h2">
          {isLoading ? <Skeleton width={245} /> : name || FALLBACK_VALUE}
        </Typography>

        <Typography variant="caption" color="textSecondary" component="p">
          {isLoading ? <Skeleton width={225} /> : subInfo || FALLBACK_VALUE}
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
          to={path!}
          role="link"
          className={classes.action}
          ref={rovingTabindex.ref}
          tabIndex={rovingTabindex.tabIndex}
          onKeyDown={rovingTabindex.onKeyDown}
          onClick={(event: CloseSearchEvent) => {
            rovingTabindex.onClick();
            clickHandler!(event);
          }}
        >
          {content}
        </CardActionArea>
      )}
    </Card>
  );
};
