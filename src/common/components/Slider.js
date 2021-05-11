import { makeStyles } from '@material-ui/core/styles';
import { node, number } from 'prop-types';
import { useEffect, useRef } from 'react';

const useStyles = makeStyles(() => ({
  slider: {
    overflow: 'auto',
    paddingBottom: '25px',
    userSelect: 'none',
    display: 'flex',

    '& *': {
      cursor: 'pointer',
    },

    // Set fake side paddings, (normal paddings don't work properly in container with "overflow: 'auto'").
    '&:after, &:before': {
      content: '""',
      display: 'block',
      height: '1px',
      minWidth: '10px', // "width" doesn't work in container with "overflow: 'auto'".
    },
  },
}));

const Slider = ({ children, acceleration = 2 }) => {
  const classes = useStyles();

  const sliderRef = useRef(null);
  const sliderElementsRef = useRef(null);
  const isSwipingRef = useRef(false);

  const startPositionsRef = useRef({
    scrollTop: 0,
    scrollLeft: 0,
    clientX: 0,
    clientY: 0,
  });

  useEffect(() => {
    sliderElementsRef.current = sliderRef.current.querySelectorAll(
      ':scope >:first-child > *'
    );
  }, []);

  const disableInteracting = () => {
    if (isSwipingRef.current) return;

    sliderElementsRef.current.forEach((item) => {
      item.style.pointerEvents = 'none';
    });
  };

  const enableInteracting = () => {
    sliderElementsRef.current.forEach((item) => {
      item.style.pointerEvents = 'unset';
    });
  };

  const moveSliderHandler = (e) => {
    disableInteracting();
    isSwipingRef.current = true;

    const slider = sliderRef.current;
    const startPositions = startPositionsRef.current;

    // How far the mouse has been moved
    const howFarY = e.clientY - startPositions.clientY;
    const howFarX = e.clientX - startPositions.clientX;

    const accelerationY = howFarY * acceleration;
    const accelerationX = howFarX * acceleration;

    slider.scrollTop = startPositions.scrollTop - accelerationY;
    slider.scrollLeft = startPositions.scrollLeft - accelerationX;
  };

  const stopSliderHandler = () => {
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

  return (
    // This is a native scrollable element, so it doesn't need additional attributes I think?!.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={sliderRef}
      onMouseDown={initSliderHandler}
      className={classes.slider}
    >
      {children}
    </div>
  );
};

Slider.propTypes = {
  children: node.isRequired,
  acceleration: number,
};

export default Slider;
