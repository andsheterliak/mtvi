import { Dialog, DialogTitle } from '@material-ui/core';

const Modal = ({ closeModalHandler, isOpened, title, content }) => {
  return (
    <Dialog
      onClose={closeModalHandler}
      open={isOpened}
      aria-labelledby="alert-dialog-title"
      fullWidth
      maxWidth={'xs'}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      {content}
    </Dialog>
  );
};

export default Modal;
