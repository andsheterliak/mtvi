import { string } from 'prop-types';
import { useEffect, useState } from 'react';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MovieFilter as FilterIcon } from '@material-ui/icons/';

import debounce from '~common/utils/debounce';
import types from '~common/types';
import HideOnScroll from '~components/HideOnScroll';

const useStyles = makeStyles((theme) => {
  return {
    btnWrapper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'fixed',
      bottom: '20px',
      borderRadius: '50%',
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
        <div
          className={classes.btnWrapper}
          style={{
            left: `${windowWidth - 100}px`, // To avoid shifting when scrollbar is hidden.
          }}
        >
          <IconButton onClick={openModalHandler} aria-label={ariaLabel}>
            <FilterIcon fontSize="large" />
          </IconButton>
        </div>
      </HideOnScroll>
    </>
  );
};

AdjustmentButton.propTypes = {
  ariaLabel: string.isRequired,
  openModalHandler: types.handler,
};

export default AdjustmentButton;
