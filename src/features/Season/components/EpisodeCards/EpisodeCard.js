import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { getHyphenOrData } from '~common/utils/getData';
import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import { formatDataStr } from '~common/utils/date';
import noImg from '~assets/img/no-image-wide.svg';
import Vote from '~components/Vote';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },

  content: {
    padding: theme.spacing(1.5),
    display: 'grid',
    gap: '8px',
  },

  subInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  actions: {
    marginTop: 'auto',
  },
}));

const useMenu = ({ isOpened = false } = {}) => {
  const [anchorEl, setAnchorEl] = useState();
  const [isMenuOpened, setIsMenuOpened] = useState(isOpened);

  const onOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpened(true);
  };

  const onCloseMenu = () => {
    setAnchorEl(null);
    setIsMenuOpened(false);
  };

  return { anchorEl, isMenuOpened, onOpenMenu, onCloseMenu };
};

const EpisodeCard = ({
  imgPath,
  name,
  overview,
  releaseDate,
  voteAverage,
  episodeNumber,
  resourcePaths,
}) => {
  const classes = useStyles();
  const { anchorEl, isMenuOpened, onCloseMenu, onOpenMenu } = useMenu();

  const stillPath = imgPath
    ? `${IMG_BASE_URL}${IMG_SIZES.still}${imgPath}`
    : noImg;

  return (
    <Card className={classes.root}>
      <CardMedia component="img" alt={name} image={stillPath} />

      <CardContent className={classes.content}>
        <Typography
          color="textPrimary"
          gutterBottom
          variant="body1"
          component="h2"
        >
          {episodeNumber}. {getHyphenOrData(name)}
        </Typography>

        <Typography variant="caption" color="textSecondary" component="p">
          {overview}
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

      <CardActions className={classes.actions}>
        <Button
          aria-controls="more-resources-menu"
          aria-haspopup="true"
          endIcon={<KeyboardArrowDownIcon />}
          size="small"
          onClick={onOpenMenu}
        >
          More Resources
        </Button>

        <Menu
          id="more-resources-menu"
          anchorEl={anchorEl}
          keepMounted
          open={isMenuOpened}
          onClose={onCloseMenu}
        >
          <MenuItem component={Link} to={resourcePaths.credits}>
            Credits
          </MenuItem>

          <MenuItem component={Link} to={resourcePaths.videos}>
            Videos
          </MenuItem>
        </Menu>
      </CardActions>
    </Card>
  );
};

export default EpisodeCard;
