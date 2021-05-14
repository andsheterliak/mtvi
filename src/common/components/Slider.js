import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useRef } from 'react';

const useStyles = makeStyles(() => ({
  slider: {
    overflow: 'auto',
    userSelect: 'none',
    // To expand 'container' to set 'cursor: pointer' correctly
    display: 'flex',
  },

  container: {
    cursor: 'pointer',
    padding: ' 0 10px 25px',
  },
}));

const ifDisableInteraction = (howFarX, howFarY) => {
  return Math.abs(howFarX) > 0 || Math.abs(howFarY) > 0;
};

const ifContinueMomentum = (velocityX, velocityY) => {
  return velocityX > 1 || velocityY > 1;
};

const ifStartMomentum = (timePassedFromLastSwipe, timePassedThreshold) => {
  return timePassedFromLastSwipe <= timePassedThreshold;
};

const Slider = ({ children, acceleration = 1.5, isMomentum = true }) => {
  const classes = useStyles();

  const sliderRef = useRef(null);
  const sliderInnerRef = useRef(null);
  const stateRef = useRef({
    momentumID: null,
    lastSwipeTime: 0,
    isInteractionDisabled: false,
    startPositions: { scrollTop: 0, scrollLeft: 0, clientX: 0, clientY: 0 },
    velocities: { x: 0, y: 0 },
    directions: { isXForward: null, isYForward: null },
  });

  const disableInteraction = (howFarX, howFarY) => {
    const state = stateRef.current;

    if (state.isInteractionDisabled) return;

    if (ifDisableInteraction(howFarX, howFarY)) {
      sliderInnerRef.current.style.pointerEvents = 'none';
      state.isInteractionDisabled = true;
    }
  };

  const enableInteraction = () => {
    const state = stateRef.current;

    if (state.isInteractionDisabled) {
      sliderInnerRef.current.style.pointerEvents = 'unset';
      state.isInteractionDisabled = false;
    }
  };

  const destroyMomentumLoop = () => {
    const state = stateRef.current;

    cancelAnimationFrame(state.momentumID);
  };

  const runMomentumLoop = () => {
    const slider = sliderRef.current;
    const state = stateRef.current;
    const MOMENTUM_VELOCITY_DOWNGRADE = 0.94;

    slider.scrollLeft = state.directions.isXForward
      ? slider.scrollLeft + state.velocities.x
      : slider.scrollLeft - state.velocities.x;

    slider.scrollTop = state.directions.isYForward
      ? slider.scrollTop + state.velocities.y
      : slider.scrollTop - state.velocities.y;

    state.velocities.x *= MOMENTUM_VELOCITY_DOWNGRADE;
    state.velocities.y *= MOMENTUM_VELOCITY_DOWNGRADE;

    if (ifContinueMomentum(state.velocities.x, state.velocities.y)) {
      state.momentumID = requestAnimationFrame(runMomentumLoop);
    } else {
      destroyMomentumLoop();
    }
  };

  const initMomentum = () => {
    const state = stateRef.current;

    const TIME_PASSED_THRESHOLD = 1;
    const timePassedFromLastSwipe = Date.now() - state.lastSwipeTime;

    if (ifStartMomentum(timePassedFromLastSwipe, TIME_PASSED_THRESHOLD)) {
      runMomentumLoop();
    }
  };

  const moveSliderHandler = (e) => {
    const state = stateRef.current;
    const slider = sliderRef.current;

    let howFarX = e.clientX - state.startPositions.clientX;
    let howFarY = e.clientY - state.startPositions.clientY;

    state.directions.isXForward = Math.sign(howFarX) === -1;
    state.directions.isYForward = Math.sign(howFarY) === -1;

    howFarX = Math.abs(howFarX) * acceleration;
    howFarY = Math.abs(howFarY) * acceleration;

    const prevScrollLeft = slider.scrollLeft;
    const prevScrollTop = slider.scrollTop;

    slider.scrollLeft = state.directions.isXForward
      ? state.startPositions.scrollLeft + howFarX
      : state.startPositions.scrollLeft - howFarX;

    slider.scrollTop = state.directions.isYForward
      ? state.startPositions.scrollTop + howFarY
      : state.startPositions.scrollTop - howFarY;

    state.velocities.x = Math.abs(slider.scrollLeft - prevScrollLeft);
    state.velocities.y = Math.abs(slider.scrollTop - prevScrollTop);

    state.lastSwipeTime = Date.now();
    disableInteraction(howFarX, howFarY);
  };

  const stopSliderHandler = () => {
    enableInteraction();
    if (isMomentum) initMomentum();

    document.removeEventListener('mousemove', moveSliderHandler);
    document.removeEventListener('mouseup', stopSliderHandler);
  };

  const initSliderHandler = (e) => {
    destroyMomentumLoop();

    const state = stateRef.current;
    const slider = sliderRef.current;

    // Get the current scroll positions from start (top, left) of the slider element.
    state.startPositions.scrollLeft = slider.scrollLeft;
    state.startPositions.scrollTop = slider.scrollTop;
    // Get the current mouse (x, y) positions (relative to window edges y - top, x - left).
    state.startPositions.clientX = e.clientX;
    state.startPositions.clientY = e.clientY;

    document.addEventListener('mousemove', moveSliderHandler);
    document.addEventListener('mouseup', stopSliderHandler);
  };

  useEffect(() => {
    const slider = sliderRef.current;

    sliderInnerRef.current = slider.querySelector(
      ':scope >:first-child >:first-child'
    );

    return () => {
      destroyMomentumLoop();
    };
  }, []);

  return (
    // This is a native scrollable element, so it doesn't need additional attributes I think?!.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={sliderRef}
      onMouseDown={initSliderHandler}
      onWheel={destroyMomentumLoop}
      className={classes.slider}
    >
      <div className={classes.container}>{children}</div>
    </div>
  );
};

export default Slider;
