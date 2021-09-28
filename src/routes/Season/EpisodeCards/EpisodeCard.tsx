import {
  Button,
  Card,
  CardActions,
  CardContent,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Skeleton } from '@material-ui/lab';
import { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { SeasonEpisode } from '~/api/tmdb';
import { AspectRatio, CardSubInfo } from '~/shared/components';
import { FALLBACK_VALUE, LAZY_IMG_CLASS_NAME } from '~/shared/constants';
import { useRovingTabindex } from '~/shared/hooks';
import { IsLoading, Path } from '~/shared/types';
import { CustomImagePath } from '~/shared/utils';

const useStyles = makeStyles(({ aspectRatios, spacing }) => {
  return createStyles({
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
  });
});

const useMenu = (isOpened = false) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>();
  const [isMenuOpened, setIsMenuOpened] = useState(isOpened);

  const onOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpened(true);
  };

  const onCloseMenu = () => {
    setAnchorEl(null);
    setIsMenuOpened(false);
  };

  return { anchorEl, isMenuOpened, onOpenMenu, onCloseMenu };
};

type Props = Partial<{
  isLoading: IsLoading;
  overview: SeasonEpisode['overview'];
  imgPath: CustomImagePath;
  name: SeasonEpisode['name'];
  releaseDate: SeasonEpisode['air_date'];
  episodeNumber: SeasonEpisode['episode_number'];
  voteAverage: SeasonEpisode['vote_average'];
  resourcePaths: { credits: Path; videos: Path };
}>;

export const EpisodeCard = ({
  imgPath,
  name,
  overview,
  releaseDate,
  voteAverage,
  episodeNumber,
  resourcePaths,
  isLoading,
}: Props) => {
  const classes = useStyles();
  const { anchorEl, isMenuOpened, onCloseMenu, onOpenMenu } = useMenu();
  const rovingTabindex = useRovingTabindex<HTMLButtonElement>();

  return (
    <Card className={classes.root}>
      <AspectRatio aspectRatio="16:9">
        {isLoading ? (
          <Skeleton variant="rect" />
        ) : (
          <img className={LAZY_IMG_CLASS_NAME} alt={name} data-src={imgPath} />
        )}
      </AspectRatio>

      <CardContent className={classes.content}>
        <Typography color="textPrimary" gutterBottom variant="body1" component="h2">
          {isLoading ? <Skeleton width="70%" /> : `${episodeNumber} / ${name || FALLBACK_VALUE}`}
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

        <CardSubInfo isLoading={isLoading} releaseDate={releaseDate} voteAverage={voteAverage} />
      </CardContent>

      <CardActions className={classes.actions}>
        {isLoading ? (
          <Skeleton width={155} height={30} />
        ) : (
          <>
            <Button
              aria-controls="more-resources-menu"
              aria-haspopup="true"
              endIcon={<KeyboardArrowDownIcon color="primary" />}
              size="small"
              ref={rovingTabindex.ref}
              tabIndex={rovingTabindex.tabIndex}
              onKeyDown={rovingTabindex.onKeyDown}
              onClick={(event) => {
                rovingTabindex.onClick();
                onOpenMenu(event);
              }}
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
              <MenuItem component={Link} to={resourcePaths!.credits}>
                Credits
              </MenuItem>

              <MenuItem component={Link} to={resourcePaths!.videos}>
                Videos
              </MenuItem>
            </Menu>
          </>
        )}
      </CardActions>
    </Card>
  );
};
