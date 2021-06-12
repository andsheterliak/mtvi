import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export { default as useModal } from './useModal';

const useStyles = makeStyles((theme) => {
  return {
    title: {
      color: theme.palette.text.primary,
    },
  };
});

const Modal = ({ closeModalHandler, isOpened, title, content, actions }) => {
  const classes = useStyles();

  const label = `adjustment-title`;

  return (
    <Dialog
      onClose={closeModalHandler}
      open={isOpened}
      aria-labelledby={label}
      fullWidth
      maxWidth={'xs'}
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
