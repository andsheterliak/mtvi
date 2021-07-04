import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

export { default as useModal } from './useModal';

const useStyles = makeStyles(({ palette }) => {
  return {
    title: {
      color: palette.text.primary,
    },
  };
});

const Modal = ({ closeModalHandler, isOpened, title, content, actions }) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down(460));

  const label = `adjustment-title`;

  return (
    <Dialog
      fullScreen={fullScreen}
      maxWidth={'xs'}
      onClose={closeModalHandler}
      open={isOpened}
      aria-labelledby={label}
    >
      <DialogTitle className={classes.title} id={label}>
        {title}
      </DialogTitle>

      <DialogContent dividers={true}>{content}</DialogContent>

      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};

export default Modal;
