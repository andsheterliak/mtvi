import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

const Modal = ({ closeModalHandler, isOpened, title, content, actions }) => {
  const label = `${title.toLowerCase().split(' ').join('-')}menu`; // example: Some text --> some-text-menu.

  return (
    <Dialog
      onClose={closeModalHandler}
      open={isOpened}
      aria-labelledby={label}
      fullWidth
      maxWidth={'xs'}
    >
      <DialogTitle id={label}>{title}</DialogTitle>
      <DialogContent dividers={true}>{content}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};

export default Modal;
