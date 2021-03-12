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

import { formatReleaseDate } from '../../utils/date';
import useCardStyles from './CardStyles';

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
}));

const Card = ({ posterPath, title, releaseDate, voteAverage }) => {
  const classes = useStyles();
  const cardClasses = useCardStyles();

  return (
    <MUiCard raised className={cardClasses.card}>
      <CardActionArea className={cardClasses.action}>
        <CardMedia
          component="div"
          alt="Contemplative Reptile"
          image={posterPath}
          title="Contemplative Reptile"
          className={cardClasses.media}
        />

        <CardContent className={cardClasses.content}>
          <Typography gutterBottom variant="body2" component="h2">
            {title}
          </Typography>

          <Typography
            variant="caption"
            color="textSecondary"
            component="p"
            className={`${classes.subInfo} ${cardClasses.subText}`}
          >
            {formatReleaseDate(releaseDate)}

            <span className={classes.vote}>
              <StarBorderIcon className={classes.starIcon} fontSize="small" />
              {voteAverage}
            </span>
          </Typography>
        </CardContent>
      </CardActionArea>
    </MUiCard>
  );
};

export default Card;
