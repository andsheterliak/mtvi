import { bool, node } from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import types from '@common/types';

import adjustmentTypes from '../adjustmentTypes';

const useStyles = makeStyles((theme) => {
  return {
    title: {
      color: theme.palette.text.primary,
    },
  };
});

const Modal = ({ closeModalHandler, isOpened, title, content, actions }) => {
  const classes = useStyles();

  const label = `${title.toLowerCase().split(' ').join('-')}menu`; // example: Some text --> some-text-menu.

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

Modal.propTypes = {
  title: adjustmentTypes.modalTitle,
  closeModalHandler: types.handler,
  isOpened: bool.isRequired,
  content: node.isRequired,
  actions: node.isRequired,
};

export default Modal;
