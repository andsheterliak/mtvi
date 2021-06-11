import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { getHyphenOrData } from '~common/utils/getData';
import { formatDataStr } from '~common/utils/date';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },

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
  imgPath,
  name,
  overview,
}) => {
  const classes = useStyles();

  const episodes =
    episodeCount > 1
      ? `${episodeCount} episodes`
      : `${episodeCount || 0} episode`;

  const date = getHyphenOrData(formatDataStr(releaseDate)?.dateStr);

  return (
    <Card elevation={0} className={classes.root}>
      <CardActionArea component={Link} to={path} className={classes.action}>
        <CardContent className={classes.content}>
          <CardMedia
            className={classes.img}
            component="img"
            alt={name ?? ''}
            image={imgPath}
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
