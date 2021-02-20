import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MovieFilter as FilterIcon } from '@material-ui/icons/';

import HideOnScroll from './HideOnScroll';

const useStyles = makeStyles((theme) => {
  return {
    iconButton: {
      backgroundColor: theme.palette.background.paper,
      position: 'fixed',
      bottom: '20px',
      right: '20px',
    },
  };
});

const AdjustmentButton = ({ ariaLabel, openModalHandler, modal }) => {
  const classes = useStyles();

  return (
    <>
      <HideOnScroll>
        <IconButton
          onClick={openModalHandler}
          className={classes.iconButton}
          aria-label={ariaLabel}
        >
          <FilterIcon fontSize="large" />
        </IconButton>
      </HideOnScroll>

      {modal}
    </>
  );
};

export default AdjustmentButton;
