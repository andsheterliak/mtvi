import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

const Modal = ({ closeModalHandler, isOpened, title, content, actions }) => {
  return (
    <Dialog
      onClose={closeModalHandler}
      open={isOpened}
      aria-labelledby="alert-dialog-title"
      fullWidth
      maxWidth={'xs'}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent dividers={true}>{content}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};

export default Modal;
