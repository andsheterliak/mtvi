import { number, string } from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Card as MUiCard,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import { formatDataStr } from '~common/utils/date';
import noImageImg from '~assets/img/no-image.svg';
import { getHyphenOrData } from '~common/utils/getData';

import useCardStyles from '../../styles/CardStyles';

const useStyles = makeStyles(() => ({
  subInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  vote: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '&>*:first-child': {
      marginRight: '3px',
      marginBottom: '3px',
    },
  },

  starIcon: {
    color: orange[300],
  },

  media: {
    // Standard 500 width images which are used here have 2:3 aspect ratio but some images have a bit different ratio, so to display those properly there is need to standardize all the images to 2:3 aspect ratio using the trick.
    height: 0,
    paddingTop: '150%',
  },
}));

const Card = ({ posterPath, title, releaseDate, voteAverage, path }) => {
  const classes = useStyles();
  const cardClasses = useCardStyles();

  const posterImg = posterPath
    ? `${IMG_BASE_URL}${IMG_SIZES.poster}${posterPath}`
    : noImageImg;

  return (
    <MUiCard raised>
      <CardActionArea component={Link} to={path} className={cardClasses.action}>
        <CardMedia
          component="div"
          alt={title}
          image={posterImg}
          className={classes.media}
        />

        <CardContent className={cardClasses.content}>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="body2"
            component="h2"
          >
            {getHyphenOrData(title)}
          </Typography>

          <Typography
            variant="caption"
            color="textSecondary"
            component="p"
            className={`${classes.subInfo} ${cardClasses.subText}`}
          >
            {getHyphenOrData(formatDataStr(releaseDate)?.dateStr)}

            <span className={classes.vote}>
              <StarBorderIcon className={classes.starIcon} fontSize="small" />
              {getHyphenOrData(voteAverage)}
            </span>
          </Typography>
        </CardContent>
      </CardActionArea>
    </MUiCard>
  );
};

Card.propTypes = {
  posterPath: string,
  title: string,
  releaseDate: string,
  voteAverage: number,
  path: string.isRequired,
};

export default Card;
