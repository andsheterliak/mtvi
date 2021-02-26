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

import parseDate from '../../utils/parse-date';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
  },

  action: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'stretch',
  },

  content: {
    height: '100%',
    display: 'grid',
    padding: theme.spacing(1.5),
  },

  subInfo: {
    display: 'flex',
    alignSelf: 'end',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5px',
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

  return (
    <MUiCard raised className={classes.card}>
      <CardActionArea className={classes.action}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          image={posterPath}
          title="Contemplative Reptile"
          className={classes.img}
        />

        <CardContent className={classes.content}>
          <Typography gutterBottom variant="body2" component="h2">
            {title}
          </Typography>

          <Typography
            variant="caption"
            color="textSecondary"
            component="p"
            className={classes.subInfo}
          >
            {parseDate(releaseDate)}

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
