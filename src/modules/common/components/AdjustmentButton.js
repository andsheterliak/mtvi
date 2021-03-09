import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MovieFilter as FilterIcon } from '@material-ui/icons/';
import { useEffect, useState } from 'react';

import HideOnScroll from './HideOnScroll';
import debounce from '../utils/debounce';

const useStyles = makeStyles((theme) => {
  return {
    iconButton: {
      backgroundColor: theme.palette.background.paper,
      position: 'fixed',
      bottom: '20px',
      zIndex: theme.zIndex.speedDial,
    },
  };
});

const AdjustmentButton = ({ ariaLabel, openModalHandler }) => {
  const classes = useStyles();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const debounceWindowResizeHandler = debounce(() => {
      setWindowWidth(window.innerWidth);
    }, 50);

    window.addEventListener('resize', debounceWindowResizeHandler);

    return () => {
      window.removeEventListener('resize', debounceWindowResizeHandler);
    };
  }, []);

  return (
    <>
      <HideOnScroll direction={'up'}>
        <IconButton
          onClick={openModalHandler}
          className={classes.iconButton}
          aria-label={ariaLabel}
          style={{
            left: `${windowWidth - 100}px`, // To avoid shifting when scrollbar is hidden.
          }}
        >
          <FilterIcon fontSize="large" />
        </IconButton>
      </HideOnScroll>
    </>
  );
};

export default AdjustmentButton;
