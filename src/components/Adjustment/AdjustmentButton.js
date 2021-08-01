import { Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MovieFilter as FilterIcon } from '@material-ui/icons/';
import { useEffect, useState } from 'react';
import { HideOnScroll } from '~/components/HideOnScroll';

const useStyles = makeStyles((theme) => {
  return {
    btnWrapper: {
      position: 'fixed',
      bottom: '20px',
      zIndex: theme.zIndex.speedDial,
    },
  };
});

export const AdjustmentButton = ({
  ariaLabel,
  openModalHandler,
  isDisabled,
}) => {
  const classes = useStyles();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const debounceWindowResizeHandler = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', debounceWindowResizeHandler);

    return () => {
      window.removeEventListener('resize', debounceWindowResizeHandler);
    };
  }, []);

  return (
    <>
      <HideOnScroll direction={'up'}>
        <Fab
          disabled={isDisabled}
          className={classes.btnWrapper}
          onClick={openModalHandler}
          aria-label={ariaLabel}
          style={{
            left: `${windowWidth - 100}px`, // To avoid shifting when scrollbar is hidden.
          }}
          color="primary"
        >
          <FilterIcon fontSize="large" />
        </Fab>
      </HideOnScroll>
    </>
  );
};
