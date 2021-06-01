import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import { getHyphenOrData } from '~common/utils/getData';
import noImg from '~assets/img/no-image.svg';
import { formatDataStr } from '~common/utils/date';

const useStyles = makeStyles((theme) => ({
  action: {
    height: '100%',
  },

  content: {
    display: 'grid',
    gap: '15px',

    [theme.breakpoints.up(460)]: {
      gridAutoFlow: 'column',
      gridAutoColumns: 'max-content 1fr',
    },
  },

  img: {
    justifySelf: 'center',
    maxWidth: '140px',
    borderRadius: '4px',

    [theme.breakpoints.up('sm')]: {
      maxWidth: '180px',
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
  posterPath,
  name,
  overview,
}) => {
  const classes = useStyles();

  const img = posterPath
    ? `${IMG_BASE_URL}${IMG_SIZES.profile}${posterPath}`
    : noImg;

  const episodes =
    episodeCount > 1
      ? `${episodeCount} episodes`
      : `${episodeCount || 0} episode`;

  const date = getHyphenOrData(formatDataStr(releaseDate).dateStr);

  return (
    <Card raised>
      <CardActionArea component={Link} to={path} className={classes.action}>
        <CardContent className={classes.content}>
          <CardMedia
            className={classes.img}
            component="img"
            alt={name ?? ''}
            image={img}
          />

          <div className={classes.textContent}>
            <Typography component="h3" color="textPrimary" variant="h5">
              {getHyphenOrData(name)}
            </Typography>

            <Typography component="p" variant="body1" color="textPrimary">
              {`${date} | ${episodes}`}
            </Typography>

            <Typography component="p" variant="body2" color="textSecondary">
              {overview}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SeasonCard;
