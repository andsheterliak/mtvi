import { Link } from 'react-router-dom';
import {
  Card as MUiCard,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { formatDataStr } from '~common/utils/date';
import { getHyphenOrData } from '~common/utils/getData';
import Vote from '~components/Vote';

const useStyles = makeStyles((theme) => ({
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
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'end',
    marginTop: '5px',
  },

  media: {
    // Standard 500 width images which are used here have 2:3 aspect ratio but some images have a bit different ratio, so to display those properly there is need to standardize all the images to 2:3 aspect ratio using the trick.
    height: 0,
    paddingTop: '150%',
  },
}));

const Card = ({ imgPath, title, releaseDate, voteAverage, path }) => {
  const classes = useStyles();

  return (
    <MUiCard>
      <CardActionArea component={Link} to={path} className={classes.action}>
        <CardMedia
          component="div"
          alt={title}
          image={imgPath}
          className={classes.media}
        />

        <CardContent className={classes.content}>
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
            className={classes.subInfo}
          >
            {getHyphenOrData(formatDataStr(releaseDate)?.dateStr)}

            <Vote vote={voteAverage} />
          </Typography>
        </CardContent>
      </CardActionArea>
    </MUiCard>
  );
};

export default Card;
