import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme, createStyles } from '@material-ui/core/styles';
import { ReactNode } from 'react';
import { ModalTitle } from '../types';
import { IsOpened } from './types';

export { useModal } from './useModal';

const useStyles = makeStyles(({ palette }) => {
  return createStyles({
    title: {
      color: palette.text.primary,
    },
  });
});

type Props = {
  isOpened: IsOpened;
  title: ModalTitle;
  content: ReactNode;
  actions: ReactNode;
  closeModalHandler(): void;
};

export const Modal = ({ closeModalHandler, isOpened, title, content, actions }: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down(460));

  const label = 'adjustment-title';

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
