import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { Skeleton } from '@material-ui/lab';
import { getHyphenOrData } from '~common/utils/getData';
import { formatDataStr } from '~common/utils/date';
import AspectRatio from '~components/AspectRatio';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
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
}));

const SeasonCard = ({
  releaseDate,
  episodeCount,
  path,
  imgPath,
  name,
  overview,
  isLoading,
}) => {
  const classes = useStyles();

  const episodes =
    episodeCount > 1
      ? `${episodeCount} episodes`
      : `${episodeCount || 0} episode`;

  const date = getHyphenOrData(formatDataStr(releaseDate)?.dateStr);

  const content = (
    <CardContent className={classes.content}>
      <AspectRatio rootClasses={classes.imgWrapper}>
        {isLoading ? (
          <Skeleton variant="rect" />
        ) : (
          <img alt={name || ''} data-src={imgPath} />
        )}
      </AspectRatio>

      <div className={classes.textContent}>
        <Typography component="h3" color="textPrimary" variant="h5">
          {isLoading ? <Skeleton width={280} /> : getHyphenOrData(name)}
        </Typography>

        <Typography component="p" variant="body1" color="textPrimary">
          {isLoading ? <Skeleton width={189} /> : `${date} | ${episodes}`}
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
        <CardActionArea component={Link} to={path} className={classes.action}>
          {content}
        </CardActionArea>
      )}
    </Card>
  );
};

export default SeasonCard;
