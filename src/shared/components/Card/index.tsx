import { Card as MUiCard, CardActionArea, CardContent, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Name } from '~/api/tmdb';
import { AspectRatio } from '~/shared/components/AspectRatio';
import { FALLBACK_VALUE, LAZY_IMG_CLASS_NAME } from '~/shared/constants';
import { useRovingTabindex } from '~/shared/hooks';
import { IsLoading, Path } from '~/shared/types';
import { CustomImagePath } from '~/shared/utils';

const useCardStyles = makeStyles(({ spacing }) => {
  return createStyles({
    action: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      alignItems: 'stretch',
    },

    content: {
      height: '100%',
      display: 'grid',
      gap: '10px',
      // Override default padding
      padding: `${spacing(1.5)}px !important`,
    },
  });
});

type Props = {
  isLoading?: IsLoading;
  imgPath?: CustomImagePath;
  title?: Name;
  path?: Path;
  subData: ReactNode;
};

export const Card = ({ imgPath, title, path, subData, isLoading }: Props) => {
  const classes = useCardStyles();
  const rovingTabindex = useRovingTabindex<HTMLAnchorElement>();

  const cardInner = (
    <>
      <AspectRatio>
        {isLoading ? (
          <Skeleton variant="rect" />
        ) : (
          <img className={LAZY_IMG_CLASS_NAME} alt={title} data-src={imgPath} />
        )}
      </AspectRatio>

      <CardContent className={classes.content}>
        <Typography color="textPrimary" variant="body2" component="h2">
          {isLoading ? <Skeleton /> : title || FALLBACK_VALUE}
        </Typography>

        {subData}
      </CardContent>
    </>
  );

  return (
    <MUiCard elevation={isLoading ? 0 : 1}>
      {isLoading ? (
        <div className={classes.action}>{cardInner}</div>
      ) : (
        <CardActionArea
          {...rovingTabindex}
          component={Link}
          role="link"
          to={path ?? ''}
          className={classes.action}
        >
          {cardInner}
        </CardActionArea>
      )}
    </MUiCard>
  );
};

export { CardSubInfo } from './CardSubInfo';
export { CardSubText } from './CardSubText';
