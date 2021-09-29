import { Card, CardActionArea } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { Skeleton } from '@material-ui/lab';
import { Video } from '~/api/tmdb';
import { AspectRatio } from '~/shared/components/AspectRatio';
import { LAZY_IMG_CLASS_NAME } from '~/shared/constants';
import { useRovingTabindex } from '~/shared/hooks';
import { IsLoading } from '~/shared/types';
import { VideoData } from './types';

const getYouTubeImgPath = (id: Video['key'] | undefined) => {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
};

const useStyles = makeStyles(({ palette }) => {
  return createStyles({
    cardActionArea: {
      '&:hover $playBtn, &:focus $playBtn': {
        backgroundColor: 'hsla(0, 100%, 40%, 0.7)',
      },
    },

    playBtn: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      transition: 'background-color 0.2s ease-in-out',
      padding: '10px',
      backgroundColor: 'hsla(0, 0%, 0%, 0.7)',
      color: palette.common.white,
      borderRadius: '50%',
    },

    playBtnIcon: {
      fontSize: '46px',
    },
  });
});

type Props = Partial<{
  isLoading: IsLoading;
  id: VideoData['id'];
  name: VideoData['name'];
  openModalHandler(currentVideoData: VideoData): void;
}>;

export const VideoCard = ({ id, name, openModalHandler, isLoading }: Props) => {
  const classes = useStyles();
  const imgPath = getYouTubeImgPath(id);
  const rovingTabindex = useRovingTabindex<HTMLButtonElement>();

  return (
    <Card elevation={isLoading ? 0 : 1}>
      {isLoading ? (
        <AspectRatio aspectRatio="16:9">
          <Skeleton variant="rect" />
        </AspectRatio>
      ) : (
        <CardActionArea
          className={classes.cardActionArea}
          ref={rovingTabindex.ref}
          tabIndex={rovingTabindex.tabIndex}
          onKeyDown={rovingTabindex.onKeyDown}
          onClick={() => {
            rovingTabindex.onClick();
            openModalHandler!({ id: id!, name: name! });
          }}
        >
          <AspectRatio aspectRatio="16:9">
            <img className={LAZY_IMG_CLASS_NAME} data-src={imgPath} alt={name} title={name} />
          </AspectRatio>

          <div className={classes.playBtn}>
            <PlayArrowIcon className={classes.playBtnIcon} />
          </div>
        </CardActionArea>
      )}
    </Card>
  );
};
