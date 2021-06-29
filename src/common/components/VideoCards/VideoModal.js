import { Dialog, DialogTitle, IconButton, Typography } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { darkTheme } from '~common/theme';
import AspectRatio from '~components/AspectRatio';

const useStyles = makeStyles((theme) => {
  return {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.palette.common.black,
    },

    title: {
      ...theme.typography.body2,

      [theme.breakpoints.up('sm')]: {
        ...theme.typography.h6,
      },

      [theme.breakpoints.up('md')]: {
        ...theme.typography.h5,
      },
    },
  };
});

const VideoModal = ({ isOpened, closeModalHandler, data }) => {
  const classes = useStyles();
  const label = 'video-title';
  const { id, name } = data;

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
          <Typography
            color="textPrimary"
            className={classes.title}
            variant="h6"
            component="h3"
          >
            {name}
          </Typography>

          <IconButton aria-label="close-modal" onClick={closeModalHandler}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <AspectRatio aspectRatio="16:9">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
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

export default VideoModal;
