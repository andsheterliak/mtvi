import { Link } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { getHyphenOrData } from '~common/utils/getData';

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
    gap: '10px',
    padding: theme.spacing(1.5),
  },

  subText: {
    alignSelf: 'end',
  },
}));

const PersonCard = ({ imgPath, name, bodyContent, path }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea component={Link} to={path} className={classes.action}>
        <CardMedia component="img" alt={name} image={imgPath} />

        <CardContent className={classes.content}>
          <Typography color="textPrimary" variant="body1" component="h2">
            {getHyphenOrData(name)}
          </Typography>

          {bodyContent && (
            <Typography
              variant="caption"
              color="textSecondary"
              component="p"
              className={classes.subText}
            >
              {bodyContent}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PersonCard;
