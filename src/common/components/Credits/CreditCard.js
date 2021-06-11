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

const useStyles = makeStyles(() => ({
  action: {
    display: 'flex',
    justifyContent: 'start',
    padding: '5px 0 5px 5px',
    height: '100%',
  },

  img: {
    objectFit: 'cover',
    objectPosition: 'center',
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    flexShrink: 0,
  },

  content: {
    display: 'grid',
    gap: '5px',
    alignContent: 'center',
  },
}));

const CreditCard = ({ imgPath, name, info, path }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea component={Link} to={path} className={classes.action}>
        <CardMedia
          className={classes.img}
          component="img"
          alt={name ?? ''}
          image={imgPath}
        />

        <CardContent className={classes.content}>
          <Typography component="p" color="textPrimary" variant="body1">
            {getHyphenOrData(name)}
          </Typography>

          <Typography component="p" variant="body2" color="textSecondary">
            {getHyphenOrData(info)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CreditCard;
