import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { IMG_BASE_URL, IMG_SIZES, SeasonItem } from '~/api/tmdb';
import noImg from '~/assets/img/no-image.svg';
import { AspectRatio } from '~/shared/components/AspectRatio';
import { FALLBACK_VALUE, LAZY_IMG_CLASS_NAME } from '~/shared/constants';
import { useRovingTabindex } from '~/shared/hooks';
import { IsLoading, Path } from '~/shared/types';
import { formatDateStr, getImagePath } from '~/shared/utils';

const useStyles = makeStyles(({ palette, breakpoints }) => {
  return createStyles({
    root: {
      backgroundColor: palette.background.default,
    },

    action: {
      height: '100%',
    },

    content: {
      display: 'grid',
      gap: '15px',
      // justifyContent: 'start',

      [breakpoints.up(520)]: {
        gridAutoFlow: 'column',
        gridAutoColumns: 'max-content 1fr', // 'max-content' depends on imgWrapper 'width'.
      },

      // Override default padding
      padding: '16px !important',
    },

    imgWrapper: {
      justifySelf: 'center',
      width: '140px',
      borderRadius: '4px',

      [breakpoints.up('md')]: {
        width: '180px',
      },
    },

    textContent: {
      display: 'grid',
      gap: '5px',
      alignContent: 'start',
    },
  });
});

type Props = Partial<{
  isLoading: IsLoading;
  posterPath: SeasonItem['poster_path'];
  name: SeasonItem['name'];
  overview: SeasonItem['overview'];
  path: Path;
  releaseDate: SeasonItem['air_date'];
  episodeCount: SeasonItem['episode_count'];
  isRovingIndex: boolean;
}>;

export const SeasonCard = ({
  releaseDate,
  episodeCount,
  path,
  posterPath,
  name,
  overview,
  isLoading,
  isRovingIndex = true,
}: Props) => {
  const classes = useStyles();
  const date = formatDateStr(releaseDate)?.dateStr || FALLBACK_VALUE;
  const rovingTabindex = useRovingTabindex<HTMLAnchorElement>();

  const rovingIndex = isRovingIndex ? rovingTabindex : null;

  const imgPath = getImagePath({
    basePath: IMG_BASE_URL,
    size: IMG_SIZES.poster.w342,
    path: posterPath,
    fallback: noImg,
  });

  const content = (
    <CardContent className={classes.content}>
      <AspectRatio rootClasses={classes.imgWrapper}>
        {isLoading ? (
          <Skeleton variant="rect" />
        ) : (
          <img className={LAZY_IMG_CLASS_NAME} alt={name || ''} data-src={imgPath} />
        )}
      </AspectRatio>

      <div className={classes.textContent}>
        <Typography component="h3" color="textPrimary" variant="h5">
          {isLoading ? <Skeleton width={280} /> : name || FALLBACK_VALUE}
        </Typography>

        <Typography component="p" variant="body1" color="textPrimary">
          {isLoading ? <Skeleton width={189} /> : `${date} | ${episodeCount}`}
        </Typography>

        <Typography component="p" variant="body2" color="textSecondary">
          {isLoading ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton width="70%" />
            </>
          ) : (
            overview
          )}
        </Typography>
      </div>
    </CardContent>
  );

  return (
    <Card elevation={0} className={classes.root}>
      {isLoading ? (
        <div className={classes.action}>{content}</div>
      ) : (
        <CardActionArea
          {...rovingIndex}
          component={Link}
          role="link"
          to={path!}
          className={classes.action}
        >
          {content}
        </CardActionArea>
      )}
    </Card>
  );
};
