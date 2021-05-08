import { makeStyles } from '@material-ui/core/styles';
import { node, number } from 'prop-types';
import { useEffect, useRef } from 'react';

const useStyles = makeStyles(() => ({
  slider: {
    overflow: 'auto',
    paddingBottom: '25px',
    cursor: 'pointer',
    userSelect: 'none',
    display: 'flex',

    '& * a': {
      cursor: 'inherit',
    },

    '& > *': {
      cursor: 'inherit',
    },

    // Set fake side paddings, (normal paddings don't work properly in container with "overflow: 'auto'").
    '&:after, &:before': {
      content: '""',
      display: 'block',
      height: '1px',
      minWidth: '10px', // "width" doesn't work in container with "overflow: 'auto'".
    },
  },

  isActive: {
    cursor: 'grabbing',
  },
}));

const Slider = ({ children, acceleration = 2 }) => {
  const classes = useStyles();

  const sliderRef = useRef(null);
  const isSwipingRef = useRef(false);

  const startPositionsRef = useRef({
    scrollTop: 0,
    scrollLeft: 0,
    clientX: 0,
    clientY: 0,
  });

  useEffect(() => {
    const links = sliderRef.current.querySelectorAll('a');
    const imgs = sliderRef.current.querySelectorAll('img');

    const preventOpeningHandler = (e) => {
      if (isSwipingRef.current) e.preventDefault();
    };

    const preventDraggingHandler = (e) => {
      e.preventDefault();
    };

    links.forEach((link) => {
      link.addEventListener('click', preventOpeningHandler);
      link.addEventListener('dragstart', preventDraggingHandler);
    });

    imgs.forEach((link) => {
      link.addEventListener('dragstart', preventDraggingHandler);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', preventOpeningHandler);
        link.removeEventListener('dragstart', preventDraggingHandler);
      });

      imgs.forEach((link) => {
        link.removeEventListener('dragstart', preventDraggingHandler);
      });
    };
  }, []);

  const moveSliderHandler = (e) => {
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

  const destroySliderHandler = () => {
    // 'mouseup' fires before 'click', so to prevent links from opening, assigning 'isSwiping = false' must be deferred.
    setTimeout(() => {
      isSwipingRef.current = false;
    }, 0);

    const slider = sliderRef.current;

    slider.classList.remove(classes.isActive);

    document.removeEventListener('mousemove', moveSliderHandler);
    document.removeEventListener('mouseup', destroySliderHandler);
  };

  const initSliderHandler = (e) => {
    const slider = sliderRef.current;

    slider.classList.add(classes.isActive);

    startPositionsRef.current = {
      // Get the current scroll positions from start (top, left) of the slider element.
      scrollTop: slider.scrollTop,
      scrollLeft: slider.scrollLeft,

      // Get the current mouse (x, y) positions (relative to window edges y - top, x - left).
      clientY: e.clientY,
      clientX: e.clientX,
    };

    document.addEventListener('mousemove', moveSliderHandler);
    document.addEventListener('mouseup', destroySliderHandler);
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
