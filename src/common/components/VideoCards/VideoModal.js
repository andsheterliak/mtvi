import { Dialog, DialogTitle, IconButton, Typography } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { bool, exact } from 'prop-types';
import { innerDarkTheme } from '~common/theme';
import types from '~common/types';
import videoCardsTypes from './videoCardsTypes';

const useStyles = makeStyles((theme) => {
  return {
    videoBox: {
      position: 'relative',
      paddingBottom: '56.25%',
      height: 0,
      width: '100%',
    },

    iframe: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },

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
    <ThemeProvider theme={innerDarkTheme}>
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

        <div className={classes.videoBox}>
          <iframe
            className={classes.iframe}
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
            allowFullScreen
          ></iframe>
        </div>
      </Dialog>
    </ThemeProvider>
  );
};

VideoModal.propTypes = {
  isOpened: bool.isRequired,
  closeModalHandler: types.generic.handler.isRequired,

  data: exact({
    id: videoCardsTypes.id,
    name: videoCardsTypes.name,
  }).isRequired,
};

export default VideoModal;
