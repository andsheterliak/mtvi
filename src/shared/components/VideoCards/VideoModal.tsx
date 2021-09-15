import { Dialog, DialogProps, DialogTitle, IconButton, Typography } from '@material-ui/core';
import { createStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { AspectRatio } from '~/shared/components/AspectRatio';
import { darkTheme } from '~/shared/theme';
import { VideoData } from './types';

const useStyles = makeStyles(({ palette, typography, breakpoints }) => {
  return createStyles({
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: palette.common.black,
    },

    title: {
      ...typography.body2,

      [breakpoints.up('sm')]: {
        ...typography.h6,
      },

      [breakpoints.up('md')]: {
        ...typography.h5,
      },
    },
  });
});

type Props = {
  isOpened: DialogProps['open'];
  closeModalHandler(): void;
  videoData: VideoData;
};

export const VideoModal = ({ isOpened, closeModalHandler, videoData }: Props) => {
  const classes = useStyles();
  const label = 'video-title';

  return (
    <ThemeProvider theme={darkTheme}>
      <Dialog
        onClose={closeModalHandler}
        open={isOpened}
        aria-labelledby={label}
        fullWidth
        maxWidth={'lg'}
      >
        <DialogTitle disableTypography className={classes.header} id={label}>
          <Typography color="textPrimary" className={classes.title} variant="h6" component="h3">
            {videoData.name}
          </Typography>

          <IconButton aria-label="close-modal" onClick={closeModalHandler}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <AspectRatio aspectRatio="16:9">
          <iframe
            src={`https://www.youtube.com/embed/${videoData.id}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
            allowFullScreen
          ></iframe>
        </AspectRatio>
      </Dialog>
    </ThemeProvider>
  );
};
