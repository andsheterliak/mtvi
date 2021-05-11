import { makeStyles } from '@material-ui/core/styles';
import { node, number } from 'prop-types';
import { useEffect, useRef } from 'react';

const useStyles = makeStyles(() => ({
  slider: {
    overflow: 'auto',
    paddingBottom: '25px',
    userSelect: 'none',
    display: 'flex',

    // Set fake side paddings, (normal paddings don't work properly in container with "overflow: 'auto'").
    '&:after, &:before': {
      content: '""',
      display: 'block',
      height: '1px',
      minWidth: '10px', // "width" doesn't work in container with "overflow: 'auto'".
    },
  },

  container: {
    cursor: 'pointer',
  },
}));

const ifDisableInteraction = (howFarX, howFarY) => {
  return Math.abs(howFarX) > 0 || Math.abs(howFarY) > 0;
};

const Slider = ({ children, acceleration = 2 }) => {
  const classes = useStyles();

  const sliderRef = useRef(null);
  const sliderInnerRef = useRef(null);
  const isInteractionDisabledRef = useRef(false);
  const isSwipingRef = useRef(false);

  const startPositionsRef = useRef({
    scrollTop: 0,
    scrollLeft: 0,
    clientX: 0,
    clientY: 0,
  });

  const disableInteraction = (howFarX, howFarY) => {
    if (isInteractionDisabledRef.current) return;

    if (ifDisableInteraction(howFarX, howFarY)) {
      sliderInnerRef.current.style.pointerEvents = 'none';
      isInteractionDisabledRef.current = true;
    }
  };

  const enableInteraction = () => {
    if (isInteractionDisabledRef.current) {
      sliderInnerRef.current.style.pointerEvents = 'unset';
      isInteractionDisabledRef.current = false;
    }
  };

  const moveSliderHandler = (e) => {
    const slider = sliderRef.current;
    const startPositions = startPositionsRef.current;

    // How far the mouse has been moved
    const howFarY = e.clientY - startPositions.clientY;
    const howFarX = e.clientX - startPositions.clientX;

    const accelerationY = howFarY * acceleration;
    const accelerationX = howFarX * acceleration;

    slider.scrollTop = startPositions.scrollTop - accelerationY;
    slider.scrollLeft = startPositions.scrollLeft - accelerationX;

    disableInteraction(howFarX, howFarY);
    isSwipingRef.current = true;
  };

  const stopSliderHandler = () => {
    enableInteraction();
    isSwipingRef.current = false;

    document.removeEventListener('mousemove', moveSliderHandler);
    document.removeEventListener('mouseup', stopSliderHandler);
  };

  const initSliderHandler = (e) => {
    const slider = sliderRef.current;

    startPositionsRef.current = {
      // Get the current scroll positions from start (top, left) of the slider element.
      scrollTop: slider.scrollTop,
      scrollLeft: slider.scrollLeft,

      // Get the current mouse (x, y) positions (relative to window edges y - top, x - left).
      clientY: e.clientY,
      clientX: e.clientX,
    };

    document.addEventListener('mousemove', moveSliderHandler);
    document.addEventListener('mouseup', stopSliderHandler);
  };

  useEffect(() => {
    const slider = sliderRef.current;

    sliderInnerRef.current = slider.querySelector(
      ':scope >:first-child >:first-child'
    );
  }, []);

  return (
    // This is a native scrollable element, so it doesn't need additional attributes I think?!.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={sliderRef}
      onMouseDown={initSliderHandler}
      className={classes.slider}
    >
      <div className={classes.container}>{children}</div>
    </div>
  );
};

Slider.propTypes = {
  children: node.isRequired,
  acceleration: number,
};

export default Slider;
