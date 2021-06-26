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

import { Skeleton } from '@material-ui/lab';
import { getHyphenOrData } from '~common/utils/getData';
import { CardSubInfo } from '~components/Card';
import AspectRatio from '~components/AspectRatio';

const useStyles = makeStyles(({ aspectRatios, spacing }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },

  content: {
    padding: spacing(1.5),
    display: 'grid',
    gap: '8px',
  },

  media: {
    paddingTop: aspectRatios['16:9'],
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
  isLoading,
}) => {
  const classes = useStyles();
  const { anchorEl, isMenuOpened, onCloseMenu, onOpenMenu } = useMenu();

  return (
    <Card className={classes.root}>
      <AspectRatio aspectRatio="16:9">
        {isLoading ? (
          <Skeleton variant="rect" />
        ) : (
          <CardMedia alt={name} image={imgPath} />
        )}
      </AspectRatio>

      <CardContent className={classes.content}>
        <Typography
          color="textPrimary"
          gutterBottom
          variant="body1"
          component="h2"
        >
          {isLoading ? (
            <Skeleton width="70%" />
          ) : (
            `${episodeNumber} / ${getHyphenOrData(name)}`
          )}
        </Typography>

        <Typography variant="caption" color="textSecondary" component="p">
          {isLoading ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton width="80%" />
            </>
          ) : (
            overview
          )}
        </Typography>

        <CardSubInfo
          isLoading={isLoading}
          releaseDate={releaseDate}
          voteAverage={voteAverage}
        />
      </CardContent>

      <CardActions className={classes.actions}>
        {isLoading ? (
          <Skeleton width={155} height={30} />
        ) : (
          <>
            <Button
              aria-controls="more-resources-menu"
              aria-haspopup="true"
              endIcon={<KeyboardArrowDownIcon />}
              size="small"
              onClick={onOpenMenu}
              className={classes.action}
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
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default EpisodeCard;
