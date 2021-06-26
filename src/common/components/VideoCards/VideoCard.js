import { Card, CardActionArea, CardMedia } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import AspectRatio from '~components/AspectRatio';

const getYouTubeImgPath = (id) => {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
};

const useStyles = makeStyles(({ palette }) => {
  return {
    playBtn: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '10px',
      backgroundColor: 'hsla(0, 0%, 0%, 0.7)',
      color: palette.common.white,
      borderRadius: '50%',
    },

    playBtnIcon: {
      fontSize: '46px',
    },
  };
});

const VideoCard = ({ id, name, openModalHandler, isLoading }) => {
  const classes = useStyles();
  const imgPath = getYouTubeImgPath(id);

  return (
    <Card elevation={isLoading ? 0 : 1}>
      {isLoading ? (
        <AspectRatio aspectRatio="16:9">
          <Skeleton variant="rect" />
        </AspectRatio>
      ) : (
        <CardActionArea
          onClick={(e) => {
            openModalHandler(e, { id, name });
          }}
        >
          <AspectRatio aspectRatio="16:9">
            <CardMedia
              component="img"
              image={imgPath}
              alt={name}
              title={name}
            />
          </AspectRatio>

          <div className={classes.playBtn}>
            <PlayArrowIcon className={classes.playBtnIcon} />
          </div>
        </CardActionArea>
      )}
    </Card>
  );
};

export default VideoCard;
