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

const useStyles = makeStyles(({ spacing }) => {
  const padding = spacing(1.5);

  return {
    root: {
      borderRadius: 0,
    },

    action: {
      display: 'flex',
      justifyContent: 'start',
    },

    mediaWrapper: {
      padding: `${padding}px 0 ${padding}px ${padding}px`,
    },

    media: {
      width: '60px',
    },

    content: {
      flexGrow: 1,
      display: 'grid',
      gap: '8px',
      padding,
    },
  };
});

const SearchItem = ({ name, path, subInfo, imgPath, clickHandler }) => {
  const classes = useStyles();

  return (
    <Card elevation={0} className={classes.root}>
      <CardActionArea
        component={Link}
        to={path}
        className={classes.action}
        onClick={clickHandler}
      >
        <CardContent className={classes.mediaWrapper}>
          <CardMedia
            component="img"
            alt={name || ''}
            image={imgPath}
            className={classes.media}
          />
        </CardContent>

        <CardContent className={classes.content}>
          <Typography color="textPrimary" variant="body2" component="h2">
            {getHyphenOrData(name)}
          </Typography>

          <Typography variant="caption" color="textSecondary" component="p">
            {getHyphenOrData(subInfo)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SearchItem;
