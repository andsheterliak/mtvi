import { Card, CardActionArea, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import types from '~common/types';
import videoCardsTypes from './videoCardsTypes';

const useStyles = makeStyles((theme) => {
  return {
    playBtn: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '10px',
      backgroundColor: 'hsla(0, 0%, 0%, 0.7)',
      color: theme.palette.common.white,
      borderRadius: '50%',
    },

    playBtnIcon: {
      fontSize: '46px',
    },

    img: {
      paddingTop: '56.25%', // This ratio crops black horizontal borders
    },
  };
});

const getYouTubeImgPath = (id) => {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
};

const VideoCard = ({ id, name, openModalHandler }) => {
  const classes = useStyles();
  const imgPath = getYouTubeImgPath(id);

  return (
    <Card raised>
      <CardActionArea
        onClick={(e) => {
          openModalHandler(e, { id, name });
        }}
      >
        <CardMedia className={classes.img} image={imgPath} title={name} />

        <div className={classes.playBtn}>
          <PlayArrowIcon className={classes.playBtnIcon} />
        </div>
      </CardActionArea>
    </Card>
  );
};

VideoCard.propTypes = {
  id: videoCardsTypes.id,
  name: videoCardsTypes.name,
  openModalHandler: types.generic.handler.isRequired,
};

export default VideoCard;
