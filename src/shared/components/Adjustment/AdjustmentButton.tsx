import { Fab } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { MovieFilter as FilterIcon } from '@material-ui/icons/';
import { useEffect, useState } from 'react';
import { HideOnScroll } from '~/shared/components/HideOnScroll';
import { IsAdjustmentButtonDisabled } from './types';

const useStyles = makeStyles(({ zIndex }) => {
  return createStyles({
    btnWrapper: {
      position: 'fixed',
      bottom: '20px',
      zIndex: zIndex.speedDial,
    },
  });
});

export type Props = {
  ariaLabel: string;
  isDisabled: IsAdjustmentButtonDisabled;
  openModalHandler(): void;
};

export const AdjustmentButton = ({ ariaLabel, openModalHandler, isDisabled }: Props) => {
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
