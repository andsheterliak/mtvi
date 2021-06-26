import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
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
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    flexShrink: 0,
  },

  content: {
    width: '100%',
    display: 'grid',
    gap: '5px',
    alignContent: 'center',
  },
}));

const CreditCard = ({ imgPath, name, info, path, isLoading }) => {
  const classes = useStyles();

  const content = (
    <>
      {isLoading ? (
        <Skeleton variant="rect" className={classes.img} />
      ) : (
        <CardMedia
          className={classes.img}
          component="img"
          alt={name ?? ''}
          image={imgPath}
        />
      )}

      <CardContent className={classes.content}>
        <Typography component="p" color="textPrimary" variant="body1">
          {isLoading ? <Skeleton width="80%" /> : getHyphenOrData(name)}
        </Typography>

        <Typography component="p" variant="body2" color="textSecondary">
          {isLoading ? <Skeleton /> : getHyphenOrData(info)}
        </Typography>
      </CardContent>
    </>
  );

  return (
    <Card>
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

export default CreditCard;
