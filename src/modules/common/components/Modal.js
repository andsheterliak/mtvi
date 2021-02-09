import { Dialog, DialogTitle } from '@material-ui/core';

const Modal = ({ closeModalHandler, isOpened, title, children }) => {
  const label = title.toLowerCase().split(' ').join('-'); // example: Some text --> some-text.

  return (
    <Dialog
      onClose={closeModalHandler}
      open={isOpened}
      aria-labelledby={label}
      fullWidth
      maxWidth={'xs'}
    >
      <DialogTitle id={label}>{title}</DialogTitle>
      {children}
    </Dialog>
  );
};

export default Modal;
